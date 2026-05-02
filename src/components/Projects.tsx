import { projects } from "@/data/portfolio";
import AnimatedSection from "./AnimatedSection";

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="py-20 px-6 max-w-5xl mx-auto">
      <AnimatedSection>
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-10">
          Projects
        </h2>
      </AnimatedSection>

      {/* Featured project */}
      <AnimatedSection delay={80}>
        <div className="mb-8 rounded-xl border border-border bg-surface card-glow p-6 md:p-8 relative overflow-hidden">
          {/* Glow accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider">Featured Project</span>
                <h3 className="text-xl font-semibold text-foreground mt-1">{featured.title}</h3>
              </div>
              <span className="text-xs font-mono text-muted shrink-0 mt-1">{featured.period}</span>
            </div>

            <p className="text-sm text-foreground-dim mb-4 leading-relaxed">{featured.description}</p>

            <ul className="space-y-1.5 text-sm text-foreground-dim mb-5">
              {featured.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent mt-0.5 shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {featured.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-surface-2 border border-border text-foreground-dim">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                Live Demo <ExternalIcon />
              </a>
              {featured.github && (
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground-dim hover:text-foreground transition-colors"
                >
                  <GitHubIcon /> Source
                </a>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Other projects grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {rest.map((project, i) => (
          <AnimatedSection key={project.title} delay={120 + i * 80}>
            <div className="rounded-xl border border-border bg-surface card-glow p-5 h-full flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-foreground text-base">{project.title}</h3>
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-foreground transition-colors"
                    >
                      <GitHubIcon />
                    </a>
                  )}
                  {project.url !== project.github && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs font-mono text-muted mb-2">{project.period}</p>
              <p className="text-sm text-foreground-dim mb-4 flex-1 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-surface-2 border border-border text-foreground-dim">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
