"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const reasons = [
  {
    title: "Business first",
    description:
      "We start with the problem, not the technology.",
  },
  {
    title: "Design + Development",
    description:
      "Design and development work together as one team.",
  },
  {
    title: "Simple by default",
    description:
      "Technology can be complex. The product should not be.",
  },
  {
    title: "Built to evolve",
    description:
      "We build with what comes next already in mind.",
  },
];

export default function WhyUs() {
  const root = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 25,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 25,
    mass: 0.5,
  });

  const [hoveringOwnership, setHoveringOwnership] =
    useState(false);

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
      setHoveringOwnership(false);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      element.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={root}
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#090909]
        py-28
        text-white
        md:py-40
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/background2.png')",
        }}
      />

      {/* =====================================================
          DARK OVERLAY
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#050505]/75
        "
      />

      {/* =====================================================
          GRADIENT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_35%_45%,rgba(255,255,255,0.07),transparent_35%)]
        "
      />

      {/* =====================================================
          CURSOR LIGHT
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
          h-[320px]
          w-[320px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.035]
          blur-3xl
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto grid w-[calc(100%-40px)] max-w-[1400px] gap-16 md:w-[calc(100%-80px)] md:grid-cols-2 md:gap-24">
        {/* =================================================
            LEFT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
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
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
            05 / Why Div Labs
          </div>

          <h2
            className="
              mt-8
              max-w-4xl
              text-[clamp(4rem,8vw,9rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.08em]
            "
          >
            Small team.

            <br />

            <span
              onMouseEnter={() =>
                setHoveringOwnership(true)
              }
              onMouseLeave={() =>
                setHoveringOwnership(false)
              }
              className="relative inline-block cursor-default"
            >
              {/* Glow behind text */}

              <motion.span
                animate={{
                  opacity: hoveringOwnership ? 1 : 0,
                  scale: hoveringOwnership ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  pointer-events-none
                  absolute
                  inset-[-20px]
                  rounded-full
                  bg-white/[0.08]
                  blur-2xl
                "
              />

              {/* Text */}

              <motion.span
                animate={{
                  color: hoveringOwnership
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.25)",
                }}
                transition={{
                  duration: 0.35,
                }}
                className="relative"
              >
                Big ownership.
              </motion.span>
            </span>
          </h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
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
              duration: 0.7,
              delay: 0.15,
            }}
            className="
              mt-10
              max-w-md
              text-sm
              leading-7
              text-white/40
              md:text-base
            "
          >
            We stay close to the work, the decisions and the
            people building the product.
          </motion.p>
        </motion.div>

        {/* =================================================
            RIGHT / REASONS
        ================================================= */}

        <div className="border-t border-white/10">
          {reasons.map((reason, index) => (
            <Reason
              key={reason.title}
              reason={reason}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   REASON
========================================================= */

function Reason({
  reason,
  index,
}: {
  reason: (typeof reasons)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 60,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        border-b
        border-white/10
        py-7
        md:py-8
      "
    >
      {/* Cursor glow */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        whileHover={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
          pointer-events-none
          absolute
          right-10
          top-1/2
          h-28
          w-28
          -translate-y-1/2
          rounded-full
          bg-white/[0.035]
          blur-2xl
        "
      />

      <div className="relative z-10 flex gap-5">
        <motion.span
          whileHover={{
            color: "rgba(255,255,255,0.8)",
          }}
          className="
            shrink-0
            font-mono
            text-[9px]
            text-white/20
            transition-colors
          "
        >
          0{index + 1}
        </motion.span>

        <div>
          <motion.h3
            whileHover={{
              x: 5,
              color: "rgba(255,255,255,1)",
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              text-lg
              font-medium
              tracking-[-0.03em]
              text-white/85
            "
          >
            {reason.title}
          </motion.h3>

          <motion.p
            whileHover={{
              x: 5,
              color: "rgba(255,255,255,0.6)",
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-white/35
            "
          >
            {reason.description}
          </motion.p>
        </div>
      </div>

      {/* Active line */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileHover={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-full
          origin-left
          bg-white/50
        "
      />
    </motion.div>
  );
}