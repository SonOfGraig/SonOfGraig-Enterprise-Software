"""One-shot porter: SonOfGraig HTML mocks → Next.js (public) pages.

For each (source_html, target_dir) pair:
  - Extract the <style> block, scope :root + [data-theme=*] declarations to a
    page-specific class so tokens do not leak into PublicShell.
  - Strip global resets (* / html / body) that would clobber the existing site.
  - Extract the <main> body and save as a .html partial (so the .tsx file stays
    readable and we can dangerouslySetInnerHTML it at render time).
  - Write the partial and the scoped CSS into the target directory.

The .tsx page itself is hand-written per page so we can re-implement the small
amount of JS interactivity (toggles, FAQ accordions, billing switch) in React.
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

DOWNLOADS = Path(r"C:\Users\Swiss MusiqZA\Downloads")
APP = Path(r"C:\Users\Swiss MusiqZA\Projects\SonOfGraig-Enterprise-Software\app\(public)")

PAGES = [
    {"src": DOWNLOADS / "sonofgraig-popia (1).html", "dir": APP / "popia", "scope": "lp-popia"},
    {"src": DOWNLOADS / "sonofgraig-pricing.html", "dir": APP / "pricing", "scope": "lp-pricing"},
    {"src": DOWNLOADS / "sonofgraig-platform.html", "dir": APP / "platform", "scope": "lp-platform"},
    # Round 2 — existing routes being replaced
    {"src": DOWNLOADS / "sonofgraig-about (1).html", "dir": APP / "about", "scope": "lp-about"},
    {"src": DOWNLOADS / "sonofgraig-contact.html", "dir": APP / "contact", "scope": "lp-contact"},
    {"src": DOWNLOADS / "sonofgraig-early-access.html", "dir": APP / "early-access", "scope": "lp-early-access"},
    {"src": DOWNLOADS / "sonofgraig-changelog.html", "dir": APP / "changelog", "scope": "lp-changelog"},
    {"src": DOWNLOADS / "sonofgraig-security.html", "dir": APP / "security", "scope": "lp-security"},
    # Round 2 — new service detail pages under /services/<slug>
    {"src": DOWNLOADS / "sonofgraig-ai-agent-implementation.html",
     "dir": APP / "services" / "ai-agent-implementation",
     "scope": "lp-svc-ai-agent"},
    {"src": DOWNLOADS / "sonofgraig-rag-knowledge-base-setup.html",
     "dir": APP / "services" / "rag-knowledge-base-setup",
     "scope": "lp-svc-rag"},
    {"src": DOWNLOADS / "sonofgraig-cloud-architecture.html",
     "dir": APP / "services" / "cloud-architecture",
     "scope": "lp-svc-cloud"},
    {"src": DOWNLOADS / "sonofgraig-ai-governance-audit.html",
     "dir": APP / "services" / "ai-governance-audit",
     "scope": "lp-svc-governance"},
    # Round 3 — new product cluster pages under /platform/<cluster>
    {"src": DOWNLOADS / "sonofgraig-ai-dev-platform (1).html",
     "dir": APP / "platform" / "ai-dev-platform",
     "scope": "lp-cluster-ai-dev"},
    {"src": DOWNLOADS / "sonofgraig-cloud-devops.html",
     "dir": APP / "platform" / "cloud-devops",
     "scope": "lp-cluster-cloud"},
    {"src": DOWNLOADS / "sonofgraig-data-analytics.html",
     "dir": APP / "platform" / "data-analytics",
     "scope": "lp-cluster-data"},
    {"src": DOWNLOADS / "sonofgraig-creative-xr.html",
     "dir": APP / "platform" / "creative-xr",
     "scope": "lp-cluster-creative"},
]


def extract_style(html: str) -> str:
    m = re.search(r"<style[^>]*>(.*?)</style>", html, flags=re.DOTALL)
    if not m:
        raise ValueError("no <style> block")
    return m.group(1)


def extract_main(html: str) -> str:
    m = re.search(r"<main[^>]*>(.*?)</main>", html, flags=re.DOTALL)
    if not m:
        raise ValueError("no <main> block")
    return m.group(1).strip()


def scope_css(css: str, scope: str) -> str:
    """Scope :root and theme rules to .scope; strip/scope global resets."""
    # Strip the global resets that would clobber PublicShell's base styles.
    css = re.sub(r"\*\s*,\s*\*::before\s*,\s*\*::after\s*\{[^}]*\}\s*", "", css)
    css = re.sub(r"(?ms)^html\s*\{[^}]*\}\s*", "", css)
    css = re.sub(r"(?ms)^body\s*\{[^}]*\}\s*", "", css)

    # Scope bare element + pseudo resets to the page wrapper. These are NOT
    # auto-scoped by the :root rewrite below — left global, they leak into the
    # app shell. Crucially, Tailwind v4 emits utilities inside `@layer`, and an
    # *unlayered* bare rule like `a{color:inherit}` beats a layered utility like
    # `.text-white` regardless of specificity — which silently hid the navbar's
    # primary-button label (an <a> rendered via asChild/Slot) app-wide.
    # Scoping to `.{scope}-root` keeps the reset working inside the ported page
    # while leaving PublicShell untouched.
    css = re.sub(r"(?m)^a\s*\{", f".{scope}-root a{{", css)
    css = re.sub(r"(?m)^button\s*\{", f".{scope}-root button{{", css)
    css = re.sub(
        r"(?m)^img\s*,\s*svg\s*\{",
        f".{scope}-root img,.{scope}-root svg{{",
        css,
    )

    # Scope top-level pseudo-element rules (::selection, ::-webkit-scrollbar*).
    # Left global, they restyle the whole app's selection highlight and
    # scrollbars with the legacy page's theme colours instead of the design
    # system's. Scoping confines them to the ported page wrapper.
    css = re.sub(
        r"(?m)^(::[-a-z]+(?::[-a-z]+)?)\s*\{",
        rf".{scope}-root \1{{",
        css,
    )

    # Scope token roots so they apply to the page wrapper but stay theme-reactive.
    css = re.sub(
        r":root\s*\{",
        f".{scope}-root {{",
        css,
        count=1,
    )
    css = re.sub(
        r'\[data-theme="dark"\]\s*\{',
        f'[data-theme="dark"] .{scope}-root {{',
        css,
    )
    css = re.sub(
        r'\[data-theme="light"\]\s*\{',
        f'[data-theme="light"] .{scope}-root {{',
        css,
    )

    return f"/* AUTO-GENERATED — see .claude/port-html-pages.py */\n{css.strip()}\n"


def react_safe_html(html: str) -> str:
    """Make the inline HTML JSX-friendly when rendered via dangerouslySetInnerHTML.

    We are NOT converting to JSX — the markup is rendered as raw HTML via
    dangerouslySetInnerHTML, so React attribute names (className, htmlFor) are
    NOT required. We only have to remove server-managed pieces:
      - inline onclick="..." handlers (re-wired by useEffect)
      - <a class="skip"> (the skip link is provided by PublicShell anyway, but
        leaving it is harmless visually since it is hidden until focused)
      - inline <script> blocks (no <script> inside <main> in our sources)
    Everything else (data-*, role, aria-*) is fine in raw HTML.
    """
    # Strip ALL inline event handlers (onclick, onsubmit, oninput, onload, ...) —
    # they reference vanilla-JS functions that no longer exist; we re-attach
    # behaviour in React via event delegation in LegacyShell.
    html = re.sub(r'\s+on[a-z]+\s*=\s*"[^"]*"', "", html)
    return html


def main() -> int:
    for page in PAGES:
        src: Path = page["src"]
        out_dir: Path = page["dir"]
        scope: str = page["scope"]
        if not src.exists():
            print(f"skip {src}: missing", file=sys.stderr)
            continue
        out_dir.mkdir(parents=True, exist_ok=True)
        html = src.read_text(encoding="utf-8")
        css = scope_css(extract_style(html), scope)
        body = react_safe_html(extract_main(html))
        (out_dir / "_legacy.css").write_text(css, encoding="utf-8")
        (out_dir / "_legacy.html").write_text(body, encoding="utf-8")
        print(f"wrote {out_dir / '_legacy.css'} ({len(css)} bytes)")
        print(f"wrote {out_dir / '_legacy.html'} ({len(body)} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
