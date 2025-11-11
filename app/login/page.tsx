// app/login/page.tsx

'use client'

import Navbar from '@/components/Navbar'
import InputField from '@/components/InputField'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import { useState } from 'react'


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor, completa todos los campos')
      return
    }
    // Simular validación
    if (email !== 'valid@example.com') {
      setError('Correo no registrado')
      return
    }
    setError('')
    alert('Inicio de sesión exitoso')
  }

  return (
    <div className="min-h-screen bg-yellow-500 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Navbar title="Iniciar sesión" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Correo institucional:"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            error={error === 'Correo no registrado' ? error : ''}
          />

          <InputField
            label="Contraseña:"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <div className="flex justify-between items-center">
            <Checkbox
              label="Recuérdame"
              checked={rememberMe}
              onChange={setRememberMe}
            />
            <a href="#" className="text-blue-900 text-xl font-normal">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button>Enviar</Button>

          <div className="text-center mt-4">
            <a href="/register" className="text-blue-900 text-xl font-normal">
              Regístrate aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}