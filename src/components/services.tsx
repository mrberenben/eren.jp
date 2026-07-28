"use client";

import React from "react";

import { AnimatePresence, motion } from "motion/react";

export function Services({
  services
}: {
  services: {
    title: string | null;
    description: string | null;
  }[];
}) {
  const [activeService, setActiveService] = React.useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {services.map((service, index) => (
        <motion.div
          key={index}
          role="button"
          initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.25, delay: 1 + index * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-row items-center border-x px-6 h-36 gap-x-12 border-t last:border-b transition-colors hover:bg-muted hover:cursor-pointer"
          onClick={() => setActiveService(activeService === index ? null : index)}
        >
          <span className="text-muted-foreground text-xs uppercase tracking-widest">0{index + 1}</span>

          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {activeService !== index ? (
                <motion.h3
                  className="text-3xl font-semibold select-none"
                  initial={{ opacity: 0, y: -12, filter: "blur(0px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  transition={{ duration: 0.4 }}
                >
                  {service.title}
                </motion.h3>
              ) : (
                <motion.div
                  className="flex flex-col gap-y-2 select-none"
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground leading-snug">{service.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {activeService === index && (
            <motion.span
              className="text-3xl ml-auto"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-4xl ml-auto">-</span>
            </motion.span>
          )}
          {activeService !== index && (
            <motion.span
              className="text-3xl ml-auto"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-3xl ml-auto">+</span>
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
