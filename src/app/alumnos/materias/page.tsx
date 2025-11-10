"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

/** Tipos fuertes */
interface Materia {
  nombre: string;
  estado: string;
  creditos: number;
  periodo: string;
}

/** Record<string, Materia[]> evita el error al indexar con un string */
const materiasData: Record<string, Materia[]> = {
  "Todos los semestres": [
    { nombre: "ÁLGEBRA 6880", estado: "Aprobada", creditos: 4, periodo: "2022-2" },
    { nombre: "CÁLCULO DIFERENCIAL E INTEGRAL I 6881", estado: "Aprobada", creditos: 5, periodo: "2022-2" },
    { nombre: "PROGRAMACIÓN WEB 6110", estado: "En curso", creditos: 6, periodo: "2024-1" },
  ],
  "Primer semestre": [
    { nombre: "ÁLGEBRA 6880", estado: "Aprobada", creditos: 4, periodo: "2022-2" },
  ],
  "Segundo semestre": [
    { nombre: "CÁLCULO DIFERENCIAL E INTEGRAL I 6881", estado: "Aprobada", creditos: 5, periodo: "2023-1" },
  ],
  "Tercer semestre": [
    { nombre: "PROGRAMACIÓN WEB 6110", estado: "En curso", creditos: 6, periodo: "2024-1" },
  ],
};

export default function MateriasAlumnoPage() {
  const pathname = usePathname();
  const router = useRouter();

  const opciones = Object.keys(materiasData);
  const [semestre, setSemestre] = useState<string>(opciones[0]); // siempre inicia con una opción válida

  const tabs = [
    { href: "/alumnos/perfil", label: "Perfil" },
    { href: "/alumnos/desempeno", label: "Desempeño" }, // sin acento en la ruta
    { href: "/alumnos/materias", label: "Materias" },
  ];

  /** Siempre array (evita undefined en runtime) */
  const materias: Materia[] = materiasData[semestre] ?? [];

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
      <div className="flex gap-8 border-b border-gray-400 mb-6">
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

      {/* Selector de semestre */}
      <div className="flex justify-end mb-6">
        <select
          value={semestre}
          onChange={(e) => setSemestre(e.target.value)}
          className="rounded-md px-3 py-1 text-[#16469B] bg-gray-200 text-sm outline-none"
        >
          {opciones.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de materias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {materias.map((m, i) => (
          <div
            key={`${m.nombre}-${i}`}
            className="bg-[#F3F3F3] p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-[#16469B] mb-1">{m.nombre}</h3>
            <p className="text-sm text-[#171717]">
              Estado: {m.estado} <br />
              Créditos: {m.creditos} <br />
              Período: {m.periodo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
