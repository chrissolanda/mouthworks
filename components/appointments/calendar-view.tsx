'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Appointment {
  id: string
  patientName: string
  patientId: string
  date: string
  time: string
  service: string
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  notes: string
}

interface CalendarViewProps {
  appointments: Appointment[]
  selectedDate: string
  onDateSelect: (date: string) => void
  onAppointmentSelect: (appointment: Appointment) => void
}

export function CalendarView({
  appointments,
  selectedDate,
  onDateSelect,
  onAppointmentSelect,
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const days = []
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const getAppointmentsForDate = (date: string) => {
    return appointments.filter((a) => a.date === date)
  }

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ]

  const selectedDateObj = new Date(selectedDate + 'T00:00:00')
  const appointmentsForSelectedDate = getAppointmentsForDate(selectedDate)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-100 text-blue-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'Cancelled':
        return 'bg-slate-100 text-slate-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Mini Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-1 hover:bg-slate-100 rounded transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <CardTitle className="text-lg">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-1 hover:bg-slate-100 rounded transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-xs text-slate-600 py-2">
                {day}
              </div>
            ))}
            {days.map((day, idx) => {
              const dateStr =
                day !== null
                  ? formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                  : null
              const hasAppointments = dateStr ? getAppointmentsForDate(dateStr).length > 0 : false
              const isSelected = dateStr === selectedDate

              return (
                <button
                  key={idx}
                  onClick={() => dateStr && onDateSelect(dateStr)}
                  disabled={!dateStr}
                  className={`p-2 rounded text-sm font-medium transition ${
                    !dateStr
                      ? 'text-slate-300'
                      : isSelected
                      ? 'bg-teal-600 text-white'
                      : hasAppointments
                      ? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots for Selected Date */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedDateObj.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const appointmentAtSlot = appointmentsForSelectedDate.find((a) => a.time === slot)

              return (
                <div key={slot} className="text-center">
                  {appointmentAtSlot ? (
                    <button
                      onClick={() => onAppointmentSelect(appointmentAtSlot)}
                      className={`w-full p-2 rounded text-xs font-medium transition cursor-pointer ${getStatusColor(
                        appointmentAtSlot.status
                      )}`}
                    >
                      <p className="font-semibold">{slot}</p>
                      <p className="truncate text-xs">{appointmentAtSlot.patientName}</p>
                    </button>
                  ) : (
                    <div className="p-2 rounded border-2 border-dashed border-slate-300 text-xs text-slate-500">
                      {slot}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
