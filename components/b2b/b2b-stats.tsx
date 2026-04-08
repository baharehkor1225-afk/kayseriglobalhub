const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '50+', label: 'Countries Served' },
  { value: '30%', label: 'Volume Discount' },
  { value: '38', label: 'Years Experience' },
]

export function B2BStats() {
  return (
    <section className="bg-secondary border-y border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
