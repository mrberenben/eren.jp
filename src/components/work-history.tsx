"use client";

import { motion } from "motion/react";
import { formatPeriod } from "~/lib/numeric";

export function WorkHistory({
  history
}: {
  history: {
    company: string;
    role: string;
    type: string;
    location: string;
    company_location: string | null;
    start_date: string;
    end_date: string | null;
    description: string | null;
    tech_stack: string[] | null;
  }[];
}) {
  return (
    <div className="space-y-4">
      {history.map((job, index) => (
        <motion.div
          key={job.company}
          className="group"
          initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.25, delay: 1 + index * 0.1 }}
          viewport={{ once: true }}
        >
          <summary className="flex items-center justify-between gap-5 py-5">
            <div className="flex min-w-0 items-center">
              <div>
                <span className="font-medium">{job.company}</span>
                <span className="text-muted-foreground ml-3 text-sm">{job.role}</span>
              </div>
            </div>
            <span className="text-muted-foreground shrink-0 text-sm pr-2">
              {formatPeriod(job.start_date, job.end_date)}
            </span>
          </summary>
          <div className="pb-4">
            {job.description && <p className="text-muted-foreground text-sm leading-relaxed">{job.description}</p>}
            {job.tech_stack && job.tech_stack.length > 0 && (
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
        </motion.div>
      ))}
    </div>
  );
}
