import { useEffect, useRef, useState } from "react";
import EmbeddingField from "./scene/EmbeddingField";
import "./styles/Hero.css";

const PORTRAIT_AVIF = "/images/dhruvil.avif";
const PORTRAIT_WEBP = "/images/dhruvil.webp";
const PORTRAIT_FALLBACK = "/images/dhruvil.jpeg";

const HeroPortrait = ({ eager = true }: { eager?: boolean }) => (
  <picture>
    <source srcSet={PORTRAIT_AVIF} type="image/avif" />
    <source srcSet={PORTRAIT_WEBP} type="image/webp" />
    <img
      src={PORTRAIT_FALLBACK}
      alt="Dhruvil Patel"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
    />
  </picture>
);

const Hero = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const heroRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(() => formatTime());
  const [progress, setProgress] = useState(0);
  // Lazy-init so the very first render already knows whether we're on mobile -
  // the scroll-trap vs auto-play decision is made on mount and we can't wait
  // for an async useEffect to flip this from `false` first.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const [vw, setVw] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const [vh, setVh] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 768,
  );

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
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

    // Mobile gets a completely different layout (magazine-cover style, see
    // render branch below) - no scroll-trap, no progress-driven animation, no
    // wheel/touch handlers. Bail out of the trap setup entirely.
    if (isMobile) {
      trappedRef.current = false;
      return;
    }

    type LenisLike = { stop: () => void; start: () => void };
    const getLenis = (): LenisLike | undefined =>
      (window as unknown as { __lenis?: LenisLike }).__lenis;

    const engageTrap = () => {
      trappedRef.current = true;
      // Lock both html and body - depending on the scroll root, locking just
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
      // Released - only re-trap if user is at top and pulling down (scroll up)
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
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      )
        return;
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

    // Anchor link clicks (navbar etc.) need to bypass the trap - release first
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
    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", handleTouchStart, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKey, { capture: true });
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      cancelAnimationFrame(lenisRaf);
      // removeEventListener must match the capture flag used to add.
      window.removeEventListener("wheel", handleWheel, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("touchstart", handleTouchStart, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("touchmove", handleTouchMove, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener("scroll", handleScrollReset);
      document.removeEventListener("click", handleAnchorClick, true);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  // Interpolate against the actual viewport so progress = 1 lines up with the
  // visual endpoint (95vw × 85vh). Previously the card hit its max-width cap
  // around progress = 0.5, leaving half the animation invisible - which made
  // meta corners and the split title look like they hadn't finished.
  // Smaller start on mobile so the card still has visible room to grow even
  // though the target (95vw) is already small.
  const startW = isMobile ? 260 : 360;
  const startH = isMobile ? 340 : 440;
  const targetW = vw * 0.95;
  const targetH = vh * 0.85;
  const mediaW = startW + progress * Math.max(0, targetW - startW);
  const mediaH = startH + progress * Math.max(0, targetH - startH);
  // 110vw / 130vw guarantee the title halves are fully off-screen at progress 1
  // regardless of font scaling or viewport width.
  const titleShift = progress * (isMobile ? 130 : 110);
  // Hide the meta corners as soon as the photo starts dominating - by ~25%
  // they're gone. Keeping them around longer looked cluttered, since the photo
  // grows to 85vh and the corners sit in the small margin below it. Reverses
  // symmetrically so they fade back in once you scroll back to ~25%.
  const metaFade = Math.max(0, Math.min(1, (0.25 - progress) / 0.08));
  // Beyond that threshold we also drop them from the DOM entirely so there's
  // zero chance of them peeking through the photo's bottom margin.
  const showMeta = metaFade > 0.01;
  const bgFade = 1 - progress * 0.65;
  // Start with a darker veil so the title halo reads cleanly over the photo;
  // ease off as the card expands and the title splits away.
  const veilFade = 0.65 - progress * 0.45;

  if (isMobile) {
    // Magazine-cover mobile hero. Photo dominates the top, name overlaid with
    // a vertical reveal animation, info card below. No scroll-trap, no 3D
    // scene - both feel out of place on a narrow touch viewport.
    return (
      <section className="hero hero-mobile" id="top">
        <div className="m-hero-photo">
          <HeroPortrait />
          <div className="m-hero-photo-gradient" aria-hidden />
          <div className="m-hero-photo-overlay">
            <p className="m-hero-eyebrow mono">
              <span className="dot" /> embedding · 2025–26
            </p>
            <h1 className="m-hero-title serif">
              <span className="m-line">
                <span className="m-word">Dhruvil</span>
              </span>
              <span className="m-line">
                <span className="m-word">
                  <span className="italic">Patel</span>
                  <i className="hero-stop">.</i>
                </span>
              </span>
            </h1>
          </div>
        </div>

        <div className="m-hero-body">
          <p className="m-hero-tag serif italic">
            A frontend engineer who treats the codebase like a notebook.
          </p>
          <div className="m-hero-currently mono">
            <span className="dim">currently - </span>
            <span>shipping next.js</span>
            <span className="dim"> @ global health impact</span>
          </div>
          <a href="#about" className="m-hero-scroll mono">
            <span className="dim">scroll to about</span>
            <span className="scroll-tick">↓</span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-scene" aria-hidden style={{ opacity: bgFade }}>
        <EmbeddingField mouse={mouse} />
      </div>

      <div className="hero-gradient" aria-hidden />

      {showMeta && (
        <>
          <div
            className="hero-meta hero-meta-tl mono"
            style={{ opacity: metaFade }}
          >
            <span className="dim">// hello, world</span>
            <span>init( ) → vector_field_v2.6</span>
          </div>

          <div
            className="hero-meta hero-meta-tr mono"
            style={{ opacity: metaFade }}
          >
            <span className="dim">{time} EST · bloomington, IN</span>
            <span className="dim">lat 39.17°N · lon -86.52°W</span>
          </div>

          <div
            className="hero-meta hero-meta-bl mono"
            style={{ opacity: metaFade }}
          >
            <span className="dim">scroll to expand</span>
            <span className="scroll-tick">↓</span>
          </div>

          <div
            className="hero-meta hero-meta-br mono"
            style={{ opacity: metaFade }}
          >
            <span className="dim">currently - </span>
            <span>shipping next.js</span>
            <span className="dim">@ global health impact</span>
          </div>
        </>
      )}

      <div
        className="hero-portrait"
        style={{
          width: `${mediaW}px`,
          height: `${mediaH}px`,
        }}
      >
        <HeroPortrait />
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
