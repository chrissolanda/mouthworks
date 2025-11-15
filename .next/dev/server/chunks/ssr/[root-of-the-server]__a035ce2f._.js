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
function genId(prefix = '') {
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function AppProvider({ children }) {
    // load / persist helpers
    const load = (key, fallback)=>{
        if ("TURBOPACK compile-time truthy", 1) return fallback;
        //TURBOPACK unreachable
        ;
    };
    const persist = (key, value)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    };
    const [patients, setPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>load('mw_patients', [
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
                hasAppointment: false
            }
        ]));
    const [staff, setStaff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>load('mw_staff', [
            {
                id: 'st_1',
                name: 'Admin User',
                email: 'admin@mw.test',
                phone: '',
                role: 'admin',
                status: 'active',
                joinDate: new Date().toISOString().split('T')[0]
            }
        ]));
    const [appointments, setAppointments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>load('mw_appointments', []));
    const [treatments, setTreatments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>load('mw_treatments', []));
    const [payments, setPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>load('mw_payments', []));
    const [inventory, setInventory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>load('mw_inventory', []));
    const [supplyRequests, setSupplyRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>load('mw_supply', []));
    // persist
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>persist('mw_patients', patients), [
        patients
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>persist('mw_staff', staff), [
        staff
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>persist('mw_appointments', appointments), [
        appointments
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>persist('mw_treatments', treatments), [
        treatments
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>persist('mw_payments', payments), [
        payments
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>persist('mw_inventory', inventory), [
        inventory
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>persist('mw_supply', supplyRequests), [
        supplyRequests
    ]);
    // Patients
    const addPatient = (p)=>{
        const patient = {
            ...p,
            id: genId('pat_')
        };
        setPatients((s)=>[
                ...s,
                patient
            ]);
        return patient;
    };
    const updatePatient = (id, patch)=>setPatients((s)=>s.map((it)=>it.id === id ? {
                    ...it,
                    ...patch
                } : it));
    const deletePatient = (id)=>setPatients((s)=>s.filter((p)=>p.id !== id));
    const getPatientById = (id)=>patients.find((p)=>p.id === id);
    // Staff
    const addStaff = (s)=>{
        const nv = {
            ...s,
            id: genId('st_')
        };
        setStaff((cur)=>[
                ...cur,
                nv
            ]);
        return nv;
    };
    const updateStaff = (id, patch)=>setStaff((s)=>s.map((it)=>it.id === id ? {
                    ...it,
                    ...patch
                } : it));
    const deleteStaff = (id)=>setStaff((s)=>s.filter((it)=>it.id !== id));
    const getStaffById = (id)=>staff.find((s)=>s.id === id);
    // Appointments
    const addAppointment = (a)=>{
        const nv = {
            ...a,
            id: genId('apt_')
        };
        setAppointments((s)=>[
                ...s,
                nv
            ]);
        return nv;
    };
    const updateAppointment = (id, patch)=>setAppointments((s)=>s.map((it)=>it.id === id ? {
                    ...it,
                    ...patch
                } : it));
    const deleteAppointment = (id)=>setAppointments((s)=>s.filter((it)=>it.id !== id));
    const getAppointmentById = (id)=>appointments.find((a)=>a.id === id);
    // Treatments
    const addTreatment = (t)=>{
        const nv = {
            ...t,
            id: genId('tr_')
        };
        setTreatments((s)=>[
                ...s,
                nv
            ]);
        return nv;
    };
    const updateTreatment = (id, patch)=>setTreatments((s)=>s.map((it)=>it.id === id ? {
                    ...it,
                    ...patch
                } : it));
    const deleteTreatment = (id)=>setTreatments((s)=>s.filter((it)=>it.id !== id));
    const getTreatmentById = (id)=>treatments.find((t)=>t.id === id);
    // Payments
    const addPayment = (p)=>{
        const nv = {
            ...p,
            id: genId('pay_'),
            date: p.date ?? new Date().toISOString().split('T')[0]
        };
        setPayments((s)=>[
                ...s,
                nv
            ]);
        return nv;
    };
    const updatePayment = (id, patch)=>setPayments((s)=>s.map((it)=>it.id === id ? {
                    ...it,
                    ...patch
                } : it));
    const deletePayment = (id)=>setPayments((s)=>s.filter((it)=>it.id !== id));
    const getPaymentById = (id)=>payments.find((p)=>p.id === id);
    // Inventory
    const addInventoryItem = (it)=>{
        const nv = {
            ...it,
            id: genId('inv_'),
            lastRestocked: new Date().toISOString()
        };
        setInventory((s)=>[
                ...s,
                nv
            ]);
        return nv;
    };
    const updateInventoryItem = (id, patch)=>setInventory((s)=>s.map((it)=>it.id === id ? {
                    ...it,
                    ...patch
                } : it));
    const deleteInventoryItem = (id)=>setInventory((s)=>s.filter((it)=>it.id !== id));
    const getInventoryItemById = (id)=>inventory.find((it)=>it.id === id);
    // Supply requests
    const addSupplyRequest = (r)=>{
        const nv = {
            ...r,
            id: genId('sr_')
        };
        setSupplyRequests((s)=>[
                ...s,
                nv
            ]);
        return nv;
    };
    const updateSupplyRequest = (id, patch)=>setSupplyRequests((s)=>s.map((it)=>it.id === id ? {
                    ...it,
                    ...patch
                } : it));
    const deleteSupplyRequest = (id)=>setSupplyRequests((s)=>s.filter((it)=>it.id !== id));
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
        lineNumber: 341,
        columnNumber: 10
    }, this);
}
function useAppContext() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!ctx) throw new Error('useAppContext must be used within AppProvider');
    return ctx;
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