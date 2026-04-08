import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Building2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-medium">Get in Touch</h2>
        <p className="mt-2 text-muted-foreground">
          Choose the most convenient way to reach us. Our team is ready to assist 
          with any questions.
        </p>
      </div>

      <div className="space-y-6">
        {contactMethods.map((method) => (
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
            <h3 className="font-medium">B2B Partnership?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              For bulk orders and commercial projects, visit our dedicated B2B page.
            </p>
            <Link href="/b2b" className="inline-block mt-3">
              <Button variant="outline" size="sm">
                B2B Inquiries
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
            <h3 className="font-medium">Live Chat</h3>
            <p className="text-sm text-primary-foreground/80 mt-1">
              Get instant answers from our support team.
            </p>
            <Button
              size="sm"
              className="mt-3 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Start Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
