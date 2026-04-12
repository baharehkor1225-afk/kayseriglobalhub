'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Building2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'info@kayseriglobalhub.com',
    href: 'mailto:info@kayseriglobalhub.com',
    description: 'For general inquiries',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+90 123 456 7890',
    href: 'tel:+901234567890',
    description: 'Mon-Fri, 9am-6pm (GMT+3)',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'Kayseri, Turkey',
    href: '#',
    description: 'Showroom by appointment',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon-Fri: 9am-6pm',
    href: null,
    description: 'Sat: 10am-4pm',
  },
]

export function ContactInfo() {
  const { t } = useLanguage()

  const localizedMethods = [
    {
      ...contactMethods[0],
      title: t('contact.info.emailTitle'),
      description: t('contact.info.emailDesc'),
    },
    {
      ...contactMethods[1],
      title: t('contact.info.callTitle'),
      description: t('contact.info.callDesc'),
    },
    {
      ...contactMethods[2],
      title: t('contact.info.visitTitle'),
      description: t('contact.info.visitDesc'),
    },
    {
      ...contactMethods[3],
      title: t('contact.info.hoursTitle'),
      description: t('contact.info.hoursDesc'),
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-medium">{t('contact.info.title')}</h2>
        <p className="mt-2 text-muted-foreground">
          {t('contact.info.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {localizedMethods.map((method) => (
          <div key={method.title} className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <method.icon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-medium">{method.title}</h3>
              {method.href ? (
                <a
                  href={method.href}
                  className="text-sm text-accent hover:underline"
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-sm text-foreground">{method.value}</p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* B2B Quick Link */}
      <div className="p-6 bg-secondary rounded-2xl border border-border">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-medium">{t('contact.info.b2bTitle')}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t('contact.info.b2bDesc')}
            </p>
            <Link href="/b2b" className="inline-block mt-3">
              <Button variant="outline" size="sm">
                {t('contact.info.b2bAction')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Live Chat */}
      <div className="p-6 bg-primary text-primary-foreground rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{t('contact.info.chatTitle')}</h3>
            <p className="text-sm text-primary-foreground/80 mt-1">
              {t('contact.info.chatDesc')}
            </p>
            <Button
              size="sm"
              className="mt-3 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              {t('contact.info.chatAction')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
