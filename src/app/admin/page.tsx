'use client';

import { useEffect, useState } from 'react';
import { useAuthStore, useAuthHydrate } from '@/lib/authStore';
import { useRouter } from 'next/navigation';

// Demo data
const DEMO_USERS = [
  { _id: '1', name: 'Admin User', email: 'admin@blogapp.com', role: 'admin' as const, createdAt: new Date().toISOString() },
  { _id: '2', name: 'Test User', email: 'user@blogapp.com', role: 'user' as const, createdAt: new Date().toISOString() },
];

const DEMO_BLOGS = [
  { _id: '1', title: 'Getting Started with Blogging', author: { name: 'Admin User' }, views: 125, createdAt: new Date().toISOString() },
  { _id: '2', title: 'Tips for App Development', author: { name: 'Test User' }, views: 89, createdAt: new Date().toISOString() },
];

const DEMO_APPS = [
  { _id: '1', name: 'Weather App', developer: { name: 'Admin User' }, downloads: 1500, createdAt: new Date().toISOString() },
  { _id: '2', name: 'Note Taker', developer: { name: 'Test User' }, downloads: 890, createdAt: new Date().toISOString() },
];

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  author: { name: string };
  views: number;
  createdAt: string;
}

interface App {
  _id: string;
  name: string;
  developer: { name: string };
  downloads: number;
  createdAt: string;
}

export default function AdminPage() {
  useAuthHydrate(); // Restore auth from localStorage
  const { user, logout, isHydrated } = useAuthStore();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(DEMO_USERS);
  const [blogs, setBlogs] = useState<Blog[]>(DEMO_BLOGS);
  const [apps, setApps] = useState<App[]>(DEMO_APPS);
  const [activeTab, setActiveTab] = useState<'users' | 'blogs' | 'apps'>('users');

  useEffect(() => {
    if (!isHydrated) return;
    if (!user || user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, router, isHydrated]);

  const handleDeleteBlog = (blogId: string) => {
    if (!confirm('Are you sure?')) return;
    setBlogs(blogs.filter((b) => b._id !== blogId));
  };

  const handleDeleteApp = (appId: string) => {
    if (!confirm('Are you sure?')) return;
    setApps(apps.filter((a) => a._id !== appId));
  };

  const handleDeleteUser = (userId: string) => {
    if (!confirm('Are you sure? This action cannot be undone.')) return;
    setUsers(users.filter((u) => u._id !== userId));
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">Admin Panel</h1>
          <div className="flex gap-4">
            <a href="/dashboard" className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Dashboard
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-2 font-semibold border-b-2 ${
              activeTab === 'users' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600'
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`py-4 px-2 font-semibold border-b-2 ${
              activeTab === 'blogs' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600'
            }`}
          >
            Blogs ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`py-4 px-2 font-semibold border-b-2 ${
              activeTab === 'apps' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600'
            }`}
          >
            Apps ({apps.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">
                      {u._id !== '1' && (
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Author</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Views</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{b.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{b.author?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{b.views}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDeleteBlog(b._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Apps Tab */}
        {activeTab === 'apps' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">App Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Developer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Downloads</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {apps.map((a) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{a.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{a.developer?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{a.downloads}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDeleteApp(a._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
