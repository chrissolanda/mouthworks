'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

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
  date: string // YYYY-MM-DD
  time: string // HH:mm
  service: string
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  notes: string
  doctorId?: string | null
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
  // Patients
  patients: Patient[]
  addPatient: (p: Omit<Patient, 'id'>) => Patient
  updatePatient: (id: string, patch: Partial<Patient>) => void
  deletePatient: (id: string) => void
  getPatientById: (id: string) => Patient | undefined

  // Staff
  staff: Staff[]
  addStaff: (s: Omit<Staff, 'id'>) => Staff
  updateStaff: (id: string, patch: Partial<Staff>) => void
  deleteStaff: (id: string) => void
  getStaffById: (id: string) => Staff | undefined

  // Appointments
  appointments: Appointment[]
  addAppointment: (a: Omit<Appointment, 'id'>) => Appointment
  updateAppointment: (id: string, patch: Partial<Appointment>) => void
  deleteAppointment: (id: string) => void
  getAppointmentById: (id: string) => Appointment | undefined

  // Treatments
  treatments: Treatment[]
  addTreatment: (t: Omit<Treatment, 'id'>) => Treatment
  updateTreatment: (id: string, patch: Partial<Treatment>) => void
  deleteTreatment: (id: string) => void
  getTreatmentById: (id: string) => Treatment | undefined

  // Payments
  payments: Payment[]
  addPayment: (p: Omit<Payment, 'id' | 'date'> & { date?: string }) => Payment
  updatePayment: (id: string, patch: Partial<Payment>) => void
  deletePayment: (id: string) => void
  getPaymentById: (id: string) => Payment | undefined

  // Inventory
  inventory: InventoryItem[]
  addInventoryItem: (it: Omit<InventoryItem, 'id' | 'lastRestocked'>) => InventoryItem
  updateInventoryItem: (id: string, patch: Partial<InventoryItem>) => void
  deleteInventoryItem: (id: string) => void
  getInventoryItemById: (id: string) => InventoryItem | undefined

  // Supply requests
  supplyRequests: SupplyRequest[]
  addSupplyRequest: (r: Omit<SupplyRequest, 'id'>) => SupplyRequest
  updateSupplyRequest: (id: string, patch: Partial<SupplyRequest>) => void
  deleteSupplyRequest: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

