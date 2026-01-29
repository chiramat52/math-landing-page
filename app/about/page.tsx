"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { User, School, GraduationCap, Users } from "lucide-react"

const schoolInfo = {
  name: "โรงเรียนวัดสุทธิธรรมาราม",
  level: "ชั้นมัธยมศึกษาปีที่ 4",
  location: "สถานศึกษา"
}

const teamMembers = [
  { 
    name: "จิรเมศร์ บวรจริยะวัชร์", 
    role: "หัวหน้าโปรเจกต์ / Developer", 
    no: "เลขที่ 16",
    id: "6xxxxxxxx" 
  },
  { 
    name: "อัครวินท์ กลิ่นนิรัญ", 
    role: "Content / Researcher", 
    no: "เลขที่ 36",
    id: "6xxxxxxxx" 
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background math-grid">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Users size={16} className="text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">About Our Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">ผู้<span className="text-primary">จัดทำ</span></h1>
        </motion.div>

        {/* School Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-3xl border border-primary/20 bg-primary/5 mb-12 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <School size={120} />
          </div>
          <School size={48} className="text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-1">{schoolInfo.name}</h2>
          <p className="text-primary font-medium flex items-center justify-center gap-2">
            <GraduationCap size={18} />
            {schoolInfo.level}
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="glass-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all group relative"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-violet-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-3 transition-transform">
                  <User size={40} className="text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-muted-foreground text-xs font-mono">{member.no}</span>
                    <span className="text-muted-foreground text-[10px] opacity-70">ID: {member.id}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}