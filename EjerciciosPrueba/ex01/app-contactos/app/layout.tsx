import "./globals.css";
import { Inter } from "next/font/google";
import { ContactosProvider } from "../lib/ContactosContext"; // ✅ ESTA LÍNEA

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mis Contactos",
  description: "Gestión de contactos en Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ContactosProvider>
          {children}
        </ContactosProvider>
      </body>
    </html>
  );
}
