'use client'

import { useState } from 'react'
import { Upload, Send, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { submitB2BInquiry } from '@/lib/api'

const projectTypes = [
  'Hotel / Hospitality',
  'Real Estate Development',
  'Corporate Office',
  'Retail / Showroom',
  'Interior Design Project',
  'Educational Institution',
  'Healthcare Facility',
  'Restaurant / Cafe',
  'Other',
]

const productCategories = [
  'Living Room',
  'Bedroom',
  'Dining',
  'Office',
  'Outdoor',
  'Custom Design',
]

const quantityRanges = [
  '10-25 units',
  '26-50 units',
  '51-100 units',
  '101-250 units',
  '251-500 units',
  '500+ units',
]

export function B2BInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const productInterest = formData.getAll('productInterest').map((value) => String(value))

    await submitB2BInquiry({
      companyName: String(formData.get('companyName') ?? ''),
      contactName: String(formData.get('contactName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: formData.get('phone') ? String(formData.get('phone')) : undefined,
      country: String(formData.get('country') ?? ''),
      projectType: String(formData.get('projectType') ?? ''),
      productInterest,
      quantity: String(formData.get('quantity') ?? ''),
      message: String(formData.get('message') ?? ''),
      fileName: formData.get('attachment') && formData.get('attachment') instanceof File ? formData.get('attachment').name : undefined,
    })

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  if (isSubmitted) {
    return (
      <section id="inquiry-form" className="py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-accent flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-accent-foreground" />
          </div>
          <h2 className="font-serif text-3xl font-medium">
            Thank You for Your Inquiry!
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Our B2B team will review your project details and get back to you
            within 1-2 business days with a personalized proposal.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Submit Another Inquiry
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section id="inquiry-form" className="py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-accent">
            Get Started
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium">
            Request a Quote
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Tell us about your project and requirements. Our team will prepare
            a customized proposal within 1-2 business days.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
                placeholder="Your company name"
              />
            </div>

            {/* Contact Name */}
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                required
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Business Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
                placeholder="email@company.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-2">
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                required
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
                placeholder="Your country"
              />
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                Project Type *
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground focus:outline-none focus:border-accent"
              >
                <option value="">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Interest */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Interest *
              </label>
              <div className="flex flex-wrap gap-2">
                {productCategories.map((category) => (
                  <label
                    key={category}
                    className="cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="productInterest"
                      value={category}
                      className="peer sr-only"
                    />
                    <span className="inline-block px-3 py-1.5 text-sm border border-primary-foreground/20 rounded-full peer-checked:bg-accent peer-checked:text-accent-foreground peer-checked:border-accent transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity Range */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Estimated Quantity *
              </label>
              <select
                id="quantity"
                name="quantity"
                required
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground focus:outline-none focus:border-accent"
              >
                <option value="">Select quantity range</option>
                {quantityRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Project Details *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent resize-none"
                placeholder="Tell us about your project, timeline, specific requirements..."
              />
            </div>

            {/* File Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Upload Project Files (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="projectFile"
                  name="projectFile"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  className="sr-only"
                />
                <label
                  htmlFor="projectFile"
                  className={cn(
                    'flex items-center justify-center gap-3 w-full px-4 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors',
                    fileName
                      ? 'border-accent bg-accent/10'
                      : 'border-primary-foreground/20 hover:border-primary-foreground/40'
                  )}
                >
                  <Upload className="h-5 w-5" />
                  <span className="text-sm">
                    {fileName || 'Drop files here or click to upload (PDF, DOC, images)'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60 text-center sm:text-left">
              By submitting, you agree to our privacy policy and terms of service.
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-8 gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Inquiry
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
