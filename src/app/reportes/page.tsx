"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Check, Download, FileText, X, AlertTriangle, User, ArrowLeft, Briefcase, List, Clock } from 'lucide-react';

// --- CONFIGURACIÓN DE COLORES ---
const AZUL_UNISON = "#16469B";
const DORADO_UNISON = "#FFD100";
const FONDO_CLARO = "#F5F0FF";
const ROJO_ERROR = "#DC2626";

// --- TIPOS Y DATOS DE EJEMPLO ---
type EstadoReporte = 'Todos' | 'Candidato' | 'En proceso' | 'Terminado';

interface Reporte {
    id: number;
    tipo: string;
    expediente: string;
    nombre: string;
    carrera: string;
    progreso: number;
    promedio: number;
    estado: string; // Ej: 'Es candidato', 'En proceso', 'No es candidato'
    lugar: string;
    calificacion: string;
    fechaInicio: string;
    fechaFinEstimada: string;
    totalHoras: number;
}

const mockReports: Reporte[] = [
    // El estado aquí es un ID que mapearemos a la descripción completa
    { id: 1, tipo: 'Servicio Social', expediente: '219214569', nombre: 'App Apm Nombre', carrera: 'Ingeniería en Sistemas de la Información', progreso: 45, promedio: 90.5, estado: 'Es candidato', lugar: 'Encora', calificacion: 'A', fechaInicio: '01/08/2024', fechaFinEstimada: '01/02/2025', totalHoras: 480 }, // Estudiante de la imagen de perfil
    { id: 2, tipo: 'Servicio Social', expediente: '333333333', nombre: 'FULANITO 3', carrera: 'Lic. en Derecho', progreso: 70, promedio: 85.0, estado: 'En proceso', lugar: 'Despacho Legal XYZ', calificacion: 'B', fechaInicio: '15/07/2024', fechaFinEstimada: '15/01/2025', totalHoras: 480 },
    { id: 3, tipo: 'Servicio Social', expediente: '444444444', nombre: 'FULANITO 4', carrera: 'Lic. en Administración', progreso: 100, promedio: 92.1, estado: 'No es candidato', lugar: 'N/A', calificacion: 'A', fechaInicio: '01/01/2023', fechaFinEstimada: '01/07/2023', totalHoras: 480 },
    { id: 4, tipo: 'Prácticas Profesionales', expediente: '555555555', nombre: 'FULANITO 5', carrera: 'Ing. Industrial', progreso: 20, promedio: 88.9, estado: 'Candidato', lugar: 'Ford', calificacion: 'B', fechaInicio: '01/09/2024', fechaFinEstimada: '01/03/2025', totalHoras: 720 },
];

const reportTypeOptions = [
    'Servicio Social',
    'Prácticas Profesionales',
    'Titulación'
];

// --- COMPONENTE MODAL REUTILIZABLE ---
// (Mantenido igual)
const Modal = ({ title, message, onClose, type = 'info' }: { title: string, message: string, onClose: () => void, type?: 'info' | 'error' }) => {
    const isError = type === 'error';
    const bgColor = isError ? ROJO_ERROR : AZUL_UNISON;

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">

          {/* Header del Modal */}
          <div className="p-4 flex items-center justify-between rounded-t-xl" style={{ backgroundColor: bgColor }}>
            <h3 className={`text-xl font-semibold text-white`}>{title}</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Contenido del Modal */}
          <div className="p-6">
            <p className="text-gray-700 text-center">
              {message}
            </p>
          </div>

          {/* Footer del Modal */}
          <div className="p-4 flex justify-center border-t">
            <button
              onClick={onClose}
              className={`px-6 py-2 font-semibold rounded-lg transition shadow-md bg-gray-200 text-gray-800 hover:bg-gray-300`}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    );
  };

