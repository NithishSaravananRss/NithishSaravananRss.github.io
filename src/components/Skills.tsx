import { useRef } from 'react'
import useSkillsScroll from '../hooks/useSkillsScroll'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'frontend',
    chapter: '01',
    label: 'Frontend',
    tagline: 'Interfaces that respond, not just render.',
    narrative:
      'I write UI the way I write systems — with state at the center. The component exists to serve the interaction, not the other way around.',
    tools: [
      { name: 'React',        context: 'Building stateful interfaces that survive real users.' },
      { name: 'TypeScript',   context: 'Making assumptions explicit before they become bugs.' },
      { name: 'Three.js',     context: 'When the interface needs a third dimension.' },
      { name: 'HTML & CSS',   context: 'The material, not the afterthought.' },
      { name: 'Tailwind CSS', context: 'Constraints that accelerate, not restrict.' },
    ],
    accentColor: '#22d3ee',
  },
  {
    id: 'backend',
    chapter: '02',
    label: 'Backend & APIs',
    tagline: 'Systems that hold under conditions, not just demos.',
    narrative:
      'APIs are contracts. I design them to be explicit about what they accept, what they return, and what happens when things go wrong.',
    tools: [
      { name: 'NestJS',    context: 'Modules, guards, and structure by default.' },
      { name: 'Node.js',   context: 'Fast enough where it matters. Async by design.' },
      { name: 'REST APIs', context: 'Clear surface area. Predictable failure modes.' },
      { name: 'Java',      context: 'When the problem requires typed, explicit structure.' },
      { name: 'Python',    context: 'Automation, scripts, and quick iteration.' },
    ],
    accentColor: '#a78bfa',
  },
  {
    id: 'data',
    chapter: '03',
    label: 'Data & Infrastructure',
    tagline: 'Schemas built for growth, not just the happy path.',
    narrative:
      'A database schema is a decision that outlives the sprint. I design around the edge case, the migration, and the query that gets slow in production.',
    tools: [
      { name: 'PostgreSQL', context: 'Designing systems that survive real growth.' },
      { name: 'Prisma',     context: 'Type-safe schema migrations, no surprises.' },
      { name: 'SQL Server', context: 'Relational logic for desktop-scale problems.' },
      { name: 'Git',        context: 'Every change is an explanation of intent.' },
      { name: 'Linux',      context: 'The operating system I actually work in.' },
    ],
    accentColor: '#34d399',
  },
  {
    id: 'quality',
    chapter: '04',
    label: 'Quality & Debugging',
    tagline: 'Failures are information. Ignoring them is a choice.',
    narrative:
      'The most useful thing I can write is a failing test that explains why something broke. The second most useful is the fix that makes it pass.',
    tools: [
      { name: 'Debugging',   context: 'Reading what the machine actually did, not what I expected.' },
      { name: 'Jasmine',     context: 'Tests as executable specifications.' },
      { name: 'DSA',         context: 'Knowing the shape of a problem before touching code.' },
      { name: 'Deployment',  context: 'Production is the only environment that tells the truth.' },
      { name: 'Docs',        context: 'The codebase future-me will thank present-me for.' },
    ],
    accentColor: '#fb923c',
  },
]

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const SkillsHero = () => (
  <div className="skills-hero">
    <div className="skills-hero-inner">
      <p className="skills-hero-eyebrow">Stack</p>
      <h2 className="skills-hero-headline">
        <span className="skills-hero-line">TOOLS,</span>
        <span className="skills-hero-line skills-hero-line--accent">NOT TROPHIES.</span>
      </h2>
      <p className="skills-hero-sub">
        I don&apos;t collect stacks. I build with them.
      </p>
    </div>
    {/* scroll hint */}
    <div className="skills-hero-scroll-hint" aria-hidden="true">
      <span className="skills-scroll-line" />
      <span className="skills-scroll-label">scroll to explore</span>
    </div>
  </div>
)

const CategorySlide = ({ cat, isFirst }: { cat: typeof CATEGORIES[0]; isFirst: boolean }) => (
  <div
    className="skills-slide"
    style={{ '--accent': cat.accentColor } as React.CSSProperties}
  >
    {/* Huge dim chapter number */}
    <span className="skills-chapter-bg">{cat.chapter}</span>

    {/* Foreground content */}
    <div className="skills-slide-content">
      {/* Left column: narrative */}
      <div className="skills-slide-left">
        <p className="skills-chapter-badge">{cat.chapter} / 04</p>
        <p className="skills-category-label">{cat.label}</p>
        <h3 className="skills-category-tagline">{cat.tagline}</h3>
        <p className="skills-category-narrative">{cat.narrative}</p>
      </div>

      {/* Right column: tool list */}
      <div className="skills-slide-right">
        <div className="skills-tools-list">
          {cat.tools.map((tool, idx) => (
            <div key={tool.name} className="skill-item" style={{ '--item-i': idx } as React.CSSProperties}>
              <div className="skill-item-inner">
                <span className="skill-name">{tool.name}</span>
                <span className="skill-context">{tool.context}</span>
              </div>
              <div className="skill-item-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// ─── MOBILE FALLBACK ──────────────────────────────────────────────────────────

const MobileSkills = () => (
  <div className="mobile-skills-wrap">
    <p className="scene-eyebrow">Stack</p>
    <h2 className="mobile-skills-headline">
      Tools,<br />
      <em>not trophies.</em>
    </h2>
    <p className="mobile-skills-sub">I don&apos;t collect stacks. I build with them.</p>

    <div className="mobile-skills-categories">
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className="mobile-category-block" style={{ '--accent': cat.accentColor } as React.CSSProperties}>
          <div className="mobile-category-header">
            <span className="mobile-category-chapter">{cat.chapter}</span>
            <span className="mobile-category-label">{cat.label}</span>
          </div>
          <p className="mobile-category-tagline">{cat.tagline}</p>
          <div className="mobile-tools-list">
            {cat.tools.map((tool) => (
              <div key={tool.name} className="mobile-tool-item">
                <span className="mobile-tool-name">{tool.name}</span>
                <span className="mobile-tool-context">{tool.context}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useSkillsScroll(sectionRef)

  return (
    <section id="skills" ref={sectionRef} className="skills-section">
      {/* ── Desktop Cinematic Experience ── */}
      <div className="skills-desktop">
        <SkillsHero />
        <div className="skills-stage">
          {CATEGORIES.map((cat, i) => (
            <CategorySlide key={cat.id} cat={cat} isFirst={i === 0} />
          ))}
        </div>
      </div>

      {/* ── Mobile Fallback ── */}
      <div className="skills-mobile">
        <MobileSkills />
      </div>
    </section>
  )
}

export default Skills
