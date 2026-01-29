"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calculator, Activity, TrendingUp } from "lucide-react"

export default function GraphPlayground() {
  const [inputX, setInputX] = useState<number>(0)
  const [functionType, setFunctionType] = useState<"step" | "exponential">("step")

  // คำนวณค่า Y
  const calculateY = (x: number) => {
    if (functionType === "step") {
      return 20 * Math.ceil(x) // โจทย์ค่าจอดรถ
    }
    return Math.pow(2, x) // f(x) = 2ˣ
  }

  // สร้างข้อมูลสำหรับวาดกราฟจำลอง (x ตั้งแต่ 0 ถึง 5)
  const graphData = useMemo(() => {
    const points = []
    for (let i = 0; i <= 5; i += 0.5) {
      points.push({ x: i, y: calculateY(i) })
    }
    return points
  }, [functionType])

  const currentY = calculateY(inputX)

  return (
    <main className="min-h-screen bg-background math-grid">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Graph <span className="text-primary">Playground</span></h1>
          <p className="text-muted-foreground">ป้อนค่า x เพื่อดูการเปลี่ยนแปลงของกราฟและค่า y</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ส่วนควบคุม (Input) */}
          <div className="glass-card p-6 rounded-2xl border border-border/50">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Calculator className="text-primary" size={20} /> ตั้งค่าตัวแปร
            </h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setFunctionType("step")}
                  className={`flex-1 py-2 text-xs rounded-lg border transition-all ${functionType === "step" ? "bg-primary/20 border-primary text-primary" : "border-border"}`}
                >Step Function</button>
                <button 
                  onClick={() => setFunctionType("exponential")}
                  className={`flex-1 py-2 text-xs rounded-lg border transition-all ${functionType === "exponential" ? "bg-primary/20 border-primary text-primary" : "border-border"}`}
                >Exponential</button>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">ค่า x (0 - 5)</label>
                <input 
                  type="range" min="0" max="5" step="0.1"
                  value={inputX}
                  onChange={(e) => setInputX(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] mt-1 font-mono">
                  <span>0</span>
                  <span className="text-primary font-bold">x = {inputX}</span>
                  <span>5</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-[10px] text-primary font-bold uppercase mb-1">Current Value</p>
              <p className="text-3xl font-black">y = {currentY.toLocaleString()}</p>
            </div>
          </div>

          {/* ส่วนแสดงกราฟ (Visualizer) */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-border/50 relative min-h-[300px] flex items-end justify-between">
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Activity className="text-primary" size={18} />
              <span className="text-sm font-bold">Graph Visualization</span>
            </div>
            
            {/* เส้นตารางจำลอง */}
            <div className="absolute inset-x-6 inset-y-12 border-l border-b border-muted-foreground/20 flex flex-col justify-between italic text-[10px] text-muted-foreground/40">
                <span>max</span>
                <span>min</span>
            </div>

            {/* แท่งกราฟ */}
            {graphData.map((point, i) => {
              const heightBase = functionType === "step" ? 120 : 32
              const height = (point.y / heightBase) * 100
              const isCurrent = Math.abs(point.x - inputX) < 0.25

              return (
                <div key={i} className="relative flex flex-col items-center flex-1 h-full justify-end group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className={`w-full max-w-[15px] rounded-t-sm transition-colors ${isCurrent ? "bg-primary glow-cyan" : "bg-primary/20"}`}
                  />
                  <span className="text-[8px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-mono">{point.x}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}