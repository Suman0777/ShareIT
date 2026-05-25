"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/Send", label: "Send" },
  { href: "/Receive", label: "Receive" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-2 left-0 right-0 z-50 flex items-center px-6 pt-5">
  
  {/* Centered nav pill */}
  <div className="absolute left-1/2 -translate-x-1/2">
    <div className="relative flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2 py-2 backdrop-blur-md">
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="relative px-5 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-[rgba(59,130,100,0.55)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </Link>
        );
      })}
    </div>
  </div>

  {/* Push GitHub to extreme right */}
  <div className="ml-auto">
    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white/60 hover:text-white hover:border-white/40 transition-all hover:scale-105"
      aria-label="GitHub"
    >
      <img src="/social.png" alt="GitHub" className="w-5 h-5" />
    </a>
  </div>
</nav>  );
}
