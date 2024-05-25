const { PrismaClient } = require("@prisma/client") 
const prisma = new PrismaClient()
async function main() {
  const barberShop = await prisma.barberShop.create({
    data: {
      name: 'Barbearia Nova',
      open_at: '07:00',
      close_at: '20:00',
      picture: null,
      isOpen: false
    }
  })
  console.log(barberShop)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })