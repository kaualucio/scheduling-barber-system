const { PrismaClient } = require("@prisma/client") 
const prisma = new PrismaClient()
async function main() {
  const barberShop = await prisma.barberShop.create({
    data: {
      name: 'Barbearia Nova',
      open_at: '07:00',
      close_at: '20:00',
      picture: 'https://files.edgestore.dev/sbc5p8nrz7wz0e65/publicFiles/_public/82a42e49-9c3e-438e-8ce1-e4e9a4717ce8.jpg',
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