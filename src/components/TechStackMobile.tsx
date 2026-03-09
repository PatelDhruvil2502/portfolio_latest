import "./styles/TechStackMobile.css";

const categories = [
  {
    title: "Languages & Core",
    subtitle: "The foundations I think in",
    skills: ["Python", "Java", "C++", "JavaScript", "TypeScript"],
  },
  {
    title: "AI, RAG & Data",
    subtitle: "What I use for ML & GenAI",
    skills: ["GenAI", "RAG", "Machine Learning", "NLP", "OpenCV"],
  },
  {
    title: "Frontend & Product",
    subtitle: "For building polished UIs",
    skills: ["React", "Flutter", "HTML/CSS", "Vite", "Redux"],
  },
  {
    title: "Backend & Infra",
    subtitle: "For APIs, data & shipping",
    skills: ["Node.js", "MongoDB", "PostgreSQL", "Firebase", "Git"],
  },
];

const TechStackMobile = () => {
  return (
    <section className="ts-mobile-section" id="techstack-mobile">
      <div className="ts-mobile-header">
        <p className="ts-mobile-kicker">Skill Stories</p>
        <h2>
          My <span>Tech Stack</span>
        </h2>
        <p className="ts-mobile-subtitle">
          Swipe through the stacks I lean on for research, product and shipping.
        </p>
      </div>

      <div className="tsm-carousel" data-cursor="disable">
        {categories.map((category, index) => (
          <article
            key={category.title}
            className="tsm-slide"
          >
            <header className="tsm-slide-header">
              <span className="tsm-slide-count">
                0{index + 1}
              </span>
              <h3>{category.title}</h3>
            </header>
            <p className="tsm-slide-subtitle">{category.subtitle}</p>
            <div className="tsm-slide-chips">
              {category.skills.map((skill) => (
                <span key={skill} className="tsm-chip">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="tsm-hint">
        <span className="tsm-hint-dot" />
        <span>Swipe to explore more stacks</span>
      </div>
    </section>
  );
};

export default TechStackMobile;
