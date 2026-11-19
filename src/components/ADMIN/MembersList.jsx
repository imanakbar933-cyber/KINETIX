import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, X, Users
} from "lucide-react";
import "./MembersList.css";
const initialMembers = [
  { id: 1,  name: "Ali Hassan",       package: "Gold Membership",     joinDate: "8/21/15", expireDate: "12/4/17", paid: 450, due: 450, status: "Unpaid",  image: "https://i.pravatar.cc/150?img=11" },
  { id: 2,  name: "Ahmed Raza",       package: "Silver Membership",   joinDate: "5/19/12", expireDate: "2/11/12", paid: 300, due: 150, status: "Partial", image: "https://i.pravatar.cc/150?img=12" },
  { id: 3,  name: "Fatima Noor",      package: "Platinum Membership", joinDate: "3/4/16",  expireDate: "10/6/13", paid: 600, due: 0,   status: "Paid",    image: "https://i.pravatar.cc/150?img=45" },
  { id: 4,  name: "Usman Tariq",      package: "Gold Membership",     joinDate: "5/27/15", expireDate: "7/11/19", paid: 0,   due: 450, status: "Unpaid",  image: "https://i.pravatar.cc/150?img=13" },
  { id: 5,  name: "Ayesha Khan",      package: "Silver Membership",   joinDate: "9/18/16", expireDate: "8/2/19",  paid: 450, due: 0,   status: "Paid",    image: "https://i.pravatar.cc/150?img=47" },
  { id: 6,  name: "Bilal Ahmed",      package: "Platinum Membership", joinDate: "8/15/17", expireDate: "7/27/13", paid: 450, due: 0,   status: "Paid",    image: "https://i.pravatar.cc/150?img=14" },
  { id: 7,  name: "Zainab Malik",     package: "Gold Membership",     joinDate: "12/4/17", expireDate: "7/18/17", paid: 200, due: 250, status: "Partial", image: "https://i.pravatar.cc/150?img=48" },
  { id: 8,  name: "Hassan Sheikh",    package: "Silver Membership",   joinDate: "5/27/15", expireDate: "12/10/13", paid: 450, due: 0,   status: "Paid",    image: "https://i.pravatar.cc/150?img=15" },
  { id: 9,  name: "Maryam Iqbal",     package: "Platinum Membership", joinDate: "10/6/13", expireDate: "4/4/18",  paid: 0,   due: 450, status: "Unpaid",  image: "https://i.pravatar.cc/150?img=44" },
  { id: 10, name: "Hamza Siddiqui",   package: "Gold Membership",     joinDate: "7/27/13", expireDate: "3/4/16",  paid: 450, due: 0,   status: "Paid",    image: "https://i.pravatar.cc/150?img=16" },
];
const MembersList = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "", package: "Gold Membership", joinDate: "", expireDate: "",
    paid: 0, due: 0, status: "Paid", image: ""
  });

  /* ---------- AUTO STATUS LOGIC ----------
     paid > 0 aur due > 0  -> Partial
     due === 0             -> Paid
     paid === 0            -> Unpaid
  ---------------------------------------- */
  const autoStatus = (paid, due) => {
    if (Number(paid) > 0 && Number(due) > 0) return "Partial";
    if (Number(due) === 0 && Number(paid) > 0) return "Paid";
    return "Unpaid";
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  /* ---------- SEARCH ---------- */
  const handleSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  /* ---------- ADD ---------- */
  const handleAddClick = () => {
    setModalMode("add");
    setFormData({
      name: "",
      package: "Gold Membership",
      joinDate: new Date().toLocaleDateString(),
      expireDate: "",
      paid: 0,
      due: 0,
      status: "Paid",
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 1}`
    });
    setIsFormModalOpen(true);
  };

  /* ---------- EDIT ---------- */
  const handleEditClick = (member) => {
    setModalMode("edit");
    setFormData(member);
    setIsFormModalOpen(true);
  };

  /* ---------- VIEW ---------- */
  const handleViewClick = (member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  /* ---------- SAVE ---------- */
  const handleSaveForm = (e) => {
    e.preventDefault();

    const finalStatus = autoStatus(formData.paid, formData.due);
    const cleaned = {
      ...formData,
      paid: Number(formData.paid) || 0,
      due: Number(formData.due) || 0,
      status: finalStatus
    };

    if (modalMode === "add") {
      setMembers([{ ...cleaned, id: Date.now() }, ...members]);
    } else {
      setMembers(members.map((m) => (m.id === cleaned.id ? cleaned : m)));
    }
    setIsFormModalOpen(false);
  };

  /* ---------- FILTER + PAGINATION ---------- */
  const filteredMembers = useMemo(() => {
    return members.filter((m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(m.id).includes(searchQuery)
    );
  }, [members, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  /* ---------- STATUS BADGE CLASS ---------- */
  const getStatusClass = (status) => {
    if (status === "Paid") return "paid";
    if (status === "Partial") return "partial";
    return "not-paid";
  };

  return (
    <div className="member-list-container">

      {/* Header */}
      <div className="members-header">
        <h1>Members List</h1>
        <p>Manage all your gym members, their packages and statuses.</p>
      </div>

      {/* Top Bar */}
      <div className="member-top-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchInput}
            onChange={(e) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value);   // ✅ real-time search
    setCurrentPage(1);
  }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        <button className="add-member-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add Member
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="member-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Member ID</th>
              <th>Package</th>
              <th>Joining Date</th>
              <th>Expiry Date</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {currentItems.map((member, index) => {
                // ✅ Sequential Sr No & Member ID
                const srNo = indexOfFirstItem + index + 1;
                const sequenceId = `#${String(srNo).padStart(4, "0")}`;

                return (
                  <motion.tr
                    key={member.id}
                    className="table-row"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    <td className="srno-cell">{srNo}</td>
                    <td><img src={member.image} alt={member.name} className="member-avatar" /></td>
                    <td className="member-name">{member.name}</td>
                    <td className="member-id">{sequenceId}</td>
                    <td>{member.package}</td>
                    <td>{member.joinDate}</td>
                    <td>{member.expireDate}</td>
                    <td className="text-green">${member.paid}</td>
                    <td className={member.due > 0 ? "text-red" : ""}>${member.due}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view" title="View" onClick={() => handleViewClick(member)}><Eye size={16} /></button>
                        <button className="action-btn edit" title="Edit" onClick={() => handleEditClick(member)}><Pencil size={16} /></button>
                        <button className="action-btn delete" title="Delete" onClick={() => handleDelete(member.id)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>

            {currentItems.length === 0 && (
              <tr>
                <td colSpan="11" className="empty-state">
                  <Users size={30} style={{ marginBottom: 10, opacity: 0.5 }} />
                  <br />
                  No members found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredMembers.length > 0 && (
        <div className="pagination-bar">
          <span className="showing-text">
            Showing <strong>{indexOfFirstItem + 1}</strong> to{" "}
            <strong>{Math.min(indexOfLastItem, filteredMembers.length)}</strong> of{" "}
            <strong>{filteredMembers.length}</strong> members
          </span>

          <div className="pagination-controls">
            <button className="page-btn nav" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} className={`page-btn ${currentPage === n ? "active" : ""}`} onClick={() => setCurrentPage(n)}>
                {n}
              </button>
            ))}
            <button className="page-btn nav" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ================= ADD / EDIT MODAL ================= */}
      {isFormModalOpen && (
        <div className="modal-overlay" onClick={() => setIsFormModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalMode === "add" ? "Add New Member" : "Edit Member"}</h2>
              <button onClick={() => setIsFormModalOpen(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveForm} className="member-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. John Doe" />
                </div>
                <div className="form-group">
                  <label>Package</label>
                  <select value={formData.package} onChange={(e) => setFormData({ ...formData, package: e.target.value })}>
                    <option>Gold Membership</option>
                    <option>Silver Membership</option>
                    <option>Platinum Membership</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Joining Date</label>
                  <input required type="text" value={formData.joinDate} onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })} placeholder="MM/DD/YY" />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input required type="text" value={formData.expireDate} onChange={(e) => setFormData({ ...formData, expireDate: e.target.value })} placeholder="MM/DD/YY" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Paid Amount ($)</label>
                  <input required type="number" min="0" value={formData.paid} onChange={(e) => setFormData({ ...formData, paid: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Due Amount ($)</label>
                  <input required type="number" min="0" value={formData.due} onChange={(e) => setFormData({ ...formData, due: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label>Photo URL</label>
                <input required type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setIsFormModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {isViewModalOpen && selectedMember && (
        <div className="modal-overlay" onClick={() => setIsViewModalOpen(false)}>
          <div className="view-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="view-header">
              <img src={selectedMember.image} alt={selectedMember.name} />
              <div>
                <h2>{selectedMember.name}</h2>
                <p>{selectedMember.package}</p>
              </div>
              <button className="close-view" onClick={() => setIsViewModalOpen(false)}><X size={20} /></button>
            </div>

            <div className="view-grid">
              <div className="view-item"><span>Joining Date</span><strong>{selectedMember.joinDate}</strong></div>
              <div className="view-item"><span>Expiry Date</span><strong>{selectedMember.expireDate}</strong></div>
              <div className="view-item"><span>Paid</span><strong className="text-green">${selectedMember.paid}</strong></div>
              <div className="view-item"><span>Due</span><strong className={selectedMember.due > 0 ? "text-red" : ""}>${selectedMember.due}</strong></div>
              <div className="view-item" style={{ gridColumn: "1 / -1" }}>
                <span>Status</span>
                <strong className={selectedMember.status === "Paid" ? "text-green" : selectedMember.status === "Partial" ? "text-yellow" : "text-red"}>
                  {selectedMember.status}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersList;