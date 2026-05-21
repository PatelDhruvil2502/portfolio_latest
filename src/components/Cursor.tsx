import { useEffect, useRef } from "react";

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const enterHover = () => ring.classList.add("is-hover");
    const leaveHover = () => ring.classList.remove("is-hover");
    const enterText = () => ring.classList.add("is-text");
    const leaveText = () => ring.classList.remove("is-text");

    const bindHovers = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", enterHover);
        el.addEventListener("mouseleave", leaveHover);
      });
      document.querySelectorAll("[data-text]").forEach((el) => {
        el.addEventListener("mouseenter", enterText);
        el.addEventListener("mouseleave", leaveText);
      });
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    const t = setTimeout(bindHovers, 400);
    const obs = new MutationObserver(() => bindHovers());
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      clearTimeout(t);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
};

export default Cursor;
