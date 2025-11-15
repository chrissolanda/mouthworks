'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Package, AlertCircle, DollarSign, Calendar } from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  minThreshold: number
  unit: string
  supplier: string
  lastRestocked: string
  price?: number
}

interface InventoryDetailProps {
  item: InventoryItem
  onEdit: () => void
  onDelete: () => void
}

export function InventoryDetail({ item, onEdit, onDelete }: InventoryDetailProps) {
  const isLowStock = item.quantity < item.minThreshold
  const stockPercentage = (item.quantity / item.minThreshold) * 100

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{item.name}</CardTitle>
              <CardDescription>{item.category}</CardDescription>
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
          <p className="text-slate-700">Supplier: {item.supplier}</p>
        </CardContent>
      </Card>

      {/* Stock Status */}
      <Card className={isLowStock ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className={`w-5 h-5 ${isLowStock ? 'text-orange-600' : 'text-green-600'}`} />
            Stock Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-3xl font-bold text-slate-900">{item.quantity}</p>
              <p className="text-sm text-slate-600 mt-1">{item.unit}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Minimum Threshold</span>
                <span className="font-medium text-slate-900">{item.minThreshold}</span>
              </div>
              <div className="w-full bg-slate-300 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition ${
                    isLowStock ? 'bg-orange-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                />
              </div>
            </div>
            {isLowStock && (
              <div className="flex items-start gap-2 pt-2">
                <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                <p className="text-sm text-orange-700">
                  Stock is below minimum threshold. Please restock soon.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {item.price && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <CardTitle className="text-lg">Unit Price</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-slate-900">${item.price}</p>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Last Restocked</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-900 font-medium">
              {new Date(item.lastRestocked).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
        Request Restock
      </Button>
    </div>
  )
}
