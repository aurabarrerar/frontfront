"use client";

import { usePathname } from "next/navigation";

type Props = {
  className?: string;
  azul: string;
  dorado: string;
};

export default function NavBar({ className, azul, dorado }: Props) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/inicio", label: "Inicio" },
    { href: "#", label: "Calificaciones", disabled: true },
    { href: "#", label: "Alumnos", disabled: true },
    { href: "/reportes", label: "Reportes Académicos" },
    { href: "#", label: "Alertas por Faltas", disabled: true },
  ];

  return (
    <nav
      className={className}
      style={{ backgroundColor: dorado, borderTop: `6px solid ${azul}` }}
    >
      <div className="max-w-7xl mx-auto px-8 w-full">
        <ul className="flex justify-start gap-10">
          {menuItems.map((item) => {
            // ✅ Detecta ruta activa o subruta
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`px-4 py-2 transition ${
                    item.disabled
                      ? "cursor-not-allowed opacity-70"
                      : "hover:text-[#D3AA10]"
                  } ${isActive ? "text-[#16469B]" : "text-white"}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
