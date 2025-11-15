'use client'

import { useState } from 'react'
import { LoginForm } from '@/components/auth/login-form'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<'patient' | 'receptionist' | 'dentist' | 'admin'>('patient')

  const handleLogin = (role: 'patient' | 'receptionist' | 'dentist' | 'admin') => {
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <DashboardLayout userRole={userRole} onLogout={handleLogout} />
}
