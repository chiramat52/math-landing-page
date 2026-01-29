"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LineChart, BarChart, Activity, Calculator } from "lucide-react"

export default function GraphPlayground() {
  const [inputX, setInputX] = useState<number>(0)
  const [functionType, setFunctionType] = useState<"step" | "exponential">("step")

  // คำนวณค่า Y ตามประเภทฟังก์ชัน
  const calculateY = () => {
    if (functionType === "step") {
      return 20 * Math.ceil(inputX) // อ้างอิงจากโจทย์ค่าจอดรถ f(x) = 20⌈x⌉
    }
    return Math.pow(2, inputX) // อ้างอิงจากฟังก์ชันเอกซ์โพเนนเชียลพื้นฐาน f(x) = 2ˣ
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Graph <span className="text-primary">Playground</span></h1>
          <p className="text-muted-foreground">ลองกรอกค่า x เพื่อดูการคำนวณค่า y ของแต่ละฟังก์ชัน</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="glass-card p-8 rounded-2xl border border-border/50">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="text-primary" /> ตั้งค่าตัวแปร
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">เลือกประเภทฟังก์ชัน</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setFunctionType("step")}
                    className={`flex-1 py-2 rounded-lg border transition-all ${functionType === "step" ? "bg-primary/20 border-primary text-primary" : "border-border"}`}
                  >ฟังก์ชันขั้นบันได</button>
                  <button 
                    onClick={() => setFunctionType("exponential")}
                    className={`flex-1 py-2 rounded-lg border transition-all ${functionType === "exponential" ? "bg-primary/20 border-primary text-primary" : "border-border"}`}
                  >เอกซ์โพเนนเชียล</button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">กรอกค่า x (Input)</label>
                <input 
                  type="number" 
                  value={inputX}
                  onChange={(e) => setInputX(Number(e.target.value))}
                  className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="glass-card p-8 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col justify-center items-center text-center">
            <p className="text-sm text-primary font-bold mb-2 uppercase tracking-widest">Result</p>
            <div className="text-6xl font-black text-foreground mb-4">
              {calculateY().toLocaleString()}
            </div>
            <p className="text-muted-foreground">
              เมื่อ x = {inputX} ค่าของ y จะเท่ากับ {calculateY()}
            </p>
            <div className="mt-8 p-4 bg-background/50 rounded-xl border border-border w-full font-mono text-xs">
              {functionType === "step" ? "f(x) = 20 * ceil(x)" : "f(x) = 2^x"}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}