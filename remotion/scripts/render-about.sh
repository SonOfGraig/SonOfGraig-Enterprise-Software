#!/usr/bin/env bash
set -eu
REM=./node_modules/.bin/remotion
SRC=src/index.ts
V=../public/video
P=../public/poster

render_pair() {
  local name=$1 base=$2
  $REM render "$SRC" "${name}Light" "$V/$base.mp4"      --codec=h264 --crf=22
  $REM render "$SRC" "${name}Light" "$V/$base.webm"     --codec=vp8  --crf=30
  $REM still  "$SRC" "${name}Light" "$P/$base.jpg"      --frame=160
  $REM render "$SRC" "${name}Dark"  "$V/$base-dark.mp4"  --codec=h264 --crf=22
  $REM render "$SRC" "${name}Dark"  "$V/$base-dark.webm" --codec=vp8  --crf=30
  $REM still  "$SRC" "${name}Dark"  "$P/$base-dark.jpg"  --frame=160
}

# Run in 2 parallel lanes (one per comp) so they don't starve CPU
(
  render_pair ServicesToSaaS services-to-saas
) > /tmp/about-laneA.log 2>&1 &
A=$!
(
  render_pair PlatformCompounding platform-compounding
) > /tmp/about-laneB.log 2>&1 &
B=$!

wait $A $B
echo "DONE"
ls -la "$V"/services-to-saas* "$V"/platform-compounding* "$P"/services-to-saas* "$P"/platform-compounding* 2>&1
