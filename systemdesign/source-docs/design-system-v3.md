SONOFGRAIG
Enterprise Design System
v3.0  —  Complete Visual Language & Component Reference
Version 3.0     |    April 2026     |    Light + Dark Mode     |    Enterprise Grade     |    Internal — Confidential
What This Document Covers
This document is the authoritative reference for all visual decisions made in the SonOfGraig Enterprise Design System v3.0. It replaces v2.0 and supersedes all previous brand guidelines produced during the SonOfGraig Digital Solutions era.
Sections covered in this document:
1. Brand Philosophy & Transition Rationale
2. Colour System — Light & Dark Mode Token Architecture
3. Typography Scale — Display, UI, and Monospace
4. Spacing System — 8pt Grid
5. Gradient System — Functional, Not Decorative
6. Icon Language — SVG Sprite System
7. Button System — All Variants & States
8. Form Controls — Inputs, Selects, Toggles
9. Card Components — Solid, Glass, Metric
10. Data Table — The Core Enterprise Component
11. Navigation — Product Sidebar Pattern
12. Feedback — Callouts, Toasts, Badges
13. States — Skeleton Loaders, Empty States, Progress
14. Platform Architecture — 5 Product Clusters
15. CSS Token Reference — Full Implementation Guide
16. Governance — How to Use This System


1. Brand Philosophy & Transition Rationale
Foundations
SonOfGraig began as a professional services agency — 18 service lines sold as bespoke project work. Version 3.0 of this design system reflects the completion of that agency's transition into an enterprise software company. The visual language has been rebuilt from first principles to support product surfaces, not service brochures.
The core design philosophy is precision over personality. Every token has a named job. Every component answers a specific product need. The system is designed to hold its own in a procurement slide deck next to Stripe, Linear, and Vercel — because those are the comparables our enterprise buyers will use.

1.1  The v1.0 to v3.0 Change Summary
v1.0 / v2.0 — What Was Wrong
Dual primaries: blue and amber had equal brand weight — two brands, not one
Emoji icons used across all product clusters — OS-inconsistent, visually unprofessional
DM Sans — too common in mid-market SaaS, no display character
Dark-only palette with no light mode tokens
No data table component defined
No sidebar navigation pattern
No skeleton loaders or empty states
No dropdown menu component
v3.0 — What Is Fixed
Single primary (blue). Amber is accent-only: upgrade prompts, pricing, premium badges
24 Lucide-compatible SVG icons in a sprite system — consistent, controlled, scalable
Sora (display) + Inter (UI) + JetBrains Mono (code) — purposeful font stack
Full light and dark token sets on :root and [data-theme=dark]
Data table with header, search, row actions, and pagination
Product sidebar nav with active states, grouping, notification badges
Skeleton loaders and empty state patterns defined for all clusters
Dropdown menu and avatar patterns standardised

Enterprise grade bar — what this system must hold its own against
Reference companies for every design decision in v3.0: Linear (dark-first precision), Stripe (enterprise trust through restraint), Vercel (typographic discipline), Anthropic (sophisticated minimalism). If a component would look out of place next to those products in a side-by-side comparison, it does not ship.


