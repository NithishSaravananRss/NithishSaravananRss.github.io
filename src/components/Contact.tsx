const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/NithishSaravananRss' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nithish-saravanan-rss/' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/Nithish_Saravanan_28/' },
  { label: 'X',        href: 'https://x.com/nithish__saro' },
]

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="site-container">
        <p className="contact-eyebrow reveal">Get in touch</p>
        <p className="contact-statement reveal reveal-delay-1">
          Always open to discussing backend systems, full-stack engineering,
          or the occasional Linux rabbit hole.
        </p>
        <a
          href="mailto:nithishrss9000@gmail.com"
          className="contact-email reveal reveal-delay-2"
        >
          nithishrss9000@gmail.com
        </a>
        <div className="contact-socials reveal reveal-delay-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
              aria-label={s.label}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
