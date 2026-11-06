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
GEORGIA_BOLD = "/Library/Fonts/Supplemental/Georgia Bold.ttf"


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def center_x(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> int:
    bbox = draw.textbbox((0, 0), text, font=font)
    return (RENDER_W - (bbox[2] - bbox[0])) // 2


def main() -> None:
    img = Image.new("RGB", (RENDER_W, RENDER_H), BG)
    draw = ImageDraw.Draw(img)

    # Georgia Bold at the family 168px where it fits (RBJ Global's wordmark
    # size; founder feedback 2026-05-16: siblings should resemble the parent).
    # The full product name "Clawless Computer" is too wide for 168px on a
    # 1200-wide canvas, so the title steps down until it fits inside the side
    # margins. Taglines keep the family sizes.
    tagline_font = load_font(SF_REGULAR, 68 * SCALE)
    detail_font = load_font(SF_REGULAR, 46 * SCALE)

    # Copy (open-source relaunch, pre-launch mode 2026-11-06). Title = product
    # name. Primary tagline = what it is. Sub-tagline = status. No date.
    title = "Clawless Computer"
    tagline = "Open source AI agents on your Mac"
    detail = "Coming soon. Free under AGPL-3.0."

    max_title_w = (WIDTH - 2 * 60) * SCALE
    title_size = 168
    title_font = load_font(GEORGIA_BOLD, title_size * SCALE)
    while draw.textbbox((0, 0), title, font=title_font)[2] > max_title_w and title_size > 60:
        title_size -= 2
        title_font = load_font(GEORGIA_BOLD, title_size * SCALE)

    title_y = (280 - int(title_size * 1.25)) * SCALE
    tagline_y = 310 * SCALE
    detail_y = 430 * SCALE

    draw.text((center_x(draw, title, title_font), title_y), title, fill=TITLE_COLOR, font=title_font)
    draw.text((center_x(draw, tagline, tagline_font), tagline_y), tagline, fill=TAGLINE_COLOR, font=tagline_font)
    draw.text((center_x(draw, detail, detail_font), detail_y), detail, fill=DETAIL_COLOR, font=detail_font)

    final = img.resize((WIDTH, HEIGHT), Image.LANCZOS)
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    final.save(OUT_PATH, "PNG", optimize=True)
    print(f"Wrote {OUT_PATH} ({WIDTH}x{HEIGHT}, supersampled {SCALE}x)")


if __name__ == "__main__":
    main()
