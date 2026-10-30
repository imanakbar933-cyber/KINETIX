import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Calendar, MessageSquare, Megaphone,
  Settings, Box, Sparkles, FileText, Grid, PieChart,
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
  const [activeTab, setActiveTab] = useState("Business");
  const [gymName, setGymName] = useState("Dreams GYM");
  const [saveStatus, setSaveStatus] = useState("idle");

  // ✅ Notification component ka data save karne ke liye ref banaya
  const notificationRef = useRef();

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
  const [appearance, setAppearance] = useState({
    ...defaultAppearance,
  });

  const [savedAppearance, setSavedAppearance] = useState({
    ...defaultAppearance,
  });

  const [appearanceMessage, setAppearanceMessage] = useState("");
  const [pendingTab, setPendingTab] = useState(null);

  const hasUnsavedAppearance =
    JSON.stringify(appearance) !== JSON.stringify(savedAppearance);

  // General save
  const handleSave = () => {
    setSaveStatus("saving");

    window.setTimeout(() => {
      setSaveStatus("saved");

      window.setTimeout(() => {
        setSaveStatus("idle");
      }, 2500);
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
    setGymName("Dreams GYM");
    setAppearance({ ...defaultAppearance });
    setAppearanceMessage("Appearance preferences restored to defaults.");
    setBillingMessage("");
  };

  // Export invoices
  const handleExport = () => {
    const rows = [
      ["Invoice", "Date", "Description", "Amount (PKR)", "Status"],
      ...invoices.map((invoice) => [
        invoice.id,
        invoice.date,
        invoice.description,
        invoice.amount,
        invoice.status,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "kinetix-invoices.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  // Billing functions
  const openUpgradeModal = () => {
    setSelectedPlan(
      currentPlan === "Enterprise" ? "Professional" : "Enterprise"
    );
    setModal("plan");
  };

  const confirmPlanChange = () => {
    setCurrentPlan(selectedPlan);
    setCancelled(false);

    setBillingMessage(
      `Demo plan updated to ${selectedPlan}. No payment has been taken.`
    );

    setModal("");
  };

  const savePaymentMethod = (event) => {
    event.preventDefault();

    const lastFour = paymentForm.cardNumber
      .replace(/\D/g, "")
      .slice(-4);

    if (
      !paymentForm.name.trim() ||
      lastFour.length !== 4 ||
      !paymentForm.expiry.trim()
    ) {
      setBillingMessage(
        "Please enter a name, a card number with at least 4 digits, and an expiry date."
      );
      return;
    }

    setPaymentMethod({
      ...paymentForm,
      cardNumber: lastFour,
      brand: paymentForm.brand || "Visa",
    });

    setBillingMessage(
      "Payment method updated in this demo only. No real card was charged."
    );

    setModal("");
  };

  const confirmCancelPlan = () => {
    setCancelled(true);

    setBillingMessage(
      "Your demo subscription is marked as cancelled. No real subscription was changed."
    );

    setModal("");
  };

  // Update appearance
  const changeAppearance = (key, value) => {
    setAppearance((current) => ({
      ...current,
      [key]: value,
    }));

    setAppearanceMessage("");
  };

  // Custom color handler
  const handleCustomColor = (event) => {
    const selectedColor = event.target.value;

    changeAppearance("accent", selectedColor);
  };

  // Save appearance
  const saveAppearance = () => {
    setSavedAppearance({ ...appearance });
    setAppearanceMessage("Appearance preferences saved successfully.");
  };

  // Restore appearance defaults
  const restoreAppearance = () => {
    setAppearance({ ...defaultAppearance });

    setAppearanceMessage(
      "Default neon-green appearance restored."
    );
  };

  // Request tab change
  const requestTabChange = (nextTab) => {
    if (nextTab === activeTab) return;

    if (activeTab === "Appearance" && hasUnsavedAppearance) {
      setPendingTab(nextTab);
      setModal("appearance-confirm");
      return;
    }

    setActiveTab(nextTab);
  };

  // Save and open requested tab
  const saveAndOpenTab = () => {
    setSavedAppearance({ ...appearance });

    setAppearanceMessage(
      "Appearance preferences saved successfully."
    );

    if (pendingTab) {
      setActiveTab(pendingTab);
    }

    setPendingTab(null);
    setModal("");
  };

  // Discard and open requested tab
  const discardAndOpenTab = () => {
    setAppearance({ ...savedAppearance });
    setAppearanceMessage("");

    if (pendingTab) {
      setActiveTab(pendingTab);
    }

    setPendingTab(null);
    setModal("");
  };

  const cancelTabChange = () => {
    setPendingTab(null);
    setModal("");
  };

  const monthlyPrice = planPrices[currentPlan];

  const displayedPrice =
    billingCycle === "yearly"
      ? Math.round(monthlyPrice * 10)
      : monthlyPrice;

  return (
    <div
      className={`settings-layout ${
        appearance.theme === "light" ? "settings-light-mode" : ""
      } ${appearance.compact ? "settings-compact-mode" : ""} ${
        appearance.animations ? "" : "settings-no-animations"
      }`}
      style={{
        "--settings-accent": appearance.accent,
      }}
    >
      <aside className="dashboard-sidebar">
        <div className="dash-logo">
          <img src="/images/kinetix.svg" alt="Kinetix logo" />
        </div>

        <div className="dash-menu">
          <Link to="/dashboard" className="dash-item">
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link to="/calendar" className="dash-item">
            <Calendar size={18} /> Calendar
          </Link>

          <Link to="/chat" className="dash-item">
            <MessageSquare size={18} /> Chat
          </Link>

          <Link to="/announcements" className="dash-item">
            <Megaphone size={18} /> Announcements
          </Link>

          <div className="dash-section-title">UI COMPONENTS</div>

          <Link to="/ui" className="dash-item">
            <Box size={18} /> Base UI
          </Link>

          <Link to="/advanced" className="dash-item">
            <Sparkles size={18} /> Advanced UI
          </Link>

          <Link to="/forms" className="dash-item">
            <FileText size={18} /> Forms
          </Link>

          <Link to="/tables" className="dash-item">
            <Grid size={18} /> Tables
          </Link>

          <Link to="/charts" className="dash-item">
            <PieChart size={18} /> Charts
          </Link>

          <Link to="/settings" className="dash-item active">
            <Settings size={18} /> Settings
          </Link>
        </div>

        <div className="dash-footer">
          <img src="/images/user.jpg" alt="User avatar" />

          <div className="user-text">
            <h4>Nathan Reeves</h4>
            <p>Super Admin</p>
          </div>
        </div>
      </aside>

      <main className="settings-main">
        <header className="settings-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your account, business &amp; preferences</p>
          </div>

          <div className="header-actions">
            <button className="btn-outline" onClick={handleExport}>
              <Download size={15} /> Export
            </button>

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
            Settings saved for this session.
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
                className={`tab-btn ${
                  activeTab === name ? "active" : ""
                }`}
                onClick={() => requestTabChange(name)}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}
          </nav>

          <section className="settings-content">
            {activeTab === "Profile" && (
              <>
                <h2 className="content-title">Profile Information</h2>

                <div className="profile-top">
                  <div className="avatar-circle">NR</div>

                  <div className="profile-info">
                    <h3>Nathan Reeves</h3>
                    <p>Super Admin · nathan@example.com</p>

                    <button
                      className="btn-outline"
                      type="button"
                      onClick={() =>
                        alert("Connect profile photo upload to your backend.")
                      }
                    >
                      ↑ Change Photo
                    </button>
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
                      <input type="text" defaultValue="Nathan Reeves" />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue="nathan@example.com" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" defaultValue="(512) 555-0118" />
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
                      defaultValue="Gym owner & fitness enthusiast running Dreams GYM across 6 branches."
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
                        value={gymName}
                        onChange={(e) => setGymName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Tax ID (EIN)</label>
                      <input type="text" defaultValue="47-1234567" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Email</label>
                      <input type="email" defaultValue="hello@example.com" />
                    </div>

                    <div className="form-group">
                      <label>Support Phone</label>
                      <input type="text" defaultValue="1-800-555-0199" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Currency</label>
                      <select defaultValue="PKR">
                        <option value="PKR">PKR — Pakistani Rupee</option>
                        <option value="USD">USD — US Dollar</option>
                        <option value="EUR">EUR — Euro</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Timezone</label>
                      <select defaultValue="ET">
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
                      defaultValue="400 Congress Ave, Austin, TX 78701"
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

            {activeTab === "Notifications" && (
              <div className="notifications-tab-wrapper">
                <h2 className="content-title" style={{ marginBottom: "20px" }}>
                  Notifications
                </h2>

                <NotificationPreferences />
              </div>
            )}

            {activeTab === "Security" && (
              <div
                className="security-tab-wrapper"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <SecuritySettings />
              </div>
            )}

            {activeTab === "Billing" && (
              <div className="billing-panel">
                <div className="billing-heading">
                  <div>
                    <span className="billing-eyebrow">
                      ACCOUNT &amp; SUBSCRIPTION
                    </span>

                    <h2 className="content-title">Billing &amp; Plans</h2>

                    <p className="billing-subtitle">
                      Manage your subscription, payment method and invoices.
                    </p>
                  </div>

                  <span className="billing-live">
                    <span /> BILLING OVERVIEW
                  </span>
                </div>

                {billingMessage && (
                  <div className="billing-alert" role="status">
                    <CheckCircle2 size={17} />
                    <p>{billingMessage}</p>

                    <button
                      type="button"
                      aria-label="Dismiss message"
                      onClick={() => setBillingMessage("")}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="billing-plan-card">
                  <div className="billing-plan-top">
                    <span className="billing-badge">
                      <span />
                      {cancelled ? "CANCELLED (DEMO)" : "CURRENT PLAN"}
                    </span>

                    <Crown className="billing-crown" size={23} />
                  </div>

                  <h3>{currentPlan} Plan</h3>

                  <div className="billing-price">
                    <strong>
                      PKR {displayedPrice.toLocaleString("en-PK")}
                    </strong>

                    <span>
                      /{billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </div>

                  <p>
                    {currentPlan === "Enterprise"
                      ? "Unlimited members · 6 branches · Priority support"
                      : currentPlan === "Professional"
                      ? "Up to 1,000 members · 3 branches · Email support"
                      : "Up to 200 members · 1 branch · Standard support"}
                  </p>

                  <div className="billing-plan-meta">
                    <span>
                      <CheckCircle2 size={14} />
                      {cancelled
                        ? "Subscription cancellation requested"
                        : "Next billing date: Nov 01, 2026"}
                    </span>

                    <span>Demo subscription · PKR</span>
                  </div>

                  <div className="billing-actions">
                    <button
                      className="btn-solid"
                      type="button"
                      onClick={openUpgradeModal}
                    >
                      <Crown size={15} />
                      {cancelled ? "Choose a Plan" : "Change Plan"}
                    </button>

                    <button
                      className="btn-outline"
                      type="button"
                      onClick={() =>
                        document
                          .getElementById("billing-invoices")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                      }
                    >
                      <FileText size={15} /> View Invoices
                    </button>
                  </div>
                </div>

                <div className="billing-section-row">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Billing Cycle</h3>
                      <p>Choose how often your subscription is billed.</p>
                    </div>
                  </div>

                  <div className="billing-box billing-cycle-box">
                    <div className="billing-item-info">
                      <div className="billing-icon">
                        <RotateCcw size={19} />
                      </div>

                      <div>
                        <h4>
                          {billingCycle === "monthly"
                            ? "Monthly billing"
                            : "Yearly billing"}
                        </h4>

                        <p>
                          {billingCycle === "yearly"
                            ? "Pay for 10 months and get 2 months free."
                            : "Billed once every month."}
                        </p>
                      </div>
                    </div>

                    <div
                      className="billing-cycle-switch"
                      role="group"
                      aria-label="Billing cycle"
                    >
                      <button
                        type="button"
                        className={billingCycle === "monthly" ? "active" : ""}
                        onClick={() => setBillingCycle("monthly")}
                      >
                        Monthly
                      </button>

                      <button
                        type="button"
                        className={billingCycle === "yearly" ? "active" : ""}
                        onClick={() => setBillingCycle("yearly")}
                      >
                        Yearly <span>Save 17%</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="billing-section-row">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Payment Method</h3>
                      <p>Update the card used for subscription payments.</p>
                    </div>

                    <button
                      className="billing-update-btn"
                      type="button"
                      onClick={() => {
                        setPaymentForm({
                          ...paymentMethod,
                          cardNumber: "",
                        });

                        setModal("payment");
                      }}
                    >
                      <Pencil size={13} /> Edit
                    </button>
                  </div>

                  <div className="billing-box billing-payment-box">
                    <div className="billing-card-icon">
                      <CreditCard size={22} />
                    </div>

                    <div className="billing-card-info">
                      <h4>
                        {paymentMethod.brand} ending in ••••{" "}
                        {paymentMethod.cardNumber}
                      </h4>

                      <p>
                        {paymentMethod.name} · Expires {paymentMethod.expiry}
                      </p>

                      <span className="billing-default">
                        <span /> Default payment method
                      </span>
                    </div>

                    <span className="billing-secure">
                      <Shield size={13} /> Secure demo
                    </span>
                  </div>
                </div>

                <div className="billing-section-row" id="billing-invoices">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Invoice History</h3>
                      <p>Download a CSV record of your recent invoices.</p>
                    </div>

                    <button
                      className="billing-update-btn"
                      type="button"
                      onClick={handleExport}
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  </div>

                  <div className="billing-box billing-table-box">
                    <div className="billing-table-scroll">
                      <table className="billing-table">
                        <thead>
                          <tr>
                            <th>INVOICE</th>
                            <th>DATE</th>
                            <th>DESCRIPTION</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                          </tr>
                        </thead>

                        <tbody>
                          {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                              <td>{invoice.id}</td>
                              <td>{invoice.date}</td>
                              <td>{invoice.description}</td>

                              <td className="billing-amount">
                                PKR {invoice.amount.toLocaleString("en-PK")}
                              </td>

                              <td>
                                <span
                                  className={`billing-status ${invoice.status.toLowerCase()}`}
                                >
                                  {invoice.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="billing-table-footer">
                      <span>Showing {invoices.length} demo invoices</span>
                      <span>Currency: PKR</span>
                    </div>
                  </div>
                </div>

                <div className="billing-cancel-box">
                  <div>
                    <h4>
                      {cancelled
                        ? "Subscription cancellation requested"
                        : "Cancel subscription"}
                    </h4>

                    <p>
                      {cancelled
                        ? "You can select a plan above to restart this demo subscription."
                        : "Cancellation only changes this page's demo state. No real subscription will be cancelled."}
                    </p>
                  </div>

                  {!cancelled && (
                    <button
                      className="billing-danger-btn"
                      type="button"
                      onClick={() => setModal("cancel")}
                    >
                      <Trash2 size={14} /> Cancel Plan
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === "Appearance" && (
              <div className="appearance-panel">
                <span className="billing-eyebrow">
                  PERSONALIZE YOUR WORKSPACE
                </span>

                <h2 className="content-title">Appearance</h2>

                <p className="billing-subtitle appearance-intro">
                  Adjust the dashboard look and feel. Your neon gym style is
                  kept as the default.
                </p>

                {appearanceMessage && (
                  <div className="billing-alert" role="status">
                    <CheckCircle2 size={17} />
                    <p>{appearanceMessage}</p>
                  </div>
                )}

                {/* Display Theme */}
                <div className="appearance-section">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Display Theme</h3>
                      <p>Choose your preferred dashboard appearance.</p>
                    </div>
                  </div>

                  <div className="appearance-theme-grid">
                    <button
                      type="button"
                      className={`appearance-theme-card ${
                        appearance.theme === "dark" ? "selected" : ""
                      }`}
                      onClick={() => changeAppearance("theme", "dark")}
                    >
                      <div className="theme-preview theme-preview-dark">
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className="appearance-choice-label">
                        <Moon size={16} />
                        <span>Dark Neon</span>

                        {appearance.theme === "dark" && (
                          <CheckCircle2 size={16} />
                        )}
                      </div>

                      <p>Black panels with neon accents</p>
                    </button>

                    <button
                      type="button"
                      className={`appearance-theme-card ${
                        appearance.theme === "light" ? "selected" : ""
                      }`}
                      onClick={() => changeAppearance("theme", "light")}
                    >
                      <div className="theme-preview theme-preview-light">
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className="appearance-choice-label">
                        <Sun size={16} />
                        <span>Light</span>

                        {appearance.theme === "light" && (
                          <CheckCircle2 size={16} />
                        )}
                      </div>

                      <p>Bright surfaces and dark text</p>
                    </button>
                  </div>
                </div>

                {/* Accent Color */}
                <div className="appearance-section">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Accent Color</h3>
                      <p>
                        Select a preset color or choose your own custom color.
                      </p>
                    </div>
                  </div>

                  <div className="appearance-colors">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className={`appearance-color-option ${
                          appearance.accent.toLowerCase() ===
                          color.value.toLowerCase()
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          changeAppearance("accent", color.value)
                        }
                        aria-pressed={
                          appearance.accent.toLowerCase() ===
                          color.value.toLowerCase()
                        }
                      >
                        <span
                          className="appearance-color-swatch"
                          style={{
                            "--swatch-color": color.value,
                          }}
                        />

                        <span>{color.name}</span>

                        {appearance.accent.toLowerCase() ===
                          color.value.toLowerCase() && (
                          <Check size={15} />
                        )}
                      </button>
                    ))}

                    {/* Custom Color Picker */}
                    <label
                      className={`appearance-color-option appearance-custom-color ${
                        !accentColors.some(
                          (color) =>
                            color.value.toLowerCase() ===
                            appearance.accent.toLowerCase()
                        )
                          ? "selected"
                          : ""
                      }`}
                    >
                      <input
                        type="color"
                        value={appearance.accent}
                        onChange={handleCustomColor}
                        aria-label="Choose custom accent color"
                      />

                      <span
                        className="appearance-color-swatch"
                        style={{
                          "--swatch-color": appearance.accent,
                        }}
                      />

                      <span>Custom Color</span>

                      {!accentColors.some(
                        (color) =>
                          color.value.toLowerCase() ===
                          appearance.accent.toLowerCase()
                      ) && <Check size={15} />}
                    </label>
                  </div>

                  <div className="custom-color-preview">
                    <span
                      className="custom-color-preview-dot"
                      style={{
                        backgroundColor: appearance.accent,
                      }}
                    />

                    <span>Selected color:</span>

                    <strong>{appearance.accent.toUpperCase()}</strong>
                  </div>
                </div>

                {/* Interface Preferences */}
                <div className="appearance-section">
                  <div className="billing-section-heading">
                    <div>
                      <h3>Interface Preferences</h3>
                      <p>Make the dashboard more comfortable to use.</p>
                    </div>
                  </div>

                  <div className="appearance-preference-list">
                    <div className="appearance-preference">
                      <div className="appearance-preference-icon">
                        <Monitor size={18} />
                      </div>

                      <div className="appearance-preference-copy">
                        <h4>Compact layout</h4>
                        <p>
                          Reduce spacing between settings and dashboard
                          elements.
                        </p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={appearance.compact}
                        className={`appearance-toggle ${
                          appearance.compact ? "on" : ""
                        }`}
                        onClick={() =>
                          changeAppearance("compact", !appearance.compact)
                        }
                      >
                        <span />
                      </button>
                    </div>

                    <div className="appearance-preference">
                      <div className="appearance-preference-icon">
                        <Sparkles size={18} />
                      </div>

                      <div className="appearance-preference-copy">
                        <h4>Interface animations</h4>
                        <p>
                          Enable subtle transitions and hover effects.
                        </p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={appearance.animations}
                        className={`appearance-toggle ${
                          appearance.animations ? "on" : ""
                        }`}
                        onClick={() =>
                          changeAppearance(
                            "animations",
                            !appearance.animations
                          )
                        }
                      >
                        <span />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Appearance Actions */}
                <div className="appearance-actions">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={restoreAppearance}
                  >
                    <RotateCcw size={15} /> Restore Defaults
                  </button>

                  <button
                    type="button"
                    className="btn-solid"
                    onClick={saveAppearance}
                  >
                    <Check size={15} /> Apply Appearance
                  </button>
                </div>

                <p className="appearance-note">
                  <AlertCircle size={14} />
                  These appearance choices are currently held in React state
                  and reset when the page reloads.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Plan Modal */}
      {modal === "plan" && (
        <div
          className="billing-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModal("");
          }}
        >
          <div
            className="billing-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-modal-title"
          >
            <button
              className="billing-close"
              type="button"
              aria-label="Close"
              onClick={() => setModal("")}
            >
              <X size={18} />
            </button>

            <span className="billing-eyebrow">
              SUBSCRIPTION OPTIONS
            </span>

            <h3 id="plan-modal-title">Choose your plan</h3>

            <p className="billing-modal-description">
              Select a plan to preview the change. This demo does not
              process payments.
            </p>

            <div className="billing-plan-choices">
              {Object.entries(planPrices).map(([plan, price]) => (
                <button
                  type="button"
                  key={plan}
                  className={`billing-choice ${
                    selectedPlan === plan ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <span className="billing-choice-top">
                    {plan}
                    <span>{selectedPlan === plan ? "✓" : ""}</span>
                  </span>

                  <strong>
                    PKR{" "}
                    {(
                      billingCycle === "yearly" ? price * 10 : price
                    ).toLocaleString("en-PK")}
                  </strong>

                  <small>
                    /{billingCycle === "yearly" ? "year" : "month"}
                  </small>

                  <span className="billing-choice-description">
                    {plan === "Starter"
                      ? "For one gym branch"
                      : plan === "Professional"
                      ? "For growing gym teams"
                      : "For multi-branch gyms"}
                  </span>
                </button>
              ))}
            </div>

            <p className="billing-demo-note">
              Demo only: selecting a plan updates the displayed plan, not
              a real subscription or payment.
            </p>

            <div className="billing-modal-actions">
              <button
                className="btn-outline"
                type="button"
                onClick={() => setModal("")}
              >
                Go Back
              </button>

              <button
                className="btn-solid"
                type="button"
                onClick={confirmPlanChange}
              >
                Confirm Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {modal === "payment" && (
        <div
          className="billing-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModal("");
          }}
        >
          <div
            className="billing-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
          >
            <button
              className="billing-close"
              type="button"
              aria-label="Close"
              onClick={() => setModal("")}
            >
              <X size={18} />
            </button>

            <span className="billing-eyebrow">PAYMENT SETTINGS</span>
            <h3 id="payment-modal-title">Edit payment method</h3>

            <p className="billing-modal-description">
              Use test details only. This form does not save or charge
              real card data.
            </p>

            <form onSubmit={savePaymentMethod}>
              <label className="billing-field">
                Cardholder name
                <input
                  required
                  value={paymentForm.name}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name on card"
                />
              </label>

              <label className="billing-field">
                Card number
                <input
                  required
                  inputMode="numeric"
                  value={paymentForm.cardNumber}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      cardNumber: e.target.value,
                    })
                  }
                  placeholder="Enter test card number"
                />
              </label>

              <div className="form-row">
                <label className="billing-field">
                  Expiry date
                  <input
                    required
                    value={paymentForm.expiry}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        expiry: e.target.value,
                      })
                    }
                    placeholder="MM/YY"
                  />
                </label>

                <label className="billing-field">
                  Card type
                  <select
                    value={paymentForm.brand}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        brand: e.target.value,
                      })
                    }
                  >
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>Amex</option>
                  </select>
                </label>
              </div>

              <p className="billing-demo-note">
                For safety, only the last four digits are shown after
                saving. Do not enter real payment details in this demo.
              </p>

              <div className="billing-modal-actions">
                <button
                  className="btn-outline"
                  type="button"
                  onClick={() => setModal("")}
                >
                  Cancel
                </button>

                <button className="btn-solid" type="submit">
                  Save Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Plan Modal */}
      {modal === "cancel" && (
        <div
          className="billing-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModal("");
          }}
        >
          <div
            className="billing-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-modal-title"
          >
            <button
              className="billing-close"
              type="button"
              aria-label="Close"
              onClick={() => setModal("")}
            >
              <X size={18} />
            </button>

            <span className="billing-eyebrow">CONFIRM ACTION</span>
            <h3 id="cancel-modal-title">Cancel this plan?</h3>

            <p className="billing-modal-description">
              This will only mark the subscription as cancelled in this
              demo interface. No real subscription or payment will be
              affected.
            </p>

            <div className="billing-modal-actions">
              <button
                className="btn-outline"
                type="button"
                onClick={() => setModal("")}
              >
                Keep Plan
              </button>

              <button
                className="billing-danger-btn"
                type="button"
                onClick={confirmCancelPlan}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unsaved Appearance Confirmation */}
      {modal === "appearance-confirm" && (
        <div
          className="billing-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cancelTabChange();
          }}
        >
          <div
            className="billing-modal appearance-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appearance-confirm-title"
          >
            <div className="appearance-confirm-icon">
              <AlertCircle size={27} />
            </div>

            <h3 id="appearance-confirm-title">
              Unsaved Appearance Changes
            </h3>

            <p className="billing-modal-description">
              You have made changes to your appearance settings. Do you
              want to save these changes before leaving this tab?
            </p>

            <div className="appearance-confirm-actions">
              <button
                type="button"
                className="btn-outline"
                onClick={cancelTabChange}
              >
                Cancel
              </button>

              <button
                type="button"
                className="appearance-discard-btn"
                onClick={discardAndOpenTab}
              >
                Discard Changes
              </button>

              <button
                type="button"
                className="btn-solid"
                onClick={saveAndOpenTab}
              >
                <Check size={15} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;