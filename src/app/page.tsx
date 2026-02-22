import Link from "next/link";
import CircularGallery from "~/components/motion/circular-gallery";
import Dither from "~/components/motion/dither";
import { InlineLink, InlineLinkIcon } from "~/components/shared/inline-link";
import { Icon } from "~/components/ui/icon";
import { createClient } from "~/lib/supabase/server";
import { cn } from "~/lib/utils";
import type { WorkExperience } from "~/types";

function formatPeriod(startDate: string, endDate: string | null): string {
  const format = (date: string) => {
    const d = new Date(date + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  return `${format(startDate)} – ${endDate ? format(endDate) : "Present"}`;
}

const exploreLinks = [
  {
    href: "/blog",
    title: "Blog",
    description: "Thoughts on frontend development, tooling, and the web platform."
  },
  {
    href: "/components",
    title: "Components",
    description: "Interactive demos of custom React components with source code."
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Have a question or want to work together? Reach out."
  }
];

export default async function HomePage() {
  const CURRENT_YEAR = new Date().getFullYear();
  const START_YEAR = 2020;
  const EXPERIENCE_IN_YEARS = CURRENT_YEAR - START_YEAR;

  const supabase = await createClient();
  const { data: workHistory } = await supabase
    .from("work_experiences")
    .select("company, role, type, location, company_location, start_date, end_date, description, tech_stack")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .returns<
      Pick<
        WorkExperience,
        | "company"
        | "role"
        | "type"
        | "location"
        | "company_location"
        | "start_date"
        | "end_date"
        | "description"
        | "tech_stack"
      >[]
    >();

  const galleryItems = Array.from({ length: 8 }, (_, i) => ({
    image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cdn/${i + 1}.jpeg`,
    text: ""
  }));

  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* Hero */}
      <section className="relative min-h-96 my-20">
        <div className="absolute inset-0 size-full rounded-3xl overflow-hidden z-0 pointer-events-none select-none brightness-50">
          <Dither
            waveColor={[0.5, 0.5, 0.5]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
        </div>

        <div className="relative flex flex-col py-24 px-12 z-1">
          <h1 className="relative text-5xl font-bold tracking-tight leading-[1.175] sm:text-6xl text-white">
            Frontend Developer
            <br />
            from Istanbul.
          </h1>
          <p className="mt-5 max-w-xl text-lg bg-linear-to-b from-background dark:from-foreground to-muted-foreground bg-clip-text text-transparent">
            Building clean, performant interfaces for the web and mobile.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        {/* <p className="text-muted-foreground mb-8 text-xs uppercase tracking-widest">About</p> */}
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            I&apos;m a frontend developer who cares deeply about craft — the details that make an interface feel right.
            I work primarily with React, TypeScript, and Next.js.
          </p>
          <p className="text-muted-foreground">
            Detail-oriented Frontend Developer with {EXPERIENCE_IN_YEARS} years of experience across startups,
            enterprise companies, and freelance projects. Passionate about quality, with a strong focus on getting every
            detail right. Currently expanding into{" "}
            <InlineLink href="https://en.wikipedia.org/wiki/Blockchain" target="_blank" rel="noopener noreferrer">
              <InlineLinkIcon className="-mt-0.75">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#7a505b1b-f4d9-42f2-99cc-0c8b0fb8ee7c)">
                    <rect width="24" height="24" rx="4.5" fill="#202020"></rect>
                    <rect
                      width="24"
                      height="24"
                      rx="4.5"
                      fill="url(#cebf971e-5127-4289-8e51-af2ce23281db)"
                      fillOpacity="0.2"
                    ></rect>
                    <rect
                      x="0.5"
                      y="0.5"
                      width="23"
                      height="23"
                      rx="4"
                      stroke="white"
                      strokeOpacity="0.15"
                      style={{ mixBlendMode: "overlay" }}
                    ></rect>
                    <path
                      d="M12.0095 5.12808L11.9224 5.42411V14.0142L12.0095 14.1011L15.9969 11.7442L12.0095 5.12808Z"
                      fill="#B0B0B0"
                    ></path>
                    <path d="M12.0106 5.12772L8.02319 11.7438L12.0106 14.1008V9.93144V5.12772Z" fill="white"></path>
                    <path
                      d="M12.0105 15.399L11.9614 15.4588V18.5188L12.0105 18.6622L16.0003 13.0432L12.0105 15.399Z"
                      fill="#A0A0A0"
                    ></path>
                    <path d="M12.0099 18.6622V15.399L8.02246 13.0432L12.0099 18.6622Z" fill="white"></path>
                    <path d="M12.0098 14.1021L15.9971 11.7452L12.0098 9.9328V14.1021Z" fill="#575757"></path>
                    <path d="M8.02246 11.7452L12.0098 14.1021V9.9328L8.02246 11.7452Z" fill="#A9A9A9"></path>
                  </g>
                  <defs>
                    <radialGradient
                      id="cebf971e-5127-4289-8e51-af2ce23281db"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(12 -7.5) rotate(90) scale(31.5)"
                    >
                      <stop stop-color="white"></stop>
                      <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                    </radialGradient>
                    <clipPath id="7a505b1b-f4d9-42f2-99cc-0c8b0fb8ee7c">
                      <path
                        d="M0 4.5C0 2.01472 2.01472 0 4.5 0H19.5C21.9853 0 24 2.01472 24 4.5V19.5C24 21.9853 21.9853 24 19.5 24H4.5C2.01472 24 0 21.9853 0 19.5V4.5Z"
                        fill="white"
                      ></path>
                    </clipPath>
                  </defs>
                </svg>
              </InlineLinkIcon>
              Blockchain
            </InlineLink>
            technologies while maintaining solid expertise in modern frontend development. A calm, curious professional
            committed to continuous learning and delivering high-standard work.
          </p>
        </div>
      </section>

      {/* Circular Gallery */}
      <section
        className="relative flex flex-col min-h-140 py-16 -mt-8"
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
        <CircularGallery
          items={galleryItems}
          bend={2}
          textColor="#ffffff"
          borderRadius={0.07}
          scrollEase={0.02}
          scrollSpeed={1.5}
        />
      </section>

      {/* Skills */}
      <section className="py-20">
        <div className="space-y-4 text-lg leading-relaxed">
          <blockquote className="text-lg italic">
            &ldquo;Technology never stands still — neither should you.&rdquo;
          </blockquote>
          <p className="text-muted-foreground">
            Every project demands a different set of tools, and the true measure of a developer isn&apos;t the number of
            technologies they know — it&apos;s how seamlessly they adapt to the ones they need. In an industry that
            evolves daily, I embrace continuous learning as a core discipline rather than a choice. Below are the
            technologies I actively work with and deliver production-ready solutions in:
            <br />
            <br />
            TypeScript · React.js · Next.js · React Native · Tailwind CSS · Node.js · MongoDB · PostgreSQL
          </p>
        </div>
      </section>

      {/* Work History */}
      {workHistory && workHistory.length > 0 && (
        <section className="py-20">
          <p className="text-muted-foreground mb-8 text-xs uppercase tracking-widest">Experience</p>
          <div className="divide-border divide-y">
            {workHistory.map(job => (
              <details key={job.company} name="work-history" className="group">
                <summary className="flex items-center justify-between gap-5 py-5 transition-colors hover:bg-secondary/10">
                  <div className="flex min-w-0 items-center">
                    <span
                      className="text-muted-foreground mr-3 inline-block text-[10px] transition-transform duration-300 group-open:rotate-90"
                      aria-hidden="true"
                    >
                      <Icon name="chevron-right" className="size-4" />
                    </span>
                    <div>
                      <span className="font-medium">{job.company}</span>
                      <span className="text-muted-foreground ml-3 text-sm">{job.role}</span>
                    </div>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-sm pr-2">
                    {formatPeriod(job.start_date, job.end_date)}
                  </span>
                </summary>
                <div className="pb-4 pl-5.5">
                  {job.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed">{job.description}</p>
                  )}
                  {job.tech_stack.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.tech_stack.map(tech => (
                        <span
                          key={tech}
                          className="ring ring-inset ring-border bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Explore */}
      <section className="py-20">
        <p className="text-muted-foreground mb-8 text-xs uppercase tracking-widest">Explore</p>
        <div className="grid sm:grid-cols-3">
          {exploreLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("group border border-dashed p-8 hover:bg-secondary/10 transition-colors", {
                "border-l-0": index !== 0
              })}
            >
              <h3 className="font-medium">{link.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{link.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
