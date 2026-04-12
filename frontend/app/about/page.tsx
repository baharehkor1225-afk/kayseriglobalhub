import type { Metadata } from 'next'
import { AboutContent } from '@/components/about/about-content'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover the story of Kayseri Global Hub - 38 years of Turkish furniture craftsmanship excellence. Learn about our heritage, values, and commitment to quality.',
  openGraph: {
    title: 'About Us | Kayseri Global Hub',
    description: '38 years of Turkish furniture craftsmanship excellence.',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
