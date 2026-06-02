import { useMemo, useRef, useState } from 'react'
import useProjectStoryScroll from '../hooks/useProjectStoryScroll'

// ─── Types ──────────────────────────────────────────────────────────────────

type ProjectBadge = 'published' | 'client' | null
type ProjectStatus = 'live' | 'source'

interface Project {
  title: string
  category: string
  description: string
  year: string
  features: string[]
  stack: string[]
  image: string
  demoLink: string
  sourceLink: string
  status: ProjectStatus
  badge: ProjectBadge
}

// ─── Badge helpers ───────────────────────────────────────────────────────────

const getBadgeStyle = (badge: ProjectBadge, status: ProjectStatus) => {
  if (badge === 'published') return 'border-purple-400/40 bg-purple-400/10 text-purple-200'
  if (badge === 'client')    return 'border-amber-400/40 bg-amber-400/10 text-amber-200'
  if (status === 'live')     return 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
  return 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200'
}

const getBadgeLabel = (badge: ProjectBadge, status: ProjectStatus) => {
  if (badge === 'published') return 'Published Paper'
  if (badge === 'client')    return 'Client Project'
  return status === 'live' ? '● Live' : 'Source'
}

// ─── Desktop cinematic slide ──────────────────────────────────────────────────

interface SlideProps {
  project: Project
  index: number
  total: number
}

