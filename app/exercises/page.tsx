"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, CheckCircle, XCircle, Lightbulb, RefreshCw, ArrowRight, Trophy, Activity, TrendingUp } from "lucide-react"
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

const stepQuestions: Question[] = [
  { id: 1, type: "choice", category: "step", level: "ง่าย", question: "ค่าของ ⌊4.9⌋ เท่ากับเท่าไร?", options: ["3", "4", "5", "4.9"], answer: 1, explanation: "⌊4.9⌋ = 4 เพราะ 4 เป็นจำนวนเต็มที่มากที่สุดที่น้อยกว่าหรือเท่ากับ 4.9" },
  { id: 2, type: "choice", category: "step", level: "ง่าย", question: "ค่าของ ⌊-1.5⌋ เท่ากับเท่าไร?", options: ["-1", "-2", "-1.5", "0"], answer: 1, explanation: "⌊-1.5⌋ = -2 เพราะ -2 เป็นจำนวนเต็มที่มากที่สุดที่น้อยกว่าหรือเท่ากับ -1.5" },
  { id: 3, type: "choice", category: "step", level: "ปานกลาง", question: "พัสดุหนัก 3.7 กก. ค่าส่งเท่าไร? (0-1kg=20฿, 1-2kg=35฿, 2-3kg=50฿, 3-4kg=65฿)", options: ["50 บาท", "65 บาท", "80 บาท", "35 บาท"], answer: 1, explanation: "3.7 กก. อยู่ในช่วง 3 < x ≤ 4 กก. ดังนั้นราคาคือ 65 บาท" },
  { id: 4, type: "choice", category: "step", level: "ปานกลาง", question: "พัสดุหนัก 450 กรัม ค่าส่งเท่าไร? (0-100g=18฿, 100-250g=22฿, 250-500g=28฿)", options: ["22 บาท", "28 บาท", "38 บาท", "18 บาท"], answer: 1, explanation: "450 กรัม อยู่ในช่วง 250 < x ≤ 500 กรัม ราคาคือ 28 บาท" },
  { id: 5, type: "choice", category: "step", level: "ปานกลาง", question: "ส่งพัสดุ 2 กล่อง: 80g และ 600g รวมค่าส่งเท่าไร? (เกณฑ์เดิม)", options: ["46 บาท", "56 บาท", "66 บาท", "76 บาท"], answer: 1, explanation: "80g (18฿) + 600g (38฿) = 56 บาท" },
  { id: 6, type: "choice", category: "step", level: "ยาก", question: "เงินได้สุทธิ 250,000 บาท เสียภาษีเท่าไร? (0-150k ยกเว้น, 150k-300k = 5%)", options: ["5,000 บาท", "7,500 บาท", "10,000 บาท", "12,500 บาท"], answer: 0, explanation: "ส่วนเกิน 100,000 × 5% = 5,000 บาท" },
  { id: 7, type: "choice", category: "step", level: "ยาก", question: "ค่าไฟ 300 หน่วย เท่าไร? (0-150 หน่วย=3.25฿, 151-400 หน่วย=4.22฿)", options: ["909.50 บาท", "975.00 บาท", "1,120.50 บาท", "1,266.00 บาท"], answer: 2, explanation: "(150×3.25) + (150×4.22) = 1,120.50 บาท" },
  { id: 8, type: "choice", category: "step", level: "ปานกลาง", question: "ข้อใดเป็นลักษณะของกราฟฟังก์ชันขั้นบันได?", options: ["เส้นโค้งต่อเนื่อง", "เส้นตรงเดียวทะแยงมุม", "เส้นแนวนอนหลายช่วง", "วงกลม"], answer: 2, explanation: "กราฟเป็นเส้นแนวนอนคงที่ตามช่วง และมีการกระโดดของค่า" },
  { id: 9, type: "choice", category: "step", level: "ง่าย", question: "ถ้า f(x) = ⌊x⌋ แล้ว f(7) มีค่าเท่าใด?", options: ["6", "7", "8", "7.5"], answer: 1, explanation: "7 เป็นจำนวนเต็มอยู่แล้ว ค่าจึงคงเดิม" },
  { id: 10, type: "choice", category: "step", level: "ยาก", question: "พัสดุ 4.5kg แพงกว่า 2.2kg เท่าไร? (0-5kg เพิ่มขั้นละ 15฿ เริ่มที่ 20฿)", options: ["30 บาท", "45 บาท", "15 บาท", "50 บาท"], answer: 0, explanation: "4.5kg (80฿) - 2.2kg (50฿) = 30 บาท" },
  { id: 11, type: "choice", category: "step", level: "ง่าย", question: "ค่าของ ⌈2.1⌉ (Ceiling Function) เท่ากับเท่าไร?", options: ["2", "3", "2.1", "1"], answer: 1, explanation: "Ceiling ปัดขึ้นเป็นจำนวนเต็มที่ใกล้ที่สุด คือ 3" },
  { id: 12, type: "choice", category: "step", level: "ง่าย", question: "จอดรถ 1 ชม. 5 นาที คิดค่าจอดเป็นกี่ ชม. หากเศษของ ชม. นับเป็น 1 ชม.?", options: ["1 ชม.", "2 ชม.", "1.5 ชม.", "ไม่มีข้อถูก"], answer: 1, explanation: "เศษนาทีปัดขึ้นเสมอเป็น 2 ชม." },
  { id: 13, type: "choice", category: "step", level: "ปานกลาง", question: "นั่งวินมอเตอร์ไซค์ 2.5 กม. จ่ายเท่าไร? (0-2 กม.=20฿, 2-5 กม.=30฿)", options: ["20 บาท", "25 บาท", "30 บาท", "50 บาท"], answer: 2, explanation: "2.5 กม. อยู่ในเกณฑ์ช่วงที่สองคือ 30 บาท" },
  { id: 14, type: "choice", category: "step", level: "ปานกลาง", question: "คุยโทรศัพท์ 3 นาที 10 วินาที จ่ายเท่าไร? (นาทีละ 1.50฿ เศษวินาทีนับเป็น 1 นาที)", options: ["4.50 บาท", "5.00 บาท", "6.00 บาท", "7.50 บาท"], answer: 2, explanation: "คิดเป็น 4 นาที × 1.50 = 6.00 บาท" },
  { id: 15, type: "choice", category: "step", level: "ยาก", question: "ถอนเงินต่างธนาคาร 5 ครั้ง เสียเท่าไร? (ฟรี 3 ครั้งแรก ครั้งต่อไป 10฿)", options: ["10 บาท", "20 บาท", "30 บาท", "50 บาท"], answer: 1, explanation: "เสียค่าธรรมเนียมครั้งที่ 4 และ 5 รวม 20 บาท" },
];

