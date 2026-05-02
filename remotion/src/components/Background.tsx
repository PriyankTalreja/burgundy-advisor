import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../theme";

export const Background: React.FC<{ accent?: boolean }> = ({ accent = true }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 40;
  const drift2 = Math.cos(frame / 110) * 30;
  return (
    <AbsoluteFill style={{ background: C.navy, overflow: "hidden" }}>
      {/* radial vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${50 + drift / 4}% ${30 + drift2 / 6}%, ${C.surfaceHi} 0%, ${C.navy} 55%, ${C.navyDeep} 100%)`,
        }}
      />
      {/* fine grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.08,
          transform: `translate(${drift}px, ${drift2}px)`,
        }}
      />
      {accent && (
        <>
          <div
            style={{
              position: "absolute",
              width: 900,
              height: 900,
              borderRadius: "50%",
              top: -300 + drift,
              right: -300 + drift2,
              background: `radial-gradient(circle, ${C.gold}33 0%, transparent 65%)`,
              filter: "blur(20px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 700,
              height: 700,
              borderRadius: "50%",
              bottom: -250 - drift2,
              left: -200 - drift,
              background: `radial-gradient(circle, ${C.gold}22 0%, transparent 60%)`,
              filter: "blur(24px)",
            }}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
