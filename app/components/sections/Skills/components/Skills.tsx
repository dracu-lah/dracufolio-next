"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const skillName = (path: string) =>
  path.split("/").pop()?.replace(/\.\w+$/, "") ?? "skill";

const Skills = ({ skills }: { skills: string[] }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-4"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.07 } },
      }}
    >
      {skills.map((skill) => {
        const name = skillName(skill);
        return (
          <motion.li
            key={skill}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="group flex flex-col items-center gap-5 border-r border-b border-border px-6 py-10 transition-colors duration-300 hover:bg-card md:py-12"
          >
            <Image
              draggable="false"
              className="size-16 object-contain transition-transform duration-300 group-hover:scale-110 md:size-24"
              width={160}
              height={160}
              src={skill}
              alt={`${name} logo`}
            />
            <span className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {name}
            </span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default Skills;
