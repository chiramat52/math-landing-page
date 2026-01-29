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
  {
    id: 1,
    type: "choice",
    category: "step",
    level: "ง่าย",
    question: "ค่าของ ⌊4.9⌋ เท่ากับเท่าไร?",
    options: ["3", "4", "5", "4.9"],
    answer: 1,
    explanation: "⌊4.9⌋ = 4 เพราะ 4 เป็นจำนวนเต็มที่มากที่สุดที่น้อยกว่าหรือเท่ากับ 4.9",
  },
  {
    id: 2,
    type: "choice",
    category: "step",
    level: "ง่าย",
    question: "ค่าของ ⌊-1.5⌋ เท่ากับเท่าไร?",
    options: ["-1", "-2", "-1.5", "0"],
    answer: 1,
    explanation: "⌊-1.5⌋ = -2 เพราะ -2 เป็นจำนวนเต็มที่มากที่สุดที่น้อยกว่าหรือเท่ากับ -1.5",
  },
  {
    id: 3,
    type: "choice",
    category: "step",
    level: "ปานกลาง",
    question: "พัสดุธรรมดาหนัก 3.7 กิโลกรัม ค่าส่งเท่าไร? (0-1kg=20฿, 1-2kg=35฿, 2-3kg=50฿, 3-4kg=65฿, 4-5kg=80฿)",
    options: ["50 บาท", "65 บาท", "80 บาท", "35 บาท"],
    answer: 1,
    explanation: "3.7 กก. อยู่ในช่วง 3 < x ≤ 4 กก. ดังนั้นราคาคือ 65 บาท",
  },
  {
    id: 4,
    type: "choice",
    category: "step",
    level: "ปานกลาง",
    question: "พัสดุลงทะเบียนหนัก 450 กรัม ค่าส่งเท่าไร? (0-100g=18฿, 100-250g=22฿, 250-500g=28฿, 500-1000g=38฿)",
    options: ["22 บาท", "28 บาท", "38 บาท", "18 บาท"],
    answer: 1,
    explanation: "450 กรัม อยู่ในช่วง 250 < x ≤ 500 กรัม ราคาคือ 28 บาท",
  },
  {
    id: 5,
    type: "choice",
    category: "step",
    level: "ปานกลาง",
    question: "ส่งพัสดุลงทะเบียน 2 กล่อง: 80g และ 600g รวมค่าส่งเท่าไร?",
    options: ["46 บาท", "56 บาท", "66 บาท", "76 บาท"],
    answer: 1,
    explanation: "80g = 18 บาท, 600g = 38 บาท รวมเป็น 56 บาท",
  },
  {
    id: 6,
    type: "choice",
    category: "step",
    level: "ยาก",
    question: "เงินได้สุทธิ 250,000 บาท เสียภาษีเท่าไร? (0-150k ยกเว้น, 150k-300k = 5%)",
    options: ["5,000 บาท", "7,500 บาท", "10,000 บาท", "12,500 บาท"],
    answer: 0,
    explanation: "150,000 แรกยกเว้น ส่วนเกินคือ 100,000 คิด 5% = 5,000 บาท",
  },
  {
    id: 7,
    type: "choice",
    category: "step",
    level: "ยาก",
    question: "ค่าไฟ 300 หน่วย เท่าไร? (0-150 หน่วยแรก 3.25฿, หน่วยที่ 151-400 คิด 4.22฿)",
    options: ["909.50 บาท", "975.00 บาท", "1,120.50 บาท", "1,266.00 บาท"],
    answer: 2,
    explanation: "(150 * 3.25) + (150 * 4.22) = 487.5 + 633 = 1,120.5 บาท",
  },
  {
    id: 8,
    type: "choice",
    category: "step",
    level: "ปานกลาง",
    question: "ถอนเงินต่างธนาคารในเขตเดียวกัน ฟรี 3 ครั้งแรก ครั้งต่อไป 10 บาท ถ้าถอน 5 ครั้ง เสียเท่าไร?",
    options: ["10 บาท", "20 บาท", "30 บาท", "50 บาท"],
    answer: 1,
    explanation: "3 ครั้งแรกฟรี ครั้งที่ 4 และ 5 เสียครั้งละ 10 บาท รวมเป็น 20 บาท",
  },
  {
    id: 9,
    type: "choice",
    category: "step",
    level: "ยาก",
    question: "ค่าจอดรถ 2 ชม. แรกฟรี ชม. ต่อไป ชม. ละ 20 บาท (เศษชม. คิดเป็น 1 ชม.) จอด 3 ชม. 15 นาที จ่ายเท่าไร?",
    options: ["20 บาท", "40 บาท", "60 บาท", "80 บาท"],
    answer: 1,
    explanation: "ฟรี 2 ชม. เหลือ 1 ชม. 15 นาที ปัดเป็น 2 ชม. จ่าย 2 * 20 = 40 บาท",
  },
  {
    id: 10,
    type: "choice",
    category: "step",
    level: "ยาก",
    question: "พัสดุธรรมดาหนัก 4.5kg แพงกว่าพัสดุหนัก 2.2kg เท่าไร? (เกณฑ์เดิม)",
    options: ["30 บาท", "45 บาท", "15 บาท", "50 บาท"],
    answer: 0,
    explanation: "4.5kg จ่าย 80 บาท, 2.2kg จ่าย 50 บาท ต่างกัน 30 บาท",
  },
]

