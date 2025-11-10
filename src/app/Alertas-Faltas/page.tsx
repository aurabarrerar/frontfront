'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

type Semaforo = 'ok' | 'warning' | 'danger';
interface Grupo { id: string; clave: string; nombre: string; }
interface AlumnoFaltas {
  expediente: string;
  nombreCompleto: string;
  faltas: number;
  faltasPermitidas: number;
}

const getSemaforo = (faltas: number, permitidas: number): Semaforo => {
  if (permitidas <= 0) return 'ok';
  const r = faltas / permitidas;
  if (r >= 0.75) return 'danger';
  if (r >= 0.5) return 'warning';
  return 'ok';
};

// ---- (sustituir por fetch al API) ----
const MOCK_GRUPOS: Grupo[] = [
  { id: '1', clave: 'MAT101', nombre: 'grupo 1' },
  { id: '2', clave: 'FIS202', nombre: 'grupo 2' },
];

const MOCK_ALUMNOS: Record<string, AlumnoFaltas[]> = {
  '1': [
    { expediente: '219214456', nombreCompleto: 'Apellido Apellido Nombre Nombre', faltas: 10, faltasPermitidas: 14 },
    { expediente: '219214457', nombreCompleto: 'Apellido Apellido Nombre Nombre', faltas: 2,  faltasPermitidas: 14 },
    { expediente: '219214458', nombreCompleto: 'Apellido Apellido Nombre Nombre', faltas: 3,  faltasPermitidas: 14 },
    { expediente: '219214459', nombreCompleto: 'Apellido Apellido Nombre Nombre', faltas: 8,  faltasPermitidas: 14 },
    { expediente: '219214460', nombreCompleto: 'Apellido Apellido Nombre Nombre', faltas: 4,  faltasPermitidas: 14 },
    { expediente: '219214461', nombreCompleto: 'Apellido Apellido Nombre Nombre', faltas: 2,  faltasPermitidas: 14 },
    { expediente: '219214462', nombreCompleto: 'Apellido Apellido Nombre Nombre', faltas: 0,  faltasPermitidas: 14 },
  ],
  '2': [],
};
// ---------------------------------------------

