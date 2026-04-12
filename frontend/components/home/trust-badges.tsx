'use client'

import { Shield, Truck, Award, Headphones, RefreshCw, Leaf } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const badges = [
  {
    icon: Shield,
    titleKey: 'home.trust.warrantyTitle',
    descriptionKey: 'home.trust.warrantyDesc',
  },
  {
    icon: Truck,
    titleKey: 'home.trust.shippingTitle',
    descriptionKey: 'home.trust.shippingDesc',
  },
  {
    icon: Award,
    titleKey: 'home.trust.qualityTitle',
    descriptionKey: 'home.trust.qualityDesc',
  },
  {
    icon: Headphones,
    titleKey: 'home.trust.supportTitle',
    descriptionKey: 'home.trust.supportDesc',
  },
  {
    icon: RefreshCw,
    titleKey: 'home.trust.returnsTitle',
    descriptionKey: 'home.trust.returnsDesc',
  },
  {
    icon: Leaf,
    titleKey: 'home.trust.sustainableTitle',
    descriptionKey: 'home.trust.sustainableDesc',
  },
]

export function TrustBadges() {
  const { t } = useLanguage()

  return (
    <section className="bg-secondary py-12 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {badges.map((badge) => (
            <div
              key={badge.titleKey}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <badge.icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-sm text-foreground">{t(badge.titleKey)}</h3>
              <p className="text-xs text-muted-foreground mt-1">{t(badge.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
