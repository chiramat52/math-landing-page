"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, CheckCircle, XCircle, Lightbulb, RefreshCw, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const allQuestions = [
  { id: 1, type: "choice", category: "step", level: "ง่าย", question: "⌊5.7⌋ คือเท่าใด?", options: ["4", "5", "6", "5.7"], answer: 1, explanation: "Floor function คือจำนวนเต็มที่มากที่สุดที่ไม่เกิน 5.7 คือ 5" },
  { id: 2, type: "choice", category: "step", level: "ปานกลาง", question: "จอดรถ 4 ชม. 10 นาที (ชม.ละ 30บ. เศษนาทีนับเป็น 1 ชม.)", options: ["120", "130", "150", "140"], answer: 2, explanation: "ปัดเป็น 5 ชม. 5 * 30 = 150 บาท" },
  { id: 16, type: "input", category: "expo", level: "ง่าย", question: "3³ มีค่าเท่าใด?", answer: "27", explanation: "3 * 3 * 3 = 27" },
  { id: 17, type: "input", category: "expo", level: "ปานกลาง", question: "2ˣ = 64 แล้ว x คือ?", answer: "6", explanation: "2⁶ = 64" },
  // ... (ใส่โจทย์เพิ่มจนครบ 30 ข้อตามรูปแบบนี้)
];

export default function ExercisesPage() {
  const [questions, setQuestions] = useState<any[]>([])
  const [checkedState, setCheckedState] = useState<Record<number, any>>({})
  const [inputValues, setInputValues] = useState<Record<number, string>>({})
  const [score, setScore] = useState(0)

  useEffect(() => { setQuestions([...allQuestions].sort(() => Math.random() - 0.5)) }, [])

  const handleCheck = (id: number, val: any, correct: any) => {
    if (checkedState[id]) return
    const isCorrect = val.toString().trim().toLowerCase() === correct.toString().trim().toLowerCase()
    setCheckedState(prev => ({ ...prev, [id]: { isCorrect, userVal: val } }))
    if (isCorrect) setScore(s => s + 1)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="glass-card rounded-2xl p-6 mb-12 border border-primary/20 bg-background/80 backdrop-blur-md sticky top-24 z-30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Target /> Master Challenge ({score}/30)</h2>
            <Progress value={(Object.keys(checkedState).length / 30) * 100} className="h-2 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((q, idx) => (
            <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`glass-card p-6 rounded-2xl border ${checkedState[q.id] ? (checkedState[q.id].isCorrect ? "border-emerald-500/50 bg-emerald-500/5" : "border-red-500/50 bg-red-500/5") : "border-border"}`}>
              <h3 className="font-bold text-sm mb-6 leading-relaxed">{idx + 1}. {q.question}</h3>
              {q.type === "choice" ? (
                <div className="space-y-2">{q.options?.map((opt: string, i: number) => <button key={i} disabled={!!checkedState[q.id]} onClick={() => handleCheck(q.id, i, q.answer)} className={`w-full text-left p-3 rounded-xl text-xs border ${checkedState[q.id] ? (i === q.answer ? "bg-emerald-500/20 border-emerald-500" : "opacity-30") : "hover:border-primary/50"}`}>{opt}</button>)}</div>
              ) : (
                <div className="flex gap-2"><input type="text" disabled={!!checkedState[q.id]} onChange={e => setInputValues({...inputValues, [q.id]: e.target.value})} className="flex-1 bg-black/20 border border-border rounded-xl px-4 py-2" placeholder="ตอบ..." /> <button onClick={() => handleCheck(q.id, inputValues[q.id], q.answer)} className="p-2 bg-primary rounded-lg"><ArrowRight size={18}/></button></div>
              )}
              {checkedState[q.id] && <div className="mt-4 p-3 bg-white/5 rounded-xl flex gap-2 text-[10px] text-muted-foreground italic"><Lightbulb size={16} className="text-amber-400" /> {q.explanation}</div>}
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}