import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, springTiming, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Brief } from "./scenes/Scene2Brief";
import { Scene3Client } from "./scenes/Scene3Client";
import { Scene4Impact } from "./scenes/Scene4Impact";
import { Scene5Close } from "./scenes/Scene5Close";

// 30 seconds @ 30fps = 900 frames.
// Five scenes; transitions overlap (~18 frames each, 4 transitions = 72 overlap)
// So scene durations sum to 900 + 72 = 972
// Distribute: 180 + 210 + 230 + 200 + 152
const S1 = 180;
const S2 = 210;
const S3 = 230;
const S4 = 200;
const S5 = 152;
const T = 18;

export const TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 - T * 4; // 900

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={S1}>
          <Scene1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={S2}>
          <Scene2Brief />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={S3}>
          <Scene3Client />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={S4}>
          <Scene4Impact />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={S5}>
          <Scene5Close />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
