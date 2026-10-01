"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
};

export default function CursorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    let animationFrame = 0;

    const particles: Particle[] = [];

    const mouse = {
      x: 0,
      y: 0,

      targetX: 0,
      targetY: 0,

      vx: 0,
      vy: 0,

      speed: 0,

      active: false,
    };

    let width = 0;
    let height = 0;
    let dpr = 1;

    /* =====================================================
       RESIZE
    ===================================================== */

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      if (!mouse.active) {
        mouse.x = width / 2;
        mouse.y = height / 2;

        mouse.targetX = width / 2;
        mouse.targetY = height / 2;
      }
    };

    /* =====================================================
       CREATE PARTICLE
    ===================================================== */

    const createParticle = (
      force = 1
    ) => {
      const angle =
        Math.random() * Math.PI * 2;

      const spread =
        10 + Math.random() * 35;

      const speed =
        Math.min(mouse.speed, 40) *
          0.04 +
        Math.random() * 0.45;

      particles.push({
        x:
          mouse.x +
          Math.cos(angle) * spread,

        y:
          mouse.y +
          Math.sin(angle) * spread,

        vx:
          mouse.vx * 0.035 * force +
          Math.cos(angle) * speed,

        vy:
          mouse.vy * 0.035 * force +
          Math.sin(angle) * speed,

        radius:
          25 +
          Math.random() * 80,

        life: 0,

        maxLife:
          60 +
          Math.random() * 100,
      });

      if (particles.length > 150) {
        particles.splice(
          0,
          particles.length - 150
        );
      }
    };

    /* =====================================================
       MOUSE MOVE
    ===================================================== */

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      mouse.targetX =
        event.clientX - rect.left;

      mouse.targetY =
        event.clientY - rect.top;

      mouse.active = true;

      const dx =
        mouse.targetX - mouse.x;

      const dy =
        mouse.targetY - mouse.y;

      mouse.speed = Math.sqrt(
        dx * dx + dy * dy
      );

      /*
       * Faster movement = more fluid.
       */

      const amount = Math.min(
        12,
        Math.max(
          2,
          Math.floor(
            mouse.speed / 2
          )
        )
      );

      for (
        let i = 0;
        i < amount;
        i++
      ) {
        createParticle(
          Math.min(
            2,
            0.7 +
              mouse.speed *
                0.015
          )
        );
      }
    };

    /* =====================================================
       MOUSE LEAVE
    ===================================================== */

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.speed = 0;
    };

    /* =====================================================
       DRAW CONNECTIONS
    ===================================================== */

    const drawConnections = () => {
      const maxDistance = 130;

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        const a = particles[i];

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance =
            Math.sqrt(
              dx * dx + dy * dy
            );

          if (
            distance <
            maxDistance
          ) {
            const alpha =
              (1 -
                distance /
                  maxDistance) *
              0.055;

            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;

            ctx.lineWidth = 0.5;

            ctx.beginPath();

            ctx.moveTo(
              a.x,
              a.y
            );

            ctx.lineTo(
              b.x,
              b.y
            );

            ctx.stroke();
          }
        }
      }
    };

    /* =====================================================
       DRAW PARTICLES
    ===================================================== */

    const drawParticles = () => {
      for (
        let i = particles.length - 1;
        i >= 0;
        i--
      ) {
        const particle =
          particles[i];

        particle.life++;

        /*
         * Inertia.
         */

        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;

        particle.vx *= 0.965;
        particle.vy *= 0.965;

        /*
         * Tiny atmospheric movement.
         */

        particle.vy +=
          Math.sin(
            particle.life * 0.015
          ) * 0.003;

        /*
         * Life.
         */

        const progress =
          particle.life /
          particle.maxLife;

        const opacity =
          Math.sin(
            Math.PI * progress
          ) * 0.12;

        if (
          particle.life >=
          particle.maxLife
        ) {
          particles.splice(
            i,
            1
          );

          continue;
        }

        /*
         * Fluid blob.
         */

        const gradient =
          ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.radius
          );

        gradient.addColorStop(
          0,
          `rgba(255,255,255,${opacity})`
        );

        gradient.addColorStop(
          0.25,
          `rgba(240,240,240,${
            opacity * 0.45
          })`
        );

        gradient.addColorStop(
          0.65,
          `rgba(180,180,180,${
            opacity * 0.08
          })`
        );

        gradient.addColorStop(
          1,
          "rgba(0,0,0,0)"
        );

        ctx.fillStyle =
          gradient;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    };

    /* =====================================================
       DRAW CURSOR CORE
    ===================================================== */

    const drawCursorCore = () => {
      if (!mouse.active) {
        return;
      }

      const radius =
        80 +
        Math.min(
          mouse.speed * 1.5,
          100
        );

      const gradient =
        ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          radius
        );

      gradient.addColorStop(
        0,
        "rgba(255,255,255,0.14)"
      );

      gradient.addColorStop(
        0.12,
        "rgba(255,255,255,0.07)"
      );

      gradient.addColorStop(
        0.4,
        "rgba(255,255,255,0.025)"
      );

      gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.fillStyle =
        gradient;

      ctx.beginPath();

      ctx.arc(
        mouse.x,
        mouse.y,
        radius,
        0,
        Math.PI * 2
      );

      ctx.fill();
    };

    /* =====================================================
       MAIN LOOP
    ===================================================== */

    const animate = () => {
      /*
       * Fade previous frame.
       *
       * This is what creates the
       * liquid / smoke feeling.
       */

      ctx.fillStyle =
        "rgba(5,5,5,0.075)";

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * Smooth cursor position.
       */

      const dx =
        mouse.targetX -
        mouse.x;

      const dy =
        mouse.targetY -
        mouse.y;

      mouse.vx = dx;
      mouse.vy = dy;

      mouse.x +=
        dx * 0.16;

      mouse.y +=
        dy * 0.16;

      mouse.speed *= 0.92;

      /*
       * Connections first.
       */

      drawConnections();

      /*
       * Fluid particles.
       */

      drawParticles();

      /*
       * Cursor glow.
       */

      drawCursorCore();

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    /* =====================================================
       INIT
    ===================================================== */

    resize();

    ctx.fillStyle =
      "#050505";

    ctx.fillRect(
      0,
      0,
      width,
      height
    );

    animate();

    window.addEventListener(
      "resize",
      resize
    );

    canvas.addEventListener(
      "mousemove",
      handleMouseMove
    );

    canvas.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      canvas.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      canvas.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        pointer-events-auto
        absolute
        inset-0
        z-0
        h-full
        w-full
      "
      aria-hidden="true"
    />
  );
}