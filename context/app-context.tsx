'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  gender: 'M' | 'F' | 'Other'
  address: string
  lastVisit: string
  balance: number
  hasAppointment: boolean
}

export interface Staff {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'dentist' | 'receptionist' | 'assistant'
  specialization?: string
  status: 'active' | 'inactive'
  joinDate: string
}

export interface Appointment {
  id: string
  patientName: string
  patientId: string
  date: string
  time: string
  service: string
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  notes: string
  staffId?: string
}

export interface Treatment {
  id: string
  name: string
  category: string
  description: string
  price?: number
  duration: number
  notes?: string
}

export interface Payment {
  id: string
  patientId: string
  patientName: string
  amount: number
  method: 'Cash' | 'Bank Transfer' | 'GCash'
  date: string
  status: 'Paid' | 'Partial' | 'Unpaid'
  treatment: string
  balance: number
  notes?: string
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  minThreshold: number
  unit: string
  supplier: string
  lastRestocked: string
  price?: number
}

export interface SupplyRequest {
  id: string
  itemId: string
  itemName: string
  quantity: number
  requestedBy: string
  requestedDate: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

interface AppContextType {
  // Patient management
  patients: Patient[]
  addPatient: (patient: Omit<Patient, 'id'>) => void
  updatePatient: (id: string, patient: Partial<Patient>) => void
  deletePatient: (id: string) => void
  getPatientById: (id: string) => Patient | undefined
  
  // Staff management
  staff: Staff[]
  addStaff: (staff: Omit<Staff, 'id'>) => void
  updateStaff: (id: string, staff: Partial<Staff>) => void
  deleteStaff: (id: string) => void
  getStaffById: (id: string) => Staff | undefined

  // Appointment management
  appointments: Appointment[]
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void
  deleteAppointment: (id: string) => void
  getAppointmentById: (id: string) => Appointment | undefined

  // Treatment management
  treatments: Treatment[]
  addTreatment: (treatment: Omit<Treatment, 'id'>) => void
  updateTreatment: (id: string, treatment: Partial<Treatment>) => void
  deleteTreatment: (id: string) => void
  getTreatmentById: (id: string) => Treatment | undefined

  // Payment management
  payments: Payment[]
  addPayment: (payment: Omit<Payment, 'id'>) => void
  updatePayment: (id: string, payment: Partial<Payment>) => void
  deletePayment: (id: string) => void
  getPaymentById: (id: string) => Payment | undefined

  // Inventory management
  inventory: InventoryItem[]
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'lastRestocked'>) => void
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void
  deleteInventoryItem: (id: string) => void
  getInventoryItemById: (id: string) => InventoryItem | undefined

