'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar, AlertCircle, CreditCard } from 'lucide-react'

interface DashboardProps {
  userRole: 'patient' | 'receptionist' | 'dentist' | 'admin'
}

export function Dashboard({ userRole }: DashboardProps) {
  const stats = [
    {
      title: 'Total Patients',
      value: '248',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Appointments Today',
      value: '12',
      icon: Calendar,
      color: 'bg-teal-100 text-teal-600',
    },
    {
      title: 'Pending Payments',
      value: '$5,240',
      icon: CreditCard,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Low Inventory',
      value: '3 items',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600',
    },
  ]

  const isPatient = userRole === 'patient'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back! Here's your clinic overview.</p>
      </div>

      {!isPatient && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-600 font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Latest bookings and status updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200"
                >
                  <div>
                    <p className="font-medium text-slate-900">John Doe</p>
                    <p className="text-sm text-slate-500">Cleaning • 2:00 PM</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {!isPatient && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white justify-start">
                + Add Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                + Add Patient
              </Button>
              <Button variant="outline" className="w-full justify-start">
                + Record Payment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                + Add Treatment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
