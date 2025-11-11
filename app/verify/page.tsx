'use client'

import InputField from '@/components/InputField'
import Button from '@/components/Button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // Limpiar errores previos
    setLoading(true)

    const emailValue = email.trim().toLowerCase()

    // Validación básica: campo vacío
    if (!emailValue) {
      setError('Introduce tu correo institucional')
      setLoading(false)
      return
    }

    // Validación: debe ser @unison.mx
    if (!emailValue.endsWith('@unison.mx')) {
      setError('El correo debe ser institucional (@unison.mx)')
       setLoading(false)
      return
    }

    // Si el correo es válido → redirigir a la página de clave de verificación
    // router.push('/verify-key')
     router.push(`/verify-key?email=${encodeURIComponent(emailValue)}`)
    setLoading(false)
  }

  return (
     <div className="min-h-screen bg-yellow-500 flex justify-center items-center p-4">
  <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Logo y título centrado */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="logo.png"
            alt="Universidad de Sonora"
            className="h-16 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Verificación de cuenta</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Introduzca su correo institucional:"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            error={error}
            type="email"
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Enviando…' : 'Enviar correo'}
          </Button>

          <div className="text-center mt-4">
            <a href="/login" className="text-blue-900 text-xl font-normal hover:underline">
              Atrás
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}