"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calculator, Activity, Hash } from "lucide-react"

export default function GraphPlayground() {
  const [inputX, setInputX] = useState<number>(0)
  const [inputY, setInputY] = useState<number>(0)
  const [functionType, setFunctionType] = useState<"step" | "exponential">("step")

  // คำนวณค่า Y ตามประเภทฟังก์ชัน
  const calculateResultY = (x: number) => {
    if (functionType === "step") {
      return 20 * Math.ceil(x) // อ้างอิงโจทย์ค่าจอดรถ f(x) = 20⌈x⌉
    }
    return Math.pow(2, x) // f(x) = 2ˣ
  }

  const resultY = calculateResultY(inputX)

  return (
    <main className="min-h-screen bg-background math-grid">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Graph <span className="text-primary">Playground</span></h1>
          <p className="text-muted-foreground">ป้อนค่าพิกัด (x, y) เพื่อสำรวจความสัมพันธ์ของฟังก์ชัน</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* กรอบที่ 1: ส่วนควบคุมและเลือกฟังก์ชัน */}
          <div className="glass-card p-6 rounded-2xl border border-border/50 flex flex-col gap-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Calculator className="text-primary" size={20} /> ตั้งค่าฟังก์ชัน
            </h2>
            <div className="flex gap-2 p-1 bg-secondary/30 rounded-xl border border-border">
              <button 
                onClick={() => setFunctionType("step")}
                className={`flex-1 py-2 text-xs rounded-lg transition-all ${functionType === "step" ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-secondary"}`}
              >Step Function</button>
              <button 
                onClick={() => setFunctionType("exponential")}
                className={`flex-1 py-2 text-xs rounded-lg transition-all ${functionType === "exponential" ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-secondary"}`}
              >Exponential</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Hash size={12} /> ป้อนค่าแกน X
                </label>
                <input 
                  type="number" 
                  value={inputX}
                  onChange={(e) => setInputX(Number(e.target.value))}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-mono"
                  placeholder="ป้อนค่า x..."
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Hash size={12} /> ป้อนค่าแกน Y (สำหรับเปรียบเทียบ)
                </label>
                <input 
                  type="number" 
                  value={inputY}
                  onChange={(e) => setInputY(Number(e.target.value))}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all font-mono"
                  placeholder="ป้อนค่า y..."
                />
              </div>
            </div>
          </div>

          {/* กรอบที่ 2: ส่วนแสดงผลกราฟจำลอง */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-border/50 relative min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Activity className="text-primary" size={20} /> ระบบแกนพิกัดฉาก
              </h2>
              <div className="text-[10px] font-mono bg-primary/10 text-primary px-3 py-1 rounded-full">
                Function: {functionType === "step" ? "20 * ceil(x)" : "2^x"}
              </div>
            </div>

            {/* แกน X และ แกน Y */}
            <div className="relative w-full h-64 border-l-2 border-b-2 border-primary/30 mt-4 ml-8">
              {/* แกน Y Label */}
              <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-[10px] text-muted-foreground font-mono">
                <span>Y</span>
                <span>0</span>
              </div>
              {/* แกน X Label */}
              <div className="absolute -bottom-6 left-0 w-full flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>0</span>
                <span>X</span>
              </div>

              {/* จุดตัด (x, y) ที่ผู้ใช้ป้อน */}
              <motion.div 
                animate={{ left: `${Math.min(Math.max(inputX * 10, 0), 100)}%`, bottom: `${Math.min(Math.max(inputY / 2, 0), 100)}%` }}
                className="absolute w-4 h-4 bg-destructive rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_rgba(239,68,68,0.5)] z-10"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-destructive text-white text-[8px] px-2 py-1 rounded whitespace-nowrap">
                  User Point ({inputX}, {inputY})
                </div>
              </motion.div>

              {/* จุดคำนวณจากฟังก์ชัน (Result Y) */}
              <motion.div 
                animate={{ left: `${Math.min(Math.max(inputX * 10, 0), 100)}%`, bottom: `${Math.min(Math.max(resultY / 2, 0), 100)}%` }}
                className="absolute w-4 h-4 bg-primary rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] px-2 py-1 rounded whitespace-nowrap">
                  Function Result ({inputX}, {resultY})
                </div>
              </motion.div>

              {/* เส้นแนวทาง (Grid lines) */}
              <motion.div 
                animate={{ width: `${Math.min(Math.max(inputX * 10, 0), 100)}%` }}
                className="absolute bottom-0 left-0 h-px bg-primary/20 border-t border-dashed border-primary/50"
                style={{ bottom: `${Math.min(Math.max(resultY / 2, 0), 100)}%` }}
              />
            </div>

            <div className="mt-16 grid grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/20 rounded-xl border border-border">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">สถานะจุดพิกัด</p>
                <p className={`text-sm font-bold ${inputY === resultY ? "text-accent" : "text-destructive"}`}>
                  {inputY === resultY ? "✓ จุดอยู่บนกราฟพอดี" : "✕ จุดไม่อยู่บนเส้นกราฟ"}
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-[10px] text-primary uppercase mb-1">ค่าที่ควรจะเป็น</p>
                <p className="text-sm font-bold text-foreground">ถ้า x = {inputX} แล้ว y ต้องเป็น {resultY}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}