import Hero from "~/components/hero";
import GallerySection from "~/components/gallery-section";
import { createClient } from "~/lib/supabase/server";
import { Section } from "~/components/shared/section";
import { ChromaticTextReveal } from "~/components/motion/chromatic-text-reveal";
import { FullWidthKineticText } from "~/components/motion/kinetic-text";
import { Services } from "~/components/services";
import { fetchQuery } from "~/lib/supabase/query";
import { SkillSet } from "~/components/skillset";
import { WorkHistory } from "~/components/work-history";

export default async function HomePage() {
  const supabase = await createClient();

  const [workHistory, skillset, services] = await Promise.all([
    fetchQuery(
      supabase
        .from("work_experiences")
        .select("company, role, type, location, company_location, start_date, end_date, description, tech_stack")
        .eq("published", true)
        .order("sort_order", { ascending: true }),
      "workHistory"
    ),
    fetchQuery(supabase.from("skillset").select("skill"), "skillset"),
    fetchQuery(supabase.from("services").select("title, description"), "services")
  ]);

  const galleryItems = Array.from({ length: 8 }, (_, i) => ({
    image: `${process.env.NEXT_PUBLIC_SUPABASE_CDN}/${i + 1}.jpeg`,
    text: ""
  }));

  const CURRENT_YEAR = new Date().getFullYear();
  const START_YEAR = 2020;
  const EXPERIENCE_IN_YEARS = CURRENT_YEAR - START_YEAR;

  return (
    <div className="flex flex-col">
      {/* hero */}
      <Hero />

      {/* about */}
      <Section className="pt-48 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-4 text-lg leading-relaxed">
            <ChromaticTextReveal>
              I&apos;m a frontend developer who cares deeply about craft — the details that make an interface feel
              right. I work primarily with React, TypeScript, and Next.js.
            </ChromaticTextReveal>
            <ChromaticTextReveal delay={0.3} foregroundColor="oklch(0.556 0 0)">
              Detail-oriented Frontend Developer with {EXPERIENCE_IN_YEARS} years of experience across startups,
              enterprise companies, and freelance projects. Passionate about quality, with a strong focus on getting
              every detail right. Currently expanding into Fintech & Blockchain technologies while maintaining solid
              expertise in modern frontend development. A calm, curious professional committed to continuous learning
              and delivering high-standard work.
            </ChromaticTextReveal>
          </div>
        </div>
      </Section>

      {/* gallery */}
      <Section
        className="relative flex flex-col min-h-200 py-16 -mt-8"
        style={{
          perspective: "800px",
          maskImage: `linear-gradient(
            to left,
            transparent,
            black 40px,
            black calc(100% - 40px),
            transparent
          )`
        }}
      >
        <GallerySection galleryItems={galleryItems} />
      </Section>

      {/* the speech */}
      <Section>
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-4 text-lg leading-relaxed">
            <ChromaticTextReveal>
              <blockquote className="text-lg italic">AI is changing everything too fast, I am keeping up.</blockquote>
            </ChromaticTextReveal>

            <ChromaticTextReveal delay={0.4} foregroundColor="oklch(0.556 0 0)">
              A new language or framework comes out every day, and I make sure to stay ahead of the curve. Choosing the
              right tool for the job is essential — that&apos;s where a good developer proves themselves. The true
              measure of a developer isn&apos;t the number of technologies they know, but how seamlessly they adapt to
              the ones they need. In an industry that evolves every day, I embrace continuous learning as a core
              discipline rather than a choice.
            </ChromaticTextReveal>
          </div>
        </div>
      </Section>

      {/* skillset */}
      {skillset && skillset.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl px-6">
            <ChromaticTextReveal
              delay={0.8}
              foregroundColor="oklch(0.556 0 0)"
              className="mb-8 text-xs uppercase tracking-widest"
            >
              SKILLSET
            </ChromaticTextReveal>

            <SkillSet skillset={skillset} />
          </div>
        </Section>
      )}

      {/* services */}
      {services && services.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-4 text-lg leading-relaxed">
              <ChromaticTextReveal
                foregroundColor="oklch(0.556 0 0)"
                className="mb-8 text-xs uppercase tracking-widest"
                delay={1}
              >
                Services
              </ChromaticTextReveal>

              <Services services={services} />
            </div>
          </div>
        </Section>
      )}

      <Section className="py-48 overflow-hidden">
        <FullWidthKineticText text="LESS TALK, MUCH WORK" as="h1" className="scale-y-200 origin-center" />
      </Section>

      {/* work history */}
      {workHistory && workHistory.length > 0 && (
        <Section>
          <div className="mx-auto max-w-4xl px-6">
            <ChromaticTextReveal
              foregroundColor="oklch(0.556 0 0)"
              className="mb-8 text-xs uppercase tracking-widest"
              delay={0.2}
            >
              Experience
            </ChromaticTextReveal>

            <WorkHistory history={workHistory} />
          </div>
        </Section>
      )}
    </div>
  );
}
