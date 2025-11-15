'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PatientList } from './patient-list'
import { PatientDetail } from './patient-detail'
import { PatientModal } from './patient-modal'
import { Search, Plus } from 'lucide-react'
import { useAppContext, type Patient } from '@/context/app-context'

interface PatientManagementProps {
  userRole: string
}

export function PatientManagement({ userRole }: PatientManagementProps) {
  const { patients, addPatient, updatePatient, deletePatient } = useAppContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'name' | 'recent' | 'balance'>('recent')

  const filteredPatients = patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'recent')
        return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
      return b.balance - a.balance
    })

  const handleAddPatient = (formData: any) => {
    addPatient({
      ...formData,
      lastVisit: new Date().toISOString().split('T')[0],
      balance: 0,
      hasAppointment: false,
    })
    setIsModalOpen(false)
  }

  const handleUpdatePatient = (id: string, formData: any) => {
    updatePatient(id, formData)
    setSelectedPatient(null)
    setIsModalOpen(false)
  }

  const handleDeletePatient = (id: string) => {
    deletePatient(id)
    setSelectedPatient(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Patient Management</h1>
          <p className="text-slate-600 mt-1">Manage patient profiles and records</p>
        </div>
        <Button
          onClick={() => {
            setSelectedPatient(null)
            setIsModalOpen(true)
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Patient Search & List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Patients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600 uppercase">Sort By</p>
                <div className="space-y-1">
                  {(['name', 'recent', 'balance'] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition ${
                        sortBy === option
                          ? 'bg-teal-100 text-teal-700 font-medium'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {option === 'name' && 'A-Z'}
                      {option === 'recent' && 'Recent'}
                      {option === 'balance' && 'Balance'}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <PatientList
              patients={filteredPatients}
              selectedId={selectedPatient?.id}
              onSelect={setSelectedPatient}
            />
          </div>
        </div>

        {/* Right Panel: Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <PatientDetail
              patient={selectedPatient}
              onEdit={() => setIsModalOpen(true)}
              onDelete={() => handleDeletePatient(selectedPatient.id)}
            />
          ) : (
            <Card>
              <CardContent className="pt-12 text-center">
                <p className="text-slate-500">Select a patient to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {isModalOpen && (
        <PatientModal
          patient={selectedPatient}
          onSave={selectedPatient ? 
            (data) => handleUpdatePatient(selectedPatient.id, data) :
            handleAddPatient
          }
          onClose={() => {
            setIsModalOpen(false)
            setSelectedPatient(null)
          }}
        />
      )}
    </div>
  )
}
