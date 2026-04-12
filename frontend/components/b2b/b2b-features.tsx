'use client'

import { Package, Palette, Truck, Users, Clock, HeartHandshake } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const features = [
  {
    icon: Package,
    title: 'Volume Pricing',
    description: 'Enjoy competitive bulk pricing with discounts up to 30% on large orders. The more you order, the more you save.',
  },
  {
    icon: Palette,
    title: 'Custom Manufacturing',
    description: 'Work with our design team to create custom furniture tailored to your project specifications and brand identity.',
  },
  {
    icon: Truck,
    title: 'Global بLogistics',
    description: 'Reliable worldwide shipping with comprehensive logistics support. We handle customs, insurance, and last-mile delivery.',
  },
  {
    icon: Users,
    title: 'Dedicated Project Manager',
    description: 'Get a dedicated point of contact who understands your project and ensures smooth execution from order to installation.',
  },
  {
    icon: Clock,
    title: 'Priority Production',
    description: 'B2B clients receive priority in our production queue, ensuring your projects meet their deadlines.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-term Partnerships',
    description: 'Build an ongoing relationship with exclusive benefits, priority support, and first access to new collections.',
  },
]

export function B2BFeatures() {
  const { language } = useLanguage()
  const l = (en: string, tr: string) => (language === 'tr' ? tr : en)

  const localizedFeatures = features.map((feature) => {
    const titleMap: Record<string, [string, string]> = {
      'Volume Pricing': ['Volume Pricing', 'Toplu Fiyatlama'],
      'Custom Manufacturing': ['Custom Manufacturing', 'Ozel Uretim'],
      'Global بLogistics': ['Global Logistics', 'Global Lojistik'],
      'Dedicated Project Manager': ['Dedicated Project Manager', 'Ozel Proje Yoneticisi'],
      'Priority Production': ['Priority Production', 'Oncelikli Uretim'],
      'Long-term Partnerships': ['Long-term Partnerships', 'Uzun Vadeli Ortaklik'],
    }

    const descriptionMap: Record<string, [string, string]> = {
      'Volume Pricing': [
        'Enjoy competitive bulk pricing with discounts up to 30% on large orders. The more you order, the more you save.',
        'Buyuk siparislerde %30\'a varan indirimlerle rekabetci toplu fiyatlardan yararlanin. Siparis arttikca avantaj da artar.',
      ],
      'Custom Manufacturing': [
        'Work with our design team to create custom furniture tailored to your project specifications and brand identity.',
        'Projenizin teknik gereksinimlerine ve marka kimliginize uygun ozel mobilyalar icin tasarim ekibimizle birlikte calisin.',
      ],
      'Global بLogistics': [
        'Reliable worldwide shipping with comprehensive logistics support. We handle customs, insurance, and last-mile delivery.',
        'Kapsamli lojistik destegiyle guvenilir dunya capi teslimat. Gumruk, sigorta ve son mil teslimatini biz yonetiriz.',
      ],
      'Dedicated Project Manager': [
        'Get a dedicated point of contact who understands your project and ensures smooth execution from order to installation.',
        'Projenizi yakindan takip eden ozel bir iletisim sorumlusu ile siparisten kuruluma kadar sorunsuz surec yonetimi alin.',
      ],
      'Priority Production': [
        'B2B clients receive priority in our production queue, ensuring your projects meet their deadlines.',
        'B2B musterileri uretim sirasinda onceliklidir; boylece projeleriniz zamaninda tamamlanir.',
      ],
      'Long-term Partnerships': [
        'Build an ongoing relationship with exclusive benefits, priority support, and first access to new collections.',
        'Ozel avantajlar, oncelikli destek ve yeni koleksiyonlara ilk erisimle surdurulebilir bir is ortakligi kurun.',
      ],
    }

    return {
      ...feature,
      title: l(...(titleMap[feature.title] ?? [feature.title, feature.title])),
      description: l(...(descriptionMap[feature.title] ?? [feature.description, feature.description])),
    }
  })

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-accent">
            {l('Partnership Benefits', 'Ortaklik Avantajlari')}
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">
            {l('Why Partner With Us?', 'Neden Bizimle Ortak Olmalisiniz?')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {l(
              'We go beyond supplying furniture. We become an extension of your team, ensuring your project\'s success from concept to completion.',
              'Sadece mobilya tedarik etmiyoruz. Fikir asamasindan teslimata kadar projenizin basarisi icin ekibinizin bir parcasi gibi calisiyoruz.'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localizedFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-secondary rounded-2xl border border-border hover:border-accent/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <feature.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="font-medium text-lg text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
