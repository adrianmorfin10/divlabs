"use client";

import {
  ArrowUpRight,
  Plus,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const visualRef = useRef<HTMLDivElement>(null);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  /* =========================================
     INTRO
  ========================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  /* =========================================
     MOUSE PARALLAX
  ========================================= */

  useEffect(() => {
    const element = visualRef.current;

    if (!element) return;

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      setMouse({
        x,
        y,
      });
    };

    const handleLeave = () => {
      setMouse({
        x: 0,
        y: 0,
      });

      setHovered(false);
    };

    element.addEventListener(
      "mousemove",
      handleMove
    );

    element.addEventListener(
      "mouseenter",
      () => setHovered(true)
    );

    element.addEventListener(
      "mouseleave",
      handleLeave
    );

    return () => {
      element.removeEventListener(
        "mousemove",
        handleMove
      );

      element.removeEventListener(
        "mouseleave",
        handleLeave
      );
    };
  }, []);

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-div-black
        py-28
        md:py-40
      "
    >

      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.015]
          blur-[100px]
        "
      />

      {/* =====================================
          CONTAINER
      ===================================== */}

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

        {/* TOP LINE */}

        <div className="h-px w-full bg-white/10" />

        {/* ===================================
            CONTENT
        =================================== */}

        <div
          className="
            grid
            min-h-[600px]
            items-center
            lg:grid-cols-2
            lg:gap-10
          "
        >

          {/* =================================
              LEFT
          ================================= */}

          <div
            className={`
              relative
              z-20
              max-w-4xl
              py-20
              transition-all
              duration-[1200ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]
              ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }
            `}
          >

            {/* LABEL */}

            <div className="flex items-center gap-3">

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-div-cream
                  shadow-[0_0_12px_rgba(255,255,255,.4)]
                "
              />

              <span
                className="
                  font-mono
                  text-[9px]
                  tracking-[0.15em]
                  text-white/30
                "
              >
                07 / START A PROJECT
              </span>

            </div>

            {/* TITLE */}

            <h2
              className="
                mt-8
                max-w-5xl
                text-[clamp(4rem,8vw,9rem)]
                font-semibold
                leading-[0.84]
                tracking-[-0.085em]
              "
            >
              Have an idea?

              <br />

              <span className="text-white/25">
                Let's make it real.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-10
                max-w-xl
                text-base
                leading-7
                text-white/40
                md:text-lg
              "
            >
              You don't need to know anything about
              technology. Tell us what you're trying
              to achieve and we'll help turn your idea
              into a digital product.
            </p>

            {/* ACTIONS */}

            <div
              className="
                mt-10
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              {/* PRIMARY */}

              <a
                href="mailto:adrianmorfin1995@gmail.com"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-div-cream
                  px-7
                  py-4
                  text-sm
                  font-medium
                  text-black
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white
                "
              >

                <span className="text-black">
                  Start a conversation
                </span>

                <ArrowUpRight
                  size={17}
                  className="
                    text-black
                    transition-transform
                    duration-300
                    group-hover:rotate-45
                  "
                />

              </a>

              {/* SECONDARY */}

              <a
                href="#calculator"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-white/15
                  px-7
                  py-4
                  text-sm
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-white/40
                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >

                Estimate your project

                <ArrowUpRight
                  size={15}
                  className="
                    opacity-50
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />

              </a>

            </div>

          </div>

          {/* =================================
              DIGITAL SYSTEM
          ================================= */}

          <div
            ref={visualRef}
            className={`
              relative
              mx-auto
              hidden
              h-[460px]
              w-full
              max-w-[620px]
              items-center
              justify-center
              transition-all
              duration-[1400ms]
              lg:flex
              ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }
            `}
          >

            {/* =================================
                PARALLAX FIELD
            ================================= */}

            <div
              className="
                absolute
                inset-0
                transition-transform
                duration-700
                ease-out
              "
              style={{
                transform: `
                  translate3d(
                    ${mouse.x * 12}px,
                    ${mouse.y * 12}px,
                    0
                  )
                `,
              }}
            >

              {/* OUTER ORBIT */}

              <div
                className={`
                  absolute
                  left-1/2
                  top-1/2
                  h-[360px]
                  w-[360px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-white/[0.08]
                  transition-all
                  duration-700
                  ${
                    hovered
                      ? "scale-[1.05] border-white/[0.16]"
                      : ""
                  }
                `}
              />

              {/* INNER ORBIT */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[250px]
                  w-[250px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-white/[0.08]
                "
              />

              {/* CROSSHAIR */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[390px]
                  w-px
                  -translate-x-1/2
                  -translate-y-1/2
                  bg-white/[0.035]
                "
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-px
                  w-[390px]
                  -translate-x-1/2
                  -translate-y-1/2
                  bg-white/[0.035]
                "
              />

              {/* =================================
                  CENTRAL CORE
              ================================= */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[130px]
                  w-[130px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-white/15
                  bg-[#080808]
                  shadow-[0_0_80px_rgba(255,255,255,.035)]
                "
              >

                {/* ROTATING BORDER */}

                <div
                  className="
                    absolute
                    inset-[-8px]
                    animate-[spin_18s_linear_infinite]
                    rounded-full
                    border
                    border-dashed
                    border-white/10
                  "
                />

                {/* CENTER */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-3
                    w-3
                    -translate-x-1/2
                    -translate-y-1/2
                    animate-pulse
                    rounded-full
                    bg-div-cream
                    shadow-[0_0_30px_rgba(255,255,255,.55)]
                  "
                />

              </div>

              {/* =================================
                  CARD 01
              ================================= */}

              <div
                className="
                  absolute
                  left-[5%]
                  top-[15%]
                  w-[165px]
                  rounded-xl
                  border
                  border-white/10
                  bg-[#0a0a0a]
                  p-4
                  shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-white/25
                "
              >

                <div className="flex items-center justify-between">

                  <span
                    className="
                      font-mono
                      text-[7px]
                      tracking-[0.15em]
                      text-white/30
                    "
                  >
                    PRODUCT
                  </span>

                  <Plus
                    size={11}
                    className="text-white/30"
                  />

                </div>

                <div className="mt-4 text-xl font-medium">
                  01
                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">

                  <div
                    className="
                      h-full
                      w-[72%]
                      bg-div-cream
                    "
                  />

                </div>

              </div>

              {/* =================================
                  CARD 02
              ================================= */}

              <div
                className="
                  absolute
                  right-[4%]
                  top-[19%]
                  w-[175px]
                  rounded-xl
                  border
                  border-white/10
                  bg-[#0a0a0a]
                  p-4
                  shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-white/25
                "
              >

                <div
                  className="
                    font-mono
                    text-[7px]
                    tracking-[0.15em]
                    text-white/30
                  "
                >
                  EXPERIENCE
                </div>

                <div className="mt-4 flex h-12 items-end gap-1">

                  <div className="h-[30%] flex-1 bg-white/10" />

                  <div className="h-[45%] flex-1 bg-white/20" />

                  <div className="h-[65%] flex-1 bg-white/30" />

                  <div className="h-[50%] flex-1 bg-white/20" />

                  <div className="h-[85%] flex-1 bg-div-cream" />

                </div>

              </div>

              {/* =================================
                  CARD 03
              ================================= */}

              <div
                className="
                  absolute
                  bottom-[13%]
                  left-[4%]
                  w-[185px]
                  rounded-xl
                  border
                  border-white/10
                  bg-[#0a0a0a]
                  p-4
                  shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-white/25
                "
              >

                <div className="flex items-center justify-between">

                  <span
                    className="
                      font-mono
                      text-[7px]
                      tracking-[0.15em]
                      text-white/30
                    "
                  >
                    DEVELOPMENT
                  </span>

                  <span
                    className="
                      h-1.5
                      w-1.5
                      animate-pulse
                      rounded-full
                      bg-div-cream
                    "
                  />

                </div>

                <div className="mt-4 flex gap-2">

                  <div
                    className="
                      h-8
                      flex-1
                      rounded
                      border
                      border-white/10
                    "
                  />

                  <div
                    className="
                      h-8
                      w-8
                      rounded
                      border
                      border-white/10
                    "
                  />

                </div>

                <div className="mt-2 h-1.5 w-[70%] rounded bg-white/[0.05]" />

              </div>

              {/* =================================
                  CARD 04
              ================================= */}

              <div
                className="
                  absolute
                  bottom-[9%]
                  right-[3%]
                  w-[170px]
                  rounded-xl
                  border
                  border-white/10
                  bg-[#0a0a0a]
                  p-4
                  shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-white/25
                "
              >

                <div
                  className="
                    font-mono
                    text-[7px]
                    tracking-[0.15em]
                    text-white/30
                  "
                >
                  SYSTEM STATUS
                </div>

                <div className="mt-4 flex items-center gap-2">

                  <span
                    className="
                      h-2
                      w-2
                      animate-pulse
                      rounded-full
                      bg-div-cream
                    "
                  />

                  <span className="text-xs text-white/60">
                    Building
                  </span>

                </div>

                <div className="mt-4 flex gap-1">

                  <div className="h-1 flex-1 rounded-full bg-white/30" />

                  <div className="h-1 flex-1 rounded-full bg-white/20" />

                  <div className="h-1 flex-1 rounded-full bg-white/10" />

                  <div className="h-1 flex-1 rounded-full bg-white/5" />

                </div>

              </div>

            </div>

            {/* =================================
                LABELS
            ================================= */}

            <div
              className="
                absolute
                left-1/2
                top-[4%]
                -translate-x-1/2
                font-mono
                text-[8px]
                tracking-[0.2em]
                text-white/20
              "
            >
              UX / UI
            </div>

            <div
              className="
                absolute
                bottom-[3%]
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                font-mono
                text-[8px]
                tracking-[0.2em]
                text-white/20
              "
            >
              DESIGN / BUILD / EVOLVE
            </div>

          </div>

        </div>

        {/* =====================================
            BOTTOM
        ===================================== */}

        <div className="h-px w-full bg-white/10" />

        <div
          className="
            flex
            flex-col
            gap-3
            py-6
            font-mono
            text-[9px]
            uppercase
            tracking-[0.15em]
            text-white/20
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <span>
            DIV LABS
          </span>

          <span>
            Digital products, designed to move business forward.
          </span>

        </div>

      </div>

    </section>
  );
}