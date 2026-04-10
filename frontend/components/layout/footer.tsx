import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'Living Room', href: '/products?category=living-room' },
    { name: 'Bedroom', href: '/products?category=bedroom' },
    { name: 'Dining', href: '/products?category=dining' },
    { name: 'Office', href: '/products?category=office' },
    { name: 'New Arrivals', href: '/products?filter=new' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about#story' },
    { name: 'Craftsmanship', href: '/about#craftsmanship' },
    { name: 'Sustainability', href: '/about#sustainability' },
    { name: 'Careers', href: '/careers' },
  ],
  b2b: [
    { name: 'Partnership Program', href: '/b2b' },
    { name: 'Request Quote', href: '/b2b#inquiry-form' },
    { name: 'Hotel & Hospitality', href: '/b2b#hospitality' },
    { name: 'Corporate Projects', href: '/b2b#corporate' },
    { name: 'Design Services', href: '/b2b#design' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping & Delivery', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Warranty', href: '/warranty' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-md">
              <h3 className="font-serif text-2xl font-medium">
                Stay Inspired
              </h3>
              <p className="mt-2 text-primary-foreground/70">
                Subscribe for exclusive offers, design tips, and new collection previews.
              </p>
            </div>
            <form className="flex gap-3 max-w-md w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight">
                  KAYSERI
                </span>
                <span className="text-xs tracking-[0.3em] text-primary-foreground/70 uppercase">
                  Global Hub
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 max-w-xs">
              Premium Turkish furniture crafted with generations of expertise. 
              Serving homes and businesses worldwide since 1985.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4" />
                <span>Kayseri, Turkey</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@kayseriglobalhub.com" className="hover:text-primary-foreground transition-colors">
                  info@kayseriglobalhub.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4" />
                <a href="tel:+901234567890" className="hover:text-primary-foreground transition-colors">
                  +90 123 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* B2B */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">B2B</h4>
            <ul className="space-y-3">
              {footerLinks.b2b.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-primary-foreground/70">
              &copy; {new Date().getFullYear()} Kayseri Global Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/70">
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
