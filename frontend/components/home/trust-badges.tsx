import { Shield, Truck, Award, Headphones, RefreshCw, Leaf } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    title: '10-Year Warranty',
    description: 'Comprehensive coverage on all products',
  },
  {
    icon: Truck,
    title: 'Global Shipping',
    description: 'Worldwide delivery to 50+ countries',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Handcrafted by master artisans',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer service team',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    description: 'Eco-friendly materials & practices',
  },
]

export function TrustBadges() {
  return (
    <section className="bg-secondary py-12 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-3 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <badge.icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-sm text-foreground">{badge.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
