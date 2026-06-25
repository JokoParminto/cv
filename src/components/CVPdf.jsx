import {
  Document, Page, Text, View, StyleSheet, Font, Link,
} from '@react-pdf/renderer'
import { personalInfo, experiences, skills, education, languages, projects } from '../data/portfolio'

Font.registerHyphenationCallback(word => [word])

const C = {
  bg: '#ffffff',
  sidebar: '#eef2ff',
  card: '#f8fafc',
  border: '#e2e8f0',
  primary: '#4f46e5',
  primaryLight: '#6366f1',
  purple: '#7c3aed',
  purpleLight: '#9333ea',
  white: '#0f172a',
  gray300: '#1e293b',
  gray400: '#475569',
  gray500: '#94a3b8',
  gray600: '#cbd5e1',
  accent: '#059669',
}

const s = StyleSheet.create({
  page: { backgroundColor: C.bg, flexDirection: 'row', fontFamily: 'Helvetica', fontSize: 9 },

  // sidebar
  sb: { width: '31%', backgroundColor: C.sidebar, paddingTop: 26, paddingBottom: 22, paddingLeft: 15, paddingRight: 15, borderRightWidth: 1, borderRightColor: C.border },
  avatar: { width: 64, height: 64, borderRadius: 10, backgroundColor: C.card, borderWidth: 2, borderColor: C.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 9 },
  avatarTxt: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: C.primary },
  sbName: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C.white, marginBottom: 2 },
  sbTitle: { fontSize: 6.5, color: C.primaryLight, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 5 },
  badge: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: C.accent, marginRight: 4 },
  badgeTxt: { fontSize: 6.5, color: C.accent },
  secLabel: { fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: C.gray500, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 5, marginTop: 13 },
  secBar: { width: 16, height: 2, backgroundColor: C.primary, borderRadius: 1, marginBottom: 7 },
  ctRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5 },
  ctLbl: { fontSize: 6.5, color: C.gray500, width: 40 },
  ctVal: { fontSize: 7, color: C.gray300, flex: 1 },
  ctLink: { fontSize: 7, color: C.primaryLight, flex: 1, textDecoration: 'none' },
  skillRow: { marginBottom: 6 },
  skillHdr: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  skillName: { fontSize: 6.5, color: C.gray300, flex: 1, marginRight: 3 },
  skillPct: { fontSize: 6, color: C.primary, fontFamily: 'Helvetica-Bold' },
  skillTrack: { height: 2.5, backgroundColor: C.border, borderRadius: 2 },
  skillFill: { height: 2.5, borderRadius: 2, backgroundColor: C.primary },
  eduBox: { backgroundColor: C.card, borderRadius: 5, paddingTop: 7, paddingBottom: 7, paddingLeft: 8, paddingRight: 8, borderLeftWidth: 2, borderLeftColor: C.primary, marginBottom: 5 },
  eduDeg: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: C.white, marginBottom: 2 },
  eduSch: { fontSize: 7, color: C.primary, marginBottom: 1 },
  eduPer: { fontSize: 6.5, color: C.gray500 },
  langRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, backgroundColor: C.card, borderRadius: 4, paddingTop: 5, paddingBottom: 5, paddingLeft: 7, paddingRight: 7 },
  langName: { fontSize: 7.5, color: C.white },
  langLvl: { fontSize: 6.5, color: C.primaryLight },

  // main
  main: { flex: 1, paddingTop: 26, paddingBottom: 20, paddingLeft: 20, paddingRight: 20 },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: C.white, letterSpacing: -0.5 },
  role: { fontSize: 9.5, color: C.gray400, letterSpacing: 0.3, marginTop: 3, marginBottom: 11 },
  divider: { height: 1, backgroundColor: C.border, marginBottom: 11 },
  secTitle: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: C.white, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 3 },
  secAccent: { width: 20, height: 2, backgroundColor: C.primary, borderRadius: 1, marginBottom: 7 },
  bio: { fontSize: 7.5, color: C.gray400, lineHeight: 1.6, marginBottom: 13 },

  // exp card full
  expCard: { backgroundColor: C.card, borderRadius: 5, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, marginBottom: 6, borderLeftWidth: 2 },
  expHdr: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
  expRoleRow: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 5 },
  expRole: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: C.white },
  expBadge: { fontSize: 5.5, paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 3, marginLeft: 4 },
  expPeriod: { fontSize: 6, color: C.gray500, backgroundColor: C.bg, paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5, borderRadius: 3 },
  expCo: { fontSize: 7.5, marginBottom: 4 },
  bullet: { flexDirection: 'row', marginBottom: 2 },
  bulletDot: { fontSize: 7, marginRight: 3, marginTop: 0.5 },
  bulletTxt: { fontSize: 7, color: C.gray400, lineHeight: 1.5, flex: 1 },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4, gap: 3 },
  tech: { fontSize: 6, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3 },

  // exp card compact (for older roles)
  compactCard: { backgroundColor: C.card, borderRadius: 5, paddingTop: 7, paddingBottom: 7, paddingLeft: 10, paddingRight: 10, marginBottom: 5, borderLeftWidth: 2 },
  compactRole: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.white },
  compactCo: { fontSize: 7, marginBottom: 3 },
  compactTechRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginTop: 3 },

  // project card
  projCard: { backgroundColor: C.card, borderRadius: 5, paddingTop: 9, paddingBottom: 9, paddingLeft: 10, paddingRight: 10, marginBottom: 7, borderLeftWidth: 2, borderLeftColor: C.primary },
  projHdr: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  projName: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: C.white },
  projPeriod: { fontSize: 6, color: C.gray500, backgroundColor: C.bg, paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5, borderRadius: 3 },
  projDesc: { fontSize: 7, color: C.gray400, lineHeight: 1.5, marginBottom: 5 },

  // SA artifact chip
  artifact: { backgroundColor: '#f3e8ff', borderRadius: 4, paddingTop: 4, paddingBottom: 4, paddingLeft: 7, paddingRight: 7, marginBottom: 4 },
  artifactTxt: { fontSize: 7, color: C.purple },

  // stat row
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, backgroundColor: C.card, borderRadius: 4, paddingTop: 6, paddingBottom: 6, paddingLeft: 8, paddingRight: 8 },
  statLbl: { fontSize: 7, color: C.gray400 },
  statVal: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.primary },
})

