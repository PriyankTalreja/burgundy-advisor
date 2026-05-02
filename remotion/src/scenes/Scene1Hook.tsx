import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlay } from "@remotion/google-fonts/PlayfairDisplay";
import { Background } from "../components/Background";
import { C } from "../theme";

const inter = loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });
const play = loadPlay("normal", { weights: ["500", "700"], subsets: ["latin"] });

const SANS = inter.fontFamily;
const SERIF = play.fontFamily;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineW = interpolate(frame, [6, 28], [0, 80], { extrapolateRight: "clamp" });
  const eyebrowOp = interpolate(frame, [10, 22], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame: frame - 14, fps, config: { damping: 18, stiffness: 120 } });
  const title2Y = spring({ frame: frame - 26, fps, config: { damping: 18, stiffness: 120 } });
  const subOp = interpolate(frame, [44, 60], [0, 1], { extrapolateRight: "clamp" });

  const pulse = (Math.sin(frame / 8) + 1) / 2;

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ padding: "120px 140px", justifyContent: "center" }}>
        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: eyebrowOp }}>
          <div style={{ width: lineW, height: 2, background: C.gold }} />
          <div
            style={{
              fontFamily: SANS,
              fontSize: 18,
              letterSpacing: 6,
              color: C.gold,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Axis Bank · Burgundy Private
          </div>
          <div style={{ width: 8, height: 8, borderRadius: 8, background: C.gold, opacity: 0.4 + pulse * 0.6 }} />
        </div>

        {/* title */}
        <div
          style={{
            marginTop: 48,
            fontFamily: SERIF,
            fontSize: 168,
            lineHeight: 0.95,
            color: C.white,
            fontWeight: 500,
            letterSpacing: -3,
            transform: `translateY(${(1 - titleY) * 60}px)`,
            opacity: titleY,
          }}
        >
          Intelligence
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 168,
            lineHeight: 0.95,
            fontWeight: 500,
            letterSpacing: -3,
            background: `linear-gradient(135deg, ${C.goldSoft}, ${C.goldDeep})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: `translateY(${(1 - title2Y) * 60}px)`,
            opacity: title2Y,
            fontStyle: "italic",
          }}
        >
          for every conversation.
        </div>

        {/* subtitle */}
        <div
          style={{
            marginTop: 56,
            fontFamily: SANS,
            fontSize: 28,
            color: C.mute,
            opacity: subOp,
            fontWeight: 400,
            letterSpacing: 0.3,
            maxWidth: 900,
          }}
        >
          The AI co-pilot built for Relationship Managers managing India's most discerning wealth.
        </div>
      </AbsoluteFill>

      {/* corner mark */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          fontFamily: SANS,
          fontSize: 14,
          color: C.mute,
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: eyebrowOp,
        }}
      >
        v0.8 · Internal Preview
      </div>
    </AbsoluteFill>
  );
};
