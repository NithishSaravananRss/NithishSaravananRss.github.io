import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CHANNELS = [
  {
    id: 'email',
    cmd: 'mail -s "opportunity"',
    label: 'Email',
    value: 'nithishrss9000@gmail.com',
    href: 'mailto:nithishrss9000@gmail.com',
    cta: 'Send a message',
    accent: '#22d3ee',
  },
  {
    id: 'github',
    cmd: 'git remote add origin',
    label: 'GitHub',
    value: 'NithishSaravananRss',
    href: 'https://github.com/NithishSaravananRss',
    cta: 'View work',
    accent: '#a78bfa',
  },
  {
    id: 'linkedin',
    cmd: 'connect --professional',
    label: 'LinkedIn',
    value: 'nithish-saravanan',
    href: 'https://www.linkedin.com/in/nithish-saravanan/',
    cta: 'Connect',
    accent: '#38bdf8',
  },
  {
    id: 'leetcode',
    cmd: 'solve --platform',
    label: 'LeetCode',
    value: 'Nithish_Saravanan_28',
    href: 'https://leetcode.com/u/Nithish_Saravanan_28/',
    cta: 'See solutions',
    accent: '#fb923c',
  },
  {
    id: 'x',
    cmd: 'curl -X POST /tweet',
    label: 'X',
    value: '@nithish__saro',
    href: 'https://x.com/nithish__saro',
    cta: 'Follow',
    accent: '#94a3b8',
  },
]

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = sectionRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      // Headline reveal — stagger each word line
      const lines = root.querySelectorAll<HTMLElement>('.contact-headline-line')
      gsap.from(lines, {
        y: 60,
        autoAlpha: 0,
        stagger: 0.14,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })

      // Sub-message
      gsap.from(root.querySelector('.contact-sub'), {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: root,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })

      // Channel rows stagger
      const rows = root.querySelectorAll<HTMLElement>('.contact-channel-row')
      gsap.from(rows, {
        y: 24,
        autoAlpha: 0,
        stagger: 0.09,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.querySelector('.contact-channels'),
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      // Resume CTA
      gsap.from(root.querySelector('.contact-resume-cta'), {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.querySelector('.contact-resume-cta'),
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      {/* ── Closing statement ── */}
      <div className="contact-hero">
        <div className="contact-hero-inner">
          <p className="contact-eyebrow">Contact</p>

          <h2 className="contact-headline" aria-label="Open to the next challenge">
            <span className="contact-headline-line">OPEN TO THE</span>
            <span className="contact-headline-line contact-headline-line--accent">NEXT CHALLENGE.</span>
          </h2>

          <p className="contact-sub">
            Backend and full-stack engineering roles. Linux-first environments.
            Problems worth solving.
          </p>
        </div>

        {/* Decorative terminal prompt bottom-left */}
        <div className="contact-prompt" aria-hidden="true">
          <span className="contact-prompt-ps1">nithish@portfolio</span>
          <span className="contact-prompt-sep">:</span>
          <span className="contact-prompt-cwd">~</span>
          <span className="contact-prompt-dollar">$</span>
          <span className="contact-prompt-cursor" />
        </div>
      </div>

      {/* ── Channels ── */}
      <div className="contact-body">
        <div className="contact-channels" role="list">
          {CHANNELS.map((ch) => (
            <a
              key={ch.id}
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-channel-row"
              role="listitem"
              style={{ '--ch-accent': ch.accent } as React.CSSProperties}
            >
              {/* Left: mono command */}
              <div className="contact-channel-left">
                <span className="contact-channel-cmd">{ch.cmd}</span>
                <span className="contact-channel-label">{ch.label}</span>
              </div>

              {/* Center: value */}
              <span className="contact-channel-value">{ch.value}</span>

              {/* Right: cta arrow */}
              <span className="contact-channel-cta">
                <span className="contact-channel-cta-text">{ch.cta}</span>
                <span className="contact-channel-arrow" aria-hidden="true">→</span>
              </span>

              {/* Hover underline */}
              <span className="contact-channel-underline" />
            </a>
          ))}
        </div>

        {/* Resume block */}
        <div className="contact-resume-cta">
          <p className="contact-resume-label">
            <span className="contact-resume-cmd">$ open</span> resume
          </p>
          <a
            href="/Nithish_Saravanan_Resume.pdf"
            download
            className="contact-resume-link"
            aria-label="Download resume PDF"
          >
            <span className="contact-resume-text">Download Resume</span>
            <span className="contact-resume-icon" aria-hidden="true">↓</span>
          </a>
          <p className="contact-resume-hint">PDF · Updated 2026</p>
        </div>
      </div>

      {/* ── Footer line ── */}
      <div className="contact-footer-bar">
        <span className="contact-footer-name">Nithish Saravanan</span>
        <span className="contact-footer-dot" aria-hidden="true" />
        <span className="contact-footer-role">Backend &amp; Full-Stack Engineer</span>
        <span className="contact-footer-dot" aria-hidden="true" />
        <span className="contact-footer-year">{new Date().getFullYear()}</span>
      </div>
    </section>
  )
}

export default Contact