const REVERSED = [...experiences].reverse()
const RECENT = REVERSED.slice(0, 3)   // Lead SA + Backend Dev + BE PT Tamadun
const OLDER  = REVERSED.slice(3)      // 4 older engineering roles
const FEATURED = projects.filter(p => p.featured)
const OTHER = projects.filter(p => !p.featured)
const SKILLS_P1 = skills.slice(0, 9)
const SKILLS_P2 = skills.slice(9)

function SkillBar({ skill }) {
  return (
    <View style={s.skillRow}>
      <View style={s.skillHdr}>
        <Text style={s.skillName}>{skill.name}</Text>
        <Text style={s.skillPct}>{skill.level}%</Text>
      </View>
      <View style={s.skillTrack}>
        <View style={[s.skillFill, { width: `${skill.level}%` }]} />
      </View>
    </View>
  )
}

function ExpFull({ exp }) {
  const isSA = exp.role.includes('System Analyst')
  const bc = isSA ? C.purple : C.primary
  const cc = isSA ? C.purple : C.primaryLight
  const bb = isSA ? '#f3e8ff' : '#eef2ff'
  const bv = isSA ? C.purple : C.primary
  const dc = isSA ? C.purple : C.primary
  return (
    <View style={[s.expCard, { borderLeftColor: bc }]}>
      <View style={s.expHdr}>
        <View style={s.expRoleRow}>
          <Text style={s.expRole}>{exp.role}</Text>
          <Text style={[s.expBadge, { backgroundColor: bb, color: bv }]}>
            {isSA ? 'System Analysis' : 'Engineering'}
          </Text>
        </View>
        <Text style={s.expPeriod}>{exp.period}</Text>
      </View>
      <Text style={[s.expCo, { color: cc }]}>{exp.company}</Text>
      {exp.description.map((item, i) => (
        <View key={i} style={s.bullet}>
          <Text style={[s.bulletDot, { color: dc }]}>▸</Text>
          <Text style={s.bulletTxt}>{item}</Text>
        </View>
      ))}
      <View style={s.techRow}>
        {exp.tech.map(t => (
          <Text key={t} style={[s.tech, { backgroundColor: bb, color: bv }]}>{t}</Text>
        ))}
      </View>
    </View>
  )
}

