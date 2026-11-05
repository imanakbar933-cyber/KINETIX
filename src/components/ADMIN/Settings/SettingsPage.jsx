import React, { useState, useRef } from "react";
import {
  User, Briefcase, Bell, Shield, CreditCard, Palette,
  Check, Download, RotateCcw, Crown, Pencil, X,
  Monitor, Moon, Sun, CheckCircle2, AlertCircle, Trash2,
  Lock, Calendar, Wallet, Zap, Eye
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
  const [activeTab, setActiveTab] = useState("Profile");
  const [saveStatus, setSaveStatus] = useState("idle");

  const notificationRef = useRef(null);
  const fileInputRef = useRef(null);

  // ================= PROFILE =================
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

  // ================= BUSINESS =================
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

  // ================= BILLING =================
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

  // ================= APPEARANCE =================
  const [appearance, setAppearance] = useState(() => {
    const saved = localStorage.getItem("kinetix_appearance");
    return saved ? JSON.parse(saved) : { ...defaultAppearance };
  });
  const [savedAppearance, setSavedAppearance] = useState(() => {
    const saved = localStorage.getItem("kinetix_appearance");
    return saved ? JSON.parse(saved) : { ...defaultAppearance };
  });
  const [appearanceMessage, setAppearanceMessage] = useState("");
  const [pendingTab, setPendingTab] = useState(null);

  const hasUnsavedAppearance =
    JSON.stringify(appearance) !== JSON.stringify(savedAppearance);

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, photo: imageUrl });
    }
  };

  // ================= SAVE =================
  const handleSave = () => {
    setSaveStatus("saving");
    if (activeTab === "Notifications" && notificationRef.current) {
      notificationRef.current.saveChanges();
    }
    window.setTimeout(() => {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      localStorage.setItem("businessData", JSON.stringify(business));
      setSaveStatus("saved");
      window.setTimeout(() => setSaveStatus("idle"), 2500);
      window.dispatchEvent(new Event("profileUpdated"));
    }, 500);
  };

  const handleHeaderSave = () => {
    if (activeTab === "Appearance") {
      saveAppearance();
      return;
    }
    handleSave();
  };

  const handleReset = () => {
    setProfile({
      name: "Nathan Reeves",
      email: "nathan@example.com",
      phone: "(512) 555-0118",
      bio: "Gym owner & fitness enthusiast running Dreams GYM across 6 branches.",
      photo: "/images/user.jpg",
    });
    setBusiness({
      gymName: "Dreams GYM",
      taxId: "47-1234567",
      contactEmail: "hello@example.com",
      supportPhone: "1-800-555-0199",
      address: "400 Congress Ave, Austin, TX 78701",
      currency: "PKR",
      timezone: "ET",
    });

    // ✅ Appearance bhi reset + save + notify
    setAppearance({ ...defaultAppearance });
    setSavedAppearance({ ...defaultAppearance });
    localStorage.setItem("kinetix_appearance", JSON.stringify(defaultAppearance));
    window.dispatchEvent(new Event("appearanceUpdated"));

    setAppearanceMessage("Appearance preferences restored to defaults.");
    setBillingMessage("");
  };

  // ================= BILLING FUNCTIONS =================
  const openUpgradeModal = () => {
    setSelectedPlan(currentPlan === "Enterprise" ? "Professional" : "Enterprise");
    setModal("plan");
  };
  const confirmPlanChange = () => {
    setCurrentPlan(selectedPlan);
    setCancelled(false);
    setBillingMessage(`Demo plan updated to ${selectedPlan}.`);
    setModal("");
  };
  const savePaymentMethod = (event) => {
    event.preventDefault();
    const lastFour = paymentForm.cardNumber.replace(/\D/g, "").slice(-4);
    if (!paymentForm.name.trim() || lastFour.length !== 4 || !paymentForm.expiry.trim()) {
      setBillingMessage("Please enter details.");
      return;
    }
    setPaymentMethod({ ...paymentForm, cardNumber: lastFour, brand: paymentForm.brand || "Visa" });
    setBillingMessage("Payment updated.");
    setModal("");
  };
  const confirmCancelPlan = () => {
    setCancelled(true);
    setBillingMessage("Subscription cancelled.");
    setModal("");
  };

  // ================= APPEARANCE FUNCTIONS =================
  const changeAppearance = (key, value) => {
    setAppearance((current) => ({ ...current, [key]: value }));
    setAppearanceMessage("");
  };

  const handleCustomColor = (event) => {
    changeAppearance("accent", event.target.value);
  };

  // ✅ Save + notify Dashboard
  const saveAppearance = () => {
    setSavedAppearance({ ...appearance });
    setAppearanceMessage("Appearance saved successfully.");
    localStorage.setItem("kinetix_appearance", JSON.stringify(appearance));
    window.dispatchEvent(new Event("appearanceUpdated"));
  };

  // ✅ Restore + save + notify
  const restoreAppearance = () => {
    setAppearance({ ...defaultAppearance });
    setAppearanceMessage("Default restored.");
    localStorage.setItem("kinetix_appearance", JSON.stringify(defaultAppearance));
    window.dispatchEvent(new Event("appearanceUpdated"));
  };

  const requestTabChange = (nextTab) => {
    if (nextTab === activeTab) return;
    if (activeTab === "Appearance" && hasUnsavedAppearance) {
      setPendingTab(nextTab);
      setModal("appearance-confirm");
      return;
    }
    setActiveTab(nextTab);
  };

  const saveAndOpenTab = () => {
    setSavedAppearance({ ...appearance });
    localStorage.setItem("kinetix_appearance", JSON.stringify(appearance));
    window.dispatchEvent(new Event("appearanceUpdated"));
    if (pendingTab) setActiveTab(pendingTab);
    setPendingTab(null);
    setModal("");
  };

  const discardAndOpenTab = () => {
    setAppearance({ ...savedAppearance });
    if (pendingTab) setActiveTab(pendingTab);
    setPendingTab(null);
    setModal("");
  };

  const cancelTabChange = () => {
    setPendingTab(null);
    setModal("");
  };

  const monthlyPrice = planPrices[currentPlan];
  const displayedPrice =
    billingCycle === "yearly" ? Math.round(monthlyPrice * 10) : monthlyPrice;

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
            <CheckCircle2 size={17} /> Settings saved and applied to sidebar!
          </div>
        )}

        <div className="settings-grid">
          {/* ================= LEFT TABS ================= */}
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
                <Icon size={18} /> {name}
              </button>
            ))}
          </nav>

          {/* ================= RIGHT CONTENT ================= */}
          <section className="settings-content">
            {/* ================= PROFILE ================= */}
            {activeTab === "Profile" && (
              <>
                <h2 className="content-title">Profile Information</h2>
                <div className="profile-top">
                  <div
                    className="avatar-circle"
                    style={{ overflow: "hidden", padding: 0 }}
                  >
                    <img
                      src={profile.photo}
                      alt="User"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
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
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
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
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <input type="text" defaultValue="Super Admin" readOnly />
                      <span className="helper-text">
                        Roles are managed by your organisation owner.
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      rows="3"
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                    />
                  </div>
                  <button
                    className="btn-solid settings-form-submit"
                    type="submit"
                  >
                    Save Profile
                  </button>
                </form>
              </>
            )}

            {/* ================= BUSINESS ================= */}
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
                      <input
                        type="text"
                        value={business.gymName}
                        onChange={(e) =>
                          setBusiness({ ...business, gymName: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Tax ID (EIN)</label>
                      <input
                        type="text"
                        value={business.taxId}
                        onChange={(e) =>
                          setBusiness({ ...business, taxId: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Email</label>
                      <input
                        type="email"
                        value={business.contactEmail}
                        onChange={(e) =>
                          setBusiness({
                            ...business,
                            contactEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Support Phone</label>
                      <input
                        type="text"
                        value={business.supportPhone}
                        onChange={(e) =>
                          setBusiness({
                            ...business,
                            supportPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Currency</label>
                      <select
                        value={business.currency}
                        onChange={(e) =>
                          setBusiness({
                            ...business,
                            currency: e.target.value,
                          })
                        }
                      >
                        <option value="PKR">PKR — Pakistani Rupee</option>
                        <option value="USD">USD — US Dollar</option>
                        <option value="EUR">EUR — Euro</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Timezone</label>
                      <select
                        value={business.timezone}
                        onChange={(e) =>
                          setBusiness({
                            ...business,
                            timezone: e.target.value,
                          })
                        }
                      >
                        <option value="ET">ET (GMT-5:00)</option>
                        <option value="PT">PT (GMT-8:00)</option>
                        <option value="PKT">PKT (GMT+5:00)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Registered Address</label>
                    <input
                      type="text"
                      value={business.address}
                      onChange={(e) =>
                        setBusiness({ ...business, address: e.target.value })
                      }
                    />
                  </div>
                  <button
                    className="btn-solid settings-form-submit"
                    type="submit"
                  >
                    Save Business Details
                  </button>
                </form>
              </>
            )}

            {/* ================= NOTIFICATIONS ================= */}
            {activeTab === "Notifications" && (
              <div className="notifications-tab-wrapper">
                <h2
                  className="content-title"
                  style={{ marginBottom: "20px" }}
                >
                  Notifications
                </h2>
                <NotificationPreferences ref={notificationRef} />
              </div>
            )}

            {/* ================= SECURITY ================= */}
            {activeTab === "Security" && (
              <div className="security-tab-wrapper">
                <SecuritySettings activeTab={activeTab} />
              </div>
            )}

            {/* ================= BILLING ================= */}
            {activeTab === "Billing" && (
              <div className="billing-panel">
                <div className="billing-heading">
                  <div>
                    <span className="billing-eyebrow">FINANCE</span>
                    <h2 className="content-title">Billing & Subscription</h2>
                    <p className="billing-subtitle">
                      Manage your subscription plan, payment method and
                      invoice history.
                    </p>
                  </div>
                  <span className="billing-live">
                    <span></span> SECURE
                  </span>
                </div>

                {billingMessage && (
                  <div className="billing-alert">
                    <CheckCircle2 size={16} />
                    <p>{billingMessage}</p>
                    <button onClick={() => setBillingMessage("")}>
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Plan Card */}
                <div className="billing-plan-card">
                  <div className="billing-plan-top">
                    <span className="billing-badge">
                      <span></span> CURRENT PLAN
                    </span>
                    <Crown size={20} className="billing-crown" />
                  </div>
                  <h3>{currentPlan} Plan</h3>
                  <div className="billing-price">
                    <strong>PKR {displayedPrice}</strong>
                    <span>
                      / {billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </div>
                  <p>
                    Full access to all gym management features including
                    members, billing and reports.
                  </p>
                  <div className="billing-plan-meta">
                    <span>
                      <Calendar size={13} /> Renews on Nov 1, 2026
                    </span>
                    <span>
                      {cancelled ? "Cancelled" : "Active Subscription"}
                    </span>
                  </div>
                  <div className="billing-actions">
                    <button className="btn-solid" onClick={openUpgradeModal}>
                      Change Plan
                    </button>
                    <button
                      className="btn-outline"
                      onClick={() => setModal("cancel")}
                    >
                      Cancel Plan
                    </button>
                  </div>
                </div>

                {/* Billing Cycle */}
                <div className="billing-section-row">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Billing Cycle</h3>
                      <p>Choose how often you want to be billed.</p>
                    </div>
                  </div>
                  <div className="billing-box billing-cycle-box">
                    <div className="billing-item-info">
                      <div className="billing-icon">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <h4>Billing Frequency</h4>
                        <p>Yearly saves 2 months of subscription.</p>
                      </div>
                    </div>
                    <div className="billing-cycle-switch">
                      <button
                        className={
                          billingCycle === "monthly" ? "active" : ""
                        }
                        onClick={() => setBillingCycle("monthly")}
                      >
                        Monthly
                      </button>
                      <button
                        className={
                          billingCycle === "yearly" ? "active" : ""
                        }
                        onClick={() => setBillingCycle("yearly")}
                      >
                        Yearly <span>-17%</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="billing-section-row">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Payment Method</h3>
                      <p>Update your saved card information.</p>
                    </div>
                    <button
                      className="billing-update-btn"
                      onClick={() => setModal("payment")}
                    >
                      <Pencil size={14} /> Update
                    </button>
                  </div>
                  <div className="billing-box billing-payment-box">
                    <div className="billing-card-icon">
                      <CreditCard size={22} />
                    </div>
                    <div className="billing-card-info">
                      <h4>
                        {paymentMethod.brand} ending in ****{" "}
                        {paymentMethod.cardNumber}
                      </h4>
                      <p>Expires {paymentMethod.expiry}</p>
                      <span className="billing-default">
                        <span></span> Default payment method
                      </span>
                    </div>
                    <span className="billing-secure">
                      <Lock size={12} /> Encrypted
                    </span>
                  </div>
                </div>

                {/* Invoice History */}
                <div className="billing-section-row">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Invoice History</h3>
                      <p>Download your past invoices for records.</p>
                    </div>
                  </div>
                  <div className="billing-box billing-table-box">
                    <div className="billing-table-scroll">
                      <table className="billing-table">
                        <thead>
                          <tr>
                            <th>Invoice</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.map((inv) => (
                            <tr key={inv.id}>
                              <td>{inv.id}</td>
                              <td>{inv.date}</td>
                              <td>{inv.description}</td>
                              <td className="billing-amount">
                                PKR {inv.amount}
                              </td>
                              <td>
                                <span className="billing-status">
                                  {inv.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="billing-update-btn"
                                  onClick={() =>
                                    alert("Downloading invoice...")
                                  }
                                >
                                  <Download size={13} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="billing-table-footer">
                      <span>Showing {invoices.length} invoices</span>
                      <span>All amounts in PKR</span>
                    </div>
                  </div>
                </div>

                {/* Cancel Box */}
                <div className="billing-cancel-box">
                  <div>
                    <h4>Danger Zone</h4>
                    <p>
                      Once you cancel, you will lose access to premium
                      features at the end of your billing cycle.
                    </p>
                  </div>
                  <button
                    className="billing-danger-btn"
                    onClick={() => setModal("cancel")}
                  >
                    <Trash2 size={15} /> Cancel Subscription
                  </button>
                </div>
              </div>
            )}

            {/* ================= APPEARANCE ================= */}
            {activeTab === "Appearance" && (
              <div className="appearance-panel">
                <div className="appearance-intro">
                  <h2 className="content-title">Appearance</h2>
                  <p className="billing-subtitle">
                    Customize how your dashboard looks and feels.
                  </p>
                </div>

                {/* Theme */}
                <div className="appearance-section">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Theme</h3>
                      <p>Choose your preferred color mode.</p>
                    </div>
                  </div>
                  <div className="appearance-theme-grid">
                    {[
                      {
                        id: "dark",
                        name: "Dark Mode",
                        desc: "Best for low light",
                        icon: Moon,
                      },
                      {
                        id: "light",
                        name: "Light Mode",
                        desc: "Bright and clean",
                        icon: Sun,
                      },
                    ].map((t) => (
                      <button
                        key={t.id}
                        className={`appearance-theme-card ${
                          appearance.theme === t.id ? "selected" : ""
                        }`}
                        onClick={() => changeAppearance("theme", t.id)}
                      >
                        <div
                          className={`theme-preview theme-preview-${t.id}`}
                        >
                          <span></span>
                          <span></span>
                        </div>
                        <span className="appearance-choice-label">
                          <t.icon size={16} /> {t.name}
                          {appearance.theme === t.id && <Check size={16} />}
                        </span>
                        <p>{t.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Colors */}
                <div className="appearance-section">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Accent Color</h3>
                      <p>
                        Pick a highlight color for buttons and links.
                      </p>
                    </div>
                  </div>
                  <div className="appearance-colors">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        className={`appearance-color-option ${
                          appearance.accent === color.value ? "selected" : ""
                        }`}
                        style={{ "--swatch-color": color.value }}
                        onClick={() => changeAppearance("accent", color.value)}
                      >
                        <span className="appearance-color-swatch"></span>
                        {color.name}
                        {appearance.accent === color.value && (
                          <Check size={16} />
                        )}
                      </button>
                    ))}
                    <label
                      className={`appearance-color-option appearance-custom-color ${
                        !accentColors.some(
                          (c) => c.value === appearance.accent
                        )
                          ? "selected"
                          : ""
                      }`}
                      style={{ "--swatch-color": appearance.accent }}
                    >
                      <span className="appearance-color-swatch"></span>
                      Custom Color
                      <input
                        type="color"
                        value={appearance.accent}
                        onChange={handleCustomColor}
                      />
                    </label>
                  </div>
                </div>

                {/* Preferences */}
                <div className="appearance-section">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Preferences</h3>
                      <p>Adjust layout density and animations.</p>
                    </div>
                  </div>
                  <div className="appearance-preference-list">
                    <div className="appearance-preference">
                      <div className="appearance-preference-icon">
                        <Zap size={18} />
                      </div>
                      <div className="appearance-preference-copy">
                        <h4>Compact Mode</h4>
                        <p>Reduce spacing to fit more on screen.</p>
                      </div>
                      <button
                        className={`appearance-toggle ${
                          appearance.compact ? "on" : ""
                        }`}
                        onClick={() =>
                          changeAppearance("compact", !appearance.compact)
                        }
                        aria-label="Toggle compact mode"
                      >
                        <span></span>
                      </button>
                    </div>
                    <div className="appearance-preference">
                      <div className="appearance-preference-icon">
                        <Eye size={18} />
                      </div>
                      <div className="appearance-preference-copy">
                        <h4>Animations</h4>
                        <p>Enable smooth transitions across the UI.</p>
                      </div>
                      <button
                        className={`appearance-toggle ${
                          appearance.animations ? "on" : ""
                        }`}
                        onClick={() =>
                          changeAppearance(
                            "animations",
                            !appearance.animations
                          )
                        }
                        aria-label="Toggle animations"
                      >
                        <span></span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="appearance-actions">
                  <button className="btn-outline" onClick={restoreAppearance}>
                    <RotateCcw size={15} /> Restore Defaults
                  </button>
                  <button className="btn-solid" onClick={saveAppearance}>
                    <Check size={16} /> Save Appearance
                  </button>
                </div>

                {appearanceMessage && (
                  <p className="appearance-note">
                    <CheckCircle2 size={14} /> {appearanceMessage}
                  </p>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ================= MODALS ================= */}

      {/* Plan Modal */}
      {modal === "plan" && (
        <div className="billing-modal-backdrop">
          <div className="billing-modal">
            <button className="billing-close" onClick={() => setModal("")}>
              <X size={16} />
            </button>
            <h3>Change Plan</h3>
            <p className="billing-modal-description">
              Select a plan that fits your gym.
            </p>
            <div className="billing-plan-choices">
              {Object.entries(planPrices).map(([name, price]) => (
                <button
                  key={name}
                  className={`billing-choice ${
                    selectedPlan === name ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPlan(name)}
                >
                  <div className="billing-choice-top">
                    {name}{" "}
                    {selectedPlan === name && <span>SELECTED</span>}
                  </div>
                  <strong>PKR {price}</strong>
                  <small>/month</small>
                  <span className="billing-choice-description">
                    {name === "Starter"
                      ? "Basic features for small gyms."
                      : name === "Professional"
                      ? "Advanced tools for growing gyms."
                      : "Everything unlocked for large teams."}
                  </span>
                </button>
              ))}
            </div>
            <p className="billing-demo-note">
              This is a demo — no real payment will be charged.
            </p>
            <div className="billing-modal-actions">
              <button className="btn-outline" onClick={() => setModal("")}>
                Cancel
              </button>
              <button className="btn-solid" onClick={confirmPlanChange}>
                Confirm Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {modal === "payment" && (
        <div className="billing-modal-backdrop">
          <div className="billing-modal">
            <button className="billing-close" onClick={() => setModal("")}>
              <X size={16} />
            </button>
            <h3>Update Payment Method</h3>
            <p className="billing-modal-description">
              Enter new card details.
            </p>
            <form onSubmit={savePaymentMethod}>
              <label className="billing-field">
                Cardholder Name
                <input
                  type="text"
                  value={paymentForm.name}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, name: e.target.value })
                  }
                  placeholder="Nathan Reeves"
                />
              </label>
              <label className="billing-field">
                Card Number (Last 4 digits)
                <input
                  type="text"
                  maxLength="4"
                  value={paymentForm.cardNumber}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      cardNumber: e.target.value,
                    })
                  }
                  placeholder="4821"
                />
              </label>
              <label className="billing-field">
                Expiry (MM/YY)
                <input
                  type="text"
                  value={paymentForm.expiry}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      expiry: e.target.value,
                    })
                  }
                  placeholder="09/28"
                />
              </label>
              <div className="billing-modal-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setModal("")}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-solid">
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {modal === "cancel" && (
        <div className="billing-modal-backdrop">
          <div className="billing-modal">
            <button className="billing-close" onClick={() => setModal("")}>
              <X size={16} />
            </button>
            <h3>Cancel Subscription?</h3>
            <p className="billing-modal-description">
              Are you sure you want to cancel your {currentPlan} plan? You
              will lose access at the end of the billing cycle.
            </p>
            <div className="billing-modal-actions">
              <button className="btn-outline" onClick={() => setModal("")}>
                Keep Plan
              </button>
              <button
                className="billing-danger-btn"
                onClick={confirmCancelPlan}
              >
                <Trash2 size={15} /> Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appearance Confirm Modal */}
      {modal === "appearance-confirm" && (
        <div className="billing-modal-backdrop">
          <div className="billing-modal appearance-confirm-modal">
            <div className="appearance-confirm-icon">
              <AlertCircle size={28} />
            </div>
            <h3>Unsaved Changes</h3>
            <p className="billing-modal-description">
              You have unsaved appearance changes. What would you like to do?
            </p>
            <div className="appearance-confirm-actions">
              <button className="btn-outline" onClick={cancelTabChange}>
                Stay Here
              </button>
              <button
                className="appearance-discard-btn"
                onClick={discardAndOpenTab}
              >
                Discard
              </button>
              <button className="btn-solid" onClick={saveAndOpenTab}>
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;