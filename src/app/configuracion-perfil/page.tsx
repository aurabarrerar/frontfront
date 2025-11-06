// src/app/configuracion-perfil/page.tsx

"use client"; // 👈 Necesario para usar useState

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "../../components/ui/SectionTitle";
import FileUploadModal from "../../components/ui/FileUploadModal"; // 👈 Importamos el Modal

// Colores institucionales
const AZUL_MARINO = "#16469B";

export default function PerfilPage() {
  // ✅ Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función que se ejecuta cuando el usuario presiona "Aceptar" en el modal
  const handleAcceptPhoto = (file: File | null) => {
    if (file) {
        console.log("Nueva foto seleccionada:", file.name);
        // NOTA: Aquí iría la lógica real para subir la foto al servidor (fetch/axios)
        alert(`Simulación: La foto ${file.name} ha sido 'aceptada'. Falta la subida real.`);
    }
  };

  return (
    <div className="py-8">
      {/* ℹ️ Contenedor de Información Personal */}
      <div className="flex gap-12 items-start">

        {/* 👤 Círculo de Foto de Perfil */}
        <div className="flex flex-col items-center">
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center mb-2"
            style={{ backgroundColor: AZUL_MARINO }}
          >
            {/* SVG del Ícono de Perfil Grande */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-24 h-24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          {/* ✅ Botón/Enlace que abre el Modal */}
          <button
            onClick={() => setIsModalOpen(true)} // <-- Abre el modal
            className="text-sm text-gray-600 hover:text-blue-600 transition flex items-center gap-1"
          >
            {/* Icono de lápiz (editar) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Cambiar foto de perfil
          </button>
        </div>

        {/* 📋 Detalles de Información Personal */}
        <div>
          <SectionTitle title="Información Personal" />
          <div className="space-y-1 text-gray-700 font-sans pl-2">
            <p className="font-semibold uppercase text-xs" style={{ color: AZUL_MARINO }}>Universidad de Sonora</p>
            <p>Nombre: <span className="font-medium">Ochoa Hernandez José Luis</span></p>
            <p>Clave: <span className="font-medium">316390</span></p>
            <p>Correo institucional: <span className="font-medium">joseluis.ochoa@unison.mx</span></p>
            <p>Puesto: <span className="font-medium">Maestro de tiempo completo</span></p>
            <p>Campus: <span className="font-medium">Hermosillo</span></p>
            <p className="flex items-center gap-1">
              {/* Icono de teléfono */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Teléfono de trabajo: <span className="font-medium text-blue-600 hover:underline">6622399230</span>
            </p>
          </div>
        </div>
      </div>

      <hr className="my-8" />

      {/* 🔒 Seguridad de Cuenta */}
      <div className="mt-12">
        <SectionTitle title="Seguridad de Cuenta" />
        <div className="space-y-2 text-gray-700 font-sans pl-2">
            <p className="text-sm">Última fecha/hora de inicio de sesión: <span className="font-medium">14/09/2025 a las 15:59 hrs.</span></p>
            <Link href="/cambiar-contrasena" className="text-sm text-gray-600 hover:text-blue-600 transition flex items-center gap-1">
                {/* Icono de lápiz (editar) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Cambiar contraseña
            </Link>
        </div>
      </div>

      {/* 🖼️ COMPONENTE MODAL */}
      <FileUploadModal
        isOpen={isModalOpen} // Si es true, el modal se muestra
        onClose={() => setIsModalOpen(false)} // Función para cerrar
        onAccept={handleAcceptPhoto} // Función para manejar el archivo
      />
    </div>
  );
}