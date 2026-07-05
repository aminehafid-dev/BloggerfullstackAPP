export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">BlogApp</h1>
          <div className="flex gap-4">
            <a href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">Login</a>
            <a href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Write. Share. Discover.
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          The ultimate platform for bloggers and app developers
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/write" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Start Writing
          </a>
          <a href="/marketplace" className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
            Explore Apps
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        {[
          { title: "Write Blogs", desc: "Share your thoughts with a global audience" },
          { title: "App Marketplace", desc: "Discover and share amazing applications" },
          { title: "Community", desc: "Connect with developers and creators worldwide" }
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 BlogApp. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
