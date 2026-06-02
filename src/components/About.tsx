import { useRef } from 'react'
import useAboutScroll from '../hooks/useAboutScroll'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const IDENTITY_STATEMENTS = [
  {
    line1: 'I BUILD SYSTEMS,',
    line2: 'NOT JUST WEBSITES.',
  },
  {
    line1: 'LINUX TERMINAL FIRST.',
    line2: 'PRODUCTION MINDED.',
  },
  {
    line1: 'BACKEND BY DEFAULT.',
    line2: 'FULL-STACK WHEN NEEDED.',
  },
]

const PROFILE_SCENES = [
  {
    eyebrow: 'Education',
    headline: 'B.Tech Computer Science',
    body: 'Graduating 2026. Four years of building — from terminal-only C++ programs to full-stack web applications shipped to real users.',
  },
  {
    eyebrow: 'Working Style',
    headline: 'Linux. Git. Terminal.',
    body: 'My workflow runs on the command line. Vim, tmux, and a clean Git history are not optional — they are the baseline.',
  },
  {
    eyebrow: 'Focus Area',
    headline: 'Backend & Full-Stack Engineering.',
    body: 'REST APIs, NestJS guards, SQL schemas, React frontends. I care most about the layer where data, logic, and user needs meet.',
  },
  {
    eyebrow: 'Looking For',
    headline: 'Real problems. Senior teams.',
    body: 'Seeking backend or full-stack engineering roles where software actually has to hold together under real conditions.',
  },
]

const PRINCIPLES = [
  {
    number: '01',
    headline: 'MAP THE USER FLOW FIRST.',
    sentence: 'The Maran Physio site started from appointment UX, not layout. Design intent before design surface.',
  },
  {
    number: '02',
    headline: 'SEPARATE STATE FROM PRESENTATION.',
    sentence: 'VMS uses NestJS guards decoupled from React components. Logic belongs at the boundary, not inside the view.',
  },
  {
    number: '03',
    headline: 'KEEP FAILURES VISIBLE.',
    sentence: 'The VMS audit log was designed around error states, not success states. Edge cases are the real requirements.',
  },
  {
    number: '04',
    headline: 'WRITE READABLE, OPTIMISE AFTER.',
    sentence: 'Write the version a junior can follow. Profile under real load. Then fix what actually costs.',
  },
  {
    number: '05',
    headline: 'SHIP, INSPECT, TIGHTEN.',
    sentence: 'The 3D platform went through three deploy cycles before the paper. Production teaches you what staging cannot.',
  },
]

const TIMELINE_YEARS = [
  {
    year: '2022',
    event: 'Started B.Tech CSE — First programs in C++ and Python.',
    reflection: '"Debugging pointer errors at 1 AM made me respect the machine."',
    stack: 'C++ · Python · DSA',
  },
  {
    year: '2023',
    event: 'Built Windows Forms desktop apps with SQL Server back-ends.',
    reflection: '"State management problems don\'t disappear — they just move layers."',
    stack: 'C# · WinForms · SQL Server',
  },
  {
    year: '2024',
    event: 'Shipped web projects with React. Deployed live. First real users.',
    reflection: '"Real users expose what staging can\'t simulate."',
    stack: 'React · Node.js · PostgreSQL',
  },
  {
    year: '2025',
    event: 'Shipped client project. Published research in IJCRT (3D Interactive Learning Platform).',
    reflection: '"Seeing your name in a journal is surreal. The Three.js geometry was not."',
    stack: 'React · Three.js · NestJS · IJCRT',
  },
  {
    year: '2026',
    event: 'Actively seeking backend and full-stack engineering roles.',
    reflection: '"Four years of building. Now looking for the problem worth solving next."',
    stack: 'Open to opportunities',
  },
]

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const IdentityAct = () => (
  <div className="identity-stage">
    {IDENTITY_STATEMENTS.map((stmt, i) => (
      <div key={i} className="identity-slide">
        <p className="identity-eyebrow">Profile</p>
        <h2 className="identity-headline">
          <span className="identity-line">{stmt.line1}</span>
          <span className="identity-line identity-line--accent">{stmt.line2}</span>
        </h2>
        <div className="identity-index">
          {String(i + 1).padStart(2, '0')} / {String(IDENTITY_STATEMENTS.length).padStart(2, '0')}
        </div>
      </div>
    ))}
  </div>
)

const ProfileScenesAct = () => (
  <div className="profile-scenes-wrap">
    {PROFILE_SCENES.map((scene, i) => (
      <div key={i} className="profile-scene">
        <div className="profile-scene-inner">
          <p className="scene-eyebrow">{scene.eyebrow}</p>
          <h3 className="scene-headline">{scene.headline}</h3>
          <p className="scene-body">{scene.body}</p>
        </div>
        <div className="scene-index-bg">{String(i + 1).padStart(2, '0')}</div>
      </div>
    ))}
  </div>
)

const PrinciplesAct = () => (
  <div className="principles-stage">
    <div className="principles-label-bar">
      <span className="principles-label-text">How I Work</span>
      <div className="principles-label-line" />
    </div>

    {PRINCIPLES.map((p, i) => (
      <div key={i} className="principle-slide">
        {/* Giant dim background number */}
        <span className="principle-bg-num">{p.number}</span>

        {/* Foreground content */}
        <div className="principle-content">
          <div className="principle-num-badge">{p.number}</div>
          <h3 className="principle-headline">{p.headline}</h3>
          <p className="principle-sentence">{p.sentence}</p>
        </div>
      </div>
    ))}
  </div>
)

const TimelineAct = () => (
  <div className="timeline-stage">
    {/* Section label */}
    <div className="timeline-label-bar">
      <span className="timeline-label-text">Resume Timeline</span>
      <div className="timeline-label-line" />
    </div>

    {/* Year panels — only one visible at a time via GSAP */}
    {TIMELINE_YEARS.map((item, i) => (
      <div key={i} className="timeline-panel">
        {/* Huge background year */}
        <span className="timeline-year-bg">{item.year}</span>

        {/* Foreground narrative */}
        <div className="timeline-panel-content">
          <div className="timeline-panel-left">
            <p className="timeline-year-label">{item.year}</p>
            <h3 className="timeline-event">{item.event}</h3>
            <blockquote className="timeline-reflection">{item.reflection}</blockquote>
          </div>
          <div className="timeline-panel-right">
            <div className="timeline-stack-chips">
              {item.stack.split(' · ').map((chip) => (
                <span key={chip} className="timeline-chip">{chip}</span>
              ))}
            </div>
            {/* Year indicator dots */}
            <div className="timeline-dots">
              {TIMELINE_YEARS.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`timeline-dot ${dotIdx === i ? 'timeline-dot--active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}

    {/* Progress bar */}
    <div className="timeline-progress-track">
      <div className="timeline-progress-bar" />
    </div>
  </div>
)

// ─── MOBILE FALLBACK ──────────────────────────────────────────────────────────

const MobileAbout = () => (
  <div className="mobile-about-wrap">
    <p className="scene-eyebrow">Profile</p>
    <h2 className="mobile-about-headline">
      I build systems,<br />
      <em>not just websites.</em>
    </h2>

    <div className="mobile-about-signals">
      {PROFILE_SCENES.map((scene, i) => (
        <div key={i} className="mobile-signal-card">
          <p className="mobile-signal-label">{scene.eyebrow}</p>
          <p className="mobile-signal-headline">{scene.headline}</p>
          <p className="mobile-signal-body">{scene.body}</p>
        </div>
      ))}
    </div>

    <div className="mobile-principles-wrap">
      <p className="scene-eyebrow" style={{ marginBottom: '1.5rem' }}>How I Work</p>
      {PRINCIPLES.map((p, i) => (
        <div key={i} className="mobile-principle-card">
          <span className="mobile-principle-num">{p.number}</span>
          <div>
            <p className="mobile-principle-headline">{p.headline}</p>
            <p className="mobile-principle-sentence">{p.sentence}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="mobile-timeline-wrap">
      <p className="scene-eyebrow" style={{ marginBottom: '1.5rem' }}>Timeline</p>
      {TIMELINE_YEARS.map((item) => (
        <div key={item.year} className="mobile-timeline-card">
          <div className="mobile-timeline-year">{item.year}</div>
          <div>
            <p className="mobile-timeline-event">{item.event}</p>
            <p className="mobile-timeline-reflection">{item.reflection}</p>
            <div className="mobile-timeline-chips">
              {item.stack.split(' · ').map((chip) => (
                <span key={chip} className="timeline-chip">{chip}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useAboutScroll(sectionRef)

  return (
    <section id="about" ref={sectionRef} className="about-section">
      {/* ── Desktop Cinematic Experience ── */}
      <div className="about-desktop">
        <IdentityAct />
        <ProfileScenesAct />
        <PrinciplesAct />
        <TimelineAct />
      </div>

      {/* ── Mobile Fallback ── */}
      <div className="about-mobile">
        <MobileAbout />
      </div>
    </section>
  )
}

export default About
