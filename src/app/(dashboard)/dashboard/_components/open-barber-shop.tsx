'use client'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface OpenBarberShopProps {
  isOpen?: boolean
}

export const OpenBarberShop = ({ isOpen }: OpenBarberShopProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const handleOpenBarberShop = async () => {
    try {
      setIsLoading(true)
      if(isOpen) {
        await api.patch('/api/barber-shop/close')
      } else {
        await api.patch('/api/barber-shop/open')
      }
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Algo deu errado ao abrir a barbearia, tente novamente.",
        duration: 4000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="flex items-center space-x-2">
        <Label htmlFor="open_barber_shop" className="font-semibold">Abrir Barbearia</Label>
        <Switch 
          id="open_barber_shop" 
          checked={isOpen! as any}
          disabled={isLoading}
          onCheckedChange={handleOpenBarberShop}
          className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-red-500"
        />
      </div>
  )
}
