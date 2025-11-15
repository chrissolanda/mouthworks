'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react'

export function AppointmentReports() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Appointments</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">312</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Confirmed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">278</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Cancelled</p>
                <p className="text-3xl font-bold text-red-600 mt-2">22</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Confirmation Rate</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">89%</p>
              </div>
              <Clock className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Status</CardTitle>
            <CardDescription>Breakdown of appointment statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'Completed', count: 245, percentage: 79 },
                { status: 'Confirmed', count: 33, percentage: 11 },
                { status: 'Pending', count: 12, percentage: 4 },
                { status: 'Cancelled', count: 22, percentage: 7 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-slate-900">{item.status}</p>
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
            <CardTitle>Daily Appointments (This Week)</CardTitle>
            <CardDescription>Appointments per day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[
                { day: 'Mon', value: 28 },
                { day: 'Tue', value: 35 },
                { day: 'Wed', value: 42 },
                { day: 'Thu', value: 38 },
                { day: 'Fri', value: 45 },
                { day: 'Sat', value: 22 },
                { day: 'Sun', value: 12 },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="bg-blue-500 rounded-t w-8"
                    style={{ height: `${(item.value / 50) * 200}px` }}
                  />
                  <span className="text-xs text-slate-600">{item.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
