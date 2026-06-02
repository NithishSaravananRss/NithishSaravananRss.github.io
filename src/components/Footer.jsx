const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#05070d] px-8 py-10">
      <div className="section-shell flex flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>
          © {currentYear} <span className="font-semibold text-slate-200">Nithish Saravanan</span>
        </p>
        <p className="font-mono text-xs text-slate-500">
          built with react, tailwind, and deployed on github pages
        </p>
        <a href="#home" className="font-semibold text-cyan-200 transition-colors hover:text-cyan-100">
          back to top
        </a>
      </div>
    </footer>
  )
}

export default Footer
