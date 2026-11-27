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
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black";

// the ONE blue button on the page
const primaryBtn = `group inline-flex items-center gap-2 rounded-full border-2 border-blue-600 bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:border-blue-500 hover:bg-blue-500 active:bg-blue-700 sm:text-base ${focusRing}`;

// bold outline that inverts on hover
const secondaryBtn = `inline-flex items-center gap-2 rounded-full border-2 border-stone-900 px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black sm:text-base ${focusRing}`;

const textBtn = `inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-medium text-stone-600 transition-colors hover:text-stone-950 dark:text-neutral-400 dark:hover:text-white ${focusRing}`;

const socialBtn = `inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-black ${focusRing}`;

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
        {/* background: dot grid + soft neutral glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(28,25,23,0.16)_1px,transparent_1px)] bg-size-[26px_26px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.16)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-stone-300/60 blur-3xl dark:bg-white/[0.07]" />
          <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-stone-200/80 blur-3xl dark:bg-white/5" />
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ---------- left: text ---------- */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1
              variants={item}
              className="text-5xl font-extrabold leading-[1.05] tracking-tighter sm:text-6xl lg:text-7xl"
            >
              <span className="block text-stone-500 dark:text-neutral-500">
                Hi, I’m
              </span>
              <span className="block text-stone-950 dark:text-white">
                {name}
              </span>
            </motion.h1>

            <motion.div variants={item} className="mt-5">
              {/* screen readers get the full list instead of the animated text */}
              <span className="sr-only">{roles.join(", ")}</span>
              <p
                aria-hidden="true"
                className="flex min-h-12 items-start font-mono text-base text-stone-700 dark:text-neutral-300 sm:min-h-8 sm:text-xl"
              >
                <span className="mr-2 text-blue-600 dark:text-blue-400">
                  &gt;
                </span>
                <span>
                  {typed}
                  <span className="ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-[0.15em] animate-pulse bg-blue-600 dark:bg-blue-400" />
                </span>
              </p>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-stone-700 dark:text-neutral-400 sm:text-lg"
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
              <span className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-neutral-400">
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
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-stone-300/70 blur-2xl dark:bg-white/10"
            />
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-stone-300 bg-stone-100 shadow-2xl shadow-black/15 dark:border-neutral-700 dark:bg-neutral-950 dark:shadow-black">
              {PROFILE_IMAGE ? (
                <img
                  src={PROFILE_IMAGE}
                  alt={`Portrait of ${name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-stone-100 text-stone-400 dark:bg-neutral-900 dark:text-neutral-600">
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
          className="mx-auto mt-16 grid w-full max-w-3xl grid-cols-3 divide-x divide-stone-300 rounded-2xl border border-stone-300 bg-stone-50 py-5 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 px-2 text-center"
            >
              <span className="text-xl font-extrabold text-stone-950 dark:text-white sm:text-2xl">
                {value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500 dark:text-neutral-500 sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
