"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { semestre: "2022-2", promedio: 92 },
  { semestre: "2023-1", promedio: 71 },
  { semestre: "2023-2", promedio: 91 },
  { semestre: "2024-1", promedio: 94 },
  { semestre: "2024-2", promedio: 77 },
  { semestre: "2025-1", promedio: 85 },
  { semestre: "2025-2", promedio: 88 },
];

export default function DesempenoAlumnoPage() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { href: "/alumnos/perfil", label: "Perfil" },
    { href: "/alumnos/desempeno", label: "Desempeño" }, // ✅ sin acento
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

      {/* Gráfica */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 40, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="semestre" stroke="#16469B" />
            <YAxis domain={[0, 100]} stroke="#16469B" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#F0F0F0",
                border: "1px solid #16469B",
                color: "#16469B",
                fontSize: "13px",
              }}
            />
            <Line
              type="monotone"
              dataKey="promedio"
              stroke="#16469B"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
