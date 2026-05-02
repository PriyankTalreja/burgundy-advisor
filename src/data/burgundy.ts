// Centralised, realistic data so every screen tells a consistent story.

export type ActionBadge = "Rebalance Alert" | "Life Event" | "Attrition Risk" | "Opportunity" | "Compliance";

export interface Client {
  id: string;
  name: string;
  initials: string;
  aumCr: number;
  daysSinceContact: number;
  insight: string;
  badge: ActionBadge;
  tier: string;
  riskProfile: string;
  relationshipSinceYear: number;
  family: string;
  sourceOfWealth: string;
  milestone: string;
  allocation: { equity: number; debt: number; alternatives: number; cash: number };
  ceiling: { equity: number; debt: number };
  highlight?: "risk" | "opportunity";
}

export const CLIENTS: Client[] = [
  {
    id: "rajesh-singhania",
    name: "Rajesh Singhania",
    initials: "RS",
    aumCr: 284,
    daysSinceContact: 52,
    insight:
      "Equity allocation drifted to 71% after Nifty rally — above his 65% ceiling. Rebalancing conversation overdue.",
    badge: "Rebalance Alert",
    tier: "Burgundy Private · Tier 1",
    riskProfile: "Moderate-Aggressive",
    relationshipSinceYear: 2017,
    family: "Married, 2 children (26, 23)",
    sourceOfWealth: "Textiles & Real Estate",
    milestone: "Son completing MBA at ISB — June 2025",
    allocation: { equity: 71, debt: 18, alternatives: 8, cash: 3 },
    ceiling: { equity: 65, debt: 25 },
  },
  {
    id: "priya-kapoor",
    name: "Priya Kapoor",
    initials: "PK",
    aumCr: 47,
    daysSinceContact: 8,
    insight:
      "Daughter's wedding in 6 weeks. Liquidity of ₹3.2 Cr needed. FD maturing 15 May — timing aligns.",
    badge: "Life Event",
    tier: "Burgundy Private · Tier 2",
    riskProfile: "Moderate",
    relationshipSinceYear: 2019,
    family: "Married, 1 daughter (28)",
    sourceOfWealth: "Pharmaceutical exports",
    milestone: "Daughter's wedding — 5 June 2025",
    allocation: { equity: 52, debt: 34, alternatives: 6, cash: 8 },
    ceiling: { equity: 60, debt: 35 },
  },
  {
    id: "vikram-nair",
    name: "Vikram Nair",
    initials: "VN",
    aumCr: 138,
    daysSinceContact: 61,
    insight:
      "No contact in 61 days. Peer benchmark: top partners contact this AUM tier every 18 days. High attrition risk.",
    badge: "Attrition Risk",
    tier: "Burgundy Private · Tier 1",
    riskProfile: "Moderate",
    relationshipSinceYear: 2015,
    family: "Married, 3 children",
    sourceOfWealth: "IT services founder, post-exit",
    milestone: "Considering family office structure",
    allocation: { equity: 48, debt: 32, alternatives: 14, cash: 6 },
    ceiling: { equity: 55, debt: 35 },
    highlight: "risk",
  },
  {
    id: "sunita-agarwal",
    name: "Sunita Agarwal",
    initials: "SA",
    aumCr: 92,
    daysSinceContact: 12,
    insight:
      "Her manufacturing business just secured a ₹180 Cr PE round (public filing, 3 days ago). Significant new liquidity event — first mover opportunity.",
    badge: "Opportunity",
    tier: "Burgundy Private · Tier 2",
    riskProfile: "Aggressive",
    relationshipSinceYear: 2020,
    family: "Married, 2 children (14, 11)",
    sourceOfWealth: "Industrial manufacturing (promoter)",
    milestone: "₹180 Cr PE round closed — April 2025",
    allocation: { equity: 62, debt: 22, alternatives: 12, cash: 4 },
    ceiling: { equity: 70, debt: 25 },
    highlight: "opportunity",
  },
  {
    id: "anil-mehrotra",
    name: "Anil Mehrotra",
    initials: "AM",
    aumCr: 67,
    daysSinceContact: 5,
    insight:
      "Portfolio review due. SEBI advisory mandate requires documented review every 90 days — due in 11 days.",
    badge: "Compliance",
    tier: "Burgundy Private · Tier 2",
    riskProfile: "Conservative-Moderate",
    relationshipSinceYear: 2018,
    family: "Married, 1 son (19)",
    sourceOfWealth: "Listed company CXO, ESOP wealth",
    milestone: "SEBI mandate review due — 3 May 2025",
    allocation: { equity: 38, debt: 48, alternatives: 8, cash: 6 },
    ceiling: { equity: 45, debt: 55 },
  },
];

export const getClient = (id: string) => CLIENTS.find((c) => c.id === id) ?? CLIENTS[0];

export const BADGE_STYLES: Record<ActionBadge, { bg: string; text: string; dot: string }> = {
  "Rebalance Alert": { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  "Life Event": { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  "Attrition Risk": { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
  "Opportunity": { bg: "bg-gold/10", text: "text-gold", dot: "bg-gold" },
  "Compliance": { bg: "bg-muted-foreground/10", text: "text-muted-foreground", dot: "bg-muted-foreground" },
};

// Next Best Action — 8 prioritised rows. Includes the 5 from Morning Brief plus 3 more.
export interface NBARow {
  priority: number;
  clientId: string;
  client: string;
  aumCr: number;
  actionType: ActionBadge;
  reason: string;
  daysSinceContact: number;
}

export const NBA_ROWS: NBARow[] = [
  { priority: 1, clientId: "vikram-nair", client: "Vikram Nair", aumCr: 138, actionType: "Attrition Risk", reason: "61 days silent. Peer benchmark for ₹100 Cr+ tier is 18 days. Engagement window closing.", daysSinceContact: 61 },
  { priority: 2, clientId: "rajesh-singhania", client: "Rajesh Singhania", aumCr: 284, actionType: "Rebalance Alert", reason: "Equity 71% vs 65% ceiling. ₹17 Cr phased shift to short-duration debt recommended.", daysSinceContact: 52 },
  { priority: 3, clientId: "sunita-agarwal", client: "Sunita Agarwal", aumCr: 92, actionType: "Opportunity", reason: "₹180 Cr PE round closed 19 Apr. Promoter share liquidity ~₹38 Cr expected in 30 days.", daysSinceContact: 12 },
  { priority: 4, clientId: "priya-kapoor", client: "Priya Kapoor", aumCr: 47, actionType: "Life Event", reason: "Daughter's wedding 5 Jun. ₹3.2 Cr liquidity need. FD ladder maturing 15 May.", daysSinceContact: 8 },
  { priority: 5, clientId: "anil-mehrotra", client: "Anil Mehrotra", aumCr: 67, actionType: "Compliance", reason: "SEBI advisory mandate review due in 11 days. Documentation pack pre-drafted by Co-Pilot.", daysSinceContact: 5 },
  { priority: 6, clientId: "rajesh-singhania", client: "Harish Choksi", aumCr: 156, actionType: "Rebalance Alert", reason: "Debt allocation 41% vs 30% target after recent G-Sec subscription. Duration risk elevated.", daysSinceContact: 24 },
  { priority: 7, clientId: "vikram-nair", client: "Meera Iyer", aumCr: 78, actionType: "Opportunity", reason: "AIF Cat-II window for Burgundy clients closing 30 Apr. Suitability score: 92/100.", daysSinceContact: 19 },
  { priority: 8, clientId: "anil-mehrotra", client: "Devendra Shah", aumCr: 41, actionType: "Compliance", reason: "Risk profile last refreshed 14 months ago. SEBI requires annual reassessment.", daysSinceContact: 31 },
];

// Book Health — last 90 days contact frequency by AUM bucket
export const CONTACT_BUCKETS = [
  { label: "0–14 days", aumCr: 412, families: 9, color: "success" as const },
  { label: "15–30 days", aumCr: 538, families: 7, color: "gold" as const },
  { label: "31–60 days", aumCr: 613, families: 5, color: "warning" as const },
  { label: "60+ days", aumCr: 284, families: 3, color: "destructive" as const },
];

export const CONTACT_BY_TIER = [
  { tier: ">₹150 Cr", families: 6, contactsPer90d: 2.1, aumShare: 58 },
  { tier: "₹75–150 Cr", families: 8, contactsPer90d: 4.4, aumShare: 28 },
  { tier: "₹25–75 Cr", families: 7, contactsPer90d: 7.8, aumShare: 11 },
  { tier: "<₹25 Cr", families: 3, contactsPer90d: 11.2, aumShare: 3 },
];

export const DRIFT_ALERTS = [
  { client: "Rajesh Singhania", asset: "Equity", drift: "+6.0%", current: "71%", target: "65%", action: "Phased ₹17 Cr shift to short-duration debt" },
  { client: "Harish Choksi", asset: "Debt", drift: "+11.0%", current: "41%", target: "30%", action: "Trim G-Sec position; redeploy ₹14 Cr to large-cap equity" },
  { client: "Meera Iyer", asset: "Alternatives", drift: "−4.5%", current: "5.5%", target: "10%", action: "AIF Cat-II allocation ₹3.5 Cr — window closes 30 Apr" },
  { client: "Vikram Nair", asset: "Cash", drift: "+4.0%", current: "10%", target: "6%", action: "Sweep ₹5.5 Cr into liquid + arbitrage funds" },
];

// RM Performance — top 10 partners
export interface PartnerRow {
  rank: number;
  partner: string;
  aumCr: number;
  families: number;
  contactsThisMonth: number;
  proactiveRate: number;
  aumAtRiskCr: number;
  copilotActions: number;
}

export const PARTNERS: PartnerRow[] = [
  { rank: 1, partner: "Partner A", aumCr: 2840, families: 31, contactsThisMonth: 71, proactiveRate: 78, aumAtRiskCr: 0, copilotActions: 184 },
  { rank: 2, partner: "Partner B", aumCr: 2610, families: 28, contactsThisMonth: 64, proactiveRate: 71, aumAtRiskCr: 92, copilotActions: 161 },
  { rank: 3, partner: "Partner C", aumCr: 2415, families: 26, contactsThisMonth: 58, proactiveRate: 67, aumAtRiskCr: 138, copilotActions: 142 },
  { rank: 4, partner: "Partner D", aumCr: 2208, families: 27, contactsThisMonth: 41, proactiveRate: 48, aumAtRiskCr: 312, copilotActions: 89 },
  { rank: 5, partner: "Partner E", aumCr: 2104, families: 25, contactsThisMonth: 36, proactiveRate: 43, aumAtRiskCr: 384, copilotActions: 71 },
  { rank: 6, partner: "Partner F", aumCr: 1986, families: 24, contactsThisMonth: 31, proactiveRate: 38, aumAtRiskCr: 421, copilotActions: 58 },
  { rank: 7, partner: "Partner G", aumCr: 1847, families: 24, contactsThisMonth: 28, proactiveRate: 33, aumAtRiskCr: 284, copilotActions: 42 },
  { rank: 8, partner: "Partner H", aumCr: 1742, families: 23, contactsThisMonth: 24, proactiveRate: 29, aumAtRiskCr: 468, copilotActions: 31 },
  { rank: 9, partner: "Partner I", aumCr: 1681, families: 22, contactsThisMonth: 19, proactiveRate: 24, aumAtRiskCr: 512, copilotActions: 22 },
  { rank: 10, partner: "Partner J", aumCr: 1594, families: 21, contactsThisMonth: 14, proactiveRate: 18, aumAtRiskCr: 587, copilotActions: 14 },
];
