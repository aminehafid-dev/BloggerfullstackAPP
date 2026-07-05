export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">BlogApp</h1>
          <div className="flex gap-4">
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="/marketplace" className="text-gray-700 hover:text-blue-600">Apps</a>
            <a href="/write" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Write</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-8">Latest Blogs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Technology</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Amazing Blog Title {i}</h3>
                <p className="text-gray-600 mb-4 text-sm">This is a sample blog excerpt. Click to read the full article and discover interesting insights...</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Author Name</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
