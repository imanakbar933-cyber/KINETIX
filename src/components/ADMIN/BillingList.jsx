import React, { useState } from "react";
import {
  Search, Plus, Filter, Download, Eye, Trash2, X, Check,
  FileText, Calendar, DollarSign, Printer, CreditCard
} from "lucide-react";
import "./BillingList.css";

// ================= DUMMY DATA =================
const initialInvoices = [
  { id: "INV-2026-012", member: "Cody Fisher", email: "cody@example.com", amount: "450.00", date: "Oct 15, 2026", dueDate: "Oct 30, 2026", status: "Paid", type: "Gold Membership" },
  { id: "INV-2026-011", member: "Marvin McKinney", email: "marvin@example.com", amount: "450.00", date: "Oct 12, 2026", dueDate: "Oct 27, 2026", status: "Pending", type: "Silver Membership" },
  { id: "INV-2026-010", member: "Annette Black", email: "annette@example.com", amount: "450.00", date: "Oct 10, 2026", dueDate: "Oct 25, 2026", status: "Paid", type: "Platinum Membership" },
  { id: "INV-2026-009", member: "Dianne Russell", email: "dianne@example.com", amount: "450.00", date: "Oct 05, 2026", dueDate: "Oct 20, 2026", status: "Overdue", type: "Gold Membership" },
  { id: "INV-2026-008", member: "Eleanor Pena", email: "eleanor@example.com", amount: "450.00", date: "Oct 01, 2026", dueDate: "Oct 16, 2026", status: "Paid", type: "Silver Membership" },
  { id: "INV-2026-007", member: "Guy Hawkins", email: "guy@example.com", amount: "450.00", date: "Sep 28, 2026", dueDate: "Oct 13, 2026", status: "Pending", type: "Gold Membership" },
];

const filterTabs = ["All", "Paid", "Pending", "Overdue"];

