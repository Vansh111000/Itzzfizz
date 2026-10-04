"use client";

import Image from "next/image";
import heroCan from "@/public/images/hero-can.jpg";

/**
 * The primary hero object. It renders as a plain <Image> wrapped in a ref'd
 * container — all motion is applied by the parent Hero component via GSAP
 * transforms (x/y/scale/rotation), never via layout properties, so this
 * component itself stays purely presentational.
 */
export default function ScrollVisual({ visualRef }) {
  return (
    <div
      ref={visualRef}
      className="pointer-events-none relative mx-auto aspect-square w-[min(40vw,40vh,18rem)] opacity-0 will-change-transform sm:w-[min(30vw,45vh,22rem)]"
    >
      <Image
        src={heroCan}
        alt="Studio product shot of a blank aluminum beverage can, the hero section's main visual object"
        fill
        priority
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 18rem, 14rem"
        className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
        style={{
          // Fades the product photo's plain studio background to
          // transparent so it blends into the dark hero instead of showing
          // a hard white rectangle.
          maskImage: "radial-gradient(closest-side, black 38%, transparent 62%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, black 38%, transparent 62%)",
        }}
      />
    </div>
  );
}
