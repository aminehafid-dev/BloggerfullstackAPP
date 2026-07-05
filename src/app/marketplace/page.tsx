export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">BlogApp</h1>
          <div className="flex gap-4">
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="/blogs" className="text-gray-700 hover:text-blue-600">Blogs</a>
            <a href="/write" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Write</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">App Marketplace</h2>

        <div className="mb-8 grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search apps..."
            className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option>All Categories</option>
            <option>Productivity</option>
            <option>Games</option>
            <option>Utilities</option>
            <option>Design</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">Upload App</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                <span className="text-4xl">📱</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">App Name {i}</h3>
                <p className="text-xs text-gray-600 mb-3">Developer {i}</p>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-yellow-400">★★★★☆</span>
                  <span className="text-xs text-gray-600">(248)</span>
                </div>
                <div className="text-xs text-gray-600 mb-3">📥 50K+ downloads</div>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold text-sm">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
