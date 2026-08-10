import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  personal,
  skills,
  experience,
  education,
  projects,
  languages,
} from "@/data/resumeData";

const INK = "#111318";
const MUTED = "#5b5f68";
const LINE = "#d8dade";
const ACCENT = "#2f5fa8";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 38,
    fontFamily: "Helvetica",
    fontSize: 8.8,
    color: INK,
    lineHeight: 1.35,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 17,
    color: INK,
  },
  title: {
    fontSize: 9.5,
    color: MUTED,
    marginTop: 3,
  },
  contactLine: {
    marginTop: 7,
    fontSize: 8,
    color: MUTED,
  },
  headerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    marginTop: 10,
    marginBottom: 11,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.8,
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  section: {
    marginBottom: 11,
  },
  paragraph: {
    fontSize: 8.8,
    color: INK,
  },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.3,
    color: INK,
  },
  itemSubtitle: {
    fontSize: 8.4,
    color: MUTED,
    marginTop: 1,
  },
  itemMeta: {
    fontSize: 8,
    color: MUTED,
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 3,
    paddingLeft: 2,
  },
  bulletMark: {
    width: 8,
    fontSize: 8.4,
    color: MUTED,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.4,
    color: INK,
  },
  projectParagraph: {
    fontSize: 8.4,
    color: INK,
    marginTop: 4,
  },
  entry: {
    marginBottom: 8,
  },
  stackLine: {
    fontSize: 7.6,
    color: ACCENT,
    marginTop: 4,
  },
  skillRow: {
    marginBottom: 5,
  },
  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: INK,
  },
  skillItems: {
    fontSize: 8.2,
    color: MUTED,
    marginTop: 1,
  },
  educationRow: {
    marginBottom: 6,
  },
  languageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8.2,
    marginBottom: 2,
  },
});

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
        <View>
          <Text style={styles.name}>{personal.name}</Text>
          <Text style={styles.title}>{personal.title}</Text>
          <Text style={styles.contactLine}>{contactParts.join("   ·   ")}</Text>
        </View>
        <View style={styles.headerDivider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          <Text style={styles.paragraph}>{personal.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiência</Text>
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
          <Text style={styles.sectionTitle}>Projetos</Text>
          {projects.map((project) => (
            <View key={project.name} style={styles.entry}>
              <Text style={styles.itemTitle}>{project.name}</Text>
              <Text style={styles.projectParagraph}>{project.summary}</Text>
              <Text style={styles.projectParagraph}>{project.approach}</Text>
              <Text style={styles.stackLine}>{project.stack.join("  ·  ")}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação</Text>
          {education.map((item) => (
            <View key={item.institution} style={styles.educationRow}>
              <Text style={styles.itemTitle}>{item.degree}</Text>
              <Text style={styles.itemSubtitle}>{item.institution}</Text>
              <Text style={styles.itemMeta}>{item.period}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idiomas</Text>
          {languages.map((lang) => (
            <View key={lang.name} style={styles.languageRow}>
              <Text style={{ color: INK }}>{lang.name}</Text>
              <Text style={{ color: MUTED }}>{lang.level}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades técnicas</Text>
          {skills.map((group) => (
            <View key={group.category} style={styles.skillRow}>
              <Text style={styles.skillCategory}>{group.category}</Text>
              <Text style={styles.skillItems}>{group.items.join(" · ")}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
