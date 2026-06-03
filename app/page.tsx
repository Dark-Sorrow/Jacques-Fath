import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import CollectionsSection from "@/components/collections-section"
import AnnouncementSection from "@/components/announcement-section"
import MaisonSection from "@/components/maison-section"
import NewArrivalsSection from "@/components/new-arrivals-section"
import HeritageSection from "@/components/heritage-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CollectionsSection />
        <AnnouncementSection />
        <MaisonSection />
        <NewArrivalsSection />
        <HeritageSection />
      </main>
      <Footer />
    </div>
  )
}
