"use client"

import { useEffect, useRef, useState } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  connections: number[]
  color: string
  pulseSpeed: number
  pulsePhase: number
}

export default function DreamWebsAdvanced() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen with proper pixel ratio
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.scale(pixelRatio, pixelRatio)
      setDimensions({ width, height })

      initNodes()
    }

    // Initialize nodes
    const initNodes = () => {
      const nodes: Node[] = []
      // Scale node count based on screen size, but keep it reasonable
      const nodeCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 50000), 30)

      // Color palette for nodes (blues, purples, teals)
      const colors = [
        "rgba(147, 197, 253, 0.8)", // blue
        "rgba(196, 181, 253, 0.8)", // purple
        "rgba(79, 209, 197, 0.8)", // teal
        "rgba(236, 72, 153, 0.6)", // pink
      ]

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.15, // Slower movement
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 2 + 1,
          connections: [],
          color: colors[Math.floor(Math.random() * colors.length)],
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }

      // Create connections (each node connects to 1-3 others)
      nodes.forEach((node, i) => {
        const connectionCount = Math.floor(Math.random() * 2) + 1
        const potentialConnections = [...Array(nodes.length).keys()].filter((j) => j !== i)

        for (let c = 0; c < connectionCount; c++) {
          if (potentialConnections.length === 0) break

          const randomIndex = Math.floor(Math.random() * potentialConnections.length)
          const connectionIndex = potentialConnections[randomIndex]

          node.connections.push(connectionIndex)
          potentialConnections.splice(randomIndex, 1)
        }
      })

      nodesRef.current = nodes
    }

    // Animation function
    const animate = (time: number) => {
      if (!canvas || !ctx) return

      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      // Update nodes
      nodesRef.current.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges with some padding
        if (node.x < node.radius || node.x > width - node.radius) node.vx *= -1
        if (node.y < node.radius || node.y > height - node.radius) node.vy *= -1

        // Keep nodes within bounds
        node.x = Math.max(node.radius, Math.min(width - node.radius, node.x))
        node.y = Math.max(node.radius, Math.min(height - node.radius, node.y))
      })

      // Draw connections first (so they appear behind nodes)
      nodesRef.current.forEach((node, i) => {
        node.connections.forEach((connectionIndex) => {
          const connectedNode = nodesRef.current[connectionIndex]

          // Calculate distance
          const dx = connectedNode.x - node.x
          const dy = connectedNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only draw if within reasonable distance
          if (distance < width / 2.5) {
            // Opacity based on distance
            const opacity = Math.max(0, 0.12 - distance / (width / 1.5))

            // Draw gradient line
            const gradient = ctx.createLinearGradient(node.x, node.y, connectedNode.x, connectedNode.y)
            gradient.addColorStop(0, node.color.replace("0.8", `${opacity}`))
            gradient.addColorStop(1, connectedNode.color.replace("0.8", `${opacity}`))

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connectedNode.x, connectedNode.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Draw nodes with pulsing effect
      nodesRef.current.forEach((node) => {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.5 + 0.5
        const radius = node.radius * (1 + pulse * 0.3)
        const opacity = 0.3 + pulse * 0.2

        // Draw glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 4)
        gradient.addColorStop(0, node.color.replace("0.8", `${opacity}`))
        gradient.addColorStop(1, node.color.replace("0.8", "0"))

        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw node center
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color.replace("0.8", "1")
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-5 pointer-events-none opacity-20" />
}
