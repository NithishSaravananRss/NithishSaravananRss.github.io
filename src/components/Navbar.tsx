import { useState, useEffect } from 'react'
import { getLenis } from '../hooks/useLenis'

const NAV_ITEMS = [
  { id: 'home',     label: 'Home'     },
  { id: 'projects', label: 'Projects' },
  { id: 'about',    label: 'About'    },
  { id: 'contact',  label: 'Contact'  },
]

export default function Navbar({ activeSection }: { activeSection: string }) {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        offset: -56,
      })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <nav className={`nav-root${scrolled ? ' nav-root--scrolled' : ''}`} role="navigation" aria-label="Main">
      <div className="nav-inner">

        {/* Logo / initials */}
        <a
          href="#home"
          className="nav-logo"
          onClick={(e) => scrollTo(e, 'home')}
          aria-label="Nithish Saravanan — home"
        >
          NS
        </a>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-link${activeSection === item.id ? ' nav-link--active' : ''}`}
                onClick={(e) => scrollTo(e, item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <span style={{ transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : undefined }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : undefined }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="nav-mobile-menu">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-mobile-link"
              onClick={(e) => scrollTo(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
