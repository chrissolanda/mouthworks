'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, PieChart, LineChart, Download } from 'lucide-react'
import { AppointmentReports } from './appointment-reports'
import { PaymentReports } from './payment-reports'
import { TreatmentReports } from './treatment-reports'
import { InventoryReports } from './inventory-reports'

interface ReportsPageProps {
  userRole: string
}

export function ReportsPage({ userRole }: ReportsPageProps) {
  const [activeReport, setActiveReport] = useState<'overview' | 'appointments' | 'payments' | 'treatments' | 'inventory'>('overview')

  const reports = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'appointments', label: 'Appointments', icon: BarChart },
    { id: 'payments', label: 'Payments', icon: BarChart },
    { id: 'treatments', label: 'Treatments', icon: PieChart },
    { id: 'inventory', label: 'Inventory', icon: LineChart },
  ]

  const renderReport = () => {
    switch (activeReport) {
      case 'appointments':
        return <AppointmentReports />
      case 'payments':
        return <PaymentReports />
      case 'treatments':
        return <TreatmentReports />
      case 'inventory':
        return <InventoryReports />
      default:
        return <OverviewReport />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600 mt-1">View business insights and analytics</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Report Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id as any)}
              className={`flex items-center gap-2 px-4 py-2 font-medium whitespace-nowrap transition ${
                activeReport === report.id
                  ? 'border-b-2 border-teal-600 text-teal-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {report.label}
            </button>
          )
        })}
      </div>

      {/* Report Content */}
      {renderReport()}
    </div>
  )
}

function OverviewReport() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Total Patients</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">248</p>
            <p className="text-xs text-green-600 font-medium mt-2">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">$18,450</p>
            <p className="text-xs text-green-600 font-medium mt-2">+8.5% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Appointments</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">156</p>
            <p className="text-xs text-blue-600 font-medium mt-2">89% confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Avg Treatment Time</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">45 min</p>
            <p className="text-xs text-slate-600 font-medium mt-2">Per appointment</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Appointments</CardTitle>
            <CardDescription>Appointments booked per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[65, 78, 92, 88, 101, 95, 115, 108, 125, 119, 132, 140].map((value, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="bg-teal-500 rounded-t w-6"
                    style={{ height: `${(value / 150) * 200}px` }}
                  />
                  <span className="text-xs text-slate-600">M{i + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[8200, 9100, 10500, 9800, 12100, 11500, 13200, 12800, 14500, 13900, 15600, 18450].map((value, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="bg-green-500 rounded-t w-6"
                    style={{ height: `${(value / 20000) * 200}px` }}
                  />
                  <span className="text-xs text-slate-600">M{i + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Treatments</CardTitle>
            <CardDescription>Most commonly booked services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Cleaning', count: 125, percentage: 40 },
                { name: 'Filling', count: 78, percentage: 25 },
                { name: 'Whitening', count: 62, percentage: 20 },
                { name: 'Extraction', count: 37, percentage: 12 },
                { name: 'Other', count: 10, percentage: 3 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-600">{item.count}</p>
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
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { method: 'Cash', percentage: 45, color: 'bg-blue-500' },
                { method: 'Bank Transfer', percentage: 35, color: 'bg-purple-500' },
                { method: 'GCash', percentage: 20, color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-slate-900">{item.method}</p>
                    <p className="text-sm font-semibold text-slate-900">{item.percentage}%</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
