import { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./styles/Skills.css";

// Daily drivers — rotates through, spotlight
const drivers = [
  { name: "React", tagline: "where the user actually clicks", years: "5y" },
  { name: "TypeScript", tagline: "where it lies less", years: "4y" },
  { name: "Next.js", tagline: "where the pages render", years: "3y" },
  { name: "Python", tagline: "where the model lives", years: "5y" },
];

const aiStack = [
  "RAG",
  "CAG",
  "HNSW",
  "Embeddings",
  "Semantic Search",
  "LLMs",
  "Scikit-learn",
  "Whisper",
  "NLP",
  "NLTK",
];

const webStack = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Flutter"];
const dataStack = ["FAISS", "ChromaDB", "Vector Stores", "SQL", "NoSQL", "NumPy", "Pandas"];
const infraStack = ["Jetstream2", "Linux", "Git", "Jupyter", "Cloud", "Distributed Systems"];

const Skills = () => {
  const head = useReveal<HTMLDivElement>();
  return (
    <section className="section skills" id="skills">
      <div className="shell">
        <div className="skills-head fade-up" ref={head}>
          <p className="eyebrow">/ 05 — activation map</p>
          <h2 className="skills-title serif">
            Field notes on the tools
            <br />
            <span className="italic accent">I actually pick up.</span>
          </h2>
          <p className="skills-sub mono">
            stats, opinions, evidence — sized by how often the neuron fires
          </p>
        </div>

        <div className="bento">
          <SpotlightTile />
          <AICluster />
          <StatTile
            value="1M+"
            label="high-dim embeddings"
            sub="custom file-system vector store · HNSW tuned"
            color="var(--glow)"
          />
          <CodeTile />
          <StatTile
            value="50K+"
            label="NIH NHGRI docs"
            sub="RAG · CAG pipeline · 36% lower latency"
            color="var(--accent)"
          />
          <QuoteTile />
          <GroupTile
            title="Web"
            caption="ship & make fast"
            color="#ffd166"
            stack={webStack}
            icon="◉"
          />
          <GroupTile
            title="Data"
            caption="indexed, embedded"
            color="#9ad7ff"
            stack={dataStack}
            icon="▤"
          />
          <GroupTile
            title="Infra"
            caption="where it runs"
            color="#c4b5fd"
            stack={infraStack}
            icon="◇"
          />
          <LangTile />
        </div>

        <p className="skills-foot-meta mono">
          also fluent in <span>agile / scrum</span>, <span>code review</span>,{" "}
          <span>design handoffs that don't leak</span>, and{" "}
          <span>explaining ML to product folks who'd rather not know</span>.
        </p>
      </div>
    </section>
  );
};

/* ============================================================
   Tiles
   ============================================================ */

const SpotlightTile = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % drivers.length), 2800);
    return () => clearInterval(t);
  }, []);
  const cur = drivers[i];
  return (
    <article className="tile tile-spotlight">
      <header className="tile-head">
        <span className="tile-eyebrow mono">// daily driver</span>
        <span className="tile-meta mono">
          {String(i + 1).padStart(2, "0")} / {String(drivers.length).padStart(2, "0")}
        </span>
      </header>
      <div className="spotlight-stage">
        {drivers.map((d, idx) => (
          <div
            key={d.name}
            className={`spotlight-item ${idx === i ? "is-on" : ""}`}
          >
            <h3 className="spotlight-name serif">{d.name}</h3>
            <p className="spotlight-tag italic">{d.tagline}</p>
          </div>
        ))}
      </div>
      <footer className="tile-foot">
        <span className="mono">{cur.years} · weighted</span>
        <span className="spotlight-pips">
          {drivers.map((_, idx) => (
            <span key={idx} className={`pip ${idx === i ? "is-on" : ""}`} />
          ))}
        </span>
      </footer>
    </article>
  );
};

const AICluster = () => {
  return (
    <article className="tile tile-ai">
      <header className="tile-head">
        <span className="tile-eyebrow mono" style={{ color: "var(--glow)" }}>
          // research stack — the other half
        </span>
      </header>
      <h3 className="ai-title serif">
        Retrieval, ranking, <i>everything that has to find before it generates.</i>
      </h3>
      <div className="ai-tags">
        {aiStack.map((t, i) => (
          <span
            className="ai-tag"
            key={t}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {t}
          </span>
        ))}
      </div>
      <footer className="tile-foot">
        <span className="mono ai-foot">
          ★ deepest cluster · 36% lower query latency · 25% fewer hallucinations
        </span>
      </footer>
    </article>
  );
};

