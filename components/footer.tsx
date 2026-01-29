"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="absolute inset-0 math-grid opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center"
            >
              <span className="text-primary font-mono text-sm">∑</span>
            </motion.div>
            <span className="text-lg font-semibold">
              Math<span className="text-primary">Tech</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              หน้าหลัก
            </Link>
            <Link href="/examples" className="hover:text-primary transition-colors">
              ตัวอย่างโจทย์
            </Link>
            <Link href="/exercises" className="hover:text-primary transition-colors">
              แบบฝึกหัด
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">© 2026 MathTech. สร้างเพื่อการเรียนรู้</p>
        </div>
      </div>
    </footer>
  )
}
