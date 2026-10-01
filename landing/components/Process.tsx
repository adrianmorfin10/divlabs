"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your business, your audience and the problem worth solving.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "We turn the idea into a clear strategy, structure and actionable plan.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We shape the experience, interface and visual language around your goals.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "We develop, test and refine the product until everything feels right.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "We take the product from development to a real-world launch.",
  },
  {
    number: "06",
    title: "Evolve",
    description:
      "We measure, learn and continuously improve what we have built.",
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    const element = root.current;

    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      const y =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setActiveStep(null);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={root}
      id="process"
      className="
        relative
        overflow-hidden
        bg-div-cream
        py-28
        text-black
        md:py-40
      "
    >
      {/* =====================================================
          CURSOR FIELD
      ====================================================== */}

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[280px]
          w-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-black/[0.035]
          blur-3xl
        "
      />

      {/* =====================================================
          SUBTLE GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0,0,0,.35) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto w-[calc(100%-40px)] max-w-[1400px] md:w-[calc(100%-80px)]">
        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/40">
            04 / Process
          </div>

          <h2
            className="
              mt-7
              max-w-5xl
              text-[clamp(4rem,8vw,9rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.08em]
            "
          >
            <CursorText
              text="From idea"
              active={activeStep !== null}
            />

            <br />

            <span className="text-black/25">
              <CursorText
                text="to reality."
                active={activeStep !== null}
                muted
              />
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-sm leading-7 text-black/45 md:text-base">
            A clear process keeps the work focused, transparent
            and moving forward — from the first conversation to
            the final product.
          </p>
        </motion.div>

        {/* =====================================================
            PROCESS GRID
        ====================================================== */}

        <div className="mt-20 grid border-l border-t border-black/15 md:mt-28 md:grid-cols-3">
          {steps.map((step, index) => (
            <ProcessCard
              key={step.number}
              step={step}
              index={index}
              active={activeStep === index}
              setActive={() => setActiveStep(index)}
              clearActive={() => setActiveStep(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CURSOR TEXT
========================================================= */

function CursorText({
  text,
  active,
  muted = false,
}: {
  text: string;
  active: boolean;
  muted?: boolean;
}) {
  return (
    <motion.span
      animate={{
        color: active
          ? muted
            ? "rgba(0,0,0,0.55)"
            : "rgba(0,0,0,1)"
          : muted
            ? "rgba(0,0,0,0.25)"
            : "rgba(0,0,0,1)",
      }}
      transition={{
        duration: 0.35,
      }}
    >
      {text}
    </motion.span>
  );
}

/* =========================================================
   PROCESS CARD
========================================================= */

function ProcessCard({
  step,
  index,
  active,
  setActive,
  clearActive,
}: {
  step: (typeof steps)[number];
  index: number;
  active: boolean;
  setActive: () => void;
  clearActive: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={setActive}
      onMouseLeave={clearActive}
      className="
        group
        relative
        min-h-[250px]
        overflow-hidden
        border-b
        border-r
        border-black/15
        p-7
        transition-colors
        duration-500
        md:min-h-[280px]
      "
    >
      {/* =====================================================
          HOVER BACKGROUND
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.8,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[220px]
          w-[220px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.06]
          blur-3xl
        "
      />

      {/* =====================================================
          NUMBER
      ====================================================== */}

      <motion.span
        animate={{
          opacity: active ? 1 : 0.4,
          x: active ? 4 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="relative z-10 font-mono text-[9px]"
      >
        {step.number}
      </motion.span>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mt-20">
        <motion.h3
          animate={{
            x: active ? 6 : 0,
            color: active
              ? "#000000"
              : "rgba(0,0,0,1)",
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            text-3xl
            font-medium
            tracking-[-0.05em]
            md:text-4xl
          "
        >
          {step.title}
        </motion.h3>

        <motion.p
          animate={{
            x: active ? 6 : 0,
            color: active
              ? "rgba(0,0,0,0.55)"
              : "rgba(0,0,0,0.5)",
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            mt-3
            max-w-xs
            text-sm
            leading-6
          "
        >
          {step.description}
        </motion.p>
      </div>

      {/* =====================================================
          ACTIVE LINE
      ====================================================== */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: active ? 1 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-full
          origin-left
          bg-black
        "
      />

      {/* =====================================================
          ARROW
      ====================================================== */}

      <motion.div
        animate={{
          opacity: active ? 1 : 0.25,
          x: active ? 0 : -5,
          y: active ? 0 : 5,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          absolute
          right-7
          top-7
          font-mono
          text-[9px]
        "
      >
        ↗
      </motion.div>
    </motion.div>
  );
}