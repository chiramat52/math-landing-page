"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, GraduationCap, Info } from "lucide-react"

// --- 1. ข้อมูลสมบัติเลขยกกำลัง (Exponential Properties) สำหรับส่วนคำอธิบาย ---
const exponentialProperties = [
  { id: "1", title: "การคูณ (ฐานเดียวกัน)", formula: "aᵐ × aⁿ = aᵐ⁺ⁿ", desc: "ถ้านำเลขยกกำลังที่ฐานเหมือนกันมาคูณกัน ให้เอาเลขชี้กำลังมาบวกกัน" },
  { id: "2", title: "การหาร (ฐานเดียวกัน)", formula: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ", desc: "ถ้านำเลขยกกำลังที่ฐานเหมือนกันมาหารกัน ให้เอาเลขชี้กำลังมาลบกัน" },
  { id: "3", title: "เลขยกกำลังซ้อน", formula: "(aᵐ)ⁿ = aᵐˣⁿ", desc: "ถ้าเลขยกกำลังซ้อนกัน ให้นำเลขชี้กำลังมาคูณกัน" },
  { id: "4", title: "เลขยกกำลังของผลคูณ", formula: "(ab)ⁿ = aⁿbⁿ", desc: "สามารถกระจายเลขชี้กำลังเข้าไปในผลคูณได้ทุกตัว" },
  { id: "5", title: "เลขยกกำลังของผลหาร", formula: "(a/b)ⁿ = aⁿ/bⁿ", desc: "สามารถกระจายเลขชี้กำลังเข้าได้ทั้งเศษและส่วน" },
  { id: "6", title: "เลขชี้กำลังเป็นศูนย์", formula: "a⁰ = 1", desc: "จำนวนใดๆ (ยกเว้น 0) ยกกำลัง 0 จะมีค่าเท่ากับ 1 เสมอ" },
  { id: "7", title: "เลขชี้กำลังเป็นลบ", formula: "a⁻ⁿ = 1/aⁿ", desc: "ถ้าเลขชี้กำลังเป็นลบ ให้เขียนเป็นส่วนกลับเพื่อให้เลขชี้กำลังเป็นบวก" },
]

// --- 2. โจทย์ตัวอย่างฟังก์ชันขั้นบันได (เพิ่มโจทย์มากขึ้น) ---
const stepFunctionExamples = [
  {
    id: 1,
    question: "ค่าจอดรถชม.ละ 20 บาท (เศษชม.นับเป็น 1 ชม.) จอดนาน 1 ชม. 15 นาที ต้องจ่ายกี่บาท?",
    solution: "f(1.25) = 20 × ⌈1.25⌉ = 20 × 2 = 40 บาท",
    answer: "40 บาท"
  },
  {
    id: 2,
    question: "พัสดุหนัก 1.5 กก. จะเสียค่าส่งกี่บาท? (เกณฑ์: ไม่เกิน 1 กก. 30บ., >1-2 กก. 50บ.)",
    solution: "เนื่องจาก 1 < 1.5 ≤ 2 จึงตกอยู่ในช่วงราคา 50 บาท",
    answer: "50 บาท"
  },
  {
    id: 3,
    question: "รายได้ 120,000 บาท (ส่วนเกิน 100k แรกเสียภาษี 5%) ต้องเสียภาษีกี่บาท?",
    solution: "ส่วนเกินคือ 20,000 บาท ภาษี = 20,000 × 0.05 = 1,000 บาท",
    answer: "1,000 บาท"
  },
  {
    id: 4,
    question: "จอดรถตั้งแต่ 08:30 ถึง 10:45 น. (รวม 2.25 ชม.) ต้องจ่ายเท่าใด? (เกณฑ์เดิม)",
    solution: "f(2.25) = 20 × ⌈2.25⌉ = 20 × 3 = 60 บาท",
    answer: "60 บาท"
  },
  {
    id: 5,
    question: "ส่งพัสดุหนัก 2.1 กก. เสียค่าส่งเท่าใด? (เกณฑ์: >2-3 กก. 70บ.)",
    solution: "2.1 อยู่ในช่วงมากกว่า 2 แต่ไม่เกิน 3 กก. จึงเสีย 70 บาท",
    answer: "70 บาท"
  },
  {
    id: 6,
    question: "ถ้า f(x) = 20⌈x⌉ จอดรถนาน 4 ชม. เป๊ะๆ ต้องจ่ายเท่าใด?",
    solution: "f(4) = 20 × ⌈4⌉ = 20 × 4 = 80 บาท",
    answer: "80 บาท"
  },
  {
    id: 7,
    question: "รายได้ส่วนเกิน 100,000 บาท เสียภาษี 5% ถ้ามีรายได้ 105,000 บาท เสียภาษีเท่าใด?",
    solution: "ส่วนเกิน 5,000 ภาษี = 5,000 × 0.05 = 250 บาท",
    answer: "250 บาท"
  }
]

// --- 3. โจทย์ตัวอย่างฟังก์ชันเอกซ์โพเนนเชียล (เพิ่มโจทย์มากขึ้น) ---
const exponentialExamples = [
  {
    id: 1,
    question: "จงหาค่าของ 2³ × 2²",
    solution: "ใช้สมบัติการคูณ: 2^(3+2) = 2⁵ = 32",
    answer: "32"
  },
  {
    id: 2,
    question: "จงหาค่าของ 3⁷ ÷ 3⁵",
    solution: "ใช้สมบัติการหาร: 3^(7-5) = 3² = 9",
    answer: "9"
  },
  {
    id: 3,
    question: "จงหาค่าของ (2²)³",
    solution: "ใช้สมบัติเลขยกกำลังซ้อน: 2^(2×3) = 2⁶ = 64",
    answer: "64"
  },
  {
    id: 4,
    question: "จงหาค่าของ 5⁻²",
    solution: "ใช้สมบัติกำลังลบ: 1 / 5² = 1 / 25 = 0.04",
    answer: "0.04"
  },
  {
    id: 5,
    question: "จงหาค่าของ 1,000,000⁰",
    solution: "ใช้สมบัติกำลังศูนย์: ค่าใดๆ ยกกำลัง 0 ได้ 1 เสมอ",
    answer: "1"
  },
  {
    id: 6,
    question: "จงหาค่าของ (1/2)³",
    solution: "ใช้สมบัติกำลังผลหาร: 1³ / 2³ = 1 / 8 = 0.125",
    answer: "0.125"
  },
  {
    id: 7,
    question: "แก้สมการ 2ˣ = 32",
    solution: "32 = 2⁵ ดังนั้น x = 5",
    answer: "x = 5"
  }
]

function ExampleCard({ example, index }: { example: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="glass-card rounded-xl overflow-hidden mb-4 border border-border/50">
      <div className="p-5">
        <p className="font-medium text-foreground mb-3">{example.id}. {example.question}</p>
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-primary text-sm font-semibold mb-2 hover:underline transition-all">
          <Lightbulb size={16} /> {isOpen ? "ซ่อนวิธีทำ" : "ดูวิธีทำ"}
        </button>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="pt-3 border-t border-border/50">
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-secondary/20 p-4 rounded-lg leading-relaxed">{example.solution}</pre>
            <p className="mt-2 text-sm font-bold">คำตอบ: <span className="text-accent">{example.answer}</span></p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState<"step" | "exponential">("step")

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">คลัง<span className="text-primary">โจทย์ตัวอย่าง</span></h1>
          <p className="text-muted-foreground">รวมโจทย์และสมบัติสำคัญเพื่อเสริมสร้างความเข้าใจ</p>
          
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setActiveTab("step")} className={`px-8 py-2 rounded-full border transition-all ${activeTab === "step" ? "bg-primary/20 border-primary text-primary font-bold" : "border-border text-muted-foreground"}`}>ฟังก์ชันขั้นบันได</button>
            <button onClick={() => setActiveTab("exponential")} className={`px-8 py-2 rounded-full border transition-all ${activeTab === "exponential" ? "bg-primary/20 border-primary text-primary font-bold" : "border-border text-muted-foreground"}`}>ฟังก์ชันเอกซ์โพเนนเชียล</button>
          </div>
        </header>

        {activeTab === "exponential" && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 text-primary border-b border-primary/20 pb-2">
              <GraduationCap size={24} />
              <h2 className="text-2xl font-bold">สมบัติเลขยกกำลัง (Exponential Properties)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exponentialProperties.map((prop) => (
                <div key={prop.id} className="glass p-5 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">สมบัติที่ {prop.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{prop.title}</h3>
                  <p className="text-xl font-mono font-bold text-primary mb-2">{prop.formula}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{prop.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center gap-2 mb-6 text-primary border-b border-primary/20 pb-2">
            <BookOpen size={24} />
            <h2 className="text-2xl font-bold">ตัวอย่างโจทย์ฟังก์ชันขั้นบันได</h2>
          </div>
          <div className="grid gap-2">
            {activeTab === "step" ? (
              stepFunctionExamples.map((ex, i) => <ExampleCard key={ex.id} example={ex} index={i} />)
            ) : (
              exponentialExamples.map((ex, i) => <ExampleCard key={ex.id} example={ex} index={i} />)
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}