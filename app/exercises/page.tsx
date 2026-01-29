"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, CheckCircle, XCircle, Lightbulb, RefreshCw, ArrowRight, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const allQuestions = [
  { id: 1, type: "choice", category: "step", level: "ง่าย", question: "⌊4.9⌋ = ?", options: ["3", "4", "5", "4.9"], answer: 1, explanation: "จำนวนเต็มมากที่สุดที่ไม่เกิน 4.9 คือ 4" },
  { id: 2, type: "choice", category: "step", level: "ง่าย", question: "⌈3.2⌉ = ?", options: ["3", "4", "2", "5"], answer: 1, explanation: "จำนวนเต็มที่น้อยที่สุดที่ไม่น้อยกว่า 3.2 คือ 4" },
  { id: 16, type: "input", category: "expo", level: "ง่าย", question: "2⁴ = ?", answer: 16, explanation: "2*2*2*2 = 16" },
  { id: 22, type: "input", category: "expo", level: "ปานกลาง", question: "2ˣ = 32 แล้ว x = ?", answer: 5, explanation: "2⁵ = 32" },
  // ... (คุณสามารถก๊อปปี้โจทย์จากส่วนเดิมมาใส่ให้ครบ 30 ข้อได้ที่นี่)
]

export default function ExercisesPage() {
  const [questions, setQuestions] = useState<any[]>([])
  const [score, setScore] = useState(0)
  const [checkedState, setCheckedState] = useState<Record<number, any>>({})
  const [inputValues, setInputValues] = useState<Record<number, string>>({})
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => { setQuestions([...allQuestions].sort(() => Math.random() - 0.5)) }, [])

  const handleCheck = (id: number, val: any, correct: any) => {
    if (checkedState[id]) return
    const isCorrect = val.toString().trim() === correct.toString().trim()
    setCheckedState(prev => ({ ...prev, [id]: { isCorrect, userAnswer: val } }))
    if (isCorrect) setScore(s => s + 1)
  }

  const filtered = activeTab === "all" ? questions : questions.filter(q => q.category === activeTab)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="glass-card rounded-2xl p-6 mb-8 sticky top-24 z-30 border border-primary/20 bg-background/80 backdrop-blur-md">
           <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-bold flex items-center gap-2"><Target /> Quiz System (30)</h2>
             <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg">
               {["all", "step", "expo"].map(t => <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-1 rounded-md text-xs font-bold ${activeTab === t ? "bg-primary text-white" : ""}`}>{t.toUpperCase()}</button>)}
             </div>
           </div>
           <Progress value={(Object.keys(checkedState).length / questions.length) * 100} className="h-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(q => (
            <motion.div key={q.id} className={`glass-card p-6 rounded-2xl border transition-all ${checkedState[q.id] ? (checkedState[q.id].isCorrect ? "border-emerald-500/50 bg-emerald-500/5" : "border-red-500/50 bg-red-500/5") : "border-border"}`}>
              <Badge variant="outline" className="mb-4">{q.level}</Badge>
              <h3 className="font-bold text-sm mb-6 leading-relaxed">{q.id}. {q.question}</h3>
              {q.type === "choice" ? (
                <div className="space-y-2">{q.options?.map((opt: any, i: number) => <button key={i} onClick={() => handleCheck(q.id, i, q.answer)} className={`w-full text-left p-3 rounded-xl text-xs border ${checkedState[q.id] ? (i === q.answer ? "border-emerald-500 bg-emerald-500/20" : "") : "hover:border-primary"}`}>{opt}</button>)}</div>
              ) : (
                <div className="flex gap-2"><input type="text" onChange={e => setInputValues({...inputValues, [q.id]: e.target.value})} className="flex-1 bg-black/20 border border-border rounded-xl px-4 py-2" placeholder="ตอบ..." /> <Button onClick={() => handleCheck(q.id, inputValues[q.id], q.answer)} size="icon"><ArrowRight /></Button></div>
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