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
                <h4>AI Research Engineer</h4>
                <h5>Indiana University Bloomington</h5>
              </div>
              <h3>Jan 2026 - Present</h3>
            </div>
            <p>
              Directed data architecture strategy for a domain-specific QA
              system across 50,000+ NIH NHGRI biomedical documents, elevating
              domain query accuracy by 32% over baseline retrieval. Engineered a
              scalable RAG ingestion pipeline processing 10K+ documents per
              cycle, cutting response latency from 4.2s to 2.7s, and validated a
              hybrid RAG–CAG architecture that reduced hallucination rates by
              25%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graduate Researcher</h4>
                <h5>Indiana University Bloomington</h5>
              </div>
              <h3>Jan 2026 - Present</h3>
            </div>
            <p>
              Designed a file-system–backed vector storage engine to persist and
              retrieve 1M+ high-dimensional embeddings, strengthening
              large-scale search under constrained memory. Optimized HNSW
              indexing and disk-assisted strategies to cut nearest-neighbor
              latency by 35% and memory overhead by 40% while sustaining 95%+
              recall.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>React Intern</h4>
                <h5>Fuzzy Cloud</h5>
              </div>
              <h3>Dec 2023 - Apr 2024</h3>
            </div>
            <p>
              Spearheaded a type-safe patient data module for a Hospital
              Management System using TypeScript and Zod, reducing schema
              inconsistencies by 90%. Accelerated frontend performance by 30%
              with optimized Jotai state management and built an offline-first
              persistence layer with Dexie.js that maintained 100% data
              reliability across 1,000+ test sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
