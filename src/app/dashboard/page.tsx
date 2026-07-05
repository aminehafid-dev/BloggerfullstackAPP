'use client';

import { useEffect, useState } from 'react';
import { useAuthStore, useAuthHydrate } from '@/lib/authStore';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  useAuthHydrate(); // Restore auth from localStorage
  const { user, logout, isHydrated } = useAuthStore();
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      router.push('/login');
    }
  }, [user, router, isHydrated]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [blogsRes, appsRes] = await Promise.all([
          fetch('/api/blogs', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/apps', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (blogsRes.ok) setBlogs(await blogsRes.json());
        if (appsRes.ok) setApps(await appsRes.json());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (user) fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">BlogApp Dashboard</h1>
          <div className="flex gap-4 items-center">
            <span className="text-gray-700">{user.name}</span>
            {user.role === 'admin' && (
              <a href="/admin" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                Admin Panel
              </a>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Your Blogs */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Your Blogs</h2>
              <a href="/write" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Write New
              </a>
            </div>
            <div className="space-y-3">
              {blogs.length > 0 ? (
                blogs.slice(0, 5).map((blog) => (
                  <div key={blog._id} className="border-b pb-3">
                    <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                    <p className="text-sm text-gray-600">👁️ {blog.views} views • ❤️ {blog.likes} likes</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No blogs yet. Start writing!</p>
              )}
            </div>
          </div>

          {/* Your Apps */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Your Apps</h2>
              <a href="/marketplace" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Upload New
              </a>
            </div>
            <div className="space-y-3">
              {apps.length > 0 ? (
                apps.slice(0, 5).map((app) => (
                  <div key={app._id} className="border-b pb-3">
                    <h3 className="font-semibold text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-600">⭐ {app.rating} • 📥 {app.downloads} downloads</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No apps yet. Upload your first app!</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
            <p className="text-sm opacity-90">Total Blogs</p>
            <p className="text-3xl font-bold">{blogs.length}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
            <p className="text-sm opacity-90">Total Apps</p>
            <p className="text-3xl font-bold">{apps.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
            <p className="text-sm opacity-90">Account Status</p>
            <p className="text-3xl font-bold capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
