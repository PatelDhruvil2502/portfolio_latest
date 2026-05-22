import { useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./styles/Projects.css";

type Project = {
  id: string;
  index: string;
  title: string;
  kind: string;
  year: string;
  image: string;
  stack: string[];
  body: string;
  link?: string;
};

const projects: Project[] = [
  {
    id: "meetsmart",
    index: "p.001",
    title: "MeetSmart",
    kind: "LLM-powered meeting intelligence",
    year: "2025",
    image: "/images/meetsmart.png",
    stack: ["Python", "FastAPI", "Whisper", "NLP"],
    body: "Meeting intelligence platform processing 200+ minutes of audio per session - auto-extracts notes & action items at 88% precision, cutting manual documentation time 70%. Multilingual sentiment + NLP pipelines hit 85% classification accuracy across 5 languages, expanding accessibility 60%.",
  },
  {
    id: "car-detective",
    index: "p.002",
    title: "Car Damage Detective",
    kind: "Deep learning · classification",
    year: "2024",
    image: "/images/car_detective.png",
    stack: ["Python", "Flask", "VGG16", "CNN"],
    body: "Fine-tuned VGG16 on a curated damage dataset to triage car-damage photos by severity and type. Flask service wraps the model; the interesting part was the data hygiene, not the model.",
  },
  {
    id: "what-the-tweet",
    index: "p.003",
    title: "What the Tweet?!",
    kind: "NLP · classification",
    year: "2024",
    image: "/images/what_the_tweet.png",
    stack: ["Python", "Keras", "BiLSTM"],
    body: "BiLSTM classifier over a noisy Twitter corpus. Spent more time on tokenizer choice than on the model - which, in retrospect, is usually the lesson.",
  },
  {
    id: "pihealth",
    index: "p.004",
    title: "Pi-health",
    kind: "Healthcare · hospital management",
    year: "2024",
    image: "/images/pihealth.png",
    stack: ["React", "TypeScript", "Zod", "Dexie"],
    body: "Type-safe patient module for an HMS. Zod at the boundary, Jotai for state, Dexie offline-first. Wrote integration tests because mocking the DB had bitten people before.",
  },
  {
    id: "societyzen",
    index: "p.005",
    title: "Societyzen",
    kind: "Civic · society management",
    year: "2023",
    image: "/images/societyzen.png",
    stack: ["React", "TypeScript", "Node.js"],
    body: "Membership, dues, and notice-board for residential societies. Built end-to-end; the hardest part was making the dues flow legible to non-technical board members.",
  },
];

const Projects = () => {
  const [active, setActive] = useState<number>(0);
  const head = useReveal<HTMLDivElement>();
  const cur = projects[active];

  return (
    <section className="section projects" id="projects">
      <div className="shell">
        <div className="proj-head fade-up" ref={head}>
          <p className="eyebrow">/ 04 - output space</p>
          <h2 className="proj-title serif">
            Projects, picked from the
            <br />
            <span className="italic accent">tail of the distribution.</span>
          </h2>
        </div>

        <div className="proj-stage">
          <ProjStagePreview project={cur} key={cur.id} />

          <div className="proj-list" role="tablist">
            {projects.map((p, i) => (
              <ProjListItem
                key={p.id}
                p={p}
                isActive={i === active}
                onActivate={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Replaces /images/foo.png with /images/foo.avif (or .webp) without
// hard-coding both paths everywhere the data is defined.
const swapExt = (src: string, ext: string) =>
  src.replace(/\.(png|jpe?g)$/i, `.${ext}`);

const ProjectImage = ({ src, alt }: { src: string; alt: string }) => (
  <picture>
    <source srcSet={swapExt(src, "avif")} type="image/avif" />
    <source srcSet={swapExt(src, "webp")} type="image/webp" />
    <img src={src} alt={alt} loading="lazy" decoding="async" />
  </picture>
);

const ProjStagePreview = ({ project }: { project: Project }) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${-y * 6}deg`);
    el.style.setProperty("--ry", `${x * 8}deg`);
    el.style.setProperty("--mx", `${x * 12}px`);
    el.style.setProperty("--my", `${y * 12}px`);
  };

  const handleLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  return (
    <div
      className="proj-preview"
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="proj-preview-inner">
        <div className="proj-preview-frame">
          <ProjectImage src={project.image} alt={project.title} />
          <div className="proj-preview-tag mono">{project.index}</div>
        </div>
        <div className="proj-preview-meta">
          <h3 className="proj-preview-title serif">{project.title}</h3>
          <p className="proj-preview-kind">{project.kind}</p>
          <p className="proj-preview-body">{project.body}</p>
          <div className="proj-preview-stack">
            {project.stack.map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjListItem = ({
  p,
  isActive,
  onActivate,
}: {
  p: Project;
  isActive: boolean;
  onActivate: () => void;
}) => {
  return (
    <button
      className={`proj-row ${isActive ? "is-active" : ""}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
    >
      <div className="proj-row-line">
        <span className="proj-row-index mono">{p.index}</span>
        <span className="proj-row-title serif">{p.title}</span>
        <span className="proj-row-kind mono">{p.kind}</span>
        <span className="proj-row-year mono">{p.year}</span>
      </div>
      <div className="proj-row-extras">
        <p className="proj-row-body">{p.body}</p>
        <div className="proj-row-stack">
          {p.stack.map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default Projects;
