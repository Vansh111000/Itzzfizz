"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stats from "./Stats";
import carImage from "@/public/images/McLaren 720S 2022 top view.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADLINE_WORDS = ["WELCOME", "ITZ", "FIZZ"];

export default function Hero() {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const blackOverlayRef = useRef(null);
  const headlineWordRefs = useRef([]);
  const statsItemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineWordRefs.current.filter(Boolean);
      const stats = statsItemsRef.current.filter(Boolean);
      const car = carRef.current;

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.set(words, { opacity: 1 });
      intro.set(stats, { opacity: 0, x: -100 });
      intro.set(car, { opacity: 1 });
      intro.set(blackOverlayRef.current, { width: "100%", x: 0 });

      const mm = gsap.matchMedia();

      intro.eventCallback("onComplete", () => {
        mm.add(
          {
            isDesktop: "(min-width: 1024px)",
            isTablet: "(min-width: 640px) and (max-width: 1023px)",
            isMobile: "(max-width: 639px)",
            reduced: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            const { reduced } = context.conditions;

            if (reduced) {
              gsap.set([words, stats, car], { opacity: 1, x: 0 });
              return;
            }

            const scrollTl = gsap.timeline({
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
              defaults: { ease: "none" },
            });

            // Car slides all the way to the right edge
            scrollTl.to(car, {
              opacity: 1,
              x: 1000,
              duration: 3,
            }, 0);

            // Black overlay extends to right edge and shrinks - reveals text
            scrollTl.to(blackOverlayRef.current, {
              width: "0%",
              x: 1280,
              duration: 3,
            }, 0);

            // Text appears as black shrinks
            scrollTl.to(words, {
              opacity: 1,
              stagger: 0.08,
              duration: 2.8,
            }, 0.1);

            // Stats appear alongside the animation
            scrollTl.to(
              stats,
              { opacity: 1, x: 0, duration: 2.5, stagger: 0.1 },
              0.3
            );

            return () => scrollTl.scrollTrigger?.kill();
          }
        );
      });

      return () => mm.revert();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[500vh] w-full">
      <section
        ref={sectionRef}
        aria-label="Itz Fizz introduction"
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 to-neutral-50 -z-20" />

        {/* Main horizontal bar - Black shrinks as car slides, revealing text */}
        <div className="relative w-full h-32 flex items-center bg-emerald-400 overflow-hidden">
          {/* Text layer - visible under the green, hidden under black */}
          <div className="absolute left-0 h-full w-full flex items-center px-8 z-0">
            <h1 className="pointer-events-none flex items-center gap-4 font-display text-6xl font-black tracking-tight text-yellow-300 will-change-transform whitespace-nowrap">
              {HEADLINE_WORDS.map((word, index) => (
                <span
                  key={word}
                  ref={(el) => {
                    headlineWordRefs.current[index] = el;
                  }}
                  className="inline-block opacity-100"
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>

          {/* Black overlay - shrinks as car moves right, covers text */}
          <div
            ref={blackOverlayRef}
            className="absolute top-0 h-full bg-black will-change-transform z-10"
            style={{
              left: 0,
              width: "100%",
            }}
          />

          {/* Car layer - starts from left, slides right, on top of black */}
          <div
            ref={carRef}
            className="absolute w-48 h-32 opacity-100 will-change-transform z-20"
            style={{ transform: "translateX(-100px)", left: 0 }}
          >
            <Image
              src={carImage}
              alt="McLaren 720S"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Stats positioned below */}
        <div className="relative mt-8 flex justify-center gap-4 px-6 flex-wrap">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              ref={(el) => {
                if (statsItemsRef.current) statsItemsRef.current[i] = el;
              }}
              className={`px-6 py-4 rounded-lg font-bold text-lg opacity-0 will-change-transform ${
                i % 2 === 0
                  ? "bg-lime-300 text-black"
                  : i === 1
                  ? "bg-gray-800 text-white"
                  : "bg-orange-400 text-black"
              }`}
            >
              <div className="text-2xl">
                {["58%", "27%", "23%", "40%"][i]}
              </div>
              <div className="text-xs">Increase in usage</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
