'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Calendar, MapPin, AlertCircle, Edit, Trash2 } from 'lucide-react'

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  gender: 'M' | 'F' | 'Other'
  address: string
  lastVisit: string
  balance: number
  hasAppointment: boolean
}

interface PatientDetailProps {
  patient: Patient
  onEdit: () => void
  onDelete: () => void
}

export function PatientDetail({ patient, onEdit, onDelete }: PatientDetailProps) {
  const age = new Date().getFullYear() - new Date(patient.dob).getFullYear()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{patient.name}</CardTitle>
              <CardDescription>Patient ID: {patient.id}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onEdit}
                variant="outline"
                size="sm"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                onClick={onDelete}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Phone</p>
                <p className="font-medium text-slate-900">{patient.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Email</p>
                <p className="font-medium text-slate-900 truncate">{patient.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Age</p>
                <p className="font-medium text-slate-900">{age} years</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Gender</p>
              <p className="font-medium text-slate-900">{patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Address</p>
              <p className="text-slate-900">{patient.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {patient.balance > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-orange-900">
              <AlertCircle className="w-5 h-5" />
              Outstanding Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-900">${patient.balance.toFixed(2)}</p>
            <p className="text-sm text-orange-700 mt-2">This patient has an unpaid balance.</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Last Visit</span>
              <span className="font-medium text-slate-900">
                {new Date(patient.lastVisit).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full">
          View Appointments
        </Button>
        <Button variant="outline" className="w-full">
          View Payment History
        </Button>
      </div>
    </div>
  )
}
