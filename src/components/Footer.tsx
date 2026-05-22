import "./styles/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-shell shell">
        <div className="footer-mark">
          <span
            className="serif"
            style={{ fontSize: "clamp(4rem, 18vw, 12rem)" }}
          >
            d<span className="italic">.</span>p
          </span>
          <span className="mono footer-sig">/ end of embedding</span>
        </div>

        <div className="footer-grid">
          <div>
            <div className="eyebrow">Reach</div>
            <ul className="footer-list">
              <li>
                <a href="mailto:dp86@iu.edu">dp86@iu.edu</a>
              </li>
              <li>
                <a href="mailto:dhruvilpatel6468@gmail.com">
                  dhruvilpatel6468@gmail.com
                </a>
              </li>
              <li className="mono ink-faint">
                +1 (708) 996-9690 · United States
              </li>
              <li className="mono footer-open">
                <span className="footer-open-dot" aria-hidden /> open for
                full-time roles · May 2026
              </li>
            </ul>
          </div>
          <div>
            <div className="eyebrow">Elsewhere</div>
            <ul className="footer-list">
              <li>
                <a
                  href="https://github.com/PatelDhruvil2502"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/dhruvil2502/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/drive/folders/1hcBAv1AOkNLXJ6dhAiyaMeSSI-mirWor?usp=drive_link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Résumé ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="eyebrow">Colophon</div>
            <p className="footer-colophon">
              Built with React + TypeScript, three.js (via R3F), and Lenis.
              Typeset in Instrument Serif, Inter & JetBrains Mono.
            </p>
          </div>
        </div>

        <div className="footer-base">
          <span className="mono">© {year} - patel, d.</span>
          <span className="mono">
            made between debugging sessions, w/ too much coffee
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
