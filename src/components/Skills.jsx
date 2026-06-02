import { useEffect, useRef, useState } from 'react'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.18 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const groups = [
    {
      title: 'Front End',
      command: 'npm run build-ui',
      items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Three.js'],
      output: 'Responsive screens, stateful components, interactions, form flows',
    },
    {
      title: 'Back End & APIs',
      command: 'nest start --watch',
      items: ['NestJS', 'Node.js', 'Java', 'C#', '.NET Framework', 'Python', 'REST APIs'],
      output: 'Production APIs, auth systems, RBAC guards, modular server logic',
    },
    {
      title: 'Data & Infrastructure',
      command: 'psql --design-schema',
      items: ['PostgreSQL', 'Prisma', 'SQL Server', 'Git', 'Linux', 'Docker basics', 'VS Code'],
      output: 'Schema design, ORM migrations, version control, terminal workflows',
    },
    {
      title: 'Debugging & Testing',
      command: 'git diff --quality',
      items: ['Debugging', 'Jasmine tests', 'DSA', 'Documentation', 'Deployment', 'Problem breakdown'],
      output: 'Readable changes, tested behavior, clearer handoff',
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-[100svh] px-8 py-32">
      <div className="section-shell">
        <div className={`reveal w-full ${isVisible ? 'is-visible' : ''}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Stack</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-100">
            Tools, not trophies.
          </h2>
          <p className="mt-5 w-full text-base leading-9 text-slate-300">
            The tools behind the interfaces, logic, and workflows I build.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6">
          {groups.map((group, index) => (
            <div
              key={group.title}
              className={`terminal-card reveal flex h-full min-h-[320px] flex-col rounded-lg p-8 ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-100">{group.title}</h3>
                  <p className="mt-2 font-mono text-xs text-cyan-200">{group.command}</p>
                </div>
                <span className="border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-xs font-medium text-lime-200">
                  active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {group.items.map((item) => (
                  <span key={item} className="border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-normal text-slate-300">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto border-t border-white/10 pt-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">output</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{group.output}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
