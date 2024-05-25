'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react";

interface FormDialogProps {
  children: ReactNode,
  triggerLabel: string;
  title: string;
  message?: string;
  isLoading?: boolean;
}

export const FormDialog = ({ 
  children, 
  isLoading,
  title,
  message,
  triggerLabel,
 }: FormDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>
          {triggerLabel}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {message}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
