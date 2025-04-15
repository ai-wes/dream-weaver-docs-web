"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  // For animated network effect
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Network animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    // Initialize nodes
    const initNodes = () => {
      const nodes: Node[] = []
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * 0.2 - 0.1,
          vy: Math.random() * 0.2 - 0.1,
          radius: Math.random() * 2 + 1,
          color: getRandomColor(),
        })
      }

      nodesRef.current = nodes
    }

    const getRandomColor = () => {
      const colors = [
        "rgba(64, 206, 255, 0.7)", // Cyan
        "rgba(255, 64, 255, 0.7)", // Pink
        "rgba(255, 206, 64, 0.7)", // Gold
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation loop
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw nodes
        nodesRef.current.forEach((node, i) => {
          // Update position
          node.x += node.vx
          node.y += node.vy

          // Bounce off edges
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1

          // Draw node
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
          ctx.fillStyle = node.color
          ctx.fill()

          // Draw connections
          nodesRef.current.forEach((otherNode, j) => {
            if (i === j) return

            const dx = node.x - otherNode.x
            const dy = node.y - otherNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })
        })
      }

      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Parallax layers */}
      <div
        className="absolute inset-0 w-full h-full opacity-70"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image src="/images/cosmic-portal.jpeg" alt="Cosmic background" fill className="object-cover" priority />
      </div>

      <div
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image src="/images/cosmic-vortex.jpeg" alt="Cosmic vortex" fill className="object-cover" priority />
      </div>

      <div
        className="absolute inset-0 w-full h-full opacity-30 mix-blend-lighten"
        style={{
          transform: `translateY(${scrollY * -0.03}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image src="/images/cosmic-moon.png" alt="Cosmic moon" fill className="object-cover" priority />
      </div>

      {/* Animated network overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Blur overlay for better contrast */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/40"></div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>
    </div>
  )
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}
