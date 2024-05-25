import { ReactNode } from "react";


interface TitleProps {
  title: string;
  children?: ReactNode
}

export const Title = ({title, children}: TitleProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-3xl font-semibold text-primary antialiased">{title}</h2>
      {
        children
      }
    </div>
  )
}
