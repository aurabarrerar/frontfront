"use client";

import React, { useState, useCallback, useMemo } from 'react';
// Íconos de Lucide React para mayor estética y claridad
import { UploadCloud, XCircle, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

// --- CONFIGURACIÓN DE COLORES ---
const AZUL_UNISON = "#16469B";
const DORADO_UNISON = "#FFD100";

// --- TIPOS DE ESTADO ---
type ModalType = 'none' | 'preview' | 'success' | 'error_file' | 'error_format';

// --- COMPONENTE PRINCIPAL ---
// Cambiado de 'SubirCalificacionesPage' a 'default export' para ser una página
export default function SubirCalificacionesPage() {
  const [modal, setModal] = useState<ModalType>('none');
  const [fileName, setFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Datos simulados para la vista previa
  const mockTableData = useMemo(() => [
    { expediente: '12345', nombre: 'ejemplo', clave: 'x', materia: 'y', calificacion: 'A' },
    { expediente: '12346', nombre: 'ejemplo', clave: 'x', materia: 'z', calificacion: 'A' },
    { expediente: '12347', nombre: 'ejemplo', clave: 'v', materia: 'v', calificacion: 'A' },
    { expediente: '12348', nombre: 'ejemplo', clave: 'w', materia: 'w', calificacion: 'A' },
  ], []);

  // Simulación de carga de archivo
  const simulateFileUpload = useCallback((file: File) => {
    setFileName(file.name);
    // Simular diferentes resultados basados en el nombre del archivo o un número aleatorio
    const randomResult = Math.random();

    // El 47.5% de las veces saldrá exitoso, el resto será un error simulado.
    if (file.name.includes('error_clave') || randomResult < 0.2) {
      setModal('error_file'); // Simula "Error Archivo No Válido: No se encontró la columna..."
    } else if (file.name.includes('error_formato') || randomResult < 0.4) {
      setModal('error_format'); // Simula "Error Formato No Válido: Filas vacías o valores inválidos"
    } else {
      setModal('preview'); // Éxito: Mostrar vista previa
    }
  }, []);

  // Manejadores de Drag and Drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateFileUpload(files[0]);
    }
  };

  // --- COMPONENTES MODALES ---

  // Modal genérico reutilizable
  const Modal = ({ type, title, message, children, onConfirm }: {
    type: 'success' | 'error' | 'alert',
    title: string,
    message: string,
    children?: React.ReactNode,
    onConfirm: () => void
  }) => {
    let icon, color;
    switch (type) {
      case 'success':
        icon = <CheckCircle className="w-10 h-10" />;
        color = 'text-green-600';
        break;
      case 'error':
        icon = <XCircle className="w-10 h-10" />;
        color = 'text-red-600';
        break;
      case 'alert':
        icon = <AlertTriangle className="w-10 h-10" />;
        color = 'text-yellow-600';
        break;
    }

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
          {/* Header del Modal */}
          <div className="p-4 flex justify-between items-center border-b">
            <h3 className={`text-xl font-semibold flex items-center gap-2 ${color}`}>
              {icon}
              {title}
            </h3>
            <button
              onClick={() => setModal('none')}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Cerrar"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Contenido del Modal */}
          <div className="p-6">
            <p className="text-gray-700 mb-4">{message}</p>
            {children}
          </div>

          {/* Footer del Modal */}
          <div className="p-4 flex justify-end border-t">
            {title.includes('Vista previa') ? (
               <>
                <button
                  onClick={() => setModal('none')}
                  className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={onConfirm}
                  className="px-6 py-2 text-white font-semibold rounded-lg transition"
                  style={{ backgroundColor: DORADO_UNISON }}
                >
                  Confirmar
                </button>
               </>
            ) : (
              <button
                onClick={onConfirm}
                className="px-6 py-2 text-white font-semibold rounded-lg transition"
                style={{ backgroundColor: AZUL_UNISON }}
              >
                Aceptar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };


  // Función para renderizar el Modal
  const renderModal = () => {
    switch (modal) {
      case 'preview':
        return (
          <Modal
            type="alert"
            title="El archivo válido: Vista previa"
            message={`Archivo: ${fileName}. El archivo válido se ha cargado correctamente, ¿Desea continuar?`}
            onConfirm={() => setModal('success')}
          >
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 h-64 max-h-64 overflow-y-auto">
              {/* Simulación de tabla de vista previa */}
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left text-gray-500 font-bold uppercase tracking-wider">expediente</th>
                    <th className="px-3 py-2 text-left text-gray-500 font-bold uppercase tracking-wider">nombre</th>
                    <th className="px-3 py-2 text-left text-gray-500 font-bold uppercase tracking-wider">clave</th>
                    <th className="px-3 py-2 text-left text-gray-500 font-bold uppercase tracking-wider">materia</th>
                    <th className="px-3 py-2 text-left text-gray-500 font-bold uppercase tracking-wider">calificacion final</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockTableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 whitespace-nowrap">{row.expediente}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.nombre}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.clave}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.materia}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{row.calificacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal>
        );
      case 'success':
        return (
          <Modal
            type="success"
            title="Carga exitosa"
            message="Se cargaron 120 calificaciones del grupo 302 correctamente"
            onConfirm={() => setModal('none')}
          />
        );
      case 'error_file':
        return (
          <Modal
            type="error"
            title="Error Archivo No Válido"
            message="No se encontró en el archivo la columna requerida de la clave del grupo o id_grupo"
            onConfirm={() => setModal('none')}
          />
        );
      case 'error_format':
        return (
          <Modal
            type="error"
            title="Error Formato No Válido"
            message="El archivo contiene filas vacías o valores inválidos."
            onConfirm={() => setModal('none')}
          />
        );
      case 'none':
      default:
        return null;
    }
  };


  // --- ESTRUCTURA DE LA PÁGINA ---
  return (
    <div className="min-h-screen bg-gray-100/50 p-8 pt-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">

        {/* Título y Descripción */}
        <h1 className="text-2xl font-semibold mb-4" style={{ color: AZUL_UNISON }}>
          Subir Calificaciones por Grupo
        </h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          Seleccione el archivo Excel con las calificaciones. El archivo debe contener la columna con <strong style={{ color: AZUL_UNISON }}>la clave del grupo</strong> para asignar automáticamente las calificaciones como se muestra en el formato.
        </p>
        <div className="flex items-center text-sm font-medium mb-8">
            <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
            <a href="#" className="underline hover:text-yellow-700" style={{ color: DORADO_UNISON }}>
                Descargue el formato aquí
            </a>
        </div>

        {/* Zona de Carga de Archivos */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-4 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer max-w-md mx-auto ${
            isDragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-500'
          }`}
          style={{ borderColor: isDragOver ? AZUL_UNISON : AZUL_UNISON, borderStyle: 'dashed' }}
          onClick={() => document.getElementById('file-upload-input')?.click()}
        >
          <UploadCloud className="w-16 h-16 mx-auto mb-4" style={{ color: AZUL_UNISON }} />
          <p className="text-lg font-medium text-gray-700">
            Arrastra tu archivo aquí
            <br />
            o haz click para seleccionarlo
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Formatos permitidos: XLSX, XLS (máx. 5MB)
          </p>

          <input
            type="file"
            id="file-upload-input"
            className="hidden"
            accept=".xlsx, .xls"
            onChange={handleFileSelect}
          />

          <button
            type="button"
            className="mt-6 px-8 py-3 font-semibold rounded-lg shadow-md transition-colors hover:shadow-lg"
            style={{ backgroundColor: DORADO_UNISON, color: AZUL_UNISON }}
            onClick={(e) => {
              // Evita que se active el input de nuevo al hacer clic en el botón
              e.stopPropagation();
              document.getElementById('file-upload-input')?.click();
            }}
          >
            Cargar
          </button>
        </div>

        {/* Botón Cancelar (como se ve en la imagen) */}
        <div className="flex justify-center mt-8">
            <button
              className="px-8 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition shadow-sm"
              onClick={() => { setModal('none'); setFileName(''); }}
            >
              Cancelar
            </button>
        </div>

        {/* Renderizado del Modal */}
        {renderModal()}
      </div>
    </div>
  );
}