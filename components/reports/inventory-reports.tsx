'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, AlertTriangle, TrendingDown } from 'lucide-react'

export function InventoryReports() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Items</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">23</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Low Stock Items</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">5</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Inventory Value</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">$12,450</p>
              </div>
              <TrendingDown className="w-8 h-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Avg Stock Level</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">78%</p>
              </div>
              <Package className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Items by Category</CardTitle>
            <CardDescription>Inventory distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Cleaning Supplies', count: 6, percentage: 26 },
                { category: 'Gloves', count: 5, percentage: 22 },
                { category: 'Filling Material', count: 4, percentage: 17 },
                { category: 'Anesthesia', count: 4, percentage: 17 },
                { category: 'Braces Wire', count: 2, percentage: 9 },
                { category: 'Other', count: 2, percentage: 9 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-slate-900">{item.category}</p>
                    <p className="text-sm font-semibold text-slate-900">{item.count}</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Usage Trend</CardTitle>
            <CardDescription>Monthly average stock usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[
                { month: 'Jul', value: 60 },
                { month: 'Aug', value: 68 },
                { month: 'Sep', value: 72 },
                { month: 'Oct', value: 75 },
                { month: 'Nov', value: 78 },
                { month: 'Dec', value: 82 },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="bg-purple-500 rounded-t w-8"
                    style={{ height: `${(item.value / 100) * 200}px` }}
                  />
                  <span className="text-xs text-slate-600">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Low Stock Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { item: 'Lidocaine Anesthetic', current: 3, minimum: 10 },
              { item: 'Nitrile Gloves', current: 20, minimum: 30 },
              { item: 'Ultrasonic Scaler Tips', current: 8, minimum: 12 },
              { item: 'Orthodontic Braces Wire', current: 15, minimum: 20 },
              { item: 'Suction Tips', current: 8, minimum: 15 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-white rounded">
                <p className="font-medium text-slate-900">{item.item}</p>
                <p className="text-sm text-orange-700 font-semibold">
                  {item.current} / {item.minimum}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
