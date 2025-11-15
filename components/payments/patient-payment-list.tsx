'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface PatientPaymentListProps {
  patients: Array<{ patientId: string; patientName: string }>
  selectedId?: string
  onSelect: (patient: { patientId: string; patientName: string }) => void
}

export function PatientPaymentList({ patients, selectedId, onSelect }: PatientPaymentListProps) {
  return (
    <div className="space-y-2">
      {patients.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-slate-500 text-sm">
            No patients found
          </CardContent>
        </Card>
      ) : (
        patients.map((patient) => (
          <button
            key={patient.patientId}
            onClick={() => onSelect(patient)}
            className={`w-full text-left p-4 rounded-lg border-2 transition ${
              selectedId === patient.patientId
                ? 'border-teal-500 bg-teal-50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <h3 className="font-semibold text-slate-900">{patient.patientName}</h3>
            <p className="text-xs text-slate-500 mt-1">Patient ID: {patient.patientId}</p>
          </button>
        ))
      )}
    </div>
  )
}
