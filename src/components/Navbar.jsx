import { useEffect, useState } from 'react'

const Navbar = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Profile', href: '#about' },
    { name: 'Stack', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (event, href) => {
    event.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#05070d]/88 shadow-2xl shadow-black/30 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="section-shell">
        <div className="flex h-14 items-center justify-between gap-2">
          <a
            href="#home"
            onClick={(event) => scrollToSection(event, '#home')}
            className="group flex items-center gap-3 text-sm font-normal text-slate-200"
          >
            <span className="grid h-9 w-9 place-items-center border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 transition-colors group-hover:border-cyan-200/50 group-hover:text-cyan-100">
              NS
            </span>
            <span>Nithish Saravanan</span>
          </a>

          <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 flex-wrap w-full">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(event) => scrollToSection(event, item.href)}
                className={`rounded-full px-3 py-1.5 text-sm font-normal transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? 'bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="mailto:nithishsaravanan2801@gmail.com"
            className="blob-btn border border-cyan-300/30 px-3 py-1.5 text-sm font-normal text-cyan-200 transition-all duration-300 hover:border-cyan-200 hover:text-slate-950 ml-auto"
            aria-label="Email to connect"
          >
            <span className="blob-btn__label">open for roles</span>
            <span className="blob-btn__inner">
              <span className="blob-btn__blobs">
                <span className="blob-btn__blob"></span>
                <span className="blob-btn__blob"></span>
                <span className="blob-btn__blob"></span>
                <span className="blob-btn__blob"></span>
              </span>
            </span>
          </a>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
