'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface Staff {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'dentist' | 'receptionist' | 'assistant'
  specialization?: string
  status: 'active' | 'inactive'
  joinDate: string
}

interface StaffModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Omit<Staff, 'id'>) => void
  initialData?: Staff | null
  isEditing?: boolean
}

// Fixed: explicitly type form state so TS knows `role` and `status` are unions,
// not single literal narrowed types (prevents comparisons like role === 'dentist' being flagged).
type StaffForm = {
  name: string
  email: string
  phone: string
  role: Staff['role']
  specialization: string
  status: Staff['status']
  joinDate: string
}

export function StaffModal({
  open,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}: StaffModalProps) {
  const [formData, setFormData] = useState<StaffForm>({
    name: '',
    email: '',
    phone: '',
    role: 'receptionist',
    specialization: '',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        role: initialData.role,
        specialization: initialData.specialization || '',
        status: initialData.status,
        joinDate: initialData.joinDate,
      })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'receptionist',
        specialization: '',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
      })
    }
  }, [initialData, open])

  const handleSubmit = () => {
    onSubmit({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      specialization: formData.specialization || undefined,
      status: formData.status,
      joinDate: formData.joinDate,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <Input
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone
            </label>
            <Input
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as Staff['role'],
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="receptionist">Receptionist</option>
              <option value="dentist">Dentist</option>
              <option value="assistant">Assistant</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {formData.role === 'dentist' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Specialization
              </label>
              <Input
                placeholder="e.g., Orthodontics, Cosmetic Dentistry"
                value={formData.specialization}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Staff['status'],
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Join Date
            </label>
            <Input
              type="date"
              value={formData.joinDate}
              onChange={(e) =>
                setFormData({ ...formData, joinDate: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {isEditing ? 'Update' : 'Add'} Staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
