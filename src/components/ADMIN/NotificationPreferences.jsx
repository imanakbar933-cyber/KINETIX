import React, { useState, forwardRef, useImperativeHandle } from "react";
import { 
  UserPlus, CreditCard, AlertTriangle, CalendarX, 
  CalendarCheck, Mail, Megaphone, Check, X, Bell
} from "lucide-react";
import "./NotificationPreferences.css";

// ✅ Icon Map (Taaki saved data wapas aate waqt icons attach ho sakein)
const iconMap = {
  registrations: <UserPlus size={20} />,
  payments: <CreditCard size={20} />,
  stock: <AlertTriangle size={20} />,
  expiries: <CalendarX size={20} />,
  bookings: <CalendarCheck size={20} />,
  summary: <Mail size={20} />,
  marketing: <Megaphone size={20} />,
};

const initialPreferences = [
  { id: "registrations", title: "New Member Registrations", desc: "When a new member signs up", isActive: true },
  { id: "payments", title: "Payment Received", desc: "Successful payments & renewals", isActive: true },
  { id: "stock", title: "Low Stock Alerts", desc: "When products fall below reorder level", isActive: true },
  { id: "expiries", title: "Membership Expiries", desc: "Upcoming and lapsed memberships", isActive: true },
  { id: "bookings", title: "Class Bookings", desc: "When members book or cancel classes", isActive: false },
  { id: "summary", title: "Daily Summary Email", desc: "End-of-day revenue & activity digest", isActive: true },
  { id: "marketing", title: "Marketing Updates", desc: "Product news and feature announcements", isActive: false },
];

const NotificationPreferences = forwardRef((props, ref) => {
  
  const [preferences, setPreferences] = useState(() => {
    // ✅ Naya key use kiya (v3) taaki browser ka purana data (bina icons wala) ignore ho jaye
    const saved = localStorage.getItem("kinetix_notifications_v3");
    
    if (saved) {
      const parsedData = JSON.parse(saved);
      // ✅ Yahan hum icon wapas add kar rahe hain uski 'id' ke hisaab se
      return parsedData.map(item => ({
        ...item,
        icon: iconMap[item.id] 
      }));
    }
    
    // Agar kuch save nahi hai, toh default list (icons ke sath) show karo
    return initialPreferences.map(item => ({
      ...item,
      icon: iconMap[item.id]
    }));
  });

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

  useImperativeHandle(ref, () => ({
    saveChanges() {
      // Save karte waqt icon ko nikal kar baaki data save karo
      const dataToSave = preferences.map(({ icon, ...rest }) => rest);
      localStorage.setItem("kinetix_notifications_v3", JSON.stringify(dataToSave));
      return true; 
    }
  }));

  const activeCount = preferences.filter((p) => p.isActive).length;

  return (
    <div className="notification-card">
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

      <div className="notification-list">
        {preferences.map((pref) => (
          <div className="notification-item" key={pref.id}>
            <div className="item-left">
              
              {/* ✅ Icon Yahan Render Hoga */}
              <div className={`item-icon-box ${pref.isActive ? 'active-icon' : ''}`}>
                {pref.icon} 
              </div>

              <div className="item-text">
                <h3>{pref.title}</h3>
                <p>{pref.desc}</p>
              </div>
            </div>
            
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
});

export default NotificationPreferences;