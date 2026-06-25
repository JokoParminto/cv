import { useEffect, useState } from 'react'
import { skills } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'

const categories = ['All', ...new Set(skills.map(s => s.category))]

function SkillBar({ skill, animate }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(skill.level), 200)
      return () => clearTimeout(t)
    }
  }, [animate, skill.level])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-700">{skill.name}</span>
        <span className="text-xs font-mono text-primary font-semibold">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [titleRef, titleVisible] = useScrollReveal()
  const [barsRef, barsVisible] = useScrollReveal(0.2)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="font-mono text-primary text-sm mb-2">03. what I work with</p>
          <h2 className="text-4xl font-black text-slate-800">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mt-4" />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                  : 'border-slate-200 text-slate-500 bg-white hover:border-primary/50 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={barsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((skill) => (
            <div
              key={skill.name}
              className="bg-white border border-slate-100 rounded-xl p-5 hover:border-primary/30 hover:shadow-md hover:shadow-indigo-50 transition-all duration-300"
            >
              <SkillBar skill={skill} animate={barsVisible} />
              <div className="mt-3">
                <span className="text-xs text-slate-400 font-mono">{skill.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
