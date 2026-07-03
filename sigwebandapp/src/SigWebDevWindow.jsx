import React, { useState } from "react";
import "./Sigwebdevwindow.css";
/**
 * SigWebDevWindow
 * "Who joins SIG-WEB DEV?" reimagined as a little browser / code-editor
 * window. Four personas live in tabs across the top. Each tab renders
 * its answer as a "Preview" (a real mini webpage) or, on toggle, as
 * "Source" — the same content re-cast as a code comment. Background
 * is fully transparent so this drops onto any page.
 */

const ICONS = {
  cursor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 3l14 8-6 1.4L11 19 5 3z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M17 3.5a2.1 2.1 0 013 3L8.5 18 4 19.5 5.5 15 17 3.5z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6M17.7 17.7l-1.6-1.6M7.9 7.9L6.3 6.3" strokeLinecap="round" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.6 9.4l-1.7 5-5 1.7 1.7-5 5-1.7z" strokeLinejoin="round" />
    </svg>
  ),
};

const PERSONAS = [
  {
    id: "coders",
    name: "Coders",
    slug: "coders",
    icon: "cursor",
    accent: "#e0a23f",
    headline: "You want to watch it move.",
    blurb:
      "The moment code turns into something you can click, drag, or break is the moment it gets fun. You'd rather ship a rough working thing than polish a plan.",
    takeaway: "leaves shipping real features, not tutorials",
  },
  {
    id: "designers",
    name: "Designers",
    slug: "designers",
    icon: "pen",
    accent: "#d9536f",
    headline: "You already see the finished thing.",
    blurb:
      "A rough idea walks in and you can already tell how it should look, move, and feel before anyone else can. Getting that out of your head is the hard part.",
    takeaway: "leaves knowing how to hand off work devs can actually build",
  },
  {
    id: "tinkerers",
    name: "Tinkerers",
    slug: "tinkerers",
    icon: "gear",
    accent: "#4f9e7d",
    headline: "You automate the second time.",
    blurb:
      "Doing something by hand twice feels like a bug. You'd rather spend an hour scripting it away than five minutes repeating it, and you're usually right to.",
    takeaway: "leaves with a shelf of tools built to fix real problems",
  },
  {
    id: "curious",
    name: "Curious Minds",
    slug: "curious",
    icon: "compass",
    accent: "#6f7fd6",
    headline: "You want to know how it's made.",
    blurb:
      "Every site and app you use raises the same quiet question: how does this actually work under the hood? You're here to finally find out, start to finish.",
    takeaway: "leaves with a real map of how the web works end to end",
  },
];

export default function SigWebDevWindow() {
  const [activeId, setActiveId] = useState(PERSONAS[0].id);
  const [sourceMode, setSourceMode] = useState(false);
  const active = PERSONAS.find((p) => p.id === activeId);

  return (
    <section className="sw-root" aria-label="Who joins SIG-WEB DEV" style={{ "--accent": active.accent }}>
      <div className="sw-window">
        <div className="sw-titlebar">
          <div className="sw-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="sw-addr">
            <span className="sw-addr-proto">sig-web-dev.dev/</span>
            <span className="sw-addr-slug">{active.slug}</span>
          </div>
          <div className="sw-titlebar-spacer" aria-hidden="true" />
        </div>

        <div className="sw-tabs" role="tablist" aria-label="Choose a persona">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={p.id === activeId}
              className={`sw-tab ${p.id === activeId ? "is-active" : ""}`}
              style={{ "--tab-accent": p.accent }}
              onClick={() => setActiveId(p.id)}
            >
              <span className="sw-tab-icon">{ICONS[p.icon]}</span>
              <span className="sw-tab-name">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="sw-toolbar">
          <h2 className="sw-h1">Who joins SIG&#8209;WEB&nbsp;DEV?</h2>
          <div className="sw-viewtoggle" role="group" aria-label="Display mode">
            <button
              type="button"
              className={!sourceMode ? "is-active" : ""}
              aria-pressed={!sourceMode}
              onClick={() => setSourceMode(false)}
            >
              Preview
            </button>
            <button
              type="button"
              className={sourceMode ? "is-active" : ""}
              aria-pressed={sourceMode}
              onClick={() => setSourceMode(true)}
            >
              &lt;/&gt; Source
            </button>
          </div>
        </div>

        <div className="sw-pane">
          {!sourceMode ? (
            <article className="sw-preview" key={active.id + "-preview"}>
              <span className="sw-preview-icon">{ICONS[active.icon]}</span>
              <p className="sw-preview-eyebrow">{active.name}</p>
              <h3 className="sw-preview-headline">{active.headline}</h3>
              <p className="sw-preview-blurb">{active.blurb}</p>
              <p className="sw-preview-takeaway">You {active.takeaway}.</p>
            </article>
          ) : (
            <pre className="sw-source" key={active.id + "-source"} aria-label={`${active.name} described as code`}>
              <code>
                <span className="tok-tag">persona</span>
                <span className="tok-punc">(</span>
                <span className="tok-str">"{active.name.toLowerCase()}"</span>
                <span className="tok-punc">{`) {`}</span>
                {"\n"}
                {"  "}
                <span className="tok-comment">// {active.headline}</span>
                {"\n"}
                {"  "}
                <span className="tok-key">fits</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">"{active.blurb}"</span>
                <span className="tok-punc">,</span>
                {"\n"}
                {"  "}
                <span className="tok-key">outcome</span>
                <span className="tok-punc">: </span>
                <span className="tok-str">"you {active.takeaway}"</span>
                <span className="tok-punc">,</span>
                {"\n"}
                <span className="tok-punc">{"}"}</span>
              </code>
            </pre>
          )}
        </div>

        <div className="sw-statusbar">
          <span>4 personas</span>
          <span className="sw-status-dot" aria-hidden="true" />
          <span>{sourceMode ? "source" : "preview"} mode</span>
        </div>
      </div>
    </section>
  );
}