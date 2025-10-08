import { useEffect, useRef, useState } from 'react'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
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

  const projects = [
    {
      title: 'Amazon Clone',
      description:
        'This is a simple Amazon Clone built using HTML, CSS, and JavaScript with a minimal product catalog.The project replicates some basic functionalities of the Amazon e-commerce platform and includes Jasmine testing for JavaScript code validation.',
      category: 'Full Stack ',
      tags: ['Html', 'Css', 'JavaScript','Jasmine'],
      image: '🛒',
      gradient: 'from-blue-500 to-cyan-500',
      demoLink: 'https://amazon.nithishsaravanan.me',
      sourceLink: 'https://github.com/NithishSaravananRss/Amazon-Clone.git',
    },
    {
      title: 'Rock-Paper-Scissors-Game',
      description:
        'A simple and interactive Rock, Paper, Scissors game built using HTML, CSS, and JavaScript. Play against the computer, test your luck, and enjoy a quick fun game in your browser!',
      category: 'Frontend',
      tags: ['Html', 'Css', 'JavaScript'],
      image: '✂️',
      gradient: 'from-purple-500 to-pink-500',
      demoLink: 'https://rps.nithishsaravanan.me',
      sourceLink: 'https://github.com/NithishSaravananRss/Rock-Paper-Scissors-Game.git',
    },
    {
      title: 'Hangman Game (Python)',
      description:
        'This is a simple command-line Hangman game written in Python. A random word is chosen, and the player must guess the word letter by letter before running out of attempts. Each wrong guess draws a part of the hangman.',
      category: 'Backend',
      tags: ['Python'],
      image: '🎮',
      gradient: 'from-green-500 to-emerald-500',
      demoLink: 'https://github.com/NithishSaravananRss/Hangman-Game-Python.git',
      sourceLink: 'https://github.com/NithishSaravananRss/Hangman-Game-Python.git',
    },
    {
      title: 'Income and Expenses Tracker ',
      description:
        'A Windows Forms application built in C# (.NET Framework) to manage personal income and expenses.',
      category: 'Full Stack',
      tags: ['.Net', 'C#','SQL Server'],
      image: '💰',
      gradient: 'from-orange-500 to-red-500',
      demoLink: 'https://github.com/NithishSaravananRss/Income-And-Expense-Tracker.git',
      sourceLink: 'https://github.com/NithishSaravananRss/Income-And-Expense-Tracker.git',
    },
    // {
    //   title: 'Chat Application',
    //   description:
    //     'Real-time chat application with group messaging, file sharing, and video call capabilities.',
    //   category: 'Full Stack',
    //   tags: ['Socket.io', 'WebRTC', 'Node.js', 'React'],
    //   image: '💬',
    //   gradient: 'from-indigo-500 to-blue-500',
    //   demoLink: 'https://your-demo-link.com',
    //   sourceLink: 'https://github.com/yourusername/chat-app',
    // },
    // {
    //   title: 'Portfolio Generator',
    //   description:
    //     'Tool to help developers create stunning portfolios with customizable templates and themes.',
    //   category: 'Frontend',
    //   tags: ['React', 'Tailwind', 'Vite', 'Animation'],
    //   image: '🎨',
    //   gradient: 'from-pink-500 to-rose-500',
    //   demoLink: 'https://your-demo-link.com',
    //   sourceLink: 'https://github.com/yourusername/portfolio-generator',
    // },
  ]

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend']

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-500/10 via-indigo-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of projects I've built to solve problems and explore new technologies
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700 hover:text-indigo-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`group bg-slate-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/20 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Project Image/Icon */}
              <div
                className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                <div className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
                  {project.image}
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300 h-14 flex items-center">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed h-24 overflow-hidden">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 min-h-[3rem] items-start content-start">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20 whitespace-nowrap h-fit"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  {project.demoLink ? (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg font-medium hover:bg-gradient-to-r hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300 border border-indigo-500/20 hover:border-purple-500 text-center"
                    >
                      View Demo
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex-1 px-4 py-2 bg-slate-700/30 text-gray-500 rounded-lg font-medium cursor-not-allowed border border-slate-700/30"
                    >
                      No Demo
                    </button>
                  )}
                  <a
                    href={project.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-slate-800 text-gray-300 rounded-lg font-medium hover:bg-slate-700 hover:text-indigo-400 transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 text-center"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
