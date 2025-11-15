'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarView } from './calendar-view'
import { AppointmentList } from './appointment-list'
import { AppointmentModal } from './appointment-modal'
import { Plus, Calendar } from 'lucide-react'
import { useAppContext } from '@/context/app-context'

interface AppointmentManagementProps {
  userRole: string
}

export function AppointmentManagement({ userRole }: AppointmentManagementProps) {
  const { appointments, addAppointment, updateAppointment, deleteAppointment, patients } = useAppContext()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')

  const services = ['Cleaning', 'Extraction', 'Whitening', 'Orthodontic', 'Root Canal', 'Filling']

  const todayAppointments = appointments.filter((a) => a.date === selectedDate)

  const handleAddAppointment = (formData: any) => {
    addAppointment({
      ...formData,
      status: 'Pending',
    })
    setIsModalOpen(false)
  }

  const handleUpdateAppointment = (id: string, formData: any) => {
    updateAppointment(id, formData)
    setSelectedAppointment(null)
    setIsModalOpen(false)
  }

  const handleDeleteAppointment = (id: string) => {
    deleteAppointment(id)
    setSelectedAppointment(null)
  }

  const handleStatusChange = (id: string, newStatus: any) => {
    updateAppointment(id, { status: newStatus })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointment Management</h1>
          <p className="text-slate-600 mt-1">Book, reschedule, and manage appointments</p>
        </div>
        <Button
          onClick={() => {
            setSelectedAppointment(null)
            setIsModalOpen(true)
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('calendar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            viewMode === 'calendar'
              ? 'bg-teal-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Calendar
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            viewMode === 'list'
              ? 'bg-teal-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          List
        </button>
      </div>

      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <CalendarView
              appointments={appointments}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onAppointmentSelect={(apt) => {
                setSelectedAppointment(apt)
                setIsModalOpen(true)
              }}
            />
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Appointments</CardTitle>
                <CardDescription>{todayAppointments.length} appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {todayAppointments.length === 0 ? (
                  <p className="text-sm text-slate-500">No appointments today</p>
                ) : (
                  todayAppointments.map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => {
                        setSelectedAppointment(apt)
                        setIsModalOpen(true)
                      }}
                      className="w-full text-left p-2 rounded hover:bg-slate-100 transition"
                    >
                      <p className="font-medium text-sm text-slate-900">{apt.time}</p>
                      <p className="text-xs text-slate-600">{apt.patientName}</p>
                      <p className="text-xs text-slate-500">{apt.service}</p>
                    </button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
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
          onSave={selectedAppointment
            ? (data) => handleUpdateAppointment(selectedAppointment.id, data)
            : handleAddAppointment}
          onDelete={
            selectedAppointment
              ? () => handleDeleteAppointment(selectedAppointment.id)
              : undefined
          }
          onClose={() => {
            setIsModalOpen(false)
            setSelectedAppointment(null)
          }}
        />
      )}
    </div>
  )
}
