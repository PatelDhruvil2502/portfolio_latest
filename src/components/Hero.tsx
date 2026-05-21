import { useEffect, useRef, useState } from "react";
import EmbeddingField from "./scene/EmbeddingField";
import "./styles/Hero.css";

const Hero = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const heroRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(() => formatTime());

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouse.current = [x * 2, y * 2];
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-scene" aria-hidden>
        <EmbeddingField mouse={mouse} />
      </div>

      <div className="hero-gradient" aria-hidden />

      <div className="hero-meta hero-meta-tl mono">
        <span className="dim">// hello, world</span>
        <span>init( ) → vector_field_v2.6</span>
      </div>

      <div className="hero-meta hero-meta-tr mono">
        <span className="dim">{time} EST · bloomington, IN</span>
        <span className="dim">lat 39.17°N · lon -86.52°W</span>
      </div>

      <div className="hero-meta hero-meta-bl mono">
        <span className="dim">scroll</span>
        <span className="scroll-tick">↓</span>
      </div>

      <div className="hero-meta hero-meta-br mono">
        <span className="dim">currently — </span>
        <span>shipping next.js</span>
        <span className="dim">@ global health impact</span>
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow mono">
          <span className="dot" /> embedding · 2025–26
        </p>

        <h1 className="hero-name">
          <span className="line-wrap"><span className="line serif">Dhruvil</span></span>
          <span className="line-wrap"><span className="line serif italic">Patel<i className="hero-stop">.</i></span></span>
        </h1>

        <div className="hero-sub">
          <p className="serif italic hero-tag">
            A frontend engineer who treats
            <br />
            the codebase like a notebook —
          </p>
          <p className="hero-tag-2 mono">
            messy in the middle, neat at the edges.
          </p>
        </div>

        <div className="hero-row">
          <a href="#query" className="hero-cta">
            <span className="hero-cta-label">query the space</span>
            <span className="hero-cta-arrow">→</span>
          </a>
          <a href="#projects" className="hero-cta-secondary">
            <span>see the outputs</span>
          </a>
        </div>
      </div>
    </section>
  );
};

function formatTime() {
  const d = new Date();
  return d.toLocaleTimeString("en-US", {
    timeZone: "America/Indiana/Indianapolis",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default Hero;
