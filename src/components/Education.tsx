import "./styles/Career.css";

const Education = () => {
  return (
    <div
      className="career-section section-container"
      style={{ marginTop: "-100px" }}
    >
      <div className="career-container">
        <h2>
          My <span>Education</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Master of Science in Computer Science</h4>
                <h5>Indiana University Bloomington</h5>
              </div>
              <h3>2024 - 2026</h3>
            </div>
            <p>
              Coursework: Applied Algorithms, Machine Learning, Software
              Engineering, Computer Networks, Database Concepts. GPA: 3.66.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Technology in IT</h4>
                <h5>Dharmsinh Desai University</h5>
              </div>
              <h3>2020 - 2024</h3>
            </div>
            <p>
              Specialized in software development and database management.
              Graduated with GPA 4.00. Nadiad, India.
            </p>
          </div>
        </div>

        <h2 style={{ marginTop: "50px", marginBottom: "30px" }}>
          <span>Certifications</span>
        </h2>
        <div className="career-info">
          <div
            className="career-info-box"
            style={{ width: "100%", paddingLeft: 0 }}
          >
            <ul>
              <li
                style={{
                  fontSize: "1.2rem",
                  color: "var(--lightgrey)",
                  marginBottom: "10px",
                }}
              >
                Oracle Cloud Infrastructure 2025 AI Foundations Associate
              </li>
              <li style={{ fontSize: "1.2rem", color: "var(--lightgrey)" }}>
                Advanced LLMs with Retrieval Augmented Generation (RAG):
                Practical Projects
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
