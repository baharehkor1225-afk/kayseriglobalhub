'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/language-provider'
import { getCategoryLabel } from '@/lib/i18n'

export function CategoriesSection() {
  const { language, t } = useLanguage()

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-accent">
            {t('home.categories.badge')}
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground text-balance">
            {t('home.categories.title')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('home.categories.subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className={cn(
                'group relative overflow-hidden rounded-2xl',
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              )}
            >
              <div
                className={cn(
                  'relative w-full overflow-hidden',
                  index === 0 ? 'aspect-square' : 'aspect-[4/3]'
                )}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <span className="text-xs text-background/70 uppercase tracking-wider">
                    {category.productCount} {t('home.categories.products')}
                  </span>
                  <h3
                    className={cn(
                      'font-serif font-medium text-background mt-1',
                      index === 0 ? 'text-3xl' : 'text-xl'
                    )}
                  >
                    {getCategoryLabel(language, category.slug, category.name)}
                  </h3>
                  <p
                    className={cn(
                      'text-background/70 mt-2 line-clamp-2',
                      index === 0 ? 'text-base max-w-md' : 'text-sm'
                    )}
                  >
                    {category.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-background text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('home.categories.explore')}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
