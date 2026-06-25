import { personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="py-8 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-primary text-sm font-semibold">&lt;HB /&gt;</span>
        <p className="text-xs text-slate-400 text-center">
          Designed & Built by {personalInfo.name} · {new Date().getFullYear()}
        </p>
        <p className="text-xs text-slate-300 font-mono">React + Tailwind</p>
      </div>
    </footer>
  )
}
