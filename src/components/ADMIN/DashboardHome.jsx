import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, TrendingUp, DollarSign, Activity, ArrowUpRight, ArrowDownRight,
  UserPlus, FileText, Settings, Dumbbell, CreditCard, ChevronRight, X
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from "recharts";
import "./DashboardHome.css";

// ================= DUMMY DATA =================
const revenueData = [
  { name: "Jan", revenue: 15000 },
  { name: "Feb", revenue: 22000 },
  { name: "Mar", revenue: 18000 },
  { name: "Apr", revenue: 28000 },
  { name: "May", revenue: 25000 },
  { name: "Jun", revenue: 35000 },
  { name: "Jul", revenue: 42000 },
];

const initialMembers = [
  { id: 1, name: "Cody Fisher", plan: "Gold Membership", date: "Today", image: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Annette Black", plan: "Platinum Membership", date: "Yesterday", image: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "Marvin McKinney", plan: "Silver Membership", date: "Oct 24, 2026", image: "https://i.pravatar.cc/150?img=11" },
  { id: 4, name: "Dianne Russell", plan: "Gold Membership", date: "Oct 23, 2026", image: "https://i.pravatar.cc/150?img=9" },
];

const recentTransactions = [
  { id: "INV-2026-012", member: "Cody Fisher", amount: "$450.00", status: "Paid" },
  { id: "INV-2026-011", member: "Marvin McKinney", amount: "$450.00", status: "Pending" },
  { id: "INV-2026-010", member: "Annette Black", amount: "$450.00", status: "Paid" },
];

export default function DashboardHome() {
  const [members, setMembers] = useState(initialMembers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTrainersModalOpen, setIsTrainersModalOpen] = useState(false);
  
  // Form State
  const [newMember, setNewMember] = useState({ name: "", plan: "Gold Membership" });

  // 1. Export Report Functionality (CSV Download)
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Name,Plan,Join Date\n" 
      + members.map(e => `${e.name},${e.plan},${e.date}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "kinetix_members_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Add Member Functionality
  const handleAddMember = (e) => {
    e.preventDefault();
    const imageId = Math.floor(Math.random() * 70); // Random avatar
    const member = {
      id: Date.now(),
      name: newMember.name,
      plan: newMember.plan,
      date: "Just Now",
      image: `https://i.pravatar.cc/150?img=${imageId}`
    };
    setMembers([member, ...members]);
    setIsAddModalOpen(false);
    setNewMember({ name: "", plan: "Gold Membership" });
  };

  return (
    <div className="dashboard-home-container">
      {/* ================= HEADER ================= */}
      <div className="dh-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, Admin! Here is what's happening at KINETIX today.</p>
        </div>
        <div className="dh-header-actions">
          <button className="rp-btn-outline" onClick={handleExport}>
            <FileText size={16} /> Export Report
          </button>
          <button className="rp-btn-solid" onClick={() => setIsAddModalOpen(true)}>
            <UserPlus size={16} /> Add Member
          </button>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="dh-stats-grid">
        <Link to="/members" className="dh-stat-card">
          <div className="stat-icon-wrapper green">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Total Members</span>
            <div className="stat-value-row">
              <h2>1,248</h2>
              <span className="stat-trend up"><ArrowUpRight size={14} /> 12%</span>
            </div>
          </div>
        </Link>

        <div className="dh-stat-card">
          <div className="stat-icon-wrapper blue">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Total Revenue</span>
            <div className="stat-value-row">
              <h2>$84,500</h2>
              <span className="stat-trend up"><ArrowUpRight size={14} /> 8.5%</span>
            </div>
          </div>
        </div>

        {/* 3. Clickable Active Trainers */}
        <div className="dh-stat-card" onClick={() => setIsTrainersModalOpen(true)} style={{ cursor: "pointer" }}>
          <div className="stat-icon-wrapper yellow">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Active Trainers</span>
            <div className="stat-value-row">
              <h2>24</h2>
              <span className="stat-trend down"><ArrowDownRight size={14} /> 2%</span>
            </div>
          </div>
        </div>

        <div className="dh-stat-card">
          <div className="stat-icon-wrapper purple">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Profit Margin</span>
            <div className="stat-value-row">
              <h2>41.7%</h2>
              <span className="stat-trend up"><ArrowUpRight size={14} /> 4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MIDDLE SECTION ================= */}
      <div className="dh-middle-grid">
        <div className="dh-chart-card">
          <div className="dh-card-header">
            <div>
              <h3>Revenue Growth</h3>
              <p>Monthly revenue performance</p>
            </div>
            <select className="dh-chart-select">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={revenueData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#03ea04" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#03ea04" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <RechartsTooltip 
                  cursor={{ stroke: '#03ea04', strokeWidth: 1, strokeDasharray: '3 3' }} 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #03ea04', background: '#111', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="revenue" stroke="#03ea04" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dh-quick-actions-card">
          <div className="dh-card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="qa-list">
            <Link to="/members" className="qa-item">
              <div className="qa-icon green"><UserPlus size={20} /></div>
              <div className="qa-text">
                <h4>Add New Member</h4>
                <p>Register a new gym member</p>
              </div>
              <ChevronRight size={18} className="qa-arrow" />
            </Link>

            <Link to="/billing" className="qa-item">
              <div className="qa-icon blue"><CreditCard size={20} /></div>
              <div className="qa-text">
                <h4>Create Invoice</h4>
                <p>Generate a new bill or invoice</p>
              </div>
              <ChevronRight size={18} className="qa-arrow" />
            </Link>

            <Link to="/batch-schedule" className="qa-item">
              <div className="qa-icon purple"><Dumbbell size={20} /></div>
              <div className="qa-text">
                <h4>Update Schedule</h4>
                <p>Manage classes and batches</p>
              </div>
              <ChevronRight size={18} className="qa-arrow" />
            </Link>

            <Link to="/settings" className="qa-item">
              <div className="qa-icon yellow"><Settings size={20} /></div>
              <div className="qa-text">
                <h4>App Settings</h4>
                <p>Configure dashboard preferences</p>
              </div>
              <ChevronRight size={18} className="qa-arrow" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="dh-bottom-grid">
        <div className="dh-table-card">
          <div className="dh-card-header">
            <h3>Recently Joined Members</h3>
            <Link to="/members" className="dh-view-all">View All</Link>
          </div>
          <div className="dh-list">
            {members.slice(0, 4).map((member) => (
              <div className="dh-list-item" key={member.id}>
                <img src={member.image} alt={member.name} className="dh-avatar" />
                <div className="dh-item-info">
                  <h4>{member.name}</h4>
                  <p>{member.plan}</p>
                </div>
                <span className="dh-date">{member.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dh-table-card">
          <div className="dh-card-header">
            <h3>Recent Transactions</h3>
            <Link to="/billing" className="dh-view-all">View All</Link>
          </div>
          <div className="dh-list">
            {recentTransactions.map((txn, idx) => (
              <div className="dh-list-item" key={idx}>
                <div className={`dh-txn-icon ${txn.status === 'Paid' ? 'paid' : 'pending'}`}>
                  <DollarSign size={18} />
                </div>
                <div className="dh-item-info">
                  <h4>{txn.member}</h4>
                  <p>{txn.id}</p>
                </div>
                <div className="dh-txn-amount">
                  <h4>{txn.amount}</h4>
                  <span className={`status-${txn.status.toLowerCase()}`}>{txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ADD MEMBER MODAL ================= */}
      {isAddModalOpen && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal">
            <div className="rp-modal-header">
              <h2>Add New Member</h2>
              <button className="rp-close-btn" onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddMember}>
              <div className="rp-form-group" style={{ marginBottom: "16px" }}>
                <label>MEMBER NAME</label>
                <input 
                  type="text" 
                  className="rp-input" 
                  placeholder="e.g. John Doe" 
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                />
              </div>
              <div className="rp-form-group" style={{ marginBottom: "24px" }}>
                <label>MEMBERSHIP PLAN</label>
                <select 
                  className="rp-input"
                  value={newMember.plan}
                  onChange={(e) => setNewMember({...newMember, plan: e.target.value})}
                >
                  <option>Gold Membership</option>
                  <option>Silver Membership</option>
                  <option>Platinum Membership</option>
                </select>
              </div>
              <div className="rp-modal-actions">
                <button type="button" className="rp-btn-outline flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="rp-btn-solid flex-1">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= TRAINERS MODAL ================= */}
      {isTrainersModalOpen && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal">
            <div className="rp-modal-header">
              <h2>Active Trainers</h2>
              <button className="rp-close-btn" onClick={() => setIsTrainersModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="dh-list" style={{ maxHeight: "300px", overflowY: "auto" }}>
              {[
                { name: "Sarah Connor", specialty: "CrossFit", image: "https://i.pravatar.cc/150?img=33" },
                { name: "John Matrix", specialty: "Weightlifting", image: "https://i.pravatar.cc/150?img=12" },
                { name: "Ellen Ripley", specialty: "Cardio & HIIT", image: "https://i.pravatar.cc/150?img=44" },
                { name: "Bruce Wayne", specialty: "Martial Arts", image: "https://i.pravatar.cc/150?img=59" },
              ].map((t, i) => (
                <div className="dh-list-item" key={i}>
                  <img src={t.image} alt={t.name} className="dh-avatar" />
                  <div className="dh-item-info">
                    <h4>{t.name}</h4>
                    <p>{t.specialty}</p>
                  </div>
                  <span className="status-paid">Active</span>
                </div>
              ))}
            </div>
            <div className="rp-modal-actions" style={{ marginTop: "20px" }}>
              <button className="rp-btn-solid flex-1" onClick={() => setIsTrainersModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}