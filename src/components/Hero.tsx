import { useEffect, useRef, useState } from "react";
import EmbeddingField from "./scene/EmbeddingField";
import "./styles/Hero.css";

const PORTRAIT_SRC = "/images/dhruvil.jpeg";

const Hero = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const heroRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(() => formatTime());
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const progressRef = useRef(0);
  const trappedRef = useRef(true);

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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-trap: input drives `progress` directly, no page scroll happens until
  // the animation completes. Once `progress === 1`, normal scrolling (Lenis +
  // native) resumes and About becomes reachable.
  useEffect(() => {
    // Refresh-mid-page guard: if we landed somewhere below the hero, skip the
    // animation entirely so we don't strand the user with overflow:hidden.
    if (window.scrollY > 50) {
      progressRef.current = 1;
      setProgress(1);
      trappedRef.current = false;
      return;
    }

    type LenisLike = { stop: () => void; start: () => void };
    const getLenis = (): LenisLike | undefined =>
      (window as unknown as { __lenis?: LenisLike }).__lenis;

    const engageTrap = () => {
      trappedRef.current = true;
      // Lock both html and body — depending on the scroll root, locking just
      // one isn't always enough to stop wheel-driven scroll.
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      getLenis()?.stop();
    };
    const releaseTrap = () => {
      trappedRef.current = false;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      getLenis()?.start();
    };

    engageTrap();

    // Lenis is initialised in SmoothScroll's useEffect, which (because React
    // runs child effects first) fires AFTER this one. On the very first page
    // load the trap engages before Lenis exists, so the first few wheel
    // events used to slip through and Lenis would smooth-scroll the page.
    // Poll across frames until Lenis is ready, then stop it.
    let lenisRaf = 0;
    const ensureLenisStopped = () => {
      const lenis = getLenis();
      if (lenis) {
        if (trappedRef.current) lenis.stop();
        return;
      }
      if (trappedRef.current) {
        lenisRaf = requestAnimationFrame(ensureLenisStopped);
      }
    };
    ensureLenisStopped();

    // Belt-and-suspenders: if anything manages to move scrollY while we're
    // trapped (e.g. a Lenis tick that ran before we caught it), snap back.
    const handleScrollReset = () => {
      if (trappedRef.current && window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("scroll", handleScrollReset, { passive: true });

    const tick = (delta: number) => {
      if (!trappedRef.current) return;
      const next = Math.min(1, Math.max(0, progressRef.current + delta));
      progressRef.current = next;
      setProgress(next);
      if (next >= 1) releaseTrap();
    };

    // Rewind: at the top of the page, scrolling up re-engages the trap so the
    // user can replay the animation in reverse.
    const atTop = () => window.scrollY <= 5;

    // `stopImmediatePropagation` blocks Lenis's bubble-phase listener from ever
    // seeing the event. Combined with `capture: true` on addEventListener, this
    // means our handler runs first AND Lenis's never runs at all while trapped.
    // Without this, Lenis processes deltaY in parallel and smooth-scrolls the
    // page even though `preventDefault` cancels the native scroll.
    const handleWheel = (e: WheelEvent) => {
      if (trappedRef.current) {
        e.preventDefault();
        e.stopImmediatePropagation();
        tick(e.deltaY * 0.0009);
        return;
      }
      if (e.deltaY < 0 && atTop()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        engageTrap();
        tick(e.deltaY * 0.0009);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      // Shield Lenis from the touchstart while trapped so it can't initialise
      // a touch-driven scroll sequence behind our backs.
      if (trappedRef.current) {
        e.stopImmediatePropagation();
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (trappedRef.current) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        tick(deltaY * factor);
        touchStartY = touchY;
        return;
      }
      // Released — only re-trap if user is at top and pulling down (scroll up)
      if (deltaY < -20 && atTop()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        engageTrap();
        tick(deltaY * 0.008);
        touchStartY = touchY;
      }
    };
    const handleTouchEnd = () => {
      touchStartY = 0;
    };

    const scrollKeys = new Set([
      "ArrowDown",
      "ArrowUp",
      "PageDown",
      "PageUp",
      " ",
      "Spacebar",
      "Home",
      "End",
    ]);
    const handleKey = (e: KeyboardEvent) => {
      if (!scrollKeys.has(e.key)) return;
      // Don't trap when the user is typing in an input/textarea
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const down =
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " " ||
        e.key === "Spacebar" ||
        e.key === "End";

      if (trappedRef.current) {
        e.preventDefault();
        tick(down ? 0.15 : -0.15);
        return;
      }
      if (!down && atTop()) {
        e.preventDefault();
        engageTrap();
        tick(-0.15);
      }
    };

    // Anchor link clicks (navbar etc.) need to bypass the trap — release first
    // so SmoothScroll's lenis.scrollTo can actually move the page.
    const handleAnchorClick = (e: MouseEvent) => {
      if (!trappedRef.current) return;
      const a = (e.target as HTMLElement | null)?.closest('a[href^="#"]');
      if (!a) return;
      progressRef.current = 1;
      setProgress(1);
      releaseTrap();
    };

    // capture: true → our handlers run in the capturing phase, before any
    // bubble-phase listener Lenis attaches. Together with stopImmediatePropagation
    // this fully shields the trap from Lenis's own input handling.
    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: false, capture: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKey, { capture: true });
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      cancelAnimationFrame(lenisRaf);
      // removeEventListener must match the capture flag used to add.
      window.removeEventListener("wheel", handleWheel, { capture: true } as EventListenerOptions);
      window.removeEventListener("touchstart", handleTouchStart, { capture: true } as EventListenerOptions);
      window.removeEventListener("touchmove", handleTouchMove, { capture: true } as EventListenerOptions);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey, { capture: true } as EventListenerOptions);
      window.removeEventListener("scroll", handleScrollReset);
      document.removeEventListener("click", handleAnchorClick, true);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  // Card animates from a near-square start (matches the photo's natural ratio
  // so we don't aggressively crop) to a wide landscape end frame.
  const mediaW = 360 + progress * (isMobile ? 620 : 1200);
  const mediaH = 440 + progress * (isMobile ? 220 : 380);
  const titleShift = progress * (isMobile ? 95 : 60);
  const metaFade = 1 - Math.min(1, progress * 1.4);
  const bgFade = 1 - progress * 0.65;
  // Start with a darker veil so the title halo reads cleanly over the photo;
  // ease off as the card expands and the title splits away.
  const veilFade = 0.65 - progress * 0.45;

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-scene" aria-hidden style={{ opacity: bgFade }}>
        <EmbeddingField mouse={mouse} />
      </div>

      <div className="hero-gradient" aria-hidden />

      <div className="hero-meta hero-meta-tl mono" style={{ opacity: metaFade }}>
        <span className="dim">// hello, world</span>
        <span>init( ) → vector_field_v2.6</span>
      </div>

      <div className="hero-meta hero-meta-tr mono" style={{ opacity: metaFade }}>
        <span className="dim">{time} EST · bloomington, IN</span>
        <span className="dim">lat 39.17°N · lon -86.52°W</span>
      </div>

      <div className="hero-meta hero-meta-bl mono" style={{ opacity: metaFade }}>
        <span className="dim">scroll to expand</span>
        <span className="scroll-tick">↓</span>
      </div>

      <div className="hero-meta hero-meta-br mono" style={{ opacity: metaFade }}>
        <span className="dim">currently — </span>
        <span>shipping next.js</span>
        <span className="dim">@ global health impact</span>
      </div>

      <div
        className="hero-portrait"
        style={{
          width: `${mediaW}px`,
          height: `${mediaH}px`,
        }}
      >
        <img src={PORTRAIT_SRC} alt="Dhruvil Patel" loading="eager" />
        <div
          className="hero-portrait-veil"
          style={{ opacity: veilFade }}
          aria-hidden
        />
      </div>

      <div className="hero-title-stack" aria-hidden={progress > 0.9}>
        <h1
          className="hero-title-half serif"
          style={{ transform: `translateX(-${titleShift}vw)` }}
        >
          Dhruvil
        </h1>
        <h1
          className="hero-title-half serif"
          style={{ transform: `translateX(${titleShift}vw)` }}
        >
          <span className="italic">Patel</span>
          <i className="hero-stop">.</i>
        </h1>
      </div>

      <span className="visually-hidden">Dhruvil Patel</span>
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
