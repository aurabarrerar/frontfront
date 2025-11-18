"use client"; // 👈 MANTENER: NECESARIO para usar useState y el componente Link

import { useState } from "react";
import { usePathname } from "next/navigation"; // 👈 🎯 PASO CLAVE 1: Importar usePathname
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import NavBar from "../components/NavBar";

// ... (definiciones de fuentes y paleta de colores)

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });

const AZUL_MARINO = "#16469B";
const DORADO = "#E6B10F";
const FONDO = "#EDE9FF";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🎯 PASO CLAVE 2: Obtener la ruta actual
  const pathname = usePathname();

  // 🎯 PASO CLAVE 3: Definir la condición de exclusión
  const isLoginPage = pathname === '/login'; // Asumiendo que la ruta es /login

  // Si tienes otras rutas que no deben tener NavBar (ej. /registro), puedes usar:
  // const ROUTES_WITHOUT_NAVBAR = ['/login', '/registro'];
  // const isLoginPage = ROUTES_WITHOUT_NAVBAR.includes(pathname);


  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Fondo general */}
        <div
          className="min-h-screen flex justify-center py-10"
          style={{ backgroundColor: FONDO }}
        >
          {/* Contenedor principal */}
          <div className="bg-white max-w-[1200px] w-full mx-auto rounded-xl shadow-lg overflow-hidden">
            {/* 🔵 Franja azul superior */}
            <div
              style={{ backgroundColor: AZUL_MARINO }}
              className="h-[8px] w-full"
            />

            {/* 🎯 PASO CLAVE 4: Renderizado Condicional del Header y NavBar */}
            {/* Si NO es la página de login, muestra el header y el NavBar */}
            {!isLoginPage && (
              <>
                {/* Header */}
                <header className="bg-white shadow-sm">
                  <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
                    {/* Logo + textos */}
                    <div className="flex items-center gap-6">
                      <div className="w-[100px] h-[100px] relative">
                        <Image
                          src="/logounison.png"
                          alt="Logo Universidad de Sonora"
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>

                      <div className="leading-snug">
                        <h1
                          className="uppercase tracking-wide font-semibold"
                          style={{
                            color: AZUL_MARINO,
                            fontSize: "30px",
                            lineHeight: "34px",
                          }}
                        >
                          UNIVERSIDAD DE SONORA
                        </h1>
                        <p
                          className="font-serif italic text-[15px]"
                          style={{ color: AZUL_MARINO }}
                        >
                          El Saber de mis Hijos hará mi Grandeza
                        </p>
                      </div>
                    </div>

                    {/* Íconos (notificaciones / perfil) */}
                    <div className="flex items-center gap-8">
                      {/* Campana */}
                      <button className="p-2 rounded-full hover:bg-gray-100 transition">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={AZUL_MARINO}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-bell"
                        >
                          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                        </svg>
                      </button>

                      {/* 👤 CONTENEDOR DEL BOTÓN DE PERFIL Y MENÚ DESPLEGABLE */}
                      <div className="relative">
                        {/* Botón de Perfil - Ahora con la acción onClick */}
                        <button
                          onClick={() => setIsMenuOpen(!isMenuOpen)} // 👈 Toggler
                          className={`p-2 rounded-full transition ${isMenuOpen ? "bg-gray-100" : "hover:bg-gray-100"}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={AZUL_MARINO}
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </button>

                        {/* 📦 Menú Desplegable */}
                        {isMenuOpen && (
                          <div
                            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl z-50 p-4 border border-gray-300"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
                          >
                            {/* 1. Botón "Cerrar Sesión" */}
                            <Link
                              href="/logout" // Ruta de cierre de sesión
                              className="text-red-600 font-medium hover:underline float-right"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Cerrar Sesión
                            </Link>

                            {/* 2. Info del Usuario */}
                            <div className="flex items-start mb-3 pt-1">
                              {/* Ícono de perfil pequeño (simulado) */}
                              <div className="w-10 h-10 bg-[#E6B10F] rounded-full flex items-center justify-center mr-2 mt-1">
                                {/* Opcional: SVG blanco pequeño */}
                              </div>
                              <div>
                                <p className="text-gray-800 font-semibold">
                                  Prof. Ochoa Hernandez José Luis
                                </p>
                                <p className="text-xs text-gray-500">
                                  jose.luis.ochoa@unison.mx
                                </p>
                                <p className="text-xs text-gray-500">
                                  Grupo (clave)
                                </p>
                              </div>
                            </div>
                            <hr className="my-2" />

                            {/* 3. Opciones de Configuración */}
                            <p className="text-gray-700 p-2 text-sm font-light">
                              Maestro de tiempo completo Campus Hermosillo
                            </p>

                            <Link
                              href="/configuracion-perfil" // Ruta de configuración de perfil
                              className="block text-gray-700 p-2 rounded hover:bg-gray-100 transition"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Configuración de perfil
                            </Link>
                          </div>
                        )}
                      </div>
                      {/* FIN DEL CONTENEDOR DEL BOTÓN DE PERFIL */}
                    </div>
                  </div>
                </header>

                {/* Barra amarilla → se importa el NavBar Client */}
                <NavBar
                  className={`${roboto.className} text-white h-16 flex items-center shadow-sm font-medium text-[17px]`}
                  azul={AZUL_MARINO}
                  dorado={DORADO}
                />
              </>
            )}

            {/* Contenido dinámico (children) */}
            <main className="px-10 py-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}