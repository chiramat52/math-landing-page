"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, CheckCircle, XCircle, Lightbulb, RefreshCw, ArrowRight, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const rawQuestions = [
  // Step Functions (15 ข้อใหม่)
  { id: 1, type: "choice", category: "step", level: "ง่าย", question: "⌊-4.2⌋ มีค่าเท่าใด?", options: ["-4", "-5", "-4.2", "4"], answer: 1, explanation: "จำนวนเต็มที่มากที่สุดที่น้อยกว่าหรือเท่ากับ -4.2 คือ -5" },
  { id: 2, type: "choice", category: "step", level: "ง่าย", question: "⌈2.01⌉ มีค่าเท่าใด?", options: ["2", "3", "2.1", "2.0"], answer: 1, explanation: "ปัดเศษขึ้นเป็นจำนวนเต็มที่ใกล้ที่สุด" },
  { id: 3, type: "choice", category: "step", level: "ปานกลาง", question: "จอดรถ 5 ชม. 2 นาที (ฟรี 1 ชม. แรก, ต่อไปชม.ละ 20บ. เศษคิดเป็น 1 ชม.)", options: ["80 บาท", "100 บาท", "120 บาท", "60 บาท"], answer: 1, explanation: "หักฟรี 1 ชม. เหลือ 4 ชม. 2 นาที ปัดเป็น 5 ชม. * 20 = 100 บาท" },
  { id: 4, type: "choice", category: "step", level: "ปานกลาง", question: "ส่งของหนัก 500ก. (0-100ก.=18บ, 101-500ก.=28บ.) จ่ายเท่าไร?", options: ["18 บาท", "28 บาท", "38 บาท", "ฟรี"], answer: 1, explanation: "อยู่ในช่วงขั้นที่สองพอดี" },
  { id: 5, type: "choice", category: "step", level: "ยาก", question: "ภาษีรายได้ 170,000 บาท (0-150k ยกเว้น, ส่วนเกินคิด 5%)", options: ["1,000 บาท", "8,500 บาท", "500 บาท", "1,500 บาท"], answer: 0, explanation: "20,000 * 0.05 = 1,000 บาท" },
  { id: 6, type: "choice", category: "step", level: "ง่าย", question: "⌊0.001⌋ มีค่าเท่ากับ?", options: ["1", "0", "0.1", "-1"], answer: 1, explanation: "ไม่เกิน 0.001 คือ 0" },
  { id: 7, type: "choice", category: "step", level: "ปานกลาง", question: "เน็ต 2.1 GB (คิดเงินทุก 1 GB ราคา 15บ.) จ่ายกี่บาท?", options: ["30 บาท", "45 บาท", "15 บาท", "35 บาท"], answer: 1, explanation: "2.1 ปัดเป็น 3 GB * 15 = 45 บาท" },
  { id: 8, type: "choice", category: "step", level: "ยาก", question: "ถอนเงิน 3 ครั้ง (ฟรี 1 ครั้งแรก, ครั้งต่อไป 10บ.) จ่ายเท่าไร?", options: ["10 บาท", "20 บาท", "30 บาท", "ฟรี"], answer: 1, explanation: "เสีย 2 ครั้งหลัง รวม 20 บาท" },
  { id: 9, type: "choice", category: "step", level: "ง่าย", question: "⌈-0.9⌉ มีค่าเท่ากับ?", options: ["-1", "0", "1", "-0.9"], answer: 1, explanation: "ปัดขึ้นหาศูนย์" },
  { id: 10, type: "choice", category: "step", level: "ยาก", question: "ใช้ไฟ 155 หน่วย (0-150=3บ, 151-200=4บ) จ่ายเท่าไร?", options: ["465 บาท", "470 บาท", "455 บาท", "620 บาท"], answer: 1, explanation: "(150*3) + (5*4) = 450 + 20 = 470 บาท" },
  { id: 11, type: "choice", category: "step", level: "ปานกลาง", question: "นั่งวิน 6 กม. (0-5 กม.=40บ, ต่อไปกิโลละ 10บ.)", options: ["50 บาท", "60 บาท", "40 บาท", "70 บาท"], answer: 0, explanation: "40 + 10 = 50 บาท" },
  { id: 12, type: "choice", category: "step", level: "ง่าย", question: "⌊9.999⌋ คือ?", options: ["10", "9", "9.9", "0"], answer: 1, explanation: "ไม่เกินคือ 9" },
  { id: 13, type: "choice", category: "step", level: "ปานกลาง", question: "ตั๋วหนังเด็กสูงไม่เกิน 110 ซม. ฟรี เด็กสูง 110.1 ซม. จ่ายไหม?", options: ["ฟรี", "จ่าย", "ลดครึ่งราคา", "ไม่มีข้อถูก"], answer: 1, explanation: "เกินเกณฑ์ขั้นบันไดต้องจ่าย" },
  { id: 14, type: "choice", category: "step", level: "ง่าย", question: "⌈5.0⌋ คือ?", options: ["5", "6", "5.1", "4"], answer: 0, explanation: "จำนวนเต็มอยู่แล้วค่าคงเดิม" },
  { id: 15, type: "choice", category: "step", level: "ยาก", question: "เช่ารถ 25 ชม. (วันละ 800บ, เศษวันคิดเป็น ชม.ละ 100บ.)", options: ["900 บาท", "1,600 บาท", "800 บาท", "1,000 บาท"], answer: 0, explanation: "800 + (1*100) = 900 บาท" },

  // Exponential (15 ข้อใหม่)
  { id: 16, type: "input", category: "expo", level: "ง่าย", question: "4² มีค่าเท่าใด?", answer: "16", explanation: "4 * 4 = 16" },
  { id: 17, type: "input", category: "expo", level: "ปานกลาง", question: "ถ้า 3ˣ = 81 แล้ว x คือ?", answer: "4", explanation: "3 * 3 * 3 * 3 = 81" },
  { id: 18, type: "choice", category: "expo", level: "ง่าย", question: "7⁰ มีค่าเท่าใด?", options: ["0", "7", "1", "-7"], answer: 2, explanation: "เลขยกกำลังศูนย์ได้ 1" },
  { id: 19, type: "choice", category: "expo", level: "ยาก", question: "แบคทีเรียเพิ่ม 2 เท่าทุก 10 นาที เริ่ม 50 ตัว ผ่านไป 30 นาทีมีกี่ตัว?", options: ["150", "400", "300", "200"], answer: 1, explanation: "50 * 2³ = 400" },
  { id: 20, type: "input", category: "expo", level: "ยาก", question: "(1/2)⁻³ มีค่าเท่าใด?", answer: "8", explanation: "กลับเศษส่วนเป็น 2³ = 8" },
  { id: 21, type: "choice", category: "expo", level: "ปานกลาง", question: "y = 2ˣ⁻³ กราฟเลื่อนไปทางไหน?", options: ["ซ้าย 3", "ขวา 3", "ขึ้น 3", "ลง 3"], answer: 1, explanation: "h = 3 เลื่อนขวา" },
  { id: 22, type: "choice", category: "expo", level: "ยาก", question: "สาร 100g ครึ่งชีวิต 5 วัน ผ่านไป 10 วันเหลือเท่าไร?", options: ["50g", "25g", "12.5g", "75g"], answer: 1, explanation: "ผ่านไป 2 รอบ: 100 -> 50 -> 25" },
  { id: 23, type: "input", category: "expo", level: "ง่าย", question: "10³ มีค่าเท่าใด?", answer: "1000", explanation: "10 คูณกัน 3 ครั้ง" },
  { id: 24, type: "choice", category: "expo", level: "ปานกลาง", question: "y = 5ˣ + 2 กราฟตัดแกน Y ที่จุดใด?", options: ["(0,1)", "(0,3)", "(0,2)", "(0,5)"], answer: 1, explanation: "5⁰ + 2 = 1 + 2 = 3" },
  { id: 25, type: "input", category: "expo", level: "ยาก", question: "จงหาค่า x จาก 2ˣ = 1/4", answer: "-2", explanation: "1/2² = 2⁻²" },
  { id: 26, type: "choice", category: "expo", level: "ง่าย", question: "f(x) = (3)ˣ เป็นฟังก์ชันเพิ่มหรือลด?", options: ["เพิ่ม", "ลด", "คงที่", "ไม่ใช่ฟังก์ชัน"], answer: 0, explanation: "ฐาน > 1" },
  { id: 27, type: "input", category: "expo", level: "ปานกลาง", question: "(2²)³ มีค่าเท่ากับ 2 ยกกำลังอะไร?", answer: "6", explanation: "เลขชี้กำลังซ้อนกันให้นำมาคูณกัน" },
  { id: 28, type: "choice", category: "expo", level: "ยาก", question: "เงิน 1,000 ดอกเบี้ย 10% ทบต้น 1 ปี ได้เท่าไร?", options: ["1,100", "1,200", "1,010", "1,110"], answer: 0, explanation: "1,000 * 1.1 = 1,100" },
  { id: 29, type: "input", category: "expo", level: "ง่าย", question: "5¹ มีค่าเท่าใด?", answer: "5", explanation: "เลขใดๆ ยกกำลัง 1 ได้ค่าเดิม" },
  { id: 30, type: "choice", category: "expo", level: "ปานกลาง", question: "y = 0.5ˣ กราฟจะเข้าใกล้แกนใดเมื่อ x มีค่ามากๆ?", options: ["แกน X", "แกน Y", "เส้นตรง y=1", "ไม่มี"], answer: 0, explanation: "ฟังก์ชันลดเข้าใกล้แกน X" }
];



