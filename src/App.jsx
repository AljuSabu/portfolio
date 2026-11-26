import { useState, useEffect } from "react";

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
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
        Theme test
      </h1>
      <p className="font-mono text-sm">Body font + mono font check</p>
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500"
      >
        Switch to {isDark ? "light" : "dark"} mode
      </button>
    </div>
  );
}

export default App;