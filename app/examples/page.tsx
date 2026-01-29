"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, TrendingUp, ChevronDown, CheckCircle, Lightbulb, Move, Package, Receipt, Car, Zap, Building2, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Example { id: string; title: string; level: "ง่าย" | "ปานกลาง" | "ยาก"; icon: any; problem: string; context?: string; steps: string[]; answer: string; formula?: string }

const stepFunctionExamples: Example[] = [
  { id: "step-1", title: "ค่าจอดรถ", level: "ง่าย", icon: Building2, problem: "จอดรถ 3 ชม. 15 นาที จ่ายเท่าไร?", context: "ฟรี 2 ชม. แรก, ชม. ต่อไป 20บ. (เศษนับเป็น 1 ชม.)", steps: ["ฟรี 2 ชม. เหลือ 1 ชม. 15 นาที", "ปัดเศษเป็น 2 ชม.", "2 * 20 = 40 บาท"], answer: "40 บาท" },
  { id: "step-2", title: "พัสดุหนัก 2.5kg", level: "ง่าย", icon: Package, problem: "ส่งพัสดุ 2.5kg จ่ายเท่าไร?", context: "1-2kg=35฿, 2-3kg=50฿", steps: ["2.5 อยู่ในช่วง 2 < x ≤ 3", "ราคา 50 บาท"], answer: "50 บาท" },
  { id: "step-3", title: "ภาษีเงินได้", level: "ยาก", icon: Receipt, problem: "รายได้ 350,000 เสียภาษีเท่าไร?", context: "0-150k ยกเว้น, 150-300k (5%), 300k+ (10%)", steps: ["0 + (150,000 * 5%) + (50,000 * 10%)", "7,500 + 5,000"], answer: "12,500 บาท" },
  // ... (คุณสามารถเพิ่มให้ครบ 10-20 ข้อได้ตามแพทเทิร์นนี้)
]

const exponentialExamples: Example[] = [
  { id: "expo-1", title: "เลื่อนแนวตั้ง (k)", level: "ปานกลาง", icon: Move, problem: "f(x) = 2ˣ + 3 เลื่อนอย่างไร?", steps: ["ค่า k = +3", "เลื่อนจุดทุกจุดขึ้น 3 หน่วย"], answer: "เลื่อนขึ้น 3 หน่วย" },
  { id: "expo-2", title: "เลื่อนแนวนอน (h)", level: "ปานกลาง", icon: Move, problem: "f(x) = 2ˣ⁻⁵ เลื่อนอย่างไร?", steps: ["ในรูป (x-h), h = 5", "เลื่อนจุดทุกจุดไปทางขวา 5 หน่วย"], answer: "ขวา 5 หน่วย" },
  { id: "expo-3", title: "ดอกเบี้ยทบต้น", level: "ยาก", icon: TrendingUp, problem: "ฝาก 50,000 ดอกเบี้ย 5% ทบต้น 3 ปี", steps: ["A = 50,000(1.05)³", "A ≈ 57,881.25"], answer: "57,881.25 บาท" }
]

function ExampleAccordion({ example, colorClass }: { example: Example, colorClass: "cyan" | "violet" }) {
  const [isOpen, setIsOpen] = useState(false)
  const accent = colorClass === "cyan" ? "text-cyan-400" : "text-violet-400"
  const bg = colorClass === "cyan" ? "bg-cyan-500/10" : "bg-violet-500/10"
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-white/10 mb-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 flex items-start gap-4 hover:bg-white/5 transition-colors">
        <div className={`p-2 rounded-lg ${bg} ${accent}`}><example.icon size={20} /></div>
        <div className="flex-1">
          <Badge variant="outline" className="text-[10px] mb-1">{example.level}</Badge>
          <h3 className="font-semibold text-sm">{example.title}</h3>
        </div>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-4 pb-4 border-t border-white/5 space-y-4 pt-4">
            <p className="text-sm font-bold">โจทย์: {example.problem}</p>
            {example.context && <p className="text-xs text-muted-foreground italic">{example.context}</p>}
            <div className="space-y-1">{example.steps.map((s, i) => <p key={i} className="text-xs text-muted-foreground font-mono">{i+1}. {s}</p>)}</div>
            <div className={`p-3 rounded-lg ${bg} border border-white/10 text-sm font-bold flex items-center gap-2`}><CheckCircle size={16} /> ตอบ: {example.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-4xl font-bold text-center mb-16 uppercase italic">Lesson <span className="text-primary">Examples</span></h1>
        <div className="grid lg:grid-cols-2 gap-12">
          <section>
            <div className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border-l-4 border-cyan-500 mb-6"><Activity className="text-cyan-400" /> <h2 className="text-xl font-bold">Step Functions</h2></div>
            {stepFunctionExamples.map(ex => <ExampleAccordion key={ex.id} example={ex} colorClass="cyan" />)}
          </section>
          <section>
            <div className="flex items-center gap-3 p-4 bg-violet-500/10 rounded-xl border-l-4 border-violet-500 mb-6"><TrendingUp className="text-violet-400" /> <h2 className="text-xl font-bold">Exponential</h2></div>
            {exponentialExamples.map(ex => <ExampleAccordion key={ex.id} example={ex} colorClass="violet" />)}
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}