"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState, useMemo, useCallback } from "react"
import { Check, X, RefreshCw, Trophy, Target, Zap } from "lucide-react"

// Question bank - Step Function
const stepFunctionQuestions = [
  { q: "⌊4.9⌋ = ?", a: "4", options: ["4", "5", "3", "6"] },
  { q: "⌊-1.5⌋ = ?", a: "-2", options: ["-1", "-2", "1", "2"] },
  { q: "⌊7.001⌋ = ?", a: "7", options: ["7", "8", "6", "7.001"] },
  { q: "⌈3.2⌉ = ?", a: "4", options: ["3", "4", "2", "5"] },
  { q: "⌈-0.5⌉ = ?", a: "0", options: ["0", "-1", "1", "-0.5"] },
  { q: "⌊10⌋ = ?", a: "10", options: ["10", "9", "11", "0"] },
  { q: "⌊2.999⌋ = ?", a: "2", options: ["2", "3", "1", "2.999"] },
  { q: "⌈5.0⌉ = ?", a: "5", options: ["5", "6", "4", "0"] },
  { q: "⌊-3.9⌋ = ?", a: "-4", options: ["-3", "-4", "-5", "3"] },
  { q: "⌈-2.1⌉ = ?", a: "-2", options: ["-2", "-3", "-1", "2"] },
  { q: "⌊0.5⌋ = ?", a: "0", options: ["0", "1", "-1", "0.5"] },
  { q: "⌈0.001⌉ = ?", a: "1", options: ["0", "1", "2", "0.001"] },
  { q: "⌊-0.001⌋ = ?", a: "-1", options: ["0", "-1", "1", "-0.001"] },
  { q: "⌊π⌋ = ? (π ≈ 3.14)", a: "3", options: ["3", "4", "3.14", "2"] },
  { q: "⌈e⌉ = ? (e ≈ 2.718)", a: "3", options: ["2", "3", "2.718", "4"] },
  { q: "ถ้า f(x) = ⌊x+1⌋ หา f(2.5)", a: "3", options: ["3", "4", "2", "3.5"] },
  { q: "ถ้า f(x) = ⌊2x⌋ หา f(1.7)", a: "3", options: ["3", "4", "2", "3.4"] },
  { q: "⌊√2⌋ = ? (√2 ≈ 1.414)", a: "1", options: ["1", "2", "1.414", "0"] },
  { q: "⌈√10⌉ = ? (√10 ≈ 3.162)", a: "4", options: ["3", "4", "3.162", "5"] },
  { q: "⌊100.99⌋ = ?", a: "100", options: ["100", "101", "99", "100.99"] },
  { q: "⌊-7.7⌋ = ?", a: "-8", options: ["-7", "-8", "7", "8"] },
  { q: "⌈-4.4⌉ = ?", a: "-4", options: ["-4", "-5", "4", "5"] },
  { q: "⌊1/3⌋ = ?", a: "0", options: ["0", "1", "-1", "0.33"] },
  { q: "⌈-1/2⌉ = ?", a: "0", options: ["0", "-1", "1", "-0.5"] },
  { q: "⌊5.5⌋ + ⌈5.5⌉ = ?", a: "11", options: ["10", "11", "12", "5.5"] },
]

