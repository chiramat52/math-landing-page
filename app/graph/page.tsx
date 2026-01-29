"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  BarChart3, 
  Sparkles, 
  Check, 
  X, 
  RotateCcw, 
  Lightbulb,
  Pencil,
  Eye,
  EyeOff
} from "lucide-react"

interface Point {
  x: number
  y: number
}

interface Problem {
  id: number
  type: "step" | "exponential"
  question: string
  formula: string
  answer: Point[]
  tolerance: number
}

const stepProblems: Problem[] = [
  {
    id: 1,
    type: "step",
    question: "วาดกราฟ f(x) = 2⌊x⌋ + 1 ในช่วง -2 ≤ x ≤ 4",
    formula: "f(x) = 2⌊x⌋ + 1",
    answer: [
      { x: -2, y: -3 }, { x: -1, y: -3 },
      { x: -1, y: -1 }, { x: 0, y: -1 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
      { x: 1, y: 3 }, { x: 2, y: 3 },
      { x: 2, y: 5 }, { x: 3, y: 5 },
      { x: 3, y: 7 }, { x: 4, y: 7 },
    ],
    tolerance: 0.5
  },
  {
    id: 2,
    type: "step",
    question: "วาดกราฟ f(x) = ⌊x⌋ + 2 ในช่วง -1 ≤ x ≤ 3",
    formula: "f(x) = ⌊x⌋ + 2",
    answer: [
      { x: -1, y: 1 }, { x: 0, y: 1 },
      { x: 0, y: 2 }, { x: 1, y: 2 },
      { x: 1, y: 3 }, { x: 2, y: 3 },
      { x: 2, y: 4 }, { x: 3, y: 4 },
    ],
    tolerance: 0.5
  }
]

const exponentialProblems: Problem[] = [
  {
    id: 1,
    type: "exponential",
    question: "วาดกราฟ f(x) = 3ˣ และ g(x) = (1/3)ˣ",
    formula: "f(x) = 3ˣ, g(x) = (1/3)ˣ",
    answer: [],
    tolerance: 0.8
  },
  {
    id: 2,
    type: "exponential",
    question: "วาดกราฟ f(x) = 2ˣ + 1",
    formula: "f(x) = 2ˣ + 1",
    answer: [],
    tolerance: 0.8
  }
]

export function GraphPlayground() {
  const [selectedTab, setSelectedTab] = useState<"step" | "exponential">("step")
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userPoints, setUserPoints] = useState<Point[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 })

  const problems = selectedTab === "step" ? stepProblems : exponentialProblems
  const problem = problems[currentProblem]

  // Canvas setup
  useEffect(() => {
    const updateSize = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        const width = Math.min(container.clientWidth - 32, 700)
        const height = Math.min(width * 0.7, 500)
        setCanvasSize({ width, height })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    drawCanvas()
  }, [userPoints, showAnswer, canvasSize, problem])

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvasSize
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.fillStyle = 'rgba(22, 27, 34, 0.95)'
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
    ctx.lineWidth = 1
    const gridSize = 40

    for (let i = 0; i <= width; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }

    for (let i = 0; i <= height; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Draw axes
    const centerX = width / 2
    const centerY = height / 2

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.lineWidth = 2

    // X-axis
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()

    // Draw axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.font = '12px JetBrains Mono, monospace'
    ctx.textAlign = 'center'

    // X-axis numbers
    for (let i = -5; i <= 5; i++) {
      const x = centerX + i * gridSize
      if (i !== 0) {
        ctx.fillText(i.toString(), x, centerY + 20)
      }
    }

    // Y-axis numbers
    ctx.textAlign = 'right'
    for (let i = -5; i <= 5; i++) {
      const y = centerY - i * gridSize
      if (i !== 0) {
        ctx.fillText(i.toString(), centerX - 10, y + 5)
      }
    }

    // Draw answer if shown
    if (showAnswer && problem.answer.length > 0) {
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)'
      ctx.lineWidth = 3
      ctx.setLineDash([5, 5])

      ctx.beginPath()
      problem.answer.forEach((point, idx) => {
        const canvasX = centerX + point.x * gridSize
        const canvasY = centerY - point.y * gridSize
        if (idx === 0) {
          ctx.moveTo(canvasX, canvasY)
        } else {
          ctx.lineTo(canvasX, canvasY)
        }
      })
      ctx.stroke()
      ctx.setLineDash([])

      // Draw answer points
      problem.answer.forEach(point => {
        const canvasX = centerX + point.x * gridSize
        const canvasY = centerY - point.y * gridSize
        ctx.fillStyle = 'rgba(34, 197, 94, 0.8)'
        ctx.beginPath()
        ctx.arc(canvasX, canvasY, 4, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw user's drawing
    if (userPoints.length > 0) {
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, '#06b6d4')
      gradient.addColorStop(0.5, '#8b5cf6')
      gradient.addColorStop(1, '#ec4899')

      ctx.strokeStyle = gradient
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      userPoints.forEach((point, idx) => {
        if (idx === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })
      ctx.stroke()

      // Draw points
      userPoints.forEach((point, idx) => {
        ctx.fillStyle = idx === 0 ? '#06b6d4' : idx === userPoints.length - 1 ? '#ec4899' : '#8b5cf6'
        ctx.beginPath()
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2)
        ctx.fill()
      })
    }
  }

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (showAnswer) return
    setIsDrawing(true)
    setIsChecked(false)
    setScore(null)
    const coords = getCanvasCoordinates(e)
    setUserPoints([coords])
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || showAnswer) return
    const coords = getCanvasCoordinates(e)
    setUserPoints(prev => [...prev, coords])
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const convertToMathCoordinates = (points: Point[]): Point[] => {
    const { width, height } = canvasSize
    const centerX = width / 2
    const centerY = height / 2
    const gridSize = 40

    return points.map(p => ({
      x: Math.round((p.x - centerX) / gridSize * 10) / 10,
      y: Math.round((centerY - p.y) / gridSize * 10) / 10
    }))
  }

  const checkAnswer = () => {
    if (userPoints.length === 0 || problem.answer.length === 0) {
      setScore(0)
      setIsChecked(true)
      return
    }

    const mathPoints = convertToMathCoordinates(userPoints)
    let matchCount = 0
    const tolerance = problem.tolerance

    // Sample user points to match answer length
    const sampleSize = Math.min(mathPoints.length, 50)
    const sampledPoints = mathPoints.filter((_, idx) => 
      idx % Math.ceil(mathPoints.length / sampleSize) === 0
    )

    // Check how many user points are close to the answer curve
    sampledPoints.forEach(userPoint => {
      const hasMatch = problem.answer.some(answerPoint => {
        const distance = Math.sqrt(
          Math.pow(userPoint.x - answerPoint.x, 2) + 
          Math.pow(userPoint.y - answerPoint.y, 2)
        )
        return distance <= tolerance
      })
      if (hasMatch) matchCount++
    })

    const accuracy = (matchCount / sampledPoints.length) * 100
    setScore(Math.round(accuracy))
    setIsChecked(true)
  }

  const resetCanvas = () => {
    setUserPoints([])
    setShowAnswer(false)
    setIsChecked(false)
    setScore(null)
  }

  const nextProblem = () => {
    setCurrentProblem((prev) => (prev + 1) % problems.length)
    resetCanvas()
  }

  const prevProblem = () => {
    setCurrentProblem((prev) => (prev - 1 + problems.length) % problems.length)
    resetCanvas()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
        >
          <Pencil size={20} className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Interactive Graph Drawing</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold"
        >
          <span className="gradient-text">วาดกราฟด้วยตัวเอง</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          ลองวาดกราฟตามโจทย์ที่กำหนดและตรวจสอบความถูกต้อง
        </motion.p>
      </div>

      {/* Graph Tabs */}
      <Tabs value={selectedTab} onValueChange={(v) => {
        setSelectedTab(v as "step" | "exponential")
        setCurrentProblem(0)
        resetCanvas()
      }} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-card p-1">
          <TabsTrigger value="step" className="flex items-center gap-2">
            <BarChart3 size={16} />
            ฟังก์ชันขั้นบันได
          </TabsTrigger>
          <TabsTrigger value="exponential" className="flex items-center gap-2">
            <TrendingUp size={16} />
            ฟังก์ชันเอกซ์โพเนนเชียล
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Canvas Area */}
            <Card className="lg:col-span-2 glass-card border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 mb-2">
                      <Sparkles size={20} className="text-primary" />
                      โจทย์ที่ {currentProblem + 1}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {problem.question}
                    </CardDescription>
                    <Badge variant="outline" className="mt-2 font-mono text-primary border-primary/30">
                      {problem.formula}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Canvas */}
                  <div className="relative rounded-xl overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-slate-900 to-slate-800">
                    <canvas
                      ref={canvasRef}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      className="w-full cursor-crosshair"
                      style={{ touchAction: 'none' }}
                    />
                    {showAnswer && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 glass-card px-3 py-2 rounded-lg">
                        <Eye size={16} className="text-green-500" />
                        <span className="text-sm text-green-500 font-medium">แสดงเฉลย</span>
                      </div>
                    )}
                  </div>

                  {/* Results */}
                  <AnimatePresence>
                    {isChecked && score !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-4 rounded-xl border-2 ${
                          score >= 80 
                            ? 'bg-green-500/10 border-green-500/30' 
                            : score >= 60 
                            ? 'bg-yellow-500/10 border-yellow-500/30'
                            : 'bg-red-500/10 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {score >= 80 ? (
                              <Check size={24} className="text-green-500" />
                            ) : (
                              <X size={24} className="text-red-500" />
                            )}
                            <div>
                              <p className="font-bold text-lg">
                                {score >= 80 ? 'ยอดเยี่ยม!' : score >= 60 ? 'ใกล้เคียงแล้ว' : 'ลองอีกครั้ง'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ความแม่นยำ: {score}%
                              </p>
                            </div>
                          </div>
                          <div className="text-4xl font-bold gradient-text">
                            {score}%
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Control Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={checkAnswer}
                      disabled={userPoints.length === 0 || showAnswer}
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Check size={18} />
                      ตรวจคำตอบ
                    </button>
                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-card border border-primary/30 text-foreground font-medium hover:bg-primary/10 transition-all"
                    >
                      {showAnswer ? <EyeOff size={18} /> : <Eye size={18} />}
                      {showAnswer ? 'ซ่อนเฉลย' : 'ดูเฉลย'}
                    </button>
                    <button
                      onClick={resetCanvas}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-card border border-border hover:bg-secondary/50 transition-all"
                    >
                      <RotateCcw size={18} />
                      ล้าง
                    </button>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-2">
                    <button
                      onClick={prevProblem}
                      className="flex-1 px-4 py-2 rounded-lg glass-card border border-border hover:bg-secondary/50 transition-all text-sm"
                    >
                      ← โจทย์ก่อนหน้า
                    </button>
                    <button
                      onClick={nextProblem}
                      className="flex-1 px-4 py-2 rounded-lg glass-card border border-border hover:bg-secondary/50 transition-all text-sm"
                    >
                      โจทย์ถัดไป →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions Panel */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb size={18} className="text-yellow-500" />
                  วิธีใช้งาน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">วาดกราฟ</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        กดค้างและลากเมาส์บนตารางกราฟ
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">ตรวจคำตอบ</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        กดปุ่ม "ตรวจคำตอบ" เมื่อวาดเสร็จ
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">ดูเฉลย</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        กดปุ่ม "ดูเฉลย" เพื่อดูคำตอบที่ถูกต้อง
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" />
                    เกณฑ์การให้คะแนน
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-muted-foreground">80-100% = ยอดเยี่ยม!</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-muted-foreground">60-79% = ใกล้เคียง</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-muted-foreground">0-59% = ลองใหม่</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-sm mb-2">💡 เคล็ดลับ</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {selectedTab === "step" ? (
                      <>
                        <li>• วาดเส้นแนวนอนในแต่ละขั้น</li>
                        <li>• ระวังจุดกระโดดที่เลขเต็ม</li>
                        <li>• ค่า y คงที่ในแต่ละช่วง</li>
                      </>
                    ) : (
                      <>
                        <li>• กราฟโค้งนุ่มนวล ไม่มีมุม</li>
                        <li>• ผ่านจุด (0, 1) สำหรับ aˣ</li>
                        <li>• เติบโตหรือลดแบบเร่งตัว</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
