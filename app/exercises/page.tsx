"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState, useMemo, useCallback } from "react"
import { Check, X, RefreshCw, Trophy, Target, Zap } from "lucide-react"

// --- Question Bank: Step Function (Updated with Real-world Examples) ---
const stepFunctionQuestions = [
  // โจทย์ประยุกต์ (15 ข้อใหม่)
  { q: "ค่าจอดรถชม.ละ 20 บาท (เศษชม.นับเป็น 1 ชม.) จอดรถนาน 1 ชม. 15 นาที ต้องจ่ายกี่บาท?", a: "40", options: ["20", "40", "60", "30"] },
  { q: "ค่าจอดรถ f(x) = 20⌈x⌉ บาท จอดรถนาน 3 ชม. 5 นาที ต้องจ่ายกี่บาท?", a: "80", options: ["60", "80", "100", "70"] },
  { q: "จอดรถตั้งแต่ 08:30 ถึง 10:45 น. (รวม 2.25 ชม.) ตามเงื่อนไข f(x) = 20⌈x⌉ ต้องจ่ายเท่าใด?", a: "60", options: ["40", "60", "80", "50"] },
  { q: "พัสดุหนักไม่เกิน 1 กก. (30บ.), >1-2 กก. (50บ.) ถ้าพัสดุหนัก 1.5 กก. จะเสียค่าส่งกี่บาท?", a: "50", options: ["30", "50", "70", "40"] },
  { q: "พัสดุหนัก >2-3 กก. เสียค่าส่ง 70 บาท ถ้าส่งพัสดุหนัก 2.1 กก. จะเสียค่าส่งกี่บาท?", a: "70", options: ["50", "60", "70", "90"] },
  { q: "ค่าส่งพัสดุ f(x) ตามน้ำหนัก x กก. โดย 0<x≤1 คือ 30บ. หาค่า f(0.8)", a: "30", options: ["0", "30", "50", "15"] },
  { q: "ภาษีเงินได้: ส่วนเกิน 100k แรกเสีย 5% หากมีรายได้ 120,000 บาท ต้องเสียภาษีกี่บาท?", a: "1,000", options: ["1,000", "5,000", "6,000", "0"] },
  { q: "ภาษีช่วง 100k-500k คือ 5% ถ้ามีเงินได้เกินมา 200,000 บาท จะเสียภาษีเฉพาะส่วนนี้กี่บาท?", a: "10,000", options: ["5,000", "10,000", "2,500", "0"] },
  { q: "ค่าจอดรถ 20⌈x⌉ บาท จอดนาน 4 ชม. เป๊ะๆ ต้องจ่ายกี่บาท?", a: "80", options: ["80", "100", "60", "40"] },
  { q: "พัสดุหนัก 0.5 กก. เสียค่าส่งกี่บาท? (เกณฑ์: ไม่เกิน 1 กก. 30บ.)", a: "30", options: ["30", "15", "0", "50"] },
  { q: "จอดรถนาน 5 ชม. 59 นาที ตามเกณฑ์ f(x) = 20⌈x⌉ ต้องจ่ายเท่าใด?", a: "120", options: ["100", "110", "120", "140"] },
  { q: "รายได้ส่วนที่เกิน 100,000 บาท เสียภาษี 5% ถ้าเกินมา 5,000 บาท เสียภาษีเท่าใด?", a: "250", options: ["250", "500", "50", "100"] },
  { q: "พัสดุหนัก 3.0 กก. พอดี เสียค่าส่งกี่บาท? (เกณฑ์: >2-3 กก. 70บ.)", a: "70", options: ["70", "80", "50", "90"] },
  { q: "จอดรถนาน 10 นาที (0.16 ชม.) ตามเกณฑ์ f(x) = 20⌈x⌉ ต้องจ่ายเท่าใด?", a: "20", options: ["0", "10", "20", "40"] },
  { q: "ถ้า f(x) = 20⌈x⌉ เป็นค่าจอดรถ และจ่ายเงินไป 100 บาท แสดงว่าจอดรถได้นานที่สุดกี่ชม.?", a: "5", options: ["4", "5", "6", "100"] },
  
  // โจทย์คำนวณพื้นฐาน (คงไว้บางส่วน)
  { q: "⌊4.9⌋ = ?", a: "4", options: ["4", "5", "3", "6"] },
  { q: "⌊-1.5⌋ = ?", a: "-2", options: ["-1", "-2", "1", "2"] },
  { q: "⌈3.2⌉ = ?", a: "4", options: ["3", "4", "2", "5"] },
  { q: "⌈-0.5⌉ = ?", a: "0", options: ["0", "-1", "1", "-0.5"] },
  { q: "⌊2.999⌋ = ?", a: "2", options: ["2", "3", "1", "2.999"] },
];

