"use client";

import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const services = [
  {
    number: "01",
    title: "Website",
    description:
      "A professional digital presence for your business.",
  },
  {
    number: "02",
    title: "E-commerce",
    description:
      "Sell products or services directly online.",
  },
  {
    number: "03",
    title: "Web App",
    description:
      "Automate processes and build tools for your business.",
  },
  {
    number: "04",
    title: "Mobile App",
    description:
      "Bring your product to iOS, Android or both.",
  },
  {
    number: "05",
    title: "UX / UI",
    description:
      "Make your product clearer, faster and easier to use.",
  },
  {
    number: "06",
    title: "MVP",
    description:
      "Turn an idea into a real, testable product.",
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  const [activeWord, setActiveWord] = useState<string | null>(null);

  /*
  ============================================================
  SCROLL ANIMATION
  ============================================================
  */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        stagger: 0.08,

        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "top 25%",
          scrub: 1,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /*
  ============================================================
  KEYWORD COMPONENT
  ============================================================
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
          whitespace-nowrap
          will-change-[color]
          transition-all
          duration-500
          ease-out
          ${
            active
              ? "text-white"
              : "text-white/25"
          }
        `}
      >
        {children}

        {/* UNDERLINE */}

        <span
          className={`
            pointer-events-none
            absolute
            bottom-[2%]
            left-0
            h-[2px]
            bg-white
            transition-all
            duration-500
            ease-out
            ${
              active
                ? "w-full opacity-100"
                : "w-0 opacity-0"
            }
          `}
        />

        {/* SOFT GLOW */}

        <span
          className={`
            pointer-events-none
            absolute
            inset-0
            -z-10
            rounded-lg
            bg-white/[0.06]
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

  /*
  ============================================================
  RENDER
  ============================================================
  */

  return (
    <section
      ref={root}
      id="services"
      className="
        bg-div-black
        py-32
        md:py-48
      "
    >
      <div
        className="
          mx-auto
          w-[calc(100%-40px)]
          max-w-[1400px]
          md:w-[calc(100%-80px)]
        "
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-20">

          <div
            className="
              font-mono
              text-[9px]
              tracking-[0.15em]
              text-white/30
            "
          >
            02 / START HERE
          </div>

          {/*
          ----------------------------------------------------
          TITLE

          IMPORTANT:
          "trying" and "to build?" are each wrapped inside
          their own inline-block + whitespace-nowrap.

          This prevents the browser from compressing or
          wrapping the letters into each other.
          ----------------------------------------------------
          */}

          <h2
            className="
              mt-8
              max-w-5xl
              text-[clamp(3.5rem,7.5vw,8rem)]
              font-semibold
              leading-[0.9]
              tracking-[-0.055em]
            "
          >
            What are you{" "}

            <span
              className="
                inline-block
                whitespace-nowrap
              "
            >
              <Keyword id="trying">
                trying
              </Keyword>
            </span>

            {" "}

            <span
              className="
                inline-block
                whitespace-nowrap
              "
            >
              <Keyword id="build">
                to build?
              </Keyword>
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-8
              max-w-xl
              text-sm
              leading-6
              text-white/40
              md:text-base
            "
          >
            You don't need to know anything about
            technology. Just tell us what you're
            trying to achieve.
          </p>

        </div>

        {/* ==================================================
            SERVICES GRID
        ================================================== */}

        <div
          className="
            grid
            border-l
            border-t
            border-white/10
            md:grid-cols-3
          "
        >

          {services.map((service) => (
            <a
              key={service.number}
              href="#contact"
              data-cursor
              className="
                service-card
                group
                min-h-[300px]
                border-b
                border-r
                border-white/10
                p-7
                text-white
                transition-all
                duration-500
                hover:bg-div-cream
                hover:text-black
              "
            >

              {/* ==================================================
                  CARD HEADER
              ================================================== */}

              <div
                className="
                  flex
                  justify-between
                  font-mono
                  text-[9px]
                  text-white/30
                  transition-colors
                  duration-500
                  group-hover:text-black/40
                "
              >

                <span>
                  {service.number}
                </span>

                <ArrowUpRight
                  size={15}
                  className="
                    transition-all
                    duration-300
                    group-hover:rotate-45
                    group-hover:text-black
                  "
                />

              </div>

              {/* ==================================================
                  CARD CONTENT
              ================================================== */}

              <div className="mt-28">

                {/* TITLE */}

                <h3
                  className="
                    text-3xl
                    font-medium
                    tracking-[-0.05em]
                    text-white
                    transition-colors
                    duration-500
                    group-hover:text-black
                  "
                >
                  {service.title}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-4
                    max-w-xs
                    text-sm
                    leading-6
                    text-white/40
                    transition-colors
                    duration-500
                    group-hover:text-black/55
                  "
                >
                  {service.description}
                </p>

              </div>

            </a>
          ))}

        </div>

      </div>
    </section>
  );
}