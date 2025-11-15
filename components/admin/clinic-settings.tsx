'use client'

import { useState } from 'react'
import { Save, Clock, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ClinicSettings() {
  const [settings, setSettings] = useState({
    clinicName: 'Mouthworks Dental Clinic',
    address: '123 Dental Street, Manila, Philippines',
    phone: '+63-2-1234-5678',
    email: 'info@mouthworks.com',
    website: 'www.mouthworks.com',
    openingHour: '08:00',
    closingHour: '18:00',
    lunchStart: '12:00',
    lunchEnd: '13:00',
    appointmentDuration: '30',
    maxAppointmentsPerDay: '20',
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (field: string, value: string) => {
    setSettings({ ...settings, [field]: value })
    setHasChanges(true)
  }

  const handleSave = () => {
    setHasChanges(false)
    // TODO: Save settings to database
  }

  return (
    <div className="p-6 space-y-8">
      {/* Clinic Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-teal-600" />
          Clinic Information
        </h3>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Clinic Name
            </label>
            <Input
              placeholder="Clinic name"
              value={settings.clinicName}
              onChange={(e) => handleChange('clinicName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Website
            </label>
            <Input
              placeholder="Website URL"
              value={settings.website}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Address
            </label>
            <Input
              placeholder="Full address"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-teal-600" />
          Contact Information
        </h3>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <Input
              placeholder="Phone number"
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Email address"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-600" />
          Operating Hours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Opening Hour
            </label>
            <Input
              type="time"
              value={settings.openingHour}
              onChange={(e) => handleChange('openingHour', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Closing Hour
            </label>
            <Input
              type="time"
              value={settings.closingHour}
              onChange={(e) => handleChange('closingHour', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Lunch Break Start
            </label>
            <Input
              type="time"
              value={settings.lunchStart}
              onChange={(e) => handleChange('lunchStart', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Lunch Break End
            </label>
            <Input
              type="time"
              value={settings.lunchEnd}
              onChange={(e) => handleChange('lunchEnd', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Appointment Settings */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Appointment Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Default Appointment Duration (minutes)
            </label>
            <Input
              type="number"
              value={settings.appointmentDuration}
              onChange={(e) =>
                handleChange('appointmentDuration', e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Max Appointments Per Day
            </label>
            <Input
              type="number"
              value={settings.maxAppointmentsPerDay}
              onChange={(e) =>
                handleChange('maxAppointmentsPerDay', e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
