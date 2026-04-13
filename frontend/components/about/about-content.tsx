'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Users, Leaf, Heart, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'

const values = [
  {
    icon: Award,
    titleEn: 'Quality First',
    titleTr: 'Once Kalite',
    descriptionEn: 'Every piece undergoes rigorous quality checks to ensure it meets our exacting standards.',
    descriptionTr: 'Her urun, yuksek standartlarimizi karsiladigindan emin olmak icin titiz kalite kontrollerinden gecer.',
  },
  {
    icon: Users,
    titleEn: 'Customerی Focus',
    titleTr: 'Musteri Odakli',
    descriptionEn: 'Your satisfaction drives everything we do, from design to delivery and beyond.',
    descriptionTr: 'Tasarımdan teslime kadar attigimiz her adimin merkezinde memnuniyetiniz var.',
  },
  {
    icon: Leaf,
    titleEn: 'Sustainability',
    titleTr: 'Surdurulebilirlik',
    descriptionEn: 'We source materials responsibly and minimize our environmental footprint.',
    descriptionTr: 'Malzemeleri sorumlu sekilde tedarik eder, cevresel etkimizi en aza indiririz.',
  },
  {
    icon: Heart,
    titleEn: 'Craftsmanship',
    titleTr: 'Ustalik',
    descriptionEn: 'Our artisans combine traditional techniques with modern innovation.',
    descriptionTr: 'Ustalarimiz geleneksel teknikleri modern yeniliklerle birlestirir.',
  },
]

const milestones = [
  {
    year: '1985',
    titleEn: 'Founded in Kayseri',
    titleTr: 'Kayseri\'de Kurulus',
    descriptionEn: 'Started as a small family workshop in the heart of Turkey.',
    descriptionTr: 'Turkiye\'nin kalbinde kucuk bir aile atoly asly olarak basladik.',
  },
  {
    year: '1995',
    titleEn: 'First Export',
    titleTr: 'Ilk Ihracat',
    descriptionEn: 'Expanded internationally with our first export to Europe.',
    descriptionTr: 'Avrupa\'ya ilk ihracatimizla uluslararasi pazara acildik.',
  },
  {
    year: '2005',
    titleEn: 'Modern Factory',
    titleTr: 'Modern Fabrika',
    descriptionEn: 'Opened state-of-the-art manufacturing facility.',
    descriptionTr: 'Son teknoloji uretim tesisimizi devreye aldik.',
  },
  {
    year: '2015',
    titleEn: 'Global Reach',
    titleTr: 'Kuresel Erisim',
    descriptionEn: 'Established presence in 30+ countries worldwide.',
    descriptionTr: 'Dunya genelinde 30\'dan fazla ulkede varlik gostermeye basladik.',
  },
  {
    year: '2023',
    titleEn: 'Digital Innovation',
    titleTr: 'Dijital Inovasyon',
    descriptionEn: 'Launched AR/3D preview technology for customers.',
    descriptionTr: 'Musterilerimiz icin AR/3D onizleme teknolojisini hayata gecirdik.',
  },
]

