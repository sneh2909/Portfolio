import { publication } from "@/data/portfolio";
import AnimatedSection from "./AnimatedSection";

export default function Publications() {
  return (
    <section id="publications" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="h-px bg-border mb-20" />

      <AnimatedSection>
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-10">
          Research
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={80}>
        <a
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-border bg-surface card-glow p-6 group"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              IEEE · Conference Paper
            </span>
            <svg
              className="w-4 h-4 text-muted group-hover:text-accent transition-colors shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>

          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2 leading-snug">
            {publication.title}
          </h3>

          <p className="text-sm text-foreground-dim mb-3 leading-relaxed">
            {publication.summary}
          </p>

          <div className="flex items-center gap-3 text-xs font-mono text-muted">
            <span>{publication.venue}</span>
            <span>·</span>
            <span>{publication.period}</span>
          </div>
        </a>
      </AnimatedSection>
    </section>
  );
}
