'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingBag, Search, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/language-provider'

const navigation = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/products' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
  { key: 'testsp', href: '/testsp' },
]

const b2bLinks = [
  { key: 'b2bPartners', href: '/b2b' },
  { key: 'getQuote', href: '/b2b#inquiry-form' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems, setIsOpen } = useCart()
  const { language, toggleLanguage, t } = useLanguage()

  const flagSrc = language === 'en' ? '/images/flags/en.svg' : '/images/flags/tr.svg'
  const flagAlt = language === 'en' ? 'English' : 'Turkish'

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
                  key={item.key}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t(`header.${item.key}`)}
                </Link>
              ))}
              <div className="h-4 w-px bg-border" />
              <Link
                href="/b2b"
                className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                <Building2 className="h-4 w-4" />
                {t('header.b2bPartners')}
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Search className="h-5 w-5" />
                <span className="sr-only">{t('header.search')}</span>
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
                <span className="sr-only">{t('header.shoppingCart')}</span>
              </Button>
              <Button
                variant="outline"
                className="h-10 px-3 flex items-center gap-2"
                onClick={toggleLanguage}
              >
                <Image src={flagSrc} alt={flagAlt} width={20} height={15} className="rounded-sm" />
                <span className="text-xs font-semibold">{language.toUpperCase()}</span>
              </Button>
              <Link href="/b2b">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {t('header.getQuote')}
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                className="h-9 px-2"
                onClick={toggleLanguage}
                aria-label={t('header.language')}
              >
                <Image src={flagSrc} alt={flagAlt} width={18} height={14} className="rounded-sm" />
                <span className="ml-1 text-[11px] font-semibold">{language.toUpperCase()}</span>
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
            mobileMenuOpen ? 'max-h-100' : 'max-h-0'
          )}
        >
          <div className="bg-background border-t border-border px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block py-2 text-base font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(`header.${item.key}`)}
              </Link>
            ))}
            <div className="h-px bg-border my-4" />
            {b2bLinks.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center gap-2 py-2 text-base font-medium text-accent hover:text-accent/80 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Building2 className="h-4 w-4" />
                {t(`header.${item.key}`)}
              </Link>
            ))}
            <Link href="/b2b" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                {t('header.getQuote')}
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  )
}
