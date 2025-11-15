'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type Patient } from '@/context/app-context'

interface AppointmentModalProps {
  appointment: any
  services: string[]
  patients: Patient[]
  onSave: (data: any) => void
  onDelete?: () => void
  onClose: () => void
}

export function AppointmentModal({
  appointment,
  services,
  patients,
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
    doctorId: '',
    notes: '',
    status: 'Pending' as 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled',
  })

  useEffect(() => {
    if (appointment) {
      setFormData({
        patientName: appointment.patientName || '',
        patientId: appointment.patientId || '',
        date: appointment.date || new Date().toISOString().split('T')[0],
        time: appointment.time || '09:00',
        service: appointment.service || services[0] || 'Cleaning',
        doctorId: appointment.doctorId || '',
        notes: appointment.notes || '',
        status: appointment.status || 'Pending',
      })
    } else {
      setFormData((d) => ({ ...d, service: services[0] || d.service }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment, services])

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{appointment ? 'Edit Appointment' : 'New Appointment'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Patient</label>
            <div className="flex gap-2">
              <select
                value={formData.patientId}
                onChange={(e) => {
                  const pid = e.target.value
                  const p = patients.find((x) => x.id === pid)
                  setFormData({
                    ...formData,
                    patientId: pid,
                    patientName: p ? p.name : '',
                  })
                }}
                className="flex-1 px-3 py-2 border rounded"
              >
                <option value="">-- select patient --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              >
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              {onDelete && (
                <Button variant="outline" onClick={onDelete} className="text-red-600 hover:bg-red-50">
                  Delete
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
                {appointment ? 'Save Changes' : 'Create Appointment'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
