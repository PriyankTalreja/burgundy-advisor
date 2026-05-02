import { AppShell } from "@/components/burgundy/AppShell";
import { CONTACT_BUCKETS, CONTACT_BY_TIER, DRIFT_ALERTS } from "@/data/burgundy";
import { Sparkles, TrendingUp } from "lucide-react";

const colorMap = {
  success: "bg-success",
  gold: "bg-gold",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

const BookHealth = () => {
  const maxBucketAum = Math.max(...CONTACT_BUCKETS.map((b) => b.aumCr));
  const maxTierContacts = Math.max(...CONTACT_BY_TIER.map((t) => t.contactsPer90d));

  return (
    <AppShell>
      <header className="mb-8">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gold">Book Health</p>
        <h1 className="text-[28px] font-semibold leading-tight">Book Health Dashboard</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Arjun Mehta · <span className="text-foreground font-medium">24 families</span> · <span className="tabular text-foreground font-medium">₹1,847 Cr AUM</span>
        </p>
      </header>

      {/* 1. Contact frequency by AUM tier */}
      <section className="surface-card mb-6 p-6">
        <div className="mb-1 flex items-baseline justify-between">
          <h2 className="text-[16px] font-semibold">Contact frequency by AUM tier · last 90 days</h2>
          <p className="text-[11px] text-muted-foreground">Source: CRM activity log</p>
        </div>
        <p className="mb-6 text-[12.5px] text-muted-foreground">
          Average proactive contacts per family in each AUM band.
        </p>

        <div className="space-y-4">
          {CONTACT_BY_TIER.map((t) => (
            <div key={t.tier} className="grid grid-cols-[120px_1fr_140px] items-center gap-4">
              <div className="text-[13px] font-medium tabular">{t.tier}</div>
              <div className="relative h-7 overflow-hidden rounded bg-border/40">
                <div
                  className={`h-full rounded ${
                    t.contactsPer90d < 3 ? "bg-destructive" : t.contactsPer90d < 6 ? "bg-warning" : "bg-success"
                  }`}
                  style={{ width: `${(t.contactsPer90d / maxTierContacts) * 100}%` }}
                />
                <span className="absolute inset-y-0 left-3 flex items-center text-[11px] font-semibold text-foreground">
                  {t.contactsPer90d.toFixed(1)} contacts
                </span>
              </div>
              <div className="text-right text-[12px] text-muted-foreground">
                {t.families} families · <span className="text-foreground tabular">{t.aumShare}%</span> of book
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-gold/30 bg-gold/5 p-4">
          <Sparkles size={16} className="mt-0.5 flex-shrink-0 text-gold" />
          <p className="text-[13px] leading-relaxed">
            <span className="font-semibold text-gold">Key insight: </span>
            <span className="text-foreground">Your highest-value clients are receiving the least proactive contact. The Co-Pilot corrects this automatically.</span>
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-6">
        {/* 2. AUM by contact recency */}
        <section className="surface-card p-6">
          <h2 className="mb-1 text-[16px] font-semibold">AUM by contact recency</h2>
          <p className="mb-6 text-[12.5px] text-muted-foreground">Distribution of book by days since last partner-led contact.</p>

          <div className="space-y-4">
            {CONTACT_BUCKETS.map((b) => (
              <div key={b.label} className="grid grid-cols-[100px_1fr_140px] items-center gap-3">
                <div className="text-[13px] font-medium">{b.label}</div>
                <div className="relative h-7 overflow-hidden rounded bg-border/40">
                  <div className={`h-full ${colorMap[b.color]}`} style={{ width: `${(b.aumCr / maxBucketAum) * 100}%` }} />
                  <span className="absolute inset-y-0 left-3 flex items-center text-[11px] font-semibold text-foreground tabular">
                    ₹{b.aumCr} Cr
                  </span>
                </div>
                <div className="text-right text-[12px] text-muted-foreground tabular">{b.families} families</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Portfolio drift alerts */}
        <section className="surface-card p-6">
          <h2 className="mb-1 text-[16px] font-semibold">Portfolio drift alerts</h2>
          <p className="mb-5 text-[12.5px] text-muted-foreground">Allocations beyond agreed bands.</p>

          <ul className="space-y-3">
            {DRIFT_ALERTS.map((d) => (
              <li key={d.client} className="rounded-lg border border-border bg-surface-elevated/40 p-3.5">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-[13px] font-semibold">{d.client}</p>
                  <span className={`tabular text-[12px] font-semibold ${d.drift.startsWith("−") ? "text-warning" : "text-destructive"}`}>
                    {d.asset} {d.drift}
                  </span>
                </div>
                <p className="mb-2 text-[11.5px] text-muted-foreground tabular">
                  Current <span className="text-foreground">{d.current}</span> · Target <span className="text-foreground">{d.target}</span>
                </p>
                <p className="text-[12px] leading-relaxed text-muted-foreground">{d.action}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 4. Projected impact */}
      <section className="surface-card mt-6 border-2 border-gold/40 p-7">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-gold" />
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold">Projected impact · Burgundy Intelligence model</p>
        </div>
        <p className="mb-6 text-[15px] leading-relaxed text-foreground">
          If the Co-Pilot closes the contact gap on your <span className="font-semibold text-gold">8 highest-AUM clients</span>:
        </p>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Modelled AUM retention improvement</p>
            <p className="mt-2 text-[28px] font-semibold tabular text-gold">₹210 Cr</p>
          </div>
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Additional wallet share from proactive engagement</p>
            <p className="mt-2 text-[28px] font-semibold tabular text-gold">₹34 Cr</p>
          </div>
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">Time required from you</p>
            <p className="mt-2 text-[28px] font-semibold tabular text-foreground">40 min<span className="text-[16px] text-muted-foreground"> / week</span></p>
            <p className="mt-1 text-[11px] text-muted-foreground">Of guided calls</p>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default BookHealth;
