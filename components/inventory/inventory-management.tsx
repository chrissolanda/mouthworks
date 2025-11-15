'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Plus, AlertTriangle } from 'lucide-react'
import { InventoryList } from './inventory-list'
import { InventoryDetail } from './inventory-detail'
import { InventoryModal } from './inventory-modal'
import { SupplyRequestList } from './supply-request-list'
import { useAppContext } from '@/context/app-context'

interface InventoryManagementProps {
  userRole: string
}

export function InventoryManagement({ userRole }: InventoryManagementProps) {
  const { inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem, supplyRequests, updateSupplyRequest } = useAppContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')
  const [showLowStock, setShowLowStock] = useState(false)
  const [activeTab, setActiveTab] = useState('inventory')

  const categories = ['Gloves', 'Anesthesia', 'Braces Wire', 'Filling Material', 'Cleaning Supplies', 'Other']

  const lowStockItems = inventory.filter((item) => item.quantity < item.minThreshold)

  const filteredInventory = inventory
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) => filterCategory === 'All' || item.category === filterCategory)
    .filter((item) => !showLowStock || item.quantity < item.minThreshold)

  const handleAddItem = (formData) => {
    addInventoryItem(formData)
    setIsModalOpen(false)
  }

  const handleUpdateItem = (id, formData) => {
    updateInventoryItem(id, formData)
    setSelectedItem(null)
    setIsModalOpen(false)
  }

  const handleDeleteItem = (id) => {
    deleteInventoryItem(id)
    setSelectedItem(null)
  }

  const handleApproveRequest = (id) => {
    updateSupplyRequest(id, { status: 'Approved' })
  }

  const handleRejectRequest = (id) => {
    updateSupplyRequest(id, { status: 'Rejected' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-600 mt-1">Track dental supplies and stock levels</p>
        </div>
        <Button
          onClick={() => {
            setSelectedItem(null)
            setIsModalOpen(true)
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900">
                  {lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''} below minimum threshold
                </p>
                <p className="text-sm text-orange-700 mt-1">
                  Please restock these items soon to avoid running out.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Total Items</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{inventory.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Low Stock Items</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{lowStockItems.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">Pending Requests</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {supplyRequests.filter((r) => r.status === 'Pending').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === 'inventory'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Inventory Items
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === 'requests'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Supply Requests ({supplyRequests.filter((r) => r.status === 'Pending').length})
        </button>
      </div>

      {activeTab === 'inventory' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel: Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Category</p>
                  <div className="space-y-1">
                    {['All', ...categories].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition ${
                          filterCategory === cat
                            ? 'bg-teal-100 text-teal-700 font-medium'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLowStock}
                    onChange={(e) => setShowLowStock(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-slate-700">Low Stock Only</span>
                </label>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel: Items List */}
          <div className="lg:col-span-1">
            <InventoryList
              items={filteredInventory}
              selectedId={selectedItem?.id}
              onSelect={setSelectedItem}
            />
          </div>

          {/* Right Panel: Item Details */}
          <div className="lg:col-span-2">
            {selectedItem ? (
              <InventoryDetail
                item={selectedItem}
                onEdit={() => setIsModalOpen(true)}
                onDelete={() => handleDeleteItem(selectedItem.id)}
              />
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <p className="text-slate-500">Select an item to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <SupplyRequestList
          requests={supplyRequests}
          onApprove={handleApproveRequest}
          onReject={handleRejectRequest}
        />
      )}

      {isModalOpen && (
        <InventoryModal
          item={selectedItem}
          categories={categories}
          onSave={
            selectedItem
              ? (data) => handleUpdateItem(selectedItem.id, data)
              : handleAddItem
          }
          onClose={() => {
            setIsModalOpen(false)
            setSelectedItem(null)
          }}
        />
      )}
    </div>
  )
}
