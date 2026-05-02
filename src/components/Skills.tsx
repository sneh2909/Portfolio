import { skills } from "@/data/portfolio";
import AnimatedSection from "./AnimatedSection";

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="h-px bg-border mb-20" />

      <AnimatedSection>
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-10">
          Skills
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items], i) => (
          <AnimatedSection key={category} delay={i * 60}>
            <div>
              <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface border border-border text-foreground-dim hover:border-accent/40 hover:text-accent transition-colors duration-200 cursor-default"
                  >
                    {item}
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
