"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const ClearingForm = () => {
  const [consignees, setConsignees] = useState(["Consignee A", "Consignee B"]);
  const [newConsignee, setNewConsignee] = useState("");
  const [records, setRecords] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [viewConsignee, setViewConsignee] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null); // for modal

  const [form, setForm] = useState({
    billOfLading: "",
    containers: "",
    item: "",
    tonnage: "",
    consignee: "",
    shipper: "",
    terminalFee: 0,
    shippingFee: 0,
    transport: 0,
    agency: 0,
    paar: 0,
    duty: 0,
    received: 0,
    date: "",
    bank: "",
  });

  // Format currency
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value || 0);

  const total =
    Number(form.terminalFee) +
    Number(form.shippingFee) +
    Number(form.transport) +
    Number(form.agency) +
    Number(form.paar) +
    Number(form.duty);

  const balance = total - Number(form.received);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addConsignee = () => {
    if (newConsignee && !consignees.includes(newConsignee)) {
      setConsignees([...consignees, newConsignee]);
      setForm({ ...form, consignee: newConsignee });
      setNewConsignee("");
    }
  };

  const saveRecord = () => {
    if (!form.consignee) return alert("Please select or add a consignee.");
    const record = { ...form, total, balance };
    setRecords([...records, record]);
    setForm({
      billOfLading: "",
      containers: "",
      item: "",
      tonnage: "",
      consignee: "",
      shipper: "",
      terminalFee: 0,
      shippingFee: 0,
      transport: 0,
      agency: 0,
      paar: 0,
      duty: 0,
      received: 0,
      date: "",
      bank: "",
    });
  };

  const deleteRecord = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setRecords(records.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("clearingRecords");
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("clearingRecords", JSON.stringify(records));
  }, [records]);

  return (
    
    <div className="max-w-6xl mx-auto bg-gray-300 p-6 shadow-lg rounded-2xl mt-6">
      <Navbar />
      <h2 className="text-3xl font-bold mb-8 uppercase text-center text-gray-700">
        Clearing & Forwarding Record
      </h2>

      {/* Shipment Details */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-5 italic text-gray-600">
          Shipment Details
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["billOfLading", "containers", "item", "tonnage"].map((field, i) => (
            <input
              key={i}
              type="text"
              name={field}
              placeholder={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              value={form[field]}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Parties & Fees */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-600">
          Parties & Fees
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-md uppercase font-bold">Consignee</label>
            <select
              name="consignee"
              value={form.consignee}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Consignee</option>
              {consignees.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="flex mt-2 gap-2">
              <input
                type="text"
                placeholder="Add new consignee"
                value={newConsignee}
                onChange={(e) => setNewConsignee(e.target.value)}
                className="border p-2 rounded-md flex-1"
              />
              <button
                type="button"
                onClick={addConsignee}
                className="bg-green-600 text-white px-3 rounded-md"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-md uppercase font-bold">Shipper</label>
            <input
              type="text"
              name="shipper"
              value={form.shipper}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </div>

          {[
            { name: "terminalFee", label: "Terminal Fee" },
            { name: "shippingFee", label: "Shipping Fee" },
            { name: "transport", label: "Transport" },
            { name: "agency", label: "Agency" },
            { name: "paar", label: "PAAR" },
            { name: "duty", label: "Duty" },
          ].map((fee, i) => (
            <div key={i}>
              <label className="block text-md uppercase font-bold">{fee.label}</label>
              <input
                type="number"
                name={fee.name}
                value={form[fee.name]}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-gray-50 p-6 rounded-xl border">
        <h3 className="text-lg font-semibold mb-3 text-gray-600">
          Payment Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-md uppercase font-bold">Total Fees</label>
            <input
              type="text"
              readOnly
              value={formatCurrency(total)}
              className="w-full p-2 border rounded-md bg-gray-100 font-semibold"
            />
          </div>
          <div>
            <label className="block text-md uppercase font-bold">Amount Received</label>
            <input
              type="number"
              name="received"
              value={form.received}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-md uppercase font-bold">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-md uppercase font-bold">Bank</label>
            <input
              type="text"
              name="bank"
              value={form.bank}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
        </div>

        <p className="text-lg font-semibold mt-4">
          Balance:{" "}
          <span className={balance > 0 ? "text-red-600" : "text-green-600"}>
            {formatCurrency(balance)}
          </span>
        </p>
      </div>

      <button
        onClick={saveRecord}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg w-full mt-6"
      >
        Save Record
      </button>

      {/* View Filter */}
      <div className="mt-10 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-700">
          Saved Records by Consignee
        </h3>
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-600">View:</label>
          <select
            value={viewConsignee}
            onChange={(e) => setViewConsignee(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="All">All Consignees</option>
            {consignees.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Records List */}
      {records.length === 0 ? (
        <p className="text-gray-500">No records yet.</p>
      ) : (
        consignees
          .filter((c) => viewConsignee === "All" || c === viewConsignee)
          .map((c) => {
            const consigneeRecords = records.filter((r) => r.consignee === c);
            if (consigneeRecords.length === 0) return null;
            return (
              <div key={c} className="mb-6 border rounded-lg">
                <h4
                  onClick={() =>
                    setExpanded({ ...expanded, [c]: !expanded[c] })
                  }
                  className="text-lg font-semibold text-gray-700 mb-2 cursor-pointer bg-gray-100 px-4 py-2 flex justify-between items-center"
                >
                  {c}
                  <span>{expanded[c] ? "▲" : "▼"}</span>
                </h4>

                {expanded[c] && (
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-3 py-2">Bill of Lading</th>
                          <th className="border px-3 py-2">Item</th>
                          <th className="border px-3 py-2">Total</th>
                          <th className="border px-3 py-2">Received</th>
                          <th className="border px-3 py-2">Balance</th>
                          <th className="border px-3 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consigneeRecords.map((r, i) => (
                          <tr key={i}>
                            <td className="border px-3 py-2">
                              {r.billOfLading}
                            </td>
                            <td className="border px-3 py-2">{r.item}</td>
                            <td className="border px-3 py-2">
                              {formatCurrency(r.total)}
                            </td>
                            <td className="border px-3 py-2">
                              {formatCurrency(r.received)}
                            </td>
                            <td className="border px-3 py-2">
                              {formatCurrency(r.balance)}
                            </td>
                            <td className="border px-3 py-2 text-center space-x-2">
                              <button
                                onClick={() => setSelectedRecord(r)}
                                className="text-blue-600 hover:underline"
                              >
                                View
                              </button>
                              <button
                                onClick={() =>
                                  deleteRecord(records.indexOf(r))
                                }
                                className="text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })
      )}

      {/* View Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg font-bold"
              onClick={() => setSelectedRecord(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
              {selectedRecord.consignee} — Payment Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <p>
                  <strong>Bill of Lading:</strong> {selectedRecord.billOfLading}
                </p>
                <p>
                  <strong>Containers:</strong> {selectedRecord.containers}
                </p>
                <p>
                  <strong>Item:</strong> {selectedRecord.item}
                </p>
                <p>
                  <strong>Tonnage:</strong> {selectedRecord.tonnage}
                </p>
                <p>
                  <strong>Shipper:</strong> {selectedRecord.shipper}
                </p>
                <p>
                  <strong>Date:</strong> {selectedRecord.date}
                </p>
                <p>
                  <strong>Bank:</strong> {selectedRecord.bank}
                </p>
              </div>

              <h3 className="text-lg font-semibold mt-4 text-gray-700">
                Fees Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <p>Terminal Fee: {formatCurrency(selectedRecord.terminalFee)}</p>
                <p>Shipping Fee: {formatCurrency(selectedRecord.shippingFee)}</p>
                <p>Transport: {formatCurrency(selectedRecord.transport)}</p>
                <p>Agency: {formatCurrency(selectedRecord.agency)}</p>
                <p>PAAR: {formatCurrency(selectedRecord.paar)}</p>
                <p>Duty: {formatCurrency(selectedRecord.duty)}</p>
              </div>

              <div className="mt-4 border-t pt-3 font-semibold text-gray-700">
                <p>Total: {formatCurrency(selectedRecord.total)}</p>
                <p>Received: {formatCurrency(selectedRecord.received)}</p>
                <p>
                  Balance:{" "}
                  <span
                    className={
                      selectedRecord.balance > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {formatCurrency(selectedRecord.balance)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClearingForm;
