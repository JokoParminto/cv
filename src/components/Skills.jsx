import { useState } from 'react'
import { skills } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'

const CATEGORIES = ['All', 'System Analysis', 'Backend', 'Database', 'Cloud & DevOps']

const CATEGORY_COLORS = {
  'System Analysis': { chip: 'bg-purple-50 border-purple-200 text-purple-700', badge: 'bg-purple-100 text-purple-600', dot: 'bg-purple-400' },
  'Backend':         { chip: 'bg-indigo-50 border-indigo-200 text-indigo-700', badge: 'bg-indigo-100 text-indigo-600', dot: 'bg-indigo-400' },
  'Database':        { chip: 'bg-blue-50 border-blue-200 text-blue-700',       badge: 'bg-blue-100 text-blue-600',    dot: 'bg-blue-400' },
  'Cloud & DevOps':  { chip: 'bg-emerald-50 border-emerald-200 text-emerald-700', badge: 'bg-emerald-100 text-emerald-600', dot: 'bg-emerald-400' },
}

function SkillChip({ skill, visible, index }) {
  const color = CATEGORY_COLORS[skill.category]
  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md ${color.chip} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <span className="text-sm font-medium">{skill.name}</span>
      <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${color.badge}`}>
        {skill.years} yr{skill.years > 1 ? 's' : ''}
      </span>
    </div>
  )
}

export default function Skills() {
  const [titleRef, titleVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal(0.1)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const items = filtered.filter(s => s.category === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {})

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

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
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

        {/* Grouped chips */}
        <div ref={gridRef} className="space-y-8">
          {activeCategory === 'All' ? (
            Object.entries(grouped).map(([cat, items]) => {
              const color = CATEGORY_COLORS[cat]
              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${color.dot}`} />
                    <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest">
                      {cat}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((skill, i) => (
                      <SkillChip key={skill.name} skill={skill} visible={gridVisible} index={i} />
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((skill, i) => (
                <SkillChip key={skill.name} skill={skill} visible={gridVisible} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
