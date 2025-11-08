"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function PerfilAlumnoPage() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { href: "/alumnos/perfil", label: "Perfil" },
    { href: "/alumnos/desempeno", label: "Desempeño" }, // ✅ corregido
    { href: "/alumnos/materias", label: "Materias" },
  ];

  return (
    <div className="p-10 font-sans text-[#16469B]">
      <h2 className="text-2xl font-bold mb-3">Alumnos</h2>

      <button
        onClick={() => router.push("/alumnos")}
        className="bg-[#BFBFBF] text-[#16469B] font-semibold px-6 py-1 rounded-md mb-4 hover:opacity-90"
      >
        Atrás
      </button>

      <p className="text-[#16469B] mb-4 font-medium">Alumno encontrado:</p>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-400 mb-10">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`pb-2 text-[18px] font-semibold transition ${
                active
                  ? "text-[#E6B10F] border-b-2 border-[#E6B10F]"
                  : "text-[#16469B] hover:text-[#E6B10F]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Contenido */}
      <div className="flex gap-10 items-center mt-6">
        <div className="w-[150px] h-[150px] bg-[#EDE9FF] rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#3D2E8C"
            className="w-16 h-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a8.25 8.25 0 0115 0"
            />
          </svg>
        </div>

        <div className="text-[#171717] text-[15px] leading-7">
          <p>
            <strong>Nombre:</strong> Apellido Apellido Nombre Nombre
          </p>
          <p>
            <strong>Expediente:</strong> 219214569
          </p>
          <p>
            <strong>Carrera:</strong> Ingeniería en Sistemas de Información
          </p>
          <p>
            <strong>Progreso:</strong> 45%
          </p>
          <p>
            <strong>Promedio de Kardex:</strong> 90
          </p>
        </div>
      </div>
    </div>
  );
}
