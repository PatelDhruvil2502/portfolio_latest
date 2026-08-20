import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./styles/Experience.css";

type Role = {
  id: string;
  title: string;
  org: string;
  range: string;
  current?: boolean;
  tags: string[];
  body: string;
  metrics: { label: string; value: string }[];
};

const roles: Role[] = [
  {
    id: "ghi",
    title: "Frontend Developer",
    org: "Global Health Impact",
    range: "Feb 2026 - present · Indiana, United States",
    current: true,
    tags: ["next.js", "typescript", "drizzle orm", "sqlite", "google charts", "tailwind"],
    body: "Replaced a legacy external Source Index with a local Next.js and TypeScript analytics dashboard — validated REST API, two Google Charts visualizations, and 7 SQLite tables through Drizzle ORM for ranked DALY and source-score analysis across 12 year-disease combinations. Redesigned the methodology experience from Figma with React, Next.js, and Tailwind CSS, centralizing 4 index pathways, 3 research reports, 7 technical guides, 6 documentation files, and 11 EALY datasets.",
    metrics: [
      { label: "sqlite tables", value: "7" },
      { label: "year-disease combos", value: "12" },
      { label: "ealy datasets", value: "11" },
    ],
  },
  {
    id: "grad-research",
    title: "Graduate Research Assistant",
    org: "Indiana University Bloomington",
    range: "Jan 2026 - May 2026 · Indiana, United States",
    tags: ["hnswlib", "docker", "ann", "python", "numpy"],
    body: "Built Docker-based A/B benchmarks of hnswlib (software prefetch ON vs OFF) on 150K 128-dimensional vectors; compile-time prefetch cut mean HNSW query latency about 24% (0.83 ms vs 1.03 ms) and p99 from 1.55 ms to 1.14 ms with no recall change. Profiled HNSW with Linux process metrics and Python/NumPy sweeps — cutting Docker memory from 110% to 30% of RSS raised mean latency about 32× with 8.6M major page faults; ef and M raised latency up to 12× and 14×.",
    metrics: [
      { label: "mean latency", value: "−24%" },
      { label: "p99 latency", value: "1.14 ms" },
      { label: "vectors", value: "150K" },
    ],
  },
  {
    id: "ai-research",
    title: "AI Research Engineer",
    org: "Indiana University Bloomington",
    range: "Jan 2026 - May 2026 · Indiana, United States",
    tags: ["rag", "crag", "cag", "chromadb", "ollama", "slurm"],
    body: "Built an end-to-end Python pipeline for NHGRI CGD ingest/chunking, Sentence-Transformer / BGE embeddings, ChromaDB persistence, and Ollama/Hugging Face generation with parallel RAG/CRAG/CAG execution. Added a verified 500-question ground-truth workflow with NCBI Gene, MedGen, and OMIM checks; instrumented Hit@k, MRR, Exact Match, Token F1, BERTScore, and latency; shipped CAG cache-mode serving with preloaded KV context and Ollama prefix caching.",
    metrics: [
      { label: "eval questions", value: "500" },
      { label: "modes", value: "RAG·CRAG·CAG" },
      { label: "citations", value: "auditable" },
    ],
  },
  {
    id: "fuzzy-cloud",
    title: "React Developer Intern",
    org: "Fuzzy Cloud",
    range: "Dec 2023 - May 2024 · Gujarat, India",
    tags: ["typescript", "zod", "jotai", "dexie", "react"],
    body: "Built a type-safe patient-data module with TypeScript and Zod across 40+ modernized hospital-management components, reducing schema inconsistencies by 90% and regression defects by 22%. Added Jotai state management and Dexie.js offline persistence, improving rendering performance by 30% and preserving data across 1,000+ network-disruption test sessions.",
    metrics: [
      { label: "schema drift", value: "−90%" },
      { label: "regressions", value: "−22%" },
      { label: "frontend perf", value: "+30%" },
    ],
  },
];

const Experience = () => {
  const headRef = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<string>(roles[0].id);

  return (
    <section className="section exp" id="experience">
      <div className="shell">
        <div className="exp-head fade-up" ref={headRef}>
          <p className="eyebrow">/ 02 - trained on</p>
          <h2 className="exp-title serif">
            The corpus<i className="accent">.</i> What I read
            <br />
            in the wild, and what it taught me.
          </h2>
          <p className="exp-sub mono">
            <span>{roles.length} records</span>
            <span className="sep">·</span>
            <span>shuffle: false</span>
            <span className="sep">·</span>
            <span>weighted by recency</span>
          </p>
        </div>

        <div className="exp-list">
          {roles.map((r, i) => (
            <ExpRow
              key={r.id}
              role={r}
              index={i}
              isOpen={open === r.id}
              onToggle={() => setOpen((cur) => (cur === r.id ? "" : r.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpRow = ({
  role,
  index,
  isOpen,
  onToggle,
}: {
  role: Role;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className={`exp-row ${isOpen ? "is-open" : ""}`}>
      <button className="exp-row-head" onClick={onToggle}>
        <span className="exp-idx mono">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="exp-row-main">
          <h3 className="exp-row-title">
            {role.title}
            <span className="exp-row-org"> · {role.org}</span>
          </h3>
          <span className="exp-row-range mono">{role.range}</span>
        </div>
        <span className={`exp-row-toggle ${isOpen ? "is-open" : ""}`}>
          <span />
          <span />
        </span>
      </button>

      <div className="exp-row-body">
        <div className="exp-row-body-in">
          <p className="exp-row-body-text">{role.body}</p>
          <div className="exp-metrics">
            {role.metrics.map((m, i) => (
              <div className="metric" key={i}>
                <span className="metric-value">{m.value}</span>
                <span className="metric-label">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="exp-tags">
            {role.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
