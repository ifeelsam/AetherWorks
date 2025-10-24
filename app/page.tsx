import Hero from "@/components/sections/hero"
import HowItWorks from "@/components/sections/how-it-works"
import ForBrandsCreators from "@/components/sections/for-brands-creators"
import TrustPrimitives from "@/components/sections/trust-primitives"
import ActivityFeed from "@/components/sections/activity-feed"
import CtaBanner from "@/components/sections/cta-banner"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <HowItWorks />
      <ForBrandsCreators />
      <TrustPrimitives />
      <ActivityFeed />
      <CtaBanner />
      <Footer />
    </main>
  )
}
