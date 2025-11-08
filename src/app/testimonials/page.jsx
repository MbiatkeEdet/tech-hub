// "use client";
// import React, { useState, useEffect, useMemo } from "react";

// // ✅ Main Component
// const ClearingForm = () => {
//   const [consignees, setConsignees] = useState(["Consignee A", "Consignee B"]);
//   const [newConsignee, setNewConsignee] = useState("");
//   const [records, setRecords] = useState([]);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [updateModal, setUpdateModal] = useState({
//     isOpen: false,
//     recordIndex: null,
//     amount: "",
//     date: new Date().toISOString().split("T")[0], // Default to today
//     bank: "",
//     currentBalance: 0,
//   });

//   const [form, setForm] = useState({
//     consignee: "",
//     billOfLading: "",
//     containers: "",
//     items: "",
//     tonnage: "",
//     terminalFee: "",
//     shippingFee: "",
//     transport: "",
//     agency: "",
//     paar: "",
//     duty: "",
//   });

//   // ✅ Load saved data
//   useEffect(() => {
//     try {
//       const savedRecords = JSON.parse(localStorage.getItem("clearingRecords")) || [];
//       setRecords(savedRecords);
//     } catch (error) {
//       console.error("Failed to load records from localStorage:", error);
//       setRecords([]);
//     }
//   }, []);

//   // ✅ Persist to localStorage
//   useEffect(() => {
//     try {
//       localStorage.setItem("clearingRecords", JSON.stringify(records));
//     } catch (error) {
//       console.error("Failed to save records to localStorage:", error);
//     }
//   }, [records]);

//   // ✅ Handle form input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Ensure numeric fields only accept valid numbers
//     if (
//       [
//         "terminalFee",
//         "shippingFee",
//         "transport",
//         "agency",
//         "paar",
//         "duty",
//       ].includes(name)
//     ) {
//       if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
//         setForm({ ...form, [name]: value });
//       }
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // ✅ Add new consignee
//   const addConsignee = () => {
//     const trimmed = newConsignee.trim();
//     if (!trimmed) {
//       alert("Please enter a consignee name.");
//       return;
//     }
//     if (consignees.includes(trimmed)) {
//       alert("This consignee already exists.");
//       return;
//     }
//     setConsignees([...consignees, trimmed]);
//     setNewConsignee("");
//   };

//   // ✅ Save record
//   const saveRecord = () => {
//     // Required field validation
//     if (!form.consignee || !form.billOfLading || !form.containers) {
//       alert("Please fill all required fields: Consignee, Bill of Lading, and Containers.");
//       return;
//     }

//     // Numeric field validation
//     const fees = ["terminalFee", "shippingFee", "transport", "agency", "paar", "duty"];
//     for (const field of fees) {
//       if (!form[field] || isNaN(form[field]) || Number(form[field]) < 0) {
//         alert(`Please enter a valid non-negative number for ${field.replace(/([A-Z])/g, " $1")}.`);
//         return;
//       }
//     }

//     const total = fees.reduce((sum, field) => sum + Number(form[field]), 0);
//     const newRecord = {
//       ...form,
//       total,
//       received: 0,
//       balance: total,
//       paymentHistory: [],
//     };

//     try {
//       setRecords([...records, newRecord]);
//       setForm({
//         consignee: "",
//         billOfLading: "",
//         containers: "",
//         items: "",
//         tonnage: "",
//         terminalFee: "",
//         shippingFee: "",
//         transport: "",
//         agency: "",
//         paar: "",
//         duty: "",
//       });
//       alert("Record saved successfully!");
//     } catch (error) {
//       console.error("Error saving record:", error);
//       alert("Failed to save record. Please try again.");
//     }
//   };

//   // ✅ Delete record
//   const deleteRecord = (index) => {
//     if (confirm("Are you sure you want to delete this record?")) {
//       try {
//         const updated = records.filter((_, i) => i !== index);
//         setRecords(updated);
//         alert("Record deleted successfully!");
//       } catch (error) {
//         console.error("Error deleting record:", error);
//         alert("Failed to delete record. Please try again.");
//       }
//     }
//   };

//   // ✅ Save payment update
//   const handleSavePayment = () => {
//     const amount = Number(updateModal.amount);
//     if (!amount || amount <= 0) {
//       alert("Please enter a valid positive amount.");
//       return;
//     }
//     if (!updateModal.date) {
//       alert("Please select a payment date.");
//       return;
//     }
//     if (!updateModal.bank.trim()) {
//       alert("Please enter a bank name.");
//       return;
//     }

//     // Optional: Warn if payment exceeds balance
//     if (amount > updateModal.currentBalance) {
//       if (!confirm("Payment exceeds remaining balance. Proceed?")) {
//         return;
//       }
//     }

