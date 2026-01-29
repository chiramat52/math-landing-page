"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, TrendingUp, TrendingDown, Move, School } from "lucide-react"

// --- 1. ข้อมูลลักษณะกราฟฟังก์ชันเอกซ์โพเนนเชียล (ตามภาพประกอบ) ---
const exponentialConcepts = [
  { 
    id: "เพิ่ม", 
    title: "ฟังก์ชันเพิ่ม (a > 1)", 
    desc: "เมื่อค่า x เพิ่มขึ้น ค่า y จะเพิ่มขึ้นอย่างรวดเร็ว กราฟจะพุ่งขึ้นจากซ้ายไปขวา (f(x) = 3ˣ)",
    condition: "a > 1"
  },
  { 
    id: "ลด", 
    title: "ฟังก์ชันลด (0 < a < 1)", 
    desc: "เมื่อค่า x เพิ่มขึ้น ค่า y จะลดลงเข้าใกล้ศูนย์ กราฟจะลาดลงจากซ้ายไปขวา (g(x) = (1/3)ˣ)",
    condition: "0 < a < 1"
  }
]

// --- 2. กฎการเลื่อนกราฟ y = a^(x-h) + k (ตามสรุปเนื้อหา) ---
const shiftRules = [
  { type: "การเลื่อนตามแนวแกน Y (k)", pos: "เลื่อนจุดทุกจุดขึ้น k หน่วย (+k)", neg: "เลื่อนจุดทุกจุดลง k หน่วย (-k)" },
  { type: "การเลื่อนตามแนวแกน X (h)", pos: "เลื่อนจุดทุกจุดไปทางขวา h หน่วย (x-h)", neg: "เลื่อนจุดทุกจุดไปทางซ้าย h หน่วย (x+h)" }
]

// --- 3. โจทย์ตัวอย่างฟังก์ชันขั้นบันได ---
const stepFunctionExamples = [
  {
    id: 1,
    question: "ค่าจอดรถชม.ละ 20 บาท (เศษชม.นับเป็น 1 ชม.) จอดรถนาน 1 ชม. 15 นาที ต้องจ่ายกี่บาท?",
    solution: "ระยะเวลา 1.25 ชม. ใช้สูตร f(x) = 20 × ⌈x⌉ จะได้ 20 × ⌈1.25⌉ = 20 × 2 = 40 บาท",
    answer: "40 บาท"
  },
  {
    id: 2,
    question: "พัสดุหนัก 1.5 กก. จะเสียค่าส่งกี่บาท? (เกณฑ์: ไม่เกิน 1 กก. 30บ., >1-2 กก. 50บ.)",
    solution: "น้ำหนัก 1.5 กก. อยู่ในช่วง 1 < x ≤ 2 ดังนั้นจึงจ่ายตามเกณฑ์ราคา 50 บาท",
    answer: "50 บาท"
  }
]

// --- 4. โจทย์ตัวอย่างฟังก์ชันเอกซ์โพเนนเชียล (เน้นการเลื่อนกราฟ) ---
const exponentialExamples = [
  {
    id: 1,
    question: "กำหนด f(x) = 2ˣ จงหาว่า g(x) = 2ˣ + 1 เกิดจากการเลื่อนกราฟ f(x) อย่างไร?",
    solution: "ค่า k = +1 หมายถึงการเลื่อนจุดทุกจุดของกราฟ f(x) ขึ้นด้านบน 1 หน่วย",
    answer: "เลื่อนขึ้น 1 หน่วย"
  },
  {
    id: 2,
    question: "กราฟ h(x) = 2ˣ⁺¹ เกิดจากการเลื่อนกราฟ f(x) = 2ˣ อย่างไร?",
    solution: "ในรูป 2^(x-h) เมื่อเป็น (x+1) แสดงว่า h = -1 ดังนั้นกราฟเลื่อนไปทางซ้าย 1 หน่วย",
    answer: "เลื่อนไปทางซ้าย 1 หน่วย"
  }
]

