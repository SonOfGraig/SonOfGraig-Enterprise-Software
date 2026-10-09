#!/usr/bin/env bash
# Force MP4s to yuv420p with LIMITED color range (tv, 16-235) — the only
# format every browser plays reliably. Source frames from Remotion come in
# full-range yuvj420p which Safari refuses.
set -eu
FFMPEG="$(cd "$(dirname "$0")/.." && pwd)/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe"
V="$(cd "$(dirname "$0")/../.." && pwd)/public/video"

count=0
fail=0
for f in "$V"/*.mp4; do
  out="${f%.mp4}.tmp.mp4"
  if "$FFMPEG" -hide_banner -loglevel error -y \
      -i "$f" \
      -vf "scale=in_range=full:out_range=tv,format=yuv420p" \
      -c:v libx264 -profile:v main -level 4.0 -pix_fmt yuv420p \
      -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
      -preset veryfast -crf 22 \
      -movflags +faststart \
      "$out"; then
    mv -f "$out" "$f"
    count=$((count + 1))
    echo "[$count] fixed: $(basename "$f")"
  else
    fail=$((fail + 1))
    echo "FAILED: $(basename "$f")"
    rm -f "$out"
  fi
done
echo "DONE — $count fixed, $fail failed"
