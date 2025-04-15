"use client"

import { useEffect, useRef } from "react"
import DreamWebsFixed from "./dream-webs-fixed"

const starStyles = `
  #stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: var(--star-small);
    animation: animateStar 50s linear infinite;
  }
  #stars2 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: var(--star-medium);
    animation: animateStar 100s linear infinite;
  }
  #stars3 {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: var(--star-large);
    animation: animateStar 150s linear infinite;
  }
  @keyframes animateStar {
    from { transform: translateY(0px); }
    to { transform: translateY(-2000px); }
  }
`

// Generate random stars
const generateStars = (count: number) => {
  let stars = ""
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000)
    const y = Math.floor(Math.random() * 2000)
    stars += `${x}px ${y}px #FFF${i === count - 1 ? "" : ", "}`
  }
  return stars
}

export default function StarBackground() {
  const starsRef = useRef<HTMLStyleElement | null>(null)

  useEffect(() => {
    // Create and inject styles for stars
    const style = document.createElement("style")

    // Generate star patterns
    const smallStars = generateStars(700)
    const mediumStars = generateStars(200)
    const largeStars = generateStars(100)

    style.textContent = `
      :root {
        --star-small: ${smallStars};
        --star-medium: ${mediumStars};
        --star-large: ${largeStars};
      }
      ${starStyles}
    `

    document.head.appendChild(style)
    starsRef.current = style

    // Cleanup function
    return () => {
      if (starsRef.current) {
        document.head.removeChild(starsRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black/30">
      {/* Dream webs layer */}
      <DreamWebsFixed />

      {/* Stars layers */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {/* Dark gradient overlay to ensure content is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/60"></div>
    </div>
  )
}
