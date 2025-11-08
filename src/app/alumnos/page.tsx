"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalErrorPermisos from "@/components/ui/ModalErrorPermisos";
import ModalErrorFormato from "@/components/ui/ModalErrorFormato";

export default function AlumnosPage() {
  const router = useRouter();
  const [expediente, setExpediente] = useState("");
  const [errorPermisos, setErrorPermisos] = useState(false);
  const [errorFormato, setErrorFormato] = useState(false);

  const handleBuscar = () => {
    const valor = expediente.trim();

    if (valor === "") {
      setErrorPermisos(true);
      return;
    }

    if (!/^\d+$/.test(valor)) {
      setErrorFormato(true);
      return;
    }

    router.push("/alumnos/perfil");
  };

  return (
    <div className="p-10 font-sans text-[#16469B]">
      <h2 className="text-2xl font-bold mb-8">Alumnos</h2>

      {/* 🔹 Barra de búsqueda limpia, sin bordes */}
      <div className="flex items-center gap-[2px] mb-10">
        {/* Botón izquierda */}
        <button
          type="button"
          className="bg-[#16469B] text-white text-sm font-semibold px-4 h-[30px] rounded-xl hover:bg-[#0D1D4B] transition shadow-none outline-none"
        >
          Por Expediente
        </button>

        {/* Input central */}
        <input
          type="text"
          value={expediente}
          onChange={(e) => setExpediente(e.target.value)}
          placeholder=" _ _ _ _ _ _ _ _ _ "
          className="
            bg-[#D1D5DB] text-[#16469B] text-center font-mono text-[15px]
            tracking-[4px] outline-none px-3 w-[220px] h-[30px]
            rounded-xl placeholder:text-[#16469B]/50 shadow-none
          "
          style={{
            border: "none",
          }}
        />

        {/* Botón derecha */}
        <button
          type="button"
          onClick={handleBuscar}
          className="bg-[#16469B] hover:bg-[#0D1D4B] text-white text-sm font-semibold px-5 h-[30px] rounded-xl transition shadow-none outline-none"
        >
          Buscar
        </button>
      </div>

      {/* 🔸 Modales */}
      {errorPermisos && (
        <ModalErrorPermisos onClose={() => setErrorPermisos(false)} />
      )}
      {errorFormato && (
        <ModalErrorFormato onClose={() => setErrorFormato(false)} />
      )}
    </div>
  );
}
