import type { Metadata } from 'next'
import { ContactHero } from '@/components/contact/contact-hero'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'
import { ContactFAQ } from '@/components/contact/contact-faq'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Kayseri Global Hub. Contact our team for product inquiries, B2B partnerships, or customer support. We\'re here to help.',
  openGraph: {
    title: 'Contact Us | Kayseri Global Hub',
    description: 'Get in touch with our team for product inquiries and support.',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <ContactHero />

      {/* Contact Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ContactFAQ />
    </div>
  )
}
