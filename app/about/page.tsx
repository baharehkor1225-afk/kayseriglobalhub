import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Users, Globe, Leaf, Heart, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover the story of Kayseri Global Hub - 38 years of Turkish furniture craftsmanship excellence. Learn about our heritage, values, and commitment to quality.',
  openGraph: {
    title: 'About Us | Kayseri Global Hub',
    description: '38 years of Turkish furniture craftsmanship excellence.',
  },
}

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'Every piece undergoes rigorous quality checks to ensure it meets our exacting standards.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Your satisfaction drives everything we do, from design to delivery and beyond.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We source materials responsibly and minimize our environmental footprint.',
  },
  {
    icon: Heart,
    title: 'Craftsmanship',
    description: 'Our artisans combine traditional techniques with modern innovation.',
  },
]

const milestones = [
  { year: '1985', title: 'Founded in Kayseri', description: 'Started as a small family workshop in the heart of Turkey.' },
  { year: '1995', title: 'First Export', description: 'Expanded internationally with our first export to Europe.' },
  { year: '2005', title: 'Modern Factory', description: 'Opened state-of-the-art manufacturing facility.' },
  { year: '2015', title: 'Global Reach', description: 'Established presence in 30+ countries worldwide.' },
  { year: '2023', title: 'Digital Innovation', description: 'Launched AR/3D preview technology for customers.' },
]

const team = [
  { name: 'Ahmet Yilmaz', role: 'Founder & CEO', image: '/images/category-office.jpg' },
  { name: 'Elif Demir', role: 'Head of Design', image: '/images/category-living.jpg' },
  { name: 'Mehmet Kaya', role: 'Operations Director', image: '/images/category-bedroom.jpg' },
  { name: 'Zeynep Arslan', role: 'B2B Partnerships', image: '/images/category-dining.jpg' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-secondary overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-accent">Our Story</span>
              <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-medium text-foreground leading-tight">
                Crafting Excellence Since <span className="text-accent">1985</span>
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                From a small workshop in Kayseri to a global furniture brand, our journey 
                has been defined by an unwavering commitment to quality, innovation, and 
                the timeless art of Turkish craftsmanship.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Today, we serve thousands of homes and hundreds of businesses across 50+ 
                countries, bringing the warmth and elegance of Turkish design to spaces 
                around the world.
              </p>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <div className="font-serif text-4xl font-medium text-accent">38+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
                <div>
                  <div className="font-serif text-4xl font-medium text-accent">50+</div>
                  <div className="text-sm text-muted-foreground">Countries Served</div>
                </div>
                <div>
                  <div className="font-serif text-4xl font-medium text-accent">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/images/hero-living-room.jpg"
                  alt="Kayseri Global Hub showroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-widest text-accent">Our Values</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-medium text-lg">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="story" className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-widest text-accent">Our Journey</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">
              Milestones Through the Years
            </h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background md:-translate-x-1/2" />
                  
                  {/* Content */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-background p-6 rounded-2xl border border-border">
                      <span className="text-2xl font-serif font-medium text-accent">{milestone.year}</span>
                      <h3 className="mt-2 font-medium text-lg">{milestone.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section id="craftsmanship" className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/category-dining.jpg"
                alt="Furniture craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-sm uppercase tracking-widest text-accent">Craftsmanship</span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">
                The Art of Turkish Furniture Making
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Our master craftsmen carry forward generations of Turkish furniture-making 
                traditions while embracing modern techniques and innovations. Each piece 
                is a testament to their skill and dedication.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Hand-selected premium materials',
                  'Traditional joinery techniques',
                  'Rigorous quality control',
                  'Eco-friendly finishing processes',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <Shield className="h-3 w-3 text-accent" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-accent">Sustainability</span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium">
                Committed to a Greener Future
              </h2>
              <p className="mt-6 text-primary-foreground/80 leading-relaxed">
                We believe in creating furniture that is not only beautiful but also 
                responsible. Our sustainability initiatives span the entire production 
                process, from sourcing to delivery.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'FSC-certified wood sources',
                  'Low-VOC finishes and adhesives',
                  'Recycled packaging materials',
                  'Carbon-neutral shipping options',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Leaf className="h-3 w-3 text-accent-foreground" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/category-bedroom.jpg"
                alt="Sustainable furniture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
            Ready to Experience KGH Quality?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Whether you are furnishing your home or planning a large-scale project, 
            we are here to help bring your vision to life.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-8 group">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
