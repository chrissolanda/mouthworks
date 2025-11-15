'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, Shield, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StaffModal } from './staff-modal'
import { useAppContext, type Staff } from '@/context/app-context'

export function StaffManagement() {
  const { staff, addStaff, updateStaff, deleteStaff } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddStaff = (data: Omit<Staff, 'id'>) => {
    addStaff(data)
    setShowModal(false)
  }

  const handleEditStaff = (data: Omit<Staff, 'id'>) => {
    if (!editingStaff) return
    updateStaff(editingStaff.id, data)
    setEditingStaff(null)
    setShowModal(false)
  }

  const handleDeleteStaff = (id: string) => {
    deleteStaff(id)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'dentist':
        return 'bg-blue-100 text-blue-800'
      case 'receptionist':
        return 'bg-purple-100 text-purple-800'
      case 'assistant':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search staff by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            setEditingStaff(null)
            setShowModal(true)
          }}
          className="gap-2 bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="w-4 h-4" />
          Add Staff
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Specialization
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Status
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((s) => (
              <tr
                key={s.id}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-slate-900">
                  {s.name}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                      s.role
                    )}`}
                  >
                    {s.role.charAt(0).toUpperCase() + s.role.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {s.specialization || '-'}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      s.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingStaff(s)
                        setShowModal(true)
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStaff(s.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StaffModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingStaff(null)
        }}
        onSubmit={editingStaff ? handleEditStaff : handleAddStaff}
        initialData={editingStaff}
        isEditing={!!editingStaff}
      />
    </div>
  )
}
