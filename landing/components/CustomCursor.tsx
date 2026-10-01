"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const circle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const move = (event: MouseEvent) => {
      gsap.to(dot.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(circle.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const enter = () => {
      circle.current?.classList.add("is-hover");
    };

    const leave = () => {
      circle.current?.classList.remove("is-hover");
    };

    window.addEventListener("mousemove", move);

    const interactive = document.querySelectorAll(
      "a, button, [data-cursor]"
    );

    interactive.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);

      interactive.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={circle} className="cursor-circle" />
    </>
  );
}