import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiGithub,
  FiLinkedin,
  FiFileText,
} from "react-icons/fi";

const GITHUB_URL = "https://github.com/AljuSabu";
const LINKEDIN_URL = "https://www.linkedin.com/in/aljusabu-dev/";
const RESUME_URL = "/Alju_Sabu_Full_Stack_Developer.pdf"; // file must be inside /public

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const SCROLL_THRESHOLD = 80; // px scrolled before the bar turns into the pill

const iconBtn =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 dark:text-zinc-400 hover:bg-slate-900/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500";

const resumeBtn =
  "inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 hover:bg-blue-500 active:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900";

export default function Navbar({ isDark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll position: pill state + which section is in view
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);

      let current = "";
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = id;
        }
      }
      // at the very bottom, highlight the last section
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) current = NAV_LINKS[NAV_LINKS.length - 1].id;

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close the mobile menu with Escape, or when the screen grows to desktop size
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const scrollToTop = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass = (id) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
      activeId === id
        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
    }`;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center px-3 sm:px-4"
    >
      {/* The bar / pill */}
      <div
        className={`pointer-events-auto mx-auto flex w-full items-center justify-between rounded-full border transition-all duration-300 ease-out motion-reduce:transition-none ${
          scrolled
            ? "mt-3 max-w-26 px-2 py-1.5 lg:max-w-170 lg:px-4 lg:py-2 border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/40"
            : "mt-0 max-w-[min(100%,80rem)] px-2 py-3 lg:px-4 lg:py-4 border-transparent bg-transparent backdrop-blur-none shadow-none"
        }`}
      >
        {/* Brand (collapses away when the pill is active) */}
        <a
          href="#home"
          onClick={scrollToTop}
          aria-label="Alju Sabu, back to top"
          tabIndex={scrolled ? -1 : 0}
          aria-hidden={scrolled}
          className={`overflow-hidden whitespace-nowrap rounded-md text-base font-bold tracking-tight text-slate-900 dark:text-white transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${
            scrolled
              ? "max-w-0 opacity-0 mr-0"
              : "max-w-40 opacity-100 mr-4 px-1"
          }`}
        >
          Alju Sabu
        </a>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeId === id ? "true" : undefined}
              className={linkClass(id)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {/* GitHub + LinkedIn: only appear in pill mode (desktop) */}
          <div
            aria-hidden={!scrolled}
            className={`hidden items-center overflow-hidden transition-all duration-300 motion-reduce:transition-none lg:flex ${
              scrolled ? "ml-3 max-w-32 opacity-100" : "ml-0 max-w-0 opacity-0"
            }`}
          >
            <span className="mr-2 h-4 w-px bg-slate-300 dark:bg-zinc-700" />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              tabIndex={scrolled ? 0 : -1}
              className={iconBtn}
            >
              <FiGithub size={18} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              tabIndex={scrolled ? 0 : -1}
              className={iconBtn}
            >
              <FiLinkedin size={18} />
            </a>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={iconBtn}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className={`${resumeBtn} ml-1 hidden lg:inline-flex`}
          >
            <FiFileText size={14} />
            Resume
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`${iconBtn} lg:hidden`}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown (separate from the pill so its blur works) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-auto mt-2 w-full max-w-sm rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 p-3 shadow-xl shadow-black/10 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeId === id ? "true" : undefined}
                  className={`${linkClass(id)} rounded-xl! px-4! py-2.5! text-base!`}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-3">
              <div className="flex items-center gap-1">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className={iconBtn}
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className={iconBtn}
                >
                  <FiLinkedin size={18} />
                </a>
              </div>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className={resumeBtn}
              >
                <FiFileText size={14} />
                Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
