import { Mail, Linkedin, Phone, Send, GraduationCap, Globe } from 'lucide-react'
import { personalInfo, education, languages } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Contact() {
  const [ref, visible] = useScrollReveal()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject.value)}&body=${encodeURIComponent(form.message.value)}`
  }

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="font-mono text-primary text-sm mb-2">05. what's next</p>
          <h2 className="text-4xl font-black text-slate-800 mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mb-6" />
          <p className="text-slate-500 max-w-lg mb-16">
            I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi — my inbox is always open.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Info + Education + Languages */}
            <div className="space-y-8">
              <div className="space-y-4">
                {[
                  { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: Phone, label: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                  { icon: Linkedin, label: personalInfo.linkedin, href: `https://${personalInfo.linkedin}` },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-mono text-slate-400 mb-4 flex items-center gap-2">
                  <GraduationCap size={14} className="text-primary" />
                  Education
                </h3>
                {education.map((edu) => (
                  <div key={edu.school} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                    <div className="font-semibold text-slate-800">{edu.degree}</div>
                    <div className="text-primary text-sm mt-1">{edu.school}</div>
                    <div className="mt-2 text-xs text-slate-400 font-mono">{edu.period}</div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-sm font-mono text-slate-400 mb-4 flex items-center gap-2">
                  <Globe size={14} className="text-primary" />
                  Languages
                </h3>
                <div className="flex gap-3">
                  {languages.map((lang) => (
                    <div key={lang.name} className="bg-white border border-slate-100 rounded-xl px-4 py-3 flex-1 shadow-sm">
                      <div className="font-semibold text-slate-800 text-sm">{lang.name}</div>
                      <div className="text-xs text-primary mt-1">{lang.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">Subject</label>
                <input
                  name="subject"
                  type="text"
                  required
                  placeholder="What's this about?"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-primary/20"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
