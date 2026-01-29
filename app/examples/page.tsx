"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, GraduationCap } from "lucide-react"

// --- 1. ข้อมูลสมบัติเลขยกกำลัง (Exponential Properties) ---
const exponentialProperties = [
  { id: "1", title: "การคูณ (ฐานเดียวกัน)", formula: "aᵐ × aⁿ = aᵐ⁺ⁿ", note: "นำเลขชี้กำลังมาบวกกัน" },
  { id: "2", title: "การหาร (ฐานเดียวกัน)", formula: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ", note: "นำเลขชี้กำลังมาลบกัน" },
  { id: "3", title: "เลขยกกำลังซ้อน", formula: "(aᵐ)ⁿ = aᵐˣⁿ", note: "นำเลขชี้กำลังมาคูณกัน" },
  { id: "4", title: "เลขยกกำลังของผลคูณ", formula: "(ab)ⁿ = aⁿbⁿ", note: "กระจายเลขชี้กำลังเข้าทุกตัว" },
  { id: "5", title: "เลขยกกำลังของผลหาร", formula: "(a/b)ⁿ = aⁿ/bⁿ", note: "กระจายเลขชี้กำลังเข้าทุกตัว" },
  { id: "6", title: "เลขชี้กำลังเป็นศูนย์", formula: "a⁰ = 1", note: "เมื่อ a ≠ 0" },
  { id: "7", title: "เลขชี้กำลังเป็นลบ", formula: "a⁻ⁿ = 1/aⁿ", note: "เขียนเป็นส่วนกลับ" },
]

// --- 2. โจทย์ตัวอย่างฟังก์ชันขั้นบันได (Real-world Examples) ---
const stepFunctionExamples = [
  {
    id: 1,
    question: "โจทย์ค่าจอดรถ: ชั่วโมงละ 20 บาท เศษของชั่วโมงนับเป็น 1 ชม. (f(x)=20⌈x⌉) จอดรถนาน 1 ชม. 15 นาที ต้องจ่ายกี่บาท?",
    solution: `【วิธีทำ】
1. เวลาจอด 1 ชม. 15 นาที = 1.25 ชั่วโมง
2. ใช้สูตร f(x) = 20 × ⌈x⌉
3. f(1.25) = 20 × ⌈1.25⌉
4. ⌈1.25⌉ ปัดขึ้นเป็น 2 (เพราะเศษของชม.นับเป็น 1 ชม.)
5. 20 × 2 = 40 บาท`,
    answer: "40 บาท",
  },
  {
    id: 2,
    question: "โจทย์ค่าส่งพัสดุ: หนักไม่เกิน 1 กก. (30บ.), >1-2 กก. (50บ.) หากพัสดุหนัก 1.5 กก. จะเสียค่าส่งกี่บาท?",
    solution: `【วิธีทำ】
1. พิจารณาน้ำหนัก x = 1.5 กก.
2. ตรวจสอบช่วง: 1 < 1.5 ≤ 2
3. ตามเงื่อนไข ช่วงนี้คิดราคา 50 บาท`,
    answer: "50 บาท",
  },
  {
    id: 3,
    question: "โจทย์ภาษีเงินได้: รายได้ส่วนที่เกิน 100,000 บาทแรก เสียภาษี 5% หากมีรายได้ 120,000 บาท ต้องเสียภาษีกี่บาท?",
    solution: `【วิธีทำ】
1. รายได้ x = 120,000 บาท
2. ส่วนที่เกินจาก 100,000 คือ 20,000 บาท
3. คำนวณภาษี: 20,000 × 5% (0.05)
4. 20,000 × 0.05 = 1,000 บาท`,
    answer: "1,000 บาท",
  },
]

// --- 3. โจทย์ตัวอย่างฟังก์ชันเอกซ์โพเนนเชียล ---
const exponentialExamples = [
  {
    id: 1,
    question: "จงหาค่าของ (2³)²",
    solution: `【ใช้สมบัติ: (aᵐ)ⁿ = aᵐˣⁿ】
1. (2³)² = 2^(3×2)
2. 2⁶ = 64`,
    answer: "64",
  },
  {
    id: 2,
    question: "จงหาค่าของ 5⁻²",
    solution: `【ใช้สมบัติ: a⁻ⁿ = 1/aⁿ】
1. 5⁻² = 1/5²
2. 1/25 = 0.04`,
    answer: "0.04",
  },
]

function ExampleCard({ example, index }: { example: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-card rounded-xl overflow-hidden mb-4 border border-border/50">
      <div className="p-5">
        <p className="font-medium text-foreground mb-3">{example.id}. {example.question}</p>
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-primary text-sm font-semibold mb-2">
          <Lightbulb size={16} /> {isOpen ? "ซ่อนวิธีทำ" : "ดูวิธีทำ"}
        </button>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="pt-3 border-t border-border/50">
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-secondary/20 p-4 rounded-lg">{example.solution}</pre>
            <p className="mt-2 text-sm">คำตอบ: <span className="text-accent font-bold">{example.answer}</span></p>
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
          <h1 className="text-4xl font-bold mb-4">ตัวอย่าง<span className="text-primary">โจทย์</span></h1>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setActiveTab("step")} className={`px-8 py-2 rounded-full border transition-all ${activeTab === "step" ? "bg-primary/20 border-primary text-primary" : "border-border text-muted-foreground"}`}>ฟังก์ชันขั้นบันได</button>
            <button onClick={() => setActiveTab("exponential")} className={`px-8 py-2 rounded-full border transition-all ${activeTab === "exponential" ? "bg-primary/20 border-primary text-primary" : "border-border text-muted-foreground"}`}>ฟังก์ชันเอกซ์โพเนนเชียล</button>
          </div>
        </header>

        {activeTab === "exponential" && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <GraduationCap size={24} />
              <h2 className="text-2xl font-bold">สมบัติเลขยกกำลัง</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exponentialProperties.map((prop) => (
                <div key={prop.id} className="glass p-4 rounded-xl border border-primary/20">
                  <p className="text-xs text-primary font-bold mb-1">{prop.title}</p>
                  <p className="text-lg font-mono font-bold text-foreground mb-1">{prop.formula}</p>
                  <p className="text-xs text-muted-foreground">{prop.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center gap-2 mb-6 text-primary">
            <BookOpen size={24} />
            <h2 className="text-2xl font-bold">โจทย์และวิธีทำ</h2>
          </div>
          {activeTab === "step" ? (
            stepFunctionExamples.map((ex, i) => <ExampleCard key={ex.id} example={ex} index={i} />)
          ) : (
            exponentialExamples.map((ex, i) => <ExampleCard key={ex.id} example={ex} index={i} />)
          )}
        </section>
      </div>
      <Footer />
    </main>
  )
}