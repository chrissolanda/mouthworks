'use client'

import React from 'react'
import { type InventoryItem } from '@/context/app-context'

interface InventoryListProps {
  items: InventoryItem[]
  selectedId?: string
  onSelect: (item: InventoryItem) => void
}

export function InventoryList({ items, selectedId, onSelect }: InventoryListProps) {
  return (
    <div className="space-y-2">
      {items.length === 0 ? (
        <div className="p-4 text-sm text-slate-500">No items found</div>
      ) : (
        items.map((it) => (
          <button
            key={it.id}
            onClick={() => onSelect(it)}
            className={`w-full text-left px-3 py-2 rounded transition ${
              selectedId === it.id ? 'bg-teal-50 border-l-4 border-teal-600' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex justify-between">
              <div>
                <div className="font-medium text-slate-900">{it.name}</div>
                <div className="text-xs text-slate-500">{it.supplier} • {it.category}</div>
              </div>
              <div className="text-sm font-semibold text-slate-700">{it.quantity} {it.unit}</div>
            </div>
          </button>
        ))
      )}
    </div>
  )
}
