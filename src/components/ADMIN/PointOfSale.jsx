import { useEffect, useMemo, useState } from "react";
import "./PointOfSale.css";

/* ========================= ICONS ========================= */

const Icon = ({ name, size = 18 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    cart: <><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.5L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></>,
    calculator: <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></>,
    chart: <><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 6-7"/></>,
    box: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    trash: <><path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m4 4v7m6-7v7"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    tag: <><path d="M20 13 13 20 3 10V3h7l10 10Z"/><circle cx="7.5" cy="7.5" r="1"/></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></>,
    cash: <><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9h.01M18 15h.01"/></>,
    printer: <><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z"/></>,
    dumbbell: <><path d="m6 9-3 3 3 3M18 9l3 3-3 3M8 5v14M16 5v14M8 12h8"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    percent: <><path d="m19 5-14 14"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    wallet: <><path d="M3 6a2 2 0 0 1 2-2h14v4H5a2 2 0 0 1-2-2Z"/><path d="M3 6v12a2 2 0 0 0 2 2h16V8H5a2 2 0 0 1-2-2Z"/><path d="M16 14h.01"/></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.5-3"/></>,
    cup: <><path d="M5 4h14l-1 17H6L5 4ZM8 4V2h8v2M9 9h6"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    coins: <><circle cx="8" cy="8" r="5"/><path d="M13 5a5 5 0 0 1 0 10M8 6v4M6 8h4M15 13a5 5 0 0 1 5 5H10a5 5 0 0 1 5-5Z"/></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.spark}
    </svg>
  );
};

/* ========================= INITIAL PRODUCTS ========================= */

const initialProducts = [
  { id: 1, name: "Whey Protein", category: "Supplements", price: 12500, stock: 18, icon: "🥤", sku: "SUP-001" },
  { id: 2, name: "Creatine Monohydrate", category: "Supplements", price: 6500, stock: 12, icon: "⚡", sku: "SUP-002" },
  { id: 3, name: "Mass Gainer", category: "Supplements", price: 9800, stock: 9, icon: "💪", sku: "SUP-003" },
  { id: 4, name: "Multivitamins", category: "Supplements", price: 3200, stock: 20, icon: "💊", sku: "SUP-004" },
  { id: 5, name: "Energy Drink", category: "Drinks", price: 350, stock: 35, icon: "🥤", sku: "DRK-001" },
  { id: 6, name: "Mineral Water", category: "Drinks", price: 100, stock: 50, icon: "💧", sku: "DRK-002" },
  { id: 7, name: "Shaker Bottle", category: "Accessories", price: 1200, stock: 15, icon: "🧋", sku: "ACC-001" },
  { id: 8, name: "Gym Gloves", category: "Accessories", price: 1800, stock: 10, icon: "🥊", sku: "ACC-002" },
  { id: 9, name: "Resistance Band", category: "Accessories", price: 950, stock: 22, icon: "〰️", sku: "ACC-003" },
  { id: 10, name: "Yoga Mat", category: "Accessories", price: 2500, stock: 8, icon: "🧘", sku: "ACC-004" },
  { id: 11, name: "Monthly Membership", category: "Memberships", price: 3500, stock: null, icon: "🎫", sku: "MEM-001", service: true },
  { id: 12, name: "3 Months Membership", category: "Memberships", price: 9000, stock: null, icon: "🏆", sku: "MEM-002", service: true },
  { id: 13, name: "6 Months Membership", category: "Memberships", price: 16500, stock: null, icon: "👑", sku: "MEM-003", service: true },
  { id: 14, name: "Annual Membership", category: "Memberships", price: 30000, stock: null, icon: "⭐", sku: "MEM-004", service: true },
  { id: 15, name: "Personal Training", category: "Training", price: 5000, stock: null, icon: "🏋️", sku: "TRN-001", service: true },
  { id: 16, name: "Diet Plan", category: "Training", price: 2000, stock: null, icon: "🥗", sku: "TRN-002", service: true },
  { id: 17, name: "Locker Rental", category: "Services", price: 800, stock: null, icon: "🔐", sku: "SRV-001", service: true },
];

const categories = [
  { name: "All Items", icon: "grid" },
  { name: "Memberships", icon: "tag" },
  { name: "Supplements", icon: "spark" },
  { name: "Drinks", icon: "cup" },
  { name: "Accessories", icon: "dumbbell" },
  { name: "Training", icon: "user" },
  { name: "Services", icon: "wallet" },
];

const money = (value) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const getSaved = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

/* ========================= CALCULATOR ========================= */

