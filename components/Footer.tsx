export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">SkillNest</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            AI-powered learning roadmaps for faster skill growth.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
          <a href="/" className="hover:opacity-70">Home</a>
          <a href="/recommend" className="hover:opacity-70">Generate</a>
          <a href="https://github.com" className="hover:opacity-70">GitHub</a>
        </div>

        {/* Small note */}
        <div className="text-xs text-gray-500 dark:text-gray-500">
          Built by JpDev. • 2026
        </div>

      </div>
    </footer>
  );
}