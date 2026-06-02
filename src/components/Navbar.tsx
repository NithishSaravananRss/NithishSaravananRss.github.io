import { useEffect, useRef, useState } from 'react'
import { getLenis } from '../hooks/useLenis'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'home',     label: 'Home'     },
  { id: 'about',    label: 'Profile'  },
  { id: 'skills',   label: 'Stack'    },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact'  },
]

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Navbar = ({ activeSection }: { activeSection: string }) => {
  const [scrolled,        setScrolled]        = useState(false)
  const [scrollProgress,  setScrollProgress]  = useState(0)
  const [mobileOpen,      setMobileOpen]      = useState(false)
  const [hovered,         setHovered]         = useState<string | null>(null)
  const [indicatorStyle,  setIndicatorStyle]  = useState<React.CSSProperties>({})
  const navListRef = useRef<HTMLDivElement>(null)

  /* ── Scroll state ── */
  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 48)
      setScrollProgress(max > 0 ? Math.min(y / max, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Pill indicator position ──
     Reads the bounding rect of the active nav button and positions the
     sliding highlight behind it. Runs whenever activeSection changes
     or hovered changes (so the pill chases the cursor too).
  ── */
  useEffect(() => {
    const target = hovered ?? activeSection
    const list   = navListRef.current
    if (!list) return

    const btn = list.querySelector<HTMLElement>(`[data-nav="${target}"]`)
    if (!btn) return

    const listRect = list.getBoundingClientRect()
    const btnRect  = btn.getBoundingClientRect()
    setIndicatorStyle({
      width:  btnRect.width,
      height: btnRect.height,
      left:   btnRect.left - listRect.left,
      top:    btnRect.top  - listRect.top,
    })
  }, [activeSection, hovered])

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }

  return (
    <nav
      className={`navbar-root${scrolled ? ' navbar-root--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* ── Scroll progress rail ── */}
      <div
        className="navbar-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <div className="navbar-inner">

        {/* ── Brand ── */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, 'home')}
          className="navbar-brand"
          aria-label="Go to top"
        >
          <span className="navbar-brand-monogram" aria-hidden="true">NS</span>
          <span className="navbar-brand-text">
            <span className="navbar-brand-name">Nithish Saravanan</span>
            <span className="navbar-brand-role">Backend Systems Engineer</span>
          </span>
        </a>

        {/* ── Desktop nav list ── */}
        <div
          className="navbar-list"
          ref={navListRef}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Sliding pill indicator */}
          {Object.keys(indicatorStyle).length > 0 && (
            <span
              className="navbar-pill"
              style={indicatorStyle}
              aria-hidden="true"
            />
          )}

          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-nav={item.id}
                onClick={(e) => scrollTo(e, item.id)}
                onMouseEnter={() => setHovered(item.id)}
                className={`navbar-link${isActive ? ' navbar-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </div>

        {/* ── Status badge ── */}
        <a
          href="mailto:nithishrss9000@gmail.com"
          className="navbar-status"
          aria-label="Available for backend and full-stack roles — send email"
        >
          <span className="navbar-status-dot" aria-hidden="true" />
          <span className="navbar-status-text">Available</span>
        </a>

        {/* ── Mobile hamburger ── */}
        <button
          className={`navbar-hamburger${mobileOpen ? ' navbar-hamburger--open' : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="navbar-mobile-drawer" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollTo(e, item.id)}
              className={`navbar-mobile-link${activeSection === item.id ? ' navbar-mobile-link--active' : ''}`}
            >
              <span className="navbar-mobile-cmd" aria-hidden="true">
                {activeSection === item.id ? '▶' : '$'}
              </span>
              {item.label}
            </a>
          ))}
          <a
            href="mailto:nithishrss9000@gmail.com"
            className="navbar-mobile-link navbar-mobile-link--contact"
            onClick={() => setMobileOpen(false)}
          >
            <span className="navbar-mobile-cmd" aria-hidden="true">@</span>
            nithishrss9000@gmail.com
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
