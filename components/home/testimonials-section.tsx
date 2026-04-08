'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { testimonials } from '@/lib/data'
import { cn } from '@/lib/utils'

export function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'b2b' | 'b2c'>('all')
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredTestimonials = testimonials.filter(
    t => activeTab === 'all' || t.type === activeTab
  )

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length
    )
  }

  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm uppercase tracking-widest text-accent">
            Testimonials
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground">
            From luxury hotels to cozy homes, discover why clients worldwide 
            trust Kayseri Global Hub for their furniture needs.
          </p>

          {/* Tabs */}
          <div className="mt-8 inline-flex p-1 bg-background rounded-full">
            {[
              { key: 'all', label: 'All' },
              { key: 'b2b', label: 'B2B Partners' },
              { key: 'b2c', label: 'Retail Customers' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as 'all' | 'b2b' | 'b2c')
                  setCurrentIndex(0)
                }}
                className={cn(
                  'px-6 py-2 text-sm font-medium rounded-full transition-all',
                  activeTab === tab.key
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-background rounded-3xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-accent/20">
              <Quote className="h-16 w-16" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < filteredTestimonials[currentIndex]?.rating
                      ? 'fill-accent text-accent'
                      : 'fill-muted text-muted'
                  )}
                />
              ))}
            </div>

            {/* Content */}
            <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed">
              &ldquo;{filteredTestimonials[currentIndex]?.content}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  {filteredTestimonials[currentIndex]?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {filteredTestimonials[currentIndex]?.role}
                  {filteredTestimonials[currentIndex]?.company &&
                    `, ${filteredTestimonials[currentIndex]?.company}`}
                </p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-secondary rounded-full">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {filteredTestimonials[currentIndex]?.type === 'b2b' ? 'B2B Partner' : 'Retail Customer'}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="pointer-events-auto rounded-full h-12 w-12 bg-background border-border"
                disabled={filteredTestimonials.length <= 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="pointer-events-auto rounded-full h-12 w-12 bg-background border-border"
                disabled={filteredTestimonials.length <= 1}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'w-6 bg-accent'
                    : 'bg-border hover:bg-muted-foreground'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
