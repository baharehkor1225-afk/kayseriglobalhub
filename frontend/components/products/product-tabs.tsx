'use client'

import { useState } from 'react'
import { Check, Ruler, Palette, FileText } from 'lucide-react'
import type { Product } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/language-provider'

interface ProductTabsProps {
  product: Product
}

const tabs = [
  { id: 'features', label: 'Features', icon: Check },
  { id: 'dimensions', label: 'Dimensions', icon: Ruler },
  { id: 'materials', label: 'Materials', icon: Palette },
  { id: 'care', label: 'Care Guide', icon: FileText },
]

export function ProductTabs({ product }: ProductTabsProps) {
  const { language } = useLanguage()
  const l = (en: string, tr: string) => (language === 'tr' ? tr : en)
  const [activeTab, setActiveTab] = useState('features')

  const localizedTabs = tabs.map((tab) => {
    const map: Record<string, [string, string]> = {
      Features: ['Features', 'Ozellikler'],
      Dimensions: ['Dimensions', 'Olculer'],
      Materials: ['Materials', 'Malzemeler'],
      'Care Guide': ['Care Guide', 'Bakim Rehberi'],
    }
    return { ...tab, label: l(...(map[tab.label] ?? [tab.label, tab.label])) }
  })

  return (
    <div className="mt-16 border-t border-border pt-12">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-border">
        {localizedTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-accent text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'features' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-secondary rounded-xl"
              >
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 text-accent" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'dimensions' && (
          <div className="max-w-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                <span className="text-muted-foreground">{l('Width', 'Genislik')}</span>
                <span className="font-medium">{product.dimensions.width} cm</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                <span className="text-muted-foreground">{l('Height', 'Yukseklik')}</span>
                <span className="font-medium">{product.dimensions.height} cm</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                <span className="text-muted-foreground">{l('Depth', 'Derinlik')}</span>
                <span className="font-medium">{product.dimensions.depth} cm</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {l('* All dimensions are approximate and may vary slightly due to handcrafted nature.', '* Tum olculer yaklasiktir; el isciligi nedeniyle kucuk farkliliklar olabilir.')}
            </p>
          </div>
        )}

        {activeTab === 'materials' && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.materials.map((material, index) => (
                <div
                  key={index}
                  className="p-4 bg-secondary rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Palette className="h-5 w-5 text-accent" />
                  </div>
                  <h4 className="font-medium">{material}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {l('Premium quality material sourced responsibly.', 'Sorumlu tedarik edilen premium kalite malzeme.')}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {l('All materials are ethically sourced and meet international quality standards.', 'Tum malzemeler etik sekilde tedarik edilir ve uluslararasi kalite standartlarini karsilar.')}
            </p>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="prose prose-sm max-w-none">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary rounded-xl">
                <h4 className="font-medium mb-3">{l('Daily Care', 'Gunluk Bakim')}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>{l('Dust regularly with a soft, dry cloth', 'Yumusak ve kuru bir bezle duzenli toz alin')}</li>
                  <li>{l('Avoid direct sunlight exposure', 'Dogrudan gunes isigindan kacinin')}</li>
                  <li>{l('Use coasters for beverages', 'Icecekler icin bardak altligi kullanin')}</li>
                  <li>{l('Rotate cushions periodically', 'Minderleri periyodik olarak cevirin')}</li>
                </ul>
              </div>
              <div className="p-6 bg-secondary rounded-xl">
                <h4 className="font-medium mb-3">{l('Deep Cleaning', 'Derin Temizlik')}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>{l('Use manufacturer-approved cleaners', 'Uretici onayli temizleyiciler kullanin')}</li>
                  <li>{l('Test on hidden area first', 'Once gorunmeyen bir alanda test edin')}</li>
                  <li>{l('Professional cleaning recommended yearly', 'Yilda bir profesyonel temizlik onerilir')}</li>
                  <li>{l('Avoid harsh chemicals and abrasives', 'Sert kimyasallardan ve asindiricilardan kacinin')}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
