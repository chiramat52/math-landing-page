"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronDown, ChevronUp, BookOpen, Lightbulb } from "lucide-react"

const stepFunctionExamples = [
  {
    id: 1,
    question: "จงหาค่าของ ⌊3.7⌋",
    solution: `【นิยาม】ฟังก์ชันพื้น (Floor Function)
⌊x⌋ = จำนวนเต็มที่มากที่สุดที่ ≤ x

【วิธีทำ】
พิจารณา x = 3.7
• จำนวนเต็มที่อยู่ใกล้ๆ คือ 3 และ 4
• เนื่องจาก 3 ≤ 3.7 < 4
• ดังนั้น ⌊3.7⌋ = 3

【ตอบ】⌊3.7⌋ = 3`,
    answer: "3",
  },
  {
    id: 2,
    question: "จงหาค่าของ ⌊−2.3⌋",
    solution: `【นิยาม】สำหรับจำนวนลบ
⌊x⌋ = จำนวนเต็มที่มากที่สุดที่ ≤ x (ปัดลงเสมอ)

【วิธีทำ】
พิจารณา x = −2.3
• จำนวนเต็มที่อยู่ใกล้ๆ คือ −3 และ −2
• เนื่องจาก −3 ≤ −2.3 < −2
• ต้องเลือก −3 เพราะเป็นจำนวนเต็มที่มากที่สุดที่ ≤ −2.3

【หมายเหตุ】⚠️ ระวัง! จำนวนลบปัดลงไปทาง −∞

【ตอบ】⌊−2.3⌋ = −3`,
    answer: "−3",
  },
  {
    id: 3,
    question: "จงหาค่าของ ⌈4.1⌉ (Ceiling Function)",
    solution: `【นิยาม】ฟังก์ชันเพดาน (Ceiling Function)
⌈x⌉ = จำนวนเต็มที่น้อยที่สุดที่ ≥ x

【วิธีทำ】
พิจารณา x = 4.1
• จำนวนเต็มที่อยู่ใกล้ๆ คือ 4 และ 5
• เนื่องจาก 4 < 4.1 ≤ 5
• ต้องเลือก 5 เพราะเป็นจำนวนเต็มที่น้อยที่สุดที่ ≥ 4.1

【ตอบ】⌈4.1⌉ = 5`,
    answer: "5",
  },
  {
    id: 4,
    question: "ถ้า f(x) = ⌊2x + 1⌋ จงหา f(1.7)",
    solution: `【กำหนดให้】f(x) = ⌊2x + 1⌋

【วิธีทำ】แทนค่า x = 1.7
ขั้นที่ 1: คำนวณ 2x + 1
    f(1.7) = ⌊2(1.7) + 1⌋
           = ⌊3.4 + 1⌋
           = ⌊4.4⌋

ขั้นที่ 2: หาค่า ⌊4.4⌋
    เนื่องจาก 4 ≤ 4.4 < 5
    ดังนั้น ⌊4.4⌋ = 4

【ตอบ】f(1.7) = 4`,
    answer: "4",
  },
  {
    id: 5,
    question: "จงหาค่าของ ⌊π⌋ เมื่อ π ≈ 3.14159...",
    solution: `【กำหนดให้】π = 3.14159265358979...

【วิธีทำ】
• π เป็นค่าคงที่ทางคณิตศาสตร์ ≈ 3.14159
• พิจารณาจำนวนเต็มใกล้เคียง: 3 และ 4
• เนื่องจาก 3 ≤ 3.14159... < 4

【ตอบ】⌊π⌋ = 3`,
    answer: "3",
  },
  {
    id: 6,
    question: "จงหาค่าของ ⌊5⌋",
    solution: `【สมบัติ】เมื่อ x เป็นจำนวนเต็ม
⌊n⌋ = n (สำหรับทุก n ∈ ℤ)

【วิธีทำ】
เนื่องจาก 5 เป็นจำนวนเต็มอยู่แล้ว
ดังนั้น ⌊5⌋ = 5

【ตอบ】⌊5⌋ = 5`,
    answer: "5",
  },
  {
    id: 7,
    question: "จงหาค่าของ ⌊−0.5⌋ + ⌈0.5⌉",
    solution: `【วิธีทำ】แยกคำนวณทีละส่วน

ส่วนที่ 1: หา ⌊−0.5⌋
• จำนวนเต็มใกล้เคียง: −1 และ 0
• เนื่องจาก −1 ≤ −0.5 < 0
• ดังนั้น ⌊−0.5⌋ = −1

ส่วนที่ 2: หา ⌈0.5⌉
• จำนวนเต็มใกล้เคียง: 0 และ 1
• เนื่องจาก 0 < 0.5 ≤ 1
• ดังนั้น ⌈0.5⌉ = 1

ส่วนที่ 3: รวมผลลัพธ์
⌊−0.5⌋ + ⌈0.5⌉ = (−1) + 1 = 0

【ตอบ】0`,
    answer: "0",
  },
  {
    id: 8,
    question: "ถ้า f(x) = ⌊x⌋ + ⌈x⌉ จงหา f(2.5)",
    solution: `【กำหนดให้】f(x) = ⌊x⌋ + ⌈x⌉

【วิธีทำ】แทนค่า x = 2.5

ขั้นที่ 1: หา ⌊2.5⌋
    • 2 ≤ 2.5 < 3
    • ⌊2.5⌋ = 2

ขั้นที่ 2: หา ⌈2.5⌉
    • 2 < 2.5 ≤ 3
    • ⌈2.5⌉ = 3

ขั้นที่ 3: รวมผลลัพธ์
    f(2.5) = 2 + 3 = 5

【สังเกต】เมื่อ x ไม่ใช่จำนวนเต็ม
⌊x⌋ + ⌈x⌉ = 2⌊x⌋ + 1

【ตอบ】f(2.5) = 5`,
    answer: "5",
  },
  {
    id: 9,
    question: "จงหาค่าของ ⌊√10⌋",
    solution: `【วิธีทำ】หาค่า √10 ก่อน

ขั้นที่ 1: ประมาณค่า √10
    • 3² = 9
    • 4² = 16
    • เนื่องจาก 9 < 10 < 16
    • ดังนั้น 3 < √10 < 4
    • √10 ≈ 3.162...

ขั้นที่ 2: หา ⌊√10⌋
    • เนื่องจาก 3 ≤ 3.162... < 4
    • ดังนั้น ⌊√10⌋ = 3

【ตอบ】⌊√10⌋ = 3`,
    answer: "3",
  },
  {
    id: 10,
    question: "จงหาผลรวม ⌊1.2⌋ + ⌊2.3⌋ + ⌊3.4⌋",
    solution: `【วิธีทำ】คำนวณทีละพจน์

พจน์ที่ 1: ⌊1.2⌋
    • 1 ≤ 1.2 < 2 → ⌊1.2⌋ = 1

พจน์ที่ 2: ⌊2.3⌋
    • 2 ≤ 2.3 < 3 → ⌊2.3⌋ = 2

พจน์ที่ 3: ⌊3.4⌋
    • 3 ≤ 3.4 < 4 → ⌊3.4⌋ = 3

ผลรวม = 1 + 2 + 3 = 6

【ตอบ】6`,
    answer: "6",
  },
  {
    id: 11,
    question: "ถ้า g(x) = ⌊3x − 2⌋ จงหา g(2.5)",
    solution: `【กำหนดให้】g(x) = ⌊3x − 2⌋

【วิธีทำ】แทนค่า x = 2.5

ขั้นที่ 1: คำนวณ 3x − 2
    g(2.5) = ⌊3(2.5) − 2⌋
           = ⌊7.5 − 2⌋
           = ⌊5.5⌋

ขั้นที่ 2: หา ⌊5.5⌋
    • 5 ≤ 5.5 < 6
    • ⌊5.5⌋ = 5

【ตอบ】g(2.5) = 5`,
    answer: "5",
  },
  {
    id: 12,
    question: "จงหาค่าของ ⌈−3.7⌉",
    solution: `【นิยาม】Ceiling Function สำหรับจำนวนลบ
⌈x⌉ = จำนวนเต็มที่น้อยที่สุดที่ ≥ x

【วิธีทำ】
พิจารณา x = −3.7
• จำนวนเต็มใกล้เคียง: −4 และ −3
• เนื่องจาก −4 < −3.7 ≤ −3
• ต้องเลือก −3 เพราะเป็นจำนวนเต็มที่น้อยที่สุดที่ ≥ −3.7

【หมายเหตุ】⚠️ สำหรับจำนวนลบ ceiling ปัดขึ้นไปทาง 0

【ตอบ】⌈−3.7⌉ = −3`,
    answer: "−3",
  },
  {
    id: 13,
    question: "จงหาค่าของ ⌊10 ÷ 3⌋",
    solution: `【วิธีทำ】

ขั้นที่ 1: คำนวณ 10 ÷ 3
    10 ÷ 3 = 3.333... = 3.3̄

ขั้นที่ 2: หา ⌊3.333...⌋
    • 3 ≤ 3.333... < 4
    • ⌊3.333...⌋ = 3

【หมายเหตุ】ในภาษาโปรแกรม 10 // 3 = 3 (integer division)

【ตอบ】⌊10 ÷ 3⌋ = 3`,
    answer: "3",
  },
  {
    id: 14,
    question: "ถ้า h(x) = x − ⌊x⌋ จงหา h(4.7)",
    solution: `【นิยาม】Fractional Part (ส่วนเศษส่วน)
{x} = x − ⌊x⌋ = ส่วนทศนิยมของ x

【วิธีทำ】
h(x) = x − ⌊x⌋ คือฟังก์ชัน fractional part

แทนค่า x = 4.7:
    h(4.7) = 4.7 − ⌊4.7⌋
           = 4.7 − 4
           = 0.7

【สมบัติ】0 ≤ {x} < 1 สำหรับทุก x

【ตอบ】h(4.7) = 0.7`,
    answer: "0.7",
  },
  {
    id: 15,
    question: "จงหาค่าของ ⌊2.9⌋ × ⌈2.1⌉",
    solution: `【วิธีทำ】คำนวณทีละส่วน

ส่วนที่ 1: หา ⌊2.9⌋
    • 2 ≤ 2.9 < 3
    • ⌊2.9⌋ = 2

ส่วนที่ 2: หา ⌈2.1⌉
    • 2 < 2.1 ≤ 3
    • ⌈2.1⌉ = 3

ส่วนที่ 3: คูณกัน
    ⌊2.9⌋ × ⌈2.1⌉ = 2 × 3 = 6

【ตอบ】6`,
    answer: "6",
  },
]

