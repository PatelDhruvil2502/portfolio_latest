import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Research Engineer / Graduate Researcher</h4>
                <h5>Indiana University Bloomington</h5>
              </div>
              <h3>2026 - Present</h3>
            </div>
            <p>
              Designed file system based vector storage & RAG pipelines. Evaluated HNSW indexing models and benchmarked CAG implementations for domain-specific QA using biomedical literature datasets.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>React Intern</h4>
                <h5>Fuzzy Cloud</h5>
              </div>
              <h3>2023 - 2024</h3>
            </div>
            <p>
              Built a data collection module for HMS using TypeScript & Zod. Integrated Jotai for state management, reducing latency. Established client-side persistence using Dexie.js (IndexedDB).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
