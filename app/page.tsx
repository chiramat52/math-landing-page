import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ContentSection } from "@/components/content-section"
import { StepFunctionSection } from "@/components/step-function-section"
import { ExponentialSection } from "@/components/exponential-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ContentSection />
      <StepFunctionSection />
      <ExponentialSection />
      <Footer />
    </main>
  )
}
