"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  TrendingUp,
  ChevronDown,
  CheckCircle,
  Zap,
  Dna,
  Atom,
  PiggyBank,
  BarChart3,
  FlaskConical,
  Move
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/* =========================
   TYPES
========================= */
interface Example {
  id: string
  title: string
  level: "ง่าย" | "ปานกลาง" | "ยาก"
  problem: string
  steps: string[]
  answer: string
  icon?: LucideIcon
}

/* =========================
   STEP FUNCTION EXAMPLES
========================= */
const stepFunctionExamples: Example[] = [
  {
    id: "s1",
    title: "การปัดเศษค่าขนส่ง",
    level: "ง่าย",
    problem: "ส่งของหนัก 7.2 กก. คิดค่าส่งเป็นกี่กิโลกรัม?",
    steps: [
      "ฟังก์ชันปัดขึ้น (Ceiling) คือ ⌈7.2⌉",
      "จำนวนเต็มที่น้อยที่สุดที่ ≥ 7.2 คือ 8"
    ],
    answer: "8 กิโลกรัม"
  },
  {
    id: "s2",
    title: "ค่าบริการทางด่วน",
    level: "ง่าย",
    problem: "รถ 4 ล้อจ่าย 50 บาท, 6-10 ล้อจ่าย 75 บาท รถ 6 ล้อจ่ายเท่าไร?",
    steps: [
      "รถ 6 ล้ออยู่ในช่วง 6-10 ล้อ",
      "คิดราคาคงที่ 75 บาท"
    ],
    answer: "75 บาท"
  },
  {
    id: "s3",
    title: "ค่าจอดรถรายชั่วโมง",
    level: "ปานกลาง",
    problem: "จอด 2 ชม. 45 นาที (เศษนาทีคิดเป็น 1 ชม.) คิดกี่ชม.?",
    steps: [
      "45 นาทีปัดขึ้นเป็น 1 ชั่วโมง",
      "2 + 1 = 3 ชั่วโมง"
    ],
    answer: "3 ชั่วโมง"
  },
  {
    id: "s4",
    title: "ภาษีป้าย",
    level: "ปานกลาง",
    problem: "ป้ายขนาด 1.2 ตร.ม. (ขั้นละ 500 ต่อ 1 ตร.ม.) จ่ายเท่าไร?",
    steps: [
      "พื้นที่เกิน 1 แต่ไม่เกิน 2 ตร.ม.",
      "ปัดเป็น 2 × 500"
    ],
    answer: "1,000 บาท"
  },
  {
    id: "s5",
    title: "ค่าธรรมเนียมโอนเงิน",
    level: "ง่าย",
    problem: "โอน 7,000 บาท (0-5k ฟรี, 5k-20k = 15บ.) เสียเท่าไร?",
    steps: [
      "7,000 อยู่ในช่วง 5,000–20,000",
      "คิดค่าธรรมเนียมคงที่"
    ],
    answer: "15 บาท"
  }
]

/* =========================
   EXPONENTIAL EXAMPLES
========================= */
const exponentialExamples: Example[] = [
  {
    id: "e1",
    title: "ประชากรแบคทีเรีย",
    level: "ง่าย",
    icon: FlaskConical,
    problem: "แบคทีเรีย 10 ตัว เพิ่ม 3 เท่าทุกชั่วโมง 2 ชม. มีกี่ตัว?",
    steps: ["N = 10 × 3²", "10 × 9 = 90"],
    answer: "90 ตัว"
  },
  {
    id: "e2",
    title: "การลดลงของสาร",
    level: "ปานกลาง",
    icon: Atom,
    problem: "สารลดลงครึ่งหนึ่งทุกวัน เริ่ม 100g ผ่าน 3 วันเหลือเท่าไร?",
    steps: ["100 × (1/2)³", "12.5"],
    answer: "12.5 กรัม"
  },
  {
    id: "e3",
    title: "เงินฝากทวีคูณ",
    level: "ยาก",
    icon: PiggyBank,
    problem: "เงิน 1,000 เพิ่มเป็น 2 เท่าทุก 5 ปี ผ่าน 15 ปีมีเท่าไร?",
    steps: ["15 ÷ 5 = 3 รอบ", "1,000 × 2³ = 8,000"],
    answer: "8,000 บาท"
  },
  {
    id: "e15",
    title: "จุดตัดแกน Y",
    level: "ง่าย",
    icon: Move,
    problem: "y = 5ˣ ตัดแกน Y ที่จุดใด?",
    steps: ["แทน x = 0", "y = 1"],
    answer: "(0, 1)"
  }
]

/* =========================
   ACCORDION COMPONENT
========================= */
function ExampleAccordion({
  example,
  colorClass
}: {
  example: Example
  colorClass: "cyan" | "violet"
}) {
  const [isOpen, setIsOpen] = useState(false)

  const accent = colorClass === "cyan" ? "text-cyan-400" : "text-violet-400"
  const bg = colorClass === "cyan" ? "bg-cyan-500/10" : "bg-violet-500/10"

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-start gap-4 text-left hover:bg-white/5"
      >
        {example.icon && (
          <div className={`p-2 rounded-lg ${bg} ${accent}`}>
            <example.icon size={20} />
          </div>
        )}

        <div className="flex-1">
          <Badge variant="outline" className="text-[10px] mb-1">
            {example.level}
          </Badge>
          <h3 className="font-semibold text-sm">{example.title}</h3>
        </div>

        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 pt-4 border-t border-white/10 bg-black/20"
          >
            <p className="font-bold text-sm mb-3">
              โจทย์: {example.problem}
            </p>

            {example.steps.map((s, i) => (
              <p key={i} className="text-xs font-mono text-muted-foreground">
                {i + 1}. {s}
              </p>
            ))}

            <div className={`mt-4 p-3 rounded-lg ${bg} font-bold text-sm`}>
              <CheckCircle size={16} className="inline mr-2" />
              ตอบ: {example.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* =========================
   PAGE
========================= */
export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <h1 className="text-4xl font-black text-center mb-16">
          Lesson <span className="text-primary">Examples</span>
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-xl font-bold mb-4 text-cyan-400">
              Step Functions
            </h2>
            {stepFunctionExamples.map(ex => (
              <ExampleAccordion key={ex.id} example={ex} colorClass="cyan" />
            ))}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-violet-400">
              Exponential
            </h2>
            {exponentialExamples.map(ex => (
              <ExampleAccordion key={ex.id} example={ex} colorClass="violet" />
            ))}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
