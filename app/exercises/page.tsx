"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Target,
  CheckCircle,
  XCircle,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Trophy,
  Activity,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Question {
  id: number
  type: "choice" | "input"
  category: "step" | "expo"
  level: "ง่าย" | "ปานกลาง" | "ยาก"
  question: string
  options?: string[]
  answer: number | string
  explanation: string
}

// --- คลังโจทย์ทั้งหมด 30 ข้อ ---
const allQuestions: Question[] = [
  // Step Functions (15 ข้อ)
  { id: 1, type: "choice", category: "step", level: "ง่าย", question: "ค่าของ ⌊4.9⌋ เท่ากับเท่าไร?", options: ["3", "4", "5", "4.9"], answer: 1, explanation: "⌊4.9⌋ = 4 เพราะ 4 เป็นจำนวนเต็มที่มากที่สุดที่น้อยกว่าหรือเท่ากับ 4.9" },
  { id: 2, type: "choice", category: "step", level: "ง่าย", question: "ค่าของ ⌈3.2⌉ เท่ากับเท่าไร?", options: ["3", "4", "3.2", "5"], answer: 1, explanation: "⌈3.2⌉ = 4 เพราะเป็นจำนวนเต็มที่น้อยที่สุดที่มากกว่าหรือเท่ากับ 3.2" },
  { id: 3, type: "choice", category: "step", level: "ปานกลาง", question: "พัสดุหนัก 3.7 กก. ค่าส่งเท่าไร? (0-1kg=20฿, 1-2kg=35฿, 2-3kg=50฿, 3-4kg=65฿)", options: ["50 บาท", "65 บาท", "80 บาท", "35 บาท"], answer: 1, explanation: "3.7 อยู่ในช่วง 3 < x ≤ 4 กก. ราคาคือ 65 บาท" },
  { id: 4, type: "choice", category: "step", level: "ง่าย", question: "ค่าของ ⌊-1.5⌋ เท่ากับเท่าไร?", options: ["-1", "-2", "-1.5", "0"], answer: 1, explanation: "⌊-1.5⌋ = -2 เพราะ -2 < -1.5" },
  { id: 5, type: "choice", category: "step", level: "ปานกลาง", question: "จอดรถ 3 ชม. 15 นาที (ฟรี 2 ชม. แรก, ชม. ต่อไป 20บ. เศษนับเป็น 1 ชม.)", options: ["20 บาท", "40 บาท", "60 บาท", "ฟรี"], answer: 1, explanation: "เกินมา 1 ชม. 15 นาที ปัดเป็น 2 ชม. จ่าย 40 บาท" },
  { id: 6, type: "choice", category: "step", level: "ยาก", question: "รายได้ 250,000 บาท เสียภาษีเท่าไร? (0-150k ยกเว้น, 150k-300k เสีย 5%)", options: ["5,000 บาท", "7,500 บาท", "10,000 บาท", "12,500 บาท"], answer: 0, explanation: "(250,000 - 150,000) * 0.05 = 5,000 บาท" },
  { id: 7, type: "choice", category: "step", level: "ยาก", question: "ใช้ไฟ 250 หน่วย (0-150 หน่วยละ 3.25฿, ส่วนที่เหลือหน่วยละ 4.22฿)", options: ["909.50 บาท", "1,055.00 บาท", "1,120.50 บาท", "812.50 บาท"], answer: 0, explanation: "(150*3.25) + (100*4.22) = 909.50 บาท" },
  { id: 8, type: "choice", category: "step", level: "ง่าย", question: "⌊0.99⌋ มีค่าเท่าใด?", options: ["0", "1", "0.9", "-1"], answer: 0, explanation: "จำนวนเต็มที่มากที่สุดที่ไม่เกิน 0.99 คือ 0" },
  { id: 9, type: "choice", category: "step", level: "ปานกลาง", question: "ส่งพัสดุลงทะเบียน 80g และ 600g (เกณฑ์: ≤100g=18฿, 500-1000g=38฿)", options: ["46 บาท", "56 บาท", "66 บาท", "76 บาท"], answer: 1, explanation: "18 + 38 = 56 บาท" },
  { id: 10, type: "choice", category: "step", level: "ยาก", question: "พัสดุ 4.5kg (80฿) แพงกว่าพัสดุ 2.2kg (50฿) กี่บาท?", options: ["20 บาท", "30 บาท", "40 บาท", "50 บาท"], answer: 1, explanation: "80 - 50 = 30 บาท" },
  // ... (เพิ่มโอนิยาม/ประยุกต์จนครบ 15 ข้อ)

  // Exponential (15 ข้อ)
  { id: 11, type: "input", category: "expo", level: "ง่าย", question: "จงหาค่าของ 2⁴", answer: 16, explanation: "2 * 2 * 2 * 2 = 16" },
  { id: 12, type: "input", category: "expo", level: "ง่าย", question: "จงหาค่าของ 3³", answer: 27, explanation: "3 * 3 * 3 = 27" },
  { id: 13, type: "choice", category: "expo", level: "ปานกลาง", question: "แบคทีเรียเพิ่ม 2 เท่าทุก ชม. เริ่ม 100 ตัว ผ่าน 4 ชม. มีกี่ตัว?", options: ["400", "800", "1,600", "3,200"], answer: 2, explanation: "100 * 2⁴ = 1,600" },
  { id: 14, type: "choice", category: "expo", level: "ปานกลาง", question: "ฝากเงิน 10,000 ดอกเบี้ย 10% ทบต้น 2 ปี ได้กี่บาท?", options: ["12,000", "12,100", "11,000", "13,000"], answer: 1, explanation: "10,000 * (1.1)² = 12,100" },
  { id: 15, type: "choice", category: "expo", level: "ยาก", question: "รถราคา 500,000 เสื่อมราคา 20% ต่อปี ผ่าน 3 ปี เหลือเท่าไร?", options: ["256,000", "320,000", "280,000", "240,000"], answer: 0, explanation: "500,000 * (0.8)³ = 256,000" },
  { id: 16, type: "input", category: "expo", level: "ง่าย", question: "5⁰ มีค่าเท่าใด?", answer: 1, explanation: "เลขใดๆ ยกกำลัง 0 ได้ 1" },
  { id: 17, type: "choice", category: "expo", level: "ปานกลาง", question: "สมบัติ (2²)³ เท่ากับข้อใด?", options: ["2⁵", "2⁶", "4³", "64"], answer: 1, explanation: "2^(2*3) = 2⁶ = 64" },
  { id: 18, type: "input", category: "expo", level: "ปานกลาง", question: "จงหาค่า x จาก 2ˣ = 32", answer: 5, explanation: "2⁵ = 32" },
  { id: 19, type: "choice", category: "expo", level: "ยาก", question: "ครึ่งชีวิต 5 ปี เริ่ม 80g ผ่าน 15 ปี เหลือเท่าไร?", options: ["40", "20", "10", "5"], answer: 2, explanation: "80 -> 40 -> 20 -> 10 (3 รอบ)" },
  { id: 20, type: "input", category: "expo", level: "ปานกลาง", question: "10⁻² ในรูปทศนิยมคือ?", answer: 0.01, explanation: "1/100 = 0.01" },
  // ... (เพิ่มโจทย์จนครบ 30 ข้อ)
];

