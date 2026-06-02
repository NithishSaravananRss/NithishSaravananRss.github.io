import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Skills from './components/Skills.tsx'
import Projects from './components/Projects'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import useLenis from './hooks/useLenis.ts'
import { getLenis } from './hooks/useLenis.ts'

const sectionIds = ['home', 'about', 'skills', 'projects', 'contact']

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const appRef = useRef(null)

  // ── Initialise Lenis smooth scroll (wires to GSAP ScrollTrigger internally) ──
  useLenis()

  // ── Active section tracker ─────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.45

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const { offsetTop, offsetHeight } = el
        if (scrollMid >= offsetTop && scrollMid < offsetTop + offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Cursor glow ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      if (!appRef.current) return
      appRef.current.style.setProperty('--cursor-x', `${e.clientX}px`)
      appRef.current.style.setProperty('--cursor-y', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // ── Navbar scroll-to helper (used by Navbar internal clicks via Lenis) ─────
  // Lenis.scrollTo('#id') provides smooth programmatic scrolling that matches
  // the hand-scroll momentum. The Navbar component calls
  // document.getElementById(id).scrollIntoView() — we intercept those
  // native smooth scrolls with Lenis by NOT setting scroll-behavior:smooth
  // and instead letting Lenis handle the RAF. Native hash clicks also work
  // because Lenis intercepts anchor clicks by default in its constructor.

  return (
    <div ref={appRef} className="relative min-h-screen text-slate-50" style={{ background: '#030507' }}>
      {/* SVG goo filter for blob buttons */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <AnimatedBackground />

      {/* Subtle top-to-bottom gradient overlay — keeps readability */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(3,5,7,0.12), rgba(3,5,7,0.65))',
        }}
      />

      {/* Cursor glow blob */}
      <div className="cursor-glow pointer-events-none fixed z-[2] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <div className="relative z-10">
        <Navbar activeSection={activeSection} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
