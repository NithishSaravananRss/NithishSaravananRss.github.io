import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.tsx'
import Hero from './components/Hero.tsx'
import Projects from './components/Projects.tsx'
import About from './components/About.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer'
import useLenis from './hooks/useLenis.ts'
import useReveal from './hooks/useReveal.ts'

const SECTION_IDS = ['home', 'about', 'projects', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  // Always open at the top on load/reload — clear any lingering URL hash
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo(0, 0)
  }, [])

  // Smooth scroll engine
  useLenis()

  // Fade-in reveals on scroll
  useReveal()

  // Active section tracker
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const windowH = window.innerHeight
      const docH    = document.documentElement.scrollHeight

      // Always activate last section when near the bottom of the page
      if (scrollY + windowH >= docH - 80) {
        setActiveSection(SECTION_IDS[SECTION_IDS.length - 1])
        return
      }

      // Activate the last section whose top has passed 60% down the viewport
      const trigger = scrollY + windowH * 0.60
      let active = SECTION_IDS[0]
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= trigger) active = id
      }
      setActiveSection(active)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  return (
    <div style={{ background: '#f5f2ec', minHeight: '100svh' }}>

      {/* SVG goo filter — required for blob button effect */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
