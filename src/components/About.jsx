import { useEffect, useRef, useState } from 'react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const education = [
    {
      year: '2022 - 2026',
      degree: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      status: 'Final Year',
    },
  ]

  const interests = [
    { icon: '💻', title: 'Full Stack Development', description: 'Building end-to-end solutions' },
    { icon: '🧠', title: 'Problem Solving', description: 'Algorithmic thinking & DSA' },
    { icon: '🚀', title: 'Innovation', description: 'Exploring new technologies' },
    { icon: '🤝', title: 'Collaboration', description: 'Team projects & open source' },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Description */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600 rounded-full"></div>
              <div className="pl-8">
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Who I Am</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm a dedicated software developer currently in my final year of engineering,
                  passionate about creating innovative solutions that make a difference. My journey
                  in tech has been driven by curiosity and a constant desire to learn.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Throughout my academic career, I've worked on various projects ranging from web
                  applications to complex algorithms, always striving to write clean, efficient,
                  and maintainable code.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I believe in the power of technology to solve real-world problems and I'm excited
                  to contribute to building the future of software development.
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="bg-slate-900/50 p-6 rounded-lg border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center">
                <span className="mr-2">🎓</span>
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-indigo-500/50 pl-4 py-2">
                  <p className="text-indigo-400 font-medium">{edu.year}</p>
                  <p className="text-white font-semibold">{edu.degree}</p>
                  <p className="text-gray-400">{edu.field}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">
                    {edu.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Interests Grid */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">What Drives Me</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="group bg-slate-900/50 p-6 rounded-lg border border-indigo-500/20 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {interest.icon}
                  </div>
                  <h4 className="text-white font-semibold mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                    {interest.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{interest.description}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { number: '4+', label: 'Years Learning' },
                { number: '10+', label: 'Projects' },
                { number: '∞', label: 'Passion' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-slate-900/50 rounded-lg border border-indigo-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
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
