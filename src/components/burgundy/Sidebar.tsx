import { NavLink, useLocation } from "react-router-dom";
import { Sun, Users, Target, Activity, BarChart3 } from "lucide-react";

const NAV = [
  { to: "/", label: "Morning Brief", icon: Sun, end: true },
  { to: "/client", label: "Client 360", icon: Users, end: false },
  { to: "/next-best-action", label: "Next Best Action", icon: Target, end: false },
  { to: "/book-health", label: "Book Health", icon: Activity, end: false },
  { to: "/rm-performance", label: "RM Performance", icon: BarChart3, end: false },
];

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[240px] flex-col border-r border-sidebar-border bg-sidebar">
      {/* Brand */}
      <div className="px-6 pt-7 pb-8">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-sm bg-gold shadow-[0_0_12px_hsl(var(--gold)/0.6)]" />
          <span className="text-[15px] font-semibold tracking-wide text-gold">Burgundy Intelligence</span>
        </div>
        <p className="mt-1 pl-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Co-Pilot · Powered by ADI
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => {
            const active = end ? pathname === to : pathname.startsWith(to);
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={`group relative flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  }`}
                >
                  {active && <span className="absolute inset-y-1.5 left-0 w-[2px] rounded-r bg-gold" />}
                  <Icon size={16} className={active ? "text-gold" : "text-muted-foreground group-hover:text-foreground"} />
                  <span className="font-medium">{label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-[12px] font-semibold text-primary-foreground shadow-gold">
            AM
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-foreground">Arjun Mehta</p>
            <p className="truncate text-[11px] text-muted-foreground">Burgundy Private Partner</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
