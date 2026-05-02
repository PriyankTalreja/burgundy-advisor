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

// Donut showing equity drift
const Donut: React.FC<{ progress: number }> = ({ progress }) => {
  const r = 130;
  const cx = 170;
  const cy = 170;
  const circumference = 2 * Math.PI * r;
  const equityPct = 0.71 * progress;
  const debtPct = 0.18 * progress;
  const altPct = 0.08 * progress;
  return (
    <svg width={340} height={340}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth={28} />
      {/* equity */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={C.gold}
        strokeWidth={28}
        strokeDasharray={`${equityPct * circumference} ${circumference}`}
        strokeDashoffset={circumference / 4}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="butt"
      />
      {/* debt */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={C.success}
        strokeWidth={28}
        strokeDasharray={`${debtPct * circumference} ${circumference}`}
        strokeDashoffset={circumference / 4 - equityPct * circumference}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* alts */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#6B8FD9"
        strokeWidth={28}
        strokeDasharray={`${altPct * circumference} ${circumference}`}
        strokeDashoffset={circumference / 4 - (equityPct + debtPct) * circumference}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fontFamily={SERIF}
        fontWeight={700}
        fontSize={56}
        fill={C.gold}
      >
        71%
      </text>
      <text
        x={cx}
        y={cy + 28}
        textAnchor="middle"
        fontFamily={SANS}
        fontSize={14}
        fill={C.mute}
        letterSpacing={2}
      >
        EQUITY
      </text>
    </svg>
  );
};

const ChatBubble: React.FC<{
  delay: number;
  side: "user" | "ai";
  text: React.ReactNode;
}> = ({ delay, side, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 130 } });
  const isUser = side === "user";
  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${(1 - enter) * 20}px)`,
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "82%",
        background: isUser ? C.surfaceHi : `${C.gold}14`,
        border: `1px solid ${isUser ? C.border : C.gold + "55"}`,
        borderRadius: 14,
        padding: "16px 20px",
        fontFamily: SANS,
        fontSize: 17,
        color: isUser ? C.ink : C.white,
        lineHeight: 1.5,
      }}
    >
      {!isUser && (
        <div style={{ fontSize: 11, letterSpacing: 2, color: C.gold, marginBottom: 6, fontWeight: 600 }}>
          CO-PILOT
        </div>
      )}
      {text}
    </div>
  );
};

export const Scene3Client: React.FC = () => {
  const frame = useCurrentFrame();
  const headerOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const donutProgress = interpolate(frame, [10, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ padding: "80px 120px" }}>
        {/* Header */}
        <div style={{ opacity: headerOp, display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${C.goldSoft}, ${C.goldDeep})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 30,
              color: C.navy,
            }}
          >
            RS
          </div>
          <div>
            <div style={{ fontFamily: SERIF, fontSize: 56, color: C.white, fontWeight: 500, lineHeight: 1 }}>
              Rajesh Singhania
            </div>
            <div style={{ fontFamily: SANS, fontSize: 16, color: C.mute, marginTop: 6, letterSpacing: 0.5 }}>
              Burgundy Private · Tier 1 · Client since 2017 · AUM <span style={{ color: C.gold, fontWeight: 600 }}>₹284 Cr</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "380px 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 13, letterSpacing: 3, color: C.mute, marginBottom: 18, textTransform: "uppercase" }}>
              Allocation Drift
            </div>
            <Donut progress={donutProgress} />
            <div style={{ marginTop: 14, fontFamily: SANS, fontSize: 14, color: C.danger, fontWeight: 500 }}>
              ▲ 6 pts above 65% ceiling
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 24 }}>
            <ChatBubble
              delay={20}
              side="user"
              text="What should I discuss with Rajesh tomorrow?"
            />
            <ChatBubble
              delay={42}
              side="ai"
              text={
                <>
                  Lead with rebalancing. Equity is at <b style={{ color: C.gold }}>71%</b> — 6 pts above his ceiling.
                  Suggest moving <b style={{ color: C.gold }}>₹17 Cr</b> from large-cap into AAA debt and
                  Burgundy Private Credit Fund III. Aligns with son's MBA milestone in June.
                </>
              }
            />
            <ChatBubble
              delay={70}
              side="ai"
              text={
                <>
                  Talking points drafted. Estimated meeting prep saved: <b style={{ color: C.gold }}>42 minutes</b>.
                </>
              }
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