export default function AlertasFaltasPage() {
  const [grupoId, setGrupoId] = useState<string>(MOCK_GRUPOS[0]?.id ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<AlumnoFaltas[]>([]);
  const [hasConsultado, setHasConsultado] = useState(false);

  // --- justificación ---
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState<AlumnoFaltas | null>(null);
  const [justificarCount, setJustificarCount] = useState<number>(1);
  const [motivo, setMotivo] = useState<string>('');

  // --- confirmación ---
  const [confirmOpen, setConfirmOpen] = useState(false);

  const grupos = useMemo(() => MOCK_GRUPOS, []);

  const consultar = async () => {
    setHasConsultado(true);
    setIsLoading(true);
    try {
      // const res = await fetch(`/api/alertas-faltas?grupoId=${grupoId}`, { cache: 'no-store' });
      // const data: AlumnoFaltas[] = await res.json();
      const data = [...(MOCK_ALUMNOS[grupoId] ?? [])];
      data.sort((a, b) => b.faltas / b.faltasPermitidas - a.faltas / a.faltasPermitidas);
      setRows(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasConsultado) consultar();
    // eslint-disable-next-line
  }, [grupoId]);

  // Cerrar cosas con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
        setConfirmOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de página */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Alerta por faltas</h1>

        {/* Tarjeta de filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Grupo</label>
              <select
                value={grupoId}
                onChange={(e) => setGrupoId(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
                disabled={isLoading}
              >
                {grupos.map((g) => (
                  <option key={g.id} value={g.id}>({g.clave}) - {g.nombre}</option>
                ))}
              </select>
            </div>

            <button
              onClick={consultar}
              disabled={isLoading}
              className="inline-flex items-center gap-2 py-2 px-6 rounded-md font-medium transition disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Search size={16} />
              {isLoading ? 'Consultando…' : 'Consultar'}
            </button>
          </div>
        </div>

        {/* Tarjeta de tabla */}
        {hasConsultado && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header fijo */}
            <div className="grid grid-cols-[140px_minmax(320px,1fr)_120px_160px_120px] border-b bg-gray-100 text-gray-700">
              {['Expediente', 'Nombre', 'Faltas', 'Faltas Permitidas', 'Justificar'].map((th) => (
                <div key={th} className="px-4 py-3 text-sm font-semibold">{th}</div>
              ))}
            </div>

            {/* Cuerpo con scroll */}
            <div className="max-h-[460px] overflow-y-auto">
              {rows.length === 0 ? (
                <div className="p-10 text-center text-sm text-gray-500">No hay registros para este grupo.</div>
              ) : (
                rows.map((alumno, idx) => {
                  const status = getSemaforo(alumno.faltas, alumno.faltasPermitidas);
                  return (
                    <div
                      key={`${alumno.expediente}-${idx}`}
                      className={`grid grid-cols-[140px_minmax(320px,1fr)_120px_160px_120px] items-center border-b ${idx % 2 ? 'bg-gray-50' : 'bg-white'}`}
                      style={{ minHeight: 48 }}
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 tabular-nums">{alumno.expediente}</div>
                      <div className="px-4 py-3 text-sm text-gray-900 truncate">{alumno.nombreCompleto}</div>

                      <div className="px-4 py-3 text-sm text-gray-900 flex items-center gap-2">
                        <span
                          aria-hidden
                          className={[
                            'inline-block h-2.5 w-2.5 rounded-full',
                            status === 'ok' ? 'bg-emerald-500' : status === 'warning' ? 'bg-amber-500' : 'bg-rose-600',
                          ].join(' ')}
                        />
                        {alumno.faltas}
                      </div>

                      <div className="px-4 py-3 text-sm text-gray-900">
                        {alumno.faltas}/{alumno.faltasPermitidas}
                      </div>

                      <div className="px-4 py-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-md border border-blue-600 px-2.5 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Justificar"
                          onClick={() => {
                            setSelectedAlumno(alumno);
                            setJustificarCount(1);
                            setMotivo('');
                            setModalOpen(true);
                          }}
                        >
                          {/* ícono editar */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ---------- Justificación (solo UI) ---------- */}
        {modalOpen && selectedAlumno && (
          <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setModalOpen(false)} />
            {/* Panel */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-[640px] rounded-xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 border-b px-6 py-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-white">
                    {/* signo de exclamación */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                      <path d="M11 7h2v7h-2V7zm0 8h2v2h-2v-2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Motivo de Justificación</h2>
                  <button
                    className="ml-auto rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => setModalOpen(false)}
                    aria-label="Cerrar"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4">
                  <div className="space-y-2 text-sm text-gray-800">
                    <div><span className="font-medium">Expediente:</span> {selectedAlumno.expediente}</div>
                    <div><span className="font-medium">Alumno:</span> {selectedAlumno.nombreCompleto.replaceAll('Nombre', 'NOM').replaceAll('Apellido', 'APP')}</div>
                    <div><span className="font-medium">Faltas Totales:</span> {selectedAlumno.faltas}</div>
                  </div>

                  {/* Campo Justificar */}
                  <div className="mt-4 flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Justificar:</label>
                    <input
                      type="number"
                      min={0}
                      max={selectedAlumno.faltas}
                      value={justificarCount}
                      onChange={(e) => setJustificarCount(Number(e.target.value))}
                      className="h-8 w-12 rounded-md border border-gray-300 text-center text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Faltas</span>
                  </div>

                  {/* Campo Motivo */}
                  <div className="mt-3">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Motivo:</label>
                    <textarea
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      rows={4}
                      className="w-full resize-none rounded-md border border-gray-300 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 pb-4 pt-2">
                  <button
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300"
                    onClick={() => {
                      setModalOpen(false);
                      setConfirmOpen(true);
                    }}
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ---------- Justificación ---------- */}

        {/* ---------- Confirmación (solo UI) ---------- */}
        {confirmOpen && (
          <div className="fixed inset-0 z-50" aria-modal="true" role="alertdialog">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
              onClick={() => setConfirmOpen(false)}
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-[480px] rounded-xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 border-b px-6 py-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Actualización Realizada</h2>
                  <button
                    className="ml-auto rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => setConfirmOpen(false)}
                    aria-label="Cerrar"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6 text-sm text-gray-800">
                  La justificación de faltas se ha realizado correctamente.
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 pb-4">
                  <button
                    className="rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300"
                    onClick={() => setConfirmOpen(false)}
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ---------- /Confirmación ---------- */}
      </div>
    </div>
  );
}