function ExpCompact({ exp }) {
  return (
    <View style={[s.compactCard, { borderLeftColor: C.primary }]}>
      <View style={[s.expHdr, { marginBottom: 1 }]}>
        <View style={s.expRoleRow}>
          <Text style={s.compactRole}>{exp.role}</Text>
          <Text style={[s.expBadge, { backgroundColor: '#eef2ff', color: C.primary }]}>Engineering</Text>
        </View>
        <Text style={s.expPeriod}>{exp.period}</Text>
      </View>
      <Text style={[s.compactCo, { color: C.primaryLight }]}>{exp.company}</Text>
      {exp.description.slice(0, 3).map((item, i) => (
        <View key={i} style={s.bullet}>
          <Text style={[s.bulletDot, { color: C.primary }]}>▸</Text>
          <Text style={s.bulletTxt}>{item}</Text>
        </View>
      ))}
      <View style={s.compactTechRow}>
        {exp.tech.map(t => (
          <Text key={t} style={[s.tech, { backgroundColor: '#eef2ff', color: C.primary }]}>{t}</Text>
        ))}
      </View>
    </View>
  )
}

function Sidebar({ page }) {
  return (
    <View style={s.sb}>
      {page === 1 ? (
        <>
          <View style={s.avatar}>
            <Text style={s.avatarTxt}>HB</Text>
          </View>
          <Text style={s.sbName}>{personalInfo.name}</Text>
          <Text style={s.sbTitle}>System Analyst · Backend Engineer</Text>
          <View style={s.badge}>
            <View style={s.dot} />
            <Text style={s.badgeTxt}>Open to opportunities</Text>
          </View>

          <Text style={s.secLabel}>Contact</Text>
          <View style={s.secBar} />
          <View style={s.ctRow}><Text style={s.ctLbl}>Email</Text>
            <Link src={`mailto:${personalInfo.email}`} style={s.ctLink}>{personalInfo.email}</Link></View>
          <View style={s.ctRow}><Text style={s.ctLbl}>Phone</Text>
            <Text style={s.ctVal}>{personalInfo.phone}</Text></View>
          <View style={s.ctRow}><Text style={s.ctLbl}>Location</Text>
            <Text style={s.ctVal}>{personalInfo.location}</Text></View>
          <View style={s.ctRow}><Text style={s.ctLbl}>LinkedIn</Text>
            <Link src={`https://${personalInfo.linkedin}`} style={s.ctLink}>
              {personalInfo.linkedin.replace('linkedin.com/in/', 'in/')}
            </Link></View>

          <Text style={s.secLabel}>Core Skills</Text>
          <View style={s.secBar} />
          {SKILLS_P1.map(sk => <SkillBar key={sk.name} skill={sk} />)}

          <Text style={s.secLabel}>Education</Text>
          <View style={s.secBar} />
          {education.map(edu => (
            <View key={edu.school} style={s.eduBox}>
              <Text style={s.eduDeg}>{edu.degree}</Text>
              <Text style={s.eduSch}>{edu.school}</Text>
              <Text style={s.eduPer}>{edu.period}</Text>
            </View>
          ))}

          <Text style={s.secLabel}>Languages</Text>
          <View style={s.secBar} />
          {languages.map(l => (
            <View key={l.name} style={s.langRow}>
              <Text style={s.langName}>{l.name}</Text>
              <Text style={s.langLvl}>{l.level}</Text>
            </View>
          ))}
        </>
      ) : (
        <>
          <Text style={[s.sbName, { marginBottom: 2 }]}>{personalInfo.name}</Text>
          <Text style={[s.sbTitle, { marginBottom: 16 }]}>System Analyst · Backend Engineer</Text>

          <Text style={s.secLabel}>Additional Skills</Text>
          <View style={s.secBar} />
          {SKILLS_P2.map(sk => <SkillBar key={sk.name} skill={sk} />)}

          <Text style={s.secLabel}>Career Summary</Text>
          <View style={s.secBar} />
          {[
            { label: 'Years Experience', value: '7+' },
            { label: 'Companies', value: '5+' },
            { label: 'Projects', value: '13+' },
          ].map(st => (
            <View key={st.label} style={s.statRow}>
              <Text style={s.statLbl}>{st.label}</Text>
              <Text style={s.statVal}>{st.value}</Text>
            </View>
          ))}

          <Text style={s.secLabel}>SA Artifacts</Text>
          <View style={s.secBar} />
          {['BRD', 'FSD', 'User Stories', 'Use Case Diagram', 'Activity Diagram', 'Sequence Diagram', 'ERD', 'API Specification', 'RTM'].map(a => (
            <View key={a} style={s.artifact}>
              <Text style={s.artifactTxt}>▸  {a}</Text>
            </View>
          ))}

          <Text style={s.secLabel}>Contact</Text>
          <View style={s.secBar} />
          <View style={s.ctRow}><Text style={s.ctLbl}>Email</Text>
            <Link src={`mailto:${personalInfo.email}`} style={s.ctLink}>{personalInfo.email}</Link></View>
          <View style={s.ctRow}><Text style={s.ctLbl}>LinkedIn</Text>
            <Link src={`https://${personalInfo.linkedin}`} style={s.ctLink}>
              {personalInfo.linkedin.replace('linkedin.com/in/', 'in/')}
            </Link></View>
        </>
      )}
    </View>
  )
}

