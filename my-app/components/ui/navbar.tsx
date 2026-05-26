"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {  Menu, X, SendHorizonal, Download, Home } from "lucide-react";

const links = [
  { href: "/",        label: "Home",    icon: Home          },
  { href: "/Send",    label: "Send",    icon: SendHorizonal },
  { href: "/Receive", label: "Receive", icon: Download      },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 md:px-6 py-4">

        {/* Desktop nav pill — hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <div className="relative flex items-center gap-0.5 rounded-full border border-white/15 bg-black/40 px-1.5 py-1.5 backdrop-blur-xl shadow-lg shadow-black/20">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-4 py-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
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

        {/* Desktop GitHub button — hidden on mobile */}
        <motion.a
          href="https://github.com/Suman0777/CosmoDrop"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex ml-auto items-center gap-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-xl px-4 py-2 shadow-lg shadow-black/20 transition-all duration-300 hover:border-[rgba(59,130,100,0.5)] hover:bg-[rgba(59,130,100,0.12)] hover:shadow-[0_0_16px_rgba(59,130,100,0.25)] group"
        >
          <span className="text-sm font-medium text-white/60 transition-colors duration-300 group-hover:text-white">
            GitHub
          </span>
        </motion.a>

        {/* Mobile hamburger button — right side, visible only on mobile */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden ml-auto flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-xl text-white/70 hover:text-white hover:border-white/30 transition-all duration-200 z-60"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate:  90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate:  90, opacity: 0 }}
                animate={{ rotate:  0,  opacity: 1 }}
                exit={{   rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer panel — slides from top */}
            <motion.div
              key="drawer"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0,       opacity: 1 }}
              exit={{   y: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/10 px-5 pt-20 pb-8 flex flex-col gap-2"
            >
              {/* Nav links */}
              {links.map(({ href, label, icon: Icon }, i) => {
                const active = pathname === href;
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-[rgba(59,130,100,0.25)] border border-[rgba(59,130,100,0.4)] text-[#6ee7b7]"
                          : "text-white/60 hover:text-white hover:bg-white/[0.06] border border-transparent"
                      }`}
                    >
                      <Icon size={17} className={active ? "text-[#6ee7b7]" : "text-white/40"} />
                      {label}
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6ee7b7]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                className="my-1 border-t border-white/8"
              />

              {/* GitHub link */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32, duration: 0.3 }}
              >
                <a
                  href="https://github.com/Suman0777/CosmoDrop"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] border border-transparent transition-all duration-200"
                >

                  GitHub
                  <span className="ml-auto text-[10px] text-white/25 tracking-wide">↗</span>
                </a>
              </motion.div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
