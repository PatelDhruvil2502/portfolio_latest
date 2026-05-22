import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./styles/Navbar.css";

const links = [
  { id: "about", label: "About", code: "01" },
  { id: "experience", label: "Trained On", code: "02" },
  { id: "projects", label: "Output", code: "03" },
  { id: "skills", label: "Activations", code: "04" },
  { id: "query", label: "Query", code: "05" },
];

type PillRect = { left: number; width: number; ready: boolean };

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  if (lenis?.scrollTo) {
    lenis.scrollTo(el, { offset: -20, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("about");
  const [open, setOpen] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);
  const [pill, setPill] = useState<PillRect>({ left: 0, width: 0, ready: false });

  const railRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLAnchorElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => {
      const linkEl = linkRefs.current.get(active);
      if (!linkEl) return;
      const r = linkEl.getBoundingClientRect();
      const rr = rail.getBoundingClientRect();
      if (rr.width === 0) return;
      setPill({ left: r.left - rr.left, width: r.width, ready: true });
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    linkRefs.current.forEach((el) => ro.observe(el));

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [active, open]);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest('input, textarea, select, [contenteditable="true"]')) return;

      let targetId: string | null = null;
      let trigger: HTMLAnchorElement | null = null;
      if (e.key === "0") {
        targetId = "top";
        trigger = brandRef.current;
      } else {
        const n = Number(e.key);
        if (Number.isInteger(n) && n >= 1 && n <= links.length) {
          targetId = links[n - 1].id;
          trigger = linkRefs.current.get(targetId) ?? null;
        }
      }
      if (!targetId) return;

      e.preventDefault();
      setPressed(targetId);
      window.setTimeout(() => setPressed((p) => (p === targetId ? null : p)), 400);

      // Dispatch a real click on the anchor so Hero's scroll-trap release
      // handler fires and SmoothScroll's Lenis-driven scroll then runs.
      // Calling lenis.scrollTo directly would no-op while the hero trap is
      // engaged (overflow hidden + lenis.stop()) on first page load.
      if (trigger) {
        trigger.click();
      } else {
        scrollToId(targetId);
      }
      setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="nav-brand" aria-label="Home" ref={brandRef}>
        <span className="brand-mark">
          <span className="brand-mark-ring" aria-hidden />
          <span className="brand-mark-letters">DP</span>
        </span>
        <span className="brand-meta mono">
          <span>dhruvil.patel</span>
          <span className="brand-sub">
            <span className="brand-status-dot" aria-hidden />
            v.2026 · embedding
          </span>
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
        <div className="nav-rail" ref={railRef}>
          <span
            className={`nav-rail-pill ${pill.ready ? "is-ready" : ""}`}
            style={{
              transform: `translate3d(${pill.left}px, 0, 0)`,
              width: `${pill.width}px`,
            }}
            aria-hidden
          />
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-shortcut={i + 1}
              aria-keyshortcuts={String(i + 1)}
              ref={(el) => {
                if (el) linkRefs.current.set(l.id, el);
                else linkRefs.current.delete(l.id);
              }}
              className={`nav-link ${active === l.id ? "is-active" : ""} ${pressed === l.id ? "is-pressed" : ""}`}
              onClick={() => setOpen(false)}
            >
              <span className="nav-link-code mono">{l.code}</span>
              <span className="nav-link-label">{l.label}</span>
              <span className="nav-link-caret" aria-hidden />
            </a>
          ))}
        </div>

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
