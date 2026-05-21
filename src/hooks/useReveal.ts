import { useEffect, useRef } from "react";

export const useReveal = <T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
  once = true,
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If element is already on screen at mount, reveal immediately.
    const r = el.getBoundingClientRect();
    if (
      r.top < window.innerHeight &&
      r.bottom > 0
    ) {
      el.classList.add("in");
      if (once) return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("in");
          }
        });
      },
      { threshold, rootMargin: "0px 0px 0px 0px" },
    );

    io.observe(el);

    // Safety net — re-check on scroll in case IO misfires
    const onScroll = () => {
      if (el.classList.contains("in")) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.classList.add("in");
        if (once) io.unobserve(el);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold, once]);

  return ref;
};
