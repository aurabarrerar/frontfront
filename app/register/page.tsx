// app/register/page.tsx

'use client'

import Navbar from '@/components/Navbar'
import InputField from '@/components/InputField'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import { useState } from 'react'

export default function RegisterPage() {
  const [key, setKey] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
     // Simular registro exitoso
    alert('Registro exitoso')
    // Redirigir a la página de verificación
    window.location.href = '/verify'
  }

  return (
    <div className="min-h-screen bg-yellow-500 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Navbar title="Registro" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Clave:"
            value={key}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKey(e.target.value)}
          />

          <InputField
            label="Contraseña:"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <div className="text-center">
            <a href="/login" className="text-blue-900 text-xl font-normal">
              Atrás
            </a>
          </div>

          <Button>Continuar</Button>
        </form>
      </div>
    </div>
  )
}