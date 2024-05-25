'use client'
import React, { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';

interface ConfirmActionDialogProps {
  children: ReactNode,
  title?: string;
  message?: string;
  isLoading?: boolean;
  handleConfirmAction: (value?: any) => Promise<any>
}


export const ConfirmActionDialog = ({ 
  children, 
  isLoading,
  title = "Você tem certeza?",
  message = "Essa ação não pode ser desfeita. Você tem certeza de que quer continuar?", 
  handleConfirmAction }: ConfirmActionDialogProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5">
          <DialogClose 
            disabled={isLoading}
            className="border rounded-md px-5 text-muted-foreground"
          >Cancelar</DialogClose>
          <Button disabled={isLoading} onClick={handleConfirmAction} className="bg-red-500 hover:bg-red-700">Sim, continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
