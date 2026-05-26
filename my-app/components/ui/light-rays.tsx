"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface LightRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
  count?: number
  color?: string
  blur?: number
  speed?: number
  length?: string
}

type LightRay = {
  id: string
  left: number
  rotate: number
  width: number
  swing: number
  delay: number
  duration: number
  intensity: number
}

const createRays = (count: number, cycle: number): LightRay[] => {
  if (count <= 0) return []
  return Array.from({ length: count }, (_, index) => ({
    id: `${index}`,
    left: 8 + Math.random() * 84,
    rotate: -28 + Math.random() * 56,
    width: 160 + Math.random() * 160,
    swing: 0.8 + Math.random() * 1.8,
    delay: Math.random() * cycle,
    duration: cycle * (0.75 + Math.random() * 0.5),
    intensity: 0.6 + Math.random() * 0.5,
  }))
}

export function LightRays({
  className,
  style,
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  speed = 14,
  length = "70vh",
  ref,
  ...props
}: LightRaysProps) {
  const [rays, setRays] = useState<LightRay[]>([])
  const cycleDuration = Math.max(speed, 0.1)

  useEffect(() => {
    // Reduce ray count on mobile to cut main-thread work
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    setRays(createRays(isMobile ? Math.min(count, 6) : count, cycleDuration))
  }, [count, cycleDuration])

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]",
        className
      )}
      style={{
        "--light-rays-color": color,
        "--light-rays-blur": `${blur}px`,
        "--light-rays-length": length,
        ...style,
      } as CSSProperties}
      {...props}
    >
      {/* Inject keyframes once */}
      <style>{`
        @keyframes ray-pulse {
          0%, 100% { opacity: 0; transform: translateX(-50%) rotate(var(--ray-rotate)); }
          50%       { opacity: var(--ray-intensity); transform: translateX(-50%) rotate(calc(var(--ray-rotate) + var(--ray-swing) * 1deg)); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        {/* Static radial glows — no JS animation */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{ background: "radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--light-rays-color) 45%, transparent), transparent 70%)" } as CSSProperties}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{ background: "radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--light-rays-color) 35%, transparent), transparent 75%)" } as CSSProperties}
        />

        {rays.map((ray) => (
          <div
            key={ray.id}
            className="pointer-events-none absolute -top-[12%] rounded-full mix-blend-screen"
            style={{
              left: `${ray.left}%`,
              width: `${ray.width}px`,
              height: `var(--light-rays-length)`,
              background: `linear-gradient(to bottom, color-mix(in srgb, var(--light-rays-color) 70%, transparent), transparent)`,
              filter: `blur(var(--light-rays-blur))`,
              transformOrigin: "top center",
              willChange: "transform, opacity",
              animation: `ray-pulse ${ray.duration}s ease-in-out ${ray.delay}s infinite`,
              "--ray-rotate": `${ray.rotate}deg`,
              "--ray-swing": `${ray.swing}`,
              "--ray-intensity": `${ray.intensity}`,
            } as CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}
