'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  quantity: number
  minThreshold: number
  unit: string
  supplier: string
}

interface InventoryListProps {
  items: InventoryItem[]
  selectedId?: string
  onSelect: (item: InventoryItem) => void
}

export function InventoryList({ items, selectedId, onSelect }: InventoryListProps) {
  return (
    <div className="space-y-2">
      {items.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-slate-500 text-sm">
            No items found
          </CardContent>
        </Card>
      ) : (
        items.map((item) => {
          const isLowStock = item.quantity < item.minThreshold
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                selectedId === item.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-600">{item.supplier}</p>
                </div>
                {isLowStock ? (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.quantity}</p>
                  <p className="text-xs text-slate-600">{item.unit}</p>
                </div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    isLowStock
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {isLowStock ? 'Low' : 'OK'}
                </div>
              </div>
            </button>
          )
        })
      )}
    </div>
  )
}
