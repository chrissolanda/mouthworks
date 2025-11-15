'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface LoginFormProps {
  onLogin: (role: 'patient' | 'receptionist' | 'dentist' | 'admin') => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleDemoLogin = (role: 'patient' | 'receptionist' | 'dentist' | 'admin') => {
    onLogin(role)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-teal-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Mouthworks</span>
          </div>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Mouthworks Dental Clinic Management System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-500 font-medium">Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => handleDemoLogin('patient')}
                variant="outline"
                className="text-xs h-9"
              >
                Patient
              </Button>
              <Button
                onClick={() => handleDemoLogin('receptionist')}
                variant="outline"
                className="text-xs h-9"
              >
                Receptionist
              </Button>
              <Button
                onClick={() => handleDemoLogin('dentist')}
                variant="outline"
                className="text-xs h-9"
              >
                Dentist
              </Button>
              <Button
                onClick={() => handleDemoLogin('admin')}
                variant="outline"
                className="text-xs h-9"
              >
                Admin
              </Button>
            </div>
          </div>

          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            Sign In
          </Button>

          <p className="text-xs text-slate-500 text-center">
            Demo mode: Click above to select a role
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
