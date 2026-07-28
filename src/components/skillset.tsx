"use client";

import { motion } from "motion/react";

export function SkillSet({ skillset }: { skillset: { skill: string | null }[] }) {
  return (
    <div className="flex flex-row flex-wrap space-x-1 space-y-1">
      {skillset.map((s, i) => (
        <motion.div
          key={i}
          className="flex justify-center items-center py-2 px-4 rounded-full bg-muted text-sm font-semibold"
          initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.25, delay: 1 + i * 0.1 }}
          viewport={{ once: true }}
        >
          {s.skill}
        </motion.div>
      ))}
    </div>
  );
}
