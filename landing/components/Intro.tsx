"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  const [activeWord, setActiveWord] = useState<string | null>(null);

  /*
   * =========================================================
   * CURSOR FIELD
   * =========================================================
   */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 25,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 25,
    mass: 0.6,
  });

  const fieldX = useTransform(smoothX, [-1, 1], [-25, 25]);
  const fieldY = useTransform(smoothY, [-1, 1], [-18, 18]);

  /*
   * =========================================================
   * GSAP
   * =========================================================
   */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /*
       * TITLE
       */

      gsap.from(".intro-title", {
        y: 70,
        opacity: 0,

        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          end: "top 45%",
          scrub: 1,
        },
      });

      /*
       * COPY
       */

      gsap.from(".intro-copy", {
        y: 35,
        opacity: 0,

        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
      });

      /*
       * PROCESS BLOCKS
       */

      gsap.from(".intro-block", {
        y: 25,
        opacity: 0,
        stagger: 0.08,

        scrollTrigger: {
          trigger: root.current,
          start: "top 65%",
          end: "top 40%",
          scrub: 1,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /*
   * =========================================================
   * CURSOR
   * =========================================================
   */

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

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
    setActiveWord(null);
  };

  /*
   * =========================================================
   * KEYWORD
   * =========================================================
   */

  const Keyword = ({
    children,
    id,
  }: {
    children: React.ReactNode;
    id: string;
  }) => {
    const active = activeWord === id;

    return (
      <span
        onMouseEnter={() => setActiveWord(id)}
        onMouseLeave={() => setActiveWord(null)}
        className={`
          relative
          inline-block
          cursor-default
          transition-all
          duration-500
          ${
            active
              ? "text-black"
              : "text-black/25"
          }
        `}
      >
        {children}

        {/* UNDERLINE */}

        <span
          className={`
            absolute
            bottom-[3%]
            left-0
            h-[2px]
            bg-black
            transition-all
            duration-500
            ${
              active
                ? "w-full opacity-100"
                : "w-0 opacity-0"
            }
          `}
        />

        {/* SPOTLIGHT */}

        <span
          className={`
            pointer-events-none
            absolute
            inset-0
            -z-10
            rounded-lg
            bg-black/[0.04]
            blur-xl
            transition-all
            duration-500
            ${
              active
                ? "scale-110 opacity-100"
                : "scale-90 opacity-0"
            }
          `}
        />
      </span>
    );
  };

  return (
    <section
      ref={root}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        overflow-hidden
        bg-div-cream
        py-24
        text-black
        md:py-32
      "
    >
      {/* =====================================================
          BACKGROUND FIELD
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{
            x: fieldX,
            y: fieldY,
          }}
          className="
            absolute
            left-[68%]
            top-[18%]
            h-[260px]
            w-[260px]
            rounded-full
            border
            border-black/[0.035]
          "
        />

        <motion.div
          style={{
            x: fieldX,
            y: fieldY,
          }}
          className="
            absolute
            left-[71%]
            top-[22%]
            h-[180px]
            w-[180px]
            rounded-full
            border
            border-black/[0.04]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-[calc(100%-40px)]
          max-w-[1400px]
          md:w-[calc(100%-80px)]
        "
      >
        {/* ===================================================
            MAIN
        =================================================== */}

        <div
          className="
            grid
            gap-10
            md:grid-cols-[0.3fr_1fr]
            md:gap-12
          "
        >
          {/* LABEL */}

          <div>
            <div
              className="
                font-mono
                text-[9px]
                tracking-[0.15em]
                text-black/40
              "
            >
              01 / WHAT WE DO
            </div>

            <div className="mt-6 hidden md:block">
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/30">
                DIGITAL STUDIO
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />

                <span className="font-mono text-[8px] text-black/40">
                  DESIGN / BUILD / EVOLVE
                </span>
              </div>
            </div>
          </div>

          {/* TEXT */}

          <div>
            <h2
              className="
                intro-title
                max-w-5xl
                text-[clamp(3.4rem,6.5vw,7rem)]
                font-semibold
                leading-[0.86]
                tracking-[-0.075em]
              "
            >
              Technology can be{" "}

              <Keyword id="complex">
                complex.
              </Keyword>

              <br />

              <span className="text-black/25">
                We make it feel
              </span>{" "}

              <Keyword id="simple">
                simple.
              </Keyword>
            </h2>

            <p
              className="
                intro-copy
                mt-10
                max-w-2xl
                text-base
                leading-7
                text-black/50
                md:text-lg
                md:leading-8
              "
            >
              Div Labs combines strategy, design and
              technology to turn{" "}

              <Keyword id="ideas">
                ideas
              </Keyword>

              , processes and problems into real
              digital products.
            </p>
          </div>
        </div>

        {/* ===================================================
            PROCESS
        =================================================== */}

        <div className="mt-20 md:mt-24">
          <div className="grid md:grid-cols-4">
            {/* 01 */}

            <div
              className="
                intro-block
                min-h-[180px]
                border-b
                border-black/10
                p-5
                md:border-b-0
                md:border-r
                md:p-6
              "
            >
              <span className="font-mono text-[8px] text-black/35">
                01
              </span>

              <h3 className="mt-8 text-lg font-medium tracking-[-0.04em]">
                Strategy
              </h3>

              <p className="mt-2 max-w-[220px] text-xs leading-5 text-black/40">
                Understand the business and the real problem.
              </p>
            </div>

            {/* 02 */}

            <div
              className="
                intro-block
                min-h-[180px]
                border-b
                border-black/10
                p-5
                md:border-b-0
                md:border-r
                md:p-6
              "
            >
              <span className="font-mono text-[8px] text-black/35">
                02
              </span>

              <h3 className="mt-8 text-lg font-medium tracking-[-0.04em]">
                Design
              </h3>

              <p className="mt-2 max-w-[220px] text-xs leading-5 text-black/40">
                Turn complexity into simple experiences.
              </p>
            </div>

            {/* 03 */}

            <div
              className="
                intro-block
                min-h-[180px]
                border-b
                border-black/10
                p-5
                md:border-b-0
                md:border-r
                md:p-6
              "
            >
              <span className="font-mono text-[8px] text-black/35">
                03
              </span>

              <h3 className="mt-8 text-lg font-medium tracking-[-0.04em]">
                Technology
              </h3>

              <p className="mt-2 max-w-[220px] text-xs leading-5 text-black/40">
                Build fast, scalable digital products.
              </p>
            </div>

            {/* 04 */}

            <div
              className="
                intro-block
                min-h-[180px]
                p-5
                md:p-6
              "
            >
              <span className="font-mono text-[8px] text-black/35">
                04
              </span>

              <h3 className="mt-8 text-lg font-medium tracking-[-0.04em]">
                Product
              </h3>

              <p className="mt-2 max-w-[220px] text-xs leading-5 text-black/40">
                Launch, learn and keep evolving.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <div
          className="
            mt-8
            flex
            items-center
            justify-between
          "
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/30">
            Strategy / Design / Technology
          </span>

          <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-black/30 md:block">
            From idea → product
          </span>
        </div>
      </div>
    </section>
  );
}