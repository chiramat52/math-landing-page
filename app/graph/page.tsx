"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calculator, Activity, Hash, MousePointer2, Box, Zap } from "lucide-react"

export default function GraphPlayground() {
  const [inputX, setInputX] = useState<number>(0)
  const [inputY, setInputY] = useState<number>(0)
  const [functionType, setFunctionType] = useState<"step" | "exponential">("step")

  // ขอบเขตของแกน (Range: -80 to 80)
  const RANGE = 80

  // ฟังก์ชันคำนวณค่า Y ตามประเภทที่เลือก
  const calculateResultY = (x: number) => {
    if (functionType === "step") {
      // ตัวอย่างฟังก์ชันขั้นบันได: f(x) = 20 * ceil(x/10) เพื่อให้รับกับสเกล 80
      return 20 * Math.ceil(x / 10) 
    }
    // ตัวอย่างฟังก์ชันเอกซ์โพเนนเชียล: f(x) = 1.1^x (ใช้ฐานน้อยลงเพื่อให้กราฟไม่พุ่งทะลุสเกล 80 เร็วเกินไป)
    return Math.pow(1.1, x)
  }

  const resultY = calculateResultY(inputX)

  // แปลงค่าพิกัดคณิตศาสตร์เป็นเปอร์เซ็นต์บนหน้าจอ (Mapping -80...80 -> 0%...100%)
  const mapToPercent = (val: number) => ((val + RANGE) / (RANGE * 2)) * 100

  return (
    <main className="min-h-screen bg-[#020202] text-cyan-50 selection:bg-cyan-500/30 font-sans">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
        {/* Header HUD Style */}
        <header className="mb-12 border-l-4 border-cyan-500 pl-6 relative">
          <div className="absolute -left-1 top-0 h-full w-1 bg-cyan-400 blur-sm" />
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-cyan-400 mb-1"
          >
            <Activity size={16} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">H.U.D. Virtual System v2.0</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-600">
            Graph <span className="text-cyan-500">Playground</span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Panel: Controls */}
          <aside className="space-y-6">
            <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
              <h2 className="text-sm font-black mb-6 flex items-center gap-2 text-cyan-400">
                <Box size={18} /> PARAMETER INPUT
              </h2>
              
              <div className="space-y-6">
                {/* Function Selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                  <button 
                    onClick={() => setFunctionType("step")}
                    className={`py-2 text-[10px] font-black rounded-lg transition-all ${functionType === "step" ? "bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]" : "text-white/40 hover:bg-white/5"}`}
                  >STEP</button>
                  <button 
                    onClick={() => setFunctionType("exponential")}
                    className={`py-2 text-[10px] font-black rounded-lg transition-all ${functionType === "exponential" ? "bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]" : "text-white/40 hover:bg-white/5"}`}
                  >EXP</button>
                </div>

                {/* Number Inputs */}
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-[9px] text-cyan-500/60 font-black uppercase mb-2 block tracking-widest">Axis X Range (-80...80)</label>
                    <input 
                      type="number" min="-80" max="80" step="1" value={inputX}
                      onChange={(e) => setInputX(Number(e.target.value))}
                      className="w-full bg-black border border-cyan-500/30 rounded-lg px-4 py-3 focus:border-cyan-400 outline-none transition-all font-mono text-xl text-cyan-100"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-[9px] text-cyan-500/60 font-black uppercase mb-2 block tracking-widest">Axis Y Range (-80...80)</label>
                    <input 
                      type="number" min="-80" max="80" step="1" value={inputY}
                      onChange={(e) => setInputY(Number(e.target.value))}
                      className="w-full bg-black border border-cyan-500/30 rounded-lg px-4 py-3 focus:border-cyan-400 outline-none transition-all font-mono text-xl text-cyan-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status Feedback */}
            <div className={`p-4 rounded-xl border-2 transition-all ${Math.abs(inputY - resultY) < 1 ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]" : "bg-red-500/10 border-red-500/50"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full animate-ping ${Math.abs(inputY - resultY) < 1 ? "bg-cyan-400" : "bg-red-500"}`} />
                <div>
                  <p className="text-[8px] font-black uppercase opacity-60">Sync Status</p>
                  <p className="text-xs font-bold tracking-tight">
                    {Math.abs(inputY - resultY) < 1 ? "COORDINATE MATCHED" : "COORDINATE MISMATCH"}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Center/Right Panel: 4-Quadrant Graph */}
          <section className="lg:col-span-3 bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-sm font-black flex items-center gap-2 italic tracking-tighter">
                <Zap className="text-cyan-500" size={16} /> DATA_VISUALIZATION_GRID
              </h2>
              <div className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 px-4 py-2 rounded-md">
                TARGET_Y: {resultY.toFixed(2)}
              </div>
            </div>

            {/* The Grid */}
            <div className="relative w-full aspect-square md:aspect-video bg-black rounded border border-white/5 overflow-hidden">
              {/* Complex Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
              
              {/* Main Axes (Center Lines) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.5)]" /> {/* Axis X */}
                <div className="h-full w-px bg-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.5)] absolute" /> {/* Axis Y */}
              </div>

              {/* Axis Markers */}
              <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[8px] font-mono text-cyan-500/50">+80Y</span>
              <span className="absolute left-1/2 bottom-2 -translate-x-1/2 text-[8px] font-mono text-cyan-500/50">-80Y</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] font-mono text-cyan-500/50">-80X</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-mono text-cyan-500/50">+80X</span>

              {/* Data Point: Result (Cyan Glow) */}
              <motion.div 
                animate={{ 
                  left: `${mapToPercent(inputX)}%`, 
                  top: `${100 - mapToPercent(resultY)}%` 
                }}
                className="absolute w-4 h-4 z-20"
              >
                <div className="w-full h-full bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_#22d3ee]" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[8px] font-black px-2 py-0.5 rounded italic whitespace-nowrap">
                   F(x) {resultY.toFixed(1)}
                </div>
              </motion.div>

              {/* Data Point: User Input (Red Dot) */}
              <motion.div 
                animate={{ 
                  left: `${mapToPercent(inputX)}%`, 
                  top: `${100 - mapToPercent(inputY)}%` 
                }}
                className="absolute w-3 h-3 bg-red-500 rounded-full z-30 shadow-[0_0_15px_#ef4444]"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[7px] font-black px-2 py-0.5 rounded whitespace-nowrap">
                   USER ({inputX}, {inputY})
                </div>
              </motion.div>

              {/* HUD Crosshair */}
              <motion.div 
                animate={{ left: `${mapToPercent(inputX)}%` }}
                className="absolute top-0 bottom-0 w-px bg-cyan-500/20 border-l border-dashed border-cyan-500/40"
              />
              <motion.div 
                animate={{ top: `${100 - mapToPercent(inputY)}%` }}
                className="absolute left-0 right-0 h-px bg-red-500/20 border-t border-dashed border-red-500/40"
              />
            </div>

            {/* Tech Legend */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/5 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Function Target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
                <span className="text-[8px] font-black uppercase tracking-widest text-white/40">User Coordinate</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}