export function AboutContent() {
  const { language } = useLanguage()
  const l = (en: string, tr: string) => (language === 'tr' ? tr : en)

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-24 lg:py-32 bg-secondary overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-accent">{l('Our Story', 'Hikayemiz')}</span>
              <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-medium text-foreground leading-tight">
                {l('Crafting Excellence Since', '1985\'ten Beri Ustalikla')} <span className="text-accent">1985</span>
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                {l(
                  'From a small workshop in Kayseri to a global furniture brand, our journey has been defined by an unwavering commitment to quality, innovation, and the timeless art of Turkish craftsmanship.',
                  'Kayseri\'deki kucuk bir atolye yolculugumuzdan kuresel bir mobilya markasina uzanan surecte, kaliteye, yenilige ve Turk zanaatinin zamansiz sanatina olan bagliligimiz hic degismedi.'
                )}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {l(
                  'Today, we serve thousands of homes and hundreds of businesses across 50+ countries, bringing the warmth and elegance of Turkish design to spaces around the world.',
                  'Bugun 50\'den fazla ulkede binlerce eve ve yuzlerce isletmeye hizmet veriyor; Turk tasariminin sicakligini ve zarafetini dunyaya tasiyoruz.'
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <div className="font-serif text-4xl font-medium text-accent">38+</div>
                  <div className="text-sm text-muted-foreground">{l('Years of Excellence', 'Yillik Ustalik')}</div>
                </div>
                <div>
                  <div className="font-serif text-4xl font-medium text-accent">50+</div>
                  <div className="text-sm text-muted-foreground">{l('Countries Served', 'Hizmet Verilen Ulke')}</div>
                </div>
                <div>
                  <div className="font-serif text-4xl font-medium text-accent">10K+</div>
                  <div className="text-sm text-muted-foreground">{l('Happy Customers', 'Mutlu Musteri')}</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image src="/images/hero-living-room.jpg" alt="Kayseri Global Hub showroom" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-widest text-accent">{l('Our Values', 'Degerlerimiz')}</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">{l('What We Stand For', 'Bizi Biz Yapanlar')}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.titleEn} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-medium text-lg">{l(value.titleEn, value.titleTr)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{l(value.descriptionEn, value.descriptionTr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-widest text-accent">{l('Our Journey', 'Yolculugumuz')}</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">{l('Milestones Through the Years', 'Yillar Icinde Donum Noktalari')}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background md:-translate-x-1/2" />
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-background p-6 rounded-2xl border border-border">
                      <span className="text-2xl font-serif font-medium text-accent">{milestone.year}</span>
                      <h3 className="mt-2 font-medium text-lg">{l(milestone.titleEn, milestone.titleTr)}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{l(milestone.descriptionEn, milestone.descriptionTr)}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="craftsmanship" className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image src="/images/category-dining.jpg" alt="Furniture craftsmanship" fill className="object-cover" />
            </div>
            <div>
              <span className="text-sm uppercase tracking-widest text-accent">{l('Craftsmanship', 'Ustalik')}</span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">{l('The Art of Turkish Furniture Making', 'Turk Mobilya Uretiminin Sanati')}</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                {l(
                  'Our master craftsmen carry forward generations of Turkish furniture-making traditions while embracing modern techniques and innovations. Each piece is a testament to their skill and dedication.',
                  'Usta zanaatkarlarimiz, Turk mobilya gelenegini modern teknik ve inovasyonla birlestirir. Her parca, emek ve ustaligin bir yansimasidir.'
                )}
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  l('Hand-selected premium materials', 'Elle secilen premium malzemeler'),
                  l('Traditional joinery techniques', 'Geleneksel birlestirme teknikleri'),
                  l('Rigorous quality control', 'Titiz kalite kontrol'),
                  l('Eco-friendly finishing processes', 'Cevre dostu bitis islemleri'),
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

      <section id="sustainability" className="py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-accent">{l('Sustainability', 'Surdurulebilirlik')}</span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium">{l('Committed to a Greener Future', 'Daha Yesil Bir Gelecege Bagliyiz')}</h2>
              <p className="mt-6 text-primary-foreground/80 leading-relaxed">
                {l(
                  'We believe in creating furniture that is not only beautiful but also responsible. Our sustainability initiatives span the entire production process, from sourcing to delivery.',
                  'Sadece guzel degil, ayni zamanda sorumlu urunler tasarliyoruz. Surdurulebilirlik yaklasimimiz, tedarikten teslime tum sureci kapsar.'
                )}
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  l('FSC-certified wood sources', 'FSC sertifikali ahsap kaynaklari'),
                  l('Low-VOC finishes and adhesives', 'Dusuk VOC bitis ve yapistiricilar'),
                  l('Recycled packaging materials', 'Geri donusturulmus paketleme malzemeleri'),
                  l('Carbon-neutral shipping options', 'Karbon notr kargo secenekleri'),
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
              <Image src="/images/category-bedroom.jpg" alt="Sustainable furniture" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">{l('Ready to Experience KGH Quality?', 'KGH Kalitesini Deneyimlemeye Hazir misiniz?')}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            {l(
              'Whether you are furnishing your home or planning a large-scale project, we are here to help bring your vision to life.',
              'Evinizi dosemek ya da buyuk bir proje planlamak fark etmez; vizyonunuzu hayata gecirmeniz icin yaninizdayiz.'
            )}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-8 group">
                {l('Browse Products', 'Urunleri Incele')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8">
                {l('Contact Us', 'Bize Ulasin')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