// --- Question Bank: Exponential Function ---
const exponentialQuestions = [
  { q: "2⁴ = ?", a: "16", options: ["8", "16", "32", "4"] },
  { q: "3³ = ?", a: "27", options: ["9", "27", "81", "6"] },
  { q: "5⁰ = ?", a: "1", options: ["0", "1", "5", "ไม่นิยาม"] },
  { q: "2⁻¹ = ?", a: "0.5", options: ["0.5", "-2", "2", "-0.5"] },
  { q: "4^(1/2) = ?", a: "2", options: ["2", "4", "8", "0.5"] },
  { q: "ถ้า 2ˣ = 8 แล้ว x = ?", a: "3", options: ["3", "4", "2", "8"] },
  { q: "ถ้า 3ˣ = 81 แล้ว x = ?", a: "4", options: ["3", "4", "27", "5"] },
  { q: "e⁰ = ?", a: "1", options: ["0", "1", "e", "ไม่นิยาม"] },
  { q: "ln(1) = ?", a: "0", options: ["0", "1", "e", "ไม่นิยาม"] },
  { q: "10⁻¹ = ?", a: "0.1", options: ["0.1", "-10", "10", "-0.1"] },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function ExercisesPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState<Record<number, boolean>>({})
  const [quizKey, setQuizKey] = useState(0)

  const questions = useMemo(() => {
    const allQuestions = [...stepFunctionQuestions, ...exponentialQuestions]
    const shuffled = shuffleArray(allQuestions)
    return shuffled.slice(0, 30).map((q, index) => ({ // ปรับเป็น 30 ข้อเพื่อให้โหลดเร็วขึ้น
      ...q,
      id: index + 1,
      options: shuffleArray(q.options),
    }))
  }, [quizKey])

  const handleSelectAnswer = useCallback((questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }))
    setShowResults((prev) => ({ ...prev, [questionId]: true }))
  }, [])

  const resetQuiz = useCallback(() => {
    setSelectedAnswers({})
    setShowResults({})
    setQuizKey((prev) => prev + 1)
  }, [])

  const correctCount = useMemo(() => {
    return questions.filter((q) => selectedAnswers[q.id] === q.a).length
  }, [questions, selectedAnswers])

  const answeredCount = Object.keys(selectedAnswers).length
  const percentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        {/* Stats Header */}
        <div className="glass rounded-xl p-6 mb-8 flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">คะแนน</p>
              <p className="text-2xl font-bold text-primary">{correctCount}/{answeredCount}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">ความแม่นยำ</p>
              <p className="text-2xl font-bold text-accent">{percentage}%</p>
            </div>
          </div>
          <button onClick={resetQuiz} className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80">
            <RefreshCw size={18} /> สุ่มโจทย์ใหม่
          </button>
        </div>

        {/* Questions List */}
        <div className="grid gap-6 md:grid-cols-2">
          {questions.map((q) => (
            <div key={q.id} className="glass-card p-5 rounded-xl border border-border/50">
              <p className="font-medium mb-4">{q.id}. {q.q}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    disabled={showResults[q.id]}
                    onClick={() => handleSelectAnswer(q.id, opt)}
                    className={`p-2 rounded-lg text-sm border transition-all ${
                      showResults[q.id]
                        ? opt === q.a 
                          ? "bg-accent/20 border-accent text-accent" 
                          : selectedAnswers[q.id] === opt 
                            ? "bg-destructive/20 border-destructive text-destructive" 
                            : "bg-secondary/30 opacity-50"
                        : "bg-secondary/50 hover:border-primary"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}