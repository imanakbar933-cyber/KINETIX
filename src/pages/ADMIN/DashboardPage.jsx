import React, { useState } from "react";
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar";
import { 
  LayoutGrid, Calendar, CheckCircle, Download, Plus, 
  Users, UserPlus, Eye, ArrowUpRight, RefreshCw, 
  ShoppingBag, Dumbbell, Activity 
} from "lucide-react";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <DashboardSidebar isOpen={isSidebarOpen} />

      <main className={`dashboard-content ${isSidebarOpen ? "shifted" : ""}`}>
        
        {/* 1. Header Row */}
        <div className="dash-header">
          <div className="dash-header-left">
            <div className="header-icon-box"><LayoutGrid size={24} /></div>
            <div>
              <h1>Dashboard Overview</h1>
              <p>
                <Calendar size={14} /> Tuesday, July 14, 2026 • Austin HQ 
                <span className="status-green"><CheckCircle size={12} /> All systems operational</span>
              </p>
            </div>
          </div>
          <div className="dash-header-right">
            <div className="filter-btns">
              <button className="active">Today</button>
              <button>Week</button>
              <button>Month</button>
            </div>
            <button className="btn-outline"><Download size={18} /> Export</button>
            <button className="btn-solid"><Plus size={18} /> Open POS</button>
          </div>
        </div>

        {/* 2. Main Grid */}
        <div className="dash-grid">

          {/* Card 1: Active Members */}
          <div className="dash-card card-members">
            <h3>Active Members</h3>
            <div className="card-flex">
              <div className="circle-progress">78%</div>
              <div>
                <h2>1,842</h2>
                <p className="green-text">↗ +3.8% this week</p>
              </div>
            </div>
            <div className="card-stats">
              <div><span>Men</span> <h4>1400</h4></div>
              <div><span>Women</span> <h4>442</h4></div>
            </div>
            {/* Placeholder for image inside card */}
            <div className="card-img-bg"></div>
          </div>

          {/* Card 2: Total Revenue */}
          <div className="dash-card card-revenue">
            <div className="card-flex">
              <div className="icon-box-green"><span>₹</span></div>
              <div>
                <h3>Total Revenue</h3>
                <p>This month • Jul 2026</p>
              </div>
            </div>
            <h2 className="revenue-text">$104,000</h2>
            <div className="badges-row">
              <span className="green-badge">↗ +18.2%</span>
              <span className="muted-text">vs last month $88K</span>
            </div>
            <div className="chart-line"></div>
            {/* Placeholder for image inside card */}
            <div className="card-img-bg-right"></div>
          </div>

          {/* Card 3: Today's Check-ins */}
          <div className="dash-card card-checkins">
            <div className="card-header-flex">
              <h3>Today's Check-ins</h3>
              <span className="green-badge">+5.3%</span>
            </div>
            <h2>312</h2>
            <div className="avatar-group">
              <div className="avatar"></div><div className="avatar"></div>
              <div className="avatar"></div><div className="avatar"></div>
              <div className="avatar">+8</div>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: "78%" }}></div>
            </div>
            <p className="muted-text">78% of target • Goal 400</p>
          </div>
        </div>

        {/* 3. Bottom Cards */}
        <div className="dash-grid-bottom">
          <div className="dash-card small-card">
            <div className="icon-box-green"><RefreshCw size={22} /></div>
            <div>
              <h3>Renewals</h3>
              <h2>52</h2>
              <p className="green-text">↗ +26.8%</p>
            </div>
          </div>
          <div className="dash-card small-card">
            <div className="icon-box-green"><ShoppingBag size={22} /></div>
            <div>
              <h3>Supplement Sales</h3>
              <h2>$5,880</h2>
            </div>
          </div>
          <div className="dash-card small-card">
            <div className="icon-box-green"><Dumbbell size={22} /></div>
            <div>
              <h3>PT Sessions</h3>
              <h2>26</h2>
              <p className="green-text">↗ +11.4%</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardPage;