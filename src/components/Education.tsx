import { education, achievements, certifications } from "@/data/portfolio";
import AnimatedSection from "./AnimatedSection";

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="h-px bg-border mb-20" />

      {/* Education */}
      <AnimatedSection>
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-10">
          Education
        </h2>
      </AnimatedSection>

      <div className="flex flex-col gap-6 mb-16">
        {education.map((edu, i) => (
          <AnimatedSection key={edu.institution} delay={i * 80}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-border last:border-0">
              <div>
                <p className="font-semibold text-foreground">{edu.institution}</p>
                <p className="text-sm text-foreground-dim mt-0.5">{edu.degree}</p>
                <p className="text-xs font-mono text-muted mt-0.5">{edu.location}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-mono text-muted">{edu.period}</p>
                <p className="text-xs font-mono text-accent mt-1">GPA: {edu.gpa}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Achievements */}
      <AnimatedSection>
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-6">
          Achievements
        </h2>
      </AnimatedSection>

      <div className="flex flex-col gap-3 mb-16">
        {achievements.map((item, i) => (
          <AnimatedSection key={item.title} delay={i * 60}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0 group"
            >
              <div>
                <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-foreground-dim mt-0.5">{item.description}</p>
              </div>
              <span className="text-xs font-mono text-muted shrink-0">{item.period}</span>
            </a>
          </AnimatedSection>
        ))}
      </div>

      {/* Certifications */}
      <AnimatedSection>
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-6">
          Certifications
        </h2>
      </AnimatedSection>

      <div className="flex flex-col gap-3">
        {certifications.map((cert, i) => (
          <AnimatedSection key={cert.title} delay={i * 60}>
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0 group"
            >
              <div>
                <p className="text-sm text-foreground group-hover:text-accent transition-colors">
                  {cert.title}
                </p>
                <p className="text-xs text-foreground-dim mt-0.5">{cert.issuer}</p>
              </div>
              <span className="text-xs font-mono text-muted shrink-0">{cert.period}</span>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
