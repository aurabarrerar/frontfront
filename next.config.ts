import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🚨 LA SOLUCIÓN ESTÁ AQUÍ 🚨
  // Esto le dice a Next.js que la raíz del proyecto para las rutas está en /src.
  // Es necesario cuando usas una estructura /src/app y quieres evitar conflictos.
  srcDir: 'src',

  /* otras opciones de config aquí */
};

export default nextConfig;