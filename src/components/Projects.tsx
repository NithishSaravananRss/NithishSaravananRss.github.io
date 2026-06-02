const PROJECTS = [
  {
    title: 'Voter Management System',
    year: '2025',
    desc: 'Role-based voter management platform with MFA authentication, immutable audit logging, admin dashboard, and a PostgreSQL-backed data layer.',
    stack: ['React', 'NestJS', 'Prisma', 'PostgreSQL', 'TypeScript'],
    badge: null,
    link: 'https://github.com/NithishSaravananRss/vms.git',
  },
  {
    title: 'Maran Physio Care',
    year: '2025',
    desc: 'Production website for a physiotherapy clinic, designed, built, and deployed for a real client with an appointment-driven UX and mobile-first layout.',
    stack: ['React', 'Tailwind CSS', 'Vite'],
    badge: 'client' as const,
    link: 'https://www.maranphysiocare.thirumarangroups.com',
  },
  {
    title: '3D Learning Platform',
    year: '2026',
    desc: 'Interactive 3D educational platform using Three.js for immersive learning experiences. Published as a research paper in IJCRT (2026).',
    stack: ['React', 'Three.js', 'Node.js', 'JavaScript'],
    badge: 'published' as const,
    link: 'https://github.com/NithishSaravananRss/immersive-3d-learning.git',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="site-container">
        <div className="section-header reveal">
          <span className="section-label">Projects</span>
        </div>
        <ul className="projects-list" role="list">
          {PROJECTS.map((p, i) => (
            <li key={p.title}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card reveal reveal-delay-${Math.min(i + 1, 5)}`}
              >
                <div className="project-card-body">
                  <div className="project-card-top">
                    <h2 className="project-title">{p.title}</h2>
                    <span className="project-year">{p.year}</span>
                    {p.badge === 'client' && (
                      <span className="project-badge project-badge--client">Client</span>
                    )}
                    {p.badge === 'published' && (
                      <span className="project-badge project-badge--published">Published</span>
                    )}
                  </div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-stack">
                    {p.stack.map((s) => (
                      <span key={s} className="project-stack-chip">{s}</span>
                    ))}
                  </div>
                </div>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
