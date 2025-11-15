'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage system settings and configurations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
          <CardDescription>Coming soon: User management, roles, and system settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">Settings interface will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