const exponentialExamples = [
  {
    id: 1,
    question: "จงหาค่าของ 2³",
    solution: `【นิยาม】เลขยกกำลัง
aⁿ = a × a × a × ... × a (n ตัว)

【วิธีทำ】
2³ = 2 × 2 × 2
   = 4 × 2
   = 8

【ตอบ】2³ = 8`,
    answer: "8",
  },
  {
    id: 2,
    question: "จงหาค่าของ e⁰",
    solution: `【กฎ】เลขยกกำลังศูนย์
a⁰ = 1 สำหรับทุก a ≠ 0

【อธิบาย】
• e คือค่าคงที่ออยเลอร์ ≈ 2.71828...
• ไม่ว่าฐานจะเป็นเลขอะไร (ยกเว้น 0)
• ยกกำลัง 0 จะได้ 1 เสมอ

【ตอบ】e⁰ = 1`,
    answer: "1",
  },
  {
    id: 3,
    question: "แก้สมการ 2ˣ = 16",
    solution: `【หลักการ】ถ้า aˣ = aⁿ แล้ว x = n

【วิธีทำ】
ขั้นที่ 1: เขียน 16 ในรูปเลขยกกำลังฐาน 2
    16 = 2 × 2 × 2 × 2 = 2⁴

ขั้นที่ 2: เปรียบเทียบเลขชี้กำลัง
    2ˣ = 2⁴
    ∴ x = 4

【ตรวจสอบ】2⁴ = 16 ✓

【ตอบ】x = 4`,
    answer: "x = 4",
  },
  {
    id: 4,
    question: "จงหาค่าของ 3⁻²",
    solution: `【กฎ】เลขยกกำลังลบ
a⁻ⁿ = 1/aⁿ

【วิธีทำ】
3⁻² = 1/3²
    = 1/9
    ≈ 0.111...

【อธิบาย】
เลขยกกำลังลบ = ส่วนกลับของเลขยกกำลังบวก

【ตอบ】3⁻² = 1/9`,
    answer: "1/9",
  },
  {
    id: 5,
    question: "ถ้า f(x) = eˣ จงหา f(ln 5)",
    solution: `【สมบัติสำคัญ】
e^(ln a) = a สำหรับ a > 0
(e และ ln เป็นฟังก์ชันผกผันกัน)

【วิธีทำ】
กำหนด f(x) = eˣ

แทนค่า x = ln 5:
f(ln 5) = e^(ln 5)
        = 5

【อธิบาย】
ln 5 คือ "ยกกำลังเท่าไหร่ถึงจะได้ 5"
ดังนั้น e^(ln 5) = 5

【ตอบ】f(ln 5) = 5`,
    answer: "5",
  },
  {
    id: 6,
    question: "แก้สมการ eˣ = e³",
    solution: `【หลักการ】
ถ้า aˣ = aⁿ และ a > 0, a ≠ 1
แล้ว x = n

【วิธีทำ】
eˣ = e³

เนื่องจากฐานเท่ากัน (ทั้งคู่คือ e)
∴ เลขชี้กำลังต้องเท่ากัน
∴ x = 3

【ตอบ】x = 3`,
    answer: "x = 3",
  },
  {
    id: 7,
    question: "จงหาค่าของ (2³)²",
    solution: `【กฎ】กำลังของกำลัง
(aᵐ)ⁿ = aᵐ×ⁿ

【วิธีทำ】
(2³)² = 2^(3×2)
      = 2⁶
      = 64

【วิธีคิดอีกแบบ】
(2³)² = 8² = 64 ✓

【ตอบ】(2³)² = 64`,
    answer: "64",
  },
  {
    id: 8,
    question: "จงทำให้ง่าย: 5² × 5³",
    solution: `【กฎ】การคูณเลขยกกำลังฐานเดียวกัน
aᵐ × aⁿ = aᵐ⁺ⁿ

【วิธีทำ】
5² × 5³ = 5^(2+3)
        = 5⁵
        = 5 × 5 × 5 × 5 × 5
        = 3125

【ตอบ】5² × 5³ = 3125`,
    answer: "3125",
  },
  {
    id: 9,
    question: "จงหาค่าของ 4^(½)",
    solution: `【กฎ】เลขยกกำลังเศษส่วน
a^(1/n) = ⁿ√a (รากที่ n ของ a)

【วิธีทำ】
4^(½) = 4^(1/2)
      = √4
      = 2

【อธิบาย】
• 4^(½) หมายถึง "จำนวนที่ยกกำลัง 2 แล้วได้ 4"
• 2² = 4 ดังนั้น 4^(½) = 2

【ตอบ】4^(½) = 2`,
    answer: "2",
  },
  {
    id: 10,
    question: "แก้สมการ 3ˣ = 81",
    solution: `【วิธีทำ】

ขั้นที่ 1: เขียน 81 ในรูปเลขยกกำลังฐาน 3
    81 = 3 × 3 × 3 × 3 = 3⁴

ขั้นที่ 2: เปรียบเทียบ
    3ˣ = 3⁴
    ∴ x = 4

【ตรวจสอบ】3⁴ = 81 ✓

【ตอบ】x = 4`,
    answer: "x = 4",
  },
  {
    id: 11,
    question: "จงทำให้ง่าย: 2⁵ ÷ 2³",
    solution: `【กฎ】การหารเลขยกกำลังฐานเดียวกัน
aᵐ ÷ aⁿ = aᵐ⁻ⁿ

【วิธีทำ】
2⁵ ÷ 2³ = 2^(5-3)
        = 2²
        = 4

【วิธีคิดอีกแบบ】
2⁵ ÷ 2³ = 32 ÷ 8 = 4 ✓

【ตอบ】2⁵ ÷ 2³ = 4`,
    answer: "4",
  },
  {
    id: 12,
    question: "จงหาค่าของ 8^(⅔)",
    solution: `【กฎ】เลขยกกำลังเศษส่วน
a^(m/n) = (ⁿ√a)ᵐ = ⁿ√(aᵐ)

【วิธีทำ】
8^(⅔) = 8^(2/3)
      = (∛8)²
      = 2²
      = 4

【อธิบายทีละขั้น】
• ∛8 = 2 (เพราะ 2³ = 8)
• 2² = 4

【ตอบ】8^(⅔) = 4`,
    answer: "4",
  },
  {
    id: 13,
    question: "ถ้า f(x) = 2ˣ จงหา f(0) + f(1) + f(2)",
    solution: `【กำหนดให้】f(x) = 2ˣ

【วิธีทำ】คำนวณทีละค่า

f(0) = 2⁰ = 1
f(1) = 2¹ = 2
f(2) = 2² = 4

ผลรวม = f(0) + f(1) + f(2)
      = 1 + 2 + 4
      = 7

【ตอบ】7`,
    answer: "7",
  },
  {
    id: 14,
    question: "แก้สมการ 5^(2x) = 125",
    solution: `【วิธีทำ】

ขั้นที่ 1: เขียน 125 ในรูปเลขยกกำลังฐาน 5
    125 = 5 × 5 × 5 = 5³

ขั้นที่ 2: เปรียบเทียบ
    5^(2x) = 5³
    2x = 3
    x = 3/2 = 1.5

【ตรวจสอบ】
5^(2×1.5) = 5³ = 125 ✓

【ตอบ】x = 3/2 หรือ 1.5`,
    answer: "x = 3/2",
  },
  {
    id: 15,
    question: "จงหาค่าของ ln(e²)",
    solution: `【สมบัติ】ลอการิทึมธรรมชาติ
ln(eⁿ) = n

【อธิบาย】
• ln คือ ลอการิทึมฐาน e
• ln และ e เป็นฟังก์ชันผกผันกัน
• ln(eⁿ) = n × ln(e) = n × 1 = n

【วิธีทำ】
ln(e²) = 2

【ตอบ】ln(e²) = 2`,
    answer: "2",
  },
  {
    id: 16,
    question: "จงหาค่าของ e^(ln 7)",
    solution: `【สมบัติ】ฟังก์ชันผกผัน
e^(ln a) = a สำหรับ a > 0

【อธิบาย】
• ln 7 หมายถึง "ยกกำลังเท่าไหร่ถึงจะได้ 7"
• สมมติ ln 7 = k นั่นคือ eᵏ = 7
• ดังนั้น e^(ln 7) = 7

【วิธีทำ】
e^(ln 7) = 7

【ตอบ】e^(ln 7) = 7`,
    answer: "7",
  },
  {
    id: 17,
    question: "แก้สมการ 4ˣ = 2",
    solution: `【วิธีทำ】ทำฐานให้เท่ากัน

ขั้นที่ 1: เขียน 4 ในรูปเลขยกกำลังฐาน 2
    4 = 2²

ขั้นที่ 2: แทนค่า
    4ˣ = 2
    (2²)ˣ = 2¹
    2^(2x) = 2¹

ขั้นที่ 3: เปรียบเทียบเลขชี้กำลัง
    2x = 1
    x = ½

【ตรวจสอบ】4^(½) = √4 = 2 ✓

【ตอบ】x = ½`,
    answer: "x = ½",
  },
  {
    id: 18,
    question: "จงทำให้ง่าย: (3² × 3⁴) ÷ 3³",
    solution: `【กฎที่ใช้】
• aᵐ × aⁿ = aᵐ⁺ⁿ
• aᵐ ÷ aⁿ = aᵐ⁻ⁿ

【วิธีทำ】
(3² × 3⁴) ÷ 3³

ขั้นที่ 1: คำนวณในวงเล็บก่อน
= 3^(2+4) ÷ 3³
= 3⁶ ÷ 3³

ขั้นที่ 2: หาร
= 3^(6-3)
= 3³
= 27

【ตอบ】(3² × 3⁴) ÷ 3³ = 27`,
    answer: "27",
  },
  {
    id: 19,
    question: "ถ้า g(x) = e^(2x) จงหา g(0)",
    solution: `【กำหนดให้】g(x) = e^(2x)

【วิธีทำ】แทนค่า x = 0

g(0) = e^(2×0)
     = e^(0)
     = e⁰
     = 1

【หมายเหตุ】
ไม่ว่าฟังก์ชันเอกซ์โพเนนเชียลจะซับซ้อนแค่ไหน
ถ้าเลขชี้กำลังเป็น 0 คำตอบคือ 1 เสมอ

【ตอบ】g(0) = 1`,
    answer: "1",
  },
  {
    id: 20,
    question: "จงหาค่าของ 27^(⅓) × 27^(⅔)",
    solution: `【กฎ】การคูณเลขยกกำลังฐานเดียวกัน
aᵐ × aⁿ = aᵐ⁺ⁿ

【วิธีทำ】
27^(⅓) × 27^(⅔)

= 27^(⅓ + ⅔)
= 27^(3/3)
= 27¹
= 27

【วิธีคิดอีกแบบ】
• 27^(⅓) = ∛27 = 3
• 27^(⅔) = (∛27)² = 3² = 9
• 3 × 9 = 27 ✓

【ตอบ】27^(⅓) × 27^(⅔) = 27`,
    answer: "27",
  },
]

function ExampleCard({
  example,
  index,
}: {
  example: { id: number; question: string; solution: string; answer: string }
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-mono font-bold">{example.id}</span>
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium text-foreground">{example.question}</p>
          </div>
        </div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          whileHover={{ x: 5 }}
        >
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm font-medium">{isOpen ? "ซ่อนวิธีทำ" : "ดูวิธีทำ"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </motion.button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-border"
          >
            <div className="bg-secondary/30 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-primary mb-2">วิธีทำ:</h4>
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">{example.solution}</pre>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">คำตอบ:</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-lg font-mono font-bold">
                {example.answer}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState<"step" | "exponential">("step")

  return (
    <main className="min-h-screen bg-background math-grid">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">ตัวอย่างโจทย์พร้อมเฉลย</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              ตัวอย่าง<span className="text-primary">โจทย์</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              เรียนรู้วิธีการแก้โจทย์ฟังก์ชันขั้นบันไดและฟังก์ชันเอกซ์โพเนนเชียล พร้อมคำอธิบายทีละขั้นตอน
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 mb-10"
          >
            <button
              onClick={() => setActiveTab("step")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "step"
                  ? "bg-primary/20 text-primary border border-primary/30 glow-cyan"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              ฟังก์ชันขั้นบันได
            </button>
            <button
              onClick={() => setActiveTab("exponential")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "exponential"
                  ? "bg-primary/20 text-primary border border-primary/30 glow-cyan"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              ฟังก์ชันเอกซ์โพเนนเชียล
            </button>
          </motion.div>

          {/* Examples Grid */}
          <div className="space-y-4">
            {activeTab === "step" ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-xl p-6 mb-8"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    ฟังก์ชันขั้นบันได (Step Function)
                  </h2>
                  <p className="text-muted-foreground">
                    ฟังก์ชันขั้นบันได ⌊x⌋ (floor function) ให้ค่าเป็นจำนวนเต็มที่มากที่สุดที่ไม่เกิน x
                    และ ⌈x⌉ (ceiling function) ให้ค่าเป็นจำนวนเต็มที่น้อยที่สุดที่ไม่น้อยกว่า x
                  </p>
                </motion.div>
                {stepFunctionExamples.map((example, index) => (
                  <ExampleCard key={example.id} example={example} index={index} />
                ))}
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-xl p-6 mb-8"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    ฟังก์ชันเอกซ์โพเนนเชียล (Exponential Function)
                  </h2>
                  <p className="text-muted-foreground">
                    ฟังก์ชันเอกซ์โพเนนเชียล f(x) = aˣ โดยที่ a {">"} 0 และ a ≠ 1
                    มีสมบัติสำคัญหลายประการที่ใช้ในการแก้โจทย์
                  </p>
                </motion.div>
                {exponentialExamples.map((example, index) => (
                  <ExampleCard key={example.id} example={example} index={index} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