const expoQuestions: Question[] = [
  { id: 16, type: "input", category: "expo", level: "ง่าย", question: "จงหาค่าของ 2⁴", answer: 16, explanation: "2 × 2 × 2 × 2 = 16" },
  { id: 17, type: "input", category: "expo", level: "ง่าย", question: "จงหาค่าของ 3³", answer: 27, explanation: "3 × 3 × 3 = 27" },
  { id: 18, type: "input", category: "expo", level: "ง่าย", question: "จงหาค่าของ 5²", answer: 25, explanation: "5 × 5 = 25" },
  { id: 19, type: "choice", category: "expo", level: "ปานกลาง", question: "แบคทีเรีย 100 ตัว เพิ่ม 2 เท่าทุกชั่วโมง ผ่านไป 4 ชม. มีกี่ตัว?", options: ["400 ตัว", "800 ตัว", "1,600 ตัว", "3,200 ตัว"], answer: 2, explanation: "100 × 2⁴ = 1,600 ตัว" },
  { id: 20, type: "choice", category: "expo", level: "ปานกลาง", question: "ฝากเงิน 10,000 บาท ดอกเบี้ย 10%/ปี ทบต้น 2 ปี ได้เงินรวมเท่าไร?", options: ["11,000 บาท", "12,000 บาท", "12,100 บาท", "12,210 บาท"], answer: 2, explanation: "10,000 × (1.1)² = 12,100 บาท" },
  { id: 21, type: "input", category: "expo", level: "ปานกลาง", question: "จงหาค่าของ 2⁶", answer: 64, explanation: "2⁶ = 64" },
  { id: 22, type: "choice", category: "expo", level: "ยาก", question: "สารกัมมันตรังสีมีครึ่งชีวิต 5 ปี เริ่ม 80g ผ่าน 15 ปี เหลือเท่าไร?", options: ["40 กรัม", "20 กรัม", "10 กรัม", "5 กรัม"], answer: 2, explanation: "ผ่านไป 3 รอบครึ่งชีวิต เหลือ 10 กรัม" },
  { id: 23, type: "input", category: "expo", level: "ง่าย", question: "จงหาค่าของ 4³", answer: 64, explanation: "4 × 4 × 4 = 64" },
  { id: 24, type: "choice", category: "expo", level: "ปานกลาง", question: "ถ้า f(x) = 2ˣ แล้ว f(0) มีค่าเท่าใด?", options: ["0", "1", "2", "ไม่นิยาม"], answer: 1, explanation: "เลขใดๆ ยกกำลัง 0 ได้ 1 เสมอ" },
  { id: 25, type: "choice", category: "expo", level: "ยาก", question: "รถราคา 500,000 บาท เสื่อมราคา 20%/ปี ผ่านไป 3 ปีเหลือเท่าไร?", options: ["256,000 บาท", "320,000 บาท", "280,000 บาท", "240,000 บาท"], answer: 0, explanation: "500,000 × (0.8)³ = 256,000 บาท" },
  { id: 26, type: "input", category: "expo", level: "ปานกลาง", question: "จงหาค่าของ 3⁴", answer: 81, explanation: "3⁴ = 81" },
  { id: 27, type: "choice", category: "expo", level: "ยาก", question: "ประชากร 50,000 คน เพิ่ม 3%/ปี อีก 2 ปีจะมีประชากรกี่คน?", options: ["51,500 คน", "53,000 คน", "53,045 คน", "56,180 คน"], answer: 2, explanation: "50,000 × (1.03)² = 53,045" },
  { id: 28, type: "input", category: "expo", level: "ง่าย", question: "จงหาค่าของ 2⁵", answer: 32, explanation: "2⁵ = 32" },
  { id: 29, type: "choice", category: "expo", level: "ปานกลาง", question: "จงลดรูป 2² × 2³", options: ["2⁵", "2⁶", "4⁵", "4⁶"], answer: 0, explanation: "2^(2+3) = 2⁵" },
  { id: 30, type: "input", category: "expo", level: "ปานกลาง", question: "จงหาค่าของ 5³", answer: 125, explanation: "5 × 5 × 5 = 125" },
];

