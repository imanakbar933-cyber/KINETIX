import { useState } from "react";
import "./Staff.css";

const initialStaff = [
  {
    id: "EMP-001", name: "Ahmed Raza", role: "Trainer", department: "Fitness",
    phone: "0300-1234567", cnic: "35201-1234567-1",
    address: "House 45, Street 8, Johar Town", city: "Lahore",
    emergencyContact: "0301-7654321 (Brother)", shift: "Morning (6AM - 2PM)",
    joinDate: "15-Jan-2023", status: "Active", salary: 45000,
    attendance: [
      { date: "18-Nov", status: "Present" }, { date: "19-Nov", status: "Present" },
      { date: "20-Nov", status: "Present" }, { date: "21-Nov", status: "Absent" },
    ],
    salaryHistory: [
      { month: "Oct 2025", amount: 45000, paid: true, method: "Bank Transfer", date: "05-Oct-2025", txnId: "BANK-9982" },
      { month: "Nov 2025", amount: 45000, paid: false, method: "-", date: "-", txnId: "-" },
    ],
    notes: [
      { date: "01-Nov-2025", text: "Promoted to Senior Trainer.", type: "info" }
    ]
  },
  {
    id: "EMP-002", name: "Fatima Khan", role: "Receptionist", department: "Front Desk",
    phone: "0321-9876543", cnic: "42101-9876543-2",
    address: "Flat 12B, Clifton Block 5", city: "Karachi",
    emergencyContact: "0333-1122334 (Father)", shift: "Evening (2PM - 10PM)",
    joinDate: "10-Mar-2023", status: "Active", salary: 35000,
    attendance: [
      { date: "18-Nov", status: "Present" }, { date: "19-Nov", status: "Present" },
      { date: "20-Nov", status: "Present" }, { date: "21-Nov", status: "Present" },
    ],
    salaryHistory: [
      { month: "Oct 2025", amount: 35000, paid: true, method: "EasyPaisa", date: "03-Oct-2025", txnId: "EP-8837" },
    ],
    notes: []
  },
  {
    id: "EMP-003", name: "Muhammad Bilal", role: "Cleaner", department: "Maintenance",
    phone: "0333-4567890", cnic: "61101-4567890-3",
    address: "House 78, G-11/2", city: "Islamabad",
    emergencyContact: "0345-9988776 (Wife)", shift: "Morning (6AM - 2PM)",
    joinDate: "20-Jun-2023", status: "Active", salary: 25000,
    attendance: [
      { date: "18-Nov", status: "Present" }, { date: "19-Nov", status: "Absent" },
      { date: "20-Nov", status: "Present" }, { date: "21-Nov", status: "Present" },
    ],
    salaryHistory: [
      { month: "Nov 2025", amount: 25000, paid: false, method: "-", date: "-", txnId: "-" },
    ],
    notes: [
      { date: "15-Nov-2025", text: "Warned for late arrival.", type: "warning" }
    ]
  },
  {
    id: "EMP-004", name: "Usman Tariq", role: "Manager", department: "Administration",
    phone: "0345-1122334", cnic: "35202-1122334-4",
    address: "House 12, DHA Phase 5", city: "Lahore",
    emergencyContact: "0300-5566778 (Brother)", shift: "Full Day (9AM - 9PM)",
    joinDate: "01-Feb-2022", status: "Active", salary: 80000,
    attendance: [
      { date: "18-Nov", status: "Present" }, { date: "19-Nov", status: "Present" },
    ],
    salaryHistory: [
      { month: "Oct 2025", amount: 80000, paid: true, method: "Bank Transfer", date: "01-Oct-2025", txnId: "BANK-1122" },
    ],
    notes: []
  },
  {
    id: "EMP-005", name: "Zainab Hussain", role: "Trainer", department: "Fitness",
    phone: "0312-7788990", cnic: "37405-7788990-6",
    address: "House 90, F-8/3", city: "Islamabad",
    emergencyContact: "0321-2233445 (Mother)", shift: "Evening (2PM - 10PM)",
    joinDate: "05-Jul-2023", status: "Leave", salary: 50000,
    attendance: [],
    salaryHistory: [
      { month: "Oct 2025", amount: 50000, paid: true, method: "JazzCash", date: "04-Oct-2025", txnId: "JC-4432" },
    ],
    notes: []
  },
  {
    id: "EMP-006", name: "Kamran Ali", role: "Security Guard", department: "Security",
    phone: "0301-3344556", cnic: "17301-3344556-7",
    address: "Quarter 5, Hayatabad", city: "Peshawar",
    emergencyContact: "0345-6677889 (Brother)", shift: "Night (10PM - 6AM)",
    joinDate: "12-Nov-2023", status: "Active", salary: 30000,
    attendance: [],
    salaryHistory: [
      { month: "Nov 2025", amount: 30000, paid: false, method: "-", date: "-", txnId: "-" },
    ],
    notes: []
  },
  {
    id: "EMP-007", name: "Sana Malik", role: "Nutritionist", department: "Health",
    phone: "0302-1122334", cnic: "42101-9988776-8",
    address: "Apartment 4B, Gulberg", city: "Lahore",
    emergencyContact: "0321-4455667 (Husband)", shift: "Morning (9AM - 5PM)",
    joinDate: "01-Sep-2024", status: "Active", salary: 60000,
    attendance: [],
    salaryHistory: [
      { month: "Oct 2025", amount: 60000, paid: true, method: "Bank Transfer", date: "01-Oct-2025", txnId: "BANK-5566" },
    ],
    notes: []
  },
  {
    id: "EMP-008", name: "Imran Shah", role: "Physiotherapist", department: "Health",
    phone: "0333-5566778", cnic: "61101-1122334-9",
    address: "House 22, F-10", city: "Islamabad",
    emergencyContact: "0345-8899001 (Wife)", shift: "Evening (2PM - 10PM)",
    joinDate: "15-Jan-2024", status: "Active", salary: 55000,
    attendance: [],
    salaryHistory: [
      { month: "Oct 2025", amount: 55000, paid: true, method: "EasyPaisa", date: "03-Oct-2025", txnId: "EP-2244" },
    ],
    notes: []
  },
  {
    id: "EMP-009", name: "Rizwan Ahmed", role: "Cleaner", department: "Maintenance",
    phone: "0345-8899001", cnic: "37405-5566778-0",
    address: "House 14, Satellite Town", city: "Rawalpindi",
    emergencyContact: "0321-3344556 (Brother)", shift: "Evening (2PM - 10PM)",
    joinDate: "10-Mar-2024", status: "Active", salary: 25000,
    attendance: [],
    salaryHistory: [
      { month: "Nov 2025", amount: 25000, paid: false, method: "-", date: "-", txnId: "-" },
    ],
    notes: []
  },
  {
    id: "EMP-010", name: "Ali Hassan", role: "Peon", department: "General",
    phone: "0312-3344556", cnic: "17301-8899001-1",
    address: "House 7, University Road", city: "Peshawar",
    emergencyContact: "0300-1122334 (Father)", shift: "Morning (8AM - 4PM)",
    joinDate: "01-Dec-2023", status: "Inactive", salary: 20000,
    attendance: [],
    salaryHistory: [],
    notes: [
      { date: "10-Nov-2025", text: "Left job due to personal reasons.", type: "danger" }
    ]
  }
];

const emptyForm = {
  name: "", role: "Trainer", department: "", phone: "", cnic: "",
  address: "", city: "", emergencyContact: "", shift: "Morning (6AM - 2PM)",
  joinDate: "", status: "Active", salary: 30000,
};

export default function Staff() {
  const [staffList, setStaffList] = useState(initialStaff);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");

  // -- Actions --
  const openDetail = (s) => { setSelectedStaff(s); setActiveTab("overview"); };
  const backToList = () => setSelectedStaff(null);
  const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditingId(s.id); setShowForm(true); };

  const saveForm = () => {
    if (!form.name || !form.phone) return alert("Name and Phone required");
    if (editingId) {
      const updated = staffList.map((s) =>
        s.id === editingId ? { ...s, ...form, salary: Number(form.salary) } : s
      );
      setStaffList(updated);
      setSelectedStaff(updated.find((s) => s.id === editingId));
    } else {
      const newStaff = {
        ...form, id: `EMP-${String(staffList.length + 1).padStart(3, "0")}`,
        salary: Number(form.salary), attendance: [], salaryHistory: [], notes: [],
      };
      setStaffList([...staffList, newStaff]);
    }
    setShowForm(false);
  };

  const deleteStaff = (id) => {
    if (window.confirm("Delete this staff member?")) {
      setStaffList(staffList.filter((s) => s.id !== id));
      setSelectedStaff(null);
    }
  };

  const markPaid = (staffId, idx) => {
    const updated = staffList.map((s) => {
      if (s.id !== staffId) return s;
      const hist = [...s.salaryHistory];
      hist[idx] = { ...hist[idx], paid: true, method: hist[idx].method === "-" ? "Cash" : hist[idx].method, date: new Date().toLocaleDateString("en-GB") };
      return { ...s, salaryHistory: hist };
    });
    setStaffList(updated);
    setSelectedStaff(updated.find((s) => s.id === staffId));
  };

  const addPayment = (staffId, payment) => {
    const updated = staffList.map((s) => {
      if (s.id !== staffId) return s;
      return { ...s, salaryHistory: [...s.salaryHistory, { ...payment, amount: Number(payment.amount), paid: true, date: new Date().toLocaleDateString("en-GB") }] };
    });
    setStaffList(updated);
    setSelectedStaff(updated.find((s) => s.id === staffId));
  };

  const addNote = (staffId, note) => {
    const updated = staffList.map((s) => {
      if (s.id !== staffId) return s;
      return { ...s, notes: [{...note, date: new Date().toLocaleDateString("en-GB")}, ...s.notes] };
    });
    setStaffList(updated);
    setSelectedStaff(updated.find((s) => s.id === staffId));
  };

  return (
    <div className="admin-staff-container">
      
      {/* Breadcrumb */}
      <div className="admin-breadcrumb">
        {/* <span onClick={backToList} className="admin-crumb-link">Staff</span> */}
        {selectedStaff && <span className="admin-crumb-separator">/</span>}
        {selectedStaff && <span className="admin-crumb-active">{selectedStaff.name}</span>}
      </div>

      {/* ================= LIST VIEW ================= */}
      {!selectedStaff && (
        <>
          <div className="admin-list-header">
            <h1 className="admin-page-title">Staff Management</h1>
            <button onClick={openAdd} className="admin-btn-primary">+ Add New Staff</button>
          </div>

          <div className="admin-search-bar">
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="admin-staff-grid">
            {staffList
              .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search))
              .map((s) => (
                <div key={s.id} onClick={() => openDetail(s)} className="admin-staff-card">
                  <div className="admin-card-top">
                    <div className="admin-avatar">{s.name.split(" ").map((n) => n[0]).join("")}</div>
                    <div>
                      <h3 className="admin-staff-name">{s.name}</h3>
                      <p className="admin-staff-role">{s.role}</p>
                    </div>
                  </div>
                  <p className="admin-staff-info">📞 {s.phone}</p>
                  <p className="admin-staff-info">💰 Rs. {s.salary.toLocaleString()}</p>
                  <div className="admin-card-footer">
                    <span className={`admin-badge ${s.status.toLowerCase()}`}>{s.status}</span>
                    <span className="admin-view-link">View →</span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {/* ================= DETAIL VIEW ================= */}
      {selectedStaff && (
        <>
          <button onClick={backToList} className="admin-btn-back">← Back to Staff List</button>

          <div className="admin-detail-header">
            <div className="admin-avatar-large">{selectedStaff.name.split(" ").map((n) => n[0]).join("")}</div>
            <div className="admin-detail-info">
              <h2 className="admin-staff-name-large">{selectedStaff.name}</h2>
              <p className="admin-staff-role-large">{selectedStaff.role} • {selectedStaff.department}</p>
              <p className="admin-staff-id">ID: {selectedStaff.id} • Joined: {selectedStaff.joinDate}</p>
            </div>
            <div className="admin-detail-actions">
              <button onClick={() => openEdit(selectedStaff)} className="admin-btn-secondary">✏️ Edit</button>
              <button onClick={() => deleteStaff(selectedStaff.id)} className="admin-btn-danger">🗑 Delete</button>
            </div>
          </div>

          <div className="admin-tabs">
            {["overview", "attendance", "salary", "notes"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`admin-tab-btn ${activeTab === t ? "active" : ""}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="admin-overview-grid">
              <div className="admin-panel">
                <h3 className="admin-panel-title">Personal Information</h3>
                {[["Full Name", selectedStaff.name], ["CNIC", selectedStaff.cnic], ["Phone", selectedStaff.phone],
                  ["Address", selectedStaff.address], ["City", selectedStaff.city], ["Emergency Contact", selectedStaff.emergencyContact]]
                  .map(([l, v]) => (
                    <div key={l} className="admin-info-row"><span>{l}</span><span className="admin-info-val">{v || "-"}</span></div>
                  ))}
              </div>
              <div className="admin-panel">
                <h3 className="admin-panel-title">Job Details</h3>
                {[["Role", selectedStaff.role], ["Department", selectedStaff.department], ["Shift", selectedStaff.shift],
                  ["Joining Date", selectedStaff.joinDate], ["Status", selectedStaff.status],
                  ["Monthly Salary", `Rs. ${selectedStaff.salary.toLocaleString()}`]]
                  .map(([l, v]) => (
                    <div key={l} className="admin-info-row"><span>{l}</span><span className="admin-info-val">{v || "-"}</span></div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="admin-panel">
              <h3 className="admin-panel-title">Recent Attendance</h3>
              <div className="admin-attendance-grid">
                {selectedStaff.attendance?.length ? selectedStaff.attendance.map((a, i) => (
                  <div key={i} className="admin-attendance-card">
                    <p className="admin-att-date">{a.date}</p>
                    <p className={`admin-att-status ${a.status === "Present" ? "present" : "absent"}`}>{a.status}</p>
                  </div>
                )) : <p className="admin-no-data">No attendance records.</p>}
              </div>
            </div>
          )}

          {activeTab === "salary" && (
            <SalaryPanel
              staff={selectedStaff}
              onMarkPaid={(idx) => markPaid(selectedStaff.id, idx)}
              onAddPayment={(p) => addPayment(selectedStaff.id, p)}
            />
          )}

          {activeTab === "notes" && (
            <NotesPanel 
              staff={selectedStaff} 
              onAddNote={(note) => addNote(selectedStaff.id, note)} 
            />
          )}
        </>
      )}

      {/* ================= ADD / EDIT MODAL ================= */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3 className="admin-modal-title">{editingId ? "Edit Staff" : "Add New Staff"}</h3>
            <div className="admin-form-grid">
              {[["name", "Full Name"], ["phone", "Phone"], ["cnic", "CNIC"], ["city", "City"],
                ["address", "Address"], ["emergencyContact", "Emergency Contact"], ["department", "Department"], ["joinDate", "Joining Date"]]
                .map(([key, label]) => (
                  <input key={key} placeholder={label} value={form[key] || ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="admin-form-input" />
                ))}
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="admin-form-input">
                {["Trainer", "Receptionist", "Cleaner", "Manager", "Security Guard", "Nutritionist", "Physiotherapist", "Peon"].map((r) => <option key={r}>{r}</option>)}
              </select>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="admin-form-input">
                {["Active", "Leave", "Inactive"].map((r) => <option key={r}>{r}</option>)}
              </select>
              <input type="number" placeholder="Monthly Salary" value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                className="admin-form-input" />
            </div>
            <div className="admin-modal-actions">
              <button onClick={saveForm} className="admin-btn-primary">{editingId ? "Update" : "Save"}</button>
              <button onClick={() => setShowForm(false)} className="admin-btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   INLINE SALARY COMPONENT
============================================================ */
function SalaryPanel({ staff, onMarkPaid, onAddPayment }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ month: "", amount: staff.salary, method: "Cash", txnId: "", note: "" });

  const totalPaid = staff.salaryHistory.filter((h) => h.paid).reduce((a, b) => a + b.amount, 0);
  const totalUnpaid = staff.salaryHistory.filter((h) => !h.paid).reduce((a, b) => a + b.amount, 0);

  const submit = () => {
    if (!form.month) return alert("Enter month");
    onAddPayment(form);
    setForm({ month: "", amount: staff.salary, method: "Cash", txnId: "", note: "" });
    setShowForm(false);
  };

  return (
    <div>
      <div className="admin-summary-grid">
        <div className="admin-summary-card"><p>Monthly Salary</p><h4>Rs. {staff.salary.toLocaleString()}</h4></div>
        <div className="admin-summary-card green"><p>Total Paid</p><h4>Rs. {totalPaid.toLocaleString()}</h4></div>
        <div className="admin-summary-card red"><p>Total Unpaid</p><h4>Rs. {totalUnpaid.toLocaleString()}</h4></div>
      </div>

      <div className="admin-salary-header">
        <h3 className="admin-panel-title" style={{ borderBottom: "none", margin: 0 }}>Salary History</h3>
        <button onClick={() => setShowForm(!showForm)} className="admin-btn-primary">+ Send / Add Payment</button>
      </div>

      {showForm && (
        <div className="admin-panel" style={{ marginBottom: "20px" }}>
          <div className="admin-form-grid">
            <input placeholder="Month (e.g. Nov 2025)" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} className="admin-form-input" />
            <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="admin-form-input" />
            <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="admin-form-input">
              {["Cash", "Bank Transfer", "EasyPaisa", "JazzCash"].map((m) => <option key={m}>{m}</option>)}
            </select>
            <input placeholder="Transaction ID (Optional)" value={form.txnId} onChange={(e) => setForm({ ...form, txnId: e.target.value })} className="admin-form-input" />
          </div>
          <div className="admin-modal-actions" style={{ marginTop: "10px" }}>
            <button onClick={submit} className="admin-btn-primary">Save Payment</button>
            <button onClick={() => setShowForm(false)} className="admin-btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-panel">
        <table className="admin-salary-table">
          <thead>
            <tr>
              {["Month", "Amount", "Method", "Txn ID", "Date", "Status", "Action"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.salaryHistory.map((h, i) => (
              <tr key={i}>
                <td>{h.month}</td>
                <td>Rs. {h.amount.toLocaleString()}</td>
                <td>{h.method || "Cash"}</td>
                <td style={{ color: "#AAA" }}>{h.txnId || "-"}</td>
                <td>{h.date || "-"}</td>
                <td className={h.paid ? "admin-txt-green" : "admin-txt-red"}>{h.paid ? "Paid" : "Unpaid"}</td>
                <td>
                  {!h.paid && (
                    <button onClick={() => onMarkPaid(i)} className="admin-btn-small">Mark Paid</button>
                  )}
                </td>
              </tr>
            ))}
            {staff.salaryHistory.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: "center", padding: "20px", color: "#888" }}>No salary records yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   INLINE NOTES / MESSAGES COMPONENT
============================================================ */
function NotesPanel({ staff, onAddNote }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("info");

  const submit = () => {
    if (!text.trim()) return;
    onAddNote({ text, type });
    setText("");
  };

  return (
    <div className="admin-panel">
      <h3 className="admin-panel-title">Notes & Messages</h3>
      
      <div className="admin-note-input-area">
        <textarea 
          placeholder="Write a message, warning, or note here..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className="admin-textarea"
          rows="3"
        />
        <div className="admin-note-actions">
          <select value={type} onChange={(e) => setType(e.target.value)} className="admin-form-input" style={{ width: "150px" }}>
            <option value="info">Info (Blue)</option>
            <option value="warning">Warning (Yellow)</option>
            <option value="danger">Alert (Red)</option>
          </select>
          <button onClick={submit} className="admin-btn-primary">Send Note</button>
        </div>
      </div>

      <div className="admin-notes-list">
        {staff.notes?.length ? staff.notes.map((n, i) => (
          <div key={i} className={`admin-note-item ${n.type}`}>
            <p className="admin-note-date">{n.date}</p>
            <p className="admin-note-text">{n.text}</p>
          </div>
        )) : <p className="admin-no-data">No notes or messages yet.</p>}
      </div>
    </div>
  );
}