import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ohmywishes — подари то, что хотят",
  description: "Приложение для вишлистов и подарков без дублей",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
