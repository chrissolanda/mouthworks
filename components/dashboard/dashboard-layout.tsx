'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Dashboard } from './dashboard'
import { PatientManagement } from '../patients/patient-management'
import { AppointmentManagement } from '../appointments/appointment-management'
import { TreatmentManagement } from '../treatments/treatment-management'
import { PaymentManagement } from '../payments/payment-management'
import { InventoryManagement } from '../inventory/inventory-management'
import { ReportsPage } from '../reports/reports-page'
import { SettingsPage } from '../settings/settings-page'

interface DashboardLayoutProps {
  userRole: 'patient' | 'receptionist' | 'dentist' | 'admin'
  onLogout: () => void
}

export function DashboardLayout({ userRole, onLogout }: DashboardLayoutProps) {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />
      case 'patients':
        return <PatientManagement userRole={userRole} />
      case 'appointments':
        return <AppointmentManagement userRole={userRole} />
      case 'treatments':
        return <TreatmentManagement userRole={userRole} />
      case 'payments':
        return <PaymentManagement userRole={userRole} />
      case 'inventory':
        return userRole === 'patient' ? <Dashboard userRole={userRole} /> : <InventoryManagement userRole={userRole} />
      case 'reports':
        return userRole === 'patient' ? <Dashboard userRole={userRole} /> : <ReportsPage userRole={userRole} />
      case 'settings':
        return userRole === 'admin' ? <SettingsPage /> : <Dashboard userRole={userRole} />
      default:
        return <Dashboard userRole={userRole} />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} userRole={userRole} onLogout={onLogout} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}