// --- ✅ จุดสำคัญ: ต้องมี export default หน้าฟังก์ชัน Component ---
export default function ExercisesPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [score, setScore] = useState(0)
  const [checkedState, setCheckedState] = useState<Record<number, { isCorrect: boolean; userAnswer: any }>>({})
  const [activeCategory, setActiveCategory] = useState<"all" | "step" | "expo">("all")
  const [inputValues, setInputValues] = useState<Record<number, string>>({})

  useEffect(() => {
    setQuestions([...allQuestions].sort(() => Math.random() - 0.5))
  }, [])

  const filteredQuestions = activeCategory === "all" ? questions : questions.filter(q => q.category === activeCategory)
  const answeredCount = Object.keys(checkedState).length
  const progress = (answeredCount / questions.length) * 100

  const handleCheck = (id: number, val: any, correctVal: any) => {
    if (checkedState[id]) return
    const isCorrect = val.toString().trim() === correctVal.toString().trim()
    setCheckedState(prev => ({ ...prev, [id]: { isCorrect, userAnswer: val } }))
    if (isCorrect) setScore(s => s + 1)
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        {/* Stats HUD */}
        <div className="glass-card rounded-2xl p-6 mb-8 sticky top-24 z-30 border border-primary/20 bg-background/80 backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary"><Target size={28} /></div>
              <div>
                <h2 className="text-xl font-bold">แบบฝึกหัด (30 ข้อ)</h2>
                <p className="text-sm text-muted-foreground">คะแนน: <span className="text-primary font-bold">{score}</span> / {questions.length}</p>
              </div>
            </div>
            <div className="flex bg-secondary/50 p-1 rounded-lg">
              {["all", "step", "expo"].map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat as any)} className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${activeCategory === cat ? "bg-primary text-white" : "text-muted-foreground"}`}>
                  {cat === "all" ? "ทั้งหมด" : cat === "step" ? "ขั้นบันได" : "เอ็กซ์โพ"}
                </button>
              ))}
            </div>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((q, idx) => (
              <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className={`glass-card rounded-2xl p-6 border transition-all ${checkedState[q.id] ? (checkedState[q.id].isCorrect ? "border-emerald-500/50 bg-emerald-500/5" : "border-red-500/50 bg-red-500/5") : "border-border"}`}>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-widest">{q.level}</Badge>
                  {checkedState[q.id] && (checkedState[q.id].isCorrect ? <CheckCircle className="text-emerald-500" size={20} /> : <XCircle className="text-red-500" size={20} />)}
                </div>
                <h3 className="font-bold text-sm mb-6 leading-relaxed">{q.id}. {q.question}</h3>
                
                {q.type === "choice" ? (
                  <div className="space-y-2">
                    {q.options?.map((opt, i) => (
                      <button key={i} disabled={!!checkedState[q.id]} onClick={() => handleCheck(q.id, i, q.answer)} className={`w-full text-left p-3 rounded-xl text-xs transition-all ${checkedState[q.id] ? (i === q.answer ? "bg-emerald-500/20 border-emerald-500" : i === checkedState[q.id].userAnswer ? "bg-red-500/20 border-red-500" : "opacity-50") : "bg-secondary/30 hover:bg-primary/10 border border-transparent hover:border-primary/50"}`}>{opt}</button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input type="number" disabled={!!checkedState[q.id]} value={inputValues[q.id] || ""} onChange={(e) => setInputValues({...inputValues, [q.id]: e.target.value})} className="flex-1 bg-black/20 border border-border rounded-xl px-4 py-2 text-center font-mono" placeholder="คำตอบ..." />
                    <Button size="icon" onClick={() => handleCheck(q.id, inputValues[q.id], q.answer)} disabled={!inputValues[q.id] || !!checkedState[q.id]}><ArrowRight size={18} /></Button>
                  </div>
                )}

                {checkedState[q.id] && (
                  <div className="mt-4 p-3 bg-white/5 rounded-xl flex gap-2">
                    <Lightbulb size={16} className="text-amber-400 shrink-0" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  )
}