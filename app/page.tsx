import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import CollectionsSection from "@/components/collections-section"
import MaisonSection from "@/components/maison-section"
import NewArrivalsSection from "@/components/new-arrivals-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero sits below fixed navbar */}
        <div className="pt-14">
          <HeroSection />
        </div>
        <CollectionsSection />
        <MaisonSection />
        <NewArrivalsSection />
      </main>
      <Footer />
    </div>
  )
}
