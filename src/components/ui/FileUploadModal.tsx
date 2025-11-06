"use client";

import { useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // Esta función recibe el archivo seleccionado
  onAccept: (file: File | null) => void;
};

// Colores institucionales
const AZUL_MARINO = "#16469B";
const GRIS_CLARO = "#D8D8D8";

export default function FileUploadModal({ isOpen, onClose, onAccept }: ModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleAccept = () => {
    onAccept(selectedFile); // Pasa el archivo al componente padre
    setSelectedFile(null);
    onClose();
  };

  const handleCancel = () => {
    setSelectedFile(null); // Limpia el archivo seleccionado
    onClose();
  };

  return (
    // ✅ CORRECCIÓN 1: Se eliminó 'backdrop-blur-sm' que podía causar problemas de renderizado
    // Overlay (Fondo oscuro semi-transparente)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

      {/* Contenedor del Modal */}
      <div className="bg-white rounded-lg shadow-2xl w-[600px] overflow-hidden relative z-50">

        {/* 🖼️ Contenido del Modal (Simula el explorador) */}
        <div className="p-8 text-center" style={{ minHeight: '300px' }}>
          <p className="text-xl font-semibold mb-6" style={{ color: AZUL_MARINO }}>
            Cambiar Foto de Perfil
          </p>

          {/* Área de Drag and Drop/Selección */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-12 flex flex-col justify-center items-center h-40 relative z-10">

            {/* Texto de la funcionalidad */}
            <p className="text-gray-500 font-medium z-20">
                (Se abre explorador de archivos para seleccionar e importar foto)
            </p>

            {/* Input de archivo oculto para capturar el archivo */}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                // El z-index del input es mayor para que el clic lo active.
                // Es crucial que NO se extienda fuera de este div.
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-30"
            />
          </div>

          {/* Muestra el nombre del archivo seleccionado */}
          {selectedFile && (
            <p className="mt-3 text-sm text-gray-700">Archivo seleccionado: **{selectedFile.name}**</p>
          )}
        </div>

        {/* 🔽 Botones de Acción (Pie del modal) */}
        {/* ✅ CORRECCIÓN 2: Se añadió z-50 a este div para asegurar que los botones estén por encima de cualquier otro elemento del modal, incluyendo el input. */}
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50 z-50">
          <button
            onClick={handleCancel}
            className={`px-6 py-2 rounded font-medium text-gray-700 hover:bg-gray-200 transition mr-3`}
            style={{ backgroundColor: GRIS_CLARO }}
          >
            Cancelar
          </button>
          <button
            onClick={handleAccept}
            disabled={!selectedFile}
            className={`px-6 py-2 rounded font-medium text-white transition disabled:opacity-50`}
            style={{ backgroundColor: AZUL_MARINO }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}