import React, { useState, useRef } from "react";
import {
  User, Briefcase, Bell, Shield, CreditCard, Palette,
  Check, Download, RotateCcw, Crown, Pencil, X,
  Monitor, Moon, Sun, CheckCircle2, AlertCircle, Trash2
} from "lucide-react";

import "./SettingsPage.css";
import NotificationPreferences from "../NotificationPreferences";
import SecuritySettings from "../SecuritySettings";

const initialInvoices = [
  { id: "INV-2026-010", date: "Oct 01, 2026", description: "Enterprise Plan", amount: 5999, status: "Paid" },
  { id: "INV-2026-009", date: "Sep 01, 2026", description: "Enterprise Plan", amount: 5999, status: "Paid" },
  { id: "INV-2026-008", date: "Aug 01, 2026", description: "Enterprise Plan", amount: 5999, status: "Paid" },
];

const planPrices = {
  Starter: 1499,
  Professional: 2999,
  Enterprise: 5999,
};

const defaultAppearance = {
  theme: "dark",
  accent: "#03ea04",
  compact: false,
  animations: true,
};

const accentColors = [
  { name: "Neon Green", value: "#03ea04" },
  { name: "Electric Cyan", value: "#00e5ff" },
  { name: "Neon Purple", value: "#b14cff" },
  { name: "Energy Yellow", value: "#e8c323" },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Profile"); // Default Profile set kiya
  const [saveStatus, setSaveStatus] = useState("idle");

  // 👇 1. PROFILE STATE (LocalStorage se load karega)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      name: "Nathan Reeves",
      email: "nathan@example.com",
      phone: "(512) 555-0118",
      bio: "Gym owner & fitness enthusiast running Dreams GYM across 6 branches.",
      photo: "/images/user.jpg"
    };
  });
  const fileInputRef = useRef(null);

  // 👇 2. BUSINESS STATE (LocalStorage se load karega)
  const [business, setBusiness] = useState(() => {
    const saved = localStorage.getItem("businessData");
    return saved ? JSON.parse(saved) : {
      gymName: "Dreams GYM",
      taxId: "47-1234567",
      contactEmail: "hello@example.com",
      supportPhone: "1-800-555-0199",
      address: "400 Congress Ave, Austin, TX 78701",
      currency: "PKR",
      timezone: "ET"
    };
  });

  // Billing state
  const [currentPlan, setCurrentPlan] = useState("Enterprise");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const [paymentMethod, setPaymentMethod] = useState({
    name: "Nathan Reeves",
    cardNumber: "4821",
    expiry: "09/28",
    brand: "Visa",
  });

  const [invoices] = useState(initialInvoices);
  const [modal, setModal] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const [paymentForm, setPaymentForm] = useState(paymentMethod);
  const [cancelled, setCancelled] = useState(false);
  const [billingMessage, setBillingMessage] = useState("");

  // Appearance state
  const [appearance, setAppearance] = useState({ ...defaultAppearance });
  const [savedAppearance, setSavedAppearance] = useState({ ...defaultAppearance });
  const [appearanceMessage, setAppearanceMessage] = useState("");
  const [pendingTab, setPendingTab] = useState(null);

  const hasUnsavedAppearance = JSON.stringify(appearance) !== JSON.stringify(savedAppearance);

  // 👇 3. IMAGE UPLOAD LOGIC
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, photo: imageUrl });
    }
  };

  // 👇 4. MAIN SAVE FUNCTION (LocalStorage mein save karega + Sidebar update karega)
  const handleSave = () => {
    setSaveStatus("saving");
    window.setTimeout(() => {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      localStorage.setItem("businessData", JSON.stringify(business));
      
      setSaveStatus("saved");
      window.setTimeout(() => setSaveStatus("idle"), 2500);

      // Sidebar ko update karne ke liye event fire karein
      window.dispatchEvent(new Event("profileUpdated"));
    }, 500);
  };

  // Header save
  const handleHeaderSave = () => {
    if (activeTab === "Appearance") {
      saveAppearance();
      return;
    }
    handleSave();
  };

  // Reset all settings
  const handleReset = () => {
    setProfile({ name: "Nathan Reeves", email: "nathan@example.com", phone: "(512) 555-0118", bio: "Gym owner & fitness enthusiast running Dreams GYM across 6 branches.", photo: "/images/user.jpg" });
    setBusiness({ gymName: "Dreams GYM", taxId: "47-1234567", contactEmail: "hello@example.com", supportPhone: "1-800-555-0199", address: "400 Congress Ave, Austin, TX 78701", currency: "PKR", timezone: "ET" });
    setAppearance({ ...defaultAppearance });
    setAppearanceMessage("Appearance preferences restored to defaults.");
    setBillingMessage("");
  };

  // Export invoices (Aapka same code)
  const handleExport = () => {
    // ... aapka export code yahan aayega (koi change nahi)
  };

  // Billing functions
  const openUpgradeModal = () => { setSelectedPlan(currentPlan === "Enterprise" ? "Professional" : "Enterprise"); setModal("plan"); };
  const confirmPlanChange = () => { setCurrentPlan(selectedPlan); setCancelled(false); setBillingMessage(`Demo plan updated to ${selectedPlan}.`); setModal(""); };
  const savePaymentMethod = (event) => { event.preventDefault(); const lastFour = paymentForm.cardNumber.replace(/\D/g, "").slice(-4); if (!paymentForm.name.trim() || lastFour.length !== 4 || !paymentForm.expiry.trim()) { setBillingMessage("Please enter details."); return; } setPaymentMethod({ ...paymentForm, cardNumber: lastFour, brand: paymentForm.brand || "Visa" }); setBillingMessage("Payment updated."); setModal(""); };
  const confirmCancelPlan = () => { setCancelled(true); setBillingMessage("Subscription cancelled."); setModal(""); };

  // Appearance functions
  const changeAppearance = (key, value) => { setAppearance((current) => ({ ...current, [key]: value })); setAppearanceMessage(""); };
  const handleCustomColor = (event) => { changeAppearance("accent", event.target.value); };
  const saveAppearance = () => { setSavedAppearance({ ...appearance }); setAppearanceMessage("Appearance saved successfully."); };
  const restoreAppearance = () => { setAppearance({ ...defaultAppearance }); setAppearanceMessage("Default restored."); };
  const requestTabChange = (nextTab) => { if (nextTab === activeTab) return; if (activeTab === "Appearance" && hasUnsavedAppearance) { setPendingTab(nextTab); setModal("appearance-confirm"); return; } setActiveTab(nextTab); };
  const saveAndOpenTab = () => { setSavedAppearance({ ...appearance }); if (pendingTab) setActiveTab(pendingTab); setPendingTab(null); setModal(""); };
  const discardAndOpenTab = () => { setAppearance({ ...savedAppearance }); if (pendingTab) setActiveTab(pendingTab); setPendingTab(null); setModal(""); };
  const cancelTabChange = () => { setPendingTab(null); setModal(""); };

  const monthlyPrice = planPrices[currentPlan];
  const displayedPrice = billingCycle === "yearly" ? Math.round(monthlyPrice * 10) : monthlyPrice;

  return (
    <div
      className={`settings-layout ${
        appearance.theme === "light" ? "settings-light-mode" : ""
      } ${appearance.compact ? "settings-compact-mode" : ""} ${
        appearance.animations ? "" : "settings-no-animations"
      }`}
      style={{ "--settings-accent": appearance.accent }}
    >
      <main className="settings-main">
        <header className="settings-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your account, business &amp; preferences</p>
          </div>

          <div className="header-actions">
            {/* <button className="btn-outline" onClick={handleExport}><Download size={15} /> Export</button> */}
            <button className="btn-outline" onClick={handleReset}>
              <RotateCcw size={15} /> Reset
            </button>

            <button className="btn-solid" onClick={handleHeaderSave}>
              <Check size={16} />
              {activeTab === "Appearance"
                ? "Save Appearance"
                : saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "saved"
                ? "Saved!"
                : "Save Changes"}
            </button>
          </div>
        </header>

        {saveStatus === "saved" && activeTab !== "Appearance" && (
          <div className="settings-feedback">
            <CheckCircle2 size={17} />
            Settings saved and applied to sidebar!
          </div>
        )}

        <div className="settings-grid">
          <nav className="settings-tabs" aria-label="Settings sections">
            {[
              { name: "Profile", icon: User },
              { name: "Business", icon: Briefcase },
              { name: "Notifications", icon: Bell },
              { name: "Security", icon: Shield },
              { name: "Billing", icon: CreditCard },
              { name: "Appearance", icon: Palette },
            ].map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={`tab-btn ${activeTab === name ? "active" : ""}`}
                onClick={() => requestTabChange(name)}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}
          </nav>

          <section className="settings-content">
            {/* 👇 PROFILE TAB (Fully Functional) */}
            {activeTab === "Profile" && (
              <>
                <h2 className="content-title">Profile Information</h2>
                <div className="profile-top">
                  <div className="avatar-circle" style={{ overflow: "hidden", padding: 0 }}>
                    <img src={profile.photo} alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="profile-info">
                    <h3>{profile.name}</h3>
                    <p>Super Admin · {profile.email}</p>
                    <button
                      className="btn-outline"
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                    >
                      ↑ Change Photo
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: "none" }} />
                  </div>
                </div>

                <form
                  className="settings-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <input type="text" defaultValue="Super Admin" readOnly />
                      <span className="helper-text">Roles are managed by your organisation owner.</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Bio</label>
                    <textarea rows="3" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
                  </div>

                  <button className="btn-solid settings-form-submit" type="submit">
                    Save Profile
                  </button>
                </form>
              </>
            )}

            {/* 👇 BUSINESS TAB (Fully Functional) */}
            {activeTab === "Business" && (
              <>
                <h2 className="content-title">Business Details</h2>
                <form
                  className="settings-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label>Gym Name</label>
                      <input type="text" value={business.gymName} onChange={(e) => setBusiness({ ...business, gymName: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Tax ID (EIN)</label>
                      <input type="text" value={business.taxId} onChange={(e) => setBusiness({ ...business, taxId: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Email</label>
                      <input type="email" value={business.contactEmail} onChange={(e) => setBusiness({ ...business, contactEmail: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Support Phone</label>
                      <input type="text" value={business.supportPhone} onChange={(e) => setBusiness({ ...business, supportPhone: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Currency</label>
                      <select value={business.currency} onChange={(e) => setBusiness({ ...business, currency: e.target.value })}>
                        <option value="PKR">PKR — Pakistani Rupee</option>
                        <option value="USD">USD — US Dollar</option>
                        <option value="EUR">EUR — Euro</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Timezone</label>
                      <select value={business.timezone} onChange={(e) => setBusiness({ ...business, timezone: e.target.value })}>
                        <option value="ET">ET (GMT-5:00)</option>
                        <option value="PT">PT (GMT-8:00)</option>
                        <option value="PKT">PKT (GMT+5:00)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Registered Address</label>
                    <input type="text" value={business.address} onChange={(e) => setBusiness({ ...business, address: e.target.value })} />
                  </div>

                  <button className="btn-solid settings-form-submit" type="submit">
                    Save Business Details
                  </button>
                </form>
              </>
            )}

            {activeTab === "Notifications" && (
              <div className="notifications-tab-wrapper">
                <h2 className="content-title" style={{ marginBottom: "20px" }}>
                  Notifications
                </h2>
                <NotificationPreferences />
              </div>
            )}

            {activeTab === "Security" && (
              <div className="security-tab-wrapper" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <SecuritySettings />
              </div>
            )}

            {/* Billing & Appearance ka code bilkul waise hi rahega jesa aapne diya tha */}
            {activeTab === "Billing" && (
              <div className="billing-panel">
                {/* Aapka Billing ka code same rahega */}
              </div>
            )}

            {activeTab === "Appearance" && (
              <div className="appearance-panel">
                {/* Aapka Appearance ka code same rahega */}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Modals ka code bilkul waise hi rahega */}
    </div>
  );
};

export default SettingsPage;