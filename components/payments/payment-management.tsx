'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Plus } from 'lucide-react'
import { PatientPaymentList } from './patient-payment-list'
import { PaymentTerminal } from './payment-terminal'
import { PaymentModal } from './payment-modal'
import { useAppContext } from '@/context/app-context'

interface PaymentManagementProps {
  userRole: string
}

export function PaymentManagement({ userRole }: PaymentManagementProps) {
  const { payments, addPayment, deletePayment, patients } = useAppContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'All' | 'Paid' | 'Partial' | 'Unpaid'>('All')

  const uniquePatients = Array.from(
    new Map(
      patients.map((p) => [p.id, { patientId: p.id, patientName: p.name }])
    ).values()
  )

  const filteredPatients = uniquePatients.filter((p) =>
    p.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const patientPayments = selectedPatient
    ? payments.filter((p) => p.patientId === selectedPatient.patientId)
    : []

  const filteredPayments =
    filterStatus === 'All'
      ? patientPayments
      : patientPayments.filter((p) => p.status === filterStatus)

  const totalBalance = patientPayments.reduce((sum, p) => sum + p.balance, 0)
  const totalOutstanding = payments.reduce((sum, p) => sum + (p.balance > 0 ? p.balance : 0), 0)

  const handleAddPayment = (formData: any) => {
    addPayment({
      ...formData,
      date: new Date().toISOString().split('T')[0],
    })
    setIsModalOpen(false)
  }

  const handleDeletePayment = (id: string) => {
    deletePayment(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payment Management</h1>
          <p className="text-slate-600 mt-1">Record and track patient payments</p>
        </div>
        <Button
          onClick={() => {
            setSelectedPatient(null)
            setIsModalOpen(true)
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Record Payment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Total Pending Payments</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">${totalOutstanding.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Patients with Balance</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {payments.filter((p) => p.balance > 0).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Total Collected</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ${payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel: Patient Search */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Patients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <PatientPaymentList
              patients={filteredPatients}
              selectedId={selectedPatient?.patientId}
              onSelect={setSelectedPatient}
            />
          </div>
        </div>

        {/* Right Panel: Payment Terminal */}
        <div className="lg:col-span-3">
          {selectedPatient ? (
            <PaymentTerminal
              patient={selectedPatient}
              payments={filteredPayments}
              totalBalance={totalBalance}
              onAddPayment={() => setIsModalOpen(true)}
              onDeletePayment={handleDeletePayment}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />
          ) : (
            <Card>
              <CardContent className="pt-12 text-center">
                <p className="text-slate-500">Select a patient to process payments</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {isModalOpen && (
        <PaymentModal
          patient={selectedPatient}
          onSave={handleAddPayment}
          onClose={() => {
            setIsModalOpen(false)
          }}
        />
      )}
    </div>
  )
}
