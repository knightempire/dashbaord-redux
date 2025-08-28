import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const PORT = process.env.PROXY_PORT || 3001;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
}));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// JSONPlaceholder proxy
app.use('/api/external/jsonplaceholder', createProxyMiddleware({
  target: 'https://jsonplaceholder.typicode.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/external/jsonplaceholder': '',
  },
}));

// ReqRes API proxy  
app.use('/api/external/reqres', createProxyMiddleware({
  target: 'https://reqres.in',
  changeOrigin: true,
  pathRewrite: {
    '^/api/external/reqres': '/api',
  },
}));

// Backend API proxy
app.use('/api/backend', createProxyMiddleware({
  target: process.env.BACKEND_URL || 'http://localhost:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/backend': '/api',
  },
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV || 'development',
  });
});

// List available proxy routes
app.get('/proxy/routes', (req, res) => {
  const routes = [
    {
      path: '/api/external/jsonplaceholder',
      target: 'https://jsonplaceholder.typicode.com',
      description: 'JSONPlaceholder API for testing',
    },
    {
      path: '/api/external/reqres',
      target: 'https://reqres.in/api',
      description: 'ReqRes API for testing',
    },
    {
      path: '/api/backend',
      target: process.env.BACKEND_URL || 'http://localhost:8000',
      description: 'Your custom backend API',
    },
  ];
  
  res.json({
    message: 'Available proxy routes',
    routes,
    usage: {
      example: `${req.protocol}://${req.get('host')}/api/external/jsonplaceholder/posts`,
      note: 'Replace the path segment with your desired endpoint',
    },
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error('[EXPRESS ERROR]:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`,
    availableRoutes: [
      '/api/external/jsonplaceholder',
      '/api/external/reqres',
      '/api/backend',
    ],
    helpUrl: `${req.protocol}://${req.get('host')}/proxy/routes`,
  });
});

// Start the proxy server
const server = app.listen(PORT, () => {
  console.log(`
🚀 Proxy Server Started!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Proxy Server:     http://localhost:${PORT}
📋 Health Check:     http://localhost:${PORT}/health
📚 Available Routes: http://localhost:${PORT}/proxy/routes
🌍 Environment:      ${process.env.NODE_ENV || 'development'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Available Proxy Routes:
  • /api/external/jsonplaceholder → https://jsonplaceholder.typicode.com
  • /api/external/reqres → https://reqres.in/api
  • /api/backend → ${process.env.BACKEND_URL || 'http://localhost:8000'}

Examples:
  • GET  http://localhost:${PORT}/api/external/jsonplaceholder/posts
  • POST http://localhost:${PORT}/api/backend/users
  • GET  http://localhost:${PORT}/api/external/reqres/users
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 Received SIGTERM. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Proxy server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📴 Received SIGINT. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Proxy server closed.');
    process.exit(0);
  });
});

export default app;
