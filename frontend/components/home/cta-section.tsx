import Link from 'next/link'
import { ArrowRight, Building2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* B2C CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-secondary p-8 md:p-12 group">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <ShoppingBag className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
                Shop Our Collection
              </h3>
              <p className="mt-4 text-muted-foreground max-w-md">
                Discover premium furniture for your home. Browse our curated 
                collections and find pieces that reflect your style.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Free shipping on orders over $500',
                  '30-day hassle-free returns',
                  'Expert design consultation',
                  '10-year quality warranty',
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/products" className="inline-block mt-8">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-6 group/btn">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            {/* Background decoration */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-accent/5 group-hover:scale-150 transition-transform duration-700" />
          </div>

          {/* B2B CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 group">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                <Building2 className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium">
                Partner With Us
              </h3>
              <p className="mt-4 text-primary-foreground/80 max-w-md">
                Hotels, developers, and designers trust us for large-scale 
                projects. Get competitive bulk pricing and dedicated support.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Volume discounts up to 30%',
                  'Custom design & manufacturing',
                  'Dedicated project manager',
                  'Global logistics support',
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-primary-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/b2b" className="inline-block mt-8">
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 px-6 group/btn">
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            {/* Background decoration */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-primary-foreground/5 group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>
  )
}
