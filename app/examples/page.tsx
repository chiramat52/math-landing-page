"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  TrendingUp,
  ChevronDown,
  CheckCircle,
  Lightbulb,
  Package,
  Banknote,
  Receipt,
  GraduationCap,
  FlaskConical,
  PiggyBank,
  Atom,
  BarChart3,
  Car,
  Zap,
  CreditCard,
  Building2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Example {
  id: string
  title: string
  level: "ง่าย" | "ปานกลาง" | "ยาก"
  icon: any
  problem: string
  context?: string
  steps: string[]
  answer: string
  formula?: string
}

// ข้อมูลสำหรับ Step Functions
const stepFunctionExamples: Example[] = [
  {
    id: "step-1",
    title: "Floor Function พื้นฐาน",
    level: "ง่าย",
    icon: Activity,
    problem: "จงหาค่าของ ⌊3.7⌋ และ ⌊-2.3⌋",
    steps: [
      "⌊3.7⌋: จำนวนเต็มที่มากที่สุดที่ ≤ 3.7 คือ 3",
      "⌊-2.3⌋: จำนวนเต็มที่มากที่สุดที่ ≤ -2.3 คือ -3 (ไม่ใช่ -2)",
      "สังเกตว่า -3 < -2.3 < -2 ดังนั้น ⌊-2.3⌋ = -3",
    ],
    answer: "⌊3.7⌋ = 3, ⌊-2.3⌋ = -3",
    formula: "⌊x⌋ = n เมื่อ n ≤ x < n+1",
  },
  {
    id: "step-2",
    title: "ค่าส่งพัสดุธรรมดา",
    level: "ง่าย",
    icon: Package,
    problem: "พัสดุหนัก 2.5 กิโลกรัม ค่าส่งพัสดุธรรมดาเท่าไร?",
    context: "อัตรา: 0-1kg = 20฿, 1-2kg = 35฿, 2-3kg = 50฿, 3-4kg = 65฿, 4-5kg = 80฿",
    steps: [
      "พิจารณาน้ำหนัก 2.5 กก.",
      "2.5 กก. อยู่ในช่วง 2 < x ≤ 3 กก.",
      "ดังนั้นราคาคือ 50 บาท",
    ],
    answer: "50 บาท",
  },
  {
    id: "step-3",
    title: "ค่าธรรมเนียมถอนเงินข้ามเขต",
    level: "ง่าย",
    icon: CreditCard,
    problem: "ถอนเงินข้ามเขต 4,500 บาท เสียค่าธรรมเนียมเท่าไร?",
    context: "อัตรา: 0-5,000฿ = 10฿, 5,001-10,000฿ = 20฿, 10,001-20,000฿ = 30฿",
    steps: [
      "ยอดเงิน 4,500 บาท อยู่ในช่วงแรก (0-5,000 บาท)",
      "ดังนั้นเสียค่าธรรมเนียมคงที่ที่ 10 บาท",
    ],
    answer: "10 บาท",
  },
  {
    id: "step-4",
    title: "ค่าบริการรถมอเตอร์ไซค์",
    level: "ปานกลาง",
    icon: Car,
    problem: "นั่งรถระยะทาง 4.2 กิโลเมตร ต้องจ่ายค่าโดยสารเท่าไร?",
    context: "อัตรา: 0-2km = 20฿, 2-5km = 30฿, 5-10km = 50฿",
    steps: [
      "ระยะทาง 4.2 กม. อยู่ในช่วง 2 < x ≤ 5 กม.",
      "ตามอัตราขั้นบันได ช่วงนี้คิดค่าโดยสาร 30 บาท",
    ],
    answer: "30 บาท",
  },
  {
    id: "step-5",
    title: "ค่าจอดรถในห้างสรรพสินค้า",
    level: "ปานกลาง",
    icon: Building2,
    problem: "จอดรถนาน 3 ชั่วโมง 15 นาที ต้องจ่ายเงินเท่าไร?",
    context: "อัตรา: 2 ชม. แรกฟรี, ชม. ถัดไป ชม.ละ 20 บาท (เศษของชม. คิดเป็น 1 ชม.)",
    steps: [
      "2 ชม. แรก: ฟรี",
      "เวลาที่เหลือ: 3 ชม. 15 นาที - 2 ชม. = 1 ชม. 15 นาที",
      "เศษของชม. คิดเป็น 1 ชม.: 1 ชม. 15 นาที ปัดขึ้นเป็น 2 ชม.",
      "คำนวณเงิน: 2 ชม. × 20 บาท = 40 บาท",
    ],
    answer: "40 บาท",
    formula: "f(x) = 20⌈x - 2⌉ สำหรับ x > 2",
  },
  {
    id: "step-6",
    title: "การตัดเกรด",
    level: "ปานกลาง",
    icon: GraduationCap,
    problem: "คะแนน 74 ได้เกรดอะไร? เกณฑ์: 80-100=A, 75-79=B+, 70-74=B, 65-69=C+",
    steps: [
      "คะแนน 74 อยู่ในช่วง 70-74",
      "ตามเกณฑ์คงที่ในช่วงนี้ จะได้เกรด B",
    ],
    answer: "เกรด B",
  },
  {
    id: "step-7",
    title: "การคำนวณภาษีเงินได้",
    level: "ยาก",
    icon: Receipt,
    problem: "เงินได้สุทธิ 350,000 บาท ต้องเสียภาษีเท่าไร? (0-150k ยกเว้น, 150k-300k = 5%, 300k-500k = 10%)",
    steps: [
      "ขั้นที่ 1: 0 - 150,000 บาท → 0 บาท",
      "ขั้นที่ 2: ส่วน 150,001 - 300,000 บาท (150k) × 5% = 7,500 บาท",
      "ขั้นที่ 3: ส่วนที่เกิน 300,000 (50k) × 10% = 5,000 บาท",
      "รวมภาษี: 7,500 + 5,000 = 12,500 บาท",
    ],
    answer: "12,500 บาท",
  },
  {
    id: "step-8",
    title: "ค่าไฟฟ้าที่พักอาศัย",
    level: "ยาก",
    icon: Zap,
    problem: "ใช้ไฟฟ้า 250 หน่วย ค่าไฟส่วนนี้เท่าไร? (0-150 หน่วย = 3.25฿, 151-400 หน่วย = 4.22฿)",
    steps: [
      "150 หน่วยแรก: 150 × 3.25 = 487.50 บาท",
      "ส่วนที่เกิน (100 หน่วย): 100 × 4.22 = 422.00 บาท",
      "รวม: 487.50 + 422.00 = 909.50 บาท",
    ],
    answer: "909.50 บาท",
  }
]

