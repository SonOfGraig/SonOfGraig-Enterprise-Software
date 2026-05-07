# 13 — Platform Architecture: 5 Product Clusters

The platform serves five distinct product clusters. Each has a **colour identity** that appears on its sidebar icon, cluster card border, and cluster-level highlights. Blue + amber remain constant across all clusters — the cluster accent is supplementary.

| Cluster | Priority | Phase | Viability | Accent | Source services |
|---|---|---|---|---|---|
| AI Dev Platform | ① | 1 | 5 / 5 | Blue `#0B9EDE` | Generative AI, ML, Ethical AI |
| Cloud & DevOps Suite | ② | 2 | 4 / 5 | Amber `#F97316` | Cloud Architecture, Cybersecurity, DevOps, IT Solutions |
| Data & Analytics OS | ③ | 2 | 4 / 5 | Green `#16A34A` | Data Analytics, Hyper-automation & RPA |
| Creative & XR Studio | ④ | 3 | 3 / 5 | Purple `#7C3AED` | UI/UX, Branding, AR/VR |
| Dev Platform | ⑤ | 3 | 3 / 5 | Gray `#6B7280` | Web, Mobile, Game, Robotics, Blockchain, Marketing |

## What's real today vs. roadmap

Phase 1 (months 1–6) ships **AI Dev Platform** core — Agent Builder + RAG Studio. Everything else is **marketing copy** until its phase begins. When asked to build a feature, check the cluster's phase before implementing it as code rather than as a roadmap entry.

## Cluster card spec

| Element | Spec |
|---|---|
| Border | `1px solid` cluster accent at 20% opacity (e.g. `rgba(11,158,222,.2)` for AI Dev) |
| Background | `linear-gradient(cluster-accent @ 6% → --sg-surface)` |
| Cluster icon | 36×36 box, accent at 8–10% opacity fill, 20×20 SVG in accent colour |
| Priority | Top-right, 10px mono, `--sg-text-4`. Styled as `①②③④⑤` |
| Heading | 13/600, `--sg-text-1` |
| Body | 11/400, `--sg-text-4`. Product names as comma-separated list |
| Tags | Viability score (coloured) + phase (neutral), bottom of card |
| Hover | Border opacity .3 → .4, `--shadow-lift-md`, `translateY(-2px)`, 200ms |

→ Sources: [`source-docs/design-system-v3.md`](source-docs/design-system-v3.md) §14; [`source-docs/saas-transformation-map.md`](source-docs/saas-transformation-map.md) full document.
