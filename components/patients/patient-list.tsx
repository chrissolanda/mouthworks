'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, Calendar } from 'lucide-react'

interface Patient {
  id: string
  name: string
  phone: string
  lastVisit: string
  balance: number
  hasAppointment: boolean
}

interface PatientListProps {
  patients: Patient[]
  selectedId?: string
  onSelect: (patient: Patient) => void
}

export function PatientList({ patients, selectedId, onSelect }: PatientListProps) {
  return (
    <div className="space-y-2">
      {patients.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-slate-500">
            No patients found
          </CardContent>
        </Card>
      ) : (
        patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelect(patient)}
            className={`w-full text-left p-4 rounded-lg border-2 transition ${
              selectedId === patient.id
                ? 'border-teal-500 bg-teal-50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">{patient.name}</h3>
                <p className="text-sm text-slate-600">{patient.phone}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {patient.hasAppointment && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    <Calendar className="w-3 h-3" />
                    Today
                  </span>
                )}
                {patient.balance > 0 && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                    <AlertCircle className="w-3 h-3" />
                    ${patient.balance}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))
      )}
    </div>
  )
}
