'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, Search, Building2, User } from 'lucide-react'
import { Button } from '../../frontend/components/ui/button'
import { useCart } from '../../frontend/lib/cart-context'
import { CartDrawer } from '../../frontend/components/cart/cart-drawer'
import { cn } from '../../frontend/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'testsp', href: '/testsp' },
]

const b2bLinks = [
  { name: 'B2B Partnership', href: '/b2b' },
  { name: 'Request Quote', href: '/b2b#inquiry-form' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems, setIsOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-foreground">
                  KAYSERI
                </span>
                <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Global Hub
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-4 w-px bg-border" />
              <Link
                href="/b2b"
                className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                <Building2 className="h-4 w-4" />
                B2B Partners
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
              <Link href="/b2b">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Get a Quote
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-[400px]' : 'max-h-0'
          )}
        >
          <div className="bg-background border-t border-border px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-border my-4" />
            {b2bLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 py-2 text-base font-medium text-accent hover:text-accent/80 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Building2 className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            <Link href="/b2b" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  )
}