//     const updated = [...records];
//     const rec = updated[updateModal.recordIndex];
//     const newHistory = [
//       ...(rec.paymentHistory || []),
//       {
//         amount,
//         date: updateModal.date,
//         bank: updateModal.bank.trim(),
//       },
//     ];

//     const newReceived = newHistory.reduce((sum, p) => sum + p.amount, 0);
//     const newBalance = rec.total - newReceived;

//     updated[updateModal.recordIndex] = {
//       ...rec,
//       received: newReceived,
//       balance: newBalance,
//       paymentHistory: newHistory,
//     };

//     try {
//       setRecords(updated);
//       setUpdateModal({
//         isOpen: false,
//         recordIndex: null,
//         amount: "",
//         date: new Date().toISOString().split("T")[0],
//         bank: "",
//         currentBalance: 0,
//       });
//       alert("Payment updated successfully!");
//     } catch (error) {
//       console.error("Error updating payment:", error);
//       alert("Failed to update payment. Please try again.");
//     }
//   };

//   // ✅ Calculate total for display
//   const total = useMemo(() => {
//     return ["terminalFee", "shippingFee", "transport", "agency", "paar", "duty"]
//       .reduce((sum, field) => sum + (Number(form[field]) || 0), 0);
//   }, [form]);

//   return (
//     <section className="p-6 max-w-7xl mx-auto text-gray-800">
//       <h1 className="text-2xl font-bold mb-6 text-center">Clearing Form</h1>

//       {/* Add Consignee */}
//       <div className="flex items-center gap-2 mb-6">
//         <label htmlFor="newConsignee" className="sr-only">
//           Add new consignee
//         </label>
//         <input
//           id="newConsignee"
//           type="text"
//           value={newConsignee}
//           onChange={(e) => setNewConsignee(e.target.value)}
//           placeholder="Add new consignee"
//           className="border rounded-md p-2 flex-grow"
//         />
//         <button
//           onClick={addConsignee}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//         >
//           Add
//         </button>
//       </div>

//       {/* Record Form */}
//       <div className="grid md:grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
//         <div>
//           <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">
//             Consignee
//           </label>
//           <select
//             id="consignee"
//             name="consignee"
//             value={form.consignee}
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//             required
//           >
//             <option value="">Select Consignee</option>
//             {consignees.map((c, i) => (
//               <option key={i} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         </div>

//         {[
//           { name: "billOfLading", label: "Bill of Lading", required: true },
//           { name: "containers", label: "Containers", required: true },
//           { name: "items", label: "Items" },
//           { name: "tonnage", label: "Tonnage" },
//           { name: "terminalFee", label: "Terminal Fee", type: "number" },
//           { name: "shippingFee", label: "Shipping Fee", type: "number" },
//           { name: "transport", label: "Transport", type: "number" },
//           { name: "agency", label: "Agency", type: "number" },
//           { name: "paar", label: "PAAR", type: "number" },
//           { name: "duty", label: "Duty", type: "number" },
//         ].map((field) => (
//           <div key={field.name}>
//             <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
//               {field.label}
//             </label>
//             <input
//               id={field.name}
//               type={field.type || "text"}
//               name={field.name}
//               value={form[field.name]}
//               onChange={handleChange}
//               placeholder={field.label}
//               className="border rounded-md p-2 w-full"
//               min={field.type === "number" ? "0" : undefined}
//               step={field.type === "number" ? "0.01" : undefined}
//               required={field.required}
//             />
//           </div>
//         ))}

//         <button
//           onClick={saveRecord}
//           className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-2"
//         >
//           Save Record
//         </button>
//       </div>

//       {/* Records Table */}
//       <h2 className="text-lg font-semibold mb-3">Saved Records</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-3 py-2">Consignee</th>
//               <th className="border px-3 py-2">Bill of Lading</th>
//               <th className="border px-3 py-2">Containers</th>
//               <th className="border px-3 py-2">Total</th>
//               <th className="border px-3 py-2">Received</th>
//               <th className="border px-3 py-2">Balance</th>
//               <th className="border px-3 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((r, i) => (
//               <tr key={i} className="hover:bg-gray-50">
//                 <td className="border px-3 py-2">{r.consignee}</td>
//                 <td className="border px-3 py-2">{r.billOfLading}</td>
//                 <td className="border px-3 py-2">{r.containers}</td>
//                 <td className="border px-3 py-2">
//                   {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(r.total)}
//                 </td>
//                 <td className="border px-3 py-2 text-green-700">
//                   {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(r.received)}
//                 </td>
//                 <td className="border px-3 py-2 text-red-700">
//                   {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(r.balance)}
//                 </td>
//                 <td className="border px-3 py-2 space-x-2 text-center">
//                   <button
//                     onClick={() => setSelectedRecord(r)}
//                     className="text-blue-600 hover:underline"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={() =>
//                       setUpdateModal({
//                         isOpen: true,
//                         recordIndex: i,
//                         amount: "",
//                         date: new Date().toISOString().split("T")[0],
//                         bank: "",
//                         currentBalance: r.balance,
//                       })
//                     }
//                     className="text-green-600 hover:underline"
//                   >
//                     Update Payment
//                   </button>
//                   <button
//                     onClick={() => deleteRecord(i)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* View Record Modal */}
//       {selectedRecord && (
//         <Modal
//           title="Record Details"
//           onClose={() => setSelectedRecord(null)}
//           contentClassName="max-h-[80vh] overflow-y-auto p-4 space-y-2 text-gray-600"
//         >
//           {Object.entries(selectedRecord).map(([key, val]) =>
//             key === "paymentHistory" ? null : (
//               <p key={key}>
//                 <strong>{key.replace(/([A-Z])/g, " $1")}:</strong>{" "}
//                 {key === "total" || key === "received" || key === "balance"
//                   ? new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(val)
//                   : val}
//               </p>
//             )
//           )}
//           <h3 className="font-semibold mt-3">Payment History</h3>
//           {selectedRecord.paymentHistory?.length ? (
//             <ul className="list-disc ml-5 text-sm">
//               {selectedRecord.paymentHistory.map((p, j) => (
//                 <li key={j}>
//                   {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(p.amount)} — {p.bank} ({p.date})
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No payments yet.</p>
//           )}
//         </Modal>
//       )}

