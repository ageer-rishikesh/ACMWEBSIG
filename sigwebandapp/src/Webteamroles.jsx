import React, { useState, useEffect, useRef } from "react";
import "./WebTeamRoles.css";

const ICONS = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 5L2 12l6 7M16 5l6 7-6 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <circle cx="7" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l9 5-9 5-9-5 9-5z" strokeLinejoin="round" />
      <path d="M3 12l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 17l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M12 3a9 9 0 100 18c1.5 0 2-1 2-2s-.5-1.5-.5-2.3c0-.9.7-1.7 1.7-1.7H17a3 3 0 003-3c0-5-3.6-9-8-9z"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4 4 0 007 18z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const ROLES = [
  {
    id: "frontend",
    title: "Frontend Developer",
    tagline: "Crafts user interfaces",
    icon: "code",
    accent: "#ffd447",
    spectrum: 20,
    spectrumLabel: "Design-leaning",
    learn: [
      "HTML, CSS & modern JavaScript",
      "React, Vue or Angular",
      "Responsive layouts & motion",
      "Browser DevTools & performance",
    ],
    become: "A Frontend Developer — the person who turns a blank screen into an interface people actually enjoy using.",
  },
  {
    id: "backend",
    title: "Backend Developer",
    tagline: "Builds logic and server",
    icon: "server",
    accent: "#ff5d5d",
    spectrum: 95,
    spectrumLabel: "Logic-leaning",
    learn: [
      "Server-side languages (Node, Python, Java)",
      "Databases & REST/GraphQL APIs",
      "Authentication & security",
      "System design at scale",
    ],
    become: "A Backend Developer — the person whose systems quietly keep every request fast, correct and safe.",
  },
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    tagline: "Does both!",
    icon: "layers",
    accent: "#9b6bff",
    spectrum: 55,
    spectrumLabel: "Balanced",
    learn: [
      "Frontend + backend integration",
      "End-to-end feature ownership",
      "Databases to deployed UI",
      "Practical DevOps basics",
    ],
    become: "A Full-Stack Developer — someone who can take an idea from a napkin sketch to a shipped product, solo.",
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    tagline: "Ensures great look and feel",
    icon: "palette",
    accent: "#ff6ec7",
    spectrum: 5,
    spectrumLabel: "Design-focused",
    learn: [
      "User research & wireframing",
      "Figma & design systems",
      "Interaction & visual design",
      "Usability testing",
    ],
    become: "A UI/UX Designer — the person who shapes how a product feels, not just how it looks.",
  },
  {
    id: "devops",
    title: "DevOps / Deployment",
    tagline: "Makes it live and stable",
    icon: "cloud",
    accent: "#38bdf8",
    spectrum: 75,
    spectrumLabel: "Logic-leaning",
    learn: [
      "CI/CD pipelines",
      "Cloud platforms (AWS, Azure, GCP)",
      "Docker & containers",
      "Monitoring, scaling & uptime",
    ],
    become: "A DevOps Engineer — the person who keeps the product live, fast and stable for every single user.",
  },
];

export default function WebTeamRoles() {
  const [flipped, setFlipped] = useState(() => new Set());
  
  // NEW: State and Ref for scroll animations
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // NEW: Intersection Observer to trigger animations when scrolling into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect so it only animates once
        }
      },
      { threshold: 0.15 } // Triggers when 15% of the component is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggle = (id) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const onKeyDown = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`wtr-root ${isVisible ? "is-visible" : ""}`} 
      aria-label="Roles in a web team"
    >
      <header className="wtr-header">
        <h2 className="wtr-title">
          What are the <span className="wtr-title-accent">Roles</span> in a Web Team?
        </h2>
        <p className="wtr-subtitle">Tap a card to see what you'll learn — and who you'll become.</p>
      </header>

      <div className="wtr-spectrum" role="img" aria-label="Spectrum from design-focused to logic-focused roles">
        <span className="wtr-spectrum-label left">Design-Focused</span>
        <div className="wtr-spectrum-track">
          <div className="wtr-spectrum-sweep" />
          {ROLES.map((role) => (
            <span
              key={role.id}
              className="wtr-spectrum-dot"
              style={{ left: `${role.spectrum}%`, "--dot-color": role.accent }}
              title={role.title}
            />
          ))}
        </div>
        <span className="wtr-spectrum-label right">Logic-Focused</span>
      </div>

      <div className="wtr-grid">
        {ROLES.map((role, i) => {
          const isFlipped = flipped.has(role.id);
          return (
            <div
              key={role.id}
              className="wtr-card-wrap"
              style={{ "--i": i, "--accent": role.accent }}
            >
              <div
                className={`wtr-card ${isFlipped ? "is-flipped" : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={`${role.title}. ${isFlipped ? "Showing" : "Show"} what you'll learn`}
                onClick={() => toggle(role.id)}
                onKeyDown={(e) => onKeyDown(e, role.id)}
              >
                {/* FRONT */}
                <div className="wtr-face wtr-face-front">
                  <div className="wtr-icon">{ICONS[role.icon]}</div>
                  <h3 className="wtr-role-title">{role.title}</h3>
                  <p className="wtr-role-tagline">{role.tagline}</p>
                  <span className="wtr-spectrum-chip">{role.spectrumLabel}</span>
                  <span className="wtr-flip-hint">Tap to explore ↻</span>
                </div>

                {/* BACK */}
                <div className="wtr-face wtr-face-back">
                  <h4 className="wtr-back-heading">What you'll learn</h4>
                  <ul className="wtr-learn-list">
                    {role.learn.map((item, idx) => (
                      <li key={idx} style={{ "--li": idx }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="wtr-become">
                    <span className="wtr-become-label">You become</span>
                    <p className="wtr-become-text">{role.become}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}