import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlay } from "@remotion/google-fonts/PlayfairDisplay";
import { Background } from "../components/Background";
import { C } from "../theme";

const inter = loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });
const play = loadPlay("normal", { weights: ["500", "700"], subsets: ["latin"] });
const SANS = inter.fontFamily;
const SERIF = play.fontFamily;

const ClientCard: React.FC<{
  delay: number;
  initials: string;
  name: string;
  aum: string;
  badge: string;
  badgeColor: string;
  insight: string;
  days: number;
}> = ({ delay, initials, name, aum, badge, badgeColor, insight, days }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 110 } });
  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${(1 - enter) * 30}px)`,
        background: `linear-gradient(180deg, ${C.surface}, ${C.navy})`,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "26px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        boxShadow: "0 20px 40px -16px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${C.goldSoft}, ${C.goldDeep})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 22,
              color: C.navy,
            }}
          >
            {initials}
          </div>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 600, color: C.white }}>{name}</div>
            <div style={{ fontFamily: SANS, fontSize: 14, color: C.mute, marginTop: 2 }}>
              AUM <span style={{ color: C.gold, fontWeight: 600 }}>{aum}</span>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            background: `${badgeColor}22`,
            color: badgeColor,
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.4,
            border: `1px solid ${badgeColor}55`,
          }}
        >
          {badge}
        </div>
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 16,
          color: C.ink,
          lineHeight: 1.5,
        }}
      >
        {insight}
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 12,
          color: C.mute,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        Last contact · {days} days ago
      </div>
    </div>
  );
};

export const Scene2Brief: React.FC = () => {
  const frame = useCurrentFrame();
  const headerOp = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(frame, [0, 14], [20, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ padding: "80px 120px" }}>
        <div style={{ opacity: headerOp, transform: `translateY(${headerY}px)` }}>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 14,
              letterSpacing: 4,
              color: C.gold,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            07:42 · Tuesday Morning
          </div>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 76,
              color: C.white,
              fontWeight: 500,
              letterSpacing: -1,
              marginTop: 8,
              lineHeight: 1.05,
            }}
          >
            Your morning brief. <span style={{ color: C.gold, fontStyle: "italic" }}>Three priorities.</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 60,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 28,
          }}
        >
          <ClientCard
            delay={18}
            initials="RS"
            name="Rajesh Singhania"
            aum="₹284 Cr"
            badge="REBALANCE ALERT"
            badgeColor={C.warn}
            insight="Equity drifted to 71% after Nifty rally — above his 65% ceiling."
            days={52}
          />
          <ClientCard
            delay={28}
            initials="PK"
            name="Priya Kapoor"
            aum="₹47 Cr"
            badge="LIFE EVENT"
            badgeColor={C.gold}
            insight="Daughter's wedding in 6 weeks. ₹3.2 Cr liquidity needed by 15 May."
            days={8}
          />
          <ClientCard
            delay={38}
            initials="VM"
            name="Vikram Mehta"
            aum="₹163 Cr"
            badge="ATTRITION RISK"
            badgeColor={C.danger}
            insight="Three logins to competitor portal this week. Engagement score down 18%."
            days={31}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
