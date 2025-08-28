import { NextRequest, NextResponse } from 'next/server';

interface ProxyConfig {
  target: string;
  changeOrigin?: boolean;
  pathRewrite?: Record<string, string>;
  headers?: Record<string, string>;
}

// Configuration for different proxy targets
const proxyConfigs: Record<string, ProxyConfig> = {
  // External APIs
  jsonplaceholder: {
    target: 'https://jsonplaceholder.typicode.com',
    changeOrigin: true,
    pathRewrite: { '^/api/proxy/jsonplaceholder': '' },
  },
  
  // Firebase APIs (if needed)
  firebase: {
    target: 'https://firestore.googleapis.com',
    changeOrigin: true,
    pathRewrite: { '^/api/proxy/firebase': '' },
    headers: {
      'Content-Type': 'application/json',
    },
  },
  
  // Custom backend API
  backend: {
    target: process.env.BACKEND_URL || 'http://localhost:8000',
    changeOrigin: true,
    pathRewrite: { '^/api/proxy/backend': '/api' },
  },
  
  // Mock API
  mock: {
    target: 'https://reqres.in',
    changeOrigin: true,
    pathRewrite: { '^/api/proxy/mock': '/api' },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return handleProxy(request, params.slug);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return handleProxy(request, params.slug);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return handleProxy(request, params.slug);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return handleProxy(request, params.slug);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return handleProxy(request, params.slug);
}

async function handleProxy(request: NextRequest, slug: string[]) {
  try {
    const [proxyName, ...pathParts] = slug;
    const config = proxyConfigs[proxyName];
    
    if (!config) {
      return NextResponse.json(
        { error: 'Proxy configuration not found', available: Object.keys(proxyConfigs) },
        { status: 404 }
      );
    }

    // Build the target URL
    let targetPath = pathParts.join('/');
    
    // Apply path rewriting
    if (config.pathRewrite) {
      for (const [pattern, replacement] of Object.entries(config.pathRewrite)) {
        const regex = new RegExp(pattern);
        if (regex.test(request.nextUrl.pathname)) {
          targetPath = request.nextUrl.pathname.replace(regex, replacement) + '/' + targetPath;
          break;
        }
      }
    }

    const targetUrl = `${config.target}/${targetPath}`.replace(/\/+/g, '/').replace(':/','://');
    
    // Preserve query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

    console.log(`[PROXY] ${request.method} ${request.url} -> ${finalUrl}`);

    // Prepare headers
    const headers = new Headers();
    
    // Copy relevant headers from original request
    const headersToForward = [
      'accept',
      'accept-language',
      'authorization',
      'content-type',
      'user-agent',
      'x-api-key',
      'x-auth-token',
    ];
    
    headersToForward.forEach(headerName => {
      const value = request.headers.get(headerName);
      if (value) {
        headers.set(headerName, value);
      }
    });

    // Add custom headers from config
    if (config.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    // Handle request body for POST/PUT/PATCH requests
    let body = undefined;
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        body = await request.text();
      } catch (error) {
        console.error('Error reading request body:', error);
      }
    }

    // Make the proxy request
    const response = await fetch(finalUrl, {
      method: request.method,
      headers,
      body,
    });

    // Handle response
    const responseHeaders = new Headers();
    
    // Copy safe response headers
    const headersToReturn = [
      'content-type',
      'cache-control',
      'etag',
      'last-modified',
    ];
    
    headersToReturn.forEach(headerName => {
      const value = response.headers.get(headerName);
      if (value) {
        responseHeaders.set(headerName, value);
      }
    });

    // Add CORS headers
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    responseHeaders.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    // Get response body
    const responseBody = await response.text();
    
    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('[PROXY ERROR]:', error);
    return NextResponse.json(
      { 
        error: 'Proxy request failed', 
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    },
  });
}
