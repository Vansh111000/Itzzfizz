"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BLOCKS = [
  {
    title: "Consistent by design",
    body: "Every interaction is driven by scroll progress, not a fixed timer, so it feels the same whether you scroll slowly or fly through it.",
  },
  {
    title: "Built for performance",
    body: "Only transform and opacity are animated, so the browser can composite the motion on the GPU instead of relaying out the page.",
  },
  {
    title: "Made to be revisited",
    body: "Scroll back up and the whole sequence reverses cleanly — nothing is faked, nothing autoplays.",
  },
];

/**
 * A short, self-contained second section. Its reveal is a simple
 * "fade + rise" ScrollTrigger (not scrubbed/pinned) so the heavier pinned
 * interaction above remains the clear centerpiece of the page.
 */
export default function SecondSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const blockRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const targets = [headingRef.current, ...blockRefs.current.filter(Boolean)];

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="designed-for-impact"
      className="relative w-full bg-neutral-950 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2
          ref={headingRef}
          id="designed-for-impact"
          className="translate-y-6 font-display text-4xl tracking-tight text-neutral-50 opacity-0 sm:text-5xl"
        >
          Designed for impact.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-neutral-400">
          A scroll-driven story built on genuine scroll position, not timers
          or fake interactions — every frame answers to where you are on the
          page.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
        {BLOCKS.map((block, index) => (
          <div
            key={block.title}
            ref={(el) => {
              blockRefs.current[index] = el;
            }}
            className="translate-y-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 opacity-0"
          >
            <h3 className="font-display text-lg text-accent">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {block.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
