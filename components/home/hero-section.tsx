'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-living-room.jpg"
          alt="Premium Turkish furniture showroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full text-background/90 text-sm mb-6 transition-all duration-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Premium Turkish Craftsmanship Since 1985
          </div>

          {/* Headline */}
          <h1
            className={cn(
              'font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-background leading-tight transition-all duration-700 delay-100',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="text-balance">Timeless Furniture for</span>{' '}
            <span className="text-accent">Modern Living</span>
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              'mt-6 text-lg text-background/80 max-w-xl leading-relaxed transition-all duration-700 delay-200',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            From intimate homes to grand hotels, we craft furniture that tells your story. 
            Experience the perfect blend of tradition and innovation.
          </p>

          {/* Dual CTAs */}
          <div
            className={cn(
              'mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Link href="/products">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90 h-14 px-8 text-base group"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/b2b">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-transparent sm:w-auto border-background/30 text-background hover:bg-background/10 hover:text-background h-14 px-8 text-base group"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Partner With Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div
            className={cn(
              'mt-16 grid grid-cols-3 gap-8 transition-all duration-700 delay-500',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {[
              { value: '38+', label: 'Years of Excellence' },
              { value: '50+', label: 'Countries Served' },
              { value: '10K+', label: 'Projects Completed' },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-serif text-3xl sm:text-4xl font-medium text-background">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-background/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-background/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-background/60 to-transparent" />
        </div>
      </div>
    </section>
  )
}
