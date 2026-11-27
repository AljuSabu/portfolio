import { motion } from "framer-motion";

export default function SectionHeading({ index, label, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12"
    >
      <p className="font-mono text-sm text-stone-500 dark:text-neutral-500">
        {index} / {label}
      </p>
      <h2 className="mt-2 text-4xl font-extrabold tracking-tighter text-stone-950 dark:text-white sm:text-5xl">
        {title}
      </h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-stone-900 dark:bg-white" />
    </motion.div>
  );
}
