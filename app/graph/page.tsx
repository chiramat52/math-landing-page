"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calculator, Activity, Hash, MousePointer2 } from "lucide-react"

export default function GraphPlayground() {
  const [inputX, setInputX] = useState<number>(0)
  const [inputY, setInputY] = useState<number>(0)
  const [functionType, setFunctionType] = useState<"step" | "exponential">("step")

  // คำนวณค่า Y ตามฟังก์ชัน
  const calculateResultY = (x: number) => {
    if (functionType === "step") {
      // โจทย์ค่าจอดรถ f(x) = 20⌈x⌉
      return 20 * Math.ceil(x) 
    }
    // f(x) = 2^x
    return Math.pow(2, x) 
  }

  const resultY = calculateResultY(inputX)

  // สร้างเส้นกราฟจำลอง (0 - 5)
  const graphPath = useMemo(() => {
    const points = []
    const step = 0.1
    for (let i = 0; i <= 5.1; i += step) {
      points.push({ x: i * 20, y: calculateResultY(i) })
    }
    return points
  }, [functionType])

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 max-w-6xl mx-auto">
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-cyan-400 mb-2"
          >
            <Activity size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Interactive Visualizer</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase">
            Graph <span className="text-cyan-500">Playground</span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* กรอบควบคุม (Control Panel) */}
          <section className="space-y-6">
            <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-cyan-500" size={20} /> ตั้งค่าตัวแปร
              </h2>
              
              <div className="space-y-6">
                {/* Switch Function */}
                <div className="flex p-1 bg-black rounded-2xl border border-white/5">
                  <button 
                    onClick={() => setFunctionType("step")}
                    className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${functionType === "step" ? "bg-cyan-500 text-black" : "text-white/50 hover:text-white"}`}
                  >STEP FUNCTION</button>
                  <button 
                    onClick={() => setFunctionType("exponential")}
                    className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${functionType === "exponential" ? "bg-cyan-500 text-black" : "text-white/50 hover:text-white"}`}
                  >EXPONENTIAL</button>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div className="group">
                    <label className="text-[10px] text-white/40 uppercase font-bold mb-2 flex items-center gap-1 group-focus-within:text-cyan-500 transition-colors">
                      <Hash size={12} /> Input แกน X (0 - 5)
                    </label>
                    <input 
                      type="number" step="0.1" value={inputX}
                      onChange={(e) => setInputX(Number(e.target.value))}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:border-cyan-500 outline-none transition-all font-mono text-xl"
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] text-white/40 uppercase font-bold mb-2 flex items-center gap-1 group-focus-within:text-cyan-500 transition-colors">
                      <Hash size={12} /> Input แกน Y
                    </label>
                    <input 
                      type="number" value={inputY}
                      onChange={(e) => setInputY(Number(e.target.value))}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:border-cyan-500 outline-none transition-all font-mono text-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className={`p-6 rounded-3xl border transition-all ${Math.abs(inputY - resultY) < 0.1 ? "bg-cyan-500/10 border-cyan-500/50" : "bg-red-500/10 border-red-500/50"}`}>
              <p className="text-[10px] font-bold uppercase mb-1 opacity-60">Coordinate Status</p>
              <p className="text-sm font-bold">
                {Math.abs(inputY - resultY) < 0.1 ? "✓ พิกัดอยู่บนเส้นกราฟ" : "✕ พิกัดไม่อยู่บนเส้นกราฟ"}
              </p>
            </div>
          </section>

          {/* กรอบกราฟ (Graph Visualizer) */}
          <section className="lg:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-12 relative z-10">
              <h2 className="text-lg font-bold flex items-center gap-2 italic">
                <MousePointer2 className="text-cyan-500" size={20} /> Graph Visualization
              </h2>
              <div className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full border border-cyan-500/20">
                CURRENT Y: {resultY.toFixed(3)}
              </div>
            </div>

            {/* Cartesian Grid Area */}
            <div className="relative w-full h-[400px] border-l border-b border-white/20 mt-4 ml-6">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:40px_40px]" />
              
              {/* Axis Labels */}
              <span className="absolute -left-8 top-0 text-[10px] font-mono text-white/30 uppercase tracking-tighter">max</span>
              <span className="absolute -left-8 bottom-0 text-[10px] font-mono text-white/30 uppercase tracking-tighter">min</span>
              <span className="absolute -bottom-8 right-0 text-[10px] font-mono text-white/30 uppercase">Axis X</span>

              {/* เส้นกราฟจำลอง */}
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                <path 
                  d={graphPath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x}% ${100 - (p.y / (functionType === 'step' ? 1.2 : 0.32))}%`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-cyan-500/20"
                />
              </svg>

              {/* จุดคำนวณจากฟังก์ชัน (Blue Glow) */}
              <motion.div 
                animate={{ 
                  left: `${(inputX / 5) * 100}%`, 
                  bottom: `${(resultY / (functionType === 'step' ? 120 : 32)) * 100}%` 
                }}
                className="absolute w-4 h-4 bg-cyan-400 rounded-full -translate-x-1/2 translate-y-1/2 z-20 shadow-[0_0_20px_#22d3ee]"
              >
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[8px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
                  RESULT ({inputX}, {resultY.toFixed(1)})
                </div>
              </motion.div>

              {/* จุดที่ผู้ใช้ป้อน (User Point - Red) */}
              <motion.div 
                animate={{ 
                  left: `${(inputX / 5) * 100}%`, 
                  bottom: `${(inputY / (functionType === 'step' ? 120 : 32)) * 100}%` 
                }}
                className="absolute w-3 h-3 bg-red-500 rounded-full -translate-x-1/2 translate-y-1/2 z-30 ring-4 ring-red-500/20"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[8px] font-bold px-2 py-1 rounded-md whitespace-nowrap">
                  USER ({inputX}, {inputY})
                </div>
              </motion.div>

              {/* Vertical Guide Line */}
              <motion.div 
                animate={{ left: `${(inputX / 5) * 100}%` }}
                className="absolute top-0 bottom-0 w-px bg-white/10 border-l border-dashed border-white/20"
              />
            </div>

            {/* Legend */}
            <div className="mt-12 flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" />
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Function Graph</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Your Input</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      
      <style jsx global>{`
        .bg-grid-white {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
        }
      `}</style>
    </main>
  )
}