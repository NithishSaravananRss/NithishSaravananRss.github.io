import { useRef } from 'react'
import useHeroScroll from '../hooks/useHeroScroll'

// ─── DATA ─────────────────────────────────────────────────────────────────────

// Three opening teaser statements that appear before the headline
const TEASERS = [
  'Software that survives production.',
  'Systems built for the long run.',
  'Code you can actually trace.',
]

// Terminal script — each entry typed in sequence
const TERM_SCRIPT: Array<{ type: 'cmd' | 'out'; text: string }> = [
  { type: 'cmd', text: '$ whoami' },
  { type: 'out', text: 'Nithish Saravanan' },
  { type: 'cmd', text: '$ cat focus.txt' },
  { type: 'out', text: 'Backend · Full-Stack · Linux · SQL' },
  { type: 'cmd', text: '$ ./status --availability' },
  { type: 'out', text: 'OPEN — backend & full-stack roles' },
]

const STATS = [
  { label: 'OS',    value: 'Linux'   },
  { label: 'API',   value: 'NestJS'  },
  { label: 'DB',    value: 'Postgres'},
  { label: 'Lang',  value: 'TS / Java'},
]

// Marquee concepts — duplicated by CSS animation
const MARQUEE_ITEMS = [
  'Systems',
  'APIs',
  'Databases',
  'Linux',
  'Debugging',
  'Architecture',
  'Full-Stack',
  'Backend',
  'React',
  'PostgreSQL',
  'NestJS',
  'TypeScript',
  'State Management',
  'Clean Code',
  'Deployable Systems',
]

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useHeroScroll(sectionRef)

  return (
    <section id="home" ref={sectionRef} className="hero-section">

      {/* ── Background grid / glow ── */}
      <div className="hero-bg-grid" aria-hidden="true">
        <div className="hero-bg-glow hero-bg-glow--cyan" />
        <div className="hero-bg-glow hero-bg-glow--violet" />
        <div className="hero-bg-grid-lines" />
      </div>

      {/* ── Opening teasers (animated away before headline) ── */}
      <div className="hero-teaser-stage" aria-hidden="true">
        {TEASERS.map((line, i) => (
          <p key={i} className="hero-teaser-line">
            {line}
          </p>
        ))}
      </div>

      {/* ── Main content shell ── */}
      <div className="hero-content-shell">

        {/* Left: headline + sub + CTAs */}
        <div className="hero-left">


          {/* Headline — split into words for stagger */}
          <h1 className="hero-headline" aria-label="I build software that is easy to trace, debug, and maintain.">
            {['I build', 'software that is', 'easy to trace,', 'debug, and maintain.'].map((word, i) => (
              <span key={i} className="hero-headline-word">
                {word}
              </span>
            ))}
          </h1>

          {/* Sub-line */}
          <p className="hero-subline">
            <span className="hero-subline-accent">Focus: </span>
            backend, full-stack, databases &amp; Linux
          </p>

          {/* CTA row */}
          <div className="hero-cta-row">
            <a href="#projects" className="hero-btn hero-btn--primary blob-btn">
              <span className="blob-btn__label">view projects</span>
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob" /><span className="blob-btn__blob" />
                  <span className="blob-btn__blob" /><span className="blob-btn__blob" />
                </span>
              </span>
            </a>
            <a href="mailto:nithishrss9000@gmail.com" className="hero-btn hero-btn--ghost blob-btn">
              <span className="blob-btn__label">email me</span>
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob" /><span className="blob-btn__blob" />
                  <span className="blob-btn__blob" /><span className="blob-btn__blob" />
                </span>
              </span>
            </a>
            <a href="/Nithish_Saravanan_Resume.pdf" download className="hero-btn hero-btn--outline blob-btn">
              <span className="blob-btn__label">resume</span>
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob" /><span className="blob-btn__blob" />
                  <span className="blob-btn__blob" /><span className="blob-btn__blob" />
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Right: living terminal */}
        <div className="hero-terminal">
          {/* Window chrome */}
          <div className="term-chrome">
            <div className="term-dots">
              <span className="term-dot term-dot--red" />
              <span className="term-dot term-dot--yellow" />
              <span className="term-dot term-dot--green" />
            </div>
            <span className="term-title">nithish@linux:~/portfolio</span>
          </div>

          {/* Script lines */}
          <div className="term-body scanline">
            {TERM_SCRIPT.map((entry, i) => (
              <p
                key={i}
                className={`term-line term-line--${entry.type}`}
              >
                {entry.text}
              </p>
            ))}

            {/* Blinking cursor at end */}
            <p className="term-line term-line--cmd">
              <span className="term-cursor" aria-hidden="true" />
            </p>

            {/* Stat chips */}
            <div className="term-stats">
              {STATS.map((s) => (
                <div key={s.label} className="hero-stat">
                  <p className="hero-stat-label">{s.label}</p>
                  <p className="hero-stat-value">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div className="hero-marquee-wrap" aria-hidden="true">
        <div className="hero-marquee-track">
          {/* Duplicate list twice for seamless loop */}
          {[0, 1].map((g) => (
            <div key={g} className="hero-marquee-group">
              {MARQUEE_ITEMS.map((item) => (
                <span key={item} className="hero-marquee-item">
                  {item}
                  <span className="hero-marquee-sep">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Hero
