const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const productCount = await prisma.product.count()
  const userCount = await prisma.user.count()
  const orderCount = await prisma.order.count()
  const contactMessageCount = await prisma.contactMessage.count()
  const inquiryCount = await prisma.inquiry.count()

  console.log(`products_count=${productCount}`)
  console.log(`users_count=${userCount}`)
  console.log(`orders_count=${orderCount}`)
  console.log(`contact_messages_count=${contactMessageCount}`)
  console.log(`inquiries_count=${inquiryCount}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
