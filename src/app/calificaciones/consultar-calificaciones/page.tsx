"use client";

import React, { useState, useCallback } from 'react';
// Íconos para la estética y la interfaz de usuario
import { User, Users, Calendar, XCircle, CheckCircle, AlertTriangle } from 'lucide-react';

// --- CONFIGURACIÓN DE COLORES ---
const AZUL_UNISON = "#16469B";
const DORADO_UNISON = "#FFD100";
const FONDO_CLARO = "#F5F0FF"; // Color de fondo general
const ROJO_ERROR = "#DC2626";

// --- TIPOS DE ESTADO ---
type FiltroSeleccionado = 'Expediente' | 'Grupo' | 'Semestre' | null;

// --- COMPONENTE DE PÁGINA: CONSULTAR CALIFICACIONES ---
export default function ConsultarCalificacionesPage() {
  const [filtro, setFiltro] = useState<FiltroSeleccionado>(null);
  const [expediente, setExpediente] = useState('');
  const [modalVisible, setModalVisible] = useState<'success' | 'error' | null>(null);

  // Manejador para establecer el filtro
  const handleFiltroClick = (f: FiltroSeleccionado) => {
    setFiltro(f);
    setExpediente(''); // Limpiar el campo al cambiar de filtro
  };

  // Función de consulta simulada para el Expediente
  const handleConsultarExpediente = () => {
    // 1. Simulación de Validación: Sólo dígitos válidos
    const isNumeric = /^\d+$/.test(expediente);

    if (!isNumeric || expediente.length === 0) {
      setModalVisible('error'); // Mostrar modal de error si la validación falla
    } else {
      setModalVisible('success'); // Mostrar modal de éxito si pasa la validación
    }
  };

  // Función de consulta simulada para otros filtros (simplificado)
  const handleConsultarGenerico = () => {
    setModalVisible('success');
  }

  // Función para renderizar el formulario específico del filtro
  const renderFiltroFormulario = useCallback(() => {
    const commonClasses = "p-4 border rounded-xl shadow-lg mt-8 bg-white";
    const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 transition focus:ring-blue-500";
    const buttonStyle = { backgroundColor: AZUL_UNISON };

    switch (filtro) {
      case 'Expediente':
        return (
          <div className={commonClasses}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: AZUL_UNISON }}>Buscar por Expediente</h3>
            <div className="mb-4">
              <label htmlFor="expediente" className="block text-sm font-medium text-gray-700 mb-2">
                Número de Expediente del alumno
              </label>
              <input
                type="text"
                id="expediente"
                placeholder="Ej: 202000123"
                className={inputClasses}
                value={expediente}
                onChange={(e) => setExpediente(e.target.value)}
              />
            </div>
            <button
              className="w-full py-3 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-md"
              style={buttonStyle}
              onClick={handleConsultarExpediente}
            >
              Consultar
            </button>
          </div>
        );
      case 'Grupo':
        return (
          <div className={commonClasses}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: AZUL_UNISON }}>Buscar por Grupo</h3>
            <div className="mb-4">
              <label htmlFor="grupo" className="block text-sm font-medium text-gray-700 mb-2">
                Clave o Nombre del Grupo
              </label>
              <select
                id="grupo"
                className={inputClasses}
              >
                <option value="">Selecciona un grupo actual</option>
                <option value="A01">Grupo A01 - Matemáticas I</option>
                <option value="B02">Grupo B02 - Física II</option>
                <option value="C03">Grupo C03 - Química General</option>
              </select>
            </div>
            <button
              className="w-full py-3 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-md"
              style={buttonStyle}
              onClick={handleConsultarGenerico}
            >
              Consultar
            </button>
          </div>
        );
      case 'Semestre':
        return (
          <div className={commonClasses}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: AZUL_UNISON }}>Buscar por Semestre Anterior</h3>
            <div className="mb-4">
              <label htmlFor="semestre" className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona el Semestre y Año
              </label>
              <select
                id="semestre"
                className={inputClasses}
              >
                <option value="">Selecciona un semestre anterior</option>
                <option value="2024-2">Semestre 2024-2</option>
                <option value="2024-1">Semestre 2024-1</option>
                <option value="2023-2">Semestre 2023-2</option>
              </select>
            </div>
            <button
              className="w-full py-3 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-md"
              style={buttonStyle}
              onClick={handleConsultarGenerico}
            >
              Consultar
            </button>
          </div>
        );
      default:
        return null;
    }
  }, [filtro, expediente, handleConsultarExpediente, handleConsultarGenerico]);

  // --- COMPONENTE DE MODAL (General) ---
  const Modal = ({ type, title, message, onClose }: { type: 'success' | 'error', title: string, message: string, onClose: () => void }) => {
    const isError = type === 'error';
    const headerColor = isError ? ROJO_ERROR : 'text-green-600';
    const icon = isError ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />;
    const buttonText = isError ? 'Aceptar' : 'Continuar';

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">

          {/* Header del Modal */}
          <div className="p-4 flex justify-between items-center border-b" style={{ borderColor: isError ? ROJO_ERROR : 'lightgray' }}>
            <h3 className={`text-xl font-semibold flex items-center gap-2 ${headerColor}`}>
              {icon}
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Cerrar"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Contenido del Modal */}
          <div className="p-6">
            <p className="text-gray-700 text-center">
              {message}
            </p>
          </div>

          {/* Footer del Modal */}
          <div className="p-4 flex justify-end border-t">
            <button
              onClick={onClose}
              className={`px-6 py-2 text-white font-semibold rounded-lg transition shadow-md ${isError ? 'bg-red-600 hover:bg-red-700' : 'hover:opacity-90'}`}
              style={{ backgroundColor: isError ? ROJO_ERROR : AZUL_UNISON }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div style={{ backgroundColor: FONDO_CLARO, minHeight: '100vh' }}>

      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6" style={{ color: AZUL_UNISON }}>
          Consultar Calificaciones
        </h2>

        <p className="text-lg text-gray-700 mb-8">
          Seleccione el filtro de consulta para iniciar la búsqueda:
        </p>

        {/* Contenedor de Filtros de Consulta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Botón: Por Expediente */}
          <button
            onClick={() => handleFiltroClick('Expediente')}
            className={`flex flex-col items-start p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-lg ${
              filtro === 'Expediente'
                ? 'bg-white border-4 border-blue-500 ring-4 ring-blue-200'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <User className="w-8 h-8 mb-2" style={{ color: filtro === 'Expediente' ? AZUL_UNISON : DORADO_UNISON }} />
            <span className="text-xl font-bold" style={{ color: AZUL_UNISON }}>Por Expediente</span>
            <p className="text-sm text-gray-600 mt-1 text-left">Expediente del alumno</p>
          </button>

          {/* Botón: Por Grupo */}
          <button
            onClick={() => handleFiltroClick('Grupo')}
            className={`flex flex-col items-start p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-lg ${
              filtro === 'Grupo'
                ? 'bg-white border-4 border-blue-500 ring-4 ring-blue-200'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Users className="w-8 h-8 mb-2" style={{ color: filtro === 'Grupo' ? AZUL_UNISON : DORADO_UNISON }} />
            <span className="text-xl font-bold" style={{ color: AZUL_UNISON }}>Por Grupo</span>
            <p className="text-sm text-gray-600 mt-1 text-left">Grupos que se imparten actualmente</p>
          </button>

          {/* Botón: Por Semestre */}
          <button
            onClick={() => handleFiltroClick('Semestre')}
            className={`flex flex-col items-start p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-lg ${
              filtro === 'Semestre'
                ? 'bg-white border-4 border-blue-500 ring-4 ring-blue-200'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-8 h-8 mb-2" style={{ color: filtro === 'Semestre' ? AZUL_UNISON : DORADO_UNISON }} />
            <span className="text-xl font-bold" style={{ color: AZUL_UNISON }}>Por Semestre</span>
            <p className="text-sm text-gray-600 mt-1 text-left">Semestres anteriores</p>
          </button>
        </div>

        {/* Formulario de Búsqueda (aparece al seleccionar filtro) */}
        <div className="max-w-md mx-auto">
          {renderFiltroFormulario()}
        </div>

        {/* Renderizado del Modal de Resultados/Error */}
        {modalVisible === 'success' && (
          <Modal
            type="success"
            title="Resultados de la Consulta"
            message={`La tabla de calificaciones para el filtro "${filtro}" se mostraría aquí.`}
            onClose={() => setModalVisible(null)}
          />
        )}

        {modalVisible === 'error' && (
          <Modal
            type="error"
            title="Error Formato Inválido"
            message="El número de expediente debe contener sólo dígitos válidos."
            onClose={() => setModalVisible(null)}
          />
        )}

      </main>
    </div>
  );
}