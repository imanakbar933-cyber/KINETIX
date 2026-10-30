import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import "./MembersList.css";

// Demo Data (Aapki image ke mutabik)
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
  const [searchTerm, setSearchTerm] = useState("");

  // Delete Member Function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter((member) => member.id !== id));
    }
  };

  // Search Filter
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.memberId.includes(searchTerm)
  );

  return (
    <div className="member-list-container">
      
      {/* --- Top Action Bar --- */}
      <div className="member-top-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search here..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-member-btn">
          <Plus size={18} /> Add Member
        </button>
      </div>

      {/* --- Data Table --- */}
      <div className="table-wrapper">
        <table className="member-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Member Id</th>
              <th>Package</th>
              <th>Joining Date</th>
              <th>Expire Date</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            <AnimatePresence>
              {filteredMembers.map((member, index) => (
                <motion.tr 
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="table-row"
                >
                  <td>
                    <img src={member.image} alt={member.name} className="member-avatar" />
                  </td>
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
                      <button className="action-btn view" title="View"><Eye size={16} /></button>
                      <button className="action-btn edit" title="Edit"><Pencil size={16} /></button>
                      <button className="action-btn delete" onClick={() => handleDelete(member.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* --- Pagination --- */}
      <div className="pagination-bar">
        <span className="showing-text">Showing 1-{filteredMembers.length} from 100</span>
        <div className="pagination-controls">
          <button className="page-btn nav"><ChevronLeft size={16} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">5</button>
          <button className="page-btn nav"><ChevronRight size={16} /></button>
        </div>
      </div>

    </div>
  );
};

export default MembersList;