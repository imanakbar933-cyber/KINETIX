import React, { useState, useMemo } from "react";
import {
  Search, Plus, Filter, Download, Eye, Trash2, X, Check,
  FileText, Calendar, DollarSign, Printer, CreditCard, Phone
} from "lucide-react";
import "./BillingList.css";

// ================= DUMMY DATA =================
const initialInvoices = [
  { id: "INV-2026-012", member: "Cody Fisher", phone: "+1 555-0101", amount: "450.00", date: "Oct 15, 2026", dueDate: "Oct 30, 2026", status: "Paid", type: "Gold Membership" },
  { id: "INV-2026-011", member: "Marvin McKinney", phone: "+1 555-0102", amount: "450.00", date: "Oct 12, 2026", dueDate: "Oct 27, 2026", status: "Pending", type: "Silver Membership" },
  { id: "INV-2026-010", member: "Annette Black", phone: "+1 555-0103", amount: "450.00", date: "Oct 10, 2026", dueDate: "Oct 25, 2026", status: "Paid", type: "Platinum Membership" },
  { id: "INV-2026-009", member: "Dianne Russell", phone: "+1 555-0104", amount: "450.00", date: "Oct 05, 2026", dueDate: "Oct 20, 2026", status: "Overdue", type: "Gold Membership" },
  { id: "INV-2026-008", member: "Eleanor Pena", phone: "+1 555-0105", amount: "450.00", date: "Oct 01, 2026", dueDate: "Oct 16, 2026", status: "Paid", type: "Silver Membership" },
  { id: "INV-2026-007", member: "Guy Hawkins", phone: "+1 555-0106", amount: "450.00", date: "Sep 28, 2026", dueDate: "Oct 13, 2026", status: "Pending", type: "Gold Membership" },
];

const filterTabs = ["All", "Paid", "Pending", "Overdue"];

