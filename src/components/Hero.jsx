import { useEffect, useState } from 'react'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentRole, setCurrentRole] = useState(0)
  const roles = ['Software Developer', 'Problem Solver', 'Tech Enthusiast','Logic Builder']

  useEffect(() => {
    let currentText = ''
    let charIndex = 0
    let isDeleting = false
    let timeout

    const type = () => {
      const fullText = roles[currentRole]

      if (!isDeleting) {
        currentText = fullText.substring(0, charIndex + 1)
        charIndex++

        if (charIndex === fullText.length) {
          isDeleting = true
          timeout = setTimeout(type, 2000)
          setDisplayText(currentText)
          return
        }
      } else {
        currentText = fullText.substring(0, charIndex - 1)
        charIndex--

        if (charIndex === 0) {
          isDeleting = false
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }

      setDisplayText(currentText)
      timeout = setTimeout(type, isDeleting ? 50 : 100)
    }

    timeout = setTimeout(type, 500)

    return () => clearTimeout(timeout)
  }, [currentRole])

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-600/10 via-indigo-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Greeting with fade-in animation */}
          <div className="mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent text-lg font-medium">Hi, I'm</span>
          </div>

          {/* Name with slide-up animation */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Nithish Saravanan
            </span>
          </h1>

          {/* Typing animation for role */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 h-12 sm:h-16 flex items-center justify-center animate-slide-up-delay">
            <span className="text-gray-300">{displayText}</span>
            <span className="inline-block w-0.5 h-8 bg-gradient-to-b from-indigo-400 to-purple-500 ml-1 animate-blink"></span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-delay">
            A passionate software developer in my final year of college, crafting elegant
            solutions to complex problems and turning ideas into reality through code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 border-2 border-indigo-500 text-indigo-400 rounded-lg font-medium hover:bg-indigo-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              View My Work
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-indigo-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.4s both;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  )
}

export default Hero
