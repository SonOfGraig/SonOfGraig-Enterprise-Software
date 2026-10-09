#!/usr/bin/env bash
# Render every composition × every theme × (mp4 + webm + poster).
# Lanes run in parallel; within a lane commands run sequentially so we don't oversubscribe the CPU.
set -u

REM=./node_modules/.bin/remotion
SRC=src/index.ts
V=../public/video
P=../public/poster

# Build per-comp render block for one theme. $1=CompId, $2=output basename, $3=variant suffix
render_one() {
  local comp_id=$1 base=$2 suffix=$3
  echo ">>> $comp_id → $base$suffix"
  $REM render "$SRC" "$comp_id" "$V/$base$suffix.mp4"  --codec=h264 --crf=22
  $REM render "$SRC" "$comp_id" "$V/$base$suffix.webm" --codec=vp8  --crf=30
  $REM still  "$SRC" "$comp_id" "$P/$base$suffix.jpg"  --frame=160
}

render_pair() {
  local name=$1 base=$2
  render_one "${name}Light" "$base" ""
  render_one "${name}Dark"  "$base" "-dark"
}

# Lane 1
(
  render_pair RagStudio       rag-studio
  render_pair GovernanceHub   governance-hub
  render_pair ClusterFunnel   cluster-funnel
) > /tmp/lane1.log 2>&1 &
L1=$!

# Lane 2
(
  render_pair CloudConsole    cloud-console
  render_pair DataPipeline    data-pipeline
  render_pair AnalyticsStudio analytics-studio
) > /tmp/lane2.log 2>&1 &
L2=$!

# Lane 3
(
  render_pair WorkflowEngine  workflow-engine
  render_pair SecurityPosture security-posture
) > /tmp/lane3.log 2>&1 &
L3=$!

# Lane 4
(
  render_pair PricingTier      pricing-tier
  render_pair PlatformTimeline platform-timeline
) > /tmp/lane4.log 2>&1 &
L4=$!

wait $L1 $L2 $L3 $L4
echo "ALL LANES COMPLETE"
ls -la "$V" "$P"