export default function BillingList() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Generate Form
  const [newBillData, setNewBillData] = useState({
    member: "",
    phone: "",
    type: "Membership",
    amount: "",
    dueDate: "",
    notes: ""
  });

  // Edit Form
  const [editData, setEditData] = useState({
    member: "",
    phone: "",
    amount: "",
    dueDate: "",
    status: "Pending",
    type: "Membership"
  });

  // ✅ Filter + search (name, id, phone)
  const filteredInvoices = invoices.filter((inv) => {
    const matchesTab = activeTab === "All" || inv.status === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      inv.member.toLowerCase().includes(q) ||
      inv.id.toLowerCase().includes(q) ||
      (inv.phone || "").toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  // ✅ Filter counts
  const counts = useMemo(() => {
    const c = { All: invoices.length, Paid: 0, Pending: 0, Overdue: 0 };
    invoices.forEach((inv) => {
      if (c[inv.status] !== undefined) c[inv.status]++;
    });
    return c;
  }, [invoices]);

  // ✅ Footer summary
  const summary = useMemo(() => {
    const totalAmount = filteredInvoices.reduce(
      (s, inv) => s + Number(inv.amount || 0),
      0
    );
    return { count: filteredInvoices.length, totalAmount };
  }, [filteredInvoices]);

  // Handlers
  const handleDelete = () => {
    if (selectedInvoice) {
      setInvoices(invoices.filter((inv) => inv.id !== selectedInvoice.id));
      setIsDeleteModalOpen(false);
      setSelectedInvoice(null);
    }
  };

  const handleGenerateBill = (e) => {
    e.preventDefault();
    const newInvoice = {
      id: `INV-2026-${Math.floor(Math.random() * 900) + 100}`,
      member: newBillData.member || "Unknown Member",
      phone: newBillData.phone || "—",
      amount: Number(newBillData.amount || 0).toFixed(2),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }),
      dueDate: newBillData.dueDate
        ? new Date(newBillData.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          })
        : "Not set",
      status: "Pending",
      type: newBillData.type
    };

    setInvoices([newInvoice, ...invoices]);
    setIsGenerateModalOpen(false);
    setNewBillData({
      member: "",
      phone: "",
      type: "Membership",
      amount: "",
      dueDate: "",
      notes: ""
    });
    setActiveTab("All");
  };

  const openPreview = (inv) => {
    setSelectedInvoice(inv);
    setIsPreviewModalOpen(true);
  };

  const openDelete = (inv) => {
    setSelectedInvoice(inv);
    setIsDeleteModalOpen(true);
  };

  // ✅ Open edit (from preview or row)
  const openEdit = (inv) => {
    setSelectedInvoice(inv);
    setEditData({
      member: inv.member,
      phone: inv.phone || "",
      amount: inv.amount,
      dueDate: inv.dueDate,
      status: inv.status,
      type: inv.type
    });
    setIsPreviewModalOpen(false);
    setIsEditModalOpen(true);
  };

  // ✅ Save edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === selectedInvoice.id
          ? {
              ...inv,
              member: editData.member,
              phone: editData.phone,
              amount: Number(editData.amount || 0).toFixed(2),
              dueDate: editData.dueDate,
              status: editData.status,
              type: editData.type
            }
          : inv
      )
    );

    setIsEditModalOpen(false);
    setSelectedInvoice(null);
  };

  // ✅ Status quick update
  const updateStatus = (id, status) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );
    setSelectedInvoice((prev) => (prev ? { ...prev, status } : prev));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "status-paid";
      case "Pending": return "status-pending";
      case "Overdue": return "status-overdue";
      default: return "";
    }
  };

  return (
    <div className="billing-container">
      {/* HEADER */}
      <div className="billing-header">
        <div>
          <h1>Billing List</h1>
          <p>Manage invoices, payments & billing history</p>
        </div>
        <button className="rp-btn-solid" onClick={() => setIsGenerateModalOpen(true)}>
          <Plus size={18} /> New Bill
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="billing-summary-grid">
        <div className="summary-card">
          <div className="summary-title">
            <DollarSign size={16} className="text-green" /> Total Revenue
          </div>
          <h2>
            $
            {invoices
              .filter((i) => i.status === "Paid")
              .reduce((s, i) => s + Number(i.amount || 0), 0)
              .toLocaleString()}
          </h2>
        </div>
        <div className="summary-card">
          <div className="summary-title">
            <FileText size={16} className="text-yellow" /> Pending Bills
          </div>
          <h2 className="text-yellow">
            $
            {invoices
              .filter((i) => i.status === "Pending")
              .reduce((s, i) => s + Number(i.amount || 0), 0)
              .toLocaleString()}
          </h2>
        </div>
        <div className="summary-card">
          <div className="summary-title">
            <CreditCard size={16} className="text-red" /> Overdue Amount
          </div>
          <h2 className="text-red">
            $
            {invoices
              .filter((i) => i.status === "Overdue")
              .reduce((s, i) => s + Number(i.amount || 0), 0)
              .toLocaleString()}
          </h2>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="billing-filters">
        <div className="billing-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`rp-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className="tab-count">{counts[tab]}</span>
            </button>
          ))}
        </div>

        <div className="billing-search-actions">
          <div className="rp-search">
            <Search size={16} className="text-gray" />
            <input
              type="text"
              placeholder="Search by ID, Name or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="rp-btn-outline">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* TABLE SECTION WITH STICKY FOOTER */}
      <div className="billing-table-wrapper">
        <div className="billing-table-scroll">
          <table className="billing-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Member</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="invoice-id">{inv.id}</td>
                    <td>
                      <span className="m-name">{inv.member}</span>
                    </td>
                    <td className="invoice-phone">
                      <Phone size={13} /> {inv.phone || "—"}
                    </td>
                    <td className="invoice-date">{inv.date}</td>
                    <td className="invoice-amount">${inv.amount}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="action-btn view"
                          onClick={() => openPreview(inv)}
                          title="Preview"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => openEdit(inv)}
                          title="Edit"
                        >
                          <FileText size={16} />
                        </button>
                        <button
                          className="action-btn download"
                          onClick={() => alert(`Downloading ${inv.id}...`)}
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => openDelete(inv)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No invoices found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER SUMMARY (Sticky & Always Visible) */}
        {filteredInvoices.length > 0 && (
          <div className="billing-sticky-footer">
            <div>
              Showing <strong>{summary.count}</strong> invoice
              {summary.count !== 1 ? "s" : ""}
              {activeTab !== "All" && (
                <> · filter: <strong>{activeTab}</strong></>
              )}
            </div>
            <div className="footer-total-right">
              <span className="footer-label">TOTAL:</span>
              <span className="footer-amount">
                ${summary.totalAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ================= GENERATE MODAL ================= */}
      {isGenerateModalOpen && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal">
            <div className="rp-modal-header">
              <h2>Generate New Bill</h2>
              <button
                className="rp-close-btn"
                onClick={() => setIsGenerateModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGenerateBill}>
              <div className="generate-form-grid">
                <div className="rp-form-group">
                  <label>MEMBER NAME</label>
                  <select
                    required
                    value={newBillData.member}
                    onChange={(e) =>
                      setNewBillData({ ...newBillData, member: e.target.value })
                    }
                  >
                    <option value="">Select Member...</option>
                    <option value="Cody Fisher">Cody Fisher</option>
                    <option value="Marvin McKinney">Marvin McKinney</option>
                    <option value="Annette Black">Annette Black</option>
                    <option value="Dianne Russell">Dianne Russell</option>
                    <option value="Eleanor Pena">Eleanor Pena</option>
                    <option value="Guy Hawkins">Guy Hawkins</option>
                  </select>
                </div>

                <div className="rp-form-group">
                  <label>PHONE NUMBER</label>
                  <input
                    type="tel"
                    className="rp-input"
                    placeholder="+1 555-0000"
                    required
                    value={newBillData.phone}
                    onChange={(e) =>
                      setNewBillData({ ...newBillData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="rp-form-group">
                  <label>BILLING TYPE</label>
                  <select
                    value={newBillData.type}
                    onChange={(e) =>
                      setNewBillData({ ...newBillData, type: e.target.value })
                    }
                  >
                    <option value="Membership">Membership</option>
                    <option value="Personal Training">Personal Training</option>
                    <option value="Merchandise">Merchandise</option>
                  </select>
                </div>

                <div className="rp-form-group">
                  <label>AMOUNT ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="rp-input"
                    placeholder="450.00"
                    required
                    value={newBillData.amount}
                    onChange={(e) =>
                      setNewBillData({ ...newBillData, amount: e.target.value })
                    }
                  />
                </div>

                <div className="rp-form-group">
                  <label>DUE DATE</label>
                  <input
                    type="date"
                    className="rp-input date-input"
                    required
                    value={newBillData.dueDate}
                    onChange={(e) =>
                      setNewBillData({ ...newBillData, dueDate: e.target.value })
                    }
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                  />
                </div>
              </div>

              <div className="rp-form-group" style={{ marginBottom: "24px" }}>
                <label>NOTES (OPTIONAL)</label>
                <textarea
                  className="rp-input"
                  rows="2"
                  placeholder="Add any notes..."
                  value={newBillData.notes}
                  onChange={(e) =>
                    setNewBillData({ ...newBillData, notes: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="rp-modal-actions">
                <button
                  type="button"
                  className="rp-btn-outline flex-1"
                  onClick={() => setIsGenerateModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="rp-btn-solid flex-1">
                  <FileText size={16} /> Generate Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= PREVIEW MODAL ================= */}
      {isPreviewModalOpen && selectedInvoice && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal preview-modal">
            <div className="rp-modal-header">
              <h2>Invoice Details</h2>
              <button
                className="rp-close-btn"
                onClick={() => setIsPreviewModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="preview-top-card">
              <div
                className="ptc-icon"
                style={{ background: "rgba(3, 234, 4, 0.1)", color: "#03ea04" }}
              >
                <FileText size={24} />
              </div>
              <div>
                <h3>{selectedInvoice.id}</h3>
                <p>
                  Issued to: <strong>{selectedInvoice.member}</strong>
                </p>
                <p style={{ marginTop: 4 }}>
                  <Phone size={12} /> {selectedInvoice.phone || "—"}
                </p>
              </div>
            </div>

            <div className="invoice-details-grid">
              <div className="ps-card">
                <span>BILL DATE</span>
                <h4>{selectedInvoice.date}</h4>
              </div>
              <div className="ps-card">
                <span>DUE DATE</span>
                <h4>{selectedInvoice.dueDate}</h4>
              </div>
              <div className="ps-card">
                <span>STATUS</span>
                <h4 className={getStatusColor(selectedInvoice.status)}>
                  {selectedInvoice.status}
                </h4>
              </div>
            </div>

            {/* quick status change */}
            <div className="status-switcher">
              <span>Mark as:</span>
              {["Paid", "Pending", "Overdue"].map((s) => (
                <button
                  key={s}
                  className={`status-chip ${getStatusColor(s)} ${
                    selectedInvoice.status === s ? "active" : ""
                  }`}
                  onClick={() => updateStatus(selectedInvoice.id, s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="preview-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>DESCRIPTION</th>
                    <th className="text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedInvoice.type}</td>
                    <td className="text-right">${selectedInvoice.amount}</td>
                  </tr>
                  <tr className="row-total">
                    <td>Total Amount</td>
                    <td className="text-right">${selectedInvoice.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rp-modal-actions wrap">
              <button className="rp-btn-outline flex-1">
                <Printer size={16} /> Print
              </button>
              <button
                className="rp-btn-outline flex-1"
                onClick={() => alert("Downloading invoice...")}
              >
                <Download size={16} /> Download
              </button>
              <button
                className="rp-btn-outline flex-1"
                onClick={() => openEdit(selectedInvoice)}
              >
                <FileText size={16} /> Edit
              </button>
              <button
                className="rp-btn-solid flex-1"
                onClick={() => setIsPreviewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT INVOICE MODAL ================= */}
      {isEditModalOpen && selectedInvoice && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal">
            <div className="rp-modal-header">
              <h2>Edit Invoice</h2>
              <button
                className="rp-close-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <p
              style={{
                color: "#888",
                fontSize: "13px",
                marginTop: "-10px",
                marginBottom: "16px"
              }}
            >
              Invoice ID:{" "}
              <strong style={{ color: "#03ea04" }}>{selectedInvoice.id}</strong>
            </p>

            <form onSubmit={handleSaveEdit}>
              <div className="generate-form-grid">
                <div className="rp-form-group">
                  <label>MEMBER NAME</label>
                  <input
                    type="text"
                    className="rp-input"
                    value={editData.member}
                    onChange={(e) =>
                      setEditData({ ...editData, member: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="rp-form-group">
                  <label>PHONE NUMBER</label>
                  <input
                    type="tel"
                    className="rp-input"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="rp-form-group">
                  <label>BILLING TYPE</label>
                  <select
                    value={editData.type}
                    onChange={(e) =>
                      setEditData({ ...editData, type: e.target.value })
                    }
                  >
                    <option value="Membership">Membership</option>
                    <option value="Gold Membership">Gold Membership</option>
                    <option value="Silver Membership">Silver Membership</option>
                    <option value="Platinum Membership">Platinum Membership</option>
                    <option value="Personal Training">Personal Training</option>
                    <option value="Merchandise">Merchandise</option>
                  </select>
                </div>

                <div className="rp-form-group">
                  <label>AMOUNT ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="rp-input"
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({ ...editData, amount: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="rp-form-group">
                  <label>DUE DATE</label>
                  <input
                    type="text"
                    className="rp-input"
                    value={editData.dueDate}
                    onChange={(e) =>
                      setEditData({ ...editData, dueDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="rp-form-group">
                  <label>STATUS</label>
                  <select
                    value={editData.status}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="rp-modal-actions">
                <button
                  type="button"
                  className="rp-btn-outline flex-1"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="rp-btn-solid flex-1">
                  <Check size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteModalOpen && selectedInvoice && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal">
            <div className="rp-modal-header">
              <h2>Delete Invoice</h2>
              <button
                className="rp-close-btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <p
              style={{
                color: "#888",
                marginBottom: "24px",
                fontSize: "15px"
              }}
            >
              Are you sure you want to delete invoice{" "}
              <strong>{selectedInvoice.id}</strong> for {selectedInvoice.member}?
              This action cannot be undone.
            </p>
            <div className="rp-modal-actions">
              <button
                className="rp-btn-outline flex-1"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button className="rp-btn-danger flex-1" onClick={handleDelete}>
                <Trash2 size={16} /> Delete Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}