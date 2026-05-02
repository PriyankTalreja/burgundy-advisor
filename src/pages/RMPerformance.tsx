import { AppShell } from "@/components/burgundy/AppShell";
import { PARTNERS } from "@/data/burgundy";
import { TrendingUp } from "lucide-react";

const RMPerformance = () => {
  return (
    <AppShell>
      <header className="mb-8">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gold">RM Performance</p>
        <h1 className="text-[28px] font-semibold leading-tight">Burgundy Private · Partner Performance Overview</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          April 2025 · <span className="text-foreground font-medium">250 Partners</span> · <span className="text-foreground font-medium tabular">13,400 Families</span> · <span className="text-foreground font-medium tabular">₹2.13 Trillion AUM</span>
        </p>
      </header>

      {/* Top metric row */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="surface-card p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Avg proactive contacts per partner / month</p>
          <p className="mt-3 text-[28px] font-semibold tabular text-warning">11.2 / 54 families</p>
          <p className="mt-2 text-[12px] text-warning">21% of book reached proactively · Below 60% benchmark</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">AUM at attrition risk (network-wide)</p>
          <p className="mt-3 text-[28px] font-semibold tabular text-destructive">₹8,400 Cr</p>
          <p className="mt-2 text-[12px] text-muted-foreground">Families with 45+ days no contact</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Co-Pilot adoption</p>
          <p className="mt-3 text-[28px] font-semibold tabular text-gold">68 / 250</p>
          <p className="mt-2 text-[12px] text-muted-foreground">27% partners actively using · Pilot wave 2</p>
        </div>
      </div>

      {/* Table */}
      <section className="surface-card overflow-hidden">
        <div className="border-b border-border bg-surface-elevated/40 px-6 py-4">
          <h2 className="text-[15px] font-semibold">Top 10 partners by AUM managed</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">Identifiers anonymised · Sorted by AUM</p>
        </div>

        <div className="grid grid-cols-[60px_1.1fr_1fr_0.8fr_0.9fr_1.1fr_1fr_1.1fr] items-center gap-4 border-b border-border px-6 py-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <div>Rank</div>
          <div>Partner</div>
          <div>AUM managed</div>
          <div>Families</div>
          <div>Contacts</div>
          <div>Proactive rate</div>
          <div>AUM at risk</div>
          <div>Co-Pilot actions</div>
        </div>

        {PARTNERS.map((p) => {
          const isTop3 = p.rank <= 3;
          return (
            <div
              key={p.partner}
              className={`grid grid-cols-[60px_1.1fr_1fr_0.8fr_0.9fr_1.1fr_1fr_1.1fr] items-center gap-4 border-b border-border px-6 py-3.5 text-[13px] last:border-0 ${
                isTop3 ? "bg-gold/[0.04]" : ""
              }`}
            >
              <div>
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-[12px] font-semibold tabular ${
                  isTop3 ? "bg-gold/15 text-gold" : "bg-border text-muted-foreground"
                }`}>
                  {p.rank}
                </span>
              </div>
              <div className="font-medium text-foreground">{p.partner}</div>
              <div className="font-semibold tabular">₹{p.aumCr.toLocaleString("en-IN")} Cr</div>
              <div className="tabular text-muted-foreground">{p.families}</div>
              <div className="tabular text-muted-foreground">{p.contactsThisMonth}</div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-border">
                    <div
                      className={`h-full ${
                        p.proactiveRate >= 60 ? "bg-success" : p.proactiveRate >= 40 ? "bg-warning" : "bg-destructive"
                      }`}
                      style={{ width: `${p.proactiveRate}%` }}
                    />
                  </div>
                  <span className={`tabular text-[12px] font-semibold ${
                    p.proactiveRate >= 60 ? "text-success" : p.proactiveRate >= 40 ? "text-warning" : "text-destructive"
                  }`}>{p.proactiveRate}%</span>
                </div>
              </div>
              <div className={`tabular ${p.aumAtRiskCr > 300 ? "text-destructive" : p.aumAtRiskCr > 100 ? "text-warning" : "text-muted-foreground"}`}>
                {p.aumAtRiskCr === 0 ? "—" : `₹${p.aumAtRiskCr} Cr`}
              </div>
              <div>
                <span className={`tabular font-semibold ${isTop3 ? "text-gold" : "text-foreground"}`}>{p.copilotActions}</span>
                <span className="text-muted-foreground"> / mo</span>
              </div>
            </div>
          );
        })}
      </section>

      <p className="mt-3 px-2 text-[11.5px] text-muted-foreground">
        <span className="text-gold font-medium">Correlation: </span>
        Partners A, B and C — the highest Co-Pilot action rates — also lead on proactive contact rate and carry the lowest attrition-risk AUM.
      </p>

      {/* Bottom callout */}
      <section className="surface-card mt-8 border-2 border-gold/40 p-7">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-gold" />
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold">The transformation opportunity</p>
        </div>
        <p className="text-[15.5px] leading-relaxed text-foreground">
          Across <span className="font-semibold">250 Burgundy Private Partners</span>, closing the proactive contact gap from{" "}
          <span className="font-semibold text-warning tabular">21%</span> to{" "}
          <span className="font-semibold text-success tabular">60%</span> is estimated to protect{" "}
          <span className="font-semibold text-gold tabular">₹8,400 Cr</span> of AUM annually and unlock{" "}
          <span className="font-semibold text-gold tabular">₹1,200 Cr</span> of incremental wallet share.
          <span className="block mt-3 text-muted-foreground text-[14px]">This is the transformation opportunity.</span>
        </p>
      </section>
    </AppShell>
  );
};

export default RMPerformance;