type StatProps = {
  value: string;
  label: string;
  sub: string;
  color: string;
};

const StatTile = ({ value, label, sub, color }: StatProps) => {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article className={`tile tile-stat ${shown ? "is-shown" : ""}`} ref={ref}>
      <span className="stat-value serif" style={{ color }}>{value}</span>
      <span className="stat-label">{label}</span>
      <span className="stat-sub mono">{sub}</span>
    </article>
  );
};

const CodeTile = () => {
  return (
    <article className="tile tile-code mono">
      <header className="code-bar">
        <span className="code-dot" style={{ background: "#ff5e3a" }} />
        <span className="code-dot" style={{ background: "#ffd166" }} />
        <span className="code-dot" style={{ background: "#b8ff5e" }} />
        <span className="code-file">~/who_am_i.ts</span>
      </header>
      <pre className="code-body">
        <code>
          <span className="c-key">const</span>{" "}
          <span className="c-var">dhruvil</span>{" "}
          <span className="c-op">=</span> {"{"}
          {"\n  "}
          <span className="c-prop">role</span>
          <span className="c-op">:</span>{" "}
          <span className="c-str">"frontend engineer + ml researcher"</span>
          <span className="c-op">,</span>
          {"\n  "}
          <span className="c-prop">obsessions</span>
          <span className="c-op">:</span> [
          {"\n    "}
          <span className="c-str">"interfaces that don't lie"</span>
          <span className="c-op">,</span>
          {"\n    "}
          <span className="c-str">"perf budgets nobody else watches"</span>
          <span className="c-op">,</span>
          {"\n  "}
          ]<span className="c-op">,</span>
          {"\n  "}
          <span className="c-prop">picks_up</span>
          <span className="c-op">:</span>{" "}
          <span className="c-fn">whatever</span>(
          <span className="c-str">"the task needs"</span>),
          {"\n"}
          {"}"}
          <span className="cursor-blink">▍</span>
        </code>
      </pre>
    </article>
  );
};

const QuoteTile = () => {
  return (
    <article className="tile tile-quote">
      <span className="quote-mark serif">"</span>
      <p className="quote-text serif">
        RAG is <i>70%</i> chunking and <i>20%</i> evals.
        <br />
        The model is the easy part.
      </p>
      <footer className="tile-foot">
        <span className="mono quote-attr">— me, after two demos that didn't ship</span>
      </footer>
    </article>
  );
};

type GroupProps = {
  title: string;
  caption: string;
  color: string;
  stack: string[];
  icon: string;
};

const GroupTile = ({ title, caption, color, stack, icon }: GroupProps) => {
  return (
    <article
      className="tile tile-group"
      style={{ ["--group-color" as string]: color }}
    >
      <header className="group-head">
        <span className="group-icon" style={{ color }}>{icon}</span>
        <div>
          <h3 className="group-title">{title}</h3>
          <p className="group-caption mono">{caption}</p>
        </div>
        <span className="group-count mono">{String(stack.length).padStart(2, "0")}</span>
      </header>
      <ul className="group-list">
        {stack.map((s) => (
          <li className="group-item" key={s}>
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
};

const LangTile = () => {
  return (
    <article className="tile tile-langs">
      <header className="tile-head">
        <span className="tile-eyebrow mono" style={{ color: "var(--accent)" }}>
          // languages — by line-count, not love
        </span>
      </header>
      <div className="lang-bars">
        {[
          { l: "TypeScript", w: 96 },
          { l: "JavaScript", w: 92 },
          { l: "Python", w: 88 },
          { l: "SQL", w: 72 },
          { l: "Java", w: 60 },
          { l: "C / C++", w: 56 },
          { l: "Dart", w: 48 },
        ].map((row, i) => (
          <div className="lang-row" key={row.l} style={{ animationDelay: `${i * 0.06}s` }}>
            <span className="lang-name">{row.l}</span>
            <span className="lang-bar">
              <span
                className="lang-bar-fill"
                style={{ width: `${row.w}%` }}
              />
            </span>
            <span className="lang-w mono">{row.w}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Skills;
