"use client"

import { useTheme } from "@/components/theme-provider"

export function YinYangLogo({ className = "h-10 w-10" }: { className?: string }) {
  const { theme } = useTheme()
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <svg viewBox="0 0 100 100" className={className} aria-label="Disputify logo">
      <circle cx="50" cy="50" r="45" fill="none" stroke={isDark ? "white" : "black"} strokeWidth="2" />
      <path d="M50,5 A45,45 0 0,1 50,95 A45,45 0 0,0 50,5" fill={isDark ? "white" : "black"} />
      <circle cx="50" cy="27.5" r="10" fill={isDark ? "black" : "white"} />
      <circle cx="50" cy="72.5" r="10" fill={isDark ? "white" : "black"} />
      {/* Speech bubbles to represent debate */}
      <path
        d="M25,40 Q15,40 15,30 Q15,20 25,20 L35,20 Q45,20 45,30 Q45,35 40,38 L30,45 L30,38 Q25,38 25,40 Z"
        fill={isDark ? "black" : "white"}
        stroke={isDark ? "white" : "black"}
        strokeWidth="1"
      />
      <path
        d="M75,80 Q85,80 85,70 Q85,60 75,60 L65,60 Q55,60 55,70 Q55,75 60,78 L70,85 L70,78 Q75,78 75,80 Z"
        fill={isDark ? "white" : "black"}
        stroke={isDark ? "black" : "white"}
        strokeWidth="1"
      />
    </svg>
  )
}

