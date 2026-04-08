import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { ARPreviewSection } from '@/components/home/ar-preview-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { TrustBadges } from '@/components/home/trust-badges'
import { PartnersSection } from '@/components/home/partners-section'
import { CTASection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <CategoriesSection />
      <FeaturedProducts />
      <ARPreviewSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  )
}
