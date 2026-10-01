"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full px-5 py-5 md:px-8">
      <nav
  className="
    mx-auto
    flex
    h-[56px]
    max-w-[1500px]
    items-center
    justify-between
    rounded-full
    border
    border-white/10
    bg-black/70
    px-4
    backdrop-blur-xl
  "
>
          {/* LOGO */}

          <a
            href="#"
            className="group flex items-center gap-3"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white">
              <img
                src="/div.jpg"
                alt="DIV LABS"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="text-sm font-semibold tracking-[-0.03em]">
              DIV LABS
            </span>
          </a>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  text-sm
                  text-white/55
                  transition-colors
                  hover:text-white
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}

          <a
            href="#contact"
            className="
              group
              hidden
              h-10
              w-fit
              items-center
              gap-3
              rounded-full
              bg-[#f2f0e9]
              px-5
              text-[13px]
              font-medium
              !text-black
              transition-all
              duration-500
              hover:gap-5
              hover:bg-white
              md:flex
            "
          >
            <span className="!text-black">
              Start a conversation
            </span>

            <ArrowUpRight
              size={15}
              className="
                !text-black
                transition-transform
                duration-500
                group-hover:rotate-45
              "
            />
          </a>

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              md:hidden
            "
          >
            {open ? (
              <X size={17} />
            ) : (
              <Menu size={17} />
            )}
          </button>
        </nav>
      </header>

      {/* MOBILE MENU */}

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end bg-black p-6 pb-10 md:hidden">
          <div className="space-y-5">

            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="
                  block
                  text-4xl
                  font-semibold
                  tracking-tight
                "
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="
                mt-8
                flex
                w-full
                items-center
                justify-between
                rounded-full
                bg-white
                px-6
                py-4
                font-semibold
                text-black
              "
            >
              Start a project
              <ArrowUpRight />
            </a>

          </div>
        </div>
      )}
    </>
  );
}