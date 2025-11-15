'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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

interface AppointmentListProps {
  appointments: Appointment[]
  onSelect: (appointment: Appointment) => void
  onStatusChange: (id: string, status: Appointment['status']) => void
}

export function AppointmentList({ appointments, onSelect, onStatusChange }: AppointmentListProps) {
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

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime()
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Appointments</CardTitle>
        <CardDescription>{appointments.length} total appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Patient</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Date & Time</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.map((apt) => (
                <tr key={apt.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-medium text-slate-900">{apt.patientName}</td>
                  <td className="py-3 px-4 text-slate-600">
                    {new Date(apt.date).toLocaleDateString()} at {apt.time}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{apt.service}</td>
                  <td className="py-3 px-4">
                    <select
                      value={apt.status}
                      onChange={(e) => onStatusChange(apt.id, e.target.value as Appointment['status'])}
                      className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${getStatusColor(apt.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onSelect(apt)}
                      className="text-teal-600 hover:text-teal-700 font-medium text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
