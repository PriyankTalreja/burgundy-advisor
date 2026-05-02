import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/burgundy/AppShell";
import { StatCard } from "@/components/burgundy/StatCard";
import { Badge } from "@/components/burgundy/Badge";
import { NBA_ROWS } from "@/data/burgundy";
import { ArrowRight } from "lucide-react";

const NextBestAction = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <header className="mb-8">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gold">Next Best Action</p>
        <h1 className="text-[28px] font-semibold leading-tight">AI-prioritised actions across your book</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          8 active recommendations · Re-ranked every 4 hours by the Burgundy Intelligence engine
        </p>
      </header>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <StatCard label="Rebalancing alerts" value="4" subtitle="Across ₹612 Cr of AUM" accent="warning" />
        <StatCard label="Life event flags" value="2" subtitle="Wedding · Liquidity event" accent="success" />
        <StatCard label="Attrition risk AUM" value="₹284 Cr" subtitle="3 families · 45+ days no contact" accent="risk" />
      </div>

      <div className="surface-card overflow-hidden">
        <div className="grid grid-cols-[60px_1.4fr_0.9fr_1fr_2.4fr_0.9fr_140px] items-center gap-4 border-b border-border bg-surface-elevated/40 px-5 py-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <div>Priority</div>
          <div>Client</div>
          <div>AUM</div>
          <div>Action type</div>
          <div>AI reason</div>
          <div>Last contact</div>
          <div></div>
        </div>

        {NBA_ROWS.map((r) => (
          <div
            key={`${r.priority}-${r.client}`}
            className="grid grid-cols-[60px_1.4fr_0.9fr_1fr_2.4fr_0.9fr_140px] items-center gap-4 border-b border-border px-5 py-4 text-[13px] transition-colors last:border-0 hover:bg-surface-elevated/30"
          >
            <div>
              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-[12px] font-semibold tabular ${
                r.priority <= 2 ? "bg-destructive/15 text-destructive" : r.priority <= 4 ? "bg-warning/15 text-warning" : "bg-border text-muted-foreground"
              }`}>
                {String(r.priority).padStart(2, "0")}
              </span>
            </div>
            <div className="font-medium text-foreground">{r.client}</div>
            <div className="font-semibold tabular">₹{r.aumCr} Cr</div>
            <div><Badge kind={r.actionType} /></div>
            <div className="text-[12.5px] leading-relaxed text-muted-foreground">{r.reason}</div>
            <div className={`tabular ${r.daysSinceContact >= 45 ? "text-destructive" : r.daysSinceContact >= 30 ? "text-warning" : "text-muted-foreground"}`}>
              {r.daysSinceContact} days
            </div>
            <div>
              <button
                onClick={() => navigate(`/client/${r.clientId}`)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-btn border border-gold/40 bg-gold/10 px-3 py-1.5 text-[12px] font-semibold text-gold transition-colors hover:bg-gold/20"
              >
                Take Action <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
};

export default NextBestAction;
