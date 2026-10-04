"use client";

const STATS = [
  { value: "85%", label: "Customer Satisfaction" },
  { value: "92%", label: "Product Engagement" },
  { value: "78%", label: "Repeat Usage" },
];

/**
 * Renders the impact-metrics row. Each item registers itself in `itemsRef`
 * (an array ref owned by the parent) so the orchestrating Hero component can
 * include them in its GSAP intro / scroll timelines without re-querying the
 * DOM on every render.
 */
export default function Stats({ itemsRef }) {
  return (
    <dl className="flex flex-wrap items-start justify-center gap-x-10 gap-y-6 sm:gap-x-14">
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          ref={(el) => {
            if (itemsRef?.current) itemsRef.current[index] = el;
          }}
          className="flex min-w-[7.5rem] flex-col items-center text-center opacity-0"
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-display text-3xl tabular-nums text-accent sm:text-4xl">
            {stat.value}
          </dd>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400 sm:text-sm">
            {stat.label}
          </p>
        </div>
      ))}
    </dl>
  );
}
