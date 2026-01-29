"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { ArrowDown, BookOpen, Calculator, TrendingUp } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Floating math symbols
    const symbols = ["∫", "∑", "π", "√", "∞", "Δ", "θ", "λ", "∂", "∇", "eˣ", "⌊x⌋"]
    const particles: { x: number; y: number; vx: number; vy: number; symbol: string; size: number; opacity: number }[] =
      []

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: 14 + Math.random() * 20,
        opacity: 0.1 + Math.random() * 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.font = `${p.size}px 'Geist Mono', monospace`
        ctx.fillStyle = `rgba(100, 200, 255, ${p.opacity})`
        ctx.fillText(p.symbol, p.x, p.y)
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden math-grid">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">เริ่มเรียนรู้คณิตศาสตร์วันนี้</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-balance">
            <span className="text-foreground">เรียนรู้</span>
            <br />
            <span className="text-primary text-glow">ฟังก์ชันทางคณิตศาสตร์</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            แหล่งรวมความรู้เกี่ยวกับฟังก์ชันขั้นบันไดและฟังก์ชันเอกซ์โพเนนเชียล พร้อมตัวอย่างโจทย์และแบบฝึกหัดมากมาย
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/examples">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-2 glow-cyan"
              >
                <BookOpen className="w-5 h-5" />
                ดูตัวอย่างโจทย์
              </motion.button>
            </Link>
            <Link href="/exercises">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl glass border border-primary/30 text-foreground font-semibold flex items-center gap-2 hover:bg-primary/10 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                ทำแบบฝึกหัด
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: BookOpen, label: "บทเรียน", value: "2 เรื่อง" },
            { icon: Calculator, label: "แบบฝึกหัด", value: "50 ข้อ" },
            { icon: TrendingUp, label: "ตัวอย่างโจทย์", value: "มากมาย" },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="glass-card rounded-2xl p-6 text-center">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