2. Colour System
Foundations — Token Architecture
The colour system uses a named token architecture. Every value has a role. There are no general-purpose colours. All tokens are defined in two sets — light mode and dark mode — and switch automatically when data-theme changes on the root HTML element.
Critical rule: blue (#0B9EDE light / #0EA5E9 dark) is the sole brand primary. Amber (#F97316) is an accent used exclusively for premium tier labels, pricing CTAs, and upgrade prompts. No other usage of amber is permitted.

2.1  Brand Primary — Blue

Token
Value
Usage

--sg-blue (light)
#0B9EDE
All primary CTAs, links, focus rings, active states, key data indicators

--sg-blue-dim (light)
#0882B8
Hover state for all blue interactive elements

--sg-blue-deep (light)
#065A82
Avatar gradient base, deep card accents, gradient dark end

--sg-blue (dark)
#0EA5E9
Same role as light — primary, all action states

--sg-blue-dim (dark)
#38BDF8
Hover state in dark mode — lighter than primary

--sg-blue-deep (dark)
#0C4A6E
Dark mode deep accent for gradients and fills

2.2  Accent — Amber (Premium & Pricing Only)
Usage restriction — amber is not a second primary
Amber (#F97316) appears only in: upgrade CTAs, pricing card accents, Enterprise tier badges, the brand-span gradient top border, and conversion-moment highlights. It must never appear in navigation active states, standard CTAs, focus rings, or link colours. Violation of this rule creates dual-primary brand ambiguity — the exact problem v1.0 was built with.


Token
Value
Usage

--sg-amber
#F97316
Premium tier labels, pricing CTAs, upgrade prompts, brand-span gradient

--sg-amber-dim (light)
#EA580C
Hover state for amber elements in light mode

--sg-amber-dim (dark)
#FB923C
Hover state for amber elements in dark mode

2.3  Surface Hierarchy
The surface system uses four levels in both modes. Each level has a specific elevation role. Surfaces must not be used interchangeably — the hierarchy communicates depth and containment.

Dark Mode Surfaces

Token
Value
Usage

--sg-ink
#070810
Code blocks, deepest chrome, IDE backgrounds

--sg-bg
#0A0C10
Page background — the base layer

--sg-surface
#0E1117
Cards, panels, sidebar body

--sg-surface-2
#161B25
Elevated cards, dropdowns, tooltips

--sg-surface-3
#1E2535
Modals, popovers, hover fill states

Light Mode Surfaces

Token
Value
Usage

--sg-bg
#FFFFFF
Page background — base layer

--sg-surface
#F8F9FB
Cards, inputs, sidebar sections

--sg-surface-2
#F1F3F7
Table headers, button hover fills

--sg-surface-3
#E8ECF2
Selected rows, active fills, dense UI

2.4  Text Scale
Token
Light value
Dark value
Usage
--sg-text-1
#0D1117
#F0F4F8
Primary headings, emphasis, labels
--sg-text-2
#374151
rgba(255,255,255,0.75)
Body copy, descriptions, table cells
--sg-text-3
#6B7280
rgba(255,255,255,0.45)
Secondary metadata, hints, captions
--sg-text-4
#9CA3AF
rgba(255,255,255,0.25)
Placeholders, disabled, overlines
--sg-text-inv
#FFFFFF
#0D1117
Text on coloured fills (blue/amber buttons)

2.5  Semantic Signal Colours
Semantic colours communicate system state. They must not be used decoratively.


Token
Value
Usage

--sg-success (light)
#16A34A
Confirmations, live status, positive trends, successful deployments

--sg-success (dark)
#22C55E
Same role in dark mode — lighter for contrast

--sg-warn (light)
#B45309
Approaching limits, degraded states, attention needed

--sg-warn (dark)
#EAB308
Warning state in dark mode

--sg-danger (light)
#DC2626
Errors, failures, destructive actions, governance violations

--sg-danger (dark)
#EF4444
Danger in dark mode — maintain WCAG AA on dark surfaces


3. Typography Scale
Foundations — Type System
Three fonts. Each has a distinct job. They must not be swapped.

Font
Role
Weights used
Rationale
Sora
Display / Headings
300, 600, 700
Distinctive character without being decorative. Makes hero text memorable. Used only for H1, H2, H3, and the wordmark.
Inter
All UI text
400, 500, 600
Maximum legibility at 12–16px. Neutral enough to disappear — which is exactly what UI text should do.
JetBrains Mono
Code / tokens
400, 500
Purpose-built for technical content. Ligatures off for design system token display.

3.1  Type Scale
Level
Font
Size
Weight
Tracking
Usage
Display
Sora
52px / 39pt
700
-3.5%
Hero headers on marketing pages, conference slides
H1
Sora
36px / 27pt
600
-2.5%
Page titles, section headers in product
H2
Sora
26px / 20pt
600
-2.0%
Section titles, cluster names, feature headers
H3
Inter
18px / 14pt
600
-1.0%
Component group headers, sidebar section labels
Body LG
Inter
16px / 12pt
400
0%
Marketing copy, onboarding descriptions
Body
Inter
14px / 11pt
400
0%
All product UI body copy — default size
Caption
Inter
12px / 9pt
400
0%
Metadata, table captions, timestamps
Label
Inter
11px / 8pt
600
+8%
Eyebrows, overlines, category labels (ALL CAPS)
Code
JetBrains Mono
13px / 10pt
400
0%
Token values, code snippets, API keys, version strings

3.2  Typography Rules
Display and H1 use Sora exclusively. Mixing Inter into hero-level headings flattens the typographic hierarchy.
Line height: 1.1 for display, 1.2 for H1/H2, 1.5 for H3, 1.65 for body, 1.7 for body large.
Negative letter-spacing on large headings is mandatory. At 36px+, default tracking makes text feel loose and amateur.
Label / overline text is always uppercase with +8% tracking. Never apply uppercase to body or heading text.
Never mix bold weights heavier than 700 with Sora — the face has no 800 or 900 for text use.
Colour: headings use --sg-text-1. Body uses --sg-text-2. Secondary and metadata use --sg-text-3.


4. Spacing System
Foundations — 8pt Grid
All spacing is derived from a 4px base unit on an 8pt grid. Every component must use only these values for margin, padding, and gap. No ad-hoc spacing.

Token
Value
Common uses
--sp-1
4px
Icon gap, badge padding, micro-spacing
--sp-2
8px
Inline element gaps, tight list spacing
--sp-3
12px
List item padding, form field gaps
--sp-4
16px
Standard component internal padding
--sp-5
20px
Card padding (compact), section sub-gaps
--sp-6
24px
Card padding (default), form group spacing
--sp-8
32px
Component group separation, section internal
--sp-10
40px
Section-to-section spacing in dense views
--sp-12
48px
Page section padding (compact pages)
--sp-16
64px
Section spacing on standard pages
--sp-20
80px
Hero section padding, major page breaks


5. Gradient System
Foundations — Functional Gradients
Six named gradients, each with a specific purpose. The system contains no decorative gradients. If a gradient does not have a job, it does not exist.

Name
Definition
Usage
Brand Primary
135deg · #0B9EDE → #38BDF8
Hero section headers, primary card accents, marketing moments
Premium Accent
135deg · #F97316 → #FBBF24
Pricing cards, upgrade CTAs, Enterprise tier callouts
Brand Span
90deg · #0B9EDE → #F97316
Metric card top border accent, loading bars, progress fills
Surface Depth
135deg · #070810 → #161B25
Dark card backgrounds, elevated panel fills
Blue Glow
radial · rgba(11,158,222,0.18) → transparent
Active component background, focus zone highlight
Surface Fade
180deg · --sg-surface → --sg-bg
Content scroll fade, list boundary fade


6. Icon Language
Foundations — SVG Sprite System
All icons are Lucide-compatible SVG symbols defined in an inline sprite. No emoji. No icon fonts. No raster images. Every icon uses the same viewBox (0 0 24 24), 1.5px stroke, round line caps, and currentColor — so they inherit colour from their parent element automatically.

Why emoji icons are a hard disqualifier at enterprise level
Emoji render differently across every OS, browser, and email client. An agent status icon that appears as a blue robot on macOS renders as a flat yellow cartoon on Windows and disappears entirely in some enterprise email systems. One inconsistent icon in a procurement demo can end a deal. SVG icons are consistent across every surface.

6.1  Icon Size Specifications
Context
Size
Stroke
Examples
Inline with text
16 × 16px
1.5px
Button leading icon, inline status, table row action
Standalone UI
20 × 20px
1.5px
Nav item icon, empty state indicator, card eyebrow
Feature / cluster
24 × 24px
1.5px
Cluster card identity, onboarding step, modal header
Large illustration
48 × 48px
1.5px
Empty state centrepiece, feature marketing tile

6.2  Icon Library — Core Set
The following 24 icons form the core set. All others must be sourced from Lucide (lucide.dev) to ensure stroke consistency. Never mix icon libraries across the same product.

Icon ID
Name
Primary usage
icon-cpu
CPU / AI
AI Dev Platform cluster, Agent Builder nav item
icon-cloud
Cloud
Cloud & DevOps cluster, infrastructure context
icon-chart
Bar Chart
Data & Analytics cluster, metrics, dashboard
icon-shield
Shield
Security, governance, Governance Hub nav item
icon-zap
Zap
API, performance, fast operations, Pipeline Builder
icon-layout
Layout
Creative & XR cluster, UI builder, design tools
icon-link
Chain Link
Blockchain cluster, connections, integrations
icon-database
Database
Data storage, RAG Studio, vector databases
icon-settings
Gear
Settings pages, configuration, platform admin
icon-users
Users
Team management, access control, user admin
icon-terminal
Terminal
Dev Platform cluster, CLI tools, code execution
icon-broadcast
Radio waves
IoT, real-time events, streaming data
icon-glasses
Glasses
XR Builder, AR/VR integration, spatial computing
icon-search
Magnifier
Search inputs, discovery, content filtering
icon-bell
Bell
Notifications, alerts, webhook triggers
icon-key
Key
API keys, authentication, secrets management
icon-grid
Grid
App Builder, component library, multi-product view
icon-layers
Stack
ML Ops, model layers, data pipeline stages
icon-rocket
Rocket
Deploy action, launch, go-live events
icon-eye
Eye
View details, preview, monitor
icon-edit
Pen
Edit configuration, modify, update
icon-trash
Bin
Delete — always paired with confirmation dialog
icon-download
Arrow down
Export, download logs, backup
icon-more
Three dots
Context menu trigger, overflow actions


7. Button System
Components — Interactions
Five variants. Three sizes. Icon-only. Loading. Destructive. The hierarchy must be respected: one primary action per view, supporting secondary actions, tertiary ghost actions. The amber CTA is the only exception — it exists outside this hierarchy for conversion moments.

7.1  Button Variants
Variant
Background
Text
Border
Usage
Primary
--sg-blue
#FFFFFF
None
The single most important action on any view. One per page section maximum.
Secondary
--sg-surface-2
--sg-text-1
--sg-border-md
Supporting actions that accompany a primary — Export, Duplicate, View Details.
Ghost
Transparent
--sg-blue
--sg-blue-border
Tertiary or contextual — inline links that look like buttons, low-priority actions.
CTA (Amber)
Amber gradient
#FFFFFF
None
Upgrade prompts, pricing conversions, plan changes. Never for navigation or CRUD.
Danger
--sg-danger-bg
--sg-danger
--sg-danger-bd
Destructive: delete, revoke, reset. Always preceded by a confirmation dialog.

7.2  Button Sizes
Size
Padding
Font size
Border radius
Context
XS (--btn-xs)
5px 10px
11px
--r-sm (6px)
Dense tables, tag-line actions, inline confirmations
SM (--btn-sm)
7px 13px
12px
--r-sm (6px)
Toolbar buttons, secondary table row actions
Default
9px 17px
13px
--r-md (8px)
Standard — use for all forms, dialogs, page-level actions
LG (--btn-lg)
12px 24px
15px
--r-lg (12px)
Hero CTAs, upgrade prompts, empty-state actions
Icon only
0px, 34×34px
—
--r-md (8px)
Toolbar icon actions — always include aria-label

7.3  Button States
State
Visual change
Implementation
Default
Defined variant styles
Base CSS class
Hover
Background lightens or darkens; translateY(-1px)
CSS :hover — never JS for hover
Active / Pressed
translateY(0) — returns to resting position
CSS :active
Focus
3px ring in --sg-blue at 20% opacity
CSS :focus-visible only — not :focus
Loading
Spin animation appended after label
CSS animation; pointer-events: none
Disabled
opacity: 0.4; pointer-events: none
HTML disabled attribute + CSS


8. Form Controls
Components — Data Input
Every input type shares the same visual foundation: --sg-surface background, --sg-border-md border, --r-md radius, 9px 12px padding. State changes are communicated through border colour and box-shadow only — never background colour changes on the input itself (except on focus).

8.1  Input States
State
Border
Shadow
Background
Default
--sg-border-md (12% black / 12% white)
None
--sg-surface
Hover
--sg-border-str (18% black / 18% white)
None
--sg-surface
Focus
--sg-blue
0 0 0 3px rgba(blue, 0.2)
--sg-bg (white/black)
Error
--sg-danger
None (focus: danger glow)
--sg-surface
Success
--sg-success
None
--sg-surface
Disabled
--sg-border (7%)
None
--sg-surface-2; opacity 0.5

8.2  Control Types
Control
Component class
Notes
Text input
.input
With optional leading icon (.input-wrap + .input-icon) and suffix label (.input-suffix)
Select / Dropdown
.select
Native appearance: none with custom SVG chevron background. Arrow flips on open via JS.
Textarea
.textarea
min-height: 80px; resize: vertical only. Height never auto — set per context.
Checkbox
.checkbox-wrap
accent-color: --sg-blue. Label always to the right. Minimum 24×24px touch target.
Radio
.checkbox-wrap
Same rules as checkbox. Group with fieldset + legend.
Toggle switch
.toggle + .toggle.on
40×22px. Knob transitions with cubic-bezier spring. onClick toggles .on class.
Field wrapper
.field
Contains: label (.field-label), input, hint (.field-hint) or error (.field-error).


9. Card Components
Components — Content Containers
Three card types. Each has a specific context. They must not be mixed within the same content grid.

Type
Background
Border
Shadow
Usage
Solid (.card)
--sg-surface
1px --sg-border
--shadow-sm, hover: --shadow-md
Feature listings, product tiers, agent cards in dashboard grids
Glass (.card-glass)
--glass-bg + backdrop-filter
1px --sg-border-md
--shadow-md, hover: --shadow-lg
Overlapping content, floating panels, hero section feature cards
Metric (.metric-card)
--sg-surface
1px --sg-border + 2px brand-span top
--shadow-sm (no hover)
KPI values in dashboards — active agents, API calls, uptime, MRR

9.1  Card Anatomy
Eyebrow: 10px, 600 weight, +10% tracking, uppercase, --sg-blue. Always the category label.
Heading (h3): 15px, 600 weight, -1% tracking. One line where possible. Never truncate — wrap.
Body copy: 13px, 400 weight, --sg-text-3. Maximum 2–3 lines. Link to full detail if needed.
Tags / badges: bottom of card. Maximum 2 tags per card — more creates visual clutter.
Hover behaviour: translateY(-1px), shadow-md, border-color bump to --sg-border-md. Duration: 200ms ease-out.
Border radius: --r-xl (16px) for all card variants. Smaller radius reads as a table row, not a card.


10. Data Table
Components — The Core Enterprise Component
Enterprise SaaS products live in tables. User management, billing history, audit logs, pipeline runs, agent registries, compliance reports — every cluster in the SonOfGraig platform will render data tables. This component must be defined precisely before any cluster enters development. Teams that define their own table patterns create a fragmentation that costs six months to consolidate.

Non-negotiable before any cluster ships
Every product team must use the canonical table component. No exceptions. If the canonical table cannot satisfy a use case, raise it in the design system channel and get an official variant approved — do not build a custom table in isolation.

10.1  Table Anatomy
Zone
Component
Specification
Table header
.table-header
Title (13px, 600) + row count (12px, --sg-text-4). Right slot: search input + primary action button.
Column headers
thead th
11px, 600, +6% tracking, uppercase, --sg-text-4. Sticky on scroll. Sortable: adds ↕ icon + :hover colour.
Body rows
tbody tr
13px body text. :hover background: --sg-surface-2. Transition: 100ms ease. Last row: no border-bottom.
Primary cell
td.cell-primary
500 weight, --sg-text-1. Typically the name or identifier column.
Status cell
td + .badge
Badge with coloured dot for live/degraded/failed/idle states.
Action cell
td + .btn-icon-sm
28×28px icon buttons. Show on row hover (opacity 0 → 1) where density allows.
Table footer
.table-footer
Left: row count info. Right: pagination controls with current page highlighted in blue.

10.2  Table Rules
Column header height: 40px. Body row height: 48px minimum. Compact mode: 36px rows for dense audit log views.
Maximum 7 columns in standard view. Above 7, collapse low-priority columns behind a + button.
Primary column always leftmost, action column always rightmost.
Numeric data (token counts, API calls, MRR) uses JetBrains Mono at 12px for alignment.
Empty table state: render the .empty-state pattern inside the table body — never show a bare empty table.
Pagination: show current page highlighted in blue. Always show first, last, and immediate neighbours. Use ellipsis for gaps above 3.
Search: debounce at 300ms. Show clear button when query is active. Never reload page on search — filter client-side or fetch without navigation.


11. Navigation — Product Sidebar
Components — Wayfinding
Every product cluster has a persistent left sidebar. This is the canonical navigation pattern for all five clusters. Do not build top navigation bars for product surfaces — top nav is for marketing pages only.

Element
Class
Specification
App header
.product-nav-header
24×24px cluster icon (coloured by cluster) + cluster name (13px, 600). Separated by bottom border.
Section label
.pnav-section-label
10px, 600, +10% tracking, uppercase, --sg-text-4. Groups nav items by functional area.
Nav item (default)
.pnav-item
13px, 400, --sg-text-3. 16×16px leading icon. Minimum 44px tall for touch. Padding: 8px 16px.
Nav item (active)
.pnav-item.active
--sg-blue-glass background. --sg-blue text. 500 weight. Icon opacity: 1 (vs 0.7 default).
Notification badge
.pnav-badge
Right-aligned pill. Blue for counts, red/amber for alerts. 10px, 600, white text.
Cluster colour
Border-color override
Each cluster gets a subtle border accent: blue (AI Dev), amber (Cloud), green (Data), purple (Creative), gray (Dev Platform).

11.1  Navigation Rules
Maximum 12 nav items per cluster. Above 12, introduce a second section group or a sub-navigation pattern.
Active state persists on page reload — driven by current URL path, not JS state.
Notification badges: use numbers for counts (3, 12, 99+). Use ! for urgent alerts that require immediate action.
The sidebar is always 220px wide in desktop view. It collapses to an icon-only rail at 860px. It disappears entirely below 640px, replaced by a mobile drawer.
Settings and access management are always the last two items in every cluster sidebar — regardless of cluster content.


12. Feedback Components
Components — System Communication
Feedback components tell users what is happening, what just happened, or what requires their attention. There are three categories: persistent callouts (inline, in-page), transient toasts (temporary, corner-anchored), and ambient badges (status at a glance).

12.1  Callout Variants
Variant
Fill
Border
Icon
Usage
.callout.info
--sg-info-bg (blue 7%)
--sg-info-bd
icon-info, --sg-blue
Non-urgent information: sync in progress, background operations, feature notes
.callout.success
--sg-success-bg (green 8%)
--sg-success-bd
icon-check, --sg-success
Confirmations: deployment succeeded, agent created, export complete
.callout.warn
--sg-warn-bg (amber 7%)
--sg-warn-bd
icon-alert, --sg-warn
Attention needed: approaching limits, degraded performance, expiring credentials
.callout.danger
--sg-danger-bg (red 7%)
--sg-danger-bd
icon-alert, --sg-danger
Errors and violations: governance breach, deployment failed, billing failure

12.2  Toast Notifications
Toasts appear in the bottom-right corner. They are transient — they dismiss automatically after 4 seconds, or immediately on close button click. Maximum 3 toasts stacked simultaneously.

Property
Value
Width
340px fixed
Position
Bottom-right, 24px from edges, z-index: 9000
Auto-dismiss
4 seconds for info/success. 8 seconds for warn/danger. Never auto-dismiss if action required.
Entry animation
slideInUp 200ms ease-out
Exit animation
fadeOut 150ms ease-in
Stack order
Newest on top. Older toasts shift down.
Close button
Always present. 20×20px icon-x in --sg-text-4.

12.3  Badge & Tag System
Component
Shape
Font
Usage
.badge
Pill (--r-full)
11px, 500, +3% tracking
Status indicators with optional coloured dot. Used in nav badges, table status cells, page headers.
.badge with .badge-dot.pulse
Pill + animated dot
Same
Live / active states where real-time status matters — agent running, deployment in progress.
.tag
Rounded square (--r-xs)
11px, 500
Category labels on cards and tables. Max 2 per item. Shorter and more angular than badges.


13. States — Loading, Empty, Progress
Components — System States
Products spend up to 40% of their rendered time in a loading or empty state. These states are not edge cases — they are core product surfaces that require the same design rigour as data-populated views.

13.1  Skeleton Loaders
Skeleton loaders replace content while data is fetching. They must match the approximate shape and layout of the content they replace. Never show a spinner in place of a data table — show a skeleton table.

Rule
Specification
Animation
shimmer: background-position 0→600px in 1.5s linear infinite. Gradient: surface-2 → surface-3 → surface-2.
Shape matching
Skeleton elements mirror the actual content layout. Text lines: height 10–12px. Images: exact dimensions. Cards: full card shape.
Colour
Uses --sg-surface-2 and --sg-surface-3. Never use blue or brand colours in skeletons.
Duration cap
If data has not loaded within 8 seconds, switch skeleton to an error state with retry action.
Reduced motion
@media (prefers-reduced-motion) — static background, no animation.

13.2  Empty States
Empty states appear when a resource exists but has no content yet. They are not error states. Every empty state has three elements: an icon, a heading, a description, and one primary action.

Element
Specification
Container icon
48×48px box with --sg-surface-2 background, --sg-border border, --r-lg radius. Contains a 22×22px icon in --sg-text-4.
Heading (h3)
15px, 600, --sg-text-1. Names the thing that is empty: 'No agents yet', 'No deployments', 'No users'.
Description
13px, 400, --sg-text-3. Maximum 2 sentences. Explains what the user gets when they create the first item.
Primary action
Standard .btn.btn-primary with leading icon-plus. One action only. Never two empty-state CTAs.
Padding
--sp-16 (64px) top and bottom. --sp-8 (32px) left and right.

13.3  Progress Bars
Variant
Fill
Usage
Blue (.progress-fill.blue)
Gradient: --sg-blue → #38BDF8
Deployment progress, file uploads, task completion
Amber (.progress-fill.amber)
Gradient: --sg-amber → #FBBF24
Usage meters approaching limit — token quota, storage, seat count
Success (.progress-fill.success)
--sg-success solid
Completed phases, finished onboarding steps, 100% states

Track height: 6px. Border radius: --r-full. Background: --sg-surface-3.
Always show a percentage label to the right of the track header. Never rely on bar position alone to communicate value.
Transition: width change animates at 400ms ease-out. Initial load: animate from 0 to actual value.


14. Platform Architecture — 5 Product Clusters
Product — 18 Services → 5 SaaS Clusters
The design system serves five distinct product clusters. Each cluster has a colour identity that appears in its sidebar icon, cluster card border, and cluster-level feature highlights. The blue primary and amber accent remain constant across all clusters — the cluster accent is supplementary only.

Cluster
Priority
Phase
Viability
Colour accent
Source services
AI Dev Platform
①
Phase 1
5 / 5
Blue (#0B9EDE)
Generative AI, Machine Learning, Ethical AI
Cloud & DevOps Suite
②
Phase 2
4 / 5
Amber (#F97316)
Cloud Architecture, Cybersecurity, DevOps, IT Solutions
Data & Analytics OS
③
Phase 2
4 / 5
Green (#16A34A)
Data Analytics, Hyper-automation & RPA
Creative & XR Studio
④
Phase 3
3 / 5
Purple (#7C3AED)
UI/UX Design, Digital Design & Branding, AR & VR
Dev Platform
⑤
Phase 3
3 / 5
Gray (#6B7280)
Web Dev, Mobile Dev, Game Dev, Robotics, Blockchain, Marketing

14.1  Cluster Card Specification
Element
Specification
Border
1px solid, cluster accent at 20% opacity (e.g., rgba(11,158,222,0.2) for AI Dev)
Background
Linear gradient: cluster accent at 6% opacity → --sg-surface
Cluster icon
36×36px box, cluster accent at 8–10% opacity fill, 20×20px SVG icon in cluster accent colour
Priority number
Top-right, 10px mono font, --sg-text-4. Styled as ①②③④⑤.
Heading
13px, 600, --sg-text-1
Body
11px, 400, --sg-text-4. Product names as comma-separated list.
Tags
Viability score (coloured) + phase (neutral). Bottom of card.
Hover
Border opacity 0.3 → 0.4, shadow-md, translateY(-2px), 200ms ease-out.


15. CSS Token Reference
Implementation
The complete token set for implementation. All values are defined in CSS custom properties. The theme toggles by setting data-theme='dark' or data-theme='light' on the <html> element. localStorage key: 'sg-theme'.

15.1  Border Radius Tokens
Token
Value
Usage
--r-xs
4px
Tag corners, skeleton blocks, code chips
--r-sm
6px
Small buttons (XS, SM), compact list items
--r-md
8px
Default buttons, text inputs, selects, icon chips
--r-lg
12px
Dropdowns, callouts, toast notifications, table wrapper
--r-xl
16px
All cards, product nav component, modal dialogs
--r-2xl
24px
Large feature panels, hero content blocks
--r-full
9999px
Badges, tags, pills, toggle switches, avatar shapes

15.2  Shadow Elevation Tokens
Token
Light mode value
Usage
--shadow-sm
0 1px 2px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)
Default card resting state, table wrapper, select dropdown
--shadow-md
0 4px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)
Card hover state, modals, elevated popovers
--shadow-lg
0 12px 32px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)
Toast notifications, command palette, deep modals
--shadow-blue
0 0 0 3px rgba(11,158,222,0.2), 0 2px 8px rgba(11,158,222,0.15)
Focus ring for interactive elements, active blue button

15.3  Easing Functions
Token
Value
Usage
--ease-out
cubic-bezier(0.16, 1, 0.3, 1)
Card hover lift, modal open, dropdown appear — fast entry, slow settle
--ease-spring
cubic-bezier(0.34, 1.56, 0.64, 1)
Toggle knob, button active, sidebar collapse — overshoot for tactile feel

15.4  Glass System Tokens
The glass system is used for floating surfaces and hero-section feature cards. It must only be applied where there is visible content behind the surface — glass on a solid background is meaningless.

Token
Light value
Dark value
Usage
--glass-bg
rgba(255,255,255,0.70)
rgba(255,255,255,0.04)
Glass card default background
--glass-bg-md
rgba(255,255,255,0.85)
rgba(255,255,255,0.07)
Glass card hover state
--glass-blur
saturate(160%) blur(16px)
saturate(180%) blur(20px)
backdrop-filter value — applied to glass card containers


16. Governance — How to Use This System
Process
A design system is only as valuable as its adoption. These rules govern how SonOfGraig team members interact with, extend, and change the system. Every cluster engineering team is required to follow these rules.

16.1  Usage Rules
All product UI must use only tokens defined in this document. No hard-coded hex values in component code.
All icons must come from the Lucide library or the core sprite defined in Section 6. No emoji, no raster icons, no FontAwesome.
All new colours must be proposed as tokens — not used inline. Token proposals require design system review.
Amber is accent-only. Any use of --sg-amber or #F97316 outside of pricing, upgrade, and premium contexts requires explicit approval.
Component code must reference the design system documentation version number in its file header comment.

16.2  Extension Process
When a product requirement cannot be satisfied by an existing component, the following process applies:

Step
Action
Owner
1
Document the unmet requirement with a product context description and screenshot mock
Requesting team
2
Check existing components for composition possibilities — can 2+ existing components combine?
Design lead
3
If no composition works, propose a new component variant in the design system Slack channel
Design lead
4
Design system team reviews within 5 working days and either approves, modifies, or rejects with rationale
DS team
5
Approved components are added to this document, the HTML reference, and the Figma library simultaneously
DS team
6
All cluster teams are notified of the addition via the design system changelog
DS team

16.3  Version History
Version
Date
Summary of changes
v1.0
2024 Q3
Original design system — service agency branding. Dual primaries. DM Sans. Dark-only. No component library.
v2.0
2025 Q4
Refined colour palette. Glass system introduced. Button and input components added. Sidebar and cluster cards.
v3.0
April 2026
Full enterprise-grade rebuild. Light + dark mode. Single primary. SVG icon system. Data table. Product nav. Skeleton loaders. Empty states. Dropdown. Sora + Inter + JetBrains Mono type stack.

Document ownership
This document is owned by the SonOfGraig design system team. Questions, corrections, and extension requests should be directed to the design system Slack channel. The HTML reference file (sonofgraig-design-system-v3.html) is the canonical rendered version — this document is the written specification.
