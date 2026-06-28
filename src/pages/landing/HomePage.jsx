import LandingLayout from '../../components/layout/index.jsx'
import HeroSection from '../../components/landing/HeroSection'
import FeaturesSection from '../../components/landing/FeaturesSection'
import StatsSection from '../../components/landing/StatsSection'
import TestimonialsSection from '../../components/landing/TestimonialsSection'
import CTASection from '../../components/landing/CTASection'

export default function HomePage() {
  return (
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </LandingLayout>
  )
}
