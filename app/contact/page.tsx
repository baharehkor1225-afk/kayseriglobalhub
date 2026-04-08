import type { Metadata } from 'next'
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
      {/* Hero Section */}
      <section className="bg-secondary py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-accent">Contact Us</span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-medium text-foreground">
              Let&apos;s Start a Conversation
            </h1>
            <p className="mt-4 text-muted-foreground">
              Have questions about our products, need design advice, or want to discuss 
              a B2B partnership? We&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

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
