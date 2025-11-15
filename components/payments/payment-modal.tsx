'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'

interface PaymentModalProps {
  patient: { patientId: string; patientName: string } | null
  onSave: (data: any) => void
  onClose: () => void
}

export function PaymentModal({ patient, onSave, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    patientId: patient?.patientId || '',
    patientName: patient?.patientName || '',
    amount: '',
    method: 'Cash' as 'Cash' | 'Bank Transfer' | 'GCash',
    treatment: 'Cleaning',
    status: 'Paid' as 'Paid' | 'Partial' | 'Unpaid',
    balance: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      amount: parseFloat(formData.amount),
      balance: parseFloat(formData.balance || '0'),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Record Payment</CardTitle>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Patient Name</label>
              <Input
                disabled
                value={formData.patientName}
                className="mt-1 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Treatment</label>
              <select
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded text-sm"
              >
                <option value="Cleaning">Cleaning</option>
                <option value="Extraction">Extraction</option>
                <option value="Whitening">Whitening</option>
                <option value="Filling">Filling</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Payment Amount</label>
              <Input
                required
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Payment Method</label>
              <select
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value as any })}
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded text-sm"
              >
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="GCash">GCash</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Payment Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded text-sm"
              >
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Remaining Balance</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add payment notes..."
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded text-sm"
                rows={2}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                Record Payment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
