'use client'

import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, Calendar, Pill, CreditCard, Package, BarChart3, Settings, LogOut, Smile } from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  userRole: 'patient' | 'receptionist' | 'dentist' | 'admin'
  onLogout: () => void
}

export function Sidebar({ currentPage, onNavigate, userRole, onLogout }: SidebarProps) {
  const isPatient = userRole === 'patient'

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, show: true },
    { id: 'patients', label: 'Patients', icon: Users, show: !isPatient },
    { id: 'appointments', label: 'Appointments', icon: Calendar, show: true },
    { id: 'treatments', label: 'Treatments', icon: Pill, show: !isPatient },
    { id: 'payments', label: 'Payments', icon: CreditCard, show: true },
    { id: 'inventory', label: 'Inventory', icon: Package, show: !isPatient },
    { id: 'reports', label: 'Reports', icon: BarChart3, show: !isPatient },
    { id: 'settings', label: 'Settings', icon: Settings, show: userRole === 'admin' },
  ]

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded flex items-center justify-center">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Mouthworks</h1>
            <p className="text-xs text-slate-400 capitalize">{userRole}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            if (!item.show) return null
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-slate-700 p-4">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
