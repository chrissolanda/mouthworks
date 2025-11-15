'use client'

import { useState } from 'react'
import { Users, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StaffManagement } from './staff-management'
import { ClinicSettings } from './clinic-settings'

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<'staff' | 'settings'>('staff')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Settings</h1>
          <p className="text-slate-600">Manage staff and clinic configuration</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveTab('staff')}
            variant={activeTab === 'staff' ? 'default' : 'outline'}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            Staff Management
          </Button>
          <Button
            onClick={() => setActiveTab('settings')}
            variant={activeTab === 'settings' ? 'default' : 'outline'}
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            Clinic Settings
          </Button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          {activeTab === 'staff' && <StaffManagement />}
          {activeTab === 'settings' && <ClinicSettings />}
        </div>
      </div>
    </div>
  )
}
