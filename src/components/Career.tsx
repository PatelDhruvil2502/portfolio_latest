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
                <h4>Frontend Developer</h4>
                <h5>Global Health Impact</h5>
              </div>
              <h3>Feb 2026 - Present</h3>
            </div>
            <p>
              Migrating a legacy Flask-based global health forecasting platform
              to a modular, API-driven Next.js frontend, improving projected
              page load latency by ~40% for international development research
              tools. Built cloud-backed analytics workflows on Jetstream2 to
              process large-scale global health datasets, improving stability
              and ensuring 99.9% uptime for data pipelines that support global
              health policy analysis.
            </p>
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
              Designed a scalable RAG-based clinical genomics QA system over
              50K+ NIH NHGRI genomic and clinical research documents, building
              a high-throughput ingestion pipeline processing 10K+ records per
              cycle and reducing query response latency by 36% (4.2s → 2.7s).
              Developed an evaluation and benchmarking framework for genomic
              retrieval tasks and validated a hybrid RAG–CAG architecture that
              improved retrieval precision by 20% and reduced hallucination
              rates by 25%.
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
              Architected and implemented a file-system–backed vector storage
              engine for 1M+ high-dimensional embeddings and optimized HNSW
              indexing to reduce nearest-neighbor search latency by 35% while
              maintaining 95%+ recall under constrained memory. Led controlled
              performance experiments across memory thresholds and introduced
              disk-assisted hybrid indexing that improved throughput by 28% and
              reduced memory overhead by 40% without degrading retrieval
              quality.
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
