
import React, { useEffect, useMemo, useState } from "react";
import {
  LockKeyhole,LockKeyholeOpen, Users,Wrench,Plus,Search, CalendarDays,Clock,
  UserRound,Phone, Hash, Eye, Pencil,Trash2,RefreshCw,Unlock,
  X, CheckCircle2, AlertCircle, History, ArrowUpRight,
  Timer,MapPin,
} from "lucide-react";

import "./LockerManagement.css";

const STORAGE_KEY = "kinetix_locker_management";

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addDays = (dateString, days) => {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + Number(days));
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const getDuration = (start, end) => {
  if (!start || !end) return 0;

  const first = new Date(`${start}T00:00:00`);
  const last = new Date(`${end}T00:00:00`);

  return Math.max(0, Math.round((last - first) / 86400000));
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getLockerStatus = (locker) => {
  if (locker.maintenance) return "Maintenance";
  if (!locker.assignment) return "Available";

  return locker.assignment.expiryDate < getToday()
    ? "Expired"
    : "Occupied";
};

const createInitialLockers = () => {
  const today = getToday();

  return Array.from({ length: 12 }, (_, index) => {
    const number = index + 1;

    const locker = {
      id: `locker-${number}`,
      number: `L-${String(number).padStart(3, "0")}`,
      zone: number <= 6 ? "Male Section" : "Female Section",
      type: number % 3 === 0 ? "Premium" : "Standard",
      maintenance: false,
      assignment: null,
      history: [],
    };

    if (number === 2) {
      locker.assignment = {
        memberName: "Ali Ahmed",
        memberId: "KX-1001",
        phone: "03001234567",
        issueDate: addDays(today, -10),
        expiryDate: addDays(today, 20),
      };
    }

    if (number === 4) {
      locker.assignment = {
        memberName: "Usman Khalid",
        memberId: "KX-1002",
        phone: "03009876543",
        issueDate: addDays(today, -25),
        expiryDate: addDays(today, -2),
      };
    }

    if (number === 7) {
      locker.assignment = {
        memberName: "Sara Ahmed",
        memberId: "KX-1003",
        phone: "03111234567",
        issueDate: addDays(today, -5),
        expiryDate: addDays(today, 25),
      };
    }

    if (number === 10) {
      locker.maintenance = true;
    }

    if (number === 2) {
      locker.history = [
        {
          memberName: "Hassan Raza",
          memberId: "KX-0901",
          phone: "03005556666",
          issueDate: addDays(today, -90),
          expiryDate: addDays(today, -60),
          releaseDate: addDays(today, -60),
        },
      ];
    }

    return locker;
  });
};

const readLockers = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : createInitialLockers();
  } catch {
    return createInitialLockers();
  }
};

const emptyForm = {
  number: "",
  lockerId: "",
  zone: "Male Section",
  type: "Standard",
  memberName: "",
  memberId: "",
  phone: "",
  issueDate: getToday(),
  duration: "30",
  extension: "30",
};

const LockerManagement = () => {
  const [lockers, setLockers] = useState(readLockers);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lockers));
  }, [lockers]);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => setNotification(""), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  const stats = useMemo(() => {
    return lockers.reduce(
      (result, locker) => {
        result.total++;

        const status = getLockerStatus(locker);
        if (status === "Available") result.available++;
        if (status === "Occupied") result.occupied++;
        if (status === "Expired") result.expired++;
        if (status === "Maintenance") result.maintenance++;

        return result;
      },
      {
        total: 0,
        available: 0,
        occupied: 0,
        expired: 0,
        maintenance: 0,
      }
    );
  }, [lockers]);

  const filteredLockers = useMemo(() => {
    return lockers.filter((locker) => {
      const status = getLockerStatus(locker);

      const matchesTab =
        activeTab === "all" ||
        status.toLowerCase() === activeTab;

      const searchText = search.toLowerCase();

      const matchesSearch = [
        locker.number,
        locker.zone,
        locker.type,
        locker.assignment?.memberName,
        locker.assignment?.memberId,
        locker.assignment?.phone,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(searchText));

      return matchesTab && matchesSearch;
    });
  }, [lockers, activeTab, search]);

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const openAddLocker = () => {
    setForm(emptyForm);
    setSelectedLocker(null);
    setModal("add");
  };

  const openAssignLocker = (locker) => {
    setSelectedLocker(locker);
    setForm({
      ...emptyForm,
      issueDate: getToday(),
    });
    setModal("assign");
  };

  // Header action: assign a member after choosing an available locker.
  const openAssignMember = () => {
    const availableLocker = lockers.find(
      (locker) => getLockerStatus(locker) === "Available"
    );

    if (!availableLocker) {
      setNotification("No available lockers are currently ready for assignment.");
      return;
    }

    setSelectedLocker(null);
    setForm({
      ...emptyForm,
      lockerId: availableLocker.id,
      issueDate: getToday(),
    });
    setModal("assign");
  };

  const openDetails = (locker) => {
    setSelectedLocker(locker);
    setModal("details");
  };

  const openExtend = (locker) => {
    setSelectedLocker(locker);
    setForm({
      ...emptyForm,
      extension: "30",
    });
    setModal("extend");
  };

  const saveLocker = (e) => {
    e.preventDefault();

    if (!form.number.trim()) {
      setNotification("Please enter a locker number.");
      return;
    }

    const duplicate = lockers.some(
      (locker) =>
        locker.number.toLowerCase() === form.number.trim().toLowerCase()
    );

    if (duplicate) {
      setNotification("This locker number already exists.");
      return;
    }

    const newLocker = {
      id: `locker-${Date.now()}`,
      number: form.number.trim(),
      zone: form.zone,
      type: form.type,
      maintenance: false,
      assignment: null,
      history: [],
    };

    setLockers((previous) => [...previous, newLocker]);
    setModal(null);
    setNotification("New locker added successfully!");
  };

  const assignLocker = (e) => {
    e.preventDefault();

    const targetLocker =
      selectedLocker || lockers.find((locker) => locker.id === form.lockerId);

    if (!targetLocker) {
      setNotification("Please select a locker.");
      return;
    }

    if (getLockerStatus(targetLocker) !== "Available") {
      setNotification("This locker is no longer available. Please choose another locker.");
      return;
    }

    if (
      !form.memberName.trim() ||
      !form.memberId.trim() ||
      !form.phone.trim() ||
      !form.issueDate ||
      Number(form.duration) < 1
    ) {
      setNotification("Please complete all member details.");
      return;
    }

    if (form.issueDate < getToday()) {
      setNotification("Issue date cannot be in the past.");
      return;
    }

    const expiryDate = addDays(form.issueDate, Number(form.duration));

    setLockers((previous) =>
      previous.map((locker) =>
        locker.id === targetLocker.id
          ? {
              ...locker,
              assignment: {
                memberName: form.memberName.trim(),
                memberId: form.memberId.trim(),
                phone: form.phone.trim(),
                issueDate: form.issueDate,
                expiryDate,
              },
            }
          : locker
      )
    );

    setModal(null);
    setSelectedLocker(null);
    setNotification(`${targetLocker.number} assigned successfully!`);
  };

  const releaseLocker = (locker) => {
    if (!window.confirm(`Release ${locker.number} from its current member?`)) {
      return;
    }

    setLockers((previous) =>
      previous.map((item) => {
        if (item.id !== locker.id || !item.assignment) return item;

        return {
          ...item,
          assignment: null,
          history: [
            {
              ...item.assignment,
              releaseDate: getToday(),
            },
            ...item.history,
          ],
        };
      })
    );

    if (selectedLocker?.id === locker.id) {
      setSelectedLocker({
        ...locker,
        assignment: null,
      });
      setModal(null);
    }

    setNotification(`${locker.number} released successfully!`);
  };

  const extendLocker = (e) => {
    e.preventDefault();

    const days = Number(form.extension);

    if (!days || days < 1 || !selectedLocker?.assignment) {
      setNotification("Enter a valid extension duration.");
      return;
    }

    const currentExpiry = selectedLocker.assignment.expiryDate;
    const startingDate =
      currentExpiry < getToday() ? getToday() : currentExpiry;

    const newExpiry = addDays(startingDate, days);

    setLockers((previous) =>
      previous.map((locker) =>
        locker.id === selectedLocker.id
          ? {
              ...locker,
              assignment: {
                ...locker.assignment,
                expiryDate: newExpiry,
              },
            }
          : locker
      )
    );

    setModal(null);
    setNotification(
      `${selectedLocker.number} extended until ${formatDate(newExpiry)}.`
    );
  };

  const toggleMaintenance = (locker) => {
    if (!locker.maintenance && locker.assignment) {
      setNotification("Release the current member before maintenance.");
      return;
    }

    setLockers((previous) =>
      previous.map((item) =>
        item.id === locker.id
          ? { ...item, maintenance: !item.maintenance }
          : item
      )
    );

    setNotification(
      locker.maintenance
        ? `${locker.number} is now available.`
        : `${locker.number} moved to maintenance.`
    );
  };

  const deleteLocker = (locker) => {
    if (locker.assignment) {
      setNotification("Release this locker before deleting it.");
      return;
    }

    if (!window.confirm(`Delete locker ${locker.number}?`)) return;

    setLockers((previous) =>
      previous.filter((item) => item.id !== locker.id)
    );

    setModal(null);
    setNotification("Locker deleted successfully.");
  };

  const statusClass = (status) =>
    status.toLowerCase().replace(/\s+/g, "-");

  const getRemainingDays = (expiryDate) => {
    return getDuration(getToday(), expiryDate);
  };

  const getModalTitle = () => {
    if (modal === "add") return "Add New Locker";
    if (modal === "assign") return "Assign Locker";
    if (modal === "extend") return "Extend Locker Duration";
    return "Locker Details";
  };

  return (
    <div className="locker-page">

      {/* PAGE HEADER */}
      <div className="locker-page-header">
        <div>
          <div className="locker-eyebrow">
            <span className="locker-eyebrow-dot" />
            KINETIX ADMIN PANEL
          </div>

          <h1>
            Locker <span>Management</span>
          </h1>

          <p>
            Manage lockers, member assignments and locker rental periods.
          </p>
        </div>

        <div className="locker-header-actions">
          <button
            className="locker-primary-btn locker-assign-member-btn"
            onClick={openAssignMember}
          >
            <UserRound size={19} />
            Assign Member
          </button>

          <button className="locker-primary-btn" onClick={openAddLocker}>
            <Plus size={19} />
            Add New Locker
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="locker-stats-grid">

        <div className="locker-stat-card">
          <div className="locker-stat-icon green">
            <LockKeyhole size={23} />
          </div>
          <div>
            <p>Total Lockers</p>
            <h2>{stats.total}</h2>
            <span>Registered lockers</span>
          </div>
        </div>

        <div className="locker-stat-card">
          <div className="locker-stat-icon available">
            <LockKeyholeOpen size={23} />
          </div>
          <div>
            <p>Available</p>
            <h2>{stats.available}</h2>
            <span>Ready for assignment</span>
          </div>
        </div>

        <div className="locker-stat-card">
          <div className="locker-stat-icon occupied">
            <Users size={23} />
          </div>
          <div>
            <p>Occupied</p>
            <h2>{stats.occupied}</h2>
            <span>Currently assigned</span>
          </div>
        </div>

        <div className="locker-stat-card">
          <div className="locker-stat-icon expired">
            <AlertCircle size={23} />
          </div>
          <div>
            <p>Expired</p>
            <h2>{stats.expired}</h2>
            <span>Require attention</span>
          </div>
        </div>

        <div className="locker-stat-card">
          <div className="locker-stat-icon maintenance">
            <Wrench size={23} />
          </div>
          <div>
            <p>Maintenance</p>
            <h2>{stats.maintenance}</h2>
            <span>Under maintenance</span>
          </div>
        </div>

      </div>

      {/* LOCKER OVERVIEW */}
      <div className="locker-overview-card">
        <div className="locker-section-heading">
          <div>
            <h2>Locker Overview</h2>
            <p>Current availability and occupancy summary</p>
          </div>

          <span className="locker-live-label">
            <span />
            LIVE STATUS
          </span>
        </div>

        <div className="locker-overview-bar">
          {stats.total > 0 && (
            <>
              <div
                className="overview-segment occupied"
                style={{ width: `${(stats.occupied / stats.total) * 100}%` }}
              />
              <div
                className="overview-segment available"
                style={{ width: `${(stats.available / stats.total) * 100}%` }}
              />
              <div
                className="overview-segment expired"
                style={{ width: `${(stats.expired / stats.total) * 100}%` }}
              />
              <div
                className="overview-segment maintenance"
                style={{ width: `${(stats.maintenance / stats.total) * 100}%` }}
              />
            </>
          )}
        </div>

        <div className="locker-overview-legend">
          <span><i className="dot-occupied" /> Occupied ({stats.occupied})</span>
          <span><i className="dot-available" /> Available ({stats.available})</span>
          <span><i className="dot-expired" /> Expired ({stats.expired})</span>
          <span><i className="dot-maintenance" /> Maintenance ({stats.maintenance})</span>
        </div>
      </div>

      {/* LOCKER LIST */}
      <div className="locker-list-card">

        <div className="locker-section-heading locker-list-heading">
          <div>
            <h2>All Lockers</h2>
            <p>View and manage individual locker assignments</p>
          </div>

          <div className="locker-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search locker or member..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="locker-filter-tabs">
          {[
            { id: "all", label: "All Lockers", count: stats.total },
            { id: "available", label: "Available", count: stats.available },
            { id: "occupied", label: "Occupied", count: stats.occupied },
            { id: "expired", label: "Expired", count: stats.expired },
            { id: "maintenance", label: "Maintenance", count: stats.maintenance },
          ].map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="locker-table-wrapper">
          <table className="locker-table">
            <thead>
              <tr>
                <th>LOCKER</th>
                <th>MEMBER DETAILS</th>
                <th>ISSUE DATE</th>
                <th>EXPIRY DATE</th>
                <th>DURATION LEFT</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredLockers.map((locker) => {
                const status = getLockerStatus(locker);
                const assignment = locker.assignment;
                const remaining = assignment
                  ? getRemainingDays(assignment.expiryDate)
                  : null;

                return (
                  <tr key={locker.id}>
                    <td>
                      <div className="locker-number-cell">
                        <div className="locker-mini-icon">
                          <LockKeyhole size={19} />
                        </div>
                        <div>
                          <strong>{locker.number}</strong>
                          <small>{locker.zone}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      {assignment ? (
                        <div className="locker-member-cell">
                          <strong>{assignment.memberName}</strong>
                          <small>{assignment.memberId}</small>
                        </div>
                      ) : (
                        <span className="locker-empty-text">
                          {status === "Maintenance"
                            ? "Under maintenance"
                            : "Not assigned"}
                        </span>
                      )}
                    </td>

                    <td>
                      {assignment ? formatDate(assignment.issueDate) : "—"}
                    </td>

                    <td>
                      {assignment ? formatDate(assignment.expiryDate) : "—"}
                    </td>

                    <td>
                      {assignment ? (
                        <span className={`locker-days ${remaining === 0 ? "zero" : remaining < 7 ? "warning" : ""}`}>
                          {status === "Expired"
                            ? "Expired"
                            : `${remaining} days`}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td>
                      <span className={`locker-status ${statusClass(status)}`}>
                        <i />
                        {status}
                      </span>
                    </td>

                    <td>
                      <div className="locker-action-buttons">
                        <button
                          title="View details"
                          onClick={() => openDetails(locker)}
                        >
                          <Eye size={17} />
                        </button>

                        {status === "Available" && (
                          <button
                            title="Assign locker"
                            onClick={() => openAssignLocker(locker)}
                          >
                            <UserRound size={17} />
                          </button>
                        )}

                        {(status === "Occupied" || status === "Expired") && (
                          <>
                            <button
                              title="Extend duration"
                              onClick={() => openExtend(locker)}
                            >
                              <RefreshCw size={17} />
                            </button>

                            <button
                              title="Release locker"
                              onClick={() => releaseLocker(locker)}
                            >
                              <Unlock size={17} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredLockers.length === 0 && (
            <div className="locker-empty-state">
              <Search size={32} />
              <h3>No lockers found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}
        </div>

        <div className="locker-table-footer">
          Showing <strong>{filteredLockers.length}</strong> of{" "}
          <strong>{lockers.length}</strong> lockers
        </div>
      </div>

      {/* ASSIGNMENT HISTORY */}
      <div className="locker-history-card">
        <div className="locker-section-heading">
          <div>
            <h2><History size={21} /> Recent Assignment History</h2>
            <p>Previous locker users and their assignment periods</p>
          </div>
        </div>

        <div className="locker-history-list">
          {lockers
            .flatMap((locker) =>
              locker.history.map((record, index) => ({
                ...record,
                lockerNumber: locker.number,
                historyId: `${locker.id}-${index}`,
              }))
            )
            .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
            .slice(0, 8)
            .map((record) => (
              <div className="locker-history-item" key={record.historyId}>
                <div className="history-icon">
                  <History size={19} />
                </div>

                <div className="history-member">
                  <strong>{record.memberName}</strong>
                  <small>{record.memberId} · {record.lockerNumber}</small>
                </div>

                <div className="history-date">
                  <small>Issue Date</small>
                  <strong>{formatDate(record.issueDate)}</strong>
                </div>

                <div className="history-date">
                  <small>Release Date</small>
                  <strong>{formatDate(record.releaseDate)}</strong>
                </div>

                <span className="history-completed">
                  <CheckCircle2 size={15} />
                  Released
                </span>
              </div>
            ))}

          {lockers.every((locker) => locker.history.length === 0) && (
            <div className="locker-history-empty">
              No previous assignment history available.
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {modal && (
        <div className="locker-modal-overlay" onClick={() => setModal(null)}>
          <div
            className="locker-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="locker-modal-header">
              <div>
                <span>LOCKER MANAGEMENT</span>
                <h2>{getModalTitle()}</h2>
              </div>

              <button
                className="locker-modal-close"
                onClick={() => setModal(null)}
              >
                <X size={21} />
              </button>
            </div>

            {/* ADD LOCKER */}
            {modal === "add" && (
              <form onSubmit={saveLocker}>
                <div className="locker-form-group">
                  <label>Locker Number *</label>
                  <div className="locker-input-wrapper">
                    <Hash size={18} />
                    <input
                      value={form.number}
                      onChange={(e) => updateForm("number", e.target.value)}
                      placeholder="e.g. L-013"
                      required
                    />
                  </div>
                </div>

                <div className="locker-form-grid">
                  <div className="locker-form-group">
                    <label>Locker Section</label>
                    <select
                      value={form.zone}
                      onChange={(e) => updateForm("zone", e.target.value)}
                    >
                      <option>Male Section</option>
                      <option>Female Section</option>
                      <option>General Section</option>
                    </select>
                  </div>

                  <div className="locker-form-group">
                    <label>Locker Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => updateForm("type", e.target.value)}
                    >
                      <option>Standard</option>
                      <option>Premium</option>
                    </select>
                  </div>
                </div>

                <div className="locker-modal-actions">
                  <button type="button" className="locker-cancel-btn" onClick={() => setModal(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="locker-primary-btn">
                    <Plus size={17} /> Add Locker
                  </button>
                </div>
              </form>
            )}

            {/* ASSIGN LOCKER */}
            {modal === "assign" && (
              <form onSubmit={assignLocker}>
                {selectedLocker ? (
                  <div className="locker-selected-info">
                    <LockKeyhole size={23} />
                    <div>
                      <strong>{selectedLocker.number}</strong>
                      <span>{selectedLocker.zone} · {selectedLocker.type}</span>
                    </div>
                    <span className="locker-status available"><i /> Available</span>
                  </div>
                ) : (
                  <div className="locker-form-group">
                    <label>Select Available Locker *</label>
                    <div className="locker-input-wrapper">
                      <LockKeyhole size={18} />
                      <select
                        value={form.lockerId}
                        onChange={(e) => updateForm("lockerId", e.target.value)}
                        required
                      >
                        {lockers
                          .filter((locker) => getLockerStatus(locker) === "Available")
                          .map((locker) => (
                            <option key={locker.id} value={locker.id}>
                              {locker.number} — {locker.zone} ({locker.type})
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="locker-form-group">
                  <label>Member Name *</label>
                  <div className="locker-input-wrapper">
                    <UserRound size={18} />
                    <input
                      value={form.memberName}
                      onChange={(e) => updateForm("memberName", e.target.value)}
                      placeholder="Enter member name"
                      required
                    />
                  </div>
                </div>

                <div className="locker-form-grid">
                  <div className="locker-form-group">
                    <label>Member ID *</label>
                    <div className="locker-input-wrapper">
                      <Hash size={18} />
                      <input
                        value={form.memberId}
                        onChange={(e) => updateForm("memberId", e.target.value)}
                        placeholder="KX-1004"
                        required
                      />
                    </div>
                  </div>

                  <div className="locker-form-group">
                    <label>Phone Number *</label>
                    <div className="locker-input-wrapper">
                      <Phone size={18} />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        placeholder="03XXXXXXXXX"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="locker-form-grid">
                  <div className="locker-form-group">
                    <label>Issue Date *</label>
                    <div className="locker-input-wrapper">
                      <CalendarDays size={18} />
                      <input
                        type="date"
                        min={getToday()}
                        value={form.issueDate}
                        onChange={(e) => updateForm("issueDate", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="locker-form-group">
                    <label>Duration *</label>
                    <select
                      value={form.duration}
                      onChange={(e) => updateForm("duration", e.target.value)}
                    >
                      <option value="7">7 Days</option>
                      <option value="15">15 Days</option>
                      <option value="30">30 Days</option>
                      <option value="60">60 Days</option>
                      <option value="90">90 Days</option>
                      <option value="180">180 Days</option>
                      <option value="365">1 Year</option>
                    </select>
                  </div>
                </div>

                <div className="locker-expiry-preview">
                  <CalendarDays size={19} />
                  <div>
                    <small>Automatically calculated expiry date</small>
                    <strong>
                      {formatDate(addDays(form.issueDate, Number(form.duration)))}
                    </strong>
                  </div>
                </div>

                <div className="locker-modal-actions">
                  <button type="button" className="locker-cancel-btn" onClick={() => setModal(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="locker-primary-btn">
                    <CheckCircle2 size={17} /> Assign Locker
                  </button>
                </div>
              </form>
            )}

            {/* EXTEND DURATION */}
            {modal === "extend" && (
              <form onSubmit={extendLocker}>
                <div className="locker-selected-info">
                  <RefreshCw size={23} />
                  <div>
                    <strong>{selectedLocker?.number}</strong>
                    <span>{selectedLocker?.assignment?.memberName}</span>
                  </div>
                </div>

                <div className="locker-expiry-details">
                  <div>
                    <small>Current Expiry</small>
                    <strong>{formatDate(selectedLocker?.assignment?.expiryDate)}</strong>
                  </div>
                  <ArrowUpRight size={20} />
                  <div>
                    <small>New Expiry</small>
                    <strong>
                      {formatDate(
                        addDays(
                          selectedLocker?.assignment?.expiryDate < getToday()
                            ? getToday()
                            : selectedLocker?.assignment?.expiryDate,
                          Number(form.extension)
                        )
                      )}
                    </strong>
                  </div>
                </div>

                <div className="locker-form-group">
                  <label>Extend By</label>
                  <select
                    value={form.extension}
                    onChange={(e) => updateForm("extension", e.target.value)}
                  >
                    <option value="7">7 Days</option>
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                    <option value="180">180 Days</option>
                  </select>
                </div>

                <div className="locker-modal-actions">
                  <button type="button" className="locker-cancel-btn" onClick={() => setModal(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="locker-primary-btn">
                    <RefreshCw size={17} /> Extend Duration
                  </button>
                </div>
              </form>
            )}

            {/* LOCKER DETAILS */}
            {modal === "details" && selectedLocker && (
              <div className="locker-details-content">
                <div className="locker-details-top">
                  <div className="locker-details-icon">
                    <LockKeyhole size={29} />
                  </div>
                  <div>
                    <h3>{selectedLocker.number}</h3>
                    <p>{selectedLocker.zone} · {selectedLocker.type}</p>
                  </div>
                  <span className={`locker-status ${statusClass(getLockerStatus(selectedLocker))}`}>
                    <i /> {getLockerStatus(selectedLocker)}
                  </span>
                </div>

                {selectedLocker.assignment ? (
                  <>
                    <h4 className="locker-detail-subtitle">Assigned Member Information</h4>

                    <div className="locker-detail-grid">
                      <div>
                        <UserRound size={17} />
                        <small>Member Name</small>
                        <strong>{selectedLocker.assignment.memberName}</strong>
                      </div>
                      <div>
                        <Hash size={17} />
                        <small>Member ID</small>
                        <strong>{selectedLocker.assignment.memberId}</strong>
                      </div>
                      <div>
                        <Phone size={17} />
                        <small>Phone Number</small>
                        <strong>{selectedLocker.assignment.phone}</strong>
                      </div>
                      <div>
                        <CalendarDays size={17} />
                        <small>Issue Date</small>
                        <strong>{formatDate(selectedLocker.assignment.issueDate)}</strong>
                      </div>
                      <div>
                        <CalendarDays size={17} />
                        <small>Expiry Date</small>
                        <strong>{formatDate(selectedLocker.assignment.expiryDate)}</strong>
                      </div>
                      <div>
                        <Clock size={17} />
                        <small>Total Duration</small>
                        <strong>
                          {getDuration(
                            selectedLocker.assignment.issueDate,
                            selectedLocker.assignment.expiryDate
                          )} Days
                        </strong>
                      </div>
                    </div>

                    <div className="locker-detail-actions">
                      <button
                        className="locker-primary-btn"
                        onClick={() => openExtend(selectedLocker)}
                      >
                        <RefreshCw size={17} /> Extend
                      </button>
                      <button
                        className="locker-release-btn"
                        onClick={() => releaseLocker(selectedLocker)}
                      >
                        <Unlock size={17} /> Release Locker
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="locker-detail-unassigned">
                    <LockKeyholeOpen size={30} />
                    <h3>
                      {selectedLocker.maintenance
                        ? "Locker Under Maintenance"
                        : "Locker Is Not Assigned"}
                    </h3>
                    <p>
                      {selectedLocker.maintenance
                        ? "This locker is currently unavailable."
                        : "This locker is ready to be assigned to a member."}
                    </p>

                    {!selectedLocker.maintenance && (
                      <button
                        className="locker-primary-btn"
                        onClick={() => openAssignLocker(selectedLocker)}
                      >
                        <UserRound size={17} /> Assign Member
                      </button>
                    )}
                  </div>
                )}

                <div className="locker-detail-history">
                  <h4><History size={17} /> Previous Assignments</h4>

                  {selectedLocker.history.length > 0 ? (
                    selectedLocker.history.map((record, index) => (
                      <div className="locker-detail-history-row" key={index}>
                        <div>
                          <strong>{record.memberName}</strong>
                          <small>{record.memberId}</small>
                        </div>
                        <div>
                          <small>Released</small>
                          <strong>{formatDate(record.releaseDate)}</strong>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No previous assignment records.</p>
                  )}
                </div>

                <div className="locker-management-actions">
                  {!selectedLocker.assignment && (
                    <button
                      className="locker-maintenance-btn"
                      onClick={() => {
                        toggleMaintenance(selectedLocker);
                        setModal(null);
                      }}
                    >
                      <Wrench size={16} />
                      {selectedLocker.maintenance
                        ? "Mark Available"
                        : "Move to Maintenance"}
                    </button>
                  )}

                  {!selectedLocker.assignment && (
                    <button
                      className="locker-delete-btn"
                      onClick={() => deleteLocker(selectedLocker)}
                    >
                      <Trash2 size={16} /> Delete Locker
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div className="locker-toast">
          <CheckCircle2 size={19} />
          {notification}
          <button onClick={() => setNotification("")}>
            <X size={17} />
          </button>
        </div>
      )}

    </div>
  );
};

export default LockerManagement;