const expoQuestions: Question[] = [
  {
    id: 11,
    type: "input",
    category: "expo",
    level: "ง่าย",
    question: "จงหาค่าของ 2⁴",
    answer: 16,
    explanation: "2⁴ = 2 × 2 × 2 × 2 = 16",
  },
  {
    id: 12,
    type: "input",
    category: "expo",
    level: "ง่าย",
    question: "จงหาค่าของ 3³",
    answer: 27,
    explanation: "3³ = 3 × 3 × 3 = 27",
  },
  {
    id: 13,
    type: "input",
    category: "expo",
    level: "ง่าย",
    question: "จงหาค่าของ 5²",
    answer: 25,
    explanation: "5² = 5 × 5 = 25",
  },
  {
    id: 14,
    type: "choice",
    category: "expo",
    level: "ปานกลาง",
    question: "แบคทีเรีย 100 ตัว เพิ่ม 2 เท่าทุกชั่วโมง ผ่านไป 4 ชม. มีกี่ตัว?",
    options: ["400 ตัว", "800 ตัว", "1,600 ตัว", "3,200 ตัว"],
    answer: 2,
    explanation: "N = 100 × 2⁴ = 1,600 ตัว",
  },
  {
    id: 15,
    type: "choice",
    category: "expo",
    level: "ปานกลาง",
    question: "ฝากเงิน 10,000 บาท ดอกเบี้ย 10% ต่อปี ทบต้น 2 ปี จะมีเงินรวมเท่าไร?",
    options: ["11,000 บาท", "12,000 บาท", "12,100 บาท", "12,210 บาท"],
    answer: 2,
    explanation: "10,000 × (1.1)² = 12,100 บาท",
  },
  {
    id: 16,
    type: "choice",
    category: "expo",
    level: "ยาก",
    question: "สารกัมมันตรังสีมีครึ่งชีวิต 5 ปี เริ่มต้น 80g ผ่านไป 15 ปี จะเหลือกี่กรัม?",
    options: ["40 กรัม", "20 กรัม", "10 กรัม", "5 กรัม"],
    answer: 2,
    explanation: "15 ปี คือ 3 รอบครึ่งชีวิต (80 -> 40 -> 20 -> 10)",
  },
  {
    id: 17,
    type: "input",
    category: "expo",
    level: "ง่าย",
    question: "จงหาค่าของ 10³",
    answer: 1000,
    explanation: "10 × 10 × 10 = 1,000",
  },
  {
    id: 18,
    type: "choice",
    category: "expo",
    level: "ปานกลาง",
    question: "มูลค่ารถยนต์ 500,000 บาท ลดลง 20% ทุกปี เมื่อครบ 2 ปี จะเหลือมูลค่าเท่าไร?",
    options: ["400,000 บาท", "320,000 บาท", "300,000 บาท", "280,000 บาท"],
    answer: 1,
    explanation: "500,000 × (0.8)² = 320,000 บาท",
  },
  {
    id: 19,
    type: "input",
    category: "expo",
    level: "ปานกลาง",
    question: "ถ้า 2ˣ = 32 แล้ว x มีค่าเท่าใด?",
    answer: 5,
    explanation: "2⁵ = 32 ดังนัน x = 5",
  },
  {
    id: 20,
    type: "choice",
    category: "expo",
    level: "ยาก",
    question: "คน 1 คนบอกต่อข่าวให้เพื่อน 3 คนทุกชั่วโมง ผ่านไป 3 ชม. จะมีคนรู้ข่าวใหม่เพิ่มขึ้นกี่คน? (ไม่รวมคนแรก)",
    options: ["9 คน", "27 คน", "39 คน", "81 คน"],
    answer: 1,
    explanation: "ในชั่วโมงที่ 3 จะมีคนรับข่าวเพิ่ม 3³ = 27 คน",
  },
  {
    id: 21,
    type: "input",
    category: "expo",
    level: "ง่าย",
    question: "จงหาค่าของ 7²",
    answer: 49,
    explanation: "7 × 7 = 49",
  },
  {
    id: 22,
    type: "choice",
    category: "expo",
    level: "ปานกลาง",
    question: "จงหาค่าของ (2²)³",
    options: ["2⁵", "2⁶", "4³", "64"],
    answer: 1,
    explanation: "ใช้สมบัติ (aᵐ)ⁿ = aᵐⁿ ดังนั้น 2²*³ = 2⁶ = 64",
  },
  {
    id: 23,
    type: "input",
    category: "expo",
    level: "ง่าย",
    question: "จงหาค่าของ 6³",
    answer: 216,
    explanation: "6 × 6 × 6 = 216",
  },
  {
    id: 24,
    type: "choice",
    category: "expo",
    level: "ยาก",
    question: "ประชากรเมืองหนึ่ง 50,000 คน เพิ่มขึ้น 2% ต่อปี อีก 2 ปีจะมีประชากรกี่คน?",
    options: ["52,000 คน", "52,020 คน", "51,000 คน", "53,000 คน"],
    answer: 1,
    explanation: "50,000 × (1.02)² = 52,020 คน",
  },
  {
    id: 25,
    type: "input",
    category: "expo",
    level: "ปานกลาง",
    question: "จงหาค่าของ 10⁻² (ตอบในรูปทศนิยม)",
    answer: "0.01",
    explanation: "10⁻² = 1/10² = 1/100 = 0.01",
  },
]

