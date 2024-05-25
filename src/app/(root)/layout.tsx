import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Nome da barbearia - Dashboard",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}