"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState, useMemo, useCallback } from "react"
import { RefreshCw, CheckCircle2, XCircle, BrainCircuit } from "lucide-react"

// --- ชุดคำถามฟังก์ชันขั้นบันได (Step Function) จากโจทย์ประยุกต์ที่คุณต้องการ ---
const stepFunctionQuestions = [
  { q: "ค่าจอดรถชม.ละ 20 บาท (เศษชม.นับเป็น 1 ชม.) จอดรถนาน 1 ชม. 15 นาที ต้องจ่ายกี่บาท?", a: "40", options: ["20", "40", "60", "30"] },
  { q: "ค่าจอดรถ f(x) = 20⌈x⌉ บาท จอดรถนาน 3 ชม. 5 นาที ต้องจ่ายกี่บาท?", a: "80", options: ["60", "80", "100", "70"] },
  { q: "พัสดุหนักไม่เกิน 1 กก. (30บ.), >1-2 กก. (50บ.) ถ้าพัสดุหนัก 1.5 กก. จะเสียค่าส่งกี่บาท?", a: "50", options: ["30", "50", "70", "40"] },
  { q: "ภาษีเงินได้: ส่วนเกิน 100k แรกเสีย 5% หากมีรายได้ 120,000 บาท ต้องเสียภาษีกี่บาท?", a: "1,000", options: ["1,000", "5,000", "6,000", "0"] },
  { q: "จอดรถนาน 5 ชม. 59 นาที ตามเกณฑ์ f(x) = 20⌈x⌉ ต้องจ่ายเท่าใด?", a: "120", options: ["100", "110", "120", "140"] },
  { q: "พัสดุหนัก 3.0 กก. พอดี เสียค่าส่งกี่บาท? (เกณฑ์: >2-3 กก. 70บ.)", a: "70", options: ["70", "80", "50", "90"] },
  { q: "ถ้าจ่ายเงินค่าจอดรถไป 100 บาท ตามเกณฑ์ f(x) = 20⌈x⌉ จอดรถได้นานที่สุดกี่ชม.?", a: "5", options: ["4", "5", "6", "10"] },
  { q: "⌊4.9⌋ มีค่าเท่ากับเท่าใด?", a: "4", options: ["4", "5", "4.9", "0"] },
  { q: "⌈3.2⌉ มีค่าเท่ากับเท่าใด?", a: "4", options: ["3", "4", "3.2", "5"] },
  { q: "⌊-1.5⌋ มีค่าเท่ากับเท่าใด?", a: "-2", options: ["-1", "-2", "1", "0"] }
];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function ExercisesPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [quizKey, setQuizKey] = useState(0);

  const questions = useMemo(() => {
    const shuffled = shuffleArray(stepFunctionQuestions);
    return shuffled.slice(0, 10).map((q, index) => ({
      ...q,
      id: index + 1,
      options: shuffleArray(q.options),
    }));
  }, [quizKey]);

  const handleSelect = useCallback((id: number, opt: string) => {
    setSelectedAnswers(prev => ({ ...prev, [id]: opt }));
    setShowResults(prev => ({ ...prev, [id]: true }));
  }, []);

  const reset = () => {
    setSelectedAnswers({});
    setShowResults({});
    setQuizKey(k => k + 1);
  };

  const score = questions.filter(q => selectedAnswers[q.id] === q.a).length;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BrainCircuit className="text-primary" /> แบบฝึกหัด
            </h1>
            <p className="text-sm text-muted-foreground mt-1">ฟังก์ชันขั้นบันไดในชีวิตประจำวัน</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Score</p>
            <p className="text-3xl font-black text-primary">{score}/{Object.keys(selectedAnswers).length || 0}</p>
          </div>
        </header>

        <div className="grid gap-4">
          {questions.map((q) => (
            <div key={q.id} className="glass p-6 rounded-2xl border border-border/50 shadow-sm transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">ข้อที่ {q.id}</span>
                {showResults[q.id] && (
                  selectedAnswers[q.id] === q.a 
                  ? <CheckCircle2 className="text-accent" size={20} /> 
                  : <XCircle className="text-destructive" size={20} />
                )}
              </div>
              <p className="font-medium mb-6 text-foreground/90">{q.q}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    disabled={showResults[q.id]}
                    onClick={() => handleSelect(q.id, opt)}
                    className={`p-3 rounded-xl text-sm text-left border transition-all ${
                      showResults[q.id]
                        ? opt === q.a 
                          ? "bg-accent/20 border-accent text-accent font-bold" 
                          : selectedAnswers[q.id] === opt 
                            ? "bg-destructive/20 border-destructive text-destructive" 
                            : "opacity-40 border-transparent"
                        : "bg-secondary/40 hover:border-primary/50 hover:bg-secondary/60"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={reset}
          className="w-full mt-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <RefreshCw size={20} /> สุ่มโจทย์ใหม่
        </motion.button>
      </div>
      <Footer />
    </main>
  );
}