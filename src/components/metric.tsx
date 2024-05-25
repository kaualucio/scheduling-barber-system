import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LucideIcon } from "lucide-react";

interface MetricProps {
  title: string;
  icon: LucideIcon;
  value: number | string;
  description: string;
}

export const Metric = ({ icon: Icon, title, description, value }: MetricProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-7"/>
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-end">
        <p className="text-3xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  )
}