  // Supply requests
  supplyRequests: SupplyRequest[]
  addSupplyRequest: (request: Omit<SupplyRequest, 'id'>) => void
  updateSupplyRequest: (id: string, request: Partial<SupplyRequest>) => void
  deleteSupplyRequest: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0101',
      dob: '1985-03-15',
      gender: 'M',
      address: '123 Main St, City',
      lastVisit: '2024-11-10',
      balance: 250,
      hasAppointment: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-0102',
      dob: '1990-07-22',
      gender: 'F',
      address: '456 Oak Ave, City',
      lastVisit: '2024-10-28',
      balance: 0,
      hasAppointment: false,
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '555-0103',
      dob: '1988-11-05',
      gender: 'M',
      address: '789 Pine Rd, City',
      lastVisit: '2024-11-05',
      balance: 150,
      hasAppointment: true,
    },
  ])

  const [staff, setStaff] = useState<Staff[]>([
    {
      id: '1',
      name: 'Dr. Maria Santos',
      email: 'maria@mouthworks.com',
      phone: '+63-917-123-4567',
      role: 'dentist',
      specialization: 'Orthodontics',
      status: 'active',
      joinDate: '2022-01-15',
    },
    {
      id: '2',
      name: 'Dr. Juan Dela Cruz',
      email: 'juan@mouthworks.com',
      phone: '+63-917-234-5678',
      role: 'dentist',
      specialization: 'Cosmetic Dentistry',
      status: 'active',
      joinDate: '2022-06-20',
    },
    {
      id: '3',
      name: 'Ana Garcia',
      email: 'ana@mouthworks.com',
      phone: '+63-917-345-6789',
      role: 'receptionist',
      status: 'active',
      joinDate: '2023-02-10',
    },
    {
      id: '4',
      name: 'Carlos Reyes',
      email: 'carlos@mouthworks.com',
      phone: '+63-917-456-7890',
      role: 'assistant',
      status: 'active',
      joinDate: '2023-05-05',
    },
  ])

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'John Doe',
      patientId: '1',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      service: 'Cleaning',
      status: 'Confirmed',
      notes: 'Regular checkup',
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      patientId: '2',
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      service: 'Whitening',
      status: 'Confirmed',
      notes: 'Teeth whitening',
    },
    {
      id: '3',
      patientName: 'Bob Johnson',
      patientId: '3',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      service: 'Filling',
      status: 'Pending',
      notes: 'Cavity filling',
    },
  ])

  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: '1',
      name: 'Regular Cleaning',
      category: 'Cleaning',
      description: 'Professional teeth cleaning and plaque removal',
      price: 75,
      duration: 45,
      notes: 'Includes fluoride treatment',
    },
    {
      id: '2',
      name: 'Deep Cleaning',
      category: 'Cleaning',
      description: 'Scaling and root planing for gum health',
      price: 150,
      duration: 60,
      notes: 'May require multiple sessions',
    },
    {
      id: '3',
      name: 'Tooth Extraction',
      category: 'Extraction',
      description: 'Safe removal of damaged or decayed teeth',
      price: 200,
      duration: 30,
      notes: 'Includes anesthesia',
    },
    {
      id: '4',
      name: 'Teeth Whitening',
      category: 'Whitening',
      description: 'Professional whitening treatment',
      price: 250,
      duration: 60,
      notes: 'Results last 6-12 months',
    },
    {
      id: '5',
      name: 'Cavity Filling',
      category: 'Filling',
      description: 'Composite filling for cavity repair',
      price: 120,
      duration: 30,
      notes: 'Color-matched to natural teeth',
    },
    {
      id: '6',
      name: 'Braces Installation',
      category: 'Orthodontic',
      description: 'Traditional metal braces for teeth alignment',
      price: 3000,
      duration: 90,
      notes: 'Includes initial consultation',
    },
  ])

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Doe',
      amount: 75,
      method: 'Cash',
      date: '2024-11-10',
      status: 'Paid',
      treatment: 'Cleaning',
      balance: 0,
      notes: 'Paid in full',
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'Jane Smith',
      amount: 250,
      method: 'Bank Transfer',
      date: '2024-11-08',
      status: 'Paid',
      treatment: 'Whitening',
      balance: 0,
      notes: 'Transferred',
    },
    {
      id: '3',
      patientId: '3',
      patientName: 'Bob Johnson',
      amount: 200,
      method: 'Cash',
      date: '2024-11-05',
      status: 'Partial',
      treatment: 'Extraction',
      balance: 150,
      notes: '50% down payment',
    },
    {
      id: '4',
      patientId: '1',
      patientName: 'John Doe',
      amount: 120,
      method: 'GCash',
      date: '2024-10-28',
      status: 'Unpaid',
      treatment: 'Filling',
      balance: 120,
      notes: 'Due by next visit',
    },
  ])

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Nitrile Gloves (Box)',
      category: 'Gloves',
      quantity: 20,
      minThreshold: 30,
      unit: 'boxes',
      supplier: 'MediSupply Inc',
      lastRestocked: '2024-10-15',
      price: 15,
    },
    {
      id: '2',
      name: 'Lidocaine Anesthetic',
      category: 'Anesthesia',
      quantity: 3,
      minThreshold: 10,
      unit: 'vials',
      supplier: 'PharmaCorp',
      lastRestocked: '2024-11-01',
      price: 45,
    },
    {
      id: '3',
      name: 'Orthodontic Braces Wire',
      category: 'Braces Wire',
      quantity: 15,
      minThreshold: 20,
      unit: 'spools',
      supplier: 'OrthoTech',
      lastRestocked: '2024-10-28',
      price: 120,
    },
    {
      id: '4',
      name: 'Composite Filling Material',
      category: 'Filling Material',
      quantity: 45,
      minThreshold: 20,
      unit: 'syringes',
      supplier: 'DentalMaterials Co',
      lastRestocked: '2024-11-05',
      price: 8,
    },
    {
      id: '5',
      name: 'Ultrasonic Scaler Tips',
      category: 'Cleaning Supplies',
      quantity: 8,
      minThreshold: 12,
      unit: 'packs',
      supplier: 'MediSupply Inc',
      lastRestocked: '2024-10-20',
      price: 35,
    },
    {
      id: '6',
      name: 'Suction Tips',
      category: 'Cleaning Supplies',
      quantity: 40,
      minThreshold: 20,
      unit: 'packs',
      supplier: 'DentalCare Ltd',
      lastRestocked: '2024-11-08',
      price: 12,
    },
  ])

  const [supplyRequests, setSupplyRequests] = useState<SupplyRequest[]>([
    {
      id: '1',
      itemId: '1',
      itemName: 'Nitrile Gloves (Box)',
      quantity: 50,
      requestedBy: 'Sarah Johnson',
      requestedDate: '2024-11-10',
      status: 'Pending',
    },
    {
      id: '2',
      itemId: '2',
      itemName: 'Lidocaine Anesthetic',
      quantity: 20,
      requestedBy: 'Mike Chen',
      requestedDate: '2024-11-08',
      status: 'Approved',
    },
  ])

  const addPatient = (patientData: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
    }
    setPatients([...patients, newPatient])
  }

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(patients.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id))
  }

  const getPatientById = (id: string) => {
    return patients.find((p) => p.id === id)
  }

  const addStaff = (staffData: Omit<Staff, 'id'>) => {
    const newStaff: Staff = {
      ...staffData,
      id: Date.now().toString(),
    }
    setStaff([...staff, newStaff])
  }

  const updateStaff = (id: string, updates: Partial<Staff>) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const deleteStaff = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id))
  }

  const getStaffById = (id: string) => {
    return staff.find((s) => s.id === id)
  }

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
    }
    setAppointments([...appointments, newAppointment])
  }

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, ...updates } : a))
    )
  }

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id))
  }

  const getAppointmentById = (id: string) => {
    return appointments.find((a) => a.id === id)
  }

  const addTreatment = (treatmentData: Omit<Treatment, 'id'>) => {
    const newTreatment: Treatment = {
      ...treatmentData,
      id: Date.now().toString(),
    }
    setTreatments([...treatments, newTreatment])
  }

  const updateTreatment = (id: string, updates: Partial<Treatment>) => {
    setTreatments(
      treatments.map((t) => (t.id === id ? { ...t, ...updates } : t))
    )
  }

  const deleteTreatment = (id: string) => {
    setTreatments(treatments.filter((t) => t.id !== id))
  }

  const getTreatmentById = (id: string) => {
    return treatments.find((t) => t.id === id)
  }

  const addPayment = (paymentData: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString(),
    }
    setPayments([...payments, newPayment])
  }

  const updatePayment = (id: string, updates: Partial<Payment>) => {
    setPayments(payments.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deletePayment = (id: string) => {
    setPayments(payments.filter((p) => p.id !== id))
  }

  const getPaymentById = (id: string) => {
    return payments.find((p) => p.id === id)
  }

  const addInventoryItem = (itemData: Omit<InventoryItem, 'id' | 'lastRestocked'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: Date.now().toString(),
      lastRestocked: new Date().toISOString().split('T')[0],
    }
    setInventory([...inventory, newItem])
  }

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(
      inventory.map((item) => (item.id === id ? { ...item, ...updates } : item))
    )
  }

  const deleteInventoryItem = (id: string) => {
    setInventory(inventory.filter((item) => item.id !== id))
  }

  const getInventoryItemById = (id: string) => {
    return inventory.find((item) => item.id === id)
  }

  const addSupplyRequest = (requestData: Omit<SupplyRequest, 'id'>) => {
    const newRequest: SupplyRequest = {
      ...requestData,
      id: Date.now().toString(),
    }
    setSupplyRequests([...supplyRequests, newRequest])
  }

  const updateSupplyRequest = (id: string, updates: Partial<SupplyRequest>) => {
    setSupplyRequests(
      supplyRequests.map((r) => (r.id === id ? { ...r, ...updates } : r))
    )
  }

  const deleteSupplyRequest = (id: string) => {
    setSupplyRequests(supplyRequests.filter((r) => r.id !== id))
  }

  const value: AppContextType = {
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    getPatientById,
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    getStaffById,
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
    treatments,
    addTreatment,
    updateTreatment,
    deleteTreatment,
    getTreatmentById,
    payments,
    addPayment,
    updatePayment,
    deletePayment,
    getPaymentById,
    inventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItemById,
    supplyRequests,
    addSupplyRequest,
    updateSupplyRequest,
    deleteSupplyRequest,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
