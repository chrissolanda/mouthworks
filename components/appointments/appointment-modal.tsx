'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'
import type { Patient } from '@/context/app-context' // added

interface AppointmentModalProps {
  appointment: any
  services: string[]
  patients: Patient[] // added
  onSave: (data: any) => void
  onDelete?: () => void
  onClose: () => void
}

export function AppointmentModal({
  appointment,
  services,
  patients, // added
  onSave,
  onDelete,
  onClose,
}: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    service: services[0] || 'Cleaning',
    notes: '',
  })

  useEffect(() => {
    if (appointment) {
      setFormData({
        patientName: appointment.patientName,
        patientId: appointment.patientId,
        date: appointment.date,
        time: appointment.time,
        service: appointment.service,
        notes: appointment.notes,
      })
    }
  }, [appointment])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{appointment ? 'Edit Appointment' : 'New Appointment'}</CardTitle>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Patient</label>
              <select
                required
                value={formData.patientId}
                onChange={(e) => {
                  const id = e.target.value
                  const p = patients.find((x) => x.id === id)
                  setFormData({ ...formData, patientId: id, patientName: p ? p.name : '' })
                }}
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded text-sm"
              >
                <option value="">Select patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Date</label>
              <Input
                required
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Time</label>
              <Input
                required
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded text-sm"
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any notes..."
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded text-sm"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              {appointment && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDelete}
                  className="flex-1"
                >
                  Delete
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className={appointment && onDelete ? '' : 'flex-1'}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`bg-teal-600 hover:bg-teal-700 text-white ${
                  appointment && onDelete ? '' : 'flex-1'
                }`}
              >
                {appointment ? 'Update' : 'Book'} Appointment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
