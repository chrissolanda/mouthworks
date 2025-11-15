'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function TreatmentReports() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Total Treatments</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">312</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Treatment Types</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">6</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Avg. Treatment Cost</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">$159</p>
          </CardContent>
        </Card>
      </div>

      {/* Treatment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Treatment Distribution</CardTitle>
            <CardDescription>Percentage of treatments performed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { treatment: 'Cleaning', count: 125, percentage: 40, color: 'bg-blue-500' },
                { treatment: 'Filling', count: 78, percentage: 25, color: 'bg-teal-500' },
                { treatment: 'Whitening', count: 62, percentage: 20, color: 'bg-green-500' },
                { treatment: 'Extraction', count: 31, percentage: 10, color: 'bg-yellow-500' },
                { treatment: 'Other', count: 16, percentage: 5, color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-slate-900">{item.treatment}</p>
                    <p className="text-sm font-semibold text-slate-900">{item.count}</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
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
            <CardTitle>Top Treatments This Month</CardTitle>
            <CardDescription>Most performed treatments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { rank: 1, treatment: 'Cleaning', count: 32, trending: 'up' },
                { rank: 2, treatment: 'Filling', count: 18, trending: 'up' },
                { rank: 3, treatment: 'Whitening', count: 15, trending: 'stable' },
                { rank: 4, treatment: 'Extraction', count: 8, trending: 'down' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-teal-600">#{item.rank}</span>
                    <div>
                      <p className="font-medium text-slate-900">{item.treatment}</p>
                      <p className="text-xs text-slate-600">{item.count} treatments</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      item.trending === 'up'
                        ? 'text-green-600'
                        : item.trending === 'down'
                        ? 'text-red-600'
                        : 'text-slate-600'
                    }`}
                  >
                    {item.trending === 'up' ? '↑' : item.trending === 'down' ? '↓' : '→'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
