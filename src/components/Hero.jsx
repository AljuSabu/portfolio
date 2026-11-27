import { useState, useEffect } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import {
  FiArrowRight,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { personalInfo } from "../data/personalInfo";

//   const PROFILE_IMAGE = profilePhoto;
const PROFILE_IMAGE = null;

/* ---------- typing effect ---------- */
function useTypewriter(
  words,
  { typeSpeed = 70, deleteSpeed = 40, pause = 1800 } = {},
) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return; // users who prefer less motion just see the first role

    const word = words[wordIndex];
    const finishedTyping = !isDeleting && text === word;
    const finishedDeleting = isDeleting && text === "";
    const delay = finishedTyping ? pause : isDeleting ? deleteSpeed : typeSpeed;

    const timer = setTimeout(() => {
      if (finishedTyping) {
        setIsDeleting(true);
      } else if (finishedDeleting) {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(
          isDeleting
            ? word.slice(0, text.length - 1)
            : word.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    reduceMotion,
    typeSpeed,
    deleteSpeed,
    pause,
  ]);

  return reduceMotion ? words[0] : text;
}

/* ---------- animation presets ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ---------- shared styles ---------- */
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-[#090a0f]";

const primaryBtn = `group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 active:bg-blue-700 sm:text-base ${focusRing}`;

const secondaryBtn = `inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:text-base ${focusRing}`;

const textBtn = `inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white ${focusRing}`;

const socialBtn = `inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 transition-colors hover:border-blue-500/40 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:text-blue-400 ${focusRing}`;

/* ---------- component ---------- */
export default function Hero() {
  const {
    name,
    roles,
    intro,
    location,
    email,
    github,
    linkedin,
    resumeUrl,
    stats,
  } = personalInfo;
  const typed = useTypewriter(roles);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:pt-32"
      >
        {/* soft background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-500/20" />
          <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15" />
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ---------- left: text ---------- */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1
              variants={item}
              className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              Hi, I’m{" "}
              <span className="bg-linear-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                {name}
              </span>
            </motion.h1>

            <motion.div variants={item} className="mt-4">
              {/* screen readers get the full list instead of the animated text */}
              <span className="sr-only">{roles.join(", ")}</span>
              <p
                aria-hidden="true"
                className="flex min-h-12 items-start font-mono text-base text-slate-700 dark:text-zinc-300 sm:min-h-8 sm:text-xl"
              >
                <span className="mr-2 text-blue-500">&gt;</span>
                <span>
                  {typed}
                  <span className="ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-[0.15em] animate-pulse bg-blue-500" />
                </span>
              </p>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-zinc-400 sm:text-lg"
            >
              {intro}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" className={primaryBtn}>
                View Projects
                <FiArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a href="#contact" className={secondaryBtn}>
                Contact Me
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className={textBtn}
              >
                <FiFileText size={16} />
                Resume
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <span className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-500">
                <FiMapPin size={16} />
                {location}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className={socialBtn}
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className={socialBtn}
                >
                  <FiLinkedin size={18} />
                </a>
                <a
                  href={`mailto:${email}`}
                  aria-label="Send an email"
                  className={socialBtn}
                >
                  <FiMail size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* ---------- right: photo card ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-linear-to-tr from-blue-500/25 to-violet-500/25 blur-2xl"
            />
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-slate-200 bg-white/60 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-black/50">
              {PROFILE_IMAGE ? (
                <img
                  src={PROFILE_IMAGE}
                  alt={`Portrait of ${name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-blue-500/10 via-transparent to-violet-500/10 text-slate-400 dark:text-zinc-500">
                  <FiUser size={72} />
                  <span className="font-mono text-xs">
                    your photo goes here
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ---------- stats strip ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          className="mx-auto mt-16 grid w-full max-w-3xl grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white/50 py-5 backdrop-blur dark:divide-white/10 dark:border-white/10 dark:bg-white/3"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 px-2 text-center"
            >
              <span className="text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                {value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-zinc-500 sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
