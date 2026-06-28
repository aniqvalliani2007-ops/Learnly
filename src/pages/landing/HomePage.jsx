import LandingLayout from '../../components/layout/index.jsx'
import HeroSection from '../../components/landing/HeroSection'
import FeaturesSection from '../../components/landing/FeaturesSection'
import HowItWorks from '../../components/landing/HowItWorks'
import TestimonialsSection from '../../components/landing/TestimonialsSection'
import PricingSection from '../../components/landing/PricingSection'
import FAQSection from '../../components/landing/FAQSection'
import CTASection from '../../components/landing/CTASection'

export default function HomePage() {
  return (
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </LandingLayout>
  )
}
