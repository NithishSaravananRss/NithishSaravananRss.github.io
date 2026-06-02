const Hero = () => {
  const commands = [
    '$ whoami',
    'Nithish Saravanan',
    '$ cat focus.txt',
    'Backend, SQL, Linux, React',
    '$ ./status --job-search',
    'open to backend and full-stack roles',
  ]

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden px-8 py-24">
      <div className="section-shell">
        <div className="grid items-center gap-12 grid-cols-[1.02fr_0.98fr]">
          <div className="reveal is-visible">
            <div className="mb-6 inline-flex items-center gap-3 border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.9)]" />
              Available for roles.
            </div>

            <h1 className="w-full text-6xl font-black leading-[0.98] tracking-normal text-white">
              I build software that is easy to trace, debug, and maintain.
            </h1>

            <div className="mt-6 flex min-h-10 items-center text-xl font-medium text-slate-300">
              <span className="text-cyan-200">Focus:&nbsp;</span>
              <span>backend, full-stack, databases, and Linux</span>
            </div>

            <p className="mt-7 w-full text-base leading-8 text-slate-300">
              I build software that stays readable under change — from frontend state and backend logic to databases, debugging, and Linux-based workflows.
            </p>

            <div className="mt-9 flex flex-row gap-3">
              <a
                href="#projects"
                className="blob-btn inline-flex items-center justify-center bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20"
              >
                <span className="blob-btn__label">view projects</span>
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </a>
              <a
                href="mailto:nithishsaravanan2801@gmail.com"
                className="blob-btn inline-flex items-center justify-center border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:text-slate-950"
              >
                <span className="blob-btn__label">email me</span>
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </a>
              <a
                href="/Nithish_Saravanan_Resume.pdf"
                download
                className="blob-btn inline-flex items-center justify-center border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-cyan-100 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:text-slate-950"
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
            </div>
          </div>

            <div className="terminal-card reveal is-visible overflow-hidden rounded-lg">
              <div className="terminal-topbar flex items-center justify-between px-5 py-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-cyan-300" />
              </div>
              <span className="text-xs font-medium text-slate-300">nithish@linux:~/portfolio</span>
            </div>

            <div className="scanline space-y-4 px-7 py-8 font-mono text-sm leading-7 text-slate-200">
              {commands.map((line, index) => (
                <p key={`${line}-${index}`} className={line.startsWith('$') ? 'text-cyan-200' : 'text-slate-300'}>
                  {line}
                </p>
              ))}

              <div className="mt-7 grid grid-cols-4 gap-3 text-xs">
                {[
                  ['OS', 'Linux'],
                  ['Code', 'React'],
                  ['Logic', 'Java/C#'],
                  ['DB', 'SQL'],
                ].map(([label, value]) => (
                  <div key={label} className="border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-slate-500">{label}</p>
                    <p className="mt-1 font-semibold text-cyan-200">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden border-y border-white/10 py-4">
          <div className="marquee-track flex w-max gap-10 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
            {Array.from({ length: 2 }).map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-10">
                <span>Linux workflow</span>
                <span>React UI</span>
                <span>.NET desktop apps</span>
                <span>SQL data models</span>
                <span>Clean debugging</span>
                <span>Deployable web projects</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