export default function BillingList() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals state
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Form State (Naya)
  const [newBillData, setNewBillData] = useState({
    member: "",
    type: "Membership",
    amount: "",
    dueDate: "",
    notes: ""
  });

  // ✅ Search Functionality (ID aur Name dono par kaam karega)
  const filteredInvoices = invoices.filter((inv) => {
    const matchesTab = activeTab === "All" || inv.status === activeTab;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      inv.member.toLowerCase().includes(searchLower) || 
      inv.id.toLowerCase().includes(searchLower);
    return matchesTab && matchesSearch;
  });

  // Handlers
  const handleDelete = () => {
    if (selectedInvoice) {
      setInvoices(invoices.filter((inv) => inv.id !== selectedInvoice.id));
      setIsDeleteModalOpen(false);
      setSelectedInvoice(null);
    }
  };

  // ✅ Naya Bill Generate karna
  const handleGenerateBill = (e) => {
    e.preventDefault();
    const newInvoice = {
      id: `INV-2026-${Math.floor(Math.random() * 900) + 100}`, // Random ID
      member: newBillData.member || "Unknown Member",
      email: "newmember@example.com",
      amount: newBillData.amount || "0.00",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      dueDate: newBillData.dueDate || "Not set",
      status: "Pending",
      type: newBillData.type
    };
    
    setInvoices([newInvoice, ...invoices]);
    setIsGenerateModalOpen(false);
    setNewBillData({ member: "", type: "Membership", amount: "", dueDate: "", notes: "" }); // Reset
  };

  const openPreview = (inv) => {
    setSelectedInvoice(inv);
    setIsPreviewModalOpen(true);
  };

  const openDelete = (inv) => {
    setSelectedInvoice(inv);
    setIsDeleteModalOpen(true);
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
      {/* ================= HEADER ================= */}
      <div className="billing-header">
        <div>
          <h1>Billing List</h1>
          <p>Manage invoices, payments & billing history</p>
        </div>
        <button className="rp-btn-solid" onClick={() => setIsGenerateModalOpen(true)}>
          <Plus size={18} /> New Bill
        </button>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="billing-summary-grid">
        <div className="summary-card">
          <div className="summary-title"><DollarSign size={16} className="text-green" /> Total Revenue</div>
          <h2>$12,450</h2>
        </div>
        <div className="summary-card">
          <div className="summary-title"><FileText size={16} className="text-yellow" /> Pending Bills</div>
          <h2 className="text-yellow">$2,250</h2>
        </div>
        <div className="summary-card">
          <div className="summary-title"><CreditCard size={16} className="text-red" /> Overdue Amount</div>
          <h2 className="text-red">$450</h2>
        </div>
      </div>

      {/* ================= FILTER & SEARCH ================= */}
      <div className="billing-filters">
        <div className="billing-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`rp-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="billing-search-actions">
          <div className="rp-search">
            <Search size={16} className="text-gray" />
            <input
              type="text"
              placeholder="Search by ID or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="rp-btn-outline">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="billing-table-container">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Member Details</th>
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
                    <div className="member-info-cell">
                      <span className="m-name">{inv.member}</span>
                      <span className="m-email">{inv.email}</span>
                    </div>
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
                      <button className="action-btn view" onClick={() => openPreview(inv)} title="Preview">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn download" onClick={() => alert(`Downloading ${inv.id}...`)} title="Download">
                        <Download size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => openDelete(inv)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">No invoices found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= GENERATE MODAL ================= */}
      {isGenerateModalOpen && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal">
            <div className="rp-modal-header">
              <h2>Generate New Bill</h2>
              <button className="rp-close-btn" onClick={() => setIsGenerateModalOpen(false)}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleGenerateBill}>
              <div className="generate-form-grid">
                <div className="rp-form-group">
                  <label>MEMBER NAME</label>
                  <select 
                    required 
                    value={newBillData.member}
                    onChange={(e) => setNewBillData({...newBillData, member: e.target.value})}
                  >
                    <option value="">Select Member...</option>
                    <option value="Cody Fisher">Cody Fisher</option>
                    <option value="Marvin McKinney">Marvin McKinney</option>
                    <option value="Annette Black">Annette Black</option>
                  </select>
                </div>
                <div className="rp-form-group">
                  <label>BILLING TYPE</label>
                  <select 
                    value={newBillData.type}
                    onChange={(e) => setNewBillData({...newBillData, type: e.target.value})}
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
                    className="rp-input" 
                    placeholder="450.00" 
                    required
                    value={newBillData.amount}
                    onChange={(e) => setNewBillData({...newBillData, amount: e.target.value})}
                  />
                </div>
                <div className="rp-form-group">
                  <label>DUE DATE</label>
                  {/* ✅ Date Input Fix (showPicker add kiya) */}
                  <input 
                    type="date" 
                    className="rp-input date-input" 
                    required
                    value={newBillData.dueDate}
                    onChange={(e) => setNewBillData({...newBillData, dueDate: e.target.value})}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()} 
                  />
                </div>
              </div>

              <div className="rp-form-group" style={{ marginBottom: '24px' }}>
                <label>NOTES (OPTIONAL)</label>
                <textarea 
                  className="rp-input" 
                  rows="2" 
                  placeholder="Add any notes..."
                  value={newBillData.notes}
                  onChange={(e) => setNewBillData({...newBillData, notes: e.target.value})}
                ></textarea>
              </div>

              <div className="rp-modal-actions">
                <button type="button" className="rp-btn-outline flex-1" onClick={() => setIsGenerateModalOpen(false)}>Cancel</button>
                <button type="submit" className="rp-btn-solid flex-1">
                  <FileText size={16} /> Generate Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= PREVIEW INVOICE MODAL ================= */}
      {isPreviewModalOpen && selectedInvoice && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal preview-modal">
            <div className="rp-modal-header">
              <h2>Invoice Details</h2>
              <button className="rp-close-btn" onClick={() => setIsPreviewModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="preview-top-card">
              <div className="ptc-icon" style={{ background: 'rgba(3, 234, 4, 0.1)', color: '#03ea04' }}>
                <FileText size={24} />
              </div>
              <div>
                <h3>{selectedInvoice.id}</h3>
                <p>Issued to: <strong>{selectedInvoice.member}</strong></p>
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
                <h4 className={getStatusColor(selectedInvoice.status)}>{selectedInvoice.status}</h4>
              </div>
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

            <div className="rp-modal-actions">
              <button className="rp-btn-outline flex-1"><Printer size={16} /> Print</button>
              <button className="rp-btn-outline flex-1" onClick={() => alert("Downloading invoice...")}><Download size={16} /> Download</button>
              <button className="rp-btn-solid flex-1" onClick={() => setIsPreviewModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteModalOpen && selectedInvoice && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal">
            <div className="rp-modal-header">
              <h2>Delete Invoice</h2>
              <button className="rp-close-btn" onClick={() => setIsDeleteModalOpen(false)}><X size={20} /></button>
            </div>
            <p style={{ color: '#888', marginBottom: '24px', fontSize: '15px' }}>
              Are you sure you want to delete invoice <strong>{selectedInvoice.id}</strong> for {selectedInvoice.member}? This action cannot be undone.
            </p>
            <div className="rp-modal-actions">
              <button className="rp-btn-outline flex-1" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
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