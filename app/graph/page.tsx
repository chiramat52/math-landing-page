"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calculator, Activity, Hash, MousePointer2, Zap } from "lucide-react"

export default function GraphPlayground() {
  const [inputX, setInputX] = useState<number>(0)
  const [inputY, setInputY] = useState<number>(0)
  const [functionType, setFunctionType] = useState<"step" | "exponential">("step")

  const RANGE = 80 // ขอบเขตแกนพิกัด -80 ถึง 80

  const calculateResultY = (x: number) => {
    if (functionType === "step") {
      return 20 * Math.ceil(x / 10) // ฟังก์ชันขั้นบันไดสเกลใหญ่
    }
    return Math.pow(1.1, x) // ฟังก์ชันเอกซ์โพเนนเชียลพื้นฐาน
  }

  const resultY = calculateResultY(inputX)
  const mapToPercent = (val: number) => ((val + RANGE) / (RANGE * 2)) * 100

  return (
    <main className="min-h-screen bg-[#020202] text-cyan-50 font-sans selection:bg-cyan-500/30">
      <Navbar />
      <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
        <header className="mb-12 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-5xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500">
            Graph <span className="text-cyan-500">Playground</span>
          </h1>
          <p className="text-cyan-500/60 text-xs font-bold tracking-[0.3em] mt-2">COORDINATE ANALYSIS SYSTEM V2.0</p>
        </header>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* ช่องกรอกข้อมูลแยกส่วน (Input Panels) */}
          <aside className="space-y-4">
            <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
              <h2 className="text-[10px] font-black mb-6 text-cyan-400 tracking-widest flex items-center gap-2">
                <Calculator size={14} /> SYSTEM INPUT
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
                  <button onClick={() => setFunctionType("step")} className={`py-2 text-[9px] font-black rounded-md ${functionType === "step" ? "bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]" : "text-white/40"}`}>STEP</button>
                  <button onClick={() => setFunctionType("exponential")} className={`py-2 text-[9px] font-black rounded-md ${functionType === "exponential" ? "bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]" : "text-white/40"}`}>EXP</button>
                </div>

                <div className="space-y-4">
                  <div className="group">
                    <label className="text-[9px] text-cyan-500/60 font-black mb-2 block uppercase">Input X (-80 to 80)</label>
                    <input type="number" value={inputX} onChange={(e) => setInputX(Number(e.target.value))} className="w-full bg-black border border-cyan-500/30 rounded-lg px-4 py-3 text-xl font-mono text-cyan-100 outline-none focus:border-cyan-400" />
                  </div>
                  <div className="group">
                    <label className="text-[9px] text-cyan-500/60 font-black mb-2 block uppercase">Input Y (-80 to 80)</label>
                    <input type="number" value={inputY} onChange={(e) => setInputY(Number(e.target.value))} className="w-full bg-black border border-cyan-500/30 rounded-lg px-4 py-3 text-xl font-mono text-cyan-100 outline-none focus:border-cyan-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 transition-all ${Math.abs(inputY - resultY) < 1 ? "bg-cyan-500/10 border-cyan-500" : "bg-red-500/10 border-red-500/50"}`}>
              <p className="text-[8px] font-black opacity-60">ANALYSIS STATUS</p>
              <p className="text-xs font-bold">{Math.abs(inputY - resultY) < 1 ? "COORDINATE MATCHED ✓" : "COORDINATE MISMATCH ✕"}</p>
            </div>
          </aside>

          {/* ส่วนแสดงผลกราฟพิกัดฉาก (Graph Grid) */}
          <section className="lg:col-span-3 bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-8 relative overflow-hidden min-h-[500px]">
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h2 className="text-sm font-black flex items-center gap-2 italic tracking-tighter text-cyan-400">
                <Zap size={16} /> DYNAMIC_COORDINATE_GRID
              </h2>
              <div className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 px-4 py-2 rounded-md">
                TARGET_Y: {resultY.toFixed(2)}
              </div>
            </div>

            {/* พิกัดฉาก 4 จตุภาค */}
            <div className="relative w-full aspect-video bg-black rounded border border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              {/* แกน X และ Y (เส้นพิกัดกลาง) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                <div className="h-full w-px bg-cyan-500/40 absolute shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              </div>

              {/* เลเบลระบุค่าสูงสุดต่ำสุด 80 */}
              <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[8px] font-mono text-cyan-500/50">+80Y</span>
              <span className="absolute left-1/2 bottom-2 -translate-x-1/2 text-[8px] font-mono text-cyan-500/50">-80Y</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] font-mono text-cyan-500/50">-80X</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-mono text-cyan-500/50">+80X</span>

              {/* จุดคำนวณจริง (สีฟ้า) */}
              <motion.div animate={{ left: `${mapToPercent(inputX)}%`, top: `${100 - mapToPercent(resultY)}%` }} className="absolute w-4 h-4 z-20">
                <div className="w-full h-full bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_#22d3ee]" />
              </motion.div>

              {/* จุดที่ผู้ใช้ป้อน (สีแดง) */}
              <motion.div animate={{ left: `${mapToPercent(inputX)}%`, top: `${100 - mapToPercent(inputY)}%` }} className="absolute w-3 h-3 bg-red-500 rounded-full z-30 shadow-[0_0_15px_#ef4444]" />

              {/* เส้นตัด HUD */}
              <motion.div animate={{ left: `${mapToPercent(inputX)}%` }} className="absolute top-0 bottom-0 w-px bg-cyan-500/20 border-l border-dashed border-cyan-500/40" />
              <motion.div animate={{ top: `${100 - mapToPercent(inputY)}%` }} className="absolute left-0 right-0 h-px bg-red-500/20 border-t border-dashed border-red-500/40" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}