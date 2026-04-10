'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'What is your delivery time?',
    answer: 'Standard delivery takes 2-4 weeks depending on your location. For custom orders, please allow 6-8 weeks. Express shipping options are available for select products.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. Contact us for a detailed quote including customs and duties.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused items in original packaging. Custom-made pieces are non-returnable. Return shipping costs apply unless the item is defective.',
  },
  {
    question: 'Do you offer assembly services?',
    answer: 'Yes, white-glove delivery including assembly is available in select areas. Standard delivery includes curbside delivery. Assembly instructions are included with all products.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. For B2B orders, we also offer NET 30 terms for qualified businesses.',
  },
  {
    question: 'Can I customize furniture pieces?',
    answer: 'Many of our products can be customized in terms of fabric, finish, and dimensions. For custom requests, please contact our design team through the B2B inquiry form.',
  },
]

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-accent">FAQ</span>
          <h2 className="mt-4 font-serif text-3xl font-medium text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-48' : 'max-h-0'
                )}
              >
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Can&apos;t find what you&apos;re looking for?{' '}
          <a href="#" className="text-accent hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </section>
  )
}
