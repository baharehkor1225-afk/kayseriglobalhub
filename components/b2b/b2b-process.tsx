import { FileText, MessageSquare, Palette, Package, Truck, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Submit Inquiry',
    description: 'Fill out our B2B inquiry form with your project details and requirements.',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Consultation',
    description: 'Our team reviews your needs and schedules a consultation to discuss your project.',
  },
  {
    number: '03',
    icon: Palette,
    title: 'Design & Quote',
    description: 'Receive a detailed proposal with product selections, customizations, and pricing.',
  },
  {
    number: '04',
    icon: Package,
    title: 'Production',
    description: 'Once approved, your order enters our priority production queue.',
  },
  {
    number: '05',
    icon: Truck,
    title: 'Delivery & Installation',
    description: 'We handle global logistics and can provide white-glove installation services.',
  },
  {
    number: '06',
    icon: CheckCircle,
    title: 'Ongoing Support',
    description: 'Continued partnership with warranty support and future project assistance.',
  },
]

export function B2BProcess() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-accent">
            How It Works
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground">
            Simple Partnership Process
          </h2>
          <p className="mt-4 text-muted-foreground">
            From initial inquiry to final delivery, we make the B2B process 
            seamless and transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-border -translate-x-1/2 z-0" />
              )}
              
              <div className="relative bg-secondary p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center font-medium">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center mb-3">
                      <step.icon className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-medium text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
