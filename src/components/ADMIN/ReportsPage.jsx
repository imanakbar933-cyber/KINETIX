import React, { useState } from "react";
import {
  Download, FileText, Calendar, Search, Filter, ChevronDown,
  TrendingUp, TrendingDown, DollarSign, Wallet, Percent,
  Eye, X, Printer, FileSpreadsheet, ShoppingCart, Users, Settings, Check, Clock
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import "./ReportsPage.css";

// ================= DUMMY DATA (PAKISTAN) =================
const barData = [
  { name: "Feb", revenue: 400000, expenses: 240000 },
  { name: "Mar", revenue: 500000, expenses: 300000 },
  { name: "Apr", revenue: 600000, expenses: 350000 },
  { name: "May", revenue: 550000, expenses: 320000 },
  { name: "Jun", revenue: 700000, expenses: 400000 },
  { name: "Jul", revenue: 840000, expenses: 490000 },
];

const pieData = [
  { name: "Memberships", value: 52, color: "#d4af37" },
  { name: "POS Sales", value: 24, color: "#8b8bff" },
  { name: "PT Sessions", value: 16, color: "#00d2ff" },
  { name: "Classes", value: 8, color: "#ff9f43" },
];

const initialReports = [
  { id: 1, title: "Profit & Loss Report", category: "FINANCIAL", type: "PDF", desc: "Generated for This Month · with charts", date: "Jul 14, 2026", size: "—", icon: DollarSign, color: "#d4af37" },
  { id: 2, title: "Profit & Loss Statement", category: "FINANCIAL", type: "PDF", desc: "Full P&L with revenue, costs & net profit", date: "Jul 14, 2026", size: "2.4 MB", icon: DollarSign, color: "#d4af37" },
  { id: 3, title: "Balance Sheet", category: "FINANCIAL", type: "PDF", desc: "Assets, liabilities & equity snapshot", date: "Jul 13, 2026", size: "1.1 MB", icon: DollarSign, color: "#d4af37" },
  { id: 4, title: "Cash Flow Report", category: "FINANCIAL", type: "XLSX", desc: "Inflows & outflows across the month", date: "Jul 14, 2026", size: "860 KB", icon: DollarSign, color: "#d4af37" },
  { id: 5, title: "Sales Tax Summary", category: "FINANCIAL", type: "PDF", desc: "Tax collected & payable breakdown", date: "Jul 10, 2026", size: "540 KB", icon: DollarSign, color: "#d4af37" },
  { id: 6, title: "Daily Sales Report", category: "SALES", type: "XLSX", desc: "Order & revenue totals by day", date: "Jul 14, 2026", size: "1.8 MB", icon: ShoppingCart, color: "#8b8bff" },
  { id: 7, title: "Product Performance", category: "SALES", type: "PDF", desc: "Top sellers, margins & stock turnover", date: "Jul 12, 2026", size: "2.0 MB", icon: ShoppingCart, color: "#8b8bff" },
  { id: 8, title: "Refunds & Returns", category: "SALES", type: "PDF", desc: "Refund volume & reasons", date: "Jul 11, 2026", size: "420 KB", icon: ShoppingCart, color: "#8b8bff" },
  { id: 9, title: "Membership Growth", category: "MEMBERS", type: "PDF", desc: "New joins, renewals & churn trend", date: "Jul 14, 2026", size: "1.3 MB", icon: Users, color: "#20c997" },
  { id: 10, title: "Attendance Report", category: "MEMBERS", type: "XLSX", desc: "Check-in frequency & peak hours", date: "Jul 13, 2026", size: "980 KB", icon: Users, color: "#20c997" },
  { id: 11, title: "Retention Analysis", category: "MEMBERS", type: "PDF", desc: "Active vs lapsed members over time", date: "Jul 09, 2026", size: "1.5 MB", icon: Users, color: "#20c997" },
  { id: 12, title: "Trainer Utilisation", category: "OPERATIONS", type: "XLSX", desc: "Sessions delivered per trainer", date: "Jul 13, 2026", size: "720 KB", icon: Settings, color: "#00d2ff" },
  { id: 13, title: "Inventory Valuation", category: "OPERATIONS", type: "PDF", desc: "Stock value & reorder status", date: "Jul 14, 2026", size: "1.2 MB", icon: Settings, color: "#00d2ff" },
];

const tabs = ["All Reports", "Financial", "Sales", "Members", "Operations"];
const dateOptions = ["This Month", "This Year", "This Quarter", "Last Month", "Last Year"];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("All Reports");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals state
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Dropdown State
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("This Month");

  const filteredReports = initialReports.filter(r => {
    const matchesTab = activeTab === "All Reports" || r.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const openPreview = (report) => {
    setSelectedReport(report);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="reports-container">
      {/* ================= HEADER ================= */}
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <p>Financial & operational reports · Gujranwala HQ</p>
        </div>
        <div className="reports-header-actions">
          
          {/* ✅ Date Dropdown */}
          <div className="rp-dropdown-wrapper">
            <button className="rp-btn-outline" onClick={() => setShowDateDropdown(!showDateDropdown)}>
              {selectedDate} <ChevronDown size={16} />
            </button>
            {showDateDropdown && (
              <div className="rp-dropdown-menu">
                {dateOptions.map(opt => (
                  <div 
                    key={opt} 
                    className={`rp-dropdown-item ${selectedDate === opt ? 'active' : ''}`}
                    onClick={() => { setSelectedDate(opt); setShowDateDropdown(false); }}
                  >
                    {opt} {selectedDate === opt && <Check size={14} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="rp-btn-outline" onClick={() => setIsExportModalOpen(true)}>
            <Download size={16} /> Export
          </button>
          <button className="rp-btn-outline" onClick={() => setIsScheduleModalOpen(true)}>
            <Calendar size={16} /> Schedule
          </button>
          <button className="rp-btn-solid" onClick={() => setIsGenerateModalOpen(true)}>
            <FileText size={16} /> Generate Report
          </button>
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="reports-summary-grid">
        <div className="summary-card">
          <div className="summary-title"><TrendingUp size={16} className="text-green" /> Total Revenue</div>
          <h2>Rs 8.4 Lakh</h2>
        </div>
        <div className="summary-card">
          <div className="summary-title"><TrendingDown size={16} className="text-red" /> Total Expenses</div>
          <h2>Rs 4.9 Lakh</h2>
        </div>
        <div className="summary-card">
          <div className="summary-title"><Wallet size={16} className="text-yellow" /> Net Profit</div>
          <h2 className="text-yellow">Rs 3.5 Lakh</h2>
        </div>
        <div className="summary-card">
          <div className="summary-title"><Percent size={16} className="text-blue" /> Profit Margin</div>
          <h2>41.7%</h2>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="reports-charts-grid">
        <div className="chart-card bar-chart-card">
          <div className="chart-header">
            <h3>Revenue vs Expenses</h3>
            <div className="chart-legend">
              <span><span className="dot bg-green"></span> Revenue</span>
              <span><span className="dot bg-red"></span> Expenses</span>
            </div>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={barData} margin={{ top: 20, right: 0, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}K`} />
                <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ borderRadius: '8px', border: '1px solid #03ea04', background: '#111' }} formatter={(value) => `Rs ${value.toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card pie-chart-card">
          <div className="chart-header">
            <h3>Revenue Sources</h3>
          </div>
          <div style={{ width: '100%', height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ background: '#111', border: '1px solid #03ea04' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="custom-pie-legend">
              {pieData.map(item => (
                <div key={item.name} className="legend-item">
                  <div className="legend-left">
                    <span className="dot" style={{ background: item.color }}></span>
                    {item.name}
                  </div>
                  <span className="legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= FILTER & TABS ================= */}
      <div className="reports-filters">
        <div className="reports-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`rp-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="reports-search-actions">
          <div className="rp-search">
            <Search size={16} className="text-gray" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="rp-btn-outline">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* ================= REPORT GRID ================= */}
      <div className="reports-grid">
        {filteredReports.map(report => {
          const Icon = report.icon;
          return (
            <div className="report-card" key={report.id}>
              <div className="rc-header">
                <div className="rc-icon" style={{ background: `${report.color}15`, color: report.color }}>
                  <Icon size={24} />
                </div>
                <div className="rc-title-area">
                  <h4>{report.title}</h4>
                  <div className="rc-tags">
                    <span className="rc-tag-category" style={{ background: `${report.color}20`, color: report.color }}>{report.category}</span>
                  </div>
                </div>
                <span className="rc-type">{report.type}</span>
              </div>
              
              <p className="rc-desc">{report.desc}</p>
              
              <div className="rc-meta">
                <span><Calendar size={14} /> {report.date}</span>
                <span><FileText size={14} /> {report.size}</span>
              </div>
              
              <div className="rc-actions">
                <button className="rp-btn-outline flex-1" onClick={() => openPreview(report)}>
                  <Eye size={16} /> Preview
                </button>
                <button className="rp-btn-solid flex-1">
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= GENERATE REPORT MODAL ================= */}
      {isGenerateModalOpen && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal generate-modal">
            <div className="rp-modal-header">
              <h2>Generate Report</h2>
              <button className="rp-close-btn" onClick={() => setIsGenerateModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="generate-form-grid">
              <div className="rp-form-group">
                <label>REPORT TYPE</label>
                <select><option>Profit & Loss</option></select>
              </div>
              <div className="rp-form-group">
                <label>CATEGORY</label>
                <select><option>Financial</option></select>
              </div>
              <div className="rp-form-group">
                <label>PERIOD</label>
                <select><option>This Month</option></select>
              </div>
              <div className="rp-form-group">
                <label>FORMAT</label>
                <select><option>PDF</option></select>
              </div>
            </div>

            <label className="rp-checkbox-label">
              <input type="checkbox" defaultChecked />
              <span className="custom-checkbox"><Check size={14} /></span>
              Include charts & visualisations
            </label>

            <div className="rp-modal-actions">
              <button className="rp-btn-outline flex-1" onClick={() => setIsGenerateModalOpen(false)}>Cancel</button>
              <button className="rp-btn-solid flex-1" onClick={() => setIsGenerateModalOpen(false)}>
                <FileText size={16} /> Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PREVIEW MODAL ================= */}
      {isPreviewModalOpen && selectedReport && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal preview-modal">
            <div className="rp-modal-header">
              <h2>Report Preview</h2>
              <button className="rp-close-btn" onClick={() => setIsPreviewModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="preview-top-card">
              <div className="ptc-icon" style={{ background: `${selectedReport.color}15`, color: selectedReport.color }}>
                <selectedReport.icon size={24} />
              </div>
              <div>
                <h3>{selectedReport.title}</h3>
                <span className="rc-tag-category" style={{ background: `${selectedReport.color}20`, color: selectedReport.color }}>{selectedReport.category}</span>
                <p>{selectedReport.desc}</p>
              </div>
            </div>

            <div className="preview-stats-grid">
              <div className="ps-card">
                <span>UPDATED</span>
                <h4>{selectedReport.date}</h4>
              </div>
              <div className="ps-card">
                <span>SIZE</span>
                <h4>{selectedReport.size}</h4>
              </div>
              <div className="ps-card">
                <span>FORMAT</span>
                <h4>{selectedReport.type}</h4>
              </div>
            </div>

            <div className="preview-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>LINE ITEM</th>
                    <th>THIS PERIOD</th>
                    <th>LAST PERIOD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Revenue</td>
                    <td>Rs 840,000</td>
                    <td>Rs 800,000</td>
                  </tr>
                  <tr>
                    <td>Cost of goods</td>
                    <td>Rs 210,000</td>
                    <td>Rs 195,000</td>
                  </tr>
                  <tr>
                    <td>Operating expenses</td>
                    <td>Rs 280,000</td>
                    <td>Rs 265,000</td>
                  </tr>
                  <tr className="row-total">
                    <td>Net profit</td>
                    <td>Rs 350,000</td>
                    <td>Rs 340,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rp-modal-actions">
              <button className="rp-btn-outline flex-1"><Printer size={16} /> Print</button>
              <button className="rp-btn-outline flex-1"><FileSpreadsheet size={16} /> Export</button>
              <button className="rp-btn-solid flex-1"><Download size={16} /> Download</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SCHEDULE REPORT MODAL ================= */}
      {isScheduleModalOpen && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal">
            <div className="rp-modal-header">
              <h2>Schedule Report</h2>
              <button className="rp-close-btn" onClick={() => setIsScheduleModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="rp-form-group" style={{ marginBottom: '16px' }}>
              <input type="text" className="rp-input" placeholder="Custom scheduled report" defaultValue="Custom scheduled report" />
            </div>

            <div className="generate-form-grid">
              <div className="rp-form-group">
                <label>FREQUENCY</label>
                <select><option>Monthly</option><option>Weekly</option><option>Daily</option></select>
              </div>
              <div className="rp-form-group">
                <label>FORMAT</label>
                <select><option>PDF</option><option>XLSX</option></select>
              </div>
            </div>

            <div className="rp-form-group" style={{ marginBottom: '24px' }}>
              <label>EMAIL RECIPIENTS</label>
              <input type="text" className="rp-input" placeholder="finance@example.pk, owner@example.pk" />
            </div>

            <div className="rp-modal-actions">
              <button className="rp-btn-outline flex-1" onClick={() => setIsScheduleModalOpen(false)}>Cancel</button>
              <button className="rp-btn-solid flex-1" onClick={() => setIsScheduleModalOpen(false)}>
                <Clock size={16} /> Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EXPORT MODAL ================= */}
      {isExportModalOpen && (
        <div className="rp-modal-backdrop">
          <div className="rp-modal">
            <div className="rp-modal-header">
              <h2>Export</h2>
              <button className="rp-close-btn" onClick={() => setIsExportModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="rp-form-group" style={{ marginBottom: '16px' }}>
              <input type="text" className="rp-input" placeholder="All reports in the current view" defaultValue="All reports in the current view" />
            </div>

            <div className="rp-form-group" style={{ marginBottom: '24px' }}>
              <label>FORMAT</label>
              <select><option>PDF</option><option>XLSX</option><option>CSV</option></select>
            </div>

            <div className="rp-modal-actions">
              <button className="rp-btn-outline flex-1" onClick={() => setIsExportModalOpen(false)}>Cancel</button>
              <button className="rp-btn-solid flex-1" onClick={() => setIsExportModalOpen(false)}>
                <Download size={16} /> Export
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}