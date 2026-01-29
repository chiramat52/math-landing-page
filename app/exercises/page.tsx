"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, CheckCircle, XCircle, Lightbulb, RefreshCw, ArrowRight, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const allQuestions = [
  { id: 1, type: "choice", category: "step", level: "ง่าย", question: "⌊5.7⌋ คือเท่าใด?", options: ["4", "5", "6", "5.7"], answer: 1, explanation: "จำนวนเต็มมากที่สุดที่ไม่เกิน 5.7 คือ 5" },
  { id: 16, type: "input", category: "expo", level: "ง่าย", question: "3³ มีค่าเท่าใด?", answer: "27", explanation: "3 * 3 * 3 = 27" },
  // ... (ใส่ข้ออื่นๆ รวม 30 ข้อตามคลังโจทย์เดิม)
];

export default function ExercisesPage() {
  const [questions, setQuestions] = useState<any[]>([])
  const [checkedState, setCheckedState] = useState<Record<number, any>>({})
  const [inputValues, setInputValues] = useState<Record<number, string>>({})
  const [score, setScore] = useState(0)

  const shuffleAndReset = useCallback(() => {
    setQuestions([...allQuestions].sort(() => Math.random() - 0.5))
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
            <div className="flex gap-3">
              <Button onClick={shuffleAndReset} variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                <RefreshCw size={16} /> สุ่มใหม่ & รีเซ็ต
              </Button>
            </div>
          </div>
          <Progress value={(answeredCount / 30) * 100} className="h-2 mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {questions.map((q, idx) => (
              <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                className={`glass-card p-6 rounded-2xl border transition-all ${checkedState[q.id] ? (checkedState[q.id].isCorrect ? "border-emerald-500/50 bg-emerald-500/5" : "border-red-500/50 bg-red-500/5") : "border-border hover:border-primary/50"}`}
              >
                <div className="flex justify-between mb-4 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <span>{q.category}</span>
                  <span className="text-muted-foreground">{q.level}</span>
                </div>
                <h3 className="font-bold text-sm mb-6 leading-relaxed">{idx + 1}. {q.question}</h3>
                {q.type === "choice" ? (
                  <div className="space-y-2">
                    {q.options?.map((opt: string, i: number) => (
                      <button key={i} disabled={!!checkedState[q.id]} onClick={() => handleCheck(q.id, i, q.answer)}
                        className={`w-full text-left p-3 rounded-xl text-xs border ${checkedState[q.id] ? (i === q.answer ? "border-emerald-500 bg-emerald-500/20 font-bold" : "opacity-30") : "bg-white/5 hover:border-primary/40"}`}
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