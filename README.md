# Krucket
<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/950072d0-d966-44fc-9c7a-9f70e00ed48e" />

Krucket is a lightweight session replay and product analytics platform focused on helping developers and businesses understand how users actually interact with their websites.

The long-term vision is to build a fast, developer-focused alternative to tools like Hotjar and PostHog, with an emphasis on performance, simplicity, and low infrastructure overhead.

## Vision

Most analytics tools either:
- focus only on page views and dashboards, or
- become extremely bloated, expensive, and difficult to self-host.

Krucket aims to sit in the middle:
- lightweight enough for small projects,
- powerful enough for serious product insights,
- and transparent enough that developers understand exactly what is being collected.

The goal is not just analytics.

The goal is actionable user behavior understanding.

---

# Current Features

## Event Ingestion
Krucket currently accepts and processes frontend events from connected websites.

## Session Tracking
Track user sessions across pages and interactions.

## Scroll Depth Detection
Basic scroll depth tracking was added recently to measure how far users scroll on a page.

This implementation is still evolving and will likely be redesigned or improved for better accuracy and lower noise.

## Structured Event Pipeline
Events are normalized into a structured format for future analytics and replay systems.

Example event structure:

```json
{
  "site_id": "example-site",
  "event_type": "PageView",
  "url": "https://example.com/dashboard",
  "timestamp": 1778644166009,
  "data": {}
}
```

---

# Planned Features

## Session Replay
A core goal of Krucket is full session replay.

This includes:
- mouse movement tracking
- click tracking
- scroll reconstruction
- DOM interaction playback
- timeline navigation

The focus is building replay functionality that is lightweight and performant rather than shipping massive frontend bundles.

---

## Heatmaps
Planned heatmap functionality includes:
- click heatmaps
- scroll heatmaps
- rage-click detection
- dead-click detection

---

## Funnel Analytics
Track where users drop off through:
- onboarding flows
- checkout flows
- signup funnels
- feature adoption funnels

---

## Real-Time Dashboard
A live dashboard for:
- active visitors
- live sessions
- event streams
- realtime interaction monitoring

---

## Developer-Friendly Embedding
Krucket is designed to be easy to integrate:

```html
<script src="https://krucket.com/embed.js" async></script>
```

Minimal setup.
Minimal configuration.
Minimal overhead.

---

## Privacy-Focused Controls
Planned privacy features include:
- input masking
- selective event filtering
- domain restrictions
- configurable tracking behavior
- GDPR-conscious defaults

---

# Technical Goals

Krucket is being built with a strong focus on systems design and performance.

Areas of focus include:
- efficient event ingestion
- low-memory processing
- scalable replay storage
- event compression
- high-throughput backend architecture

The project is also an exploration of building production systems using Rust.

---

# Tech Stack

Current stack includes:
- Rust backend
- Event ingestion pipeline
- JSON event processing
- Frontend tracking script

Planned infrastructure:
- ClickHouse or similar analytics storage
- WebSocket realtime streaming
- Replay compression systems
- Distributed event processing

---

# Roadmap

## Phase 1 — Core Tracking
- [x] Basic event ingestion
- [x] Session tracking
- [x] Scroll depth tracking
- [ ] Frontend SDK cleanup
- [ ] Stable event schema
- [ ] Authentication system

---

## Phase 2 — Replay Infrastructure
- [ ] DOM snapshot system
- [ ] Mouse movement capture
- [ ] Replay event timeline
- [ ] Playback renderer
- [ ] Session replay viewer

---

## Phase 3 — Analytics
- [ ] Heatmaps
- [ ] Funnel analysis
- [ ] Conversion tracking
- [ ] User journey visualization
- [ ] Custom events

---

## Phase 4 — Scale & Reliability
- [ ] Event batching
- [ ] Queue-based ingestion
- [ ] Replay compression
- [ ] Multi-tenant architecture
- [ ] Horizontal scaling

---

# Why Rust?

Krucket is built in Rust to explore:
- high-performance backend systems
- memory-safe concurrent processing
- scalable analytics infrastructure
- low-overhead event pipelines

Rust provides the performance characteristics needed for realtime analytics while maintaining strong reliability guarantees.

---

# Status

Krucket is currently an active experimental project under development.

The architecture and features are evolving rapidly as the platform grows.

Contributions, ideas, and feedback are welcome.
