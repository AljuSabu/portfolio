export const personalInfo = {
  name: "Alju Sabu",

  // Cycled by the typing effect in the Hero
  roles: [
    "React Developer",
    "Frontend Developer",
    "Full Stack (MERN & Next.js) Developer",
  ],

  // Short intro under the headline
  intro:
    "I build responsive web apps with React, Next.js, Node.js and MongoDB, from authentication and payment integration to role-based access and REST APIs.",

  location: "Kerala, India",
  email: "aljusabu444@gmail.com",
  github: "https://github.com/AljuSabu",
  linkedin: "https://www.linkedin.com/in/aljusabu-dev/",
  resumeUrl: "/Alju_Sabu_Full_Stack_Developer.pdf",

  // Small facts strip under the Hero
  stats: [
    { value: "4", label: "Projects built" },
    { value: "MERN", label: "& Next.js stack" },
    { value: "B.Sc.", label: "Computer Science" },
  ],

  // ---------- About section ----------
  about: [
    "I'm a frontend and full stack developer from Kerala, India. I build responsive web applications with React, Next.js, TypeScript, Node.js, Express and MongoDB, working across both the interface and the API behind it.",
    "My projects include authentication and role-based access, Razorpay payment integration, third-party API integration and RESTful APIs. I care about building scalable, user-friendly apps, and I'm always learning modern web technologies.",
  ],

  facts: [
    { label: "Location", value: "Kerala, India" },
    { label: "Focus", value: "Frontend & Full Stack" },
    { label: "Stack", value: "MERN & Next.js" },
    { label: "Education", value: "B.Sc. Computer Science" },
    { label: "Languages", value: "English, Malayalam" },
  ],

  // icon must be one of: shield, card, server, layout (see ICONS in About.jsx)
  highlights: [
    {
      icon: "shield",
      title: "Auth & access control",
      text: "JWT authentication and role-based access for customer and admin workflows.",
    },
    {
      icon: "card",
      title: "Payments",
      text: "Razorpay checkout with backend order creation and payment verification.",
    },
    {
      icon: "server",
      title: "APIs",
      text: "RESTful APIs with Node.js, Express and MongoDB, plus third-party APIs through Next.js routes.",
    },
    {
      icon: "layout",
      title: "Responsive UI",
      text: "Responsive interfaces and admin dashboards built with React and Tailwind CSS.",
    },
  ],
};