export default function ExercisesPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [score, setScore] = useState(0)
  const [checkedState, setCheckedState] = useState<Record<number, { isCorrect: boolean; userAnswer: number | string }>>({})
  const [activeCategory, setActiveCategory] = useState<"all" | "step" | "expo">("all")
  const [inputValues, setInputValues] = useState<Record<number, string>>({})

  useEffect(() => {
    setQuestions([...stepQuestions, ...expoQuestions].sort(() => Math.random() - 0.5))
  }, [])

  const filteredQuestions = activeCategory === "all" ? questions : questions.filter((q) => q.category === activeCategory)
  const answeredCount = Object.keys(checkedState).length
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0

  const handleCheck = (id: number, val: number | string, correctVal: number | string) => {
    if (checkedState[id]) return
    const isCorrect = val.toString().trim() === correctVal.toString().trim()
    setCheckedState((prev) => ({ ...prev, [id]: { isCorrect, userAnswer: val } }))
    if (isCorrect) setScore((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="glass-card rounded-2xl p-6 mb-8 border border-primary/20 bg-background/80 backdrop-blur-md sticky top-24 z-30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary"><Target size={28} /></div>
              <div>
                <h2 className="text-xl font-bold">Challenge System (30 ข้อ)</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((q, idx) => (
              <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`glass-card p-6 rounded-2xl border transition-all ${checkedState[q.id] ? (checkedState[q.id].isCorrect ? "border-emerald-500/50 bg-emerald-500/5" : "border-red-500/50 bg-red-500/5") : "border-border hover:border-primary/50"}`}>
                <h3 className="font-bold text-sm mb-6 leading-relaxed">{idx + 1}. {q.question}</h3>
                {q.type === "choice" ? (
                  <div className="space-y-2">
                    {q.options?.map((opt, i) => (
                      <button key={i} disabled={!!checkedState[q.id]} onClick={() => handleCheck(q.id, i, q.answer)} className={`w-full text-left p-3 rounded-xl text-xs border ${checkedState[q.id] ? (i === q.answer ? "border-emerald-500 bg-emerald-500/20 font-bold" : "opacity-30") : "bg-white/5"}`}>{opt}</button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input type="text" disabled={!!checkedState[q.id]} value={inputValues[q.id] || ""} onChange={(e) => setInputValues({...inputValues, [q.id]: e.target.value})} className="flex-1 bg-black/20 border border-border rounded-xl px-4 py-2 text-center font-mono" placeholder="ตอบ..." />
                    <button onClick={() => handleCheck(q.id, inputValues[q.id], q.answer)} className="p-2 bg-primary rounded-lg text-white" disabled={!inputValues[q.id] || !!checkedState[q.id]}><ArrowRight size={18}/></button>
                  </div>
                )}
                {checkedState[q.id] && (
                  <div className="mt-4 p-3 bg-white/5 rounded-xl flex gap-2">
                    <Lightbulb size={16} className="text-amber-400 shrink-0" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">{q.explanation}</p>
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