//       {/* Update Payment Modal */}
//       {updateModal.isOpen && (
//         <Modal
//           title={`Update Payment (Balance: ${new Intl.NumberFormat("en-NG", {
//             style: "currency",
//             currency: "NGN",
//           }).format(updateModal.currentBalance)})`}
//           onClose={() => setUpdateModal({ ...updateModal, isOpen: false })}
//         >
//           <div className="space-y-4">
//             <p className="text-sm text-gray-600">
//               Payment #{(records[updateModal.recordIndex]?.paymentHistory?.length || 0) + 1}
//             </p>
//             <div>
//               <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
//                 Amount
//               </label>
//               <input
//                 id="paymentAmount"
//                 type="number"
//                 placeholder="Amount"
//                 value={updateModal.amount}
//                 onChange={(e) => setUpdateModal({ ...updateModal, amount: e.target.value })}
//                 className="border rounded-md p-2 w-full"
//                 min="0"
//                 step="0.01"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">
//                 Date
//               </label>
//               <input
//                 id="paymentDate"
//                 type="date"
//                 value={updateModal.date}
//                 onChange={(e) => setUpdateModal({ ...updateModal, date: e.target.value })}
//                 className="border rounded-md p-2 w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
//                 Bank Name
//               </label>
//               <input
//                 id="bankName"
//                 type="text"
//                 placeholder="Bank name"
//                 value={updateModal.bank}
//                 onChange={(e) => setUpdateModal({ ...updateModal, bank: e.target.value })}
//                 className="border rounded-md p-2 w-full"
//                 required
//               />
//             </div>
//             {records[updateModal.recordIndex]?.paymentHistory?.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="font-semibold">Previous Payments</h3>
//                 <ul className="list-disc ml-5 text-sm">
//                   {records[updateModal.recordIndex].paymentHistory.map((p, j) => (
//                     <li key={j}>
//                       {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(p.amount)} — {p.bank} ({p.date})
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <button
//               onClick={handleSavePayment}
//               disabled={Number(updateModal.amount) > updateModal.currentBalance}
//               className={`mt-4 w-full bg-green-600 text-white py-2 rounded-md ${
//                 Number(updateModal.amount) > updateModal.currentBalance
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:bg-green-700"
//               }`}
//             >
//               Save Payment
//             </button>
//           </div>
//         </Modal>
//       )}
//     </section>
//   );
// };

// // ✅ Reusable Modal Component
// const Modal = ({ title, children, onClose, contentClassName = "" }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg animate-fadeIn">
//       <button
//         className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg font-bold"
//         onClick={onClose}
//         aria-label="Close modal"
//       >
//         ✕
//       </button>
//       <h2 className="text-xl font-bold mb-4 text-center text-gray-700">{title}</h2>
//       <div className={contentClassName}>{children}</div>
//     </div>
//   </div>
// );

// export default ClearingForm;

