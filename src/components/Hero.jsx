import { useEffect, useState } from 'react'
import { Download, Mail, Github, Linkedin, MapPin, Circle } from 'lucide-react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import CVPdf from './CVPdf'
import { personalInfo } from '../data/portfolio'

const roles = [
  'Lead System Analyst',
  'Backend Engineer',
  'API Architect',
  'Business & Tech Bridge',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  return (
    <section id="about" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Text */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono">
              <Circle size={8} className="fill-green-500 text-green-500 animate-pulse" />
              <span className="text-green-600 font-medium">Open to opportunities</span>
            </div>

            <div>
              <p className="text-slate-400 text-lg mb-2">Hi there, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-3">
                <span className="text-gradient">{personalInfo.name}</span>
              </h1>
              <div className="text-xl lg:text-2xl font-mono text-slate-600 h-8">
                <span>{displayed}</span>
                <span className="border-r-2 border-primary ml-0.5 animate-blink">&nbsp;</span>
              </div>
            </div>

            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
              {personalInfo.bio}
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={14} className="text-primary" />
              {personalInfo.location}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-primary/20"
              >
                <Mail size={16} />
                Contact Me
              </a>
              <PDFDownloadLink
                document={<CVPdf />}
                fileName="HeroBagus_CV.pdf"
                className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 hover:border-primary hover:text-primary bg-white rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                {({ loading }) => (
                  <>
                    <Download size={16} />
                    {loading ? 'Generating...' : 'Download CV'}
                  </>
                )}
              </PDFDownloadLink>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer"
                className="text-slate-400 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer"
                className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 border-glow flex items-center justify-center overflow-hidden shadow-xl">
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-8xl font-black text-gradient opacity-20">HB</span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/5 rounded-full blur-xl" />
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg">
              <div className="text-2xl font-black text-gradient">7+</div>
              <div className="text-xs text-slate-400">Years Exp.</div>
            </div>
            <div className="absolute -right-6 bottom-8 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg">
              <div className="text-2xl font-black text-gradient">13+</div>
              <div className="text-xs text-slate-400">Projects</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-20 animate-bounce">
          <a href="#experience" className="text-slate-300 hover:text-primary transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
