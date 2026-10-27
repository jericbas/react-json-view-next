# Legacy `react-json-view` Performance Baseline Benchmark

This document records the initial performance benchmark measurements for the legacy `react-json-view` implementation (v1.21.3) from the original upstream repository at [https://github.com/mac-s-g/react-json-view](https://github.com/mac-s-g/react-json-view) (commit [`443465e`](https://github.com/mac-s-g/react-json-view/commit/443465e) on `main`).

These metrics represent the un-modernized, legacy baseline to compare against:
1. The modernized TypeScript + React 19 architecture (`develop` / `main`).
2. Future WebAssembly / Rust-accelerated React components.

---

## 🖥️ Benchmark Environment

- **Architecture / OS**: Linux x86_64
- **Node.js**: v22.22.3
- **Runtime**: JSDOM DOM simulation environment
- **Legacy React Version**: `react@16.14.0` / `react-dom@16.14.0`
- **Legacy Dependencies**: Flux dispatcher, `react-base16-styling`, Webpack 4 bundle (`dist/main.js`, 117.7 kB)

---

## 📊 Benchmark Results

| Scenario                                       | Iterations | DOM Elements | Mean Render Time |   Median    |     Min     |     Max     | 95th Percentile (p95) |
| :--------------------------------------------- | :--------: | :----------: | :--------------: | :---------: | :---------: | :---------: | :-------------------: |
| **Small JSON** (~10 key-values, mixed types)   |     25     |     255      |   **26.58 ms**   |  24.74 ms   |  16.74 ms   |  40.93 ms   |       39.89 ms        |
| **Medium JSON** (50 items array, ~250 nodes)   |     15     |    7,953     |  **590.02 ms**   |  580.05 ms  |  537.48 ms  |  648.61 ms  |       648.61 ms       |
| **Deep Nested JSON** (25 recursive levels)     |     15     |    2,270     |  **233.32 ms**   |  232.44 ms  |  217.52 ms  |  251.47 ms  |       251.47 ms       |
| **Large Array (500 items, default group 100)** |     10     |      64      |   **5.50 ms**    |   5.71 ms   |   4.49 ms   |   6.98 ms   |        6.98 ms        |
| **Large Array (500 items, fully ungrouped)**   |     5      |    36,029    | **2,415.01 ms**  | 2,421.52 ms | 2,396.01 ms | 2,431.56 ms |      2,431.56 ms      |
| **Large Array (500 items, collapsed root)**    |     15     |      64      |   **6.52 ms**    |   5.45 ms   |   3.94 ms   |  11.97 ms   |       11.97 ms        |

---

## 🔍 Key Performance Insights & Bottlenecks

1. **Ungrouped Large Arrays**:
   - Rendering 500 items ungrouped requires generating **36,029 DOM nodes**, resulting in a rendering time of **~2.4 seconds**.
   - This represents the primary target for WebAssembly acceleration and virtualized tree rendering.
2. **Medium Object Overhead**:
   - Even a moderate payload of 50 records with nested tags generates **~8,000 DOM elements**, taking **~590 ms**.
3. **Deep Nesting**:
   - A 25-level deep object tree causes sequential recursion overhead of **~233 ms** for 2,270 DOM nodes.
4. **Grouped / Collapsed Rendering**:
   - When nodes remain collapsed or subgrouped (default `groupArraysAfterLength: 100`), only the immediate group brackets are mounted (64 DOM nodes), taking only **~5.5 ms**.

---

## 🎯 Next Steps for Comparison

- Run identical test payloads against the modernized TypeScript + React 19 implementation.
- Prototype Rust/Wasm parser & tree generator to eliminate JavaScript serialization and recursive component instantiation overhead.
