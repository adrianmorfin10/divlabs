"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  Bell,
  Search,
  Home,
  Activity,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Smartphone,
  Layers3,
  Database,
  Globe2,
  WalletCards,
  CircleUserRound,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
};

/* =========================================================
   PROJECT DATA
========================================================= */

const projects: Project[] = [
  {
    number: "01",
    category: "Business Platform",
    title: "Business intelligence",
    description:
      "From the first sketch to a complete operational platform.",
  },
  {
    number: "02",
    category: "Digital Experience",
    title: "Digital experience",
    description:
      "Digital experiences designed around clarity, interaction and purpose.",
  },
  {
    number: "03",
    category: "Mobile Product",
    title: "Mobile product",
    description:
      "A mobile experience designed from the first interaction to the final product.",
  },
];

/* =========================================================
   VISIBILITY HOOK
========================================================= */

function useProjectVisibility() {
  const ref = useRef<HTMLDivElement | null>(null);

  /*
   * Esto es MUY importante.
   *
   * wasVisible evita que IntersectionObserver
   * dispare varias veces mientras el elemento
   * sigue dentro del viewport.
   */
  const wasVisible = useRef(false);

  const [visible, setVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          /*
           * Solamente iniciamos la animación
           * si realmente acabamos de entrar.
           */
          if (!wasVisible.current) {
            wasVisible.current = true;

            setVisible(true);

            setAnimationKey((current) => current + 1);
          }
        } else {
          /*
           * Salimos del viewport.
           *
           * No cambiamos el key todavía.
           * Simplemente preparamos el componente
           * para que pueda volver a iniciar
           * cuando entre nuevamente.
           */
          wasVisible.current = false;

          setVisible(false);
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    ref,
    visible,
    animationKey,
  };
}

/* =========================================================
   PROJECTS
========================================================= */

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-[#050505] text-[#f1efe8]"
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mx-auto max-w-[1400px] px-6 pb-28 pt-40 md:px-10 md:pb-40 md:pt-56">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
          Selected work / 03
        </div>

        <h2 className="mt-7 max-w-[950px] text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.82] tracking-[-0.08em]">
          Things
          <br />
          we build.
        </h2>

        <p className="mt-12 max-w-xl text-sm leading-7 text-white/40 md:text-base">
          We turn ideas, problems and opportunities into digital
          products — from the first sketch to the final experience.
        </p>
      </div>

      {/* =================================================
          PROJECTS
      ================================================= */}

      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        <div className="space-y-40 md:space-y-64">
          {projects.map((project, index) => (
            <Projectsvg
              key={project.number}
              index={index}
              project={project}
            />
          ))}
        </div>
      </div>

      <div className="h-40 md:h-60" />
    </section>
  );
}

/* =========================================================
   PROJECT SVG
========================================================= */

