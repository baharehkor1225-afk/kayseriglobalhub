'use client'

import { useState } from 'react'
import { Send, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitContactForm } from '@/lib/api'

const subjects = [
  'Product Inquiry',
  'Order Status',
  'B2B Partnership',
  'Design Consultation',
  'Warranty & Returns',
  'Technical Support',
  'Other',
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    await submitContactForm({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
      orderNumber: formData.get('orderNumber') ? String(formData.get('orderNumber')) : undefined,
    })

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-secondary rounded-3xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-accent flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-accent-foreground" />
        </div>
        <h3 className="font-serif text-2xl font-medium">Message Sent!</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-secondary rounded-3xl p-8 md:p-12">
      <h2 className="font-serif text-2xl font-medium mb-6">Send Us a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Order Number (optional) */}
        <div>
          <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">
            Order Number (if applicable)
          </label>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="KGH-000000"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
            placeholder="How can we help you?"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            * Required fields. We typically respond within 24 hours.
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-6 gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
