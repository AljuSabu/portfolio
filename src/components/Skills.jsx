import { motion, MotionConfig } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiRender,
  SiNetlify,
  SiJsonwebtokens,
  SiRazorpay,
} from "react-icons/si";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import {
  FiGlobe,
  FiServer,
  FiLayers,
  FiSmartphone,
  FiCode,
} from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { personalInfo } from "../data/personalInfo";

// maps the "icon" names used in personalInfo.js to real icons
const ICONS = {
  react: SiReact,
  next: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: SiJavascript,
  node: SiNodedotjs,
  express: SiExpress,
  api: FiGlobe,
  route: FiServer,
  mongodb: SiMongodb,
  mongoose: SiMongoose,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  vscode: VscVscode,
  vercel: SiVercel,
  render: SiRender,
  netlify: SiNetlify,
  jwt: SiJsonwebtokens,
  razorpay: SiRazorpay,
  context: FiLayers,
  responsive: FiSmartphone,
};

// card widths on large screens (the grid has 6 columns)
const LAYOUT = {
  wide: "md:col-span-2 lg:col-span-4",
  narrow: "lg:col-span-2",
  full: "md:col-span-2 lg:col-span-6",
};

export default function Skills() {
  const { skills } = personalInfo;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="skills"
        className="relative border-t border-stone-200 px-4 py-24 dark:border-neutral-900 sm:px-6 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading index="02" label="skills" title="Skills & tools" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {skills.map(({ title, layout, items }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 3) * 0.1,
                  ease: "easeOut",
                }}
                className={`rounded-2xl border border-stone-300 bg-stone-50 p-6 dark:border-neutral-800 dark:bg-neutral-950 ${
                  LAYOUT[layout] ?? ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-bold text-stone-950 dark:text-white">
                    {title}
                  </h3>
                  <span className="font-mono text-xs text-stone-500 dark:text-neutral-500">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {items.map(({ name, icon }) => {
                    const Icon = ICONS[icon] ?? FiCode;
                    return (
                      <li
                        key={name}
                        className="inline-flex cursor-default items-center gap-2 rounded-full border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-800 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white dark:border-neutral-700 dark:bg-black dark:text-neutral-200 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                      >
                        <Icon size={16} aria-hidden="true" />
                        {name}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