function Projectsvg({
  index,
  project,
}: {
  index: number;
  project: Project;
}) {
  const { ref, visible, animationKey } = useProjectVisibility();

  return (
    <article
      ref={ref}
      className="relative min-h-[110vh] w-full"
    >
      {/* =================================================
          TOP META
      ================================================= */}

      <div className="pointer-events-none relative z-50 flex justify-between px-3 pb-5 md:px-6">
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/25">
          {project.number}
        </span>

        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/25">
          {project.category}
        </span>
      </div>

      {/* =================================================
          VISUAL
      ================================================= */}

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#090909]">
        {visible && (
          <div key={animationKey}>
            <ProjectVisual index={index} />
          </div>
        )}

        {/* =================================================
            PROJECT INFORMATION
        ================================================= */}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 bg-gradient-to-t from-black via-black/90 to-transparent p-6 pt-40 md:p-10 md:pt-48">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 font-mono text-[8px] uppercase tracking-[0.25em] text-white/30">
                {project.category}
              </div>

              <h3 className="text-3xl font-medium tracking-[-0.05em] md:text-6xl">
                {project.title}
              </h3>
            </div>

            <p className="max-w-sm text-xs leading-6 text-white/40 md:text-sm">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PROJECT VISUAL
========================================================= */

function ProjectVisual({ index }: { index: number }) {
  if (index === 0) {
    return <BusinessPlatform />;
  }

  if (index === 1) {
    return <DigitalExperience />;
  }

  return <MobileProduct />;
}

/* =========================================================
   BROWSER BAR
========================================================= */

function BrowserBar() {
  return (
    <div className="flex h-11 shrink-0 items-center border-b border-white/10 px-4">
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
      </div>

      <div className="mx-auto hidden rounded-full border border-white/5 px-8 py-1 font-mono text-[7px] text-white/20 md:block">
        divlabs.digital
      </div>

      <div className="text-white/20">
        <Search size={13} strokeWidth={1.5} />
      </div>
    </div>
  );
}

/* =========================================================
   BUSINESS PLATFORM
========================================================= */

function BusinessPlatform() {
  return (
    <div className="relative h-[720px] overflow-hidden bg-[#090909] md:h-[820px]">
      <ProjectStageLabel text="Product development / 01" />

      {/* =================================================
          SKETCH
      ================================================= */}

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-[8%] right-[8%] top-[9%] bottom-[7%] rounded-[26px] border border-dashed border-white/10 bg-[#0d0d0d] p-6 md:p-10"
      >
        <StageTitle
          number="01"
          title="Sketch"
        />

        <div className="mt-12">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "130px" }}
            transition={{ duration: 0.7 }}
            className="h-[2px] rotate-[-1deg] bg-white/20"
          />

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
            className="mt-7 h-3 rotate-[1deg] bg-white/10"
          />

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "68%" }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="mt-3 h-2 bg-white/[0.05]"
          />

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + item * 0.1,
                }}
                className="h-28 rounded-xl border border-dashed border-white/10"
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
            className="mt-5 h-32 rounded-xl border border-dashed border-white/10"
          />
        </div>
      </motion.div>

      {/* =================================================
          WIREFRAME
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-[7%] right-[7%] top-[8%] bottom-[6%] z-10 overflow-hidden rounded-[26px] border border-white/10 bg-[#101010]"
      >
        <BrowserBar />

        <div className="flex h-[calc(100%-44px)]">
          {/* WIREFRAME SIDEBAR */}

          <div className="hidden w-[145px] shrink-0 border-r border-white/10 p-4 md:block">
            <div className="mb-7 h-5 w-20 rounded bg-white/10" />

            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-8 rounded-lg border border-white/10"
                />
              ))}
            </div>
          </div>

          <div className="flex-1 p-5 md:p-8">
            <div className="h-6 w-40 rounded bg-white/10" />

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-24 rounded-xl border border-white/10"
                />
              ))}
            </div>

            <div className="mt-4 h-48 rounded-xl border border-white/10" />
          </div>
        </div>
      </motion.div>

      {/* =================================================
          DESIGN SYSTEM
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
          delay: 3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-[7%] right-[7%] top-[7%] bottom-[5%] z-20 rounded-[28px] border border-white/10 bg-[#141414] p-7 md:p-10"
      >
        <StageTitle
          number="03"
          title="Design system"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              icon: LayoutDashboard,
              name: "Dashboard",
            },
            {
              icon: BarChart3,
              name: "Analytics",
            },
            {
              icon: Users,
              name: "Users",
            },
            {
              icon: Settings,
              name: "Settings",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 3.3 + index * 0.1,
                }}
                className="rounded-xl border border-white/10 p-4"
              >
                <Icon
                  size={18}
                  strokeWidth={1.4}
                  className="text-white/40"
                />

                <div className="mt-5 text-[8px] uppercase tracking-[0.15em] text-white/30">
                  {item.name}
                </div>

                <div className="mt-3 h-8 rounded-lg bg-white/[0.08]" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="h-32 rounded-xl border border-white/10" />

          <div className="h-32 rounded-xl border border-white/10" />
        </div>
      </motion.div>

      {/* =================================================
          FINAL HIGH FIDELITY DASHBOARD
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.3,
          delay: 4.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-[5%] right-[5%] top-[6%] bottom-[4%] z-30 overflow-hidden rounded-[30px] border border-white/10 bg-[#080808] shadow-[0_50px_120px_rgba(0,0,0,.75)]"
      >
        <BrowserBar />

        <div className="flex h-[calc(100%-44px)]">
          {/* =================================================
              REAL SIDEBAR
          ================================================= */}

          <aside className="hidden w-[190px] shrink-0 border-r border-white/10 bg-[#090909] md:flex md:flex-col">
            {/* LOGO */}

            <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black">
                <BarChart3
                  size={14}
                  strokeWidth={2}
                />
              </div>

              <span className="text-[10px] font-medium tracking-[-0.03em]">
                Business OS
              </span>
            </div>

            {/* NAVIGATION */}

            <div className="flex-1 p-3">
              <SidebarSection label="Workspace" />

              <SidebarItem
                icon={LayoutDashboard}
                label="Overview"
                active
              />

              <SidebarItem
                icon={BarChart3}
                label="Analytics"
              />

              <SidebarItem
                icon={Activity}
                label="Activity"
              />

              <SidebarItem
                icon={Users}
                label="Customers"
              />

              <SidebarItem
                icon={ShoppingCart}
                label="Orders"
              />

              <div className="my-5 h-px bg-white/5" />

              <SidebarSection label="Management" />

              <SidebarItem
                icon={CreditCard}
                label="Payments"
              />

              <SidebarItem
                icon={Database}
                label="Data"
              />
            </div>

            {/* USER */}

            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <CircleUserRound
                    size={14}
                    className="text-white/50"
                  />
                </div>

                <div>
                  <div className="text-[8px]">
                    Adrian Morfin
                  </div>

                  <div className="mt-1 text-[7px] text-white/25">
                    Administrator
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* =================================================
              MAIN DASHBOARD
          ================================================= */}

          <main className="min-w-0 flex-1 overflow-hidden">
            {/* HEADER */}

            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5 md:px-7">
              <div className="flex items-center gap-3">
                <Menu
                  size={15}
                  className="text-white/30 md:hidden"
                />

                <div>
                  <div className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                    Overview
                  </div>

                  <div className="mt-1 text-sm">
                    Good morning.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Search
                  size={14}
                  className="text-white/30"
                />

                <div className="relative">
                  <Bell
                    size={14}
                    className="text-white/40"
                  />

                  <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* CONTENT */}

            <div className="overflow-hidden p-5 md:p-7">
              {/* TOP */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 5,
                  duration: 0.6,
                }}
                className="flex items-end justify-between"
              >
                <div>
                  <div className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                    Performance
                  </div>

                  <div className="mt-1 text-xl font-medium tracking-[-0.04em] md:text-3xl">
                    Business overview
                  </div>
                </div>

                <button className="hidden rounded-lg border border-white/10 px-3 py-2 text-[8px] text-white/50 md:block">
                  Last 30 days
                </button>
              </motion.div>

              {/* METRICS */}

              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <Metric
                  icon={WalletCards}
                  label="Revenue"
                  value="$284k"
                  trend="+18.4%"
                />

                <Metric
                  icon={Users}
                  label="Customers"
                  value="12,842"
                  trend="+12.8%"
                />

                <Metric
                  icon={Activity}
                  label="Conversion"
                  value="8.42%"
                  trend="+4.2%"
                />

                <Metric
                  icon={Globe2}
                  label="Sessions"
                  value="48.2k"
                  trend="+22.1%"
                />
              </div>

              {/* CHART + ACTIVITY */}

              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_250px]">
                {/* CHART */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 5.3,
                    duration: 0.7,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.015] p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[8px] uppercase tracking-[0.2em] text-white/25">
                        Revenue
                      </div>

                      <div className="mt-1 text-sm">
                        Monthly performance
                      </div>
                    </div>

                    <BarChart3
                      size={15}
                      className="text-white/25"
                    />
                  </div>

                  <div className="mt-8 flex h-44 items-end gap-2">
                    {[
                      32,
                      42,
                      35,
                      48,
                      44,
                      58,
                      52,
                      67,
                      62,
                      74,
                      78,
                      94,
                    ].map((height, index) => (
                      <ChartBar
                        key={index}
                        height={`${height}%`}
                        delay={5.5 + index * 0.06}
                      />
                    ))}
                  </div>

                  <div className="mt-3 flex justify-between font-mono text-[7px] text-white/20">
                    <span>JAN</span>
                    <span>MAR</span>
                    <span>MAY</span>
                    <span>JUL</span>
                    <span>SEP</span>
                    <span>DEC</span>
                  </div>
                </motion.div>

                {/* ACTIVITY */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 5.4,
                    duration: 0.7,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.015] p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      Activity
                    </div>

                    <ArrowUpRight
                      size={14}
                      className="text-white/25"
                    />
                  </div>

                  <div className="mt-5 space-y-4">
                    <ActivityRow
                      icon={Users}
                      title="New customer"
                      value="+124"
                    />

                    <ActivityRow
                      icon={CreditCard}
                      title="Payment"
                      value="+$840"
                    />

                    <ActivityRow
                      icon={ShoppingCart}
                      title="New order"
                      value="+42"
                    />

                    <ActivityRow
                      icon={Activity}
                      title="Conversion"
                      value="+2.4%"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </motion.div>

      <ProjectStageLabel
        text="Sketch → Wireframe → Design system → High fidelity"
        bottom
      />
    </div>
  );
}

