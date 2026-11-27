import { motion, MotionConfig } from "framer-motion";
import { FiShield, FiCreditCard, FiServer, FiLayout } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { personalInfo } from "../data/personalInfo";

const ICONS = {
  shield: FiShield,
  card: FiCreditCard,
  server: FiServer,
  layout: FiLayout,
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function About() {
  const { about, facts, highlights } = personalInfo;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="about"
        className="relative border-t border-stone-200 px-4 py-24 dark:border-neutral-900 sm:px-6 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading index="01" label="about" title="About me" />

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            {/* ---------- bio ---------- */}
            <motion.div {...reveal()} className="space-y-5">
              {about.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-stone-700 dark:text-neutral-400 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* ---------- quick facts ---------- */}
            <motion.aside
              {...reveal(0.15)}
              className="h-fit rounded-2xl border border-stone-300 bg-stone-50 p-6 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <h3 className="text-base font-bold text-stone-950 dark:text-white">
                Quick facts
              </h3>
              <dl className="mt-3 divide-y divide-stone-200 dark:divide-neutral-800">
                {facts.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-neutral-500">
                      {label}
                    </dt>
                    <dd className="text-right text-sm font-semibold text-stone-900 dark:text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.aside>
          </div>

          {/* ---------- highlights ---------- */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon, title, text }, i) => {
              const Icon = ICONS[icon];
              return (
                <motion.div
                  key={title}
                  {...reveal(i * 0.1)}
                  className="group rounded-2xl border border-stone-300 bg-white p-6 transition-colors hover:border-stone-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-stone-900 text-white transition-transform group-hover:-rotate-6 dark:bg-white dark:text-black">
                    {Icon && <Icon size={20} />}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-stone-950 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-neutral-400">
                    {text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
