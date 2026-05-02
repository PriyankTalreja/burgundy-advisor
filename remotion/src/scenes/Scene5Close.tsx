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

export const Scene5Close: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineW = interpolate(frame, [4, 22], [0, 120], { extrapolateRight: "clamp" });
  const eb = interpolate(frame, [10, 22], [0, 1], { extrapolateRight: "clamp" });
  const t1 = spring({ frame: frame - 14, fps, config: { damping: 18, stiffness: 110 } });
  const t2 = spring({ frame: frame - 24, fps, config: { damping: 18, stiffness: 110 } });
  const sub = interpolate(frame, [38, 56], [0, 1], { extrapolateRight: "clamp" });
  const mark = spring({ frame: frame - 50, fps, config: { damping: 16, stiffness: 100 } });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 100,
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: eb }}>
          <div style={{ width: lineW, height: 1, background: C.gold }} />
          <div
            style={{
              fontFamily: SANS,
              fontSize: 16,
              letterSpacing: 8,
              color: C.gold,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Burgundy Intelligence
          </div>
          <div style={{ width: lineW, height: 1, background: C.gold }} />
        </div>

        <div
          style={{
            marginTop: 50,
            fontFamily: SERIF,
            fontSize: 132,
            color: C.white,
            fontWeight: 500,
            letterSpacing: -2,
            lineHeight: 1.05,
            transform: `translateY(${(1 - t1) * 40}px)`,
            opacity: t1,
          }}
        >
          Every client.
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 132,
            fontWeight: 500,
            letterSpacing: -2,
            lineHeight: 1.05,
            background: `linear-gradient(135deg, ${C.goldSoft}, ${C.goldDeep})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: `translateY(${(1 - t2) * 40}px)`,
            opacity: t2,
            fontStyle: "italic",
          }}
        >
          Treated like the only one.
        </div>

        <div
          style={{
            marginTop: 56,
            fontFamily: SANS,
            fontSize: 22,
            color: C.mute,
            opacity: sub,
            letterSpacing: 1,
          }}
        >
          Built with Axis Bank · Wealth Management · IT Transformation
        </div>

        {/* axis-style mark */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: mark,
            transform: `scale(${0.9 + mark * 0.1})`,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: C.gold,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 24,
              color: C.white,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            AXIS BANK
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