export default function CVPdf() {
  return (
    <Document title={`${personalInfo.name} — CV`} author={personalInfo.name}>

      {/* ══ PAGE 1: Profile + Recent 3 Experience ══ */}
      <Page size="A4" style={s.page}>
        <Sidebar page={1} />
        <View style={s.main}>
          <Text style={s.name}>{personalInfo.name}</Text>
          <Text style={s.role}>Lead System Analyst  ·  Backend Engineer</Text>
          <View style={s.divider} />

          <Text style={s.secTitle}>Profile</Text>
          <View style={s.secAccent} />
          <Text style={s.bio}>{personalInfo.bio}</Text>

          <Text style={s.secTitle}>Work Experience</Text>
          <View style={s.secAccent} />
          {RECENT.map(exp => <ExpFull key={exp.id} exp={exp} />)}
        </View>
      </Page>

      {/* ══ PAGE 2: Older Experience + Projects ══ */}
      <Page size="A4" style={s.page}>
        <Sidebar page={2} />
        <View style={s.main}>
          <Text style={s.secTitle}>Work Experience (cont.)</Text>
          <View style={s.secAccent} />
          {OLDER.map(exp => <ExpCompact key={exp.id} exp={exp} />)}

          <Text style={[s.secTitle, { marginTop: 10 }]}>Featured Projects</Text>
          <View style={s.secAccent} />
          {FEATURED.map(proj => (
            <View key={proj.id} style={s.projCard}>
              <View style={s.projHdr}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={s.projName}>{proj.name}</Text>
                  <Text style={[s.expBadge, { backgroundColor: '#eef2ff', color: C.primary, marginLeft: 6 }]}>
                    Featured
                  </Text>
                </View>
                <Text style={s.projPeriod}>{proj.period}</Text>
              </View>
              <Text style={s.projDesc}>{proj.description}</Text>
              <View style={s.techRow}>
                {proj.tech.map(t => (
                  <Text key={t} style={[s.tech, { backgroundColor: '#eef2ff', color: C.primary }]}>{t}</Text>
                ))}
              </View>
            </View>
          ))}

          {/* Other projects grid */}
          <Text style={[s.secTitle, { marginTop: 8 }]}>Other Projects</Text>
          <View style={s.secAccent} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {OTHER.map(p => (
              <View key={p.id} style={{
                width: '47%', backgroundColor: C.card, borderRadius: 5,
                paddingTop: 7, paddingBottom: 7, paddingLeft: 9, paddingRight: 9,
                borderWidth: 1, borderColor: C.border,
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                  <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: C.white }}>{p.name}</Text>
                  <Text style={{ fontSize: 6, color: C.gray500 }}>{p.period.split('–')[0]?.trim()}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                  {p.tech.slice(0, 3).map(t => (
                    <Text key={t} style={[s.tech, { backgroundColor: '#e0e7ff', color: C.primary }]}>{t}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={{ marginTop: 'auto', paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border }}>
            <Text style={{ fontSize: 6.5, color: C.gray600, textAlign: 'center' }}>
              {personalInfo.email}  ·  {personalInfo.phone}  ·  {personalInfo.location}
            </Text>
          </View>
        </View>
      </Page>

    </Document>
  )
}
