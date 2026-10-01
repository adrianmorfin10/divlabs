"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type GridBlock = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const [blocks, setBlocks] = useState<GridBlock[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<
    "ideas" | "products" | null
  >(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
  });

  /*
  ============================================================
  DESKTOP DETECTION
  ============================================================
  */

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();

    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  /*
  ============================================================
  CURSOR → DIGITAL GRID
  ============================================================
  */

  useEffect(() => {
    if (!isDesktop) return;

    const element = containerRef.current;

    if (!element) return;

    let blockId = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);

      const distance = Math.sqrt(
        Math.pow(x - lastX, 2) +
          Math.pow(y - lastY, 2)
      );

      if (distance < 35) return;

      lastX = x;
      lastY = y;

      const width =
        35 +
        Math.random() * 90;

      const height =
        25 +
        Math.random() * 65;

      const newBlock: GridBlock = {
        id: blockId++,
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
      };

      setBlocks((current) => [
        ...current.slice(-18),
        newBlock,
      ]);
    };

    element.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      element.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [isDesktop, mouseX, mouseY]);

  /*
  ============================================================
  REMOVE OLD BLOCKS
  ============================================================
  */

  useEffect(() => {
    if (!blocks.length) return;

    const timer = setTimeout(() => {
      setBlocks((current) =>
        current.slice(1)
      );
    }, 1800);

    return () => clearTimeout(timer);
  }, [blocks]);

  return (
    <section
      ref={containerRef}
      className="
        relative
        min-h-[760px]
        overflow-hidden
        bg-[#050505]
        text-[#f2f0e9]
        md:min-h-screen
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Background image */}

        <div
          className="
            absolute
            inset-0
            bg-center
            bg-no-repeat
            opacity-[0.42]
          "
          style={{
            backgroundImage:
              "url('/background.png')",
            backgroundSize:
              "min(100%, 1500px) auto",
          }}
        />

        {/* Dark overlay */}

        <div
          className="
            absolute
            inset-0
            bg-[#050505]/55
          "
        />

        {/* Bottom fade */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[35%]
            bg-gradient-to-t
            from-[#050505]
            via-[#050505]/80
            to-transparent
          "
        />

        {/* Side vignette */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,#050505_90%)]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,.4) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.4) 1px,
                transparent 1px
              )
            `,
            backgroundSize:
              "80px 80px",
          }}
        />

      </div>

      {/* =====================================================
          CURSOR DIGITAL CONSTRUCTION FIELD
      ===================================================== */}

      {isDesktop && (
        <div className="pointer-events-none absolute inset-0 z-10">

          {/* Cursor point */}

          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
            }}
            className="
              absolute
              h-2
              w-2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#dff7ff]
              shadow-[0_0_20px_rgba(180,235,255,.8)]
            "
          />

          {/* Construction blocks */}

          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{
                opacity: 0,
                scale: 0.6,
                rotate: -3,
              }}
              animate={{
                opacity:
                  index === blocks.length - 1
                    ? 0.75
                    : 0,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                absolute
                border
                border-[#dff7ff]/25
                bg-[#dff7ff]/[0.015]
              "
              style={{
                left: block.x,
                top: block.y,
                width: block.width,
                height: block.height,
              }}
            >
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-px
                  w-1/3
                  bg-[#dff7ff]/60
                "
              />

              <div
                className="
                  absolute
                  bottom-0
                  right-0
                  h-1/3
                  w-px
                  bg-[#dff7ff]/40
                "
              />
            </motion.div>
          ))}

          {/* Horizontal cursor line */}

          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
            }}
            className="
              absolute
              left-0
              top-0
              h-px
              w-screen
              -translate-y-1/2
              bg-gradient-to-r
              from-transparent
              via-[#dff7ff]/10
              to-transparent
            "
          />

          {/* Vertical cursor line */}

          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
            }}
            className="
              absolute
              left-0
              top-0
              h-screen
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-[#dff7ff]/10
              to-transparent
            "
          />

        </div>
      )}

      {/* =====================================================
          NAV
      ===================================================== */}

      <header
        className="
          relative
          z-30
          flex
          items-center
          justify-between
          px-5
          py-6
          md:px-10
          md:py-8
        "
      >

        <div
          className="
            text-sm
            font-semibold
            tracking-[-0.04em]
          "
        >
          
          <span className="text-white/25">
            
          </span>
        </div>

        <div
          className="
            hidden
            font-mono
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-white/30
            md:block
          "
        >
          Digital product studio
        </div>

      </header>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-20
          flex
          min-h-[620px]
          flex-col
          justify-between
          px-5
          pb-8
          pt-16
          md:min-h-[calc(100vh-100px)]
          md:px-10
          md:pb-10
          md:pt-24
        "
      >

        {/* TOP */}

        <div>

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              mb-7
              font-mono
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/30
            "
          >
            Independent digital studio
          </motion.div>

          {/* =================================================
              MAIN TITLE
          ================================================= */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              max-w-[1300px]
              text-[clamp(3.6rem,10vw,10rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.075em]
            "
          >

            We turn

            <br />

            {/* =================================================
                IDEAS
            ================================================= */}

            <motion.span
              onMouseEnter={() =>
                setHoveredWord("ideas")
              }
              onMouseLeave={() =>
                setHoveredWord(null)
              }
              animate={{
                color:
                  hoveredWord === "ideas"
                    ? "#f2f0e9"
                    : "rgba(255,255,255,0.25)",

                textShadow:
                  hoveredWord === "ideas"
                    ? "0 0 30px rgba(220,245,255,.18)"
                    : "0 0 0 rgba(0,0,0,0)",

                x:
                  hoveredWord === "ideas"
                    ? 5
                    : 0,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="
                inline-block
                cursor-default
              "
            >
              ideas
            </motion.span>

            {" "}into

            <br />

            digital{" "}

            {/* =================================================
                PRODUCTS
            ================================================= */}

            <motion.span
              onMouseEnter={() =>
                setHoveredWord("products")
              }
              onMouseLeave={() =>
                setHoveredWord(null)
              }
              animate={{
                color:
                  hoveredWord === "products"
                    ? "#f2f0e9"
                    : "rgba(255,255,255,0.25)",

                textShadow:
                  hoveredWord === "products"
                    ? "0 0 30px rgba(220,245,255,.18)"
                    : "0 0 0 rgba(0,0,0,0)",

                x:
                  hoveredWord === "products"
                    ? 5
                    : 0,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="
                inline-block
                cursor-default
              "
            >
              products.
            </motion.span>

          </motion.h1>

        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-8
            md:flex-row
            md:items-end
            md:justify-between
          "
        >

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="
              max-w-md
              text-sm
              leading-7
              text-white/40
              md:text-base
            "
          >
            We design and build websites,
            applications and digital products
            for companies ready to move forward.
          </motion.p>

          {/* =================================================
              CTA
          ================================================= */}

          <motion.a
            href="#contact"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.55,
            }}
            className="
              group
              flex
              h-14
              w-fit
              items-center
              gap-4
              rounded-full
              bg-[#f2f0e9]
              px-6
              text-sm
              font-medium
              !text-black
              transition-all
              duration-500
              hover:gap-7
              hover:bg-white
            "
          >

            <span className="!text-black">
              Start a conversation
            </span>

            <ArrowUpRight
              size={17}
              className="
                !text-black
                transition-transform
                duration-500
                group-hover:rotate-45
              "
            />

          </motion.a>

        </div>

      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.div
        animate={{
          y: [0, 7, 0],
          opacity: [0.25, 0.6, 0.25],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-6
          left-1/2
          z-30
          hidden
          -translate-x-1/2
          items-center
          gap-3
          font-mono
          text-[8px]
          uppercase
          tracking-[0.3em]
          text-white/25
          md:flex
        "
      >
        Scroll

        <span className="h-px w-8 bg-white/20" />
      </motion.div>

    </section>
  );
}