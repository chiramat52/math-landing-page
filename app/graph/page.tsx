"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calculator, Activity, MousePointer2, RefreshCw } from "lucide-react"

export default function GraphPlayground() {
  const [points, setPoints] = useState<{x: number, y: number}[]>([])
  const [inputX, setInputX] = useState<string>("")
  const [inputY, setInputY] = useState<string>("")
  const [functionType, setFunctionType] = useState<"step" | "exponential">("step")

  const RANGE = 80
  const mapToPercent = (val: number) => ((val + RANGE) / (RANGE * 2)) * 100

  const addPoint = () => {
    if (inputX !== "" && inputY !== "") {
      setPoints([...points, { x: Number(inputX), y: Number(inputY) }])
      setInputX(""); setInputY("")
    }
  }

  return (
    <main className="min-h-screen bg-[#020202] text-cyan-50">
      <Navbar />
      <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="space-y-4">
            <div className="bg-[#0a0a0a] border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
              <h2 className="text-[10px] font-black mb-6 text-cyan-400 tracking-widest uppercase">Manual Data Input</h2>
              <div className="space-y-4">
                <div className="flex gap-2 p-1 bg-white/5 rounded-lg mb-4">
                  <button onClick={() => {setFunctionType("step"); setPoints([])}} className={`flex-1 py-2 text-[9px] font-bold rounded ${functionType === "step" ? "bg-cyan-500 text-black" : "text-white/40"}`}>STEP MODE</button>
                  <button onClick={() => {setFunctionType("exponential"); setPoints([])}} className={`flex-1 py-2 text-[9px] font-bold rounded ${functionType === "exponential" ? "bg-cyan-500 text-black" : "text-white/40"}`}>CURVE MODE</button>
                </div>
                <input type="number" placeholder="Input X (-80 to 80)" value={inputX} onChange={e => setInputX(e.target.value)} className="w-full bg-black border border-cyan-500/30 rounded-lg p-3 text-sm outline-none focus:border-cyan-400" />
                <input type="number" placeholder="Input Y (-80 to 80)" value={inputY} onChange={e => setInputY(e.target.value)} className="w-full bg-black border border-cyan-500/30 rounded-lg p-3 text-sm outline-none focus:border-cyan-400" />
                <button onClick={addPoint} className="w-full py-3 bg-cyan-500 text-black font-black rounded-lg text-xs shadow-[0_0_15px_#06b6d4]">PLOT POINT</button>
                <button onClick={() => setPoints([])} className="w-full py-2 border border-white/10 text-white/40 text-[10px] rounded-lg flex items-center justify-center gap-2"><RefreshCw size={12}/> RESET GRID</button>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3 bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-8 relative min-h-[500px]">
            <div className="relative w-full aspect-video bg-black rounded border border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-cyan-500/40" />
                <div className="h-full w-px bg-cyan-500/40 absolute" />
              </div>
              
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                {points.length > 1 && (
                  <path 
                    d={points.sort((a,b) => a.x - b.x).map((p, i, arr) => {
                      const xP = mapToPercent(p.x); const yP = 100 - mapToPercent(p.y);
                      if (i === 0) return `M ${xP}% ${yP}%`;
                      if (functionType === "step") {
                        const prevX = mapToPercent(arr[i-1].x);
                        return `H ${xP}% V ${yP}%`;
                      }
                      return `L ${xP}% ${yP}%`;
                    }).join(' ')}
                    fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray={functionType === "step" ? "0" : "0"} 
                  />
                )}
              </svg>

              {points.map((p, i) => (
                <div key={i} style={{ left: `${mapToPercent(p.x)}%`, top: `${100 - mapToPercent(p.y)}%` }} className="absolute w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#22d3ee]" />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}