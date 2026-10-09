#!/usr/bin/env bash
set -u
REM=./node_modules/.bin/remotion
SRC=src/index.ts
V=../public/video
P=../public/poster

# Lane A — PricingTier remaining
(
  $REM render "$SRC" PricingTierLight "$V/pricing-tier.webm" --codec=vp8 --crf=30
  $REM still  "$SRC" PricingTierLight "$P/pricing-tier.jpg"  --frame=160
  $REM render "$SRC" PricingTierDark  "$V/pricing-tier-dark.mp4"  --codec=h264 --crf=22
  $REM render "$SRC" PricingTierDark  "$V/pricing-tier-dark.webm" --codec=vp8  --crf=30
  $REM still  "$SRC" PricingTierDark  "$P/pricing-tier-dark.jpg"  --frame=160
) > /tmp/pending-laneA.log 2>&1 &
A=$!

# Lane B — PlatformTimeline all 6
(
  $REM render "$SRC" PlatformTimelineLight "$V/platform-timeline.mp4"  --codec=h264 --crf=22
  $REM render "$SRC" PlatformTimelineLight "$V/platform-timeline.webm" --codec=vp8  --crf=30
  $REM still  "$SRC" PlatformTimelineLight "$P/platform-timeline.jpg"  --frame=160
  $REM render "$SRC" PlatformTimelineDark  "$V/platform-timeline-dark.mp4"  --codec=h264 --crf=22
  $REM render "$SRC" PlatformTimelineDark  "$V/platform-timeline-dark.webm" --codec=vp8  --crf=30
  $REM still  "$SRC" PlatformTimelineDark  "$P/platform-timeline-dark.jpg"  --frame=160
) > /tmp/pending-laneB.log 2>&1 &
B=$!

wait $A $B
echo "DONE"
ls -la "$V"/pricing-tier* "$V"/platform-timeline* 2>&1
ls -la "$P"/pricing-tier* "$P"/platform-timeline* 2>&1
