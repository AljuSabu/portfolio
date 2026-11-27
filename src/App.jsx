import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Temporary placeholder sections
const SECTIONS = ["about", "skills", "projects", "education", "contact"];

function App() {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem("theme") !== "light";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* storage unavailable, ignore */
    }
  }, [isDark]);

  return (
    <div className="min-h-screen">
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main>
        <Hero />

        {SECTIONS.map((id) => (
          <section
            key={id}
            id={id}
            className="flex min-h-screen items-center justify-center border-b border-slate-200 dark:border-neutral-800"
          >
            <h2 className="text-4xl font-extrabold capitalize">
              {id}{" "}
              <span className="font-mono text-sm font-normal text-slate-500 dark:text-neutral-500">
                (temporary)
              </span>
            </h2>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
