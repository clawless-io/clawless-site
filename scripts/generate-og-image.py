#!/usr/bin/env python3
"""
Open Graph image generator for clawless.ai.

Renders the 1200x630 social preview card surfaced on LinkedIn, Twitter,
Facebook, Slack, etc. when a clawless.ai URL is shared. Output is written
to app/opengraph-image.png, which Next.js 13+ auto-wires as the og:image
+ twitter:image meta tag via the filesystem icon convention.

Family pattern (cross-product, established by whisprdesk-developer at
whisprdesk-website commit 648056d): white background, centered three-
line hierarchy (title -> primary tagline -> sub-tagline), supersampled
2x render with LANCZOS downsample to survive LinkedIn's feed-side
recompression. Slate-800 + slate-600 on the two text lines is family
DNA; only the title color and (optionally) title font vary per product.

This script is macOS-only (depends on system SF Pro fonts). Run locally,
commit the output PNG. Do NOT wire into CI; the PNG only changes when
copy or color changes, which is rare.

Run:
  python3 scripts/generate-og-image.py

Output:
  app/opengraph-image.png  (1200x630, PNG-optimize, ~80-150KB)
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT_PATH = REPO_ROOT / "app" / "opengraph-image.png"

WIDTH, HEIGHT = 1200, 630
SCALE = 2
RENDER_W, RENDER_H = WIDTH * SCALE, HEIGHT * SCALE

# Background: pure white (family DNA, shared with whisprdesk, rbjglobal,
# clawdemy OG cards). White holds the strongest contrast against LinkedIn's
# slate-tinted card chrome and survives downsample compression cleanly.
BG = (255, 255, 255)

# Title color: deeper cyan from the Clawless lk-gradient family. Pure
# cyan #00D4FF and pure green #22FFAA from the in-site lockup are both
# too light to read on white. Cyan-700 (#0E7490) is the deepest stop in
# the brand cyan family that still reads as "Clawless cyan."
TITLE_COLOR = (14, 116, 144)  # #0E7490

# Family DNA text colors. Do not vary per product.
TAGLINE_COLOR = (31, 41, 55)   # slate-800 #1f2937
DETAIL_COLOR = (71, 85, 105)   # slate-600 #475569

# Fonts. SF Pro Rounded for the wordmark gives a friendlier feel than
# stock SF Pro Display; matches whisprdesk's family treatment.
SF_REGULAR = "/System/Library/Fonts/SFNS.ttf"
SF_ROUNDED = "/System/Library/Fonts/SFNSRounded.ttf"


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def center_x(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> int:
    bbox = draw.textbbox((0, 0), text, font=font)
    return (RENDER_W - (bbox[2] - bbox[0])) // 2


def main() -> None:
    img = Image.new("RGB", (RENDER_W, RENDER_H), BG)
    draw = ImageDraw.Draw(img)

    # Clawless title is 16 chars ("Clawless Computer"), so the family-default
    # 168px would overflow the 1200-wide canvas. Reducing to 130px keeps the
    # two-word product name on a single line with visible left/right margin.
    title_font = load_font(SF_ROUNDED, 130 * SCALE)
    tagline_font = load_font(SF_REGULAR, 68 * SCALE)
    detail_font = load_font(SF_REGULAR, 46 * SCALE)

    # Copy. Title = product name. Primary tagline = what it does.
    # Sub-tagline = positioning statement. Keep each line short enough
    # that it survives LinkedIn's 1.91:1 crop (~8% bottom can clip on
    # narrow feed cards without losing the primary tagline).
    title = "Clawless Computer"
    tagline = "An operating system for AI."
    detail = "Built on OpenClaw. Bring your own keys."

    # Title is shorter at 130px so it sits a bit lower for visual centering.
    title_y = 180 * SCALE
    tagline_y = 360 * SCALE
    detail_y = 480 * SCALE

    draw.text((center_x(draw, title, title_font), title_y), title, fill=TITLE_COLOR, font=title_font)
    draw.text((center_x(draw, tagline, tagline_font), tagline_y), tagline, fill=TAGLINE_COLOR, font=tagline_font)
    draw.text((center_x(draw, detail, detail_font), detail_y), detail, fill=DETAIL_COLOR, font=detail_font)

    final = img.resize((WIDTH, HEIGHT), Image.LANCZOS)
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    final.save(OUT_PATH, "PNG", optimize=True)
    print(f"Wrote {OUT_PATH} ({WIDTH}x{HEIGHT}, supersampled {SCALE}x)")


if __name__ == "__main__":
    main()
