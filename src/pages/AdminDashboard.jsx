
import Sidebar from "../components/Sidebar";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Members", value: "248", change: "+12%" },
    { title: "Active Today", value: "186", change: "+8%" },
    { title: "Classes Today", value: "6", change: "+2%" },
    { title: "Monthly Revenue", value: "PKR 462,800", change: "+15%" },
  ];

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">KINETIX FITNESS CLUB</p>
            <h1>
              Welcome back, <span>Admin!</span>
            </h1>
            <p>Here's what's happening at KINETIX today.</p>
          </div>

          <div className="admin-date">
            <span>ADMIN PANEL</span>
            <strong>Dashboard</strong>
          </div>
        </header>

        <section className="admin-stats">
          {stats.map((stat) => (
            <article className="admin-stat-card" key={stat.title}>
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
              <span>{stat.change} from last period</span>
            </article>
          ))}
        </section>

        <section className="admin-welcome-card">
          <p className="admin-eyebrow">YOUR FITNESS. YOUR FUTURE.</p>
          <h2>STRONGER THAN YESTERDAY.</h2>
          <p>
            Manage your gym, monitor memberships and keep
            your fitness club moving forward.
          </p>
        </section>
      </main>
    </div>
  );
}