/* =========================================================
   DIGITAL EXPERIENCE
========================================================= */

function DigitalExperience() {
  return (
    <div className="relative h-[720px] overflow-hidden bg-[#090909] md:h-[820px]">
      <ProjectStageLabel text="Digital experience / 02" />

      {/* SKETCH */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute left-[10%] right-[10%] top-[9%] bottom-[7%] rounded-[28px] border border-dashed border-white/10 p-7 md:p-12"
      >
        <StageTitle
          number="01"
          title="Experience sketch"
        />

        <div className="mx-auto mt-14 max-w-[850px]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "190px" }}
            transition={{ duration: 0.7 }}
            className="h-4 bg-white/10"
          />

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="mt-5 h-2 bg-white/5"
          />

          <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5 + item * 0.1,
                }}
                className="flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10"
              >
                <Layers3
                  size={22}
                  strokeWidth={1}
                  className="text-white/20"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* WIREFRAME */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.6,
        }}
        className="absolute left-[8%] right-[8%] top-[8%] bottom-[6%] z-10 overflow-hidden rounded-[28px] border border-white/10 bg-[#101010]"
      >
        <BrowserBar />

        <div className="p-6 md:p-10">
          <div className="flex items-center gap-3">
            <Globe2
              size={18}
              className="text-white/20"
            />

            <div className="h-7 w-56 rounded bg-white/10" />
          </div>

          <div className="mt-3 h-3 w-80 rounded bg-white/5" />

          <div className="mt-12 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-white/10"
              >
                <Smartphone
                  size={20}
                  className="text-white/15"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FINAL */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.3,
          delay: 3.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-[6%] right-[6%] top-[6%] bottom-[4%] z-20 overflow-hidden rounded-[30px] border border-white/10 bg-[#f0eee7] text-black shadow-[0_50px_120px_rgba(0,0,0,.65)]"
      >
        <div className="flex h-14 items-center justify-between border-b border-black/10 px-6">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[-0.04em]">
            <Globe2 size={13} />
            DIV / EXPERIENCE
          </div>

          <div className="hidden gap-6 text-[9px] md:flex">
            <span>About</span>
            <span>Projects</span>
            <span>Contact</span>
          </div>

          <div className="rounded-full bg-black px-4 py-2 text-[8px] text-white">
            Start project
          </div>
        </div>

        <div className="px-6 pb-10 pt-14 md:px-12 md:pt-20">
          <div className="max-w-[750px] text-[clamp(2.5rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.07em]">
            Digital experiences
            <br />
            people remember.
          </div>

          <p className="mt-8 max-w-md text-xs leading-6 text-black/50">
            A carefully crafted digital experience designed around
            clarity, emotion and interaction.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-black/[0.06]"
              >
                <Layers3
                  size={25}
                  strokeWidth={1}
                  className="text-black/20"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <ProjectStageLabel
        text="Research → Wireframe → Experience → Launch"
        bottom
      />
    </div>
  );
}

