"use client";

import { useState } from "react";
import SectionTitle from "../../components/ui/SectionTitle";
import Checkbox from "../../components/ui/Checkbox";
import CardMateria from "../../components/ui/CardMateria";
import dynamic from "next/dynamic";

// ✅ Import dinámico del calendario sin errores de tipado
const DatePicker = dynamic(
  () =>
    import("react-datepicker") as unknown as Promise<{
      default: React.ComponentType<any>;
    }>,
  { ssr: false }
);

import "react-datepicker/dist/react-datepicker.css";

export default function InicioPage() {
  const [avisos, setAvisos] = useState([
    { id: 1, texto: "Alerta por faltas", checked: true },
    { id: 2, texto: "Alerta por faltas", checked: true },
    { id: 3, texto: "Fecha límite para subir calificaciones", checked: true },
  ]);

  const [fecha, setFecha] = useState<Date | null>(new Date());

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 relative py-8">
      {/* 🔵 Franja azul extendida que pasa detrás del calendario */}
      <div className="absolute top-[4.4rem] left-0 right-0 h-[2px] bg-[#16469B]" />

      {/* Contenido principal */}
      <div className="flex-1">
        {/* Título principal */}
        <h2
          className="text-2xl font-sans text-[#16469B] mb-10 font-semibold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Bienvenido Prof. Ochoa Hernandez José Luis
        </h2>

        {/* Sección de avisos */}
        <SectionTitle title="Nuevos Avisos Importantes" />

        <div className="bg-[#D8D8D8] p-5 rounded-md mb-10 max-h-48 overflow-y-auto">
          {avisos.map((aviso) => (
            <Checkbox
              key={aviso.id}
              label={aviso.texto}
              checked={aviso.checked}
              onChange={() =>
                setAvisos((prev) =>
                  prev.map((a) =>
                    a.id === aviso.id ? { ...a, checked: !a.checked } : a
                  )
                )
              }
            />
          ))}
        </div>

        {/* 🔵 Franja azul horizontal antes de Materias */}
        <div className="h-[2px] bg-[#16469B] w-full my-8" />

        {/* Materias actuales */}
        <SectionTitle title="Materias Actuales" />

        <p
          className="text-sm text-[#16469B] mb-4 font-sans"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Semestre 2025-2
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <CardMateria
              key={i}
              grupo={i}
              materia="Materia"
              clave="1234"
              horario="00:00 a.m - 00:00 a.m"
            />
          ))}
        </div>

        <p
          className="text-sm text-[#16469B] mt-6 font-sans"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Seleccione un grupo para ver lista de alumnos
        </p>
      </div>

      {/* 📅 Calendario — bajado visualmente para no colisionar con la franja */}
      <div className="w-[280px] mt-14">
        <DatePicker
          selected={fecha}
          onChange={(date: Date | null) => setFecha(date)}
          inline
          className="rounded-md border border-gray-300 shadow-sm"
        />
      </div>
    </div>
  );
}
