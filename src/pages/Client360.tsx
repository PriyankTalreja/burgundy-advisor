import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/burgundy/AppShell";
import { getClient } from "@/data/burgundy";
import { AlertTriangle, Send, Sparkles, MessageSquare, ArrowLeft } from "lucide-react";

// Donut: equity, debt, alternatives, cash
const Donut = ({ allocation, ceiling }: { allocation: { equity: number; debt: number; alternatives: number; cash: number }; ceiling: { equity: number; debt: number } }) => {
  const segs = [
    { key: "Equity", value: allocation.equity, color: "hsl(var(--gold))" },
    { key: "Debt", value: allocation.debt, color: "hsl(213 65% 55%)" },
    { key: "Alternatives", value: allocation.alternatives, color: "hsl(160 60% 45%)" },
    { key: "Cash", value: allocation.cash, color: "hsl(215 20% 55%)" },
  ];
  const r = 56;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const equityOver = allocation.equity > ceiling.equity;

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 160 160" className="h-[150px] w-[150px] -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="14" />
        {segs.map((s) => {
          const len = (s.value / 100) * c;
          const el = (
            <circle
              key={s.key}
              cx="80" cy="80" r={r} fill="none"
              stroke={s.color} strokeWidth="14"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
        <g transform="rotate(90 80 80)">
          <text x="80" y="76" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 9, letterSpacing: 1.5 }}>EQUITY</text>
          <text x="80" y="92" textAnchor="middle" className="fill-foreground" style={{ fontSize: 22, fontWeight: 600 }}>{allocation.equity}%</text>
        </g>
      </svg>
      <div className="space-y-2">
        {segs.map((s) => (
          <div key={s.key} className="flex items-center gap-2 text-[12px]">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-muted-foreground w-24">{s.key}</span>
            <span className="tabular text-foreground font-medium">{s.value}%</span>
          </div>
        ))}
        {equityOver && (
          <div className="mt-2 flex items-start gap-1.5 rounded-md bg-destructive/10 px-2 py-1.5 text-[11px] text-destructive">
            <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" />
            <span>Equity above {ceiling.equity}% ceiling</span>
          </div>
        )}
      </div>
    </div>
  );
};

const REBAL_ANSWER = `Rajesh's equity allocation has drifted to 71% — 6 points above his agreed ceiling of 65%. The drift is entirely due to the Nifty 50's 9.2% run since January, not active buying. Three talking points:

1. Frame it as 'the markets did the work' — this is discipline, not a market call. He will appreciate that framing.

2. Suggest a ₹17 Cr phased shift into a short-duration fund over 3 months — small enough not to feel dramatic, large enough to matter.

3. His debt allocation (18%) is below his 25% target. The rebalance addresses two problems at once. Show him the before/after allocation chart.`;

const SUGGESTIONS = [
  "What should I discuss about his equity exposure?",
  "Draft a WhatsApp message to schedule a call",
  "What are his top 3 financial priorities right now?",
];

const Client360 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = getClient(id ?? "rajesh-singhania");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ask = (q: string) => {
    setInput(q);
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setLoading(false);
      // Always return the canned rebalancing answer for the demo trigger; otherwise tailored fallback.
      if (q.toLowerCase().includes("equity") || q.toLowerCase().includes("rebalanc")) {
        setResponse(REBAL_ANSWER);
      } else if (q.toLowerCase().includes("whatsapp")) {
        setResponse(
          `Suggested message:\n\n"Rajesh, hope you and the family are well. It's been a few weeks — would love to find 30 minutes this week to walk you through how the portfolio is positioned after the recent rally, and pencil in a quick chat about Aditya's plans post-ISB. Does Thursday 4pm or Friday morning work?"\n\nTone: warm, personal-first, low pressure. Aligns with his communication preference (CRM note: 'prefers brief, family-aware openers').`
        );
      } else if (q.toLowerCase().includes("priorities")) {
        setResponse(
          `Based on portfolio signals, CRM history and life-stage data:\n\n1. Disciplined rebalancing of equity drift (71% → 65%) — protects ₹17 Cr from concentration risk.\n\n2. Cross-generational planning ahead of son's ISB graduation — opportunity to open an independent ₹8–12 Cr portfolio for Aditya, building a 25-year relationship runway.\n\n3. Real-estate liquidity review — two commercial holdings (Mumbai, Pune) are illiquid and concentrated. Suggest a 24-month staged divestment thesis.`
        );
      } else {
        setResponse(REBAL_ANSWER);
      }
    }, 700);
  };

  const isDefault = client.id === "rajesh-singhania";

  return (
    <AppShell>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT — Identity & portfolio */}
        <aside className="col-span-4">
          <div className="surface-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold text-[20px] font-semibold text-primary-foreground shadow-gold">
                {client.initials}
              </div>
              <div>
                <h1 className="text-[20px] font-semibold leading-tight">{client.name}</h1>
                <p className="text-[12px] text-gold">{client.tier}</p>
              </div>
            </div>

            <div className="my-6 border-t border-border" />

            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">AUM</p>
            <p className="mt-1 text-[34px] font-semibold tabular text-foreground">₹{client.aumCr} Cr</p>

            <div className="my-6 border-t border-border" />

            <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Asset allocation</p>
            <Donut allocation={client.allocation} ceiling={client.ceiling} />

            <div className="my-6 border-t border-border" />

            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-[12px]">
              <div>
                <dt className="text-muted-foreground">Risk profile</dt>
                <dd className="mt-0.5 font-medium">{client.riskProfile}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Relationship since</dt>
                <dd className="mt-0.5 font-medium tabular">
                  {client.relationshipSinceYear} <span className="text-muted-foreground">({2025 - client.relationshipSinceYear} years)</span>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Last contact</dt>
                <dd className={`mt-0.5 font-medium tabular ${client.daysSinceContact >= 45 ? "text-destructive" : ""}`}>{client.daysSinceContact} days ago</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Family</dt>
                <dd className="mt-0.5 font-medium">{client.family}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted-foreground">Source of wealth</dt>
                <dd className="mt-0.5 font-medium">{client.sourceOfWealth}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted-foreground">Key milestone</dt>
                <dd className="mt-0.5 font-medium text-gold">{client.milestone}</dd>
              </div>
            </dl>
          </div>
        </aside>

        {/* RIGHT — AI sections */}
        <div className="col-span-8 space-y-6">
          {/* Section A: AI Call Brief */}
          <section className="surface-card gold-border-top p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-gold" />
                <h2 className="text-[16px] font-semibold">AI Call Brief</h2>
              </div>
              <p className="text-[11px] text-muted-foreground">Prepared by Burgundy Intelligence · 2 mins ago</p>
            </div>

            {isDefault ? (
              <ul className="space-y-4 text-[13.5px] leading-relaxed">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  <p><span className="font-semibold text-foreground">Portfolio: </span><span className="text-muted-foreground">Equity at 71% — 6 points above his stated 65% ceiling following the March rally. Recommend a ₹17 Cr systematic shift to short-duration debt. Frame as disciplined rebalancing, not market timing.</span></p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  <p><span className="font-semibold text-foreground">Market context: </span><span className="text-muted-foreground">RBI held rates in April. His debt portfolio (18%) is positioned conservatively — opportunity to extend duration slightly for yield pickup.</span></p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  <p><span className="font-semibold text-foreground">Life event: </span><span className="text-muted-foreground">Son graduating ISB in June. Consider initiating a conversation about wealth transition planning and a potential independent portfolio for his son — cross-generational engagement opportunity.</span></p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  <p><span className="font-semibold text-foreground">Relationship: </span><span className="text-muted-foreground">52 days of silence is the longest gap in 3 years. Open with something personal before the portfolio conversation.</span></p>
                </li>
              </ul>
            ) : (
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">{client.insight}</p>
            )}
          </section>

          {/* Section B: Conversation openers */}
          {isDefault && (
            <section className="surface-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <MessageSquare size={14} className="text-gold" />
                <h2 className="text-[16px] font-semibold">Suggested conversation openers</h2>
              </div>
              <div className="space-y-2.5">
                {[
                  "Rajesh, I noticed the markets have been strong — wanted to walk you through how your portfolio is positioned after the rally.",
                  "Your son's ISB graduation is coming up in June — congratulations. Have you thought about what financial journey you'd want to set him up with?",
                  "I wanted to do a quick portfolio health check — it's been a while since we spoke properly.",
                ].map((s, i) => (
                  <button
                    key={i}
                    className="block w-full rounded-btn border border-border bg-surface-elevated/50 p-3.5 text-left text-[13px] leading-relaxed text-foreground transition-colors hover:border-gold/50 hover:bg-surface-elevated"
                  >
                    <span className="mr-2 text-[10px] font-semibold uppercase tracking-wider text-gold">Opener {i + 1}</span>
                    {s}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Section C: Ask the Co-Pilot */}
          <section className="surface-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-gold" />
              <h2 className="text-[16px] font-semibold">Ask the Co-Pilot</h2>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); if (input.trim()) ask(input.trim()); }}
              className="flex items-center gap-2 rounded-btn border border-border bg-background/40 px-3 py-2 focus-within:border-gold/60"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask anything about ${client.name.split(" ")[0]}'s portfolio or the upcoming call...`}
                className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-btn bg-gradient-gold px-3 py-1.5 text-[12px] font-semibold text-primary-foreground">
                <Send size={12} /> Ask
              </button>
            </form>

            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-full border border-border bg-surface-elevated/40 px-3 py-1.5 text-[11.5px] text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>

            {loading && (
              <div className="mt-5 flex items-center gap-2 text-[12px] text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                Burgundy Intelligence is composing a response…
              </div>
            )}

            {response && !loading && (
              <article className="mt-5 animate-fade-in rounded-lg border border-gold/30 bg-gold/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles size={12} className="text-gold" />
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gold">Co-Pilot response</p>
                </div>
                <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-foreground">{response}</p>
                <p className="mt-4 border-t border-gold/20 pt-3 text-[11px] text-muted-foreground">
                  Sources: Portfolio engine · CRM history · Nifty 50 index data · Client risk profile dated 14 Feb 2025
                </p>
              </article>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
};

export default Client360;
