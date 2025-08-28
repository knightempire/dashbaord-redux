'use client';

import { useState } from 'react';
import { useProxy, proxyAPI } from '@/hooks/useProxy';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  job?: string;
}

export default function ProxyDemo() {
  const { loading, error, data, proxy, reset } = useProxy();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'users' | 'backend'>('posts');

  // JSONPlaceholder Demo
  const fetchPosts = async () => {
    try {
      reset();
      const response = await proxy.jsonplaceholder.get('posts?_limit=5');
      setPosts(response.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const createPost = async () => {
    try {
      reset();
      const newPost = {
        title: 'Demo Post from Proxy',
        body: 'This post was created using the Next.js proxy!',
        userId: 1,
      };
      await proxy.jsonplaceholder.post('posts', newPost);
      alert('Post created successfully!');
      fetchPosts(); // Refresh the list
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  // ReqRes Demo
  const fetchUsers = async () => {
    try {
      reset();
      const response = await proxyAPI.reqres.getUsers();
      setUsers(response.data.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const createUser = async () => {
    try {
      reset();
      const newUser = {
        name: 'John Proxy',
        job: 'Proxy Developer',
      };
      await proxyAPI.reqres.createUser(newUser);
      alert('User created successfully!');
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  // Backend Demo
  const testBackend = async () => {
    try {
      reset();
      const response = await proxy.backend.get('health');
      alert('Backend connection successful!');
    } catch (err) {
      console.error('Backend connection failed:', err);
      alert('Backend connection failed. Make sure your backend server is running.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🚀 Next.js Proxy Server Demo
        </h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            This demo showcases the proxy server functionality with different targets:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
            <li><strong>JSONPlaceholder:</strong> /api/proxy/jsonplaceholder/*</li>
            <li><strong>ReqRes API:</strong> /api/proxy/mock/*</li>
            <li><strong>Backend API:</strong> /api/proxy/backend/*</li>
          </ul>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'posts', label: 'JSONPlaceholder Posts' },
              { key: 'users', label: 'ReqRes Users' },
              { key: 'backend', label: 'Backend API' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Status Display */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3 mt-0.5"></div>
              <p className="text-blue-700">Loading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-700">Error: {error}</p>
          </div>
        )}

        {/* JSONPlaceholder Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <button
                onClick={fetchPosts}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Fetch Posts
              </button>
              <button
                onClick={createPost}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                Create Post
              </button>
            </div>

            {posts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Posts from JSONPlaceholder:</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                      <p className="text-gray-600 text-sm">{post.body}</p>
                      <p className="text-xs text-gray-400 mt-2">ID: {post.id} | User: {post.userId}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ReqRes Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <button
                onClick={fetchUsers}
                disabled={loading}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                Fetch Users
              </button>
              <button
                onClick={createUser}
                disabled={loading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                Create User
              </button>
            </div>

            {users.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Users from ReqRes API:</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {users.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.name?.charAt(0) || user.email?.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {user.name || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          {user.job && (
                            <p className="text-xs text-gray-400">{user.job}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Backend Tab */}
        {activeTab === 'backend' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Backend API testing requires a running backend server.
                Configure your backend URL in <code>.env.local</code>.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={testBackend}
                disabled={loading}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 disabled:opacity-50"
              >
                Test Backend Connection
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Backend Configuration:</h3>
              <div className="bg-gray-50 rounded-md p-4">
                <pre className="text-sm text-gray-700">
                  {`BACKEND_URL=${process.env.BACKEND_URL || 'http://localhost:8000'}
WS_URL=${process.env.WS_URL || 'ws://localhost:8080'}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Raw Response Data */}
        {data && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Raw Response Data:</h3>
            <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
              <pre className="text-sm text-gray-700">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Usage Examples */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-3">Usage Examples:</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="font-medium mb-2">Using React Hook:</h4>
              <pre className="text-sm text-gray-700">
{`const { proxy } = useProxy();
await proxy.jsonplaceholder.get('posts');
await proxy.backend.post('users', data);`}
              </pre>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="font-medium mb-2">Direct API Calls:</h4>
              <pre className="text-sm text-gray-700">
{`import { proxyAPI } from '@/hooks/useProxy';
const posts = await proxyAPI.jsonplaceholder.getPosts();
const users = await proxyAPI.reqres.getUsers();`}
              </pre>
            </div>

            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="font-medium mb-2">Using Fetch:</h4>
              <pre className="text-sm text-gray-700">
{`const response = await fetch('/api/proxy/jsonplaceholder/posts');
const data = await response.json();`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
