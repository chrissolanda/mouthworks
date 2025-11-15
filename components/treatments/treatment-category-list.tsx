'use client'

import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, Clock } from 'lucide-react'

interface Treatment {
  id: string
  name: string
  category: string
  description: string
  price?: number
  duration: number
  notes?: string
}

interface TreatmentCategoryListProps {
  treatments: Treatment[]
  selectedId?: string
  onSelect: (treatment: Treatment) => void
}

export function TreatmentCategoryList({
  treatments,
  selectedId,
  onSelect,
}: TreatmentCategoryListProps) {
  return (
    <div className="space-y-2">
      {treatments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-slate-500">
            No treatments found
          </CardContent>
        </Card>
      ) : (
        treatments.map((treatment) => (
          <button
            key={treatment.id}
            onClick={() => onSelect(treatment)}
            className={`w-full text-left p-4 rounded-lg border-2 transition ${
              selectedId === treatment.id
                ? 'border-teal-500 bg-teal-50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <h3 className="font-semibold text-slate-900">{treatment.name}</h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{treatment.description}</p>
            <div className="flex items-center justify-between mt-3 gap-2">
              {treatment.price && (
                <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                  <DollarSign className="w-3 h-3" />
                  ${treatment.price}
                </span>
              )}
              <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                <Clock className="w-3 h-3" />
                {treatment.duration} min
              </span>
            </div>
          </button>
        ))
      )}
    </div>
  )
}