/* =========================================================
   MOBILE PRODUCT
========================================================= */

function MobileProduct() {
  return (
    <div className="relative h-[720px] overflow-hidden bg-[#080808] md:h-[820px]">
      <ProjectStageLabel text="Mobile product / 03" />

      {/* SKETCH */}

      <motion.div
        initial={{
          opacity: 0,
          rotate: -2,
        }}
        animate={{
          opacity: 1,
          rotate: 0,
        }}
        transition={{ duration: 0.9 }}
        className="absolute left-1/2 top-[8%] h-[470px] w-[225px] -translate-x-1/2 rounded-[36px] border border-dashed border-white/15 p-4 md:h-[520px] md:w-[250px]"
      >
        <StageTitle
          number="01"
          title="Sketch"
        />

        <div className="mt-12">
          <Smartphone
            size={24}
            strokeWidth={1}
            className="text-white/20"
          />

          <div className="mt-5 h-7 w-[75%] rounded bg-white/10" />

          <div className="mt-5 h-3 w-[90%] bg-white/5" />

          <div className="mt-3 h-3 w-[65%] bg-white/5" />

          <div className="mt-10 grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-square rounded-xl border border-dashed border-white/10"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* WIREFRAME */}

      <motion.div
        initial={{
          opacity: 0,
          x: -40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.6,
        }}
        className="absolute left-[25%] top-[10%] z-10 h-[480px] w-[225px] rounded-[36px] border border-white/10 bg-[#101010] p-4 md:left-[30%] md:h-[520px] md:w-[250px]"
      >
        <div className="mx-auto h-1 w-16 rounded-full bg-white/10" />

        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Home
              size={13}
              className="text-white/20"
            />

            <div className="h-8 w-[65%] rounded bg-white/10" />
          </div>

          <div className="mt-5 h-36 rounded-2xl border border-white/10" />

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="h-20 rounded-xl border border-white/10" />
            <div className="h-20 rounded-xl border border-white/10" />
          </div>

          <div className="mt-4 h-10 rounded-full border border-white/10" />
        </div>
      </motion.div>

      {/* FINAL APP */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 50,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 1.3,
          delay: 3.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-1/2 top-[7%] z-30 h-[500px] w-[240px] -translate-x-1/2 overflow-hidden rounded-[38px] border border-white/10 bg-[#f1efe8] text-black shadow-[0_50px_100px_rgba(0,0,0,.8)] md:h-[550px] md:w-[260px]"
      >
        {/* NOTCH */}

        <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

        {/* HEADER */}

        <div className="px-5 pb-4 pt-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[7px] uppercase tracking-[0.2em] text-black/40">
                Welcome back
              </div>

              <div className="mt-1 text-lg font-medium tracking-[-0.05em]">
                Good morning.
              </div>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
              <CircleUserRound
                size={15}
                className="text-white"
              />
            </div>
          </div>
        </div>

        {/* BALANCE */}

        <div className="mx-5 rounded-[22px] bg-black p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="text-[7px] uppercase tracking-[0.2em] text-white/40">
              Total balance
            </div>

            <WalletCards
              size={14}
              className="text-white/30"
            />
          </div>

          <div className="mt-2 text-3xl font-medium tracking-[-0.06em]">
            $24,842
          </div>

          <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "72%",
              }}
              transition={{
                duration: 1,
                delay: 4,
              }}
              className="h-full rounded-full bg-white"
            />
          </div>
        </div>

        {/* ACTIVITY */}

        <div className="px-5 pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              Activity
            </div>

            <ChevronRight
              size={13}
              className="text-black/30"
            />
          </div>

          <div className="mt-4 space-y-3">
            <MobileActivity
              icon={ArrowUpRight}
              label="Payment received"
              value="+$840"
            />

            <MobileActivity
              icon={ArrowDownRight}
              label="Subscription"
              value="-$42"
            />

            <MobileActivity
              icon={CreditCard}
              label="Transfer"
              value="+$1,240"
            />
          </div>
        </div>

        {/* NAV */}

        <div className="absolute bottom-0 left-0 right-0 flex h-16 items-center justify-around border-t border-black/10 bg-[#f1efe8]">
          <div className="flex flex-col items-center gap-1">
            <Home size={12} />
            <span className="text-[7px] font-bold">
              Home
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 text-black/30">
            <BarChart3 size={12} />
            <span className="text-[7px]">
              Stats
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 text-black/30">
            <CreditCard size={12} />
            <span className="text-[7px]">
              Cards
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 text-black/30">
            <CircleUserRound size={12} />
            <span className="text-[7px]">
              Profile
            </span>
          </div>
        </div>
      </motion.div>

      <ProjectStageLabel
        text="Concept → User flow → Wireframe → Mobile product"
        bottom
      />
    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function SidebarSection({
  label,
}: {
  label: string;
}) {
  return (
    <div className="mb-2 px-3 pt-2 font-mono text-[6px] uppercase tracking-[0.2em] text-white/20">
      {label}
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -8,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className={`group flex h-9 items-center gap-3 rounded-lg px-3 text-[8px] transition-colors ${
        active
          ? "bg-white/[0.08] text-white"
          : "text-white/30 hover:bg-white/[0.04] hover:text-white/60"
      }`}
    >
      <Icon
        size={13}
        strokeWidth={1.5}
      />

      <span>{label}</span>
    </motion.div>
  );
}

/* =========================================================
   METRIC
========================================================= */

function Metric({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
    >
      <div className="flex items-center justify-between">
        <Icon
          size={15}
          strokeWidth={1.4}
          className="text-white/30"
        />

        <span className="flex items-center gap-1 text-[7px] text-white/35">
          <ArrowUpRight size={9} />
          {trend}
        </span>
      </div>

      <div className="mt-4 text-[8px] uppercase tracking-[0.15em] text-white/25">
        {label}
      </div>

      <div className="mt-1 text-xl font-medium">
        {value}
      </div>
    </motion.div>
  );
}

/* =========================================================
   ACTIVITY ROW
========================================================= */

function ActivityRow({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
          <Icon
            size={13}
            className="text-white/35"
          />
        </div>

        <div>
          <div className="text-[8px]">
            {title}
          </div>

          <div className="mt-1 text-[7px] text-white/20">
            Today
          </div>
        </div>
      </div>

      <div className="text-[8px] text-white/60">
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   CHART BAR
========================================================= */

function ChartBar({
  height,
  delay,
}: {
  height: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        height: "0%",
      }}
      animate={{
        height,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-1 rounded-t bg-white/30"
    />
  );
}

/* =========================================================
   MOBILE ACTIVITY
========================================================= */

function MobileActivity({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -15,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="flex items-center justify-between rounded-xl bg-black/[0.04] p-3"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
          <Icon
            size={13}
            className="text-black/50"
          />
        </div>

        <div>
          <div className="text-[9px]">
            {label}
          </div>

          <div className="mt-1 text-[7px] text-black/30">
            Today
          </div>
        </div>
      </div>

      <div className="text-[9px] font-medium">
        {value}
      </div>
    </motion.div>
  );
}

/* =========================================================
   STAGE TITLE
========================================================= */

function StageTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/25">
        {number}
      </div>

      <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
        {title}
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT STAGE LABEL
========================================================= */

function ProjectStageLabel({
  text,
  bottom = false,
}: {
  text: string;
  bottom?: boolean;
}) {
  return (
    <div
      className={`absolute left-6 z-50 font-mono text-[8px] uppercase tracking-[0.25em] text-white/25 md:left-10 ${
        bottom
          ? "bottom-6 md:bottom-8"
          : "top-6 md:top-8"
      }`}
    >
      {text}
    </div>
  );
}