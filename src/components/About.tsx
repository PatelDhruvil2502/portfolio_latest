import { useReveal } from "../hooks/useReveal";
import "./styles/About.css";

const About = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section about" id="about">
      <div className="shell">
        <div className="about-grid" ref={ref}>
          <div className="about-meta">
            <p className="eyebrow">/ 01 - origin vector</p>
            <p className="mono about-coord">
              loc: united states
              <br />
              tz:&nbsp; eastern time
              <br />
              <span className="about-coord-open">status: open to roles</span>
            </p>
          </div>

          <div className="about-body">
            <h2 className="about-headline serif">
              I build <span className="italic accent">interfaces</span> that
              ought to feel less like screens and more like a colleague handing
              you the right control at <span className="italic">3 a.m.</span>
            </h2>

            <div className="about-cols">
              <div className="about-col">
                <p className="about-p">
                  Most of my time goes into making web apps feel <em>fast</em>{" "}
                  and <em>honest</em>. I ship Next.js, type-safe boundaries, and
                  the unglamorous plumbing - accessibility, perf budgets, the 17
                  ways a state machine can lie to you.
                </p>
              </div>
              <div className="about-col">
                <p className="about-p">
                  Off the day job I still write ML - RAG pipelines, HNSW
                  indexes, retrieval evals - leftovers from my MS at Indiana
                  University. TypeScript when correctness matters, Python when
                  speed of thought matters, a notebook when I'm trying to be
                  honest with myself.
                </p>
              </div>
            </div>

            <div className="about-tags">
              <span className="tag">React · Next.js</span>
              <span className="tag">TypeScript · Zod</span>
              <span className="tag">Tailwind · CSS</span>
              <span className="tag">RAG · CAG</span>
              <span className="tag">PyTorch · FastAPI</span>
            </div>
          </div>
        </div>

        <aside className="about-sticky">
          <div className="sticky-card">
            <span className="mono sticky-pin">★</span>
            <p>
              "the design is fine, the data fetch is the bug" - me,
              <br /> every other pull request
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default About;
