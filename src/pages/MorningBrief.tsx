import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/burgundy/AppShell";
import { StatCard } from "@/components/burgundy/StatCard";
import { Badge } from "@/components/burgundy/Badge";
import { CLIENTS } from "@/data/burgundy";
import { ArrowRight, Clock } from "lucide-react";

const MorningBrief = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gold">Morning Brief</p>
        <h1 className="text-[32px] font-semibold leading-tight">
          Good morning, Arjun. <span className="text-muted-foreground">Tuesday, 22 April 2025.</span>
        </h1>
        <p className="mt-2 text-[15px] text-muted-foreground">
          You have <span className="text-foreground font-medium">5 clients</span> requiring attention today across{" "}
          <span className="text-foreground font-medium tabular">₹312 Cr</span> of AUM.
        </p>
      </header>

      {/* Stat row */}
      <div className="mb-10 grid grid-cols-4 gap-4">
        <StatCard label="Book AUM" value="₹1,847 Cr" subtitle="24 UHNI families" />
        <StatCard label="Proactive contacts this month" value="8 / 24" subtitle="33% of book" accent="warning" />
        <StatCard label="AUM at attrition risk" value="₹284 Cr" subtitle="3 families · 45+ days no contact" accent="risk" />
        <StatCard label="Next Best Actions pending" value="5" subtitle="AI-generated today" accent="gold" />
      </div>

      {/* Priority clients */}
      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-[18px] font-semibold">Priority clients today</h2>
          <p className="text-[12px] text-muted-foreground">Ranked by AI urgency score · Refreshed 2 mins ago</p>
        </div>

        <div className="space-y-3">
          {CLIENTS.map((c) => {
            const border =
              c.highlight === "risk"
                ? "border-destructive/50 shadow-[0_0_0_1px_hsl(var(--destructive)/0.25)]"
                : c.highlight === "opportunity"
                ? "border-gold/50 shadow-[0_0_0_1px_hsl(var(--gold)/0.25)]"
                : "border-border";

            return (
              <article
                key={c.id}
                className={`surface-card border ${border} p-5 transition-colors hover:border-border-strong`}
              >
                <div className="grid grid-cols-12 items-center gap-6">
                  {/* Identity */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface-elevated text-[13px] font-semibold text-gold">
                      {c.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-foreground">{c.name}</p>
                      <p className="text-[12px] text-muted-foreground">{c.tier}</p>
                    </div>
                  </div>

                  {/* AUM */}
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">AUM</p>
                    <p className="text-[18px] font-semibold tabular text-foreground">₹{c.aumCr} Cr</p>
                  </div>

                  {/* Last contact */}
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Last contact</p>
                    <p
                      className={`flex items-center gap-1.5 text-[13px] font-medium tabular ${
                        c.daysSinceContact >= 45 ? "text-destructive" : c.daysSinceContact >= 14 ? "text-warning" : "text-foreground"
                      }`}
                    >
                      <Clock size={12} /> {c.daysSinceContact} days ago
                    </p>
                  </div>

                  {/* Insight + badge */}
                  <div className="col-span-5">
                    <div className="mb-2"><Badge kind={c.badge} /></div>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{c.insight}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <p className="text-[11px] text-muted-foreground">
                    AI confidence <span className="text-foreground font-medium">94%</span> · Sources: Portfolio engine,
                    CRM, Market data, SEBI filings
                  </p>
                  <button
                    onClick={() => navigate(`/client/${c.id}`)}
                    className="inline-flex items-center gap-1.5 rounded-btn bg-gradient-gold px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.02]"
                  >
                    Prepare Brief <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
};

export default MorningBrief;
