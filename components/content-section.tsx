"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Lightbulb, Target } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "เนื้อหาครบถ้วน",
    description: "เรียนรู้ทฤษฎีและหลักการของฟังก์ชันขั้นบันไดและฟังก์ชันเอกซ์โพเนนเชียลอย่างละเอียด",
  },
  {
    icon: Target,
    title: "ตัวอย่างโจทย์",
    description: "ฝึกทำโจทย์พร้อมวิธีทำอย่างละเอียด เข้าใจง่าย ทำได้จริง",
  },
  {
    icon: Lightbulb,
    title: "แบบฝึกหัดหลากหลาย",
    description: "ทดสอบความเข้าใจด้วยแบบฝึกหัด 50 ข้อ พร้อมระบบตรวจคำตอบอัตโนมัติ",
  },
]

export function ContentSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 math-grid opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-foreground">เนื้อหา</span>
            <span className="text-primary">ภายในเว็บไซต์</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            เว็บไซต์นี้รวบรวมเนื้อหาเกี่ยวกับฟังก์ชันทางคณิตศาสตร์ที่สำคัญ พร้อมเครื่องมือช่วยเรียนรู้ที่หลากหลาย
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card rounded-2xl p-8 h-full group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
