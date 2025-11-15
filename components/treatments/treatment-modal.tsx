'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'

interface Treatment {
  id: string
  name: string
  category: string
  description: string
  price?: number
  duration: number
  notes?: string
}

interface TreatmentModalProps {
  treatment: Treatment | null
  categories: string[]
  onSave: (data: any) => void
  onClose: () => void
}

export function TreatmentModal({
  treatment,
  categories,
  onSave,
  onClose,
}: TreatmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0] || 'Cleaning',
    description: '',
    price: '',
    duration: 30,
    notes: '',
  })

  useEffect(() => {
    if (treatment) {
      setFormData({
        name: treatment.name,
        category: treatment.category,
        description: treatment.description,
        price: treatment.price?.toString() || '',
        duration: treatment.duration,
        notes: treatment.notes || '',
      })
    }
  }, [treatment])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: formData.price ? parseFloat(formData.price) : undefined,
      duration: formData.duration,
      notes: formData.notes,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{treatment ? 'Edit Treatment' : 'Add New Treatment'}</CardTitle>
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
              <label className="text-sm font-medium text-slate-700">Treatment Name</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Regular Cleaning"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the treatment..."
                className="w-full mt-1 px-3 py-2 border border-slate-200 rounded text-sm"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Duration (minutes)</label>
                <Input
                  required
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Price (optional)</label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Notes (optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes..."
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
                {treatment ? 'Update' : 'Add'} Treatment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
