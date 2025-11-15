'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

export function PaymentReports() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600 mt-2">$18,450</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Pending Payments</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">$2,840</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Avg. Payment</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">$156</p>
              </div>
              <TrendingUp className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Collection Rate</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">92%</p>
              </div>
              <DollarSign className="w-8 h-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Status Distribution</CardTitle>
            <CardDescription>Breakdown of payment statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'Paid', amount: 16980, percentage: 92 },
                { status: 'Partial', amount: 1470, percentage: 8 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-slate-900">{item.status}</p>
                    <p className="text-sm font-semibold text-slate-900">${item.amount}</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
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
            <CardTitle>Revenue Trend (Last 6 Months)</CardTitle>
            <CardDescription>Monthly revenue comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[
                { month: 'Jul', value: 12500 },
                { month: 'Aug', value: 13200 },
                { month: 'Sep', value: 14800 },
                { month: 'Oct', value: 15600 },
                { month: 'Nov', value: 17200 },
                { month: 'Dec', value: 18450 },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="bg-green-500 rounded-t w-8"
                    style={{ height: `${(item.value / 20000) * 200}px` }}
                  />
                  <span className="text-xs text-slate-600">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
