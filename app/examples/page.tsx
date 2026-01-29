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
  Phone,
  CreditCard,
  Building2,
  Dna
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
    context: "อัตรา: 0-1kg=20฿, 1-2kg=35฿, 2-3kg=50฿",
    steps: [
      "พิจารณาน้ำหนัก 2.5 กก. อยู่ในช่วง 2 < x ≤ 3 กก.",
      "ดังนั้นราคาคือ 50 บาท",
    ],
    answer: "50 บาท",
  },
  {
    id: "step-3",
    title: "ค่าส่งพัสดุลงทะเบียน",
    level: "ปานกลาง",
    icon: Banknote,
    problem: "ส่งพัสดุ 2 กล่อง: 90g และ 1.2kg รวมค่าส่งเท่าไร?",
    context: "อัตรา: 0-100g=18฿, 1000-2000g=58฿",
    steps: [
      "กล่อง 1 (90g): ช่วง 0-100g → 18 บาท",
      "กล่อง 2 (1.2kg): ช่วง 1000-2000g → 58 บาท",
      "รวม: 18 + 58 = 76 บาท",
    ],
    answer: "76 บาท",
  },
  {
    id: "step-4",
    title: "การตัดเกรด",
    level: "ปานกลาง",
    icon: GraduationCap,
    problem: "คะแนน 74 ได้เกรดอะไร?",
    context: "เกณฑ์: 70-74 = B, 75-79 = B+",
    steps: [
      "คะแนน 74 ตกอยู่ในช่วง [70, 75)",
      "ตามเกณฑ์จะได้รับเกรด B",
    ],
    answer: "เกรด B",
  },
  {
    id: "step-5",
    title: "การคำนวณภาษีเงินได้",
    level: "ยาก",
    icon: Receipt,
    problem: "เงินได้สุทธิ 350,000 บาท ต้องเสียภาษีเท่าไร?",
    context: "0-150k ยกเว้น, 150k-300k=5%, 300k-500k=10%",
    steps: [
      "ขั้นแรก 150k แรก: 0 บาท",
      "ขั้นสอง (300k-150k) × 5%: 7,500 บาท",
      "ขั้นสาม (350k-300k) × 10%: 5,000 บาท",
    ],
    answer: "12,500 บาท",
  },
  {
    id: "step-6",
    title: "ค่าไฟฟ้าที่พักอาศัย",
    level: "ยาก",
    icon: Zap,
    problem: "ใช้ไฟฟ้า 250 หน่วย ค่าไฟเท่าไร?",
    context: "0-150 หน่วย=3.25฿, 151-400 หน่วย=4.22฿",
    steps: [
      "150 หน่วยแรก: 150 × 3.25 = 487.50 บาท",
      "100 หน่วยที่เหลือ: 100 × 4.22 = 422.00 บาท",
    ],
    answer: "909.50 บาท",
  },
  {
    id: "step-7",
    title: "ค่าจอดรถในห้าง",
    level: "ปานกลาง",
    icon: Car,
    problem: "จอดรถ 3 ชม. 15 นาที จ่ายเท่าไร?",
    context: "ฟรี 2 ชม. แรก, ต่อไปชม.ละ 20 บาท (เศษชม.คิดเป็น 1 ชม.)",
    steps: [
      "เวลาเกินฟรี: 1 ชม. 15 นาที",
      "เศษชม.ปัดเป็น: 2 ชม.",
      "คิดเงิน: 2 × 20 = 40 บาท",
    ],
    answer: "40 บาท",
  },
  {
    id: "step-8",
    title: "ค่าธรรมเนียมถอนเงิน",
    level: "ง่าย",
    icon: CreditCard,
    problem: "ถอนเงินข้ามเขต 4,500 บาท เสียเท่าไร?",
    context: "0-5000฿=10฿, 5001-10000฿=20฿",
    steps: [
      "ยอด 4,500 อยู่ในขั้นแรก 0-5,000 บาท",
      "เสียค่าธรรมเนียมคงที่ 10 บาท",
    ],
    answer: "10 บาท",
  },
  {
    id: "step-9",
    title: "มอเตอร์ไซค์รับจ้าง",
    level: "ง่าย",
    icon: Activity,
    problem: "เดินทาง 4.2 กม. จ่ายเท่าไร?",
    context: "0-2km=20฿, 2-5km=30฿",
    steps: [
      "ระยะทาง 4.2 กม. อยู่ในช่วงมากกว่า 2 แต่ไม่เกิน 5 กม.",
      "ค่าบริการคงที่ 30 บาท",
    ],
    answer: "30 บาท",
  },
  {
    id: "step-10",
    title: "อินเทอร์เน็ตคาเฟ่",
    level: "ปานกลาง",
    icon: Activity,
    problem: "ใช้บริการ 110 นาที ต้องจ่ายเท่าไร?",
    context: "ชั่วโมงละ 20 บาท (เศษของชั่วโมงคิดเป็น 1 ชั่วโมง)",
    steps: [
      "110 นาที เท่ากับ 1 ชั่วโมง 50 นาที",
      "เศษนาทีปัดขึ้นเป็น 2 ชั่วโมง",
      "คิดเงิน: 2 × 20 = 40 บาท",
    ],
    answer: "40 บาท",
  },
  {
    id: "step-11",
    title: "Ceiling Function",
    level: "ง่าย",
    icon: Activity,
    problem: "จงหาค่าของ ⌈4.1⌉ และ ⌈-2.9⌉",
    steps: [
      "⌈4.1⌉: จำนวนเต็มที่น้อยที่สุดที่ ≥ 4.1 คือ 5",
      "⌈-2.9⌉: จำนวนเต็มที่น้อยที่สุดที่ ≥ -2.9 คือ -2",
    ],
    answer: "⌈4.1⌉ = 5, ⌈-2.9⌉ = -2",
  },
  {
    id: "step-12",
    title: "ค่าโทรศัพท์มือถือ",
    level: "ปานกลาง",
    icon: Phone,
    problem: "คุยโทรศัพท์ 2 นาที 5 วินาที จ่ายกี่บาท?",
    context: "นาทีละ 1.50 บาท (เศษวินาทีนับเป็น 1 นาที)",
    steps: [
      "เวลาใช้งานปัดเศษเป็น 3 นาที",
      "คิดเงิน: 3 × 1.50 = 4.50 บาท",
    ],
    answer: "4.50 บาท",
  },
  {
    id: "step-13",
    title: "ค่าเช่าล็อคเกอร์",
    level: "ปานกลาง",
    icon: Building2,
    problem: "เช่าล็อคเกอร์ 25 ชั่วโมง จ่ายเท่าไร?",
    context: "วันละ 50 บาท (เศษของวันคิดเป็น 1 วัน)",
    steps: [
      "25 ชั่วโมง คือ 1 วัน 1 ชั่วโมง",
      "ปัดเศษเป็น 2 วัน",
      "รวม: 2 × 50 = 100 บาท",
    ],
    answer: "100 บาท",
  },
  {
    id: "step-14",
    title: "ค่าน้ำประปา",
    level: "ยาก",
    icon: Zap,
    problem: "ใช้น้ำ 25 ลูกบาศก์เมตร จ่ายกี่บาท?",
    context: "0-10 หน่วย=10฿/หน่วย, 11-30 หน่วย=15฿/หน่วย",
    steps: [
      "10 หน่วยแรก: 10 × 10 = 100 บาท",
      "15 หน่วยถัดไป: 15 × 15 = 225 บาท",
    ],
    answer: "325 บาท",
  },
  {
    id: "step-15",
    title: "การส่ง SMS มวลชน",
    level: "ง่าย",
    icon: Phone,
    problem: "ส่ง SMS 1,500 ข้อความ ราคาเท่าไร?",
    context: "0-1000 ข้อความ=0.5฿, 1001-5000 ข้อความ=0.3฿",
    steps: [
      "เนื่องจากเป็นราคาเหมาตามช่วง (Package Step)",
      "1,500 ข้อความ ตกอยู่ในช่วง 0.3 บาทต่อข้อความ",
    ],
    answer: "450 บาท",
  }
]

