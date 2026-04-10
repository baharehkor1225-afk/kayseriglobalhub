import type { Metadata } from 'next'
import Image from 'next/image'
import { B2BHero } from '@/components/b2b/b2b-hero'
import { B2BFeatures } from '@/components/b2b/b2b-features'
import { B2BSectors } from '@/components/b2b/b2b-sectors'
import { B2BProcess } from '@/components/b2b/b2b-process'
import { B2BInquiryForm } from '@/components/b2b/b2b-inquiry-form'
import { B2BStats } from '@/components/b2b/b2b-stats'

export const metadata: Metadata = {
  title: 'B2B Partnership Program',
  description: 'Partner with Kayseri Global Hub for premium Turkish furniture. Volume discounts, custom manufacturing, and dedicated project management for hotels, developers, and commercial projects.',
  openGraph: {
    title: 'B2B Partnership Program | Kayseri Global Hub',
    description: 'Premium furniture solutions for hotels, developers, and commercial projects. Get volume discounts up to 30%.',
  },
}

export default function B2BPage() {
  return (
    <div className="min-h-screen pt-20">
      <B2BHero />
      <B2BStats />
      <B2BFeatures />
      <B2BSectors />
      <B2BProcess />
      <B2BInquiryForm />
    </div>
  )
}
