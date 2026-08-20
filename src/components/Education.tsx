import { useReveal } from "../hooks/useReveal";
import "./styles/Education.css";

const stages = [
  {
    label: "fine-tuning",
    title: "M.S. Computer Science",
    org: "Indiana University Bloomington",
    range: "Aug 2024 - May 2026",
    detail:
      "Applied Algorithms · Machine Learning · Software Engineering · Computer Networks · Database Concepts. GPA 3.66.",
    epoch: "epoch 02",
  },
  {
    label: "pre-training",
    title: "B.Tech, Information Technology",
    org: "Dharmsinh Desai University · Nadiad, India",
    range: "Aug 2020 - May 2024",
    detail:
      "Software development & database management. Graduated with GPA 3.30.",
    epoch: "epoch 01",
  },
];

const certs = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (Oracle, Oct 2025)",
    weight: "credential",
  },
  {
    name: "Advanced LLMs with Retrieval Augmented Generation (RAG) — LinkedIn Learning, Oct 2025",
    weight: "credential",
  },
];

const Education = () => {
  const head = useReveal<HTMLDivElement>();
  return (
    <section className="section edu" id="education">
      <div className="shell">
        <div className="edu-head fade-up" ref={head}>
          <p className="eyebrow">/ 03 - pre-training stages</p>
          <h2 className="edu-title serif">
            Where the <span className="italic accent">weights</span> got set.
          </h2>
        </div>

        <div className="edu-grid">
          {stages.map((s, i) => (
            <EduCard key={s.title} {...s} delay={i * 0.1} />
          ))}
        </div>

        <div className="edu-certs">
          <p className="eyebrow eyebrow-sub">checkpoints</p>
          <ul className="cert-list">
            {certs.map((c) => (
              <li className="cert-item" key={c.name}>
                <span className="cert-tick">→</span>
                <span className="cert-name">{c.name}</span>
                <span className="cert-weight mono">{c.weight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const EduCard = ({
  label,
  title,
  org,
  range,
  detail,
  epoch,
  delay,
}: (typeof stages)[number] & { delay: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <article
      className="edu-card fade-up"
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
    >
      <header className="edu-card-head">
        <span className="edu-card-label mono">// {label}</span>
        <span className="edu-card-epoch mono">{epoch}</span>
      </header>
      <h3 className="edu-card-title serif">{title}</h3>
      <p className="edu-card-org">{org}</p>
      <p className="edu-card-range mono">{range}</p>
      <p className="edu-card-detail">{detail}</p>
    </article>
  );
};

export default Education;
