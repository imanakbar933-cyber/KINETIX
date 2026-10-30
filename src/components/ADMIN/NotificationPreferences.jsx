import React, { useState } from "react";
import { 
  UserPlus, CreditCard, AlertTriangle, CalendarX, 
  CalendarCheck, Mail, Megaphone, Check, X, Bell
} from "lucide-react";
import "./NotificationPreferences.css";

const NotificationPreferences = () => {
  // Default settings
  const initialPreferences = [
    { id: "registrations", icon: <UserPlus size={20} />, title: "New Member Registrations", desc: "When a new member signs up", isActive: true },
    { id: "payments", icon: <CreditCard size={20} />, title: "Payment Received", desc: "Successful payments & renewals", isActive: true },
    { id: "stock", icon: <AlertTriangle size={20} />, title: "Low Stock Alerts", desc: "When products fall below reorder level", isActive: true },
    { id: "expiries", icon: <CalendarX size={20} />, title: "Membership Expiries", desc: "Upcoming and lapsed memberships", isActive: true },
    { id: "bookings", icon: <CalendarCheck size={20} />, title: "Class Bookings", desc: "When members book or cancel classes", isActive: false },
    { id: "summary", icon: <Mail size={20} />, title: "Daily Summary Email", desc: "End-of-day revenue & activity digest", isActive: true },
    { id: "marketing", icon: <Megaphone size={20} />, title: "Marketing Updates", desc: "Product news and feature announcements", isActive: false },
  ];

  const [preferences, setPreferences] = useState(initialPreferences);

  const toggleSwitch = (id) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, isActive: !pref.isActive } : pref
      )
    );
  };

  const enableAll = () => {
    setPreferences((prev) => prev.map((pref) => ({ ...pref, isActive: true })));
  };

  const disableAll = () => {
    setPreferences((prev) => prev.map((pref) => ({ ...pref, isActive: false })));
  };

  // Kitne ON hain (Counter ke liye)
  const activeCount = preferences.filter((p) => p.isActive).length;

  return (
    <div className="notification-card">
      
      {/* Header */}
      <div className="notification-header">
        <div className="header-title">
          <div className="title-icon"><Bell size={20} /></div>
          <div>
            <h2>Notification Preferences</h2>
            <span className="status-badge">{activeCount} of {preferences.length} Active</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-action btn-enable" onClick={enableAll}>
            <Check size={16} /> Enable all
          </button>
          <button className="btn-action btn-disable" onClick={disableAll}>
            <X size={16} /> Disable all
          </button>
        </div>
      </div>

      {/* List */}
      <div className="notification-list">
        {preferences.map((pref) => (
          <div className="notification-item" key={pref.id}>
            <div className="item-left">
              <div className={`item-icon-box ${pref.isActive ? 'active-icon' : ''}`}>
                {pref.icon}
              </div>
              <div className="item-text">
                <h3>{pref.title}</h3>
                <p>{pref.desc}</p>
              </div>
            </div>
            
            {/* Custom Toggle Switch */}
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={pref.isActive} 
                onChange={() => toggleSwitch(pref.id)} 
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>

    </div>
  );
};

export default NotificationPreferences;