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

const Stat: React.FC<{
  delay: number;
  value: string;
  unit?: string;
  label: string;
  detail: string;
  big?: boolean;
}> = ({ delay, value, unit, label, detail, big }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 110 } });
  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${(1 - enter) * 30}px) scale(${0.95 + enter * 0.05})`,
        background: `linear-gradient(180deg, ${C.surface}, ${C.navy})`,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: big ? "44px 44px" : "32px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: big ? `0 0 0 1px ${C.gold}33, 0 30px 60px -20px rgba(0,0,0,0.7)` : "0 20px 40px -16px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 3, color: C.mute, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: big ? 132 : 88,
            lineHeight: 1,
            background: `linear-gradient(135deg, ${C.goldSoft}, ${C.goldDeep})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -2,
          }}
        >
          {value}
        </div>
        {unit && (
          <div style={{ fontFamily: SANS, fontSize: big ? 32 : 22, color: C.gold, fontWeight: 500 }}>
            {unit}
          </div>
        )}
      </div>
      <div style={{ fontFamily: SANS, fontSize: 16, color: C.ink, lineHeight: 1.4 }}>{detail}</div>
    </div>
  );
};

export const Scene4Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const headOp = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 14], [20, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ padding: "90px 120px", justifyContent: "center" }}>
        <div style={{ opacity: headOp, transform: `translateY(${headY}px)`, marginBottom: 50 }}>
          <div style={{ fontFamily: SANS, fontSize: 14, letterSpacing: 4, color: C.gold, textTransform: "uppercase", fontWeight: 600 }}>
            Pilot results · 142 RMs · 90 days
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 84, color: C.white, fontWeight: 500, letterSpacing: -1, marginTop: 10 }}>
            The impact, <span style={{ color: C.gold, fontStyle: "italic" }}>quantified.</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 28 }}>
          <Stat
            delay={18}
            value="₹8,400"
            unit="Cr"
            label="AUM Protected from Attrition"
            detail="Across 38 at-risk relationships flagged proactively."
            big
          />
          <Stat
            delay={32}
            value="3.2x"
            label="More Proactive Conversations"
            detail="Per RM, per week, vs. baseline."
          />
          <Stat
            delay={46}
            value="42"
            unit="min"
            label="Meeting Prep Saved"
            detail="Per client interaction, on average."
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, marginTop: 28 }}>
          <Stat delay={58} value="+18%" label="Cross-Sell Conversion" detail="On co-pilot recommended actions." />
          <Stat delay={66} value="94%" label="RM Adoption" detail="Daily active usage in pilot cohort." />
          <Stat delay={74} value="<200ms" label="Insight Latency" detail="From query to AI-grounded answer." />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