const ProjectSlide = ({ project, index }: SlideProps) => (
  <article
    className="project-story-slide"
    aria-label={project.title}
  >
    {/* Cinematic card */}
    <div className="cinematic-card group">

      {/* ── Image panel (full-bleed, slides left on hover) ────────────── */}
      <div className="cinematic-image-wrap">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="cinematic-image"
          loading="lazy"
          draggable={false}
        />

        {/* Gradient fades right edge so content panel blends in */}
        <div className="image-gradient" aria-hidden="true" />

        {/* Preview badge — top left */}
        <div className="image-preview-badge" aria-hidden="true">
          <span className="preview-dot" />
          <span>cinematic preview</span>
        </div>

        {/* Always-visible card label — bottom left of image */}
        <div className="image-bottom-label">
          <p className="image-category">{project.category}</p>
          <h3 className="image-title">{project.title}</h3>
          <span
            className={`image-badge-pill ${getBadgeStyle(project.badge, project.status)}`}
          >
            {getBadgeLabel(project.badge, project.status)}
          </span>
        </div>
      </div>

      {/* ── Content panel (slides in from right on hover) ──────────────── */}
      <div className="cinematic-content" role="region" aria-label="Project details">
        {/* Header row */}
        <div className="content-header-row cinematic-reveal cinematic-reveal-1">
          <span className="content-project-num">
            Project {String(index + 1).padStart(2, '0')}
          </span>
          <span className="content-year">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="content-title cinematic-reveal cinematic-reveal-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="content-desc cinematic-reveal cinematic-reveal-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="cinematic-reveal cinematic-reveal-4">
          <p className="content-section-label">Tech Stack</p>
          <div className="content-chips">
            {project.stack.map((tag) => (
              <span key={tag} className="content-chip">{tag}</span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="cinematic-reveal cinematic-reveal-5">
          <p className="content-section-label">Key Features</p>
          <ul className="content-features">
            {project.features.map((f) => (
              <li key={f} className="content-feature-item">
                <span className="feature-dot" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA buttons */}
        <div className="content-cta cinematic-reveal cinematic-reveal-6">
          <a
            href={project.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-btn--ghost"
          >
            <span className="cta-btn__label">GitHub</span>
            <span className="cta-btn__inner" aria-hidden="true">
              <span className="cta-btn__blobs">
                <span className="cta-btn__blob" />
                <span className="cta-btn__blob" />
                <span className="cta-btn__blob" />
                <span className="cta-btn__blob" />
              </span>
            </span>
          </a>
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-btn--primary"
          >
            <span className="cta-btn__label">Live Demo</span>
            <span className="cta-btn__inner" aria-hidden="true">
              <span className="cta-btn__blobs">
                <span className="cta-btn__blob" />
                <span className="cta-btn__blob" />
                <span className="cta-btn__blob" />
                <span className="cta-btn__blob" />
              </span>
            </span>
          </a>
        </div>
      </div>

    </div>
  </article>
)

// ─── Mobile card ─────────────────────────────────────────────────────────────

const MobileProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <article className="mobile-project-card">
    {/* Image */}
    <div className="mobile-card-image-wrap">
      <img
        src={project.image}
        alt={`${project.title} preview`}
        className="mobile-card-image"
        loading="lazy"
      />
      <div className="mobile-card-image-overlay" aria-hidden="true" />
      <div className="mobile-card-image-badges">
        <span className="mobile-card-category">{project.category}</span>
        <span className={`mobile-card-status ${getBadgeStyle(project.badge, project.status)}`}>
          {getBadgeLabel(project.badge, project.status)}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="mobile-card-content">
      <div className="mobile-card-meta">
        <span className="mobile-card-num">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="mobile-card-year">{project.year}</span>
      </div>

      <h3 className="mobile-card-title">{project.title}</h3>
      <p className="mobile-card-desc">{project.description}</p>

      {/* Stack */}
      <div className="mobile-card-stack">
        {project.stack.map((t) => (
          <span key={t} className="content-chip">{t}</span>
        ))}
      </div>

      {/* Features */}
      <ul className="mobile-card-features">
        {project.features.map((f) => (
          <li key={f} className="content-feature-item">
            <span className="feature-dot" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="mobile-card-cta">
        <a
          href={project.sourceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-btn mobile-btn--ghost"
        >
          GitHub ↗
        </a>
        <a
          href={project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-btn mobile-btn--primary"
        >
          Live Demo ↗
        </a>
      </div>
    </div>
  </article>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0)
  const sectionRef = useRef<HTMLElement | null>(null)

  const projects: Project[] = useMemo(
    () => [
      {
        title: 'Voter Management System',
        category: 'Full-Stack',
        description:
          'Role-based voter management platform with MFA authentication, audit logging, admin dashboard, and PostgreSQL-backed data layer.',
        year: '2025',
        features: [
          'Role-based access control',
          'MFA authentication',
          'Immutable audit logs',
        ],
        stack: ['React', 'NestJS', 'Prisma', 'PostgreSQL', 'TypeScript'],
        image: '/project-previews/voter-management-system.svg',
        demoLink: 'https://github.com/NithishSaravananRss/Voter-Management-System',
        sourceLink: 'https://github.com/NithishSaravananRss/Voter-Management-System',
        status: 'source',
        badge: null,
      },
      {
        title: 'Maran Physio Care',
        category: 'Web',
        description:
          'Production website for a physiotherapy clinic — designed, built, and deployed for a real client with appointment flow and service pages.',
        year: '2024',
        features: [
          'Appointment-driven UX',
          'Mobile-first layout',
          'Client-ready deployment',
        ],
        stack: ['React', 'Tailwind CSS', 'Vite'],
        image: '/project-previews/maran-physio-care.svg',
        demoLink: 'https://maranphysiocare.com',
        sourceLink: 'https://github.com/NithishSaravananRss/Maran-Physio-Care',
        status: 'live',
        badge: 'client',
      },
      {
        title: '3D Learning Platform',
        category: 'Full-Stack',
        description:
          'Interactive 3D educational platform using Three.js for immersive learning experiences — published as a research paper in IJCRT.',
        year: '2024',
        features: [
          'Three.js scene rendering',
          'Research publication',
          'Immersive learning UX',
        ],
        stack: ['React', 'Three.js', 'Node.js', 'JavaScript'],
        image: '/project-previews/3d-learning-platform.svg',
        demoLink: 'https://github.com/NithishSaravananRss/3D-Learning-Platform',
        sourceLink: 'https://github.com/NithishSaravananRss/3D-Learning-Platform',
        status: 'source',
        badge: 'published',
      },
    ],
    []
  )

  useProjectStoryScroll(sectionRef, setActiveProject, projects.length)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section relative"
      aria-label="Projects"
    >
      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP — cinematic GSAP stage
      ══════════════════════════════════════════════════════════════════ */}
      <div className="project-story-stage" aria-hidden="false">

        {/* Top-left: section label + heading */}
        <div className="stage-header-block">
          <p className="stage-eyebrow">Projects</p>
          <h2 className="stage-heading">
            A cinematic<br />
            <em>story sequence.</em>
          </h2>
        </div>

        {/* Top-right: progress counter */}
        <div
          className="stage-counter"
          aria-live="polite"
          aria-label={`Project ${activeProject + 1} of ${projects.length}`}
        >
          <span className="counter-current">
            {String(activeProject + 1).padStart(2, '0')}
          </span>
          <span className="counter-divider">/</span>
          <span className="counter-total">
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Bottom-center: scroll hint */}
        <div className="stage-scroll-hint" aria-hidden="true">
          <span className="scroll-hint-text">Scroll to advance</span>
          <span className="scroll-hint-arrow">↓</span>
        </div>

        {/* Slide container */}
        {projects.map((project, index) => (
          <ProjectSlide
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}

        {/* Bottom-right: dot navigation */}
        <div className="stage-dots" aria-hidden="true">
          {projects.map((project, i) => (
            <span
              key={project.title}
              className={`stage-dot ${activeProject === i ? 'stage-dot--active' : ''}`}
            />
          ))}
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE — vertical stacked layout
      ══════════════════════════════════════════════════════════════════ */}
      <div className="mobile-projects-layout" aria-label="Projects list">
        <div className="mobile-projects-header">
          <p className="stage-eyebrow">Projects</p>
          <h2 className="mobile-heading">
            A cinematic<br />
            <em>story sequence.</em>
          </h2>
        </div>

        <div className="mobile-cards-list">
          {projects.map((project, index) => (
            <MobileProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>

    </section>
  )
}

export default Projects
