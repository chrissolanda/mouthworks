'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AppointmentList } from './appointment-list'
import { AppointmentModal } from './appointment-modal'
import { CalendarView } from './calendar-view'
import { PaymentModal } from '@/components/payments/payment-modal'
import { useAppContext, type Appointment } from '@/context/app-context'

interface AppointmentManagementProps {
  userRole: string
}

export function AppointmentManagement({ userRole }: AppointmentManagementProps) {
  const {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    patients,
    addPatient,
    addPayment,
  } = useAppContext()

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')

  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const services = ['Cleaning', 'Extraction', 'Whitening', 'Orthodontic', 'Root Canal', 'Filling']

  const todayAppointments = appointments.filter((a) => a.date === selectedDate)

  const handleAddAppointment = (formData: Omit<Appointment, 'id'> | any) => {
    const payload: Omit<Appointment, 'id'> = {
      patientId: formData.patientId || '',
      patientName:
        formData.patientName ||
        (patients.find((p) => p.id === formData.patientId)?.name ?? formData.patientName ?? ''),
      date: formData.date,
      time: formData.time,
      service: formData.service,
      doctorId: formData.doctorId ?? null,
      status: formData.status ?? 'Pending',
      notes: formData.notes ?? '',
    }
    addAppointment(payload)
    setIsModalOpen(false)
  }

  const handleUpdateAppointment = (id: string, formData: Partial<Appointment>) => {
    updateAppointment(id, formData)
    setSelectedAppointment(null)
    setIsModalOpen(false)
  }

  const handleDeleteAppointment = (id: string) => {
    deleteAppointment(id)
    setSelectedAppointment(null)
    setIsModalOpen(false)
  }

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    updateAppointment(id, { status: newStatus })
  }

  // Quick Add Patient (simple prompt to avoid modal prop mismatches)
  const handleQuickAddPatient = () => {
    const name = window.prompt('New patient name')
    if (!name) return
    const newPatient = addPatient({
      name,
      email: '',
      phone: '',
      dob: '',
      gender: 'Other',
      address: '',
      lastVisit: '',
      balance: 0,
      hasAppointment: false,
    })
    // open appointment modal and preselect this patient
    setSelectedAppointment(null)
    setIsModalOpen(true)
    // If you want to auto-fill the appointment modal with the new patient,
    // you'd need to pass that to the modal. The appointment modal supports selecting patients from context.
  }

  const handleAddPayment = (data: any) => {
    addPayment(data)
    setShowPaymentModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-sm text-slate-600">Create and manage patient appointments</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleQuickAddPatient} variant="outline">
            Add Patient
          </Button>

          <Button onClick={() => setShowPaymentModal(true)} variant="outline">
            Record Payment
          </Button>

          <Button
            onClick={() => {
              setSelectedAppointment(null)
              setIsModalOpen(true)
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Add Appointment
          </Button>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <Button variant={viewMode === 'list' ? 'default' : 'ghost'} onClick={() => setViewMode('list')}>
          List
        </Button>
        <Button variant={viewMode === 'calendar' ? 'default' : 'ghost'} onClick={() => setViewMode('calendar')}>
          Calendar
        </Button>
      </div>

      {viewMode === 'calendar' ? (
        <CalendarView
          appointments={appointments}
          selectedDate={selectedDate}
          onDateSelect={(d) => setSelectedDate(d)}
          onAppointmentSelect={(apt) => {
            setSelectedAppointment(apt)
            setIsModalOpen(true)
          }}
        />
      ) : (
        <AppointmentList
          appointments={appointments}
          onSelect={(apt) => {
            setSelectedAppointment(apt)
            setIsModalOpen(true)
          }}
          onStatusChange={handleStatusChange}
        />
      )}

      {isModalOpen && (
        <AppointmentModal
          appointment={selectedAppointment}
          services={services}
          patients={patients}
          onSave={(data: any) =>
            selectedAppointment ? handleUpdateAppointment(selectedAppointment.id, data) : handleAddAppointment(data)
          }
          onDelete={selectedAppointment ? () => handleDeleteAppointment(selectedAppointment.id) : undefined}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedAppointment(null)
          }}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          patient={null}
          onSave={handleAddPayment}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  )
}
