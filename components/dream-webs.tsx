"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

export default function DreamWebs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const pointsRef = useRef<Point[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initPoints()
    }

    // Initialize points
    const initPoints = () => {
      const points: Point[] = []
      const pointCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 40000), 50)

      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          connections: [],
        })
      }

      // Create initial connections (each point connects to 1-3 others)
      points.forEach((point, i) => {
        const connectionCount = Math.floor(Math.random() * 3) + 1
        const potentialConnections = [...Array(points.length).keys()].filter((j) => j !== i)

        for (let c = 0; c < connectionCount; c++) {
          if (potentialConnections.length === 0) break

          const randomIndex = Math.floor(Math.random() * potentialConnections.length)
          const connectionIndex = potentialConnections[randomIndex]

          point.connections.push(connectionIndex)
          potentialConnections.splice(randomIndex, 1)
        }
      })

      pointsRef.current = points
    }

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update points
      pointsRef.current.forEach((point) => {
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1
      })

      // Draw connections
      ctx.lineWidth = 0.5

      pointsRef.current.forEach((point, i) => {
        point.connections.forEach((connectionIndex) => {
          const connectedPoint = pointsRef.current[connectionIndex]

          // Calculate distance
          const dx = connectedPoint.x - point.x
          const dy = connectedPoint.y - point.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only draw if within reasonable distance
          if (distance < canvas.width / 3) {
            // Opacity based on distance
            const opacity = Math.max(0, 0.15 - distance / (canvas.width / 2))

            // Color based on position (subtle blues and purples)
            const hue = (point.x / canvas.width) * 60 + 220 // 220-280 range (blues to purples)
            const saturation = 70 + (point.y / canvas.height) * 30 // 70-100%
            const lightness = 60 + (distance / (canvas.width / 4)) * 20 // 60-80%

            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(connectedPoint.x, connectedPoint.y)
            ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-5 pointer-events-none opacity-30"
      style={{ filter: "blur(1px)" }}
    />
  )
}
