'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Plus } from 'lucide-react'
import { TreatmentCategoryList } from './treatment-category-list'
import { TreatmentDetails } from './treatment-details'
import { TreatmentModal } from './treatment-modal'
import { useAppContext, type Treatment } from '@/context/app-context'

interface TreatmentManagementProps {
  userRole: string
}

export function TreatmentManagement({ userRole }: TreatmentManagementProps) {
  const { treatments, addTreatment, updateTreatment, deleteTreatment } = useAppContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Cleaning')
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = ['Cleaning', 'Extraction', 'Orthodontic', 'Whitening', 'Root Canal', 'Filling']

  const filteredTreatments = treatments
    .filter((t) => t.category === selectedCategory)
    .filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const handleAddTreatment = (formData: any) => {
    addTreatment(formData)
    setIsModalOpen(false)
  }

  const handleUpdateTreatment = (id: string, formData: any) => {
    updateTreatment(id, formData)
    setSelectedTreatment(null)
    setIsModalOpen(false)
  }

  const handleDeleteTreatment = (id: string) => {
    deleteTreatment(id)
    setSelectedTreatment(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Treatment Management</h1>
          <p className="text-slate-600 mt-1">Manage treatment types and services</p>
        </div>
        <Button
          onClick={() => {
            setSelectedTreatment(null)
            setIsModalOpen(true)
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Treatment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel: Categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Treatment Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => {
                  const count = treatments.filter((t) => t.category === category).length
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                        selectedCategory === category
                          ? 'bg-teal-600 text-white'
                          : 'hover:bg-slate-100 text-slate-900'
                      }`}
                    >
                      <span className="font-medium text-sm">{category}</span>
                      <span className={`text-xs font-semibold ${
                        selectedCategory === category
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-200 text-slate-700'
                      } px-2 py-1 rounded`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Panel: Treatment List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Treatments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search treatments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <TreatmentCategoryList
              treatments={filteredTreatments}
              selectedId={selectedTreatment?.id}
              onSelect={setSelectedTreatment}
            />
          </div>
        </div>

        {/* Right Panel: Treatment Details */}
        <div className="lg:col-span-2">
          {selectedTreatment ? (
            <TreatmentDetails
              treatment={selectedTreatment}
              onEdit={() => setIsModalOpen(true)}
              onDelete={() => handleDeleteTreatment(selectedTreatment.id)}
            />
          ) : (
            <Card>
              <CardContent className="pt-12 text-center">
                <p className="text-slate-500">Select a treatment to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {isModalOpen && (
        <TreatmentModal
          treatment={selectedTreatment}
          categories={categories}
          onSave={
            selectedTreatment
              ? (data) => handleUpdateTreatment(selectedTreatment.id, data)
              : handleAddTreatment
          }
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTreatment(null)
          }}
        />
      )}
    </div>
  )
}
