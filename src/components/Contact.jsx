import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.2 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormStatus('sending')

    emailjs
      .sendForm('service_zrfdvhk', 'template_csmqdyc', formRef.current, 'AUo4LAxtRoQJ6eU--')
      .then(() => {
        setFormStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setFormStatus(''), 5000)
      })
      .catch(() => {
        setFormStatus('error')
        setTimeout(() => setFormStatus(''), 5000)
      })
  }

  const links = [
    { label: 'Email', value: 'nithishrss9000@gmail.com', href: 'mailto:nithishrss9000@gmail.com' },
    { label: 'GitHub', value: 'NithishSaravananRss', href: 'https://github.com/NithishSaravananRss' },
    { label: 'LinkedIn', value: 'Nithish Saravanan', href: 'https://www.linkedin.com/in/nithish-saravanan/' },
    { label: 'LeetCode', value: 'Nithish_Saravanan_28', href: 'https://leetcode.com/u/Nithish_Saravanan_28/' },
    { label: 'X', value: '@nithish__saro', href: 'https://x.com/nithish__saro' },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-[100svh] px-8 py-32">
      <div className="section-shell">
        <div className={`reveal grid grid-cols-[0.9fr_1.1fr] gap-12 ${isVisible ? 'is-visible' : ''}`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Contact</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-100">
              Open to backend or full-stack roles.
            </h2>
            <p className="mt-5 w-full text-base leading-9 text-slate-300">
              Reach out for engineering roles, collaborations, or backend and Linux-focused work.
            </p>

            <a
              href="/Nithish_Saravanan_Resume.pdf"
              download
              className="blob-btn mt-7 inline-flex border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-normal text-cyan-100 transition-all duration-300 hover:-translate-y-1 hover:text-slate-950"
            >
              <span className="blob-btn__label">download resume</span>
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
            </a>

            <div className="mt-8 border-y border-white/10 py-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-4 py-3 text-sm leading-7 transition-colors hover:text-cyan-100"
                >
                  <span className="font-mono text-xs text-slate-500">./{link.label.toLowerCase()}</span>
                  <span className="break-all text-right text-slate-300 group-hover:text-cyan-100">{link.value}</span>
                </a>
              ))}
            </div>
          </div>

            <form ref={formRef} onSubmit={handleSubmit} className="terminal-card rounded-lg p-8" aria-labelledby="contact-heading">
            <div className="mb-5 border-b border-white/10 pb-4">
              <p id="contact-heading" className="font-mono text-sm text-cyan-200">send_message.sh</p>
              <p className="mt-1 text-sm leading-7 text-slate-500">Best way to reach me: email or the form below.</p>
            </div>

            <div className="grid gap-5">
              <label className="grid gap-2 font-mono text-xs text-slate-500">
                $ name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-white/10 bg-[#05070d]/70 px-3 py-2.5 font-sans text-sm font-normal text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300/60"
                  placeholder="Nithish"
                />
              </label>

              <label className="grid gap-2 font-mono text-xs text-slate-500">
                $ email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-white/10 bg-[#05070d]/70 px-3 py-2.5 font-sans text-sm font-normal text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300/60"
                  placeholder="you@example.com"
                />
              </label>

              <label className="grid gap-2 font-mono text-xs text-slate-500">
                $ subject
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border border-white/10 bg-[#05070d]/70 px-3 py-2.5 font-sans text-sm font-normal text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300/60"
                  placeholder="Opportunity"
                />
              </label>

              <label className="grid gap-2 font-mono text-xs text-slate-500">
                $ message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="resize-none border border-white/10 bg-[#05070d]/70 px-3 py-2.5 font-sans text-sm font-normal text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300/60"
                  placeholder="Message"
                />
              </label>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="blob-btn bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950 transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="blob-btn__label">{formStatus === 'sending' ? 'sending...' : 'send message'}</span>
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </button>

              {formStatus === 'success' && (
                <div role="status" aria-live="polite" className="border border-lime-300/30 bg-lime-300/10 p-5 text-center text-sm font-medium text-lime-200">
                  Message sent. I will get back to you soon.
                </div>
              )}

              {formStatus === 'error' && (
                <div role="status" aria-live="polite" className="border border-red-300/30 bg-red-300/10 p-4 text-center text-sm font-medium text-red-200">
                  Message failed. Please email me directly.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