export function ExercisesSection() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [score, setScore] = useState(0)
  const [checkedState, setCheckedState] = useState<
    Record<number, { isCorrect: boolean; userAnswer: number | string }>
  >({})
  const [activeCategory, setActiveCategory] = useState<"all" | "step" | "expo">(
    "all"
  )
  const [inputValues, setInputValues] = useState<Record<number, string>>({})

  useEffect(() => {
    const allQuestions = [...stepQuestions, ...expoQuestions].sort(
      () => Math.random() - 0.5
    )
    setQuestions(allQuestions)
  }, [])

  const filteredQuestions =
    activeCategory === "all"
      ? questions
      : questions.filter((q) => q.category === activeCategory)

  const answeredCount = Object.keys(checkedState).length
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0

  const handleCheck = (
    id: number,
    val: number | string,
    correctVal: number | string
  ) => {
    if (checkedState[id]) return

    let isCorrect = false
    if (typeof val === "number" && typeof correctVal === "number") {
      isCorrect = val === correctVal
    } else {
      isCorrect = val.toString().trim() === correctVal.toString().trim()
    }

    setCheckedState((prev) => ({
      ...prev,
      [id]: { isCorrect, userAnswer: val },
    }))
    if (isCorrect) setScore((prev) => prev + 1)
  }

  const handleReset = () => {
    setCheckedState({})
    setScore(0)
    setInputValues({})
    setQuestions([...stepQuestions, ...expoQuestions].sort(() => Math.random() - 0.5))
  }

  const levelColors = {
    ง่าย: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    ปานกลาง: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    ยาก: "bg-red-500/10 text-red-400 border-red-500/30",
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header HUD */}
      <div className="glass-card rounded-2xl p-6 mb-8 sticky top-20 z-30">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Target className="text-amber-400" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">แบบฝึกหัดท้าทาย</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>คะแนน: <span className="text-primary font-bold text-lg">{score}</span> / {questions.length}</span>
                <span>ทำแล้ว: <span className="text-foreground font-medium">{answeredCount}</span> ข้อ</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-secondary/50 p-1 rounded-lg">
              {(["all", "step", "expo"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeCategory === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "all" ? "ทั้งหมด" : tab === "step" ? "ขั้นบันได" : "เอ็กซ์โพ"}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 bg-transparent"><RefreshCw size={16} />เริ่มใหม่</Button>
          </div>
        </div>
        <Progress value={progress} className="h-2 mt-4" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredQuestions.map((q, index) => {
            const state = checkedState[q.id]
            const isAnswered = !!state
            const isCorrect = state?.isCorrect

            return (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <div className={`glass-card rounded-xl overflow-hidden h-full flex flex-col transition-all ${isAnswered ? (isCorrect ? "ring-2 ring-emerald-500/50" : "ring-2 ring-red-500/50") : "hover:bg-secondary/30"}`}>
                  <div className="p-4 border-b border-border/50 bg-secondary/20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={q.category === "step" ? "text-cyan-400 border-cyan-500/30" : "text-violet-400 border-violet-500/30"}>
                        {q.category === "step" ? "Step" : "Expo"}
                      </Badge>
                      <Badge variant="outline" className={levelColors[q.level]}>{q.level}</Badge>
                    </div>
                    {isAnswered && (isCorrect ? <CheckCircle className="text-emerald-400" size={20} /> : <XCircle className="text-red-400" size={20} />)}
                  </div>

                  <div className="p-4 flex-grow">
                    <h3 className="text-foreground font-medium mb-4 leading-relaxed">{q.question}</h3>
                    {q.type === "choice" ? (
                      <div className="space-y-2">
                        {q.options?.map((opt, idx) => (
                          <button
                            key={opt}
                            disabled={isAnswered}
                            onClick={() => handleCheck(q.id, idx, q.answer)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${isAnswered ? (idx === q.answer ? "bg-emerald-500/20 border border-emerald-500/50" : idx === state.userAnswer ? "bg-red-500/20 border border-red-500/50" : "opacity-50") : "bg-secondary/30 hover:bg-secondary/50 border border-transparent hover:border-primary/30"}`}
                          >{opt}</button>
                        ))}
                      </div>
                    ) : (
                      !isAnswered && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={inputValues[q.id] || ""}
                            onChange={(e) => setInputValues({ ...inputValues, [q.id]: e.target.value })}
                            className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 text-center font-mono"
                            placeholder="คำตอบ..."
                          />
                          <Button size="icon" onClick={() => handleCheck(q.id, inputValues[q.id], q.answer)}><ArrowRight size={18} /></Button>
                        </div>
                      )
                    )}
                  </div>

                  {isAnswered && (
                    <div className="p-4 border-t border-border/50 bg-secondary/10">
                      <div className="flex items-start gap-2">
                        <Lightbulb size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {answeredCount === questions.length && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-12 glass-card rounded-2xl p-8 text-center max-w-lg mx-auto">
          <Trophy size={48} className="text-amber-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">ยอดเยี่ยมมาก!</h3>
          <p className="text-muted-foreground mb-4">คุณทำคะแนนได้ {score} / {questions.length}</p>
          <Button onClick={handleReset} className="gap-2">เล่นอีกครั้ง</Button>
        </motion.div>
      )}
    </div>
  )
}