const exponentialExamples: Example[] = [
  {
    id: "expo-1",
    title: "เลขยกกำลังพื้นฐาน",
    level: "ง่าย",
    icon: TrendingUp,
    problem: "จงหาค่าของ 2⁵ และ 3⁴",
    steps: ["2 × 2 × 2 × 2 × 2 = 32", "3 × 3 × 3 × 3 = 81"],
    answer: "2⁵=32, 3⁴=81",
  },
  {
    id: "expo-2",
    title: "สมบัติเลขยกกำลัง",
    level: "ปานกลาง",
    icon: TrendingUp,
    problem: "จงลดรูป 2³ × 2⁴ ÷ 2²",
    steps: ["รวมเลขชี้กำลังคูณ: 2⁷", "ลบเลขชี้กำลังหาร: 2⁵"],
    answer: "32",
  },
  {
    id: "expo-3",
    title: "แบคทีเรียเติบโต",
    level: "ปานกลาง",
    icon: FlaskConical,
    problem: "แบคทีเรีย 500 ตัว เพิ่ม 2 เท่าทุก 30 นาที ผ่านไป 2 ชั่วโมงจะมีกี่ตัว?",
    steps: ["2 ชม. = 4 รอบ", "500 × 2⁴ = 500 × 16"],
    answer: "8,000 ตัว",
  },
  {
    id: "expo-4",
    title: "ดอกเบี้ยทบต้น",
    level: "ปานกลาง",
    icon: PiggyBank,
    problem: "ฝากเงิน 50,000 บาท ดอกเบี้ย 5% ทบต้น 3 ปี ได้เท่าไร?",
    steps: ["A = 50,000(1.05)³", "A = 50,000 × 1.1576"],
    answer: "57,881.25 บาท",
  },
  {
    id: "expo-5",
    title: "ครึ่งชีวิต (Half-life)",
    level: "ยาก",
    icon: Atom,
    problem: "สาร 200 กรัม ครึ่งชีวิต 8 ปี ผ่านไป 24 ปีเหลือเท่าไร?",
    steps: ["24 ÷ 8 = 3 รอบ", "200 × (1/2)³ = 25"],
    answer: "25 กรัม",
  },
  {
    id: "expo-6",
    title: "ประชากรโลก",
    level: "ยาก",
    icon: BarChart3,
    problem: "เมืองมี 1 แสนคน เพิ่ม 2% ต่อปี อีก 5 ปีมีกี่คน?",
    steps: ["P = 100,000(1.02)⁵"],
    answer: "110,408 คน",
  },
  {
    id: "expo-7",
    title: "ค่าเสื่อมราคารถ",
    level: "ยาก",
    icon: TrendingUp,
    problem: "รถ 1 ล้านบาท เสื่อม 15% ต่อปี 4 ปีเหลือเท่าไร?",
    steps: ["V = 1,000,000(0.85)⁴"],
    answer: "522,006 บาท",
  },
  {
    id: "expo-8",
    title: "การแพร่ระบาดไวรัส",
    level: "ยาก",
    icon: Dna,
    problem: "ไวรัสแพร่กระจาย 1 คนสู่ 3 คนทุกวัน วันที่ 10 จะมีผู้ติดเชื้อใหม่กี่คน?",
    steps: ["วันที่ 0: 1 คน", "วันที่ 10: 3¹⁰"],
    answer: "59,049 คน",
  },
  {
    id: "expo-9",
    title: "ความเข้มข้นของยา",
    level: "ปานกลาง",
    icon: FlaskConical,
    problem: "ยาในเลือดลดลง 25% ทุกชม. ฉีด 400มก. ผ่านไป 2 ชม. เหลือเท่าไร?",
    steps: ["400 × (0.75)² = 400 × 0.5625"],
    answer: "225 มิลลิกรัม",
  },
  {
    id: "expo-10",
    title: "การขุด Bitcoin",
    level: "ยาก",
    icon: Banknote,
    problem: "ความยากในการขุดเพิ่มขึ้น 10% ทุกเดือน ผ่านไป 1 ปี ความยากเป็นกี่เท่า?",
    steps: ["ใช้สูตร (1.10)¹²"],
    answer: "ประมาณ 3.14 เท่า",
  },
  {
    id: "expo-11",
    title: "เลขยกกำลังฐานลบ",
    level: "ง่าย",
    icon: Activity,
    problem: "(-2)⁴ และ -2⁴ มีค่าต่างกันอย่างไร?",
    steps: ["(-2)⁴ = 16", "-2⁴ = -(2⁴) = -16"],
    answer: "16 และ -16",
  },
  {
    id: "expo-12",
    title: "ความดังของเสียง (dB)",
    level: "ยาก",
    icon: Activity,
    problem: "เสียง 20dB ดังเป็นกี่เท่าของ 10dB?",
    context: "ทุก 10dB ที่เพิ่มขึ้น ความเข้มเสียงจะเพิ่ม 10 เท่า",
    steps: ["20 - 10 = 10dB (เพิ่มขึ้น 1 ขั้น)", "10¹ = 10"],
    answer: "10 เท่า",
  },
  {
    id: "expo-13",
    title: "ห่วงโซ่อาหาร",
    level: "ปานกลาง",
    icon: FlaskConical,
    problem: "พลังงานส่งต่อได้ 10% ต่อชั้น ถ้าพืชมี 10,000 หน่วย ผู้บริโภคอันดับ 3 ได้เท่าไร?",
    steps: ["10,000 × (0.1)³"],
    answer: "10 หน่วย",
  },
  {
    id: "expo-14",
    title: "การแชร์ข่าวปลอม",
    level: "ยาก",
    icon: BarChart3,
    problem: "คน 1 คนแชร์ให้ 5 คนทุกนาที ผ่านไป 5 นาทีจะมีคนเห็นข่าวรวมกี่คน?",
    steps: ["อนุกรมเรขาคณิต: (5⁶ - 1)/(5 - 1)"],
    answer: "3,906 คน",
  },
  {
    id: "expo-15",
    title: "เลขชี้กำลังติดลบ",
    level: "ง่าย",
    icon: TrendingUp,
    problem: "5⁻³ มีค่าเท่าใด?",
    steps: ["1 / 5³ = 1 / 125"],
    answer: "0.008",
  }
]