function genId(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export function AppProvider({ children }: { children: ReactNode }) {
  // load / persist helpers
  const load = <T,>(key: string, fallback: T) => {
    if (typeof window === 'undefined') return fallback
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  }
  const persist = (key: string, value: any) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
  }

  const [patients, setPatients] = useState<Patient[]>(() =>
    load<Patient[]>('mw_patients', [
      {
        id: 'pat_1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '09170000001',
        dob: '1985-03-15',
        gender: 'M',
        address: '',
        lastVisit: '',
        balance: 0,
        hasAppointment: false,
      },
    ]),
  )

  const [staff, setStaff] = useState<Staff[]>(() =>
    load<Staff[]>('mw_staff', [
      {
        id: 'st_1',
        name: 'Admin User',
        email: 'admin@mw.test',
        phone: '',
        role: 'admin',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
      },
    ]),
  )

  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    load<Appointment[]>('mw_appointments', []),
  )

  const [treatments, setTreatments] = useState<Treatment[]>(() =>
    load<Treatment[]>('mw_treatments', []),
  )

  const [payments, setPayments] = useState<Payment[]>(() =>
    load<Payment[]>('mw_payments', []),
  )

  const [inventory, setInventory] = useState<InventoryItem[]>(() =>
    load<InventoryItem[]>('mw_inventory', []),
  )

  const [supplyRequests, setSupplyRequests] = useState<SupplyRequest[]>(() =>
    load<SupplyRequest[]>('mw_supply', []),
  )

  // persist
  useEffect(() => persist('mw_patients', patients), [patients])
  useEffect(() => persist('mw_staff', staff), [staff])
  useEffect(() => persist('mw_appointments', appointments), [appointments])
  useEffect(() => persist('mw_treatments', treatments), [treatments])
  useEffect(() => persist('mw_payments', payments), [payments])
  useEffect(() => persist('mw_inventory', inventory), [inventory])
  useEffect(() => persist('mw_supply', supplyRequests), [supplyRequests])

  // Patients
  const addPatient = (p: Omit<Patient, 'id'>) => {
    const patient: Patient = { ...p, id: genId('pat_') }
    setPatients((s) => [...s, patient])
    return patient
  }
  const updatePatient = (id: string, patch: Partial<Patient>) =>
    setPatients((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const deletePatient = (id: string) => setPatients((s) => s.filter((p) => p.id !== id))
  const getPatientById = (id: string) => patients.find((p) => p.id === id)

  // Staff
  const addStaff = (s: Omit<Staff, 'id'>) => {
    const nv = { ...s, id: genId('st_') }
    setStaff((cur) => [...cur, nv])
    return nv
  }
  const updateStaff = (id: string, patch: Partial<Staff>) =>
    setStaff((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const deleteStaff = (id: string) => setStaff((s) => s.filter((it) => it.id !== id))
  const getStaffById = (id: string) => staff.find((s) => s.id === id)

  // Appointments
  const addAppointment = (a: Omit<Appointment, 'id'>) => {
    const nv: Appointment = { ...a, id: genId('apt_') }
    setAppointments((s) => [...s, nv])
    return nv
  }
  const updateAppointment = (id: string, patch: Partial<Appointment>) =>
    setAppointments((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const deleteAppointment = (id: string) => setAppointments((s) => s.filter((it) => it.id !== id))
  const getAppointmentById = (id: string) => appointments.find((a) => a.id === id)

  // Treatments
  const addTreatment = (t: Omit<Treatment, 'id'>) => {
    const nv: Treatment = { ...t, id: genId('tr_') }
    setTreatments((s) => [...s, nv])
    return nv
  }
  const updateTreatment = (id: string, patch: Partial<Treatment>) =>
    setTreatments((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const deleteTreatment = (id: string) => setTreatments((s) => s.filter((it) => it.id !== id))
  const getTreatmentById = (id: string) => treatments.find((t) => t.id === id)

  // Payments
  const addPayment = (p: Omit<Payment, 'id' | 'date'> & { date?: string }) => {
    const nv: Payment = {
      ...p,
      id: genId('pay_'),
      date: p.date ?? new Date().toISOString().split('T')[0],
    } as Payment
    setPayments((s) => [...s, nv])
    return nv
  }
  const updatePayment = (id: string, patch: Partial<Payment>) =>
    setPayments((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const deletePayment = (id: string) => setPayments((s) => s.filter((it) => it.id !== id))
  const getPaymentById = (id: string) => payments.find((p) => p.id === id)

  // Inventory
  const addInventoryItem = (it: Omit<InventoryItem, 'id' | 'lastRestocked'>) => {
    const nv: InventoryItem = { ...it, id: genId('inv_'), lastRestocked: new Date().toISOString() }
    setInventory((s) => [...s, nv])
    return nv
  }
  const updateInventoryItem = (id: string, patch: Partial<InventoryItem>) =>
    setInventory((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const deleteInventoryItem = (id: string) => setInventory((s) => s.filter((it) => it.id !== id))
  const getInventoryItemById = (id: string) => inventory.find((it) => it.id === id)

  // Supply requests
  const addSupplyRequest = (r: Omit<SupplyRequest, 'id'>) => {
    const nv = { ...r, id: genId('sr_') }
    setSupplyRequests((s) => [...s, nv])
    return nv
  }
  const updateSupplyRequest = (id: string, patch: Partial<SupplyRequest>) =>
    setSupplyRequests((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  const deleteSupplyRequest = (id: string) => setSupplyRequests((s) => s.filter((it) => it.id !== id))

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

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