// Question bank - Exponential Function
const exponentialQuestions = [
  { q: "2⁴ = ?", a: "16", options: ["8", "16", "32", "4"] },
  { q: "3³ = ?", a: "27", options: ["9", "27", "81", "6"] },
  { q: "5⁰ = ?", a: "1", options: ["0", "1", "5", "ไม่นิยาม"] },
  { q: "2⁻¹ = ?", a: "0.5", options: ["0.5", "-2", "2", "-0.5"] },
  { q: "10² = ?", a: "100", options: ["20", "100", "1000", "10"] },
  { q: "4^(1/2) = ?", a: "2", options: ["2", "4", "8", "0.5"] },
  { q: "8^(1/3) = ?", a: "2", options: ["2", "4", "8/3", "24"] },
  { q: "e^(ln 3) = ?", a: "3", options: ["e", "3", "ln 3", "1"] },
  { q: "ln(e²) = ?", a: "2", options: ["e²", "2", "2e", "1"] },
  { q: "2³ × 2² = ?", a: "32", options: ["32", "64", "12", "10"] },
  { q: "3⁴ ÷ 3² = ?", a: "9", options: ["9", "3", "81", "6"] },
  { q: "(2²)³ = ?", a: "64", options: ["12", "32", "64", "8"] },
  { q: "5⁻² = ?", a: "0.04", options: ["0.04", "-25", "25", "-0.04"] },
  { q: "9^(1/2) = ?", a: "3", options: ["3", "4.5", "81", "18"] },
  { q: "27^(1/3) = ?", a: "3", options: ["3", "9", "27/3", "81"] },
  { q: "ถ้า 2ˣ = 8 แล้ว x = ?", a: "3", options: ["3", "4", "2", "8"] },
  { q: "ถ้า 3ˣ = 81 แล้ว x = ?", a: "4", options: ["3", "4", "27", "5"] },
  { q: "ถ้า 5ˣ = 125 แล้ว x = ?", a: "3", options: ["2", "3", "25", "4"] },
  { q: "e⁰ = ?", a: "1", options: ["0", "1", "e", "ไม่นิยาม"] },
  { q: "ln(1) = ?", a: "0", options: ["0", "1", "e", "ไม่นิยาม"] },
  { q: "2⁵ = ?", a: "32", options: ["10", "32", "64", "25"] },
  { q: "4³ = ?", a: "64", options: ["12", "64", "16", "81"] },
  { q: "10⁻¹ = ?", a: "0.1", options: ["0.1", "-10", "10", "-0.1"] },
  { q: "16^(1/4) = ?", a: "2", options: ["2", "4", "8", "16"] },
  { q: "ถ้า eˣ = e⁵ แล้ว x = ?", a: "5", options: ["e", "5", "e⁵", "ln 5"] },
]

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

  // Generate 50 random questions
  const questions = useMemo(() => {
    const allQuestions = [...stepFunctionQuestions, ...exponentialQuestions]
    const shuffled = shuffleArray(allQuestions)
    return shuffled.slice(0, 50).map((q, index) => ({
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
    <main className="min-h-screen bg-background math-grid">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">ฝึกฝนทักษะคณิตศาสตร์</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              แบบ<span className="text-primary">ฝึกหัด</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              ทดสอบความเข้าใจของคุณด้วยแบบฝึกหัด 50 ข้อ สุ่มจากฟังก์ชันขั้นบันไดและฟังก์ชันเอกซ์โพเนนเชียล
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6 mb-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ถูกต้อง</p>
                    <p className="text-xl font-bold text-accent">{correctCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-destructive/20 border border-destructive/30 flex items-center justify-center">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ผิด</p>
                    <p className="text-xl font-bold text-destructive">{answeredCount - correctCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ความแม่นยำ</p>
                    <p className="text-xl font-bold text-primary">{percentage}%</p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 text-foreground transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-medium">สุ่มใหม่</span>
              </motion.button>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>ความคืบหน้า</span>
                <span>{answeredCount}/50 ข้อ</span>
              </div>
              <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(answeredCount / 50) * 100}%` }}
                  className="h-full bg-primary rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Questions Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <AnimatePresence>
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`glass-card rounded-xl p-5 transition-all duration-300 ${
                    showResults[question.id]
                      ? selectedAnswers[question.id] === question.a
                        ? "border-accent/50"
                        : "border-destructive/50"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                        showResults[question.id]
                          ? selectedAnswers[question.id] === question.a
                            ? "bg-accent/20 border border-accent/30 text-accent"
                            : "bg-destructive/20 border border-destructive/30 text-destructive"
                          : "bg-primary/20 border border-primary/30 text-primary"
                      }`}
                    >
                      {question.id}
                    </div>
                    <p className="text-foreground font-medium">{question.q}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {question.options.map((option) => {
                      const isSelected = selectedAnswers[question.id] === option
                      const isCorrect = option === question.a
                      const showResult = showResults[question.id]

                      return (
                        <motion.button
                          key={option}
                          whileHover={!showResult ? { scale: 1.02 } : {}}
                          whileTap={!showResult ? { scale: 0.98 } : {}}
                          onClick={() => !showResult && handleSelectAnswer(question.id, option)}
                          disabled={showResult}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            showResult
                              ? isCorrect
                                ? "bg-accent/20 text-accent border border-accent/40"
                                : isSelected
                                  ? "bg-destructive/20 text-destructive border border-destructive/40"
                                  : "bg-secondary/30 text-muted-foreground border border-transparent"
                              : "bg-secondary/50 text-foreground hover:bg-secondary/70 border border-transparent hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {showResult && isCorrect && <Check className="w-4 h-4" />}
                            {showResult && isSelected && !isCorrect && <X className="w-4 h-4" />}
                            <span>{option}</span>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