// --- COMPONENTE PERFIL SIMPLE Y ESTÁTICO (FIGMA-LIKE) ---
const SimpleStudentProfile = ({ student, onBack }: { student: Reporte, onBack: () => void }) => {

    // Función para renderizar el detalle con el estilo exacto de la imagen.
    const renderFigmaDetail = (label: string, value: string | number, isState: boolean = false) => (
        <p className={`text-lg font-bold text-gray-900 ${isState ? 'mt-2' : ''}`}>
            {label} <span className={`font-normal ${isState ? 'font-bold' : ''}`} style={isState ? { color: '#10B981' /* Green-600 */ } : {}}>{value}</span>
        </p>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6 max-w-md mx-auto">

            {/* Encabezado y Regresar (Botón 'Atrás' simple) */}
            <div className='flex justify-start'>
                <button
                    onClick={onBack}
                    className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition font-medium"
                >
                    Atrás
                </button>
            </div>

            {/* Tarjeta de Perfil Principal (Simulando el layout de la imagen) */}
            <div className="flex flex-col items-center text-center">

                {/* Ícono de Perfil Grande */}
                <div className="w-40 h-40 bg-purple-100 rounded-full flex items-center justify-center border-4 border-gray-200 flex-shrink-0 mb-4">
                    <User className="w-24 h-24 text-purple-400 opacity-80" />
                </div>

                {/* Información Central */}
                <div className="flex-grow text-center">
                    {renderFigmaDetail('Nombre:', student.nombre)}
                    {renderFigmaDetail('Expediente:', student.expediente)}
                    {renderFigmaDetail('Carrera:', student.carrera)}
                    {renderFigmaDetail('Progreso:', `${student.progreso}%`)}
                    {renderFigmaDetail('Promedio de kardex:', Math.floor(student.promedio))}

                    {/* Estado Destacado */}
                    {renderFigmaDetail('Estado:', student.estado, true)}
                </div>
            </div>

            {/* El botón Atrás duplicado para simular la posición de la imagen original */}
            <div className='flex justify-start pt-4'>
                 <button
                    onClick={onBack}
                    className="px-6 py-2 text-gray-800 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition font-medium"
                >
                    Atrás
                </button>
            </div>

        </div>
    );
}

