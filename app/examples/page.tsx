"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, TrendingUp, ChevronDown, CheckCircle, Lightbulb, Move, Package, Receipt, Car, Zap, Building2, CreditCard, Phone, Dna, Atom, PiggyBank, BarChart3, FlaskConical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Example { id: string; title: string; level: "ง่าย" | "ปานกลาง" | "ยาก"; icon: any; problem: string; context?: string; steps: string[]; answer: string }

const stepFunctionExamples: Example[] = [
  { id: "step-1", title: "Floor Function", level: "ง่าย", icon: Activity, problem: "จงหาค่า ⌊3.7⌋ และ ⌊-2.3⌋", steps: ["⌊3.7⌋ = 3", "⌊-2.3⌋ = -3"], answer: "3 และ -3" },
  { id: "step-2", title: "ค่าส่งพัสดุ", level: "ง่าย", icon: Package, problem: "พัสดุหนัก 2.5kg จ่ายเท่าไร?", context: "อัตรา: 0-1kg=20฿, 1-2kg=35฿, 2-3kg=50฿", steps: ["2.5 อยู่ในช่วง 2 < x ≤ 3 กก.", "ราคาตามเกณฑ์คือ 50 บาท"], answer: "50 บาท" },
  { id: "step-3", title: "ค่าจอดรถห้าง", level: "ปานกลาง", icon: Car, problem: "จอดรถ 3 ชม. 15 นาที จ่ายเท่าไร?", context: "ฟรี 2 ชม., ถัดไป 20บ. (เศษนับเป็น 1 ชม.)", steps: ["เกินฟรี 1 ชม. 15 นาที ปัดเป็น 2 ชม.", "จ่าย 2 * 20 = 40 บาท"], answer: "40 บาท" },
  // ... (ใส่ให้ครบ 15 ข้อตามรูปแบบนี้)
];

const exponentialExamples: Example[] = [
  { id: "expo-1", title: "พื้นฐานเลขกำลัง", level: "ง่าย", icon: TrendingUp, problem: "จงหาค่า 2⁵ และ 3⁴", steps: ["2⁵ = 32", "3⁴ = 81"], answer: "32 และ 81" },
  { id: "expo-4", title: "เลื่อนแนวตั้ง (k)", level: "ปานกลาง", icon: Move, problem: "f(x) = 2ˣ + 3 เลื่อนอย่างไร?", steps: ["ค่า k = +3", "เลื่อนกราฟขึ้น 3 หน่วย"], answer: "ขึ้น 3 หน่วย" },
  { id: "expo-5", title: "เลื่อนแนวนอน (h)", level: "ปานกลาง", icon: Move, problem: "f(x) = 2ˣ⁻⁵ เลื่อนอย่างไร?", steps: ["h = 5", "เลื่อนไปทางขวา 5 หน่วย"], answer: "ขวา 5 หน่วย" },
  // ... (ใส่ให้ครบ 15 ข้อตามรูปแบบนี้)
];

function ExampleAccordion({ example, colorClass }: { example: Example, colorClass: "cyan" | "violet" }) {
  const [isOpen, setIsOpen] = useState(false)
  const accent = colorClass === "cyan" ? "text-cyan-400" : "text-violet-400"
  const bg = colorClass === "cyan" ? "bg-cyan-500/10" : "bg-violet-500/10"
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-white/10 mb-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 flex items-start gap-4 hover:bg-white/5 transition-colors">
        <div className={`p-2 rounded-lg ${bg} ${accent}`}><example.icon size={20} /></div>
        <div className="flex-1 min-w-0">
          <Badge variant="outline" className="text-[10px] mb-1">{example.level}</Badge>
          <h3 className="font-semibold text-sm truncate">{example.title}</h3>
        </div>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-4 pb-4 border-t border-white/5 pt-4">
            <p className="text-sm font-bold mb-2">โจทย์: {example.problem}</p>
            <div className="space-y-1">{example.steps.map((s, i) => <p key={i} className="text-xs text-muted-foreground font-mono">{i+1}. {s}</p>)}</div>
            <div className={`mt-4 p-3 rounded-lg ${bg} text-sm font-bold border border-white/10`}><CheckCircle size={16} className="inline mr-2" /> ตอบ: {example.answer}</div>
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
            <div className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border-l-4 border-cyan-500 mb-6"><Activity className="text-cyan-400" /> <h2 className="text-xl font-bold uppercase">Step Functions</h2></div>
            {stepFunctionExamples.map(ex => <ExampleAccordion key={ex.id} example={ex} colorClass="cyan" />)}
          </section>
          <section>
            <div className="flex items-center gap-3 p-4 bg-violet-500/10 rounded-xl border-l-4 border-violet-500 mb-6"><TrendingUp className="text-violet-400" /> <h2 className="text-xl font-bold uppercase">Exponential</h2></div>
            {exponentialExamples.map(ex => <ExampleAccordion key={ex.id} example={ex} colorClass="violet" />)}
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}