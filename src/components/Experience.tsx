import { experience } from "@/data/portfolio";
import AnimatedSection from "./AnimatedSection";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 max-w-5xl mx-auto">
      <AnimatedSection>
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-10">
          Experience
        </h2>
      </AnimatedSection>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-border hidden md:block" />

        <div className="flex flex-col gap-12">
          {experience.map((job, i) => (
            <AnimatedSection key={`${job.company}-${job.role}`} delay={i * 80}>
              <div className="md:pl-8 relative group">
                {/* Timeline dot */}
                <div className="hidden md:block absolute -left-[4.5px] top-[7px] w-2.5 h-2.5 rounded-full bg-surface-2 border-2 border-border group-hover:border-accent transition-colors duration-300" />

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                  <div>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-foreground hover:text-accent transition-colors inline-flex items-center gap-1.5"
                    >
                      {job.company}
                      <svg className="w-3 h-3 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="text-sm text-foreground-dim mt-0.5">{job.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono text-muted">{job.period}</span>
                    <p className="text-xs text-muted-2">{job.location}</p>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-1.5 text-sm text-foreground-dim">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-surface-2 border border-border text-foreground-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
