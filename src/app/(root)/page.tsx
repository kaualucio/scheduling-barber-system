import { ScheduleButton } from "@/components/schedule-button";
import Facebook from "@/components/icons/facebook";
import InstagramGradient from "@/components/icons/instagram-gradient";
import Whatsapp from "@/components/icons/whatsapp";
import { api } from "@/lib/api";
import { Barber } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  
  const [{ data: barberShopData }, { data: barbersData }, { data: servicesData }, ] = await Promise.all([
    api.get('/api/barber-shop/get-info'),
    api.get('/api/root/barber/get-barbers'),
    api.get('/api/services/get')
  ])

  return (
   <div className="w-full h-screen bg-slate-100 flex items-start justify-center px-5 py-10">
      <div className="w-full max-w-lg min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center gap-5">
        <div className="text-center flex flex-col gap-2">
          <div className="w-36 h-36 mx-auto rounded-full border border-slate-600 relative">
            <Image
              src={barberShopData.picture}
              alt="Logo da barbearia"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-xl font-semibold">{barberShopData.name}</p>
          <div className="flex flex-col items-center gap-2 text-xs font-medium">
            <div className="flex items-center gap-1">
              <p>Seg à Sex: {barberShopData.open_at} às {barberShopData.close_at}</p> | <p>Sáb: 08h às 14h</p>
            </div>
            <div className="flex items-center gap-1">
              {
                barberShopData.isOpen ? (
                  <>
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    Aberto
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    Fechado
                  </>
                )
              }
            </div>
          </div>
          <div>
          </div>
        </div>
        <nav className="flex flex-col gap-8  w-full">
          <div className="w-full flex flex-col gap-1">
            <ScheduleButton 
              barbers={barbersData}
              services={servicesData}
            /> 
          </div>

          <div className="flex flex-col gap-1">
            <Link href="" className="w-full font-medium rounded-md h-16 px-5 border-2 bg-white flex items-center justify-center border-slate-300 gap-3 hover:scale-105 hover:bg-secondary/80 duration-300 transition-transform">
              <InstagramGradient className="size-5" />
              Siga nosso Instagram
            </Link>
            <Link href="" className="w-full font-medium rounded-md h-16 px-5 border-2 bg-white flex items-center justify-center border-slate-300 gap-3 hover:scale-105 hover:bg-secondary/80 duration-300 transition-transform">
              <Facebook fill="#1877F2" className="size-5" />
              Siga nossa página no Facebook
            </Link>
            <Link href="" className="w-full font-medium rounded-md h-16 px-5 border-2 bg-white flex items-center justify-center border-slate-300 gap-3 hover:scale-105 hover:bg-secondary/80 duration-300 transition-transform">
              <Whatsapp fill="#00A884" className="size-5" />
              Whatsapp - (00) 9 9999-9999
            </Link>
          </div>
        </nav>
      </div>
   </div>
  );
}