"use client";
import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ClearingForm = () => {
  const [consignees, setConsignees] = useState(["Consignee A", "Consignee B"]);
  const [newConsignee, setNewConsignee] = useState("");
  const [records, setRecords] = useState([]);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateRecord, setUpdateRecord] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [paymentInputs, setPaymentInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterConsignee, setFilterConsignee] = useState("");

  const [form, setForm] = useState({
    consignee: "",
    billOfLading: "",
    containers: "",
    item: "",
    tonnage: "",
    shipper: "",
    terminalFee: "",
    shippingFee: "",
    transport: "",
    agency: "",
    paar: "",
    duty: "",
    amountPaid: "",
    bank: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("clearingRecords");
    const savedConsignees = localStorage.getItem("clearingConsignees");
    
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved clearingRecords", e);
      }
    }
    
    if (savedConsignees) {
      try {
        setConsignees(JSON.parse(savedConsignees));
      } catch (e) {
        console.error("Failed to parse saved consignees", e);
      }
    }
  }, []);

  // Save to localStorage whenever records or consignees change
  useEffect(() => {
    localStorage.setItem("clearingRecords", JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem("clearingConsignees", JSON.stringify(consignees));
  }, [consignees]);

  // -----------------------
  // Helper Functions
  // -----------------------
  const formatCurrencyInput = (value) => {
    if (value === null || value === undefined) return "";
    const cleaned = value.toString().replace(/[^\d.-]/g, "");
    if (cleaned === "" || cleaned === "-" || cleaned === "." || cleaned === "-.") return cleaned;
    const parts = cleaned.split(".");
    const intPart = parts[0].replace(/^0+(?=\d)/, "");
    const intFormatted = Number(intPart || 0).toLocaleString("en-US");
    return parts.length > 1 ? `${intFormatted}.${parts[1]}` : intFormatted;
  };

  const parseCurrencyInput = (value) => {
    if (!value && value !== 0) return 0;
    const cleaned = value.toString().replace(/,/g, "");
    const n = Number(cleaned);
    return isNaN(n) ? 0 : n;
  };

  const formatCurrencyDisplay = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);

  const groupByDate = (payments = []) =>
    (payments || []).reduce((acc, p) => {
      const d = p.date || "No Date";
      if (!acc[d]) acc[d] = [];
      acc[d].push(p);
      return acc;
    }, {});

  const computeTotalFromForm = () => {
    const t =
      parseCurrencyInput(form.terminalFee) +
      parseCurrencyInput(form.shippingFee) +
      parseCurrencyInput(form.transport) +
      parseCurrencyInput(form.agency) +
      parseCurrencyInput(form.paar) +
      parseCurrencyInput(form.duty);
    return t;
  };

  // -----------------------
  // Validation
  // -----------------------
  const validateForm = () => {
    const errors = {};
    
    if (!form.consignee?.trim()) errors.consignee = "Consignee is required";
    if (!form.item?.trim()) errors.item = "Item description is required";
    
    // Validate numeric fields
    const numericFields = ['terminalFee', 'shippingFee', 'transport', 'agency', 'paar', 'duty'];
    numericFields.forEach(field => {
      const value = parseCurrencyInput(form[field]);
      if (value < 0) errors[field] = "Cannot be negative";
    });

    const total = computeTotalFromForm();
    const initialPaid = parseCurrencyInput(form.amountPaid);
    if (initialPaid > total) {
      errors.amountPaid = "Initial payment cannot exceed total fees";
    }

    return errors;
  };

  // -----------------------
  // Data Management
  // -----------------------
  const resetForm = () => {
    setForm({
      consignee: "",
      billOfLading: "",
      containers: "",
      item: "",
      tonnage: "",
      shipper: "",
      terminalFee: "",
      shippingFee: "",
      transport: "",
      agency: "",
      paar: "",
      duty: "",
      amountPaid: "",
      bank: "",
    });
    setEditingId(null);
    setErrors({});
  };

  const handleSaveRecord = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert(`Please fix the following errors:\n${Object.values(validationErrors).join('\n')}`);
      return;
    }

    setIsLoading(true);
    
    try {
      const total = computeTotalFromForm();
      const initialPaid = parseCurrencyInput(form.amountPaid);
      const balance = total - initialPaid;

      if (initialPaid > total) {
        alert("Initial payment cannot exceed total fees.");
        return;
      }

      const recordPayload = {
        id: editingId || uuidv4(),
        consignee: form.consignee,
        billOfLading: form.billOfLading,
        containers: form.containers,
        item: form.item,
        tonnage: form.tonnage,
        shipper: form.shipper,
        terminalFee: parseCurrencyInput(form.terminalFee),
        shippingFee: parseCurrencyInput(form.shippingFee),
        transport: parseCurrencyInput(form.transport),
        agency: parseCurrencyInput(form.agency),
        paar: parseCurrencyInput(form.paar),
        duty: parseCurrencyInput(form.duty),
        total,
        payments:
          initialPaid > 0
            ? [
                {
                  id: uuidv4(),
                  amount: initialPaid,
                  bank: form.bank || "N/A",
                  date: new Date().toISOString().split("T")[0],
                },
              ]
            : [],
        balance,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        const updated = records.map((r) => (r.id === editingId ? recordPayload : r));
        setRecords(updated);
        setEditingId(null);
      } else {
        setRecords((prev) => [...prev, recordPayload]);
      }

      resetForm();
      setShowSavedModal(true);
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRecord = (id) => {
    const rec = records.find((r) => r.id === id);
    if (!rec) return;
    setForm({
      consignee: rec.consignee || "",
      billOfLading: rec.billOfLading || "",
      containers: rec.containers || "",
      item: rec.item || "",
      tonnage: rec.tonnage || "",
      shipper: rec.shipper || "",
      terminalFee: formatCurrencyInput(rec.terminalFee || 0),
      shippingFee: formatCurrencyInput(rec.shippingFee || 0),
      transport: formatCurrencyInput(rec.transport || 0),
      agency: formatCurrencyInput(rec.agency || 0),
      paar: formatCurrencyInput(rec.paar || 0),
      duty: formatCurrencyInput(rec.duty || 0),
      amountPaid: "",
      bank: "",
    });
    setEditingId(id);
    setShowSavedModal(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteRecord = (id) => {
    if (!confirm("Are you sure you want to permanently delete this record?")) return;
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
  };

  const openUpdateModal = (record) => {
    setUpdateRecord(record);
    setPaymentInputs((prev) => ({ ...prev, [record.id]: { amount: "", bank: "", date: "" } }));
    setShowUpdateModal(true);
  };

  const handleSavePaymentFromModal = (recordId) => {
    const input = paymentInputs[recordId] || {};
    const rawAmount = parseCurrencyInput(input.amount);
    if (!rawAmount || rawAmount <= 0) return alert("Enter a valid payment amount");

    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== recordId) return r;
        const newPayment = {
          id: uuidv4(),
          amount: rawAmount,
          bank: input.bank || "N/A",
          date: input.date || new Date().toISOString().split("T")[0],
        };
        const updatedPayments = [...(r.payments || []), newPayment];
        const totalReceived = updatedPayments.reduce((s, p) => s + p.amount, 0);
        const newBalance = r.total - totalReceived;
        if (newBalance < 0) {
          alert("This payment would exceed the total due. Adjust the amount.");
          return r;
        }
        return { 
          ...r, 
          payments: updatedPayments, 
          balance: newBalance,
          updatedAt: new Date().toISOString()
        };
      })
    );

    setPaymentInputs((prev) => ({ ...prev, [recordId]: { amount: "", bank: "", date: "" } }));
    setShowUpdateModal(false);
    setUpdateRecord(null);
  };

  // -----------------------
  // Search & Filter
  // -----------------------
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchesSearch = 
        record.consignee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.item?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.billOfLading?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesConsignee = !filterConsignee || record.consignee === filterConsignee;
      
      return matchesSearch && matchesConsignee;
    });
  }, [records, searchTerm, filterConsignee]);

  // -----------------------
  // Dashboard Calculations
  // -----------------------
  const dashboardStats = useMemo(() => {
    return {
      totalRecords: records.length,
      totalValue: records.reduce((sum, r) => sum + r.total, 0),
      outstandingBalance: records.reduce((sum, r) => sum + r.balance, 0),
      completedRecords: records.filter(r => r.balance <= 0).length
    };
  }, [records]);

  // -----------------------
  // Backup & Export
  // -----------------------
  const exportData = () => {
    const data = {
      records,
      consignees,
      exportedAt: new Date().toISOString(),
      version: "1.0"
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `confiable-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.records && Array.isArray(imported.records)) {
          if (confirm('This will replace all current data. Continue?')) {
            setRecords(imported.records);
            if (imported.consignees) setConsignees(imported.consignees);
            alert('Data imported successfully!');
          }
        } else {
          alert('Invalid backup file format');
        }
      } catch (error) {
        alert('Failed to import backup file');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
  };

  // -----------------------
  // PDF Export
  // -----------------------
  const exportAsPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 40;
    const rightLimit = pageWidth - 40;

    if (!records || records.length === 0) {
      doc.setFontSize(12);
      doc.text("Confiable Nig Ltd — Clearing & Forwarding Records", leftMargin, 40);
      doc.setFontSize(10);
      doc.text("No records available.", leftMargin, 70);
      doc.save("confiable_clearing_records_detailed.pdf");
      return;
    }

    records.forEach((r, idx) => {
      if (idx > 0) doc.addPage();

      // Header
      doc.setFontSize(12);
      doc.text("Confiable Nig Ltd — Clearing & Forwarding Records", leftMargin, 40);

      // Consignee details
      doc.setFontSize(10);
      doc.text(`Consignee: ${r.consignee}`, leftMargin, 66);
      doc.text(`Item: ${r.item}`, leftMargin, 84);
      doc.text(`Bill of Lading: ${r.billOfLading || "-"}`, leftMargin, 102);
      doc.text(`Containers: ${r.containers || "-"}`, leftMargin + 280, 84);
      doc.text(`Tonnage: ${r.tonnage || "-"}`, leftMargin + 280, 102);
      doc.text(`Shipper: ${r.shipper || "-"}`, leftMargin, 120);

      // Fee breakdown table
      const feeRows = [
        ["Terminal Fee", formatCurrencyDisplay(r.terminalFee)],
        ["Shipping Fee", formatCurrencyDisplay(r.shippingFee)],
        ["Transport", formatCurrencyDisplay(r.transport)],
        ["Agency", formatCurrencyDisplay(r.agency)],
        ["PAAR", formatCurrencyDisplay(r.paar)],
        ["Duty", formatCurrencyDisplay(r.duty)],
      ];

      doc.autoTable({
        startY: 140,
        head: [["Fee", "Amount"]],
        body: feeRows,
        theme: "grid",
        styles: { cellPadding: 4, fontSize: 10 },
        headStyles: { fillColor: [220, 220, 220] },
        margin: { left: leftMargin, right: 40 },
        columnStyles: {
          0: { cellWidth: 280 },
          1: { halign: "right", cellWidth: 120 },
        },
      });

      let yAfterFees = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 170;

      // Payments table
      const grouped = groupByDate(r.payments || []);
      if (Object.keys(grouped).length === 0) {
        doc.setFontSize(10);
        doc.text("No payments recorded.", leftMargin, yAfterFees);
        yAfterFees += 18;
      } else {
        const paymentsRows = [];
        const dateKeys = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));
        dateKeys.forEach((date) => {
          grouped[date].forEach((p) => {
            paymentsRows.push([date, formatCurrencyDisplay(p.amount), p.bank || "N/A"]);
          });
        });

        doc.autoTable({
          startY: yAfterFees,
          head: [["Date", "Amount", "Bank"]],
          body: paymentsRows,
          theme: "grid",
          styles: { cellPadding: 4, fontSize: 10 },
          headStyles: { fillColor: [220, 220, 220] },
          margin: { left: leftMargin, right: 40 },
          columnStyles: {
            0: { cellWidth: 120 },
            1: { cellWidth: 120, halign: "right" },
            2: { cellWidth: 160 },
          },
        });

        yAfterFees = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : yAfterFees + 60;
      }

      // Totals summary
      doc.setFontSize(11);
      doc.text(`Total Fees: ${formatCurrencyDisplay(r.total)}`, leftMargin, yAfterFees);
      doc.text(`Remaining Balance: ${formatCurrencyDisplay(r.balance)}`, leftMargin + 280, yAfterFees);

      // Signature line
      const sigY = yAfterFees + 36;
      doc.setLineWidth(0.5);
      doc.line(leftMargin, sigY, leftMargin + 220, sigY);
      doc.setFontSize(9);
      doc.text("Prepared by: ____________________", leftMargin, sigY + 14);

      // Page footer
      const pageNum = idx + 1;
      const footerText = `Page ${pageNum} of ${records.length}`;
      doc.setFontSize(9);
      doc.text(footerText, pageWidth - leftMargin - doc.getTextWidth(footerText), 806);
    });

    doc.save("confiable_clearing_records_detailed.pdf");
  };

  const handlePrint = () => window.print();

  // -----------------------
  // Dashboard Component
  // -----------------------
  const Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-gray-600">Total Records</h3>
        <p className="text-2xl font-bold text-blue-600">{dashboardStats.totalRecords}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-gray-600">Total Value</h3>
        <p className="text-2xl font-bold text-green-600">{formatCurrencyDisplay(dashboardStats.totalValue)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-gray-600">Outstanding</h3>
        <p className="text-2xl font-bold text-red-600">{formatCurrencyDisplay(dashboardStats.outstandingBalance)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow border">
        <h3 className="font-semibold text-gray-600">Completed</h3>
        <p className="text-2xl font-bold text-green-600">{dashboardStats.completedRecords}</p>
      </div>
    </div>
  );

  // -----------------------
  // UI Render
  // -----------------------
  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-6 rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 uppercase text-center text-gray-700">
        Clearing & Forwarding Record
      </h2>

      {/* Dashboard */}
      <Dashboard />

      {/* Backup Section */}
      <div className="flex gap-2 mb-6 p-4 bg-white rounded-lg border">
        <button onClick={exportData} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Export Backup
        </button>
        <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
          Import Backup
          <input
            type="file"
            accept=".json"
            onChange={importData}
            className="hidden"
          />
        </label>
        <div className="flex-1"></div>
        <button 
          onClick={() => setShowSavedModal(true)} 
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          View All Records ({records.length})
        </button>
      </div>

      {/* Consignee Management */}
      <div className="flex gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Add new consignee"
          value={newConsignee}
          onChange={(e) => setNewConsignee(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />
        <button
          onClick={() => {
            if (!newConsignee.trim()) return;
            if (!consignees.includes(newConsignee.trim())) {
              setConsignees((s) => [...s, newConsignee.trim()]);
            }
            setNewConsignee("");
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Consignee
        </button>
      </div>

      {/* Main Form */}
      <div className="bg-white border rounded-lg p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <div>
            <select
              className={`border p-2 rounded-md w-full ${errors.consignee ? 'border-red-500' : ''}`}
              value={form.consignee}
              onChange={(e) => {
                setForm({ ...form, consignee: e.target.value });
                if (errors.consignee) setErrors(prev => ({ ...prev, consignee: '' }));
              }}
            >
              <option value="">Select Consignee</option>
              {consignees.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.consignee && <p className="text-red-500 text-sm mt-1">{errors.consignee}</p>}
          </div>

          <input
            type="text"
            className="border p-2 rounded-md"
            placeholder="Shipper"
            value={form.shipper}
            onChange={(e) => setForm({ ...form, shipper: e.target.value })}
          />

          <input
            type="text"
            className="border p-2 rounded-md"
            placeholder="Bill of Lading"
            value={form.billOfLading}
            onChange={(e) => setForm({ ...form, billOfLading: e.target.value })}
          />

          <input
            type="text"
            className="border p-2 rounded-md"
            placeholder="Containers"
            value={form.containers}
            onChange={(e) => setForm({ ...form, containers: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <input
              type="text"
              className={`border p-2 rounded-md w-full ${errors.item ? 'border-red-500' : ''}`}
              placeholder="Item"
              value={form.item}
              onChange={(e) => {
                setForm({ ...form, item: e.target.value });
                if (errors.item) setErrors(prev => ({ ...prev, item: '' }));
              }}
            />
            {errors.item && <p className="text-red-500 text-sm mt-1">{errors.item}</p>}
          </div>
          
          <input
            type="text"
            className="border p-2 rounded-md"
            placeholder="Tonnage"
            value={form.tonnage}
            onChange={(e) => setForm({ ...form, tonnage: e.target.value })}
          />
          
          <div>
            <input
              type="text"
              className={`border p-2 rounded-md w-full ${errors.amountPaid ? 'border-red-500' : ''}`}
              placeholder="Initial Amount Paid (optional)"
              value={form.amountPaid}
              onChange={(e) => {
                setForm({ ...form, amountPaid: formatCurrencyInput(e.target.value) });
                if (errors.amountPaid) setErrors(prev => ({ ...prev, amountPaid: '' }));
              }}
            />
            {errors.amountPaid && <p className="text-red-500 text-sm mt-1">{errors.amountPaid}</p>}
          </div>
          
          <input
            type="text"
            className="border p-2 rounded-md"
            placeholder="Bank"
            value={form.bank}
            onChange={(e) => setForm({ ...form, bank: e.target.value })}
          />
        </div>

        {/* Fee Breakdown */}
        <div className="bg-gray-100 rounded-md p-4 mb-4">
          <h3 className="font-semibold mb-3">Fee Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { key: "terminalFee", label: "Terminal Fee" },
              { key: "shippingFee", label: "Shipping Fee" },
              { key: "transport", label: "Transport" },
              { key: "agency", label: "Agency" },
              { key: "paar", label: "PAAR" },
              { key: "duty", label: "Duty" },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-sm text-gray-700">{f.label}</label>
                <input
                  type="text"
                  className={`border p-2 rounded-md w-full ${errors[f.key] ? 'border-red-500' : ''}`}
                  placeholder="0"
                  value={form[f.key]}
                  onChange={(e) => {
                    setForm({ ...form, [f.key]: formatCurrencyInput(e.target.value) });
                    if (errors[f.key]) setErrors(prev => ({ ...prev, [f.key]: '' }));
                  }}
                />
                {errors[f.key] && <p className="text-red-500 text-sm">{errors[f.key]}</p>}
              </div>
            ))}

            <div className="md:col-span-3 mt-2">
              <label className="font-bold">Total Fees</label>
              <input
                readOnly
                value={formatCurrencyDisplay(computeTotalFromForm())}
                className="border p-2 rounded-md w-full bg-gray-200 font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button 
            onClick={handleSaveRecord} 
            disabled={isLoading}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? "Saving..." : editingId ? "Update Record" : "Save Record"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Quick Records List */}
      {records.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Records</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {records.slice(0, 4).map((r) => (
              <div key={r.id} className="bg-white border rounded-md p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{r.consignee}</h4>
                    <p className="text-sm text-gray-600">{r.item}</p>
                    <p className="text-xs text-gray-500">{r.billOfLading || "No B/L"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrencyDisplay(r.total)}</p>
                    <p className={r.balance > 0 ? "text-red-600" : "text-green-700"}>
                      {formatCurrencyDisplay(r.balance)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openUpdateModal(r)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                  >
                    View / Update Payments
                  </button>

                  <button
                    onClick={() => handleEditRecord(r.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button 
                    onClick={() => handleDeleteRecord(r.id)} 
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Records Modal */}
      {showSavedModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl rounded-md p-6 overflow-auto max-h-[85vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Saved Records — Confiable Nig Ltd</h3>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border p-2 rounded-md"
                />
                <select
                  value={filterConsignee}
                  onChange={(e) => setFilterConsignee(e.target.value)}
                  className="border p-2 rounded-md"
                >
                  <option value="">All Consignees</option>
                  {consignees.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
                <button onClick={exportAsPDF} className="bg-red-700 text-white px-3 py-2 rounded-md text-sm hover:bg-red-800">
                  Export PDF
                </button>
                <button onClick={handlePrint} className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800">
                  Print
                </button>
                <button onClick={() => setShowSavedModal(false)} className="bg-gray-400 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-500">
                  Close
                </button>
              </div>
            </div>

            {filteredRecords.length === 0 ? (
              <p className="text-center text-gray-600">
                {records.length === 0 ? "No records found." : "No records match your search."}
              </p>
            ) : (
              <div className="space-y-4">
                {filteredRecords.map((r) => {
                  const grouped = groupByDate(r.payments || []);
                  return (
                    <div key={r.id} className="border rounded-md p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{r.consignee}</h4>
                          <p className="text-sm text-gray-600">Item: {r.item}</p>
                          <p className="text-sm text-gray-600">B/L: {r.billOfLading || "-"}</p>
                          <p className="text-xs text-gray-500">
                            Created: {new Date(r.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">{formatCurrencyDisplay(r.total)}</p>
                          <p className={r.balance > 0 ? "text-red-600" : "text-green-700"}>
                            {formatCurrencyDisplay(r.balance)}
                          </p>
                        </div>
                      </div>

                      {/* Fee breakdown */}
                      <div className="mt-3 text-sm text-gray-700 grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div>Terminal: {formatCurrencyDisplay(r.terminalFee)}</div>
                        <div>Shipping: {formatCurrencyDisplay(r.shippingFee)}</div>
                        <div>Transport: {formatCurrencyDisplay(r.transport)}</div>
                        <div>Agency: {formatCurrencyDisplay(r.agency)}</div>
                        <div>PAAR: {formatCurrencyDisplay(r.paar)}</div>
                        <div>Duty: {formatCurrencyDisplay(r.duty)}</div>
                      </div>

                      {/* Payments */}
                      <div className="mt-3">
                        <h5 className="font-semibold">Payment History</h5>
                        {Object.keys(grouped).length === 0 ? (
                          <p className="text-sm text-gray-500">No payments yet.</p>
                        ) : (
                          Object.entries(grouped).map(([date, payments]) => (
                            <div key={date} className="mt-2">
                              <p className="font-semibold text-gray-700">{date}</p>
                              <ul className="ml-4 list-disc text-sm text-gray-600">
                                {payments.map((p) => (
                                  <li key={p.id}>
                                    {formatCurrencyDisplay(p.amount)} — {p.bank}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        {r.balance > 0 && (
                          <button
                            onClick={() => {
                              openUpdateModal(r);
                              setShowSavedModal(false);
                            }}
                            className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                          >
                            Update Payment
                          </button>
                        )}

                        <button onClick={() => handleEditRecord(r.id)} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600">
                          Edit
                        </button>

                        <button onClick={() => handleDeleteRecord(r.id)} className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700">
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Update Payment Modal */}
      {showUpdateModal && updateRecord && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-md p-6">
            <h3 className="text-lg font-semibold mb-3">Add Payment — {updateRecord.consignee}</h3>
            <p className="text-sm text-gray-600 mb-4">
              Total: {formatCurrencyDisplay(updateRecord.total)} | 
              Balance: <span className={updateRecord.balance > 0 ? "text-red-600" : "text-green-700"}>
                {formatCurrencyDisplay(updateRecord.balance)}
              </span>
            </p>

            <input
              type="text"
              placeholder="Amount (e.g. 5,000)"
              className="border p-2 rounded-md w-full mb-3"
              value={paymentInputs[updateRecord.id]?.amount || ""}
              onChange={(e) =>
                setPaymentInputs((prev) => ({
                  ...prev,
                  [updateRecord.id]: { ...(prev[updateRecord.id] || {}), amount: formatCurrencyInput(e.target.value) },
                }))
              }
            />

            <input
              type="text"
              placeholder="Bank"
              className="border p-2 rounded-md w-full mb-3"
              value={paymentInputs[updateRecord.id]?.bank || ""}
              onChange={(e) =>
                setPaymentInputs((prev) => ({
                  ...prev,
                  [updateRecord.id]: { ...(prev[updateRecord.id] || {}), bank: e.target.value },
                }))
              }
            />

            <input
              type="date"
              className="border p-2 rounded-md w-full mb-4"
              value={paymentInputs[updateRecord.id]?.date || ""}
              onChange={(e) =>
                setPaymentInputs((prev) => ({
                  ...prev,
                  [updateRecord.id]: { ...(prev[updateRecord.id] || {}), date: e.target.value },
                }))
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setUpdateRecord(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleSavePaymentFromModal(updateRecord.id)} 
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
              >
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClearingForm;