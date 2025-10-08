import { useEffect, useRef, useState } from 'react'

const Skills = () => {
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

  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'Three.js', level: 40 },
      ],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Java', level: 85 },
        { name: 'c++', level: 72 },
        { name: '.Net', level: 70 },
        { name: 'C#', level: 80 },
        { name: 'Python', level: 75 },
      ],
    },
    {
      title: 'Tools & Others',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Linux', level: 75 },
        { name: 'Docker', level: 70 },
        { name: 'Blender', level: 60 },
      ],
    },
    {
      title: 'Core Concepts',
      icon: '📚',
      skills: [
        { name: 'DSA', level: 60 },
        { name: 'OOP', level: 85 },
        { name: 'DBMS', level: 82 },
        { name: 'OS', level: 50 },
      ],
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/10 via-indigo-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of technologies and tools I've mastered throughout my journey
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-indigo-500/20 hover:border-purple-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${categoryIndex * 150}ms`,
              }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">{category.icon}</span>
                <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${categoryIndex * 150 + skillIndex * 100}ms`,
                        }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block bg-slate-800/50 backdrop-blur-sm px-8 py-4 rounded-full border border-indigo-500/20">
            <p className="text-gray-300">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">Always Learning</span> • Currently
              exploring Web3 and AI
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </section>
  )
}

export default Skills
