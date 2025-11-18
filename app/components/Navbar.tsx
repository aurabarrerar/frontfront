// app/components/Navbar.tsx

import Image from 'next/image'

export default function Navbar({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center mb-8">
      {/* Contenedor del logo con sombra y bordes redondeados */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <Image
          src="/logo.png"
          alt="Universidad de Sonora"
          width={150}
          height={150}
          className="mx-auto" // Centra el logo horizontalmente
        />
      </div>
      <h1 className="text-2xl font-bold text-zinc-800">{title}</h1>
    </div>
  )
}