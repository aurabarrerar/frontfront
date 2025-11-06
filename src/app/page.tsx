"use client";

import { useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Checkbox from "../components/ui/Checkbox";
import CardMateria from "../components/ui/CardMateria";

export default function Home() {
  const [avisos, setAvisos] = useState([
    { id: 1, label: "Alerta por faltas", checked: true },
    { id: 2, label: "Alerta por faltas", checked: true },
    { id: 3, label: "Fecha límite para subir calificaciones", checked: true },
  ]);

  const handleToggle = (id: number) => {
    setAvisos((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, checked: !a.checked } : a
      )
    );
  };

  return (
    <div className="px-8 py-10">
      {/* Bienvenida */}
      <h2 className="text-2xl font-serif font-semibold mb-6 text-azul-unison">
        Bienvenido Prof. Ochoa Hernandez José Luis
      </h2>

      {/* Nuevos Avisos Importantes */}
      <SectionTitle title="Nuevos Avisos Importantes" />
      <div className="bg-[#E5E5E5] p-4 rounded-md shadow-sm mb-10">
        <div className="flex flex-col gap-2">
          {avisos.map((a) => (
            <Checkbox
              key={a.id}
              label={a.label}
              checked={a.checked}
              onChange={() => handleToggle(a.id)}
            />
          ))}
        </div>
      </div>

      {/* Materias Actuales */}
      <SectionTitle title="Materias Actuales" />
      <p className="text-sm font-serif text-azul-unison mb-4">
        Semestre 2025-2
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <CardMateria
            key={i}
            clave="1234"
            grupo={i}
            materia="Materia"
            horario="00:00 a.m - 00:00 a.m"
          />
        ))}
      </div>

      <p className="text-sm mt-6 font-serif text-azul-unison">
        Seleccione un grupo para ver lista de alumnos
      </p>
    </div>
  );
}