// ข้อมูลสำหรับ Exponential
const exponentialExamples: Example[] = [
  {
    id: "expo-1",
    title: "เลขยกกำลังพื้นฐาน",
    level: "ง่าย",
    icon: TrendingUp,
    problem: "จงหาค่าของ 2⁵ และ 3⁴",
    steps: [
      "2⁵ = 2 × 2 × 2 × 2 × 2 = 32",
      "3⁴ = 3 × 3 × 3 × 3 = 81",
    ],
    answer: "2⁵ = 32, 3⁴ = 81",
  },
  {
    id: "expo-2",
    title: "สมบัติการคูณและหาร",
    level: "ปานกลาง",
    icon: TrendingUp,
    problem: "จงลดรูป 2³ × 2⁴ ÷ 2²",
    steps: [
      "ฐานเหมือนกันคูณกัน: 2³⁺⁴ = 2⁷",
      "ฐานเหมือนกันหารกัน: 2⁷⁻² = 2⁵",
      "2⁵ = 32",
    ],
    answer: "32",
    formula: "aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
  },
  {
    id: "expo-3",
    title: "แบคทีเรียเติบโต",
    level: "ปานกลาง",
    icon: FlaskConical,
    problem: "แบคทีเรีย 500 ตัว เพิ่มเป็น 2 เท่าทุก 30 นาที ผ่านไป 2 ชั่วโมงจะมีกี่ตัว?",
    steps: [
      "2 ชั่วโมง = 4 รอบการแบ่งตัว (120/30)",
      "ใช้สูตร N = N₀ × 2ᵗ",
      "N = 500 × 2⁴ = 500 × 16",
    ],
    answer: "8,000 ตัว",
  },
  {
    id: "expo-4",
    title: "ดอกเบี้ยทบต้น",
    level: "ปานกลาง",
    icon: PiggyBank,
    problem: "ฝากเงิน 50,000 บาท ดอกเบี้ย 5% ต่อปี ทบต้น 3 ปี ได้เท่าไร?",
    steps: [
      "สูตร A = P(1 + r)ᵗ",
      "A = 50,000 × (1.05)³",
      "A ≈ 57,881.25",
    ],
    answer: "57,881.25 บาท",
  },
  {
    id: "expo-5",
    title: "การแพร่กระจายของข่าว",
    level: "ปานกลาง",
    icon: BarChart3,
    problem: "คน 1 คนแชร์ต่อให้ 3 คนทุกชั่วโมง ในชั่วโมงที่ 4 จะมีคนรู้ข่าวเพิ่มกี่คน?",
    steps: [
      "ชั่วโมงที่ 0 = 1 คน (3⁰)",
      "ชั่วโมงที่ 4 = 3⁴",
      "3 × 3 × 3 × 3 = 81",
    ],
    answer: "81 คน",
  },
  {
    id: "expo-6",
    title: "มูลค่ารถยนต์เสื่อมสภาพ",
    level: "ยาก",
    icon: Car,
    problem: "รถราคา 800,000 บาท มูลค่าลดลง 20% ทุกปี ผ่านไป 2 ปีเหลือเท่าไร?",
    steps: [
      "สูตร V = V₀(1 - r)ᵗ",
      "V = 800,000 × (0.8)²",
      "V = 800,000 × 0.64",
    ],
    answer: "512,000 บาท",
  },
  {
    id: "expo-7",
    title: "ครึ่งชีวิต (Half-life)",
    level: "ยาก",
    icon: Atom,
    problem: "สารมีครึ่งชีวิต 8 ปี เริ่มต้น 200 กรัม ผ่านไป 24 ปีเหลือเท่าไร?",
    steps: [
      "จำนวนรอบ = 24 / 8 = 3 รอบ",
      "สูตร N = N₀ × (1/2)ⁿ",
      "N = 200 × (1/8) = 25",
    ],
    answer: "25 กรัม",
  },
  {
    id: "expo-8",
    title: "ความเข้มข้นของยา",
    level: "ยาก",
    icon: FlaskConical,
    problem: "ยาขจัดออก 25% ทุกชั่วโมง ฉีด 400 มก. ผ่านไป 2 ชั่วโมงเหลือเท่าไร?",
    steps: [
      "เหลือยา 75% ต่อชั่วโมง (0.75)",
      "สูตร A = 400 × (0.75)²",
      "A = 400 × 0.5625 = 225",
    ],
    answer: "225 มก.",
  }
]

