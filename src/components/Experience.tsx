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
    range: "Feb 2026 - present · United States",
    current: true,
    tags: ["next.js", "jetstream2", "rest api", "data pipelines"],
    body: "Spearheading migration of a legacy Flask global-health forecasting platform onto a modular, API-driven Next.js architecture - projected −40% page-load latency on the heaviest research tools and faster feature delivery. Built cloud-backed analytics workflows on Jetstream2 holding 99.9% uptime for the pipelines that feed global-health policy analysis.",
    metrics: [
      { label: "page latency", value: "−40%" },
      { label: "pipeline uptime", value: "99.9%" },
    ],
  },
  {
    id: "grad-research",
    title: "Graduate Research Assistant",
    org: "Indiana University Bloomington",
    range: "Jan 2026 - May 2026 · United States",
    tags: ["hnsw", "ann", "vector storage", "python", "numpy"],
    body: "Architected a file-system–backed vector storage engine for 1M+ high-dimensional embeddings, tuning HNSW indexing to drop NN-search latency 35% while holding 95%+ recall under tight memory. Ran controlled performance experiments across memory thresholds; disk-assisted hybrid indexing pushed throughput +28% and cut memory overhead 40% without giving up retrieval quality.",
    metrics: [
      { label: "search latency", value: "−35%" },
      { label: "throughput", value: "+28%" },
      { label: "memory", value: "−40%" },
    ],
  },
  {
    id: "ai-research",
    title: "AI Research Engineer",
    org: "Indiana University Bloomington",
    range: "Jan 2026 - May 2026 · United States",
    tags: ["rag", "cag", "genomics", "evals", "llm"],
    body: "Designed a scalable RAG-based clinical-genomics QA system over 50K+ NIH NHGRI documents. Built a high-throughput ingestion pipeline processing 10K+ records per cycle and cut query response latency 36%. Wrote an evaluation & benchmarking framework for genomic retrieval; a hybrid RAG–CAG architecture improved precision 20% and dropped hallucination rates 25%.",
    metrics: [
      { label: "latency", value: "−36%" },
      { label: "precision", value: "+20%" },
      { label: "hallucinations", value: "−25%" },
    ],
  },
  {
    id: "fuzzy-cloud",
    title: "React Developer Intern",
    org: "Fuzzy Cloud",
    range: "Dec 2023 - Apr 2024 · Gujarat, India",
    tags: ["typescript", "zod", "jotai", "dexie", "react"],
    body: "Architected a type-safe patient-data module for a Hospital Management System using TypeScript + Zod, eliminating schema inconsistencies 90% while modernizing 40+ legacy components - −22% regression defects, +20% feature delivery. Optimized frontend architecture with Jotai state and Dexie.js offline persistence: +30% rendering performance, 100% data reliability across 1,000+ test sessions.",
    metrics: [
      { label: "schema drift", value: "−90%" },
      { label: "frontend perf", value: "+30%" },
      { label: "reliability", value: "100%" },
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
