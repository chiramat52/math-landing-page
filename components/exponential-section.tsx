"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ExponentialSection() {
  const ref = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let frame = 0
    const animate = () => {
      frame++
      setAnimationProgress(Math.min(frame / 80, 1))
      if (frame < 80) requestAnimationFrame(animate)
    }
    animate()
  }, [isInView])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "rgba(100, 200, 255, 0.1)"
    ctx.lineWidth = 1
    for (let i = 0; i <= width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i <= height; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, height - 40)
    ctx.lineTo(width, height - 40)
    ctx.moveTo(80, 0)
    ctx.lineTo(80, height)
    ctx.stroke()

    // Draw exponential function y = e^x
    ctx.strokeStyle = "#4ade80"
    ctx.lineWidth = 3
    ctx.shadowColor = "#4ade80"
    ctx.shadowBlur = 10

    ctx.beginPath()
    const totalPoints = Math.floor(200 * animationProgress)
    for (let i = 0; i < totalPoints; i++) {
      const x = (i / 200) * width
      const xVal = (i / 200) * 6 - 3
      const y = height - 40 - Math.exp(xVal) * 15

      if (y < 0) continue

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw second curve y = 2^x
    ctx.strokeStyle = "#64c8ff"
    ctx.lineWidth = 2
    ctx.shadowColor = "#64c8ff"
    ctx.setLineDash([5, 5])

    ctx.beginPath()
    for (let i = 0; i < totalPoints; i++) {
      const x = (i / 200) * width
      const xVal = (i / 200) * 6 - 3
      const y = height - 40 - Math.pow(2, xVal) * 20

      if (y < 0) continue

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    ctx.setLineDash([])
    ctx.shadowBlur = 0
  }, [animationProgress])

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Graph - on left this time */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 order-2 lg:order-1"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">กราฟฟังก์ชันเอกซ์โพเนนเชียล</span>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-accent rounded" />
                  <span className="font-mono text-accent">y = eˣ</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-primary rounded border-dashed" />
                  <span className="font-mono text-primary">y = 2ˣ</span>
                </span>
              </div>
            </div>
            <canvas ref={canvasRef} width={400} height={280} className="w-full rounded-lg" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-6">
              <span className="font-mono text-accent text-sm">eˣ</span>
              <span className="text-xs text-muted-foreground">Exponential Function</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-foreground">ฟังก์ชัน</span>
              <span className="text-accent">เอกซ์โพเนนเชียล</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                <strong className="text-foreground">ฟังก์ชันเอกซ์โพเนนเชียล (Exponential Function)</strong> คือฟังก์ชันที่มีรูปแบบ
                <span className="font-mono text-accent"> f(x) = aˣ</span> โดยที่ a {">"} 0 และ a ≠ 1
              </p>
              <p>
                ฟังก์ชันที่สำคัญที่สุดคือ <span className="font-mono text-accent">f(x) = eˣ</span> โดย e ≈ 2.71828
              </p>
              <div className="glass-card rounded-xl p-4">
                <p className="font-mono text-sm">
                  คุณสมบัติ: <span className="text-accent">eˣ · eʸ = eˣ⁺ʸ</span>,{" "}
                  <span className="text-primary">(eˣ)ʸ = eˣʸ</span>
                </p>
              </div>
            </div>

            <Link href="/examples#exponential">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium"
              >
                ดูตัวอย่างโจทย์เพิ่มเติม
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
