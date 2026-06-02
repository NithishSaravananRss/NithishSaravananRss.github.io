import React from 'react'

const SKILLS = [
  'Java', 'Spring Boot', 'React', 'PostgreSQL', 'Linux', 'REST APIs', 'C++',
]

const BlobInner = () => (
  <span className="blob-btn__inner">
    <span className="blob-btn__blobs">
      <span className="blob-btn__blob" />
      <span className="blob-btn__blob" />
      <span className="blob-btn__blob" />
      <span className="blob-btn__blob" />
    </span>
  </span>
)

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="site-container">

        <h1 className="hero-name reveal">Nithish Saravanan.</h1>

        <p className="hero-role reveal reveal-delay-1">
          Backend &amp; Full-Stack Engineer.
        </p>

        <p className="hero-bio reveal reveal-delay-2">
          I build tools for scalable systems and maintainable code. From
          REST APIs and SQL schemas to React frontends deployed for real users.
          Currently seeking backend and full-stack engineering roles.
        </p>

        <div className="hero-meta reveal reveal-delay-3">
          <span>Chennai, India</span>
          <span className="hero-meta-dot" aria-hidden="true" />
          <span>Open to remote</span>
        </div>

        <div className="hero-cta-row reveal reveal-delay-4">
          <a href="#projects" className="blob-btn blob-btn--solid">
            Projects
            <BlobInner />
          </a>
          <a href="./public/Nithish_Saravanan_Resume.pdf" download className="blob-btn blob-btn--outline">
            Resume
            <BlobInner />
          </a>
          <a href="mailto:nithishrss9000@gmail.com" className="blob-btn blob-btn--outline">
            Email me
            <BlobInner />
          </a>
        </div>

        <div className="hero-skills-row reveal reveal-delay-5">
          {SKILLS.map((s) => (
            <span key={s} className="skill-chip">{s}</span>
          ))}
        </div>

      </div>
    </section>
  )
}
