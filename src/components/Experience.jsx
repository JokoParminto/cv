import { Briefcase, BarChart2, MapPin } from 'lucide-react'
import { experiences } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'

const SA_ROLES = ['Lead System Analyst', 'System Analyst']

function ExperienceCard({ exp, index, total }) {
  const [ref, visible] = useScrollReveal()
  const isSA = SA_ROLES.some(r => exp.role.includes(r))

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex gap-6">
        {/* Timeline dot */}
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
            isSA
              ? 'bg-purple-50 border-purple-400'
              : 'bg-indigo-50 border-primary'
          }`}>
            {isSA
              ? <BarChart2 size={16} className="text-purple-500" />
              : <Briefcase size={16} className="text-primary" />
            }
          </div>
          {index < total - 1 && (
            <div className="w-px flex-1 bg-gradient-to-b from-slate-200 to-transparent mt-2" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-10">
          <div className={`bg-white border rounded-xl p-6 transition-all duration-300 shadow-sm ${
            isSA
              ? 'border-purple-100 hover:border-purple-300 hover:shadow-purple-50'
              : 'border-slate-100 hover:border-primary/30 hover:shadow-indigo-50'
          } hover:shadow-md`}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                    isSA
                      ? 'bg-purple-50 text-purple-600 border-purple-200'
                      : 'bg-indigo-50 text-primary border-indigo-100'
                  }`}>
                    {isSA ? 'System Analyst' : 'Engineering'}
                  </span>
                </div>
                <p className={`font-medium text-sm ${isSA ? 'text-purple-500' : 'text-primary'}`}>
                  {exp.company}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-mono text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 whitespace-nowrap">
                  {exp.period}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1 justify-end">
                  <MapPin size={10} />
                  {exp.location}
                </div>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {exp.description.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-500 leading-relaxed">
                  <span className={`mt-0.5 flex-shrink-0 ${isSA ? 'text-purple-400' : 'text-primary'}`}>▸</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.tech.map((t) => (
                <span key={t} className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                  isSA
                    ? 'bg-purple-50 text-purple-600 border-purple-100'
                    : 'bg-indigo-50 text-primary border-indigo-100'
                }`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const [titleRef, titleVisible] = useScrollReveal()

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`mb-10 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="font-mono text-primary text-sm mb-2">02. where I've worked</p>
          <h2 className="text-4xl font-black text-slate-800">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mt-4 mb-6" />

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-3 h-3 rounded-full bg-primary/50" />
              Engineering
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-3 h-3 rounded-full bg-purple-400/50" />
              System Analysis
            </div>
          </div>
        </div>

        <div>
          {[...experiences].reverse().map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} total={experiences.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
