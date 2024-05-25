import { hash } from "bcryptjs"

const { PrismaClient } = require("@prisma/client") 
const prisma = new PrismaClient()
async function main() {
  const barberShop = await prisma.barberShop.create({
    data: {
      name: 'Barbearia Nova',
      imutable_id: '1',
      open_at: '07:00',
      close_at: '20:00',
      picture: 'https://files.edgestore.dev/sbc5p8nrz7wz0e65/publicFiles/_public/82a42e49-9c3e-438e-8ce1-e4e9a4717ce8.jpg',
      isOpen: false
    }
  })

  const barbers = await prisma.barber.createMany({
    data: [
      {
        name: 'Babeiro 1',
        email: 'babeiro1@gmail.com',
        password: await hash('12345678', 10),
        phone: '11912345678',
        picture: 'https://files.edgestore.dev/sbc5p8nrz7wz0e65/publicFiles/_public/82a42e49-9c3e-438e-8ce1-e4e9a4717ce8.jpg',
      },
      {
        name: 'Babeiro 2',
        email: 'babeiro2@gmail.com',
        password: await hash('12345678', 10),
        phone: '21987654321',
        picture: 'https://files.edgestore.dev/sbc5p8nrz7wz0e65/publicFiles/_public/82a42e49-9c3e-438e-8ce1-e4e9a4717ce8.jpg',
      },
      {
        name: 'Babeiro 3',
        email: 'babeiro3@gmail.com',
        password: await hash('12345678', 10),
        phone: '31923456789',
        picture: 'https://files.edgestore.dev/sbc5p8nrz7wz0e65/publicFiles/_public/82a42e49-9c3e-438e-8ce1-e4e9a4717ce8.jpg',
      }
    ]
  })

  const services = await prisma.service.createMany({
    data: [
      {
        name: 'Corte Navalhado',
        price: 35
      },
      {
        name: 'Corte Social',
        price: 25
      },
      {
        name: 'Barba',
        price: 15
      },
      {
        name: 'Sobrancelha',
        price: 10
      }
    ]
  })
  console.log(barberShop, barbers, services)
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