// --- COMPONENTE DE PÁGINA: REPORTES ACADÉMICOS ---
export default function ReportesAcademicosPage() {

    // --- LÓGICA DE ESTADO ---
    // 1. Inicia TIPO DE REPORTE en vacío para forzar la selección.
    const [tipoReporte, setTipoReporte] = useState<string>('');
    // 2. Inicia MOSTRAR RESULTADOS en FALSE para ocultar el resto de la interfaz.
    const [showResults, setShowResults] = useState(false);

    const [estadoSeleccionado, setEstadoSeleccionado] = useState<EstadoReporte>('Candidato');
    const [expedienteBusqueda, setExpedienteBusqueda] = useState('');
    const [modalVisible, setModalVisible] = useState<'error' | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Reporte | null>(null);

    const commonInputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 transition";
    const buttonStyle = { backgroundColor: AZUL_UNISON };

    const handleConsultar = () => {
        if (tipoReporte === '') {
            setModalVisible('error'); // Muestra error si no se selecciona tipo
        } else {
            // Si hay un tipo seleccionado, muestra el resto de los filtros y los resultados
            setShowResults(true);
            setSelectedStudent(null);
        }
    };

    // Cuando el usuario cambia el tipo, ocultamos los resultados y el resto de filtros.
    const handleTipoReporteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoReporte(e.target.value);
        setShowResults(false);
        // Reiniciamos los filtros secundarios a sus valores por defecto, listos para la nueva consulta.
        setEstadoSeleccionado('Candidato');
        setExpedienteBusqueda('');
    };

    const filteredReports = useMemo(() => {
        if (!showResults || tipoReporte === '') return []; // No mostrar nada si no se ha consultado

        // Mapea el estado interno a la categoría de filtro de la UI
        const mapStateToFilter = (estado: string): EstadoReporte => {
            if (estado.toLowerCase().includes('candidato') && !estado.toLowerCase().includes('no')) return 'Candidato';
            if (estado.toLowerCase().includes('proceso')) return 'En proceso';
            if (estado.toLowerCase().includes('terminado') || estado.toLowerCase().includes('no')) return 'Terminado';
            return 'Todos';
        };

        let results = mockReports.filter(r => r.tipo === tipoReporte);

        if (estadoSeleccionado !== 'Todos') {
            results = results.filter(r => mapStateToFilter(r.estado) === estadoSeleccionado);
        }

        if (expedienteBusqueda) {
            results = results.filter(r => r.expediente.includes(expedienteBusqueda) || r.nombre.toLowerCase().includes(expedienteBusqueda.toLowerCase()));
        }

        return results;
    }, [tipoReporte, estadoSeleccionado, expedienteBusqueda, showResults]);

    // --- Renderizado de Tarjeta de Reporte ---
    const ReportCard = ({ reporte }: { reporte: Reporte }) => {

        const isCandidato = reporte.estado.toLowerCase().includes('candidato') && !reporte.estado.toLowerCase().includes('no');

        const cardStyle = isCandidato
            ? { border: '2px solid', borderColor: DORADO_UNISON, backgroundColor: DORADO_UNISON + '20' } // Fondo más claro con borde dorado
            : { backgroundColor: '#F9F4FF' };

        const calificacionColor = isCandidato ? DORADO_UNISON : AZUL_UNISON;
        const calificacionTextColor = isCandidato ? AZUL_UNISON : 'white';


        return (
            <div
                className="p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300 cursor-pointer"
                style={cardStyle}
                onClick={() => setSelectedStudent(reporte)}
            >
                <div className="flex items-center gap-4">
                    {/* Círculo de Calificación */}
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                        style={{ backgroundColor: calificacionColor, color: calificacionTextColor }}
                    >
                        {reporte.calificacion.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">
                            {reporte.nombre.toUpperCase()}
                            {isCandidato && <span className="text-xs ml-2 font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">CANDIDATO</span>}
                        </p>
                        <p className="text-sm text-gray-500">{reporte.carrera}</p>
                        <p className="text-xs text-gray-400">Exp: {reporte.expediente}</p>
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDERIZADO PRINCIPAL ---
    return (
        <div style={{ backgroundColor: FONDO_CLARO, minHeight: '100vh' }}>

            <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-8" style={{ color: AZUL_UNISON }}>
                    Reportes Académicos
                </h2>

                {selectedStudent ? (
                    // ------------------ VISTA DE PERFIL SIMPLE ------------------
                    <SimpleStudentProfile
                        student={selectedStudent}
                        onBack={() => setSelectedStudent(null)}
                    />
                ) : (
                    // ------------------ VISTA DE FILTROS Y RESULTADOS ------------------
                    <>
                        {/* Area de Filtros */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">

                            {/* ESTA ES LA ÚNICA FILA VISIBLE AL INICIO */}
                            <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">

                                {/* 1. Dropdown Tipo de Reporte */}
                                <div className="w-full md:w-3/5"> {/* Más ancho para centrar el foco */}
                                    <label htmlFor="report-select" className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo de Reporte
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="report-select"
                                            className={commonInputClasses}
                                            value={tipoReporte}
                                            onChange={handleTipoReporteChange}
                                            style={{ paddingRight: '2.5rem' }}
                                        >
                                            <option value="" disabled>Seleccionar</option>
                                            {reportTypeOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* 2. Botón Consultar */}
                                <div className="w-full md:w-2/5">
                                    <button
                                        className="w-full py-3 text-white font-semibold rounded-lg transition shadow-md hover:opacity-90 mt-2 md:mt-0"
                                        style={buttonStyle}
                                        onClick={handleConsultar}
                                        disabled={tipoReporte === ''} // Desactivado si no se ha seleccionado nada
                                    >
                                        <span className='flex items-center justify-center gap-2'><Search className="w-5 h-5"/> Consultar</span>
                                    </button>
                                </div>
                            </div>

                            {/* CONTENEDOR DE FILTROS ADICIONALES Y LISTA (Oculto al inicio) */}
                            {showResults && (
                                <div className='pt-6 border-t border-gray-200 mt-6'>
                                    {/* Fila 2: Buscador por Expediente/Nombre */}
                                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
                                        <div className="w-full md:w-1/2">
                                            <label htmlFor="expediente-input" className="block text-sm font-medium text-gray-700 mb-2">
                                                Buscar por expediente o nombre
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="expediente-input"
                                                    type="text"
                                                    placeholder="Expediente o Nombre"
                                                    className={commonInputClasses}
                                                    value={expedienteBusqueda}
                                                    onChange={(e) => setExpedienteBusqueda(e.target.value)}
                                                />
                                                {expedienteBusqueda && (
                                                    <button
                                                        onClick={() => setExpedienteBusqueda('')}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 transition"
                                                        aria-label="Limpiar búsqueda"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fila 3: Filtro de Estado (Radio Buttons) */}
                                    <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t mt-4">
                                        <h4 className="w-full text-sm font-medium text-gray-700 mb-2">Filtrar por Estado:</h4>
                                        {(['Todos', 'Candidato', 'En proceso', 'Terminado'] as EstadoReporte[]).map((estado) => (
                                            <label key={estado} className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900 transition">
                                                <input
                                                    type="radio"
                                                    name="estadoReporte"
                                                    value={estado}
                                                    checked={estadoSeleccionado === estado}
                                                    onChange={() => setEstadoSeleccionado(estado)}
                                                    className="hidden"
                                                />
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 transition-all duration-200 ${
                                                    estadoSeleccionado === estado
                                                        ? 'border-4'
                                                        : 'border-gray-400'
                                                }`} style={estadoSeleccionado === estado ? { borderColor: AZUL_UNISON } : {}}>
                                                    {estadoSeleccionado === estado && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: AZUL_UNISON }} />}
                                                </div>
                                                {estado}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Área de Resultados (Solo visible si showResults es true) */}
                        {showResults && (
                            <div className='mt-8'>
                                <h3 className="text-xl font-bold mb-4" style={{ color: AZUL_UNISON }}>
                                    Resultados de la Consulta
                                </h3>
                                {filteredReports.length > 0 ? (
                                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                        {filteredReports.map(reporte => (
                                            <ReportCard key={reporte.id} reporte={reporte} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white p-8 rounded-xl shadow-lg text-center text-gray-500 flex items-center justify-center gap-3">
                                        <AlertTriangle className="w-5 h-5"/>
                                        No se encontraron reportes que coincidan con los filtros.
                                    </div>
                                )}

                                {/* Botón Descargar PDF */}
                                {filteredReports.length > 0 && (
                                    <div className="mt-8 flex justify-end">
                                        <div className="relative group">
                                            <button
                                                className="flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition shadow-xl text-white hover:opacity-90"
                                                style={buttonStyle}
                                            >
                                                <Download className="w-5 h-5" />
                                                Descargar PDF <ChevronDown className="w-4 h-4 ml-1" />
                                            </button>
                                            {/* Dropdown simulado */}
                                            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                                <div className="py-1">
                                                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => alert('Descargando Reporte General de Candidatos')}>
                                                        <FileText className="w-4 h-4 mr-2"/> General (Candidatos)
                                                    </a>
                                                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => alert('Descargando Reporte Detallado')}>
                                                        <FileText className="w-4 h-4 mr-2"/> Detallado por Persona
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Renderizado de Modales */}
                        {modalVisible === 'error' && (
                            <Modal
                                type="error"
                                title="Selección Requerida"
                                message="Debes seleccionar un Tipo de Reporte para poder Consultar."
                                onClose={() => setModalVisible(null)}
                            />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}