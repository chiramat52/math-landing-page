"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function StepFunctionSection() {
  const ref = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let frame = 0
    const animate = () => {
      frame++
      setAnimationProgress(Math.min(frame / 60, 1))
      if (frame < 60) requestAnimationFrame(animate)
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
    const centerY = height / 2

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
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.moveTo(40, 0)
    ctx.lineTo(40, height)
    ctx.stroke()

    // Draw step function with animation
    ctx.strokeStyle = "#64c8ff"
    ctx.lineWidth = 3
    ctx.shadowColor = "#64c8ff"
    ctx.shadowBlur = 10

    const steps = [-3, -2, -1, 0, 1, 2, 3]
    const stepWidth = (width - 80) / 6

    ctx.beginPath()
    steps.forEach((step, i) => {
      if (i >= steps.length - 1) return
      const x1 = 40 + i * stepWidth
      const x2 = 40 + (i + 1) * stepWidth
      const y = centerY - step * 25

      const progress = Math.min(animationProgress * (steps.length / (i + 1)), 1)
      const animatedX2 = x1 + (x2 - x1) * progress

      if (i === 0) ctx.moveTo(x1, y)
      ctx.lineTo(animatedX2, y)
      if (progress >= 1 && i < steps.length - 2) {
        ctx.lineTo(x2, centerY - steps[i + 1] * 25)
      }
    })
    ctx.stroke()

    ctx.shadowBlur = 0
  }, [animationProgress])

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-6">
              <span className="font-mono text-primary text-sm">⌊x⌋</span>
              <span className="text-xs text-muted-foreground">Floor Function</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-foreground">ฟังก์ชัน</span>
              <span className="text-primary">ขั้นบันได</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                <strong className="text-foreground">ฟังก์ชันขั้นบันได (Step Function)</strong> หรือ
                <strong className="text-primary"> Greatest Integer Function</strong>{" "}
                คือฟังก์ชันที่ให้ค่าจำนวนเต็มที่มากที่สุดที่น้อยกว่าหรือเท่ากับ x
              </p>
              <p>
                เขียนแทนด้วย <span className="font-mono text-primary">⌊x⌋</span> หรือ{" "}
                <span className="font-mono text-primary">[x]</span>
              </p>
              <div className="glass-card rounded-xl p-4">
                <p className="font-mono text-sm">
                  ตัวอย่าง: <span className="text-primary">⌊2.7⌋ = 2</span>,{" "}
                  <span className="text-accent">⌊-1.3⌋ = -2</span>, <span className="text-primary">⌊5⌋ = 5</span>
                </p>
              </div>
            </div>

            <Link href="/examples#step-function">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                ดูตัวอย่างโจทย์เพิ่มเติม
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Graph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">กราฟฟังก์ชันขั้นบันได</span>
              <span className="font-mono text-xs text-primary">y = ⌊x⌋</span>
            </div>
            <canvas ref={canvasRef} width={400} height={280} className="w-full rounded-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
