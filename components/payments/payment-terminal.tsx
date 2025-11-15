'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, Printer, Trash2, Plus } from 'lucide-react'

interface Payment {
  id: string
  patientId: string
  patientName: string
  amount: number
  method: 'Cash' | 'Bank Transfer' | 'GCash'
  date: string
  status: 'Paid' | 'Partial' | 'Unpaid'
  treatment: string
  balance: number
  notes?: string
}

interface PaymentTerminalProps {
  patient: { patientId: string; patientName: string }
  payments: Payment[]
  totalBalance: number
  onAddPayment: () => void
  onDeletePayment: (id: string) => void
  filterStatus: string
  onFilterChange: (status: any) => void
}

export function PaymentTerminal({
  patient,
  payments,
  totalBalance,
  onAddPayment,
  onDeletePayment,
  filterStatus,
  onFilterChange,
}: PaymentTerminalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700'
      case 'Partial':
        return 'bg-yellow-100 text-yellow-700'
      case 'Unpaid':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Cash':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Bank Transfer':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'GCash':
        return 'bg-green-50 text-green-700 border-green-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="space-y-4">
      {/* Payment Terminal Header */}
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-slate-900">{patient.patientName}</CardTitle>
              <CardDescription>Patient ID: {patient.patientId}</CardDescription>
            </div>
            <CreditCard className="w-8 h-8 text-teal-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-600 font-semibold uppercase">Outstanding Balance</p>
              <p className="text-3xl font-bold text-red-600 mt-1">${totalBalance.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-semibold uppercase">Total Collected</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                ${payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {(['All', 'Paid', 'Partial'] as const).map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition ${
              filterStatus === status
                ? 'bg-teal-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Payment Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
          <CardDescription>{payments.length} transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 font-semibold text-slate-700">Date</th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-700">Treatment</th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-700">Amount</th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-700">Method</th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-700">Status</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No payment records
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-3 px-2 text-slate-600">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2 font-medium text-slate-900">{payment.treatment}</td>
                      <td className="py-3 px-2 font-semibold text-slate-900">${payment.amount.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getMethodColor(payment.method)}`}>
                          {payment.method}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => onDeletePayment(payment.id)}
                          className="text-red-600 hover:text-red-700 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* POS Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onAddPayment}
          className="bg-teal-600 hover:bg-teal-700 text-white h-12 font-semibold text-base"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Payment
        </Button>
        <Button
          variant="outline"
          className="h-12 font-semibold text-base"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print Receipt
        </Button>
      </div>
    </div>
  )
}