export default function ExercisesPage() {
  const [questions, setQuestions] = useState<any[]>([])
  const [checkedState, setCheckedState] = useState<Record<number, any>>({})
  const [inputValues, setInputValues] = useState<Record<number, string>>({})
  const [score, setScore] = useState(0)

  const shuffleAndReset = useCallback(() => {
    const shuffled = [...rawQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffled)
    setCheckedState({})
    setInputValues({})
    setScore(0)
  }, [])

  useEffect(() => { shuffleAndReset() }, [shuffleAndReset])

  const handleCheck = (id: number, val: any, correct: any) => {
    if (checkedState[id]) return
    const isCorrect = val.toString().trim().toLowerCase() === correct.toString().trim().toLowerCase()
    setCheckedState(prev => ({ ...prev, [id]: { isCorrect, userVal: val } }))
    if (isCorrect) setScore(s => s + 1)
  }

  const answeredCount = Object.keys(checkedState).length

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="glass-card rounded-2xl p-6 mb-12 border border-primary/20 bg-background/80 backdrop-blur-md sticky top-24 z-30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary"><Target size={28} /></div>
              <div>
                <h2 className="text-xl font-bold uppercase italic">Master Challenge ({score}/30)</h2>
                <p className="text-xs text-muted-foreground">ทำแล้ว {answeredCount} ข้อ</p>
              </div>
            </div>
            <Button onClick={shuffleAndReset} variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <RefreshCw size={16} /> สุ่มใหม่ & รีเซ็ต
            </Button>
          </div>
          <Progress value={(answeredCount / 30) * 100} className="h-2 mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {questions.map((q, idx) => (
              <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                className={`glass-card p-6 rounded-2xl border transition-all ${checkedState[q.id] ? (checkedState[q.id].isCorrect ? "border-emerald-500/50 bg-emerald-500/5" : "border-red-500/50 bg-red-500/5") : "border-border hover:border-primary/50"}`}
              >
                <div className="flex justify-between mb-4 text-[10px] font-bold uppercase text-primary">
                  <span>{q.category}</span>
                  <span className="text-muted-foreground">{q.level}</span>
                </div>
                <h3 className="font-bold text-sm mb-6 leading-relaxed">{idx + 1}. {q.question}</h3>
                {q.type === "choice" ? (
                  <div className="space-y-2">
                    {q.options?.map((opt: string, i: number) => (
                      <button key={i} disabled={!!checkedState[q.id]} onClick={() => handleCheck(q.id, i, q.answer)}
                        className={`w-full text-left p-3 rounded-xl text-xs border ${checkedState[q.id] ? (i === q.answer ? "border-emerald-500 bg-emerald-500/20 font-bold" : (i === checkedState[q.id].userVal ? "border-red-500 bg-red-500/20" : "opacity-30")) : "bg-white/5 hover:border-primary/40"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input type="text" disabled={!!checkedState[q.id]} value={inputValues[q.id] || ""} onChange={(e) => setInputValues({...inputValues, [q.id]: e.target.value})}
                      className="flex-1 bg-black/20 border border-border rounded-xl px-4 py-2 text-sm text-center font-mono" placeholder="ตอบ..." 
                    />
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

        {answeredCount === 30 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 glass-card p-10 text-center max-w-lg mx-auto border-2 border-primary">
            <Trophy size={60} className="text-amber-400 mx-auto mb-6" />
            <h3 className="text-3xl font-black mb-2 uppercase">Complete!</h3>
            <p className="text-muted-foreground mb-8">คุณทำคะแนนได้ {score} / 30 คะแนน</p>
            <Button onClick={shuffleAndReset} className="w-full py-6 text-lg font-bold">RESTART CHALLENGE</Button>
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  )
}