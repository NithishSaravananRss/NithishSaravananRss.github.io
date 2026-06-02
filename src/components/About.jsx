import { useEffect, useRef, useState } from 'react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.22 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const signals = [
    { label: 'Education', value: 'B.Tech CSE, 2026' },
    { label: 'Working style', value: 'Linux, Git, terminal first' },
    { label: 'Project range', value: 'Full-stack web apps, desktop tools, client sites' },
    { label: 'Looking for', value: 'Backend or full-stack roles' },
  ]

  const timeline = [
    { year: '2022', event: 'Started CSE — first programs in C++ and Python' },
    { year: '2023', event: 'Built Windows Forms desktop apps with SQL Server' },
    { year: '2024', event: 'Shipped web projects with React and deployed live' },
    { year: '2025', event: 'Shipped client project + published research paper (IJCRT)' },
    { year: '2026', event: 'Seeking backend and full-stack engineering roles' },
  ]

  const approach = [
    'Map the user flow — the Maran Physio site started from appointment UX, not layout',
    'Separate state from UI — VMS uses NestJS guards decoupled from React components',
    'Keep failure states visible — the VMS audit log was designed around this',
    'Write the readable version first — then optimise after profiling',
    'Ship, inspect, tighten — the 3D platform went through 3 deploy cycles before the paper',
  ]

  return (
    <section id="about" ref={sectionRef} className="relative min-h-[100svh] px-8 py-28">
      <div className="section-shell">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Profile</p>
          <div className="mt-4 grid gap-8 grid-cols-[0.85fr_1.15fr] items-end">
            <h2 className="w-full text-4xl font-semibold leading-tight text-slate-100">
              From small projects to software that holds together.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-2 items-stretch">
          <div className={`terminal-card soft-card reveal h-full rounded-lg p-6 min-h-[320px] ${isVisible ? 'is-visible' : ''}`}>
            <div className="mb-3 flex items-center justify-between border-b border-white/8 pb-2">
              <span className="font-mono text-sm text-cyan-200">system_profile.json</span>
              <span className="text-xs bg-lime-300/10 border border-lime-300/18 px-2 py-0.5 rounded text-lime-200">ready</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-1">
              {signals.map((signal) => (
                <div key={signal.label} className="flex min-h-[96px] flex-col justify-between rounded-md border border-white/8 bg-white/[0.025] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{signal.label}</p>
                  <p className="text-sm font-normal leading-6 text-slate-300">{signal.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`soft-card reveal h-full rounded-lg p-6 min-h-[320px] flex flex-col gap-5 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '80ms' }}>
            <div className="border-l-2 border-cyan-300/20 pl-4 w-full">
              <p className="text-xl font-medium leading-9 text-slate-100">
                I like work where state, data, and edge cases matter. I build carefully, test the rough edges, and keep the code easy to follow.
              </p>
            </div>

            {/* Research publication highlight */}
            <div className="mt-auto rounded-md border border-purple-300/20 bg-purple-300/[0.06] p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-lg">📄</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-200">Published Research</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    3D Interactive Learning Platform — published in <span className="font-medium text-purple-200">IJCRT, April 2026</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">React · Three.js · Node.js</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`soft-card reveal h-full rounded-lg p-6 min-h-[400px] flex flex-col ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '120ms' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">How I Work</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">A short checklist for how I approach unfamiliar work.</p>
            <div className="mt-4 grid gap-3 grid-cols-2 flex-1 content-start">
              {approach.map((step, idx) => (
                <div key={idx} className="flex min-h-[92px] items-start gap-3 rounded-md border border-white/8 bg-white/[0.025] p-4">
                  <div className="font-mono text-sm text-cyan-200 flex items-center flex-shrink-0">{String(idx + 1).padStart(2, '0')} →</div>
                  <p className="text-sm leading-7 text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`soft-card reveal h-full rounded-lg p-6 min-h-[400px] flex flex-col ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '140ms' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Resume Timeline</p>
            <p className="mt-2 w-full text-sm leading-8 text-slate-300">
              A short path from coursework to projects I can talk through.
            </p>
            <div className="mt-4 grid gap-3 grid-cols-2 flex-1 content-start auto-rows-fr">
              {timeline.map((item) => (
                <div key={item.year} className="rounded-md border border-white/10 bg-white/[0.035] p-4 min-h-[108px] flex flex-col justify-between">
                  <div className="font-mono text-sm text-cyan-200">{item.year}</div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
