'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, DollarSign, Clock, FileText } from 'lucide-react'

interface Treatment {
  id: string
  name: string
  category: string
  description: string
  price?: number
  duration: number
  notes?: string
}

interface TreatmentDetailsProps {
  treatment: Treatment
  onEdit: () => void
  onDelete: () => void
}

export function TreatmentDetails({ treatment, onEdit, onDelete }: TreatmentDetailsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{treatment.name}</CardTitle>
              <CardDescription>{treatment.category}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={onEdit} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button onClick={onDelete} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 leading-relaxed">{treatment.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {treatment.price && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <CardTitle className="text-lg">Price</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-slate-900">${treatment.price}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Duration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">{treatment.duration} min</p>
          </CardContent>
        </Card>
      </div>

      {treatment.notes && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-600" />
              <CardTitle className="text-lg">Notes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">{treatment.notes}</p>
          </CardContent>
        </Card>
      )}

      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
        Assign to Patient
      </Button>
    </div>
  )
}
