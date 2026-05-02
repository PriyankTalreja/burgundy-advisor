import { BADGE_STYLES, type ActionBadge } from "@/data/burgundy";

export const Badge = ({ kind }: { kind: ActionBadge }) => {
  const s = BADGE_STYLES[kind];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {kind}
    </span>
  );
};