function ExampleAccordion({ example, colorClass }: { example: Example, colorClass: "cyan" | "violet" }) {
  const [isOpen, setIsOpen] = useState(false)
  const accentColor = colorClass === "cyan" ? "text-cyan-400" : "text-violet-400"
  const bgAccent = colorClass === "cyan" ? "bg-cyan-500/10" : "bg-violet-500/10"
  const borderAccent = colorClass === "cyan" ? "border-cyan-500/30" : "border-violet-500/30"

  const levelColors = {
    ง่าย: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    ปานกลาง: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    ยาก: "bg-red-500/10 text-red-400 border-red-500/30",
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden border border-white/10 mb-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 flex items-start gap-4 hover:bg-white/5 transition-colors">
        <div className={`p-2 rounded-lg ${bgAccent} ${accentColor}`}><example.icon size={20} /></div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={`text-[10px] ${levelColors[example.level]}`}>{example.level}</Badge>
            <h3 className="font-semibold text-sm">{example.title}</h3>
          </div>
          <p className="text-muted-foreground text-xs line-clamp-1">{example.problem}</p>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-muted-foreground"><ChevronDown size={20} /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 pt-2 border-t border-white/5 space-y-4">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-tighter">โจทย์</p>
                <p className="text-sm">{example.problem}</p>
                {example.context && <p className="text-xs text-muted-foreground mt-2 italic">{example.context}</p>}
              </div>
              {example.formula && (
                <div className={`${bgAccent} border ${borderAccent} rounded-lg p-2 font-mono text-xs ${accentColor}`}>
                  สูตร: {example.formula}
                </div>
              )}
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase">วิธีทำ</p>
                {example.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-xs text-muted-foreground">
                    <span className="font-mono text-primary">{idx + 1}.</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
              <div className={`${bgAccent} border ${borderAccent} rounded-lg p-3 flex items-center gap-3`}>
                <CheckCircle size={18} className={accentColor} />
                <div>
                  <p className="text-[10px] text-muted-foreground">คำตอบ</p>
                  <p className="text-sm font-bold">{example.answer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">ตัวอย่างโจทย์พร้อมเฉลย</h1>
          <p className="text-muted-foreground">เรียนรู้วิธีแก้ปัญหาจากสถานการณ์จริงและสมบัติทางคณิตศาสตร์</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* ส่วนของ Step Functions */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border-l-4 border-cyan-500 mb-6">
              <Activity className="text-cyan-400" size={24} />
              <h2 className="text-xl font-bold">Step Functions ({stepFunctionExamples.length})</h2>
            </div>
            {/* แก้จาก stepFunctionQuestions เป็น stepFunctionExamples */}
            {stepFunctionExamples.map((ex) => (
              <ExampleAccordion key={ex.id} example={ex} colorClass="cyan" />
            ))}
          </div>

          {/* ส่วนของ Exponential */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-violet-500/10 rounded-xl border-l-4 border-violet-500 mb-6">
              <TrendingUp className="text-violet-400" size={24} />
              <h2 className="text-xl font-bold">Exponential ({exponentialExamples.length})</h2>
            </div>
            {exponentialExamples.map((ex) => (
              <ExampleAccordion key={ex.id} example={ex} colorClass="violet" />
            ))}
          </div>
        </div>

        {/* Tip Card */}
        <div className="mt-16 glass-card p-6 rounded-2xl border border-amber-500/20 max-w-2xl mx-auto flex gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 h-fit"><Lightbulb size={24} /></div>
          <div>
            <h4 className="font-bold mb-1">เทคนิคการทำโจทย์</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              สำหรับฟังก์ชันขั้นบันได กราฟจะเป็นเส้นแนวตั้งและแนวนอน ให้สังเกตจุดเปลี่ยนของเงื่อนไข (จุดทึบ/จุดโปร่ง) 
              ส่วนเอกซ์โพเนนเชียล กราฟจะพุ่งขึ้นหรือลดลงอย่างรวดเร็ว ให้ตรวจสอบฐาน (a) ว่าเป็นฟังก์ชันเพิ่มหรือฟังก์ชันลด
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}