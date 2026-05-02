import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  subtitle: string;
  accent?: "default" | "gold" | "risk" | "success" | "warning";
}

const ACCENTS = {
  default: { value: "text-foreground", bar: "bg-border-strong" },
  gold: { value: "text-gold", bar: "bg-gold" },
  risk: { value: "text-destructive", bar: "bg-destructive" },
  success: { value: "text-success", bar: "bg-success" },
  warning: { value: "text-warning", bar: "bg-warning" },
};

export const StatCard = ({ label, value, subtitle, accent = "default" }: StatCardProps) => {
  const a = ACCENTS[accent];
  return (
    <div className="surface-card relative overflow-hidden p-5">
      <span className={`absolute inset-y-0 left-0 w-[3px] ${a.bar}`} />
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className={`mt-3 text-[28px] font-semibold leading-none tabular ${a.value}`}>{value}</p>
      <p className="mt-2 text-[12px] text-muted-foreground">{subtitle}</p>
    </div>
  );
};