function ConceptCard({ item }: { item: any }) {
  return (
    <div className="glass p-6 rounded-3xl border border-primary/10 hover:border-primary/30 transition-all shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          {item.id === "เพิ่ม" ? <TrendingUp className="text-accent" /> : <TrendingDown className="text-destructive" />}
        </div>
        <div>
          <h3 className="font-bold text-foreground">{item.title}</h3>
          <p className="text-[10px] font-mono text-primary font-bold uppercase">{item.condition}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
    </div>
  )
}

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState<"step" | "exponential">("step")

  return (
    <main className="min-h-screen bg-background math-grid">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ตัวอย่าง<span className="text-primary">บทเรียน</span></h1>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setActiveTab("step")} className={`px-8 py-2 rounded-full border transition-all ${activeTab === "step" ? "bg-primary/20 border-primary text-primary font-bold shadow-lg" : "border-border text-muted-foreground hover:border-primary/50"}`}>ฟังก์ชันขั้นบันได</button>
            <button onClick={() => setActiveTab("exponential")} className={`px-8 py-2 rounded-full border transition-all ${activeTab === "exponential" ? "bg-primary/20 border-primary text-primary font-bold shadow-lg" : "border-border text-muted-foreground hover:border-primary/50"}`}>ฟังก์ชันเอกซ์โพเนนเชียล</button>
          </div>
        </header>

        {activeTab === "exponential" ? (
          <section className="space-y-12">
            {/* กราฟเพิ่ม/ลด */}
            <div className="grid md:grid-cols-2 gap-6">
              {exponentialConcepts.map((item, i) => <ConceptCard key={i} item={item} />)}
            </div>
            
            

            {/* กฎการเลื่อนกราฟ */}
            <div className="glass p-8 rounded-3xl border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <Move className="text-primary" />
                <h3 className="text-xl font-bold">การเลื่อนกราฟ y = a⁽ˣ⁻ʰ⁾ + k</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                {shiftRules.map((rule, idx) => (
                  <div key={idx} className="space-y-3 text-xs">
                    <p className="font-black text-primary uppercase tracking-widest">{rule.type}</p>
                    <p className="text-muted-foreground">บวก (+): {rule.pos}</p>
                    <p className="text-muted-foreground">ลบ (-): {rule.neg}</p>
                  </div>
                ))}
              </div>
            </div>

            

            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 px-2"><BookOpen size={20} className="text-primary"/> ตะลุยโจทย์</h3>
              {exponentialExamples.map((ex, i) => (
                <div key={i} className="glass-card p-5 rounded-xl border border-border/50">
                  <p className="text-sm font-medium mb-2">{ex.id}. {ex.question}</p>
                  <pre className="text-xs text-muted-foreground bg-secondary/20 p-3 rounded-lg mb-2">{ex.solution}</pre>
                  <p className="text-xs font-bold text-accent">ตอบ: {ex.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="space-y-8">
            <div className="glass p-8 rounded-3xl border border-primary/10 flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4">ฟังก์ชันขั้นบันได (Step Function)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">คือฟังก์ชันที่มีค่าคงที่เป็นช่วงๆ กราฟจะมีลักษณะเป็นขั้นบันได มักใช้คำนวณอัตราค่าบริการตามเกณฑ์ต่างๆ</p>
               </div>
               
            </div>
            
            <div className="space-y-4">
              {stepFunctionExamples.map((ex, i) => (
                <div key={i} className="glass-card p-5 rounded-xl border border-border/50">
                  <p className="text-sm font-medium mb-2">{ex.id}. {ex.question}</p>
                  <pre className="text-xs text-muted-foreground bg-secondary/20 p-3 rounded-lg mb-2">{ex.solution}</pre>
                  <p className="text-xs font-bold text-accent">ตอบ: {ex.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  )
}