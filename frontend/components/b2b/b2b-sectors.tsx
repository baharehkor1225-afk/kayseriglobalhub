import Image from 'next/image'
import { Hotel, Building, Store, Home, School, Briefcase } from 'lucide-react'

const sectors = [
  {
    icon: Hotel,
    title: 'Hotels & Hospitality',
    description: 'Luxury furniture solutions for hotels, resorts, and vacation rentals that elevate guest experiences.',
    image: '/images/category-bedroom.jpg',
  },
  {
    icon: Building,
    title: 'Real Estate Development',
    description: 'Furnish model homes, apartments, and residential developments with style and efficiency.',
    image: '/images/category-living.jpg',
  },
  {
    icon: Briefcase,
    title: 'Corporate & Offices',
    description: 'Professional workspace furniture that balances aesthetics, ergonomics, and productivity.',
    image: '/images/category-office.jpg',
  },
  {
    icon: Store,
    title: 'Retail & Showrooms',
    description: 'Display furniture and fixtures that enhance your retail environment and brand image.',
    image: '/images/category-dining.jpg',
  },
  {
    icon: Home,
    title: 'Interior Designers',
    description: 'Partner with us to bring your design visions to life with custom and catalog furniture.',
    image: '/images/hero-living-room.jpg',
  },
  {
    icon: School,
    title: 'Education & Institutions',
    description: 'Durable, comfortable furniture for schools, universities, and institutional settings.',
    image: '/images/category-office.jpg',
  },
]

export function B2BSectors() {
  return (
    <section id="sectors" className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-accent">
            Industries We Serve
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">
            Solutions for Every Sector
          </h2>
          <p className="mt-4 text-muted-foreground">
            From boutique hotels to corporate headquarters, we have experience 
            delivering furniture solutions across diverse industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <div
              key={sector.title}
              className="group relative overflow-hidden rounded-2xl bg-background"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-10 h-10 rounded-lg bg-background/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <sector.icon className="h-5 w-5 text-background" />
                </div>
                <h3 className="font-medium text-lg text-background">{sector.title}</h3>
                <p className="mt-2 text-sm text-background/80 line-clamp-2">
                  {sector.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
