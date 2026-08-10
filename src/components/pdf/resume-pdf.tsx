import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  personal,
  skills,
  experience,
  education,
  projects,
  languages,
} from "@/data/resumeData";

const INK = "#0f172a";
const MUTED = "#5b5f68";
const ACCENT = "#059669";
const ACCENT_SOFT = "#d1fae5";
const ON_ACCENT = "#ffffff";
const ON_ACCENT_MUTED = "#c8f5e2";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8.3,
    color: INK,
    lineHeight: 1.3,
  },
  headerBand: {
    backgroundColor: ACCENT,
    paddingHorizontal: 34,
    paddingTop: 20,
    paddingBottom: 15,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 17,
    lineHeight: 1.1,
    color: ON_ACCENT,
  },
  title: {
    fontSize: 9,
    color: ON_ACCENT_MUTED,
    marginTop: 6,
  },
  contactLine: {
    marginTop: 6,
    fontSize: 7.6,
    color: ON_ACCENT_MUTED,
  },
  body: {
    paddingHorizontal: 34,
    paddingTop: 14,
    paddingBottom: 18,
  },
  sectionTitlePill: {
    alignSelf: "flex-start",
    backgroundColor: ACCENT_SOFT,
    borderRadius: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginBottom: 6,
  },
  sectionTitleText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  section: {
    marginBottom: 9,
  },
  paragraph: {
    fontSize: 8.3,
    color: INK,
  },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: INK,
  },
  itemSubtitle: {
    fontSize: 8,
    color: MUTED,
    marginTop: 1,
  },
  itemMeta: {
    fontFamily: "Courier",
    fontSize: 7.3,
    color: MUTED,
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 2,
  },
  bulletMark: {
    width: 8,
    fontSize: 8,
    color: ACCENT,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    color: INK,
  },
  projectParagraph: {
    fontSize: 8,
    color: INK,
    marginTop: 3,
  },
  entry: {
    marginBottom: 7,
    borderLeftWidth: 2,
    borderLeftColor: ACCENT_SOFT,
    paddingLeft: 8,
  },
  stackLine: {
    fontSize: 7,
    fontFamily: "Courier-Bold",
    color: ACCENT,
    marginTop: 4,
  },
  footerColumns: {
    flexDirection: "row",
  },
  footerColumn: {
    flex: 1,
    paddingRight: 16,
  },
  skillRow: {
    marginBottom: 4,
  },
  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.6,
    color: INK,
  },
  skillItems: {
    fontFamily: "Courier",
    fontSize: 7.4,
    color: MUTED,
    marginTop: 1,
  },
  educationRow: {
    marginBottom: 5,
  },
  languageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.6,
    marginBottom: 2,
  },
});

function SectionTitle({ children }: { children: string }) {
  return (
    <View style={styles.sectionTitlePill}>
      <Text style={styles.sectionTitleText}>{children}</Text>
    </View>
  );
}

export function ResumePDF() {
  const contactParts = [
    personal.location,
    personal.phone,
    personal.email,
    personal.github,
  ].filter(Boolean);

  return (
    <Document title={`${personal.name} — Currículo`} author={personal.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <Text style={styles.name}>{personal.name}</Text>
          <Text style={styles.title}>{personal.title}</Text>
          <Text style={styles.contactLine}>{contactParts.join("   ·   ")}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.section}>
            <SectionTitle>Resumo</SectionTitle>
            <Text style={styles.paragraph}>{personal.summary}</Text>
          </View>

          <View style={styles.section}>
            <SectionTitle>Experiência</SectionTitle>
            {experience.map((job) => (
              <View key={job.company} style={styles.entry}>
                <View style={styles.itemHeaderRow}>
                  <View>
                    <Text style={styles.itemTitle}>{job.role}</Text>
                    <Text style={styles.itemSubtitle}>{job.company}</Text>
                  </View>
                  <View>
                    <Text style={styles.itemMeta}>{job.period}</Text>
                    <Text style={styles.itemMeta}>{job.location}</Text>
                  </View>
                </View>
                {job.bullets.map((bullet, index) => (
                  <View key={index} style={styles.bulletRow}>
                    <Text style={styles.bulletMark}>—</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <SectionTitle>Projetos</SectionTitle>
            {projects.map((project) => (
              <View key={project.name} style={styles.entry}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                <Text style={styles.projectParagraph}>{project.summary}</Text>
                <Text style={styles.projectParagraph}>{project.approach}</Text>
                <Text style={styles.stackLine}>
                  {project.stack.join("   ·   ")}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.footerColumns}>
            <View style={styles.footerColumn}>
              <View style={styles.section}>
                <SectionTitle>Formação</SectionTitle>
                {education.map((item) => (
                  <View key={item.institution} style={styles.educationRow}>
                    <Text style={styles.itemTitle}>{item.degree}</Text>
                    <Text style={styles.itemSubtitle}>{item.institution}</Text>
                    <Text style={styles.itemMeta}>{item.period}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <SectionTitle>Idiomas</SectionTitle>
                {languages.map((lang) => (
                  <View key={lang.name} style={styles.languageRow}>
                    <Text style={{ color: INK }}>{lang.name}</Text>
                    <Text style={{ color: MUTED }}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.footerColumn}>
              <View style={styles.section}>
                <SectionTitle>Habilidades técnicas</SectionTitle>
                {skills.map((group) => (
                  <View key={group.category} style={styles.skillRow}>
                    <Text style={styles.skillCategory}>{group.category}</Text>
                    <Text style={styles.skillItems}>
                      {group.items.join(" · ")}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
