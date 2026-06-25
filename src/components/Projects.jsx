import { useState } from 'react'
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react'
import { projects } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ProjectCard({ project, index }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`group h-full bg-white border rounded-xl p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
        project.featured
          ? 'border-primary/30 hover:border-primary/50 hover:shadow-indigo-50'
          : 'border-slate-100 hover:border-primary/20 hover:shadow-slate-50'
      }`}>
        {project.featured && (
          <div className="flex items-center gap-1 text-xs font-mono text-primary bg-primary/5 border border-primary/20 rounded-full px-2.5 py-1 w-fit mb-3">
            ★ Featured
          </div>
        )}

        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <span className="text-xs font-mono text-slate-400 whitespace-nowrap">{project.period}</span>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-mono px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-200 rounded">
              {t}
            </span>
          ))}
        </div>

        {(project.github || project.live) && (
          <div className="flex items-center gap-3">
            {project.github && (
              <a href={project.github} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors">
                <Github size={15} /> Code
              </a>
            )}
            {project.live && (
              <a href={project.live} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors">
                <ExternalLink size={15} /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [titleRef, titleVisible] = useScrollReveal()
  const [showAll, setShowAll] = useState(false)

  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)
  const displayed = showAll ? projects : featured

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="font-mono text-primary text-sm mb-2">04. things I've built</p>
          <h2 className="text-4xl font-black text-slate-800">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-500 hover:border-primary hover:text-primary bg-white rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              {showAll ? (
                <><ChevronUp size={16} /> Show Less</>
              ) : (
                <><ChevronDown size={16} /> Show All {projects.length} Projects</>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