function Calculator({ onClose }) {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [fresh, setFresh] = useState(false);

  const press = (key) => {
    if (/^\d$/.test(key) || key === ".") {
      if (fresh) {
        setDisplay(key === "." ? "0." : key);
        setFresh(false);
      } else if (key === "." && display.includes(".")) {
        return;
      } else {
        setDisplay(display === "0" && key !== "." ? key : display + key);
      }
      return;
    }

    if (key === "AC") {
      setDisplay("0");
      setPrevious(null);
      setOperator(null);
      setFresh(false);
      return;
    }

    if (key === "DEL") {
      setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
      return;
    }

    if (key === "%") {
      setDisplay(String(Number(display) / 100));
      return;
    }

    if (key === "±") {
      setDisplay(String(Number(display) * -1));
      return;
    }

    if (key === "=") {
      if (operator && previous !== null) {
        const a = Number(previous);
        const b = Number(display);
        let result = b;

        if (operator === "+") result = a + b;
        if (operator === "−") result = a - b;
        if (operator === "×") result = a * b;
        if (operator === "÷") result = b === 0 ? "Error" : a / b;

        setDisplay(String(result));
        setPrevious(null);
        setOperator(null);
        setFresh(true);
      }
      return;
    }

    if (["+", "−", "×", "÷"].includes(key)) {
      setPrevious(display);
      setOperator(key);
      setFresh(true);
    }
  };

  const keys = [
    "AC", "±", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "−",
    "1", "2", "3", "+",
    "DEL", "0", ".", "=",
  ];

  return (
    <div className="pos-overlay" onMouseDown={onClose}>
      <div className="pos-calculator" onMouseDown={(e) => e.stopPropagation()}>
        <div className="pos-calc-head">
          <div>
            <span className="pos-kicker">QUICK TOOL</span>
            <h3><Icon name="calculator" /> Calculator</h3>
          </div>
          <button className="pos-icon-button" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="pos-calc-display">
          <small>{previous !== null ? `${previous} ${operator || ""}` : "KINETIX CALCULATOR"}</small>
          <strong>{display}</strong>
        </div>

        <div className="pos-calc-keys">
          {keys.map((key) => (
            <button
              key={key}
              className={`${["÷", "×", "−", "+", "="].includes(key) ? "operator" : ""} ${key === "=" ? "equals" : ""} ${key === "AC" ? "clear" : ""}`}
              onClick={() => press(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================= MAIN POS COMPONENT ========================= */

export default function PointOfSale() {
  const [products, setProducts] = useState(() =>
    getSaved("kinetix_pos_products_v2", initialProducts)
  );

  const [sales, setSales] = useState(() =>
    getSaved("kinetix_pos_sales_v2", [])
  );

  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("sale");
  const [category, setCategory] = useState("All Items");
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState("");
  const [discount, setDiscount] = useState("");
  const [payment, setPayment] = useState("Cash");

  const [showCalculator, setShowCalculator] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [showRegisterDetails, setShowRegisterDetails] = useState(false);

  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [customCategory, setCustomCategory] = useState("Services");

  const [toast, setToast] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [historyQuery, setHistoryQuery] = useState("");

  const [selectedMetric, setSelectedMetric] = useState(null);

  const [registerOpen, setRegisterOpen] = useState(() =>
    getSaved("kinetix_pos_register_v2", true)
  );

  const [openingBalance, setOpeningBalance] = useState(() =>
    getSaved("kinetix_pos_opening_balance_v2", 0)
  );

  const [newOpeningBalance, setNewOpeningBalance] = useState("");

  /* ========================= SAVE DATA ========================= */

  useEffect(() => {
    localStorage.setItem("kinetix_pos_products_v2", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("kinetix_pos_sales_v2", JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem("kinetix_pos_register_v2", JSON.stringify(registerOpen));
  }, [registerOpen]);

  useEffect(() => {
    localStorage.setItem("kinetix_pos_opening_balance_v2", JSON.stringify(openingBalance));
  }, [openingBalance]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  /* ========================= CALCULATIONS ========================= */

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All Items" || product.category === category;

      const matchesSearch =
        `${product.name} ${product.sku}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = Math.min(
    subtotal,
    Math.max(0, Number(discount) || 0)
  );

  const total = Math.max(0, subtotal - discountAmount);

  const todaySales = sales.filter(
    (sale) =>
      new Date(sale.date).toDateString() === new Date().toDateString()
  );

  const todayRevenue = todaySales.reduce(
    (sum, sale) => sum + Number(sale.total || 0),
    0
  );

  const currentMonthSales = sales.filter((sale) => {
    const date = new Date(sale.date);
    const now = new Date();

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  const monthRevenue = currentMonthSales.reduce(
    (sum, sale) => sum + Number(sale.total || 0),
    0
  );

  const allTimeRevenue = sales.reduce(
    (sum, sale) => sum + Number(sale.total || 0),
    0
  );

  const totalItemsSold = sales.reduce(
    (sum, sale) =>
      sum +
      (sale.items || []).reduce(
        (itemSum, item) => itemSum + Number(item.quantity || 0),
        0
      ),
    0
  );

  const lowStock = products.filter(
    (product) => !product.service && Number(product.stock) <= 5
  );

  const filteredHistory = sales.filter((sale) =>
    `${sale.id} ${sale.customer}`
      .toLowerCase()
      .includes(historyQuery.toLowerCase())
  );

  const notify = (message) => setToast(message);

  /* ========================= METRIC DETAILS ========================= */

  const metricDetails = {
    today: {
      title: "Today's Revenue",
      amount: money(todayRevenue),
      description: "Completed transactions recorded today.",
      records: todaySales,
      type: "sales",
    },
    orders: {
      title: "Today's Orders",
      amount: todaySales.length,
      description: "All completed orders recorded today.",
      records: todaySales,
      type: "sales",
    },
    monthly: {
      title: "Monthly Revenue",
      amount: money(monthRevenue),
      description: "Revenue generated during the current calendar month.",
      records: currentMonthSales,
      type: "sales",
    },
    stock: {
      title: "Low Stock Alerts",
      amount: lowStock.length,
      description: "Products that need stock replenishment.",
      records: lowStock,
      type: "products",
    },
    allRevenue: {
      title: "All-time Revenue",
      amount: money(allTimeRevenue),
      description: "Total revenue from all saved transactions.",
      records: sales,
      type: "sales",
    },
    allOrders: {
      title: "Completed Orders",
      amount: sales.length,
      description: "All completed transactions in the system.",
      records: sales,
      type: "sales",
    },
    catalogue: {
      title: "Catalogue Items",
      amount: products.length,
      description: "All products and services in your catalogue.",
      records: products,
      type: "products",
    },
  };

  const openMetricDetails = (type) => {
    setSelectedMetric(type);
  };

  /* ========================= CART FUNCTIONS ========================= */

  const addToCart = (product) => {
    if (!registerOpen) {
      notify("Please open the register before creating a sale.");
      setShowRegisterDetails(true);
      return;
    }

    if (!product.service && product.stock <= 0) {
      notify("This product is out of stock.");
      return;
    }

    setCart((oldCart) => {
      const existing = oldCart.find((item) => item.id === product.id);

      if (existing) {
        if (!product.service && existing.quantity >= product.stock) {
          notify("Available stock limit reached.");
          return oldCart;
        }

        return oldCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...oldCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    if (!cart.length) {
      notify("Your cart is already empty.");
      return;
    }

    setCart([]);
    setDiscount("");
    notify("Current order cleared.");
  };

  /* ========================= CUSTOM ITEM ========================= */

  const addCustom = (event) => {
    event.preventDefault();

    if (!customName.trim() || Number(customPrice) <= 0) {
      notify("Please enter a valid item name and price.");
      return;
    }

    const item = {
      id: Date.now(),
      name: customName.trim(),
      category: customCategory,
      price: Number(customPrice),
      stock: null,
      icon: "✨",
      sku: `CUSTOM-${Date.now().toString().slice(-4)}`,
      service: true,
    };

    setProducts((oldProducts) => [...oldProducts, item]);

    if (registerOpen) {
      addToCart(item);
    }

    setCustomName("");
    setCustomPrice("");
    setCustomCategory("Services");
    setShowCustom(false);

    notify("Custom item added successfully.");
  };

  /* ========================= PAYMENT ========================= */

  const completeSale = () => {
    if (!registerOpen) {
      notify("Register is closed. Open it before payment.");
      setShowRegisterDetails(true);
      return;
    }

    if (!cart.length) {
      notify("Add products to the cart first.");
      return;
    }

    const outOfStock = cart.find((item) => {
      if (item.service) return false;

      const product = products.find((p) => p.id === item.id);

      return !product || product.stock < item.quantity;
    });

    if (outOfStock) {
      notify(`${outOfStock.name} has insufficient stock.`);
      return;
    }

    const sale = {
      id: `KX-${Date.now().toString().slice(-7)}`,
      customer: customer.trim() || "Walk-in Customer",
      payment,
      items: cart.map((item) => ({ ...item })),
      subtotal,
      discount: discountAmount,
      total,
      date: new Date().toISOString(),
    };

    setProducts((oldProducts) =>
      oldProducts.map((product) => {
        const soldItem = cart.find((item) => item.id === product.id);

        if (soldItem && !product.service) {
          return {
            ...product,
            stock: product.stock - soldItem.quantity,
          };
        }

        return product;
      })
    );

    setSales((oldSales) => [sale, ...oldSales]);
    setReceipt(sale);
    setCart([]);
    setCustomer("");
    setDiscount("");

    notify("Payment completed successfully!");
  };

  /* ========================= REGISTER FUNCTIONS ========================= */

  const openRegister = () => {
    const amount = Number(newOpeningBalance);

    if (newOpeningBalance !== "" && amount < 0) {
      notify("Opening balance cannot be negative.");
      return;
    }

    setOpeningBalance(amount || 0);
    setRegisterOpen(true);
    setNewOpeningBalance("");
    setShowRegisterDetails(false);

    notify("Register opened successfully.");
  };

  const closeRegister = () => {
    if (cart.length) {
      notify("Complete or clear the current order before closing register.");
      return;
    }

    setRegisterOpen(false);
    setShowRegisterDetails(false);

    notify("Register closed successfully.");
  };

  /* ========================= RENDER ========================= */

  return (
    <main className="pos-page">

      {toast && (
        <div className="pos-toast">
          <Icon name="check" />
          {toast}
        </div>
      )}

      {/* ========================= HEADER ========================= */}

      <header className="pos-topbar">
        <div className="pos-title-block">
          <div className="pos-brand-line">
            <span className="pos-brand-mark">
              <Icon name="dumbbell" size={17} />
            </span>
            KINETIX <i>FITNESS CLUB</i>
          </div>

          <div className="pos-title-row">
            <div>
              <span className="pos-kicker">ADMINISTRATION / SALES CENTER</span>
              <h1>Point of <em>Sale.</em></h1>
              <p>Everything your gym sells, beautifully managed.</p>
            </div>
          </div>
        </div>

        <div className="pos-top-actions">
          <button
            type="button"
            className={`pos-register-pill ${registerOpen ? "register-open" : "register-closed"}`}
            onClick={() => setShowRegisterDetails(true)}
          >
            <span className="pos-live-dot" />
            <div>
              <b>{registerOpen ? "Register Open" : "Register Closed"}</b>
              <small>Front Desk · Terminal 01</small>
            </div>
            <Icon name="arrow" size={16} />
          </button>

          <div className="pos-avatar">A</div>
        </div>
      </header>

      {/* ========================= METRIC CARDS ========================= */}

      <section className="pos-metrics">

        <button
          className="pos-metric-card pos-clickable-card"
          onClick={() => openMetricDetails("today")}
        >
          <div className="pos-metric-top">
            <span>Today's Revenue</span>
            <span className="pos-metric-icon"><Icon name="wallet" /></span>
          </div>
          <strong>{money(todayRevenue)}</strong>
          <small><i className="pos-up">↗</i> {todaySales.length} completed orders today</small>
          <span className="pos-card-hint">View details <Icon name="arrow" size={13} /></span>
        </button>

        <button
          className="pos-metric-card pos-clickable-card"
          onClick={() => openMetricDetails("orders")}
        >
          <div className="pos-metric-top">
            <span>Total Orders</span>
            <span className="pos-metric-icon"><Icon name="bag" /></span>
          </div>
          <strong>{todaySales.length}</strong>
          <small>Today's transactions</small>
          <span className="pos-card-hint">View details <Icon name="arrow" size={13} /></span>
        </button>

        <button
          className="pos-metric-card pos-clickable-card"
          onClick={() => openMetricDetails("monthly")}
        >
          <div className="pos-metric-top">
            <span>Monthly Revenue</span>
            <span className="pos-metric-icon"><Icon name="chart" /></span>
          </div>
          <strong>{money(monthRevenue)}</strong>
          <small>Current calendar month</small>
          <span className="pos-card-hint">View details <Icon name="arrow" size={13} /></span>
        </button>

        <button
          className="pos-metric-card pos-clickable-card"
          onClick={() => openMetricDetails("stock")}
        >
          <div className="pos-metric-top">
            <span>Low Stock Alerts</span>
            <span className="pos-metric-icon"><Icon name="box" /></span>
          </div>
          <strong>{lowStock.length}</strong>
          <small>{lowStock.length ? "Products need attention" : "All products looking good"}</small>
          <span className="pos-card-hint">View details <Icon name="arrow" size={13} /></span>
        </button>

      </section>

      {/* ========================= NAVIGATION ========================= */}

      <div className="pos-main-nav">
        <div className="pos-nav-tabs">
          {[
            ["sale", "bag", "New Sale"],
            ["overview", "chart", "Overview"],
            ["inventory", "box", "Inventory"],
            ["history", "clock", "Sales History"],
          ].map(([id, icon, label]) => (
            <button
              key={id}
              className={activeTab === id ? "active" : ""}
              onClick={() => setActiveTab(id)}
            >
              <Icon name={icon} size={16} />
              {label}
            </button>
          ))}
        </div>

        <div className="pos-nav-date">
          <span className={`pos-live-dot ${!registerOpen ? "offline" : ""}`} />
          {registerOpen ? "LIVE REGISTER" : "REGISTER CLOSED"}
          <span>{new Date().toLocaleDateString("en-PK")}</span>
        </div>
      </div>

      {/* ========================= NEW SALE ========================= */}

      {activeTab === "sale" && (
        <div className="pos-layout">

          <section className="pos-catalog">
            <div className="pos-section-top">
              <div>
                <span className="pos-kicker">THE KINETIX STORE</span>
                <h2>Explore Products <em>& Services</em></h2>
                <p>Choose an item to add it to the current order.</p>
              </div>

              <button
                className="pos-secondary-btn"
                onClick={addCustomProduct}
              >
                <Icon name="plus" />
                Custom item
              </button>
            </div>

            <div className="pos-search-row">
              <div className="pos-search-box">
                <Icon name="search" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by product name or SKU..."
                />
                {search && (
                  <button onClick={() => setSearch("")}>
                    <Icon name="close" size={15} />
                  </button>
                )}
              </div>
              <div className="pos-result-count">{visibleProducts.length} ITEMS</div>
            </div>

            <div className="pos-category-list">
              {categories.map((item) => (
                <button
                  key={item.name}
                  className={category === item.name ? "selected" : ""}
                  onClick={() => setCategory(item.name)}
                >
                  <Icon name={item.icon} size={15} />
                  {item.name}
                </button>
              ))}
            </div>

            <div className="pos-product-grid">
              {visibleProducts.map((product, index) => (
                <button
                  className="pos-product-card"
                  key={product.id}
                  onClick={() => addToCart(product)}
                  disabled={!product.service && product.stock <= 0}
                >
                  <div className={`pos-product-visual visual-${index % 6}`}>
                    <span className="pos-product-emoji">{product.icon}</span>
                    <span className="pos-add-product">
                      <Icon name="plus" size={17} />
                    </span>
                    <span className="pos-product-badge">
                      {product.service ? "SERVICE" : product.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="pos-product-details">
                    <small>{product.sku}</small>
                    <strong>{product.name}</strong>
                    <div>
                      <b>{money(product.price)}</b>
                      <span className={
                        product.service
                          ? "pos-service-stock"
                          : product.stock <= 5
                            ? "pos-low-stock"
                            : "pos-in-stock"
                      }>
                        {product.service ? "No stock limit" : `${product.stock} in stock`}
                      </span>
                    </div>
                  </div>
                </button>
              ))}

              {!visibleProducts.length && (
                <div className="pos-no-results">
                  <Icon name="search" size={28} />
                  <strong>No products found</strong>
                  <span>Try another keyword or category.</span>
                </div>
              )}
            </div>

            <div className="pos-catalog-footer">
              <Icon name="spark" size={15} />
              Add products, supplements, memberships and gym services to your sale.
            </div>
          </section>

          {/* ========================= ORDER PANEL ========================= */}

          <aside className="pos-order-panel">

            <div className="pos-order-heading">
              <div>
                <span className="pos-kicker">CHECKOUT DESK</span>
                <h2>
                  Current Order
                  <span>{cart.reduce((n, item) => n + item.quantity, 0)}</span>
                </h2>
              </div>

              <button
                className="pos-icon-button"
                title="Clear cart"
                onClick={clearCart}
              >
                <Icon name="trash" size={17} />
              </button>
            </div>

            <label className="pos-label">
              <Icon name="user" size={14} />
              Customer / Member
            </label>

            <div className="pos-input-wrap">
              <Icon name="user" size={16} />
              <input
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Walk-in customer or member name"
              />
            </div>

            <div className="pos-order-list">
              {cart.length === 0 ? (
                <div className="pos-empty-cart">
                  <div><Icon name="cart" size={30} /></div>
                  <strong>Your order is empty</strong>
                  <span>Choose a product from the store to get started.</span>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="pos-order-item" key={item.id}>
                    <div className="pos-order-emoji">{item.icon}</div>

                    <div className="pos-order-name">
                      <strong>{item.name}</strong>
                      <small>{money(item.price)} each</small>

                      <div className="pos-qty-control">
                        <button onClick={() => changeQuantity(item.id, -1)}>
                          <Icon name="minus" size={12} />
                        </button>
                        <b>{item.quantity}</b>
                        <button onClick={() => changeQuantity(item.id, 1)}>
                          <Icon name="plus" size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="pos-order-price">
                      <b>{money(item.price * item.quantity)}</b>
                      <button
                        onClick={() =>
                          setCart((old) => old.filter((p) => p.id !== item.id))
                        }
                      >
                        <Icon name="trash" size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pos-discount-area">
              <label className="pos-label">
                <Icon name="tag" size={14} />
                Discount amount
              </label>

              <div className="pos-discount-input">
                <span><Icon name="percent" size={15} /></span>
                <input
                  type="number"
                  min="0"
                  max={subtotal}
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Enter discount in PKR"
                />
              </div>
            </div>

            <div className="pos-total-box">
              <div className="pos-total-line">
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </div>

              <div className="pos-total-line">
                <span>Discount</span>
                <b className="pos-green-text">− {money(discountAmount)}</b>
              </div>

              <div className="pos-grand-total-row">
                <div>
                  <small>TOTAL PAYABLE</small>
                  <strong>{money(total)}</strong>
                </div>

                <button
                  className="pos-calculator-trigger"
                  title="Open calculator"
                  onClick={() => setShowCalculator(true)}
                >
                  <Icon name="calculator" size={21} />
                  <span>Calculator</span>
                </button>
              </div>
            </div>

            <div className="pos-payment-heading">
              <span className="pos-label">Payment Method</span>
              <small>SELECT ONE</small>
            </div>

            <div className="pos-payment-options">
              {[
                ["Cash", "cash"],
                ["Card", "card"],
                ["Bank", "wallet"],
                ["Online", "card"],
              ].map(([method, icon]) => (
                <button
                  key={method}
                  className={payment === method ? "chosen" : ""}
                  onClick={() => setPayment(method)}
                >
                  <Icon name={icon} size={17} />
                  <span>{method}</span>
                  {payment === method && (
                    <i><Icon name="check" size={11} /></i>
                  )}
                </button>
              ))}
            </div>

            <button
              className="pos-pay-button"
              disabled={!cart.length || !registerOpen}
              onClick={completeSale}
            >
              <Icon name="check" size={18} />
              Complete Payment
              <Icon name="arrow" size={17} />
            </button>

            {!registerOpen && (
              <p className="pos-register-warning">
                Register is closed. Open it to accept payments.
              </p>
            )}

            <div className="pos-secure-caption">
              <Icon name="check" size={12} />
              Secure local transaction record
            </div>
          </aside>
        </div>
      )}

      {/* ========================= OVERVIEW ========================= */}

      {activeTab === "overview" && (
        <section className="pos-management">
          <div className="pos-section-top">
            <div>
              <span className="pos-kicker">BUSINESS INSIGHTS</span>
              <h2>Sales <em>Overview</em></h2>
              <p>A quick look at your Kinetix store performance.</p>
            </div>
          </div>

          <div className="pos-overview-cards">

            <button onClick={() => openMetricDetails("allRevenue")}>
              <Icon name="wallet" />
              <small>All-time revenue</small>
              <strong>{money(allTimeRevenue)}</strong>
              <span>Click for details →</span>
            </button>

            <button onClick={() => openMetricDetails("allOrders")}>
              <Icon name="bag" />
              <small>Completed orders</small>
              <strong>{sales.length}</strong>
              <span>Click for details →</span>
            </button>

            <button onClick={() => openMetricDetails("catalogue")}>
              <Icon name="box" />
              <small>Catalogue items</small>
              <strong>{products.length}</strong>
              <span>Click for details →</span>
            </button>

            <button onClick={() => openMetricDetails("stock")}>
              <Icon name="bell" />
              <small>Low stock items</small>
              <strong>{lowStock.length}</strong>
              <span>Click for details →</span>
            </button>

          </div>

          <div className="pos-overview-extra">
            <div>
              <span>Total Items Sold</span>
              <strong>{totalItemsSold}</strong>
            </div>
            <div>
              <span>Average Order Value</span>
              <strong>{money(sales.length ? allTimeRevenue / sales.length : 0)}</strong>
            </div>
            <div>
              <span>This Month's Orders</span>
              <strong>{currentMonthSales.length}</strong>
            </div>
          </div>

          <div className="pos-management-card">
            <h3><Icon name="clock" /> Recent transactions</h3>

            {sales.slice(0, 8).map((sale) => (
              <button
                className="pos-history-row pos-history-clickable"
                key={sale.id}
                onClick={() => setReceipt(sale)}
              >
                <div>
                  <b>{sale.customer}</b>
                  <small>{sale.id} · {new Date(sale.date).toLocaleString()}</small>
                </div>
                <strong>{money(sale.total)}</strong>
                <span>View receipt →</span>
              </button>
            ))}

            {!sales.length && (
              <div className="pos-empty-state">
                No sales yet. Your completed transactions will appear here.
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================= INVENTORY ========================= */}

      {activeTab === "inventory" && (
        <section className="pos-management">

          <div className="pos-section-top">
            <div>
              <span className="pos-kicker">STOCK CONTROL</span>
              <h2>Inventory <em>Management</em></h2>
              <p>Monitor your gym store products and stock levels.</p>
            </div>

            <button
              className="pos-secondary-btn"
              onClick={addCustomProduct}
            >
              <Icon name="plus" />
              Add custom item
            </button>
          </div>

          <div className="pos-inventory-summary">
            <div>
              <Icon name="box" />
              <span>Total catalogue items</span>
              <strong>{products.length}</strong>
            </div>
            <div>
              <Icon name="bell" />
              <span>Low stock products</span>
              <strong>{lowStock.length}</strong>
            </div>
            <div>
              <Icon name="check" />
              <span>Available products</span>
              <strong>{products.filter((p) => p.service || p.stock > 5).length}</strong>
            </div>
          </div>

          {lowStock.length > 0 && (
            <div className="pos-stock-warning">
              <Icon name="bell" />
              {lowStock.length} items have 5 or fewer units remaining.
            </div>
          )}

          <div className="pos-table-wrap">
            <table className="pos-table">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>SKU</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <span className="pos-table-item">
                        {product.icon} {product.name}
                      </span>
                    </td>
                    <td>{product.sku}</td>
                    <td>{product.category}</td>
                    <td>{money(product.price)}</td>
                    <td>{product.service ? "—" : product.stock}</td>
                    <td>
                      <span className={`pos-stock-status ${
                        product.service
                          ? "service"
                          : product.stock <= 5
                            ? "low"
                            : "good"
                      }`}>
                        {product.service
                          ? "Service"
                          : product.stock <= 5
                            ? "Low stock"
                            : "In stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ========================= SALES HISTORY ========================= */}

      {activeTab === "history" && (
        <section className="pos-management">

          <div className="pos-section-top">
            <div>
              <span className="pos-kicker">TRANSACTION RECORDS</span>
              <h2>Sales <em>History</em></h2>
              <p>Review your completed sales and print receipts.</p>
            </div>
          </div>

          <div className="pos-history-summary">
            <div>
              <span>Total transactions</span>
              <strong>{sales.length}</strong>
            </div>
            <div>
              <span>Total revenue</span>
              <strong>{money(allTimeRevenue)}</strong>
            </div>
            <div>
              <span>Today's transactions</span>
              <strong>{todaySales.length}</strong>
            </div>
          </div>

          <div className="pos-search-box pos-history-search">
            <Icon name="search" />
            <input
              value={historyQuery}
              onChange={(e) => setHistoryQuery(e.target.value)}
              placeholder="Search receipt ID or customer..."
            />
          </div>

          <div className="pos-table-wrap">
            <table className="pos-table">
              <thead>
                <tr>
                  <th>RECEIPT ID</th>
                  <th>CUSTOMER</th>
                  <th>DATE</th>
                  <th>PAYMENT</th>
                  <th>TOTAL</th>
                  <th>RECEIPT</th>
                </tr>
              </thead>

              <tbody>
                {filteredHistory.map((sale) => (
                  <tr key={sale.id}>
                    <td className="pos-green-text">{sale.id}</td>
                    <td>{sale.customer}</td>
                    <td>{new Date(sale.date).toLocaleString()}</td>
                    <td>{sale.payment}</td>
                    <td><b>{money(sale.total)}</b></td>
                    <td>
                      <button
                        className="pos-view-btn"
                        onClick={() => setReceipt(sale)}
                      >
                        <Icon name="printer" size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!filteredHistory.length && (
              <div className="pos-empty-state">
                No matching sales found.
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================= CALCULATOR MODAL ========================= */}

      {showCalculator && (
        <Calculator onClose={() => setShowCalculator(false)} />
      )}

      {/* ========================= CUSTOM ITEM MODAL ========================= */}

      {showCustom && (
        <div
          className="pos-overlay"
          onMouseDown={() => setShowCustom(false)}
        >
          <form
            className="pos-form-modal"
            onSubmit={addCustom}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="pos-modal-heading">
              <div>
                <span className="pos-kicker">STORE CATALOGUE</span>
                <h3>Add Custom Item</h3>
              </div>
              <button
                type="button"
                className="pos-icon-button"
                onClick={() => setShowCustom(false)}
              >
                <Icon name="close" />
              </button>
            </div>

            <label>Item name</label>
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Enter item or service name"
              required
            />

            <label>Price (PKR)</label>
            <input
              type="number"
              min="1"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder="Enter amount"
              required
            />

            <label>Category</label>
            <select
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            >
              {categories
                .filter((item) => item.name !== "All Items")
                .map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>

            <button className="pos-pay-button" type="submit">
              <Icon name="plus" />
              Add item to sale
            </button>
          </form>
        </div>
      )}

      {/* ========================= REGISTER DETAILS MODAL ========================= */}

      {showRegisterDetails && (
        <div
          className="pos-overlay"
          onMouseDown={() => setShowRegisterDetails(false)}
        >
          <div
            className="pos-detail-modal pos-register-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="pos-modal-heading">
              <div>
                <span className="pos-kicker">FRONT DESK / TERMINAL 01</span>
                <h3>Register Management</h3>
              </div>

              <button
                className="pos-icon-button"
                onClick={() => setShowRegisterDetails(false)}
              >
                <Icon name="close" />
              </button>
            </div>

            <div className={`pos-register-status ${registerOpen ? "open" : "closed"}`}>
              <span className="pos-live-dot" />
              <div>
                <strong>{registerOpen ? "Register is Open" : "Register is Closed"}</strong>
                <small>
                  {registerOpen
                    ? "This terminal can accept new payments."
                    : "Payments are currently disabled."}
                </small>
              </div>
            </div>

            <div className="pos-detail-stat-grid">
              <div>
                <small>Today's Revenue</small>
                <strong>{money(todayRevenue)}</strong>
              </div>
              <div>
                <small>Today's Orders</small>
                <strong>{todaySales.length}</strong>
              </div>
              <div>
                <small>Opening Balance</small>
                <strong>{money(openingBalance)}</strong>
              </div>
              <div>
                <small>Cash Payments Today</small>
                <strong>
                  {money(
                    todaySales
                      .filter((sale) => sale.payment === "Cash")
                      .reduce((sum, sale) => sum + sale.total, 0)
                  )}
                </strong>
              </div>
            </div>

            {!registerOpen && (
              <div className="pos-register-open-form">
                <label>Opening cash balance (PKR)</label>
                <input
                  type="number"
                  min="0"
                  value={newOpeningBalance}
                  onChange={(e) => setNewOpeningBalance(e.target.value)}
                  placeholder="Enter opening cash amount"
                />
                <button className="pos-pay-button" onClick={openRegister}>
                  <Icon name="check" />
                  Open Register
                </button>
              </div>
            )}

            {registerOpen && (
              <div className="pos-register-close-info">
                <p>
                  Before closing the register, make sure all current orders
                  are completed or cleared.
                </p>
                <button className="pos-danger-button" onClick={closeRegister}>
                  <Icon name="close" />
                  Close Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================= METRIC DETAILS MODAL ========================= */}

      {selectedMetric && metricDetails[selectedMetric] && (
        <div
          className="pos-overlay"
          onMouseDown={() => setSelectedMetric(null)}
        >
          <div
            className="pos-detail-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="pos-modal-heading">
              <div>
                <span className="pos-kicker">KINETIX PERFORMANCE</span>
                <h3>{metricDetails[selectedMetric].title}</h3>
              </div>

              <button
                className="pos-icon-button"
                onClick={() => setSelectedMetric(null)}
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="pos-detail-highlight">
              <small>{metricDetails[selectedMetric].description}</small>
              <strong>{metricDetails[selectedMetric].amount}</strong>
            </div>

            {metricDetails[selectedMetric].type === "sales" ? (
              <>
                <div className="pos-detail-list-heading">
                  <strong>Transaction Details</strong>
                  <span>{metricDetails[selectedMetric].records.length} RECORDS</span>
                </div>

                <div className="pos-detail-list">
                  {metricDetails[selectedMetric].records.length ? (
                    metricDetails[selectedMetric].records.map((sale) => (
                      <button
                        className="pos-detail-list-row"
                        key={sale.id}
                        onClick={() => {
                          setSelectedMetric(null);
                          setReceipt(sale);
                        }}
                      >
                        <div>
                          <strong>{sale.customer}</strong>
                          <small>
                            {sale.id} · {new Date(sale.date).toLocaleString()}
                          </small>
                          <small>{sale.payment} · {(sale.items || []).length} item types</small>
                        </div>
                        <b>{money(sale.total)}</b>
                        <Icon name="arrow" size={15} />
                      </button>
                    ))
                  ) : (
                    <div className="pos-empty-state">
                      No transaction records available yet.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="pos-detail-list-heading">
                  <strong>Product Details</strong>
                  <span>{metricDetails[selectedMetric].records.length} ITEMS</span>
                </div>

                <div className="pos-detail-list">
                  {metricDetails[selectedMetric].records.length ? (
                    metricDetails[selectedMetric].records.map((product) => (
                      <div className="pos-detail-list-row" key={product.id}>
                        <div>
                          <strong>{product.icon} {product.name}</strong>
                          <small>{product.sku} · {product.category}</small>
                          <small>{money(product.price)}</small>
                        </div>
                        <b>
                          {product.service
                            ? "Service"
                            : `${product.stock} left`}
                        </b>
                      </div>
                    ))
                  ) : (
                    <div className="pos-empty-state">
                      No products in this category.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================= RECEIPT MODAL ========================= */}

      {receipt && (
        <div
          className="pos-overlay"
          onMouseDown={() => setReceipt(null)}
        >
          <div
            className="pos-receipt-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="pos-modal-heading no-print">
              <div>
                <span className="pos-kicker">KINETIX FITNESS CLUB</span>
                <h3>Payment Receipt</h3>
              </div>

              <button
                className="pos-icon-button"
                onClick={() => setReceipt(null)}
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="pos-receipt-paper" id="pos-receipt-paper">
              <div className="pos-receipt-logo">
                KINETIX
                <small>FITNESS CLUB</small>
              </div>

              <h4>PAYMENT RECEIPT</h4>
              <p>{receipt.id}</p>
              <p>{new Date(receipt.date).toLocaleString()}</p>

              <hr />

              <p>Customer: {receipt.customer}</p>
              <p>Payment: {receipt.payment}</p>

              <hr />

              {(receipt.items || []).map((item) => (
                <div className="pos-receipt-line" key={item.id}>
                  <span>{item.name} × {item.quantity}</span>
                  <b>{money(item.price * item.quantity)}</b>
                </div>
              ))}

              <hr />

              <div className="pos-receipt-line">
                <span>Subtotal</span>
                <b>{money(receipt.subtotal)}</b>
              </div>

              <div className="pos-receipt-line">
                <span>Discount</span>
                <b>{money(receipt.discount)}</b>
              </div>

              <div className="pos-receipt-line receipt-total">
                <span>Total paid</span>
                <b>{money(receipt.total)}</b>
              </div>

              <p className="receipt-thanks">
                Thank you for choosing Kinetix!
              </p>
            </div>

            <button
              className="pos-pay-button no-print"
              onClick={() => window.print()}
            >
              <Icon name="printer" />
              Print Receipt
            </button>
          </div>
        </div>
      )}

    </main>
  );
}

