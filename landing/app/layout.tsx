import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DIV LABS — Digital products, designed to move business forward.",
  description:
    "DIV LABS diseña y desarrolla websites, aplicaciones, productos digitales y experiencias UX/UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}