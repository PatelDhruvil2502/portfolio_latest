import { useEffect, useMemo, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./styles/Query.css";

type Doc = { id: string; text: string; tags: string[] };

const corpus: Doc[] = [
  {
    id: "rag",
    tags: ["rag", "crag", "cag", "ml", "retrieval", "research", "ai", "genomics"],
    text: "Built RAG/CRAG/CAG pipelines over NHGRI CGD with ChromaDB, BGE embeddings, and Llama via Ollama — plus a verified 500-question genomics eval (Hit@k, MRR, BERTScore).",
  },
  {
    id: "hnsw",
    tags: ["hnsw", "ann", "vector", "indexing", "performance", "docker", "prefetch"],
    text: "Docker A/B of hnswlib software prefetch on 150K 128-d vectors cut mean HNSW latency ~24% (0.83 vs 1.03 ms) and p99 from 1.55 ms to 1.14 ms with no recall change.",
  },
  {
    id: "ghi",
    tags: ["frontend", "next", "health", "data", "drizzle", "sqlite", "charts"],
    text: "At Global Health Impact: Next.js/TypeScript analytics dashboard with Drizzle + 7 SQLite tables, Google Charts, and ranked DALY/source-score analysis across 12 year-disease combinations.",
  },
  {
    id: "react",
    tags: ["react", "typescript", "frontend", "ui", "state", "zod", "jotai"],
    text: "Type-safe React/TS work: Zod at the boundary, Jotai for state, Dexie for offline-first persistence — 40+ HMS components at Fuzzy Cloud.",
  },
  {
    id: "edu",
    tags: ["education", "school", "degree", "iu", "indiana"],
    text: "M.S. Computer Science at Indiana University Bloomington (Aug 2024–May 2026). GPA 3.66.",
  },
  {
    id: "btech",
    tags: ["education", "btech", "ddu", "india"],
    text: "B.Tech in Information Technology, Dharmsinh Desai University, Nadiad, India (Aug 2020–May 2024). GPA 3.30.",
  },
  {
    id: "loc",
    tags: ["location", "where", "based", "city"],
    text: "Based in the United States · Eastern timezone.",
  },
  {
    id: "contact",
    tags: ["email", "contact", "reach", "hire", "available"],
    text: "Reach me at dp86@iu.edu or dhruvilpatel6468@gmail.com. Open to full-time SWE / frontend / applied AI roles after May 2026.",
  },
  {
    id: "stack",
    tags: ["typescript", "react", "next", "python", "tools"],
    text: "Daily drivers: React + TypeScript + Next.js on the day job; Python + retrieval/eval stacks when ML pulls me back in.",
  },
  {
    id: "github",
    tags: ["github", "code", "repo"],
    text: "Code on GitHub: github.com/PatelDhruvil2502.",
  },
  {
    id: "linkedin",
    tags: ["linkedin", "social", "network"],
    text: "LinkedIn: linkedin.com/in/dhruvil2502 — quickest place to start a conversation.",
  },
  {
    id: "fav",
    tags: ["fun", "personal", "coffee", "hobby"],
    text: "Outside of work: third-wave coffee, ambient music, and rewriting tools that already work because mine has fewer dependencies.",
  },
  {
    id: "currently",
    tags: ["now", "current", "today", "this week", "role", "job"],
    text: "Right now: Frontend Developer at Global Health Impact — Next.js analytics, Drizzle/SQLite, and methodology UX from Figma.",
  },
  {
    id: "looking",
    tags: ["job", "looking", "opportunity", "full-time", "2026"],
    text: "Open to full-time frontend / SWE / applied AI conversations once my MS wraps in May 2026.",
  },
  {
    id: "wageshield",
    tags: ["wageshield", "h1b", "project", "next", "postgres", "ai"],
    text: "WageShield H-1B: privacy-first AI evidence auditor on Next.js + PostgreSQL with two-pass extraction/verification and SHA-256 manifests.",
  },
  {
    id: "copilot",
    tags: ["fastapi", "copilot", "rag", "docs", "project"],
    text: "FastAPI Copilot: offline RAG docs assistant with header-aware chunking, anchor citations, and 100% citation accuracy in tests.",
  },
];

const tokenize = (s: string) => s.toLowerCase().match(/[a-z0-9]+/g) ?? [];

const score = (q: string, d: Doc): number => {
  if (!q.trim()) return 0;
  const qTokens = new Set(tokenize(q));
  if (qTokens.size === 0) return 0;
  const docText = (d.text + " " + d.tags.join(" ")).toLowerCase();
  let hits = 0;
  let tagHits = 0;
  qTokens.forEach((t) => {
    if (docText.includes(t)) hits++;
    if (d.tags.some((tag) => tag.includes(t) || t.includes(tag))) tagHits++;
  });
  const lenPenalty = 1 / Math.log2(d.text.length + 8);
  return hits + tagHits * 1.5 + lenPenalty;
};

const Query = () => {
  const head = useReveal<HTMLDivElement>();
  const [q, setQ] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactErr, setContactErr] = useState<string | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const ranked = useMemo(() => {
    return corpus
      .map((d) => ({ d, s: score(q, d) }))
      .sort((a, b) => b.s - a.s)
      .filter((r) => r.s > 0)
      .slice(0, 5);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onSubmitQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const onSubmitContact = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (!/^[a-zA-Z\s.'-]{2,60}$/.test(contactName)) {
      e.preventDefault();
      setContactErr("name looks off - letters only, 2–60 chars.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      e.preventDefault();
      setContactErr("email looks off - double-check it.");
      return;
    }
    if (contactMsg.trim().length < 10) {
      e.preventDefault();
      setContactErr("message too short - give me something to work with.");
      return;
    }
    setContactErr(null);
    setContactSent(true);
    void form;
  };

  return (
    <section className="section query" id="query">
      <div className="shell">
        <div className="query-head fade-up" ref={head}>
          <p className="eyebrow">/ 06 - query the space</p>
          <h2 className="query-title serif">
            Ask the portfolio
            <i className="accent"> anything.</i>
          </h2>
          <p className="query-sub mono">
            mini-rag over a {corpus.length}-doc corpus · cmd/ctrl-k to focus
          </p>
        </div>

        <form className="query-bar" onSubmit={onSubmitQuery}>
          <span className="query-prompt mono">›</span>
          <input
            ref={inputRef}
            className="query-input"
            placeholder="e.g. what do you use for retrieval? where are you based?"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSubmitted(false);
            }}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className="query-kbd mono">⌘K</kbd>
        </form>

        <div className="query-suggestions">
          {[
            "what are you working on?",
            "are you looking for work?",
            "where are you based?",
            "react or python?",
            "how do I reach you?",
          ].map((s) => (
            <button
              key={s}
              className="suggestion mono"
              onClick={() => {
                setQ(s);
                setSubmitted(true);
                inputRef.current?.focus();
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="query-results">
          {q.trim().length > 0 ? (
            ranked.length > 0 ? (
              <>
                <p className="query-meta mono">
                  retrieved {ranked.length} of {corpus.length} · scored on token
                  + tag overlap
                </p>
                <ul className="query-result-list">
                  {ranked.map((r, i) => (
                    <li
                      key={r.d.id}
                      className="query-result"
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <div className="query-result-rank">
                        <span className="mono">{r.s.toFixed(2)}</span>
                        <span className="query-result-rank-bar">
                          <span
                            style={{
                              width: `${Math.min(100, (r.s / (ranked[0]?.s || 1)) * 100)}%`,
                            }}
                          />
                        </span>
                      </div>
                      <p className="query-result-text">{r.d.text}</p>
                      <div className="query-result-tags">
                        {r.d.tags.slice(0, 5).map((t) => (
                          <span className="result-tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="query-empty">
                no hits. try <em>rag</em>, <em>react</em>, <em>where</em>, or
                just say hi below.
              </p>
            )
          ) : (
            <p className="query-empty">
              the search above is real - token + tag overlap, no embeddings
              (yet).
              <br />
              the form below is also real - formspree, no embeddings either.
            </p>
          )}
        </div>

        <div className="query-divider">
          <span className="mono">- or just say hi -</span>
        </div>

        <form
          className="contact-form"
          action="https://formspree.io/f/xanqvwyd"
          method="POST"
          onSubmit={onSubmitContact}
        >
          <input
            type="hidden"
            name="_redirect"
            value="https://dhruvil2502.netlify.app/#query"
          />
          <input
            type="text"
            name="company"
            className="honeypot"
            tabIndex={-1}
            autoComplete="off"
          />
          <div className="contact-row">
            <label className="contact-field">
              <span className="mono">/ name</span>
              <input
                type="text"
                name="name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                placeholder="who's writing"
              />
            </label>
            <label className="contact-field">
              <span className="mono">/ email</span>
              <input
                type="email"
                name="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                placeholder="reply-to"
              />
            </label>
          </div>
          <label className="contact-field">
            <span className="mono">/ message</span>
            <textarea
              name="message"
              value={contactMsg}
              onChange={(e) => setContactMsg(e.target.value)}
              required
              rows={5}
              placeholder="role, idea, weird question - whatever"
            />
          </label>
          {contactErr && <p className="contact-err">{contactErr}</p>}
          <button
            type="submit"
            className="contact-submit"
            disabled={contactSent}
          >
            <span>{contactSent ? "sending…" : "send"}</span>
            <span className="arrow">↗</span>
          </button>
        </form>

        {submitted && q && (
          <div className="query-deep-link">
            still didn't find what you needed? →
            <a href="mailto:dp86@iu.edu">dp86@iu.edu</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Query;
