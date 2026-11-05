import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";
import "./MembersList.css";

// Demo Data (20 members)
const initialMembers = [
  { id: 1, name: "Cody Fisher", memberId: "3536", package: "Gold Membership", joinDate: "8/21/15", expireDate: "12/4/17", paid: "$450", due: "$450", status: "Not paid", image: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Marvin McKinney", memberId: "4152", package: "Silver Membership", joinDate: "5/19/12", expireDate: "2/11/12", paid: "$450", due: "$450", status: "Not paid", image: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Annette Black", memberId: "9261", package: "Platinum Membership", joinDate: "3/4/16", expireDate: "10/6/13", paid: "$450", due: "$450", status: "Not paid", image: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Dianne Russell", memberId: "8811", package: "Gold Membership", joinDate: "5/27/15", expireDate: "7/11/19", paid: "$450", due: "$450", status: "Not paid", image: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "Eleanor Pena", memberId: "5028", package: "Silver Membership", joinDate: "9/18/16", expireDate: "8/2/19", paid: "$450", due: "$450", status: "Paid", image: "https://i.pravatar.cc/150?img=5" },
  { id: 6, name: "Arlene McCoy", memberId: "5948", package: "Platinum Membership", joinDate: "8/15/17", expireDate: "7/27/13", paid: "$450", due: "$450", status: "Paid", image: "https://i.pravatar.cc/150?img=6" },
  { id: 7, name: "Darrell Steward", memberId: "1148", package: "Gold Membership", joinDate: "12/4/17", expireDate: "7/18/17", paid: "$450", due: "$450", status: "Paid", image: "https://i.pravatar.cc/150?img=7" },
  { id: 8, name: "Leslie Alexander", memberId: "6690", package: "Silver Membership", joinDate: "5/27/15", expireDate: "12/10/13", paid: "$450", due: "$450", status: "Paid", image: "https://i.pravatar.cc/150?img=8" },
  { id: 9, name: "Floyd Miles", memberId: "1439", package: "Platinum Membership", joinDate: "10/6/13", expireDate: "4/4/18", paid: "$450", due: "$450", status: "Paid", image: "https://i.pravatar.cc/150?img=9" },
  { id: 10, name: "Albert Flores", memberId: "4349", package: "Gold Membership", joinDate: "7/27/13", expireDate: "3/4/16", paid: "$450", due: "$450", status: "Paid", image: "https://i.pravatar.cc/150?img=10" },
];

const MembersList = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [selectedMember, setSelectedMember] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "", memberId: "", package: "Gold Membership", joinDate: "", expireDate: "", paid: "$0", due: "$0", status: "Paid", image: ""
  });

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter((member) => member.id !== id));
    }
  };

  // Search
  const handleSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  // ✅ Open Add Modal
  const handleAddClick = () => {
    setModalMode("add");
    setFormData({
      name: "", memberId: Math.floor(1000 + Math.random() * 9000).toString(), // Auto generate ID
      package: "Gold Membership", joinDate: new Date().toLocaleDateString(), expireDate: "", 
      paid: "$0", due: "$0", status: "Paid", image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`
    });
    setIsFormModalOpen(true);
  };

  // ✅ Open Edit Modal
  const handleEditClick = (member) => {
    setModalMode("edit");
    setFormData(member);
    setIsFormModalOpen(true);
  };

  // ✅ Open View Modal
  const handleViewClick = (member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  // ✅ Save Form (Add or Edit)
  const handleSaveForm = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      const newMember = { ...formData, id: Date.now() };
      setMembers([newMember, ...members]);
    } else {
      setMembers(members.map(m => m.id === formData.id ? formData : m));
    }
    setIsFormModalOpen(false);
  };

  // Filter & Pagination
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.memberId.includes(searchQuery)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  return (
    <div className="member-list-container">
      
      {/* Top Bar */}
      <div className="member-top-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" placeholder="Search here..." 
            value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
              <th>Photo</th><th>Name</th><th>Member Id</th><th>Package</th>
              <th>Joining Date</th><th>Expire Date</th><th>Paid</th><th>Due</th>
              <th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {currentItems.map((member, index) => (
                <motion.tr 
                  key={member.id} className="table-row"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td><img src={member.image} alt={member.name} className="member-avatar" /></td>
                  <td className="member-name">{member.name}</td>
                  <td className="member-id">{member.memberId}</td>
                  <td>{member.package}</td>
                  <td>{member.joinDate}</td>
                  <td>{member.expireDate}</td>
                  <td>{member.paid}</td>
                  <td>{member.due}</td>
                  <td>
                    <span className={`status-badge ${member.status === "Paid" ? "paid" : "not-paid"}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {/* ✅ Functional Buttons */}
                      <button className="action-btn view" title="View" onClick={() => handleViewClick(member)}><Eye size={16} /></button>
                      <button className="action-btn edit" title="Edit" onClick={() => handleEditClick(member)}><Pencil size={16} /></button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleDelete(member.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {currentItems.length === 0 && (
              <tr><td colSpan="10" style={{ textAlign: "center", padding: "30px", color: "#9ca3af" }}>No members found!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-bar">
        <span className="showing-text">
          Showing {filteredMembers.length > 0 ? indexOfFirstItem + 1 : 0}-{indexOfLastItem > filteredMembers.length ? filteredMembers.length : indexOfLastItem} from {filteredMembers.length}
        </span>
        
        <div className="pagination-controls">
          <button className="page-btn nav" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}><ChevronLeft size={16} /></button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button key={number} className={`page-btn ${currentPage === number ? "active" : ""}`} onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          ))}

          <button className="page-btn nav" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* ================= ✅ ADD / EDIT FORM MODAL ================= */}
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
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
                </div>
                <div className="form-group">
                  <label>Member ID</label>
                  <input required type="text" value={formData.memberId} onChange={(e) => setFormData({...formData, memberId: e.target.value})} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Package</label>
                  <select value={formData.package} onChange={(e) => setFormData({...formData, package: e.target.value})}>
                    <option>Gold Membership</option>
                    <option>Silver Membership</option>
                    <option>Platinum Membership</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option>Paid</option>
                    <option>Not paid</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Joining Date</label>
                  <input required type="text" value={formData.joinDate} onChange={(e) => setFormData({...formData, joinDate: e.target.value})} placeholder="MM/DD/YY" />
                </div>
                <div className="form-group">
                  <label>Expire Date</label>
                  <input required type="text" value={formData.expireDate} onChange={(e) => setFormData({...formData, expireDate: e.target.value})} placeholder="MM/DD/YY" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Paid Amount</label>
                  <input required type="text" value={formData.paid} onChange={(e) => setFormData({...formData, paid: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Due Amount</label>
                  <input required type="text" value={formData.due} onChange={(e) => setFormData({...formData, due: e.target.value})} />
                </div>
              </div>

              <div className="form-group">
                <label>Photo URL</label>
                <input required type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setIsFormModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ✅ VIEW MEMBER MODAL ================= */}
      {isViewModalOpen && selectedMember && (
        <div className="modal-overlay" onClick={() => setIsViewModalOpen(false)}>
          <div className="view-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="view-header">
              <img src={selectedMember.image} alt={selectedMember.name} />
              <div>
                <h2>{selectedMember.name}</h2>
                <p>ID: {selectedMember.memberId} • {selectedMember.package}</p>
              </div>
              <button className="close-view" onClick={() => setIsViewModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="view-grid">
              <div className="view-item"><span>Joining Date</span><strong>{selectedMember.joinDate}</strong></div>
              <div className="view-item"><span>Expire Date</span><strong>{selectedMember.expireDate}</strong></div>
              <div className="view-item"><span>Paid</span><strong>{selectedMember.paid}</strong></div>
              <div className="view-item"><span>Due</span><strong>{selectedMember.due}</strong></div>
              <div className="view-item">
                <span>Status</span>
                <strong className={selectedMember.status === "Paid" ? "text-green" : "text-red"}>
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