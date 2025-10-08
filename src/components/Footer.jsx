const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 border-t border-indigo-500/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>
              © {currentYear} <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">Nithish</span>. All
              rights reserved.
            </p>
          </div>

          {/* Made with love */}
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>using React & Tailwind CSS</span>
          </div>

          {/* Quick Links */}
          <div className="flex gap-6 text-sm">
            <a
              href="#home"
              className="text-gray-400 hover:bg-gradient-to-r hover:from-blue-400 hover:via-indigo-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent transition-colors duration-300"
            >
              Back to Top
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-gray-500 text-xs">
            Designed & Developed by Nithish • {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
