module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/context/app-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useAppContext",
    ()=>useAppContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AppProvider({ children }) {
    const [patients, setPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
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
            hasAppointment: true
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
            hasAppointment: false
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
            hasAppointment: true
        }
    ]);
    const [staff, setStaff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            name: 'Dr. Maria Santos',
            email: 'maria@mouthworks.com',
            phone: '+63-917-123-4567',
            role: 'dentist',
            specialization: 'Orthodontics',
            status: 'active',
            joinDate: '2022-01-15'
        },
        {
            id: '2',
            name: 'Dr. Juan Dela Cruz',
            email: 'juan@mouthworks.com',
            phone: '+63-917-234-5678',
            role: 'dentist',
            specialization: 'Cosmetic Dentistry',
            status: 'active',
            joinDate: '2022-06-20'
        },
        {
            id: '3',
            name: 'Ana Garcia',
            email: 'ana@mouthworks.com',
            phone: '+63-917-345-6789',
            role: 'receptionist',
            status: 'active',
            joinDate: '2023-02-10'
        },
        {
            id: '4',
            name: 'Carlos Reyes',
            email: 'carlos@mouthworks.com',
            phone: '+63-917-456-7890',
            role: 'assistant',
            status: 'active',
            joinDate: '2023-05-05'
        }
    ]);
    const [appointments, setAppointments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            patientName: 'John Doe',
            patientId: '1',
            date: new Date().toISOString().split('T')[0],
            time: '09:00',
            service: 'Cleaning',
            status: 'Confirmed',
            notes: 'Regular checkup'
        },
        {
            id: '2',
            patientName: 'Jane Smith',
            patientId: '2',
            date: new Date().toISOString().split('T')[0],
            time: '10:30',
            service: 'Whitening',
            status: 'Confirmed',
            notes: 'Teeth whitening'
        },
        {
            id: '3',
            patientName: 'Bob Johnson',
            patientId: '3',
            date: new Date().toISOString().split('T')[0],
            time: '14:00',
            service: 'Filling',
            status: 'Pending',
            notes: 'Cavity filling'
        }
    ]);
    const [treatments, setTreatments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            name: 'Regular Cleaning',
            category: 'Cleaning',
            description: 'Professional teeth cleaning and plaque removal',
            price: 75,
            duration: 45,
            notes: 'Includes fluoride treatment'
        },
        {
            id: '2',
            name: 'Deep Cleaning',
            category: 'Cleaning',
            description: 'Scaling and root planing for gum health',
            price: 150,
            duration: 60,
            notes: 'May require multiple sessions'
        },
        {
            id: '3',
            name: 'Tooth Extraction',
            category: 'Extraction',
            description: 'Safe removal of damaged or decayed teeth',
            price: 200,
            duration: 30,
            notes: 'Includes anesthesia'
        },
        {
            id: '4',
            name: 'Teeth Whitening',
            category: 'Whitening',
            description: 'Professional whitening treatment',
            price: 250,
            duration: 60,
            notes: 'Results last 6-12 months'
        },
        {
            id: '5',
            name: 'Cavity Filling',
            category: 'Filling',
            description: 'Composite filling for cavity repair',
            price: 120,
            duration: 30,
            notes: 'Color-matched to natural teeth'
        },
        {
            id: '6',
            name: 'Braces Installation',
            category: 'Orthodontic',
            description: 'Traditional metal braces for teeth alignment',
            price: 3000,
            duration: 90,
            notes: 'Includes initial consultation'
        }
    ]);
    const [payments, setPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
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
            notes: 'Paid in full'
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
            notes: 'Transferred'
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
            notes: '50% down payment'
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
            notes: 'Due by next visit'
        }
    ]);
    const [inventory, setInventory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            name: 'Nitrile Gloves (Box)',
            category: 'Gloves',
            quantity: 20,
            minThreshold: 30,
            unit: 'boxes',
            supplier: 'MediSupply Inc',
            lastRestocked: '2024-10-15',
            price: 15
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
            price: 45
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
            price: 120
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
            price: 8
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
            price: 35
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
            price: 12
        }
    ]);
    const [supplyRequests, setSupplyRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            itemId: '1',
            itemName: 'Nitrile Gloves (Box)',
            quantity: 50,
            requestedBy: 'Sarah Johnson',
            requestedDate: '2024-11-10',
            status: 'Pending'
        },
        {
            id: '2',
            itemId: '2',
            itemName: 'Lidocaine Anesthetic',
            quantity: 20,
            requestedBy: 'Mike Chen',
            requestedDate: '2024-11-08',
            status: 'Approved'
        }
    ]);
    const addPatient = (patientData)=>{
        const newPatient = {
            ...patientData,
            id: Date.now().toString()
        };
        setPatients([
            ...patients,
            newPatient
        ]);
    };
    const updatePatient = (id, updates)=>{
        setPatients(patients.map((p)=>p.id === id ? {
                ...p,
                ...updates
            } : p));
    };
    const deletePatient = (id)=>{
        setPatients(patients.filter((p)=>p.id !== id));
    };
    const getPatientById = (id)=>{
        return patients.find((p)=>p.id === id);
    };
    const addStaff = (staffData)=>{
        const newStaff = {
            ...staffData,
            id: Date.now().toString()
        };
        setStaff([
            ...staff,
            newStaff
        ]);
    };
    const updateStaff = (id, updates)=>{
        setStaff(staff.map((s)=>s.id === id ? {
                ...s,
                ...updates
            } : s));
    };
    const deleteStaff = (id)=>{
        setStaff(staff.filter((s)=>s.id !== id));
    };
    const getStaffById = (id)=>{
        return staff.find((s)=>s.id === id);
    };
    const addAppointment = (appointmentData)=>{
        const newAppointment = {
            ...appointmentData,
            id: Date.now().toString()
        };
        setAppointments([
            ...appointments,
            newAppointment
        ]);
    };
    const updateAppointment = (id, updates)=>{
        setAppointments(appointments.map((a)=>a.id === id ? {
                ...a,
                ...updates
            } : a));
    };
    const deleteAppointment = (id)=>{
        setAppointments(appointments.filter((a)=>a.id !== id));
    };
    const getAppointmentById = (id)=>{
        return appointments.find((a)=>a.id === id);
    };
    const addTreatment = (treatmentData)=>{
        const newTreatment = {
            ...treatmentData,
            id: Date.now().toString()
        };
        setTreatments([
            ...treatments,
            newTreatment
        ]);
    };
    const updateTreatment = (id, updates)=>{
        setTreatments(treatments.map((t)=>t.id === id ? {
                ...t,
                ...updates
            } : t));
    };
    const deleteTreatment = (id)=>{
        setTreatments(treatments.filter((t)=>t.id !== id));
    };
    const getTreatmentById = (id)=>{
        return treatments.find((t)=>t.id === id);
    };
    const addPayment = (paymentData)=>{
        const newPayment = {
            ...paymentData,
            id: Date.now().toString()
        };
        setPayments([
            ...payments,
            newPayment
        ]);
    };
    const updatePayment = (id, updates)=>{
        setPayments(payments.map((p)=>p.id === id ? {
                ...p,
                ...updates
            } : p));
    };
    const deletePayment = (id)=>{
        setPayments(payments.filter((p)=>p.id !== id));
    };
    const getPaymentById = (id)=>{
        return payments.find((p)=>p.id === id);
    };
    const addInventoryItem = (itemData)=>{
        const newItem = {
            ...itemData,
            id: Date.now().toString(),
            lastRestocked: new Date().toISOString().split('T')[0]
        };
        setInventory([
            ...inventory,
            newItem
        ]);
    };
    const updateInventoryItem = (id, updates)=>{
        setInventory(inventory.map((item)=>item.id === id ? {
                ...item,
                ...updates
            } : item));
    };
    const deleteInventoryItem = (id)=>{
        setInventory(inventory.filter((item)=>item.id !== id));
    };
    const getInventoryItemById = (id)=>{
        return inventory.find((item)=>item.id === id);
    };
    const addSupplyRequest = (requestData)=>{
        const newRequest = {
            ...requestData,
            id: Date.now().toString()
        };
        setSupplyRequests([
            ...supplyRequests,
            newRequest
        ]);
    };
    const updateSupplyRequest = (id, updates)=>{
        setSupplyRequests(supplyRequests.map((r)=>r.id === id ? {
                ...r,
                ...updates
            } : r));
    };
    const deleteSupplyRequest = (id)=>{
        setSupplyRequests(supplyRequests.filter((r)=>r.id !== id));
    };
    const value = {
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
        deleteSupplyRequest
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/app-context.tsx",
        lineNumber: 633,
        columnNumber: 5
    }, this);
}
function useAppContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a035ce2f._.js.map