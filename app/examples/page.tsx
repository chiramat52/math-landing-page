"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, TrendingUp, ChevronDown, CheckCircle, Lightbulb, Move, Package, Receipt, Car, Zap, Building2, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const stepFunctionExamples = [
  { id: "step-1", title: "ค่าจอดรถ", level: "ง่าย", icon: Building2, problem: "จอดรถ 3 ชม. 15 นาที จ่ายกี่บาท?", context: "ฟรี 2 ชม. แรก, ชม. ต่อไป 20บ. (เศษนับเป็น 1 ชม.)", steps: ["ฟรี 2 ชม. เหลือ 1 ชม. 15 นาที", "ปัดเศษนาทีเป็น 1 ชม. รวมเป็น 2 ชม.", "2 * 20 = 40 บาท"], answer: "40 บาท" },
  { id: "step-2", title: "ค่าส่งพัสดุ", level: "ง่าย", icon: Package, problem: "ส่งพัสดุ 2.5 กก. เสียกี่บาท?", context: "1-2kg=35฿, 2-3kg=50฿", steps: ["2.5 อยู่ในช่วง 2 < x ≤ 3", "ราคาคงที่ตามเกณฑ์ 50 บาท"], answer: "50 บาท" },
  { id: "step-4", title: "อัตราค่าบริการไฟฟ้า", level: "ยาก", icon: Zap, problem: "ใช้ไฟฟ้า 220 หน่วย จ่ายกี่บาท?", context: "0-150 หน่วยละ 3.2฿, 150-400 หน่วยละ 4.2฿", steps: ["ช่วงแรก: 150 * 3.2 = 480 บาท", "ช่วงที่สอง: (220 - 150) * 4.2 = 294 บาท", "รวม: 774 บาท"], answer: "774 บาท" },
  { id: "step-5", title: "ค่าธรรมเนียมถอนเงิน", level: "ง่าย", icon: CreditCard, problem: "ถอนเงินข้ามเขต 4 ครั้ง จ่ายกี่บาท?", context: "ฟรี 2 ครั้งแรก ครั้งต่อไป 15 บาท", steps: ["ฟรี 2 ครั้ง, เสียเงิน 2 ครั้ง", "2 * 15 = 30 บาท"], answer: "30 บาท" },
  // ... (เพิ่มจนครบ 10 ข้อในหมวดนี้)
];

const exponentialExamples = [
  { id: "expo-1", title: "การเลื่อนขนาน (Shift)", level: "ปานกลาง", icon: Move, problem: "f(x) = 2ˣ + 3 คือการเลื่อนอย่างไร?", steps: ["ค่า k = +3", "เลื่อนกราฟขึ้นด้านบน 3 หน่วย"], answer: "เลื่อนขึ้น 3 หน่วย" },
  { id: "expo-4", title: "ค่าเสื่อมราคา (Depreciation)", level: "ยาก", icon: TrendingUp, problem: "เครื่องจักร 1 ล้านบาท ลดลง 10% ต่อปี ผ่านไป 2 ปีเหลือเท่าไร?", steps: ["V = 1,000,000 * (0.9)²", "1,000,000 * 0.81"], answer: "810,000 บาท" },
  { id: "expo-5", title: "ครึ่งชีวิต (Half-life)", level: "ปานกลาง", icon: Activity, problem: "สาร 80g ครึ่งชีวิต 5 วัน ผ่านไป 15 วันเหลือเท่าไร?", steps: ["จำนวนรอบ: 15 / 5 = 3 รอบ", "80 * (1/2)³ = 10"], answer: "10 กรัม" }
];

function ExampleAccordion({ example, colorClass }: { example: any, colorClass: "cyan" | "violet" }) {
  const [isOpen, setIsOpen] = useState(false)
  const accent = colorClass === "cyan" ? "text-cyan-400" : "text-violet-400"
  const bg = colorClass === "cyan" ? "bg-cyan-500/10" : "bg-violet-500/10"
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-white/10 mb-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 flex items-start gap-4 hover:bg-white/5">
        <div className={`p-2 rounded-lg ${bg} ${accent}`}><example.icon size={20} /></div>
        <div className="flex-1">
          <Badge variant="outline" className="text-[10px] mb-1">{example.level}</Badge>
          <h3 className="font-semibold text-sm">{example.title}</h3>
        </div>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-4 pb-4 border-t border-white/5 pt-4">
            <p className="text-sm font-bold mb-2">โจทย์: {example.problem}</p>
            <div className="space-y-1">{example.steps.map((s: string, i: number) => <p key={i} className="text-xs text-muted-foreground font-mono">{i+1}. {s}</p>)}</div>
            <div className={`mt-3 p-3 rounded-lg ${bg} text-sm font-bold`}>ตอบ: {example.answer}</div>
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