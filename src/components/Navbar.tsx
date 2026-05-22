import { useEffect, useState } from "react";
import "./styles/Navbar.css";

const links = [
  { id: "about", label: "About", code: "01" },
  { id: "experience", label: "Trained On", code: "02" },
  { id: "projects", label: "Output", code: "03" },
  { id: "skills", label: "Activations", code: "04" },
  { id: "query", label: "Query", code: "05" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("about");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    // Lazy-loaded sections (e.g. Projects, Query) mount after the navbar,
    // so retry observation until every section has been picked up.
    const observed = new Set<string>();
    const observeAvailable = () => {
      links.forEach((l) => {
        if (observed.has(l.id)) return;
        const el = document.getElementById(l.id);
        if (el) {
          io.observe(el);
          observed.add(l.id);
        }
      });
      if (observed.size === links.length) mo.disconnect();
    };

    const mo = new MutationObserver(observeAvailable);
    mo.observe(document.body, { childList: true, subtree: true });
    observeAvailable();

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="nav-brand" aria-label="Home">
        <span className="brand-mark">DP</span>
        <span className="brand-meta mono">
          <span>dhruvil.patel</span>
          <span className="brand-sub">v.2026 · embedding</span>
        </span>
      </a>

      <button
        className={`nav-toggle ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
      </button>

      <nav className={`nav-links ${open ? "is-open" : ""}`}>
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`nav-link ${active === l.id ? "is-active" : ""}`}
            onClick={() => setOpen(false)}
          >
            <span className="nav-link-code mono">{l.code}</span>
            <span className="nav-link-label">{l.label}</span>
          </a>
        ))}
        <a
          href="https://drive.google.com/drive/folders/1hcBAv1AOkNLXJ6dhAiyaMeSSI-mirWor?usp=drive_link"
          target="_blank"
          rel="noreferrer"
          className="nav-resume"
        >
          <span className="dot" />
          résumé.pdf
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