function ExampleAccordion({
  example,
  colorClass,
}: {
  example: Example
  colorClass: "cyan" | "violet"
}) {
  const [isOpen, setIsOpen] = useState(false)

  const levelColors = {
    ง่าย: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    ปานกลาง: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    ยาก: "bg-red-500/10 text-red-400 border-red-500/30",
  }

  const accentColor = colorClass === "cyan" ? "text-cyan-400" : "text-violet-400"
  const bgAccent = colorClass === "cyan" ? "bg-cyan-500/10" : "bg-violet-500/10"
  const borderAccent = colorClass === "cyan" ? "border-cyan-500/30" : "border-violet-500/30"

  return (
    <div className="glass-card rounded-xl overflow-hidden border border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 flex items-start gap-4 hover:bg-secondary/30 transition-colors"
        type="button"
      >
        <div className={`p-2 rounded-lg ${bgAccent} ${accentColor}`}>
          <example.icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge
              variant="outline"
              className={`text-[10px] ${levelColors[example.level]}`}
            >
              {example.level}
            </Badge>
            <h3 className="font-semibold text-foreground text-sm">
              {example.title}
            </h3>
          </div>
          <p className="text-muted-foreground text-xs line-clamp-1">
            {example.problem}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-muted-foreground mt-1"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-border/50 space-y-4">
              <div className="bg-secondary/20 rounded-lg p-3">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                  โจทย์
                </div>
                <p className="text-sm text-foreground">{example.problem}</p>
                {example.context && (
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    {example.context}
                  </p>
                )}
              </div>

              {example.formula && (
                <div className={`rounded-lg p-2 ${bgAccent} border ${borderAccent} font-mono text-[11px] ${accentColor}`}>
                   สูตร: {example.formula}
                </div>
              )}

              <div className="space-y-2">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  วิธีทำ
                </div>
                {example.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] text-muted-foreground font-mono shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className={`rounded-lg p-3 ${bgAccent} border ${borderAccent} flex items-center gap-3`}>
                <CheckCircle size={18} className={accentColor} />
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase">คำตอบ</div>
                  <div className="font-bold text-sm text-foreground">
                    {example.answer}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ExamplesSection() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 py-1 px-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            โจทย์ตัวอย่าง 30 ข้อ
          </Badge>
          <h1 className="text-4xl font-black mb-4 tracking-tight">
            คลังโจทย์<span className="text-primary">พร้อมเฉลย</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            รวบรวมสถานการณ์จำลองจากชีวิตจริง เพื่อให้เห็นภาพการประยุกต์ใช้ฟังก์ชันในรูปแบบต่างๆ
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Step Functions Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400">
                <Activity size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Step Functions</h2>
                <p className="text-xs text-muted-foreground">ฟังก์ชันที่มีค่าคงที่ในช่วงต่างๆ</p>
              </div>
            </div>
            
            

            <div className="grid gap-3">
              {stepFunctionExamples.map((ex) => (
                <ExampleAccordion key={ex.id} example={ex} colorClass="cyan" />
              ))}
            </div>
          </div>

          {/* Exponential Functions Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-violet-500/20 rounded-2xl flex items-center justify-center text-violet-400">
                <TrendingUp size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Exponential</h2>
                <p className="text-xs text-muted-foreground">ฟังก์ชันที่เปลี่ยนแปลงแบบทวีคูณ</p>
              </div>
            </div>

            

[Image of an exponential growth curve and an exponential decay curve]


            <div className="grid gap-3">
              {exponentialExamples.map((ex) => (
                <ExampleAccordion key={ex.id} example={ex} colorClass="violet" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}