// app/verify-key/page.tsx

'use client'

import Navbar from '@/components/Navbar'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyKeyPage() {
  const router = useRouter()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const correctCode = '123456'

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      if (value && index < 5) inputRefs.current[index + 1]?.focus()
      setError('')
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length !== 6) return setError('Por favor, ingresa los 6 dígitos')
    if (fullCode === correctCode) setShowSuccess(true)
    else setError('Clave de verificación incorrecta')
  }

  return (
    <div className="min-h-screen bg-yellow-500 flex justify-center items-center p-4">
  <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {!showSuccess ? (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <Navbar title="Verificación de cuenta" />
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-center text-zinc-600 text-sm">
                Ingresa la clave de verificación que enviamos a tu correo institucional.
              </p>

              {/* Campos de verificación */}
              <div className="flex justify-between gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => void (inputRefs.current[index] = el)}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-xl font-bold text-center border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    aria-label={`Dígito ${index + 1}`}
                  />
                ))}
              </div>

              {error && <p className="text-red-500 text-center text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-yellow-600 transition shadow-[0px_4px_10px_0px_rgba(233,68,75,0.25)]"
              >
                Verificar
              </button>

              <div className="text-center">
                <a href="/verify" className="text-blue-900 text-sm hover:underline">
                  Reenviar código
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Pantalla de éxito con estilo institucional */
          <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
            <Navbar title="Verificación de cuenta" />

            {/* Check verde */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#6FB062] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-white"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              
              <p className="text-zinc-800 text-2xl font-normal font-['Anek_Devanagari'] tracking-wide">
                Registro completado correctamente
              </p>
            </div>

            <button
              onClick={() => router.push('/login')}
              className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold text-2xl font-['Anek_Devanagari'] tracking-wide hover:bg-yellow-600 transition shadow-[0px_4px_10px_0px_rgba(233,68,75,0.25)]"
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  )
}