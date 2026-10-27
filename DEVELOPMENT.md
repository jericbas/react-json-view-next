# Contributor Guide (DEVELOPMENT.md)

Welcome to the **`react-json-view-next`** contributor guide!

This repository is undergoing a comprehensive modernization to elevate `react-json-view-next` to modern frontend engineering standards: upgrading to React 19, migrating fully to strict TypeScript, adopting blazing-fast tools (Vite, Vitest, Biome), and establishing a clean, zero-dependency architecture.

Before contributing code, please take a moment to review this guide to understand our core principles, project architecture, and contribution workflow.

---

## 🗺️ Modernization Roadmap & Phases

The complete modernization initiative is organized into distinct phases tracked in GitHub Issues:

| Phase        | Milestone / Area                                                                  | GitHub Issue                                                      |
| :----------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| **Phase 1**  | Contributor Guide (`DEVELOPMENT.md`) & `README.md` Notice                         | [#1](https://github.com/jericbas/react-json-view-next/issues/1)   |
| **Phase 2**  | Framework & Language Upgrade (React 19.3+ & TypeScript)                           | [#2](https://github.com/jericbas/react-json-view-next/issues/2)   |
| **Phase 3**  | State Management & Data Fetching (React 19 Native Hooks)                          | [#3](https://github.com/jericbas/react-json-view-next/issues/3)   |
| **Phase 4**  | Build Tool Migration (Replace Webpack with Vite)                                  | [#4](https://github.com/jericbas/react-json-view-next/issues/4)   |
| **Phase 5**  | Testing Modernization (Vitest Unit & Playwright E2E)                              | [#5](https://github.com/jericbas/react-json-view-next/issues/5)   |
| **Phase 6**  | Linting, Formatting, & Pre-Commit Hooks (Biome & Git Hooks)                       | [#6](https://github.com/jericbas/react-json-view-next/issues/6)   |
| **Phase 7**  | CI/CD & Workflow (GitHub Actions, Release Please, PR Template)                    | [#7](https://github.com/jericbas/react-json-view-next/issues/7)   |
| **Phase 8**  | Docker Review & Removal                                                           | [#8](https://github.com/jericbas/react-json-view-next/issues/8)   |
| **Phase 9**  | General Housekeeping & Dependency Optimization                                    | [#9](https://github.com/jericbas/react-json-view-next/issues/9)   |
| **Phase 10** | Code Formatting Standards & File Length Limits (`indentWidth: 2` & Max 200 Lines) | [#43](https://github.com/jericbas/react-json-view-next/issues/43) |
| **Phase 11** | Remove Unused Packages & Migrate Away from SCSS (`sass`) to Pure CSS              | [#44](https://github.com/jericbas/react-json-view-next/issues/44) |
| **Phase 12** | NPM Workspaces Architecture & Storybook Demo Migration                            | [#45](https://github.com/jericbas/react-json-view-next/issues/45) |
| **Phase 13** | Read-Only `<JsonViewer />` Base & Plugin Slot Architecture                        | [#58](https://github.com/jericbas/react-json-view-next/issues/58) |
| **Phase 14** | Tree-Shakeable Clipboard Plugin (`react-json-view-next/plugins/clipboard`)        | [#59](https://github.com/jericbas/react-json-view-next/issues/59) |
| **Phase 15** | Tree-Shakeable Editor Plugin (`react-json-view-next/plugins/editor`)              | [#60](https://github.com/jericbas/react-json-view-next/issues/60) |

---

## 💡 Core Development Principles

Every contributor is expected to follow these five core principles when designing, writing, and reviewing code in this repository:

### 1. Strict TypeScript

- **No `any`**: Explicitly type all variables, function arguments, return values, and data structures. Never use `any` unless strictly wrapping an untyped boundary (and prefer `unknown` with type guards).
- **`strict: true`**: All TypeScript code compiles with strict mode enabled (`noImplicitAny`, `strictNullChecks`, `exactOptionalPropertyTypes`, etc.).
- **Clear Interfaces**: Export clean interfaces and types for public APIs, props, state, themes, and callbacks so users of the library enjoy seamless auto-completion and compile-time type safety.

### 2. React 19 Native Hooks First

- **Functional Components Only**: No class components or legacy lifecycle methods (`componentDidMount`, `componentDidUpdate`, `getDerivedStateFromProps`).
- **Native React 19 Hooks**:
  - `useId`: Generates unique, stable, deterministic component IDs for DOM elements and accessibility attributes across client and SSR.
  - `useReducer`: Replaces legacy Flux dispatchers and Node `EventEmitter` stores with predictable, local, isolated state machines.
  - `use`: Resolves asynchronous data (Promises) passed to props like `src` directly in React 19's concurrent rendering architecture.
- **Single Source of Truth**: State is encapsulated within the `<ReactJsonView />` instance context, preventing global state pollution or leaks between multiple viewers on the same page.

### 3. Zero Unnecessary Dependencies

- **Lean Footprint**: Keep external npm dependencies minimal. Every third-party dependency adds security surface area, maintenance overhead, and bundle size.
- **Native Browser & JavaScript APIs**:
  - Use `navigator.clipboard.writeText()` instead of external clipboard packages.
  - Use standard `Intl` APIs, `JSON`, and native `Promise` constructs.
  - Rely on native ES modules and browser standards whenever available.

### 4. Fast Local Tools

- **Vite**: Ultra-fast development server with instant Hot Module Replacement (HMR) and optimized library builds producing modern ESM and CJS bundles.
- **Vitest**: Blazing-fast test runner that shares Vite's config and transform pipeline for instant feedback during testing.
- **Biome**: A unified, high-performance tool for linting and formatting (`indentWidth: 2`, spaces indentation), replacing ESLint and Prettier with sub-second execution speeds.
- **Modular Code Size Limits**: Every `.ts`/`.tsx` file in the repository must not exceed 200 non-blank lines (`npm run check:lines`), ensuring components remain small, composable, and easily testable.

### 5. Trunk-Based & Git Workflow

- **Healthy Branches**: Keep `main` and `develop` always green and deployable.
- **Short-Lived Feature Branches**: Branch off `develop` using clear prefix conventions (`feat/`, `fix/`, `docs/`, `refactor/`, `chore/`).
- **Conventional Commits**: Format commit messages according to the [Conventional Commits](https://www.conventionalcommits.org/) specification:
  - `feat: add support for async src promise` (triggers MINOR version bump)
  - `fix: correct type signature for onEdit callback` (triggers PATCH version bump)
  - `feat!: breaking change to props API` (triggers MAJOR version bump)
  - `docs: update development guide with testing commands` (no version bump)
- **Automated Releases (Release Please)**: We use [Release Please](https://github.com/googleapis/release-please) to automate version bumps, changelog generation in `CHANGELOG.md`, and GitHub releases on `main` driven by Conventional Commits.
- **Pre-commit Hooks**: Lightweight git hooks verify formatting and linting prior to commits, catching regressions early.
- **Continuous Integration (GitHub Actions)**: Node 22 LTS CI workflow (`.github/workflows/ci.yml`) validates Biome formatting/linting, TypeScript types, Vitest tests, and Vite build output on all pull requests and pushes to `main` and `develop`.

---

## 🏛️ Architecture Overview

The modern `react-json-view-next` architecture is structured into a clean hierarchy consisting of top-level containers, isolated contextual state, modular data-type renderers, and a unified styling engine:

```
+----------------------------------------------------------------+
|                        <ReactJsonView />                       |
|           (Public Entry Point, Props Validation & Defaults)    |
+----------------------------------------------------------------+
                               |
                               v
+----------------------------------------------------------------+
|                      <JsonViewProvider />                      |
|    - Holds JsonViewContext via useReducer                      |
|    - Isolated state: expanded nodes, active edits, search      |
|    - Stable instance ID via useId()                            |
|    - Theme resolver & configuration provider                   |
+----------------------------------------------------------------+
                               |
                               v
+----------------------------------------------------------------+
|                         <JsonViewer />                         |
|               (Recursive Tree Traverser & Renderer)            |
+----------------------------------------------------------------+
          |                    |                      |
          v                    v                      v
  +---------------+    +---------------+    +-------------------+
  | <JsonObject>  |    | <JsonArray>   |    | Primitive Types   |
  |  - Keys       |    |  - Elements   |    |  - <String>       |
  |  - Collapsing |    |  - Grouping   |    |  - <Integer>      |
  |  - Meta/Size  |    |  - Collapsing |    |  - <Float>        |
  +---------------+    +---------------+    |  - <Boolean>      |
          |                    |            |  - <Date>         |
          +--------------------+            |  - <Null>         |
                    |                       |  - <Undefined>    |
                    v                       |  - <Function>     |
         +--------------------+             |  - <Regexp>       |
         | <VariableEditor /> |             |  - <Nan>          |
         | <VariableMeta />   |             +-------------------+
         | <CopyToClipboard />|
         +--------------------+
```

### Component & Layer Responsibilities

1. **`ReactJsonView` (Entry Point)**:
   - Serves as the public component interface exposed to consuming applications.
   - Validates input props, applies sensible defaults, and wraps the tree inside `<JsonViewProvider>`.
   - Handles async `src` resolution (via React 19 `use()` / Suspense).

2. **`JsonViewContext` & Provider**:
   - Manages isolated component state with `useReducer`:
     - Node expansion / collapse state (`isExpanded(path)`).
     - Active in-line editing sessions (`VARIABLE_UPDATED`, `VARIABLE_ADDED`, `VARIABLE_REMOVED`).
     - Validation messages and errors (`ValidationFailure`).
     - Unique instance identification with `useId()`.
   - Eliminates singleton stores and global event dispatchers, ensuring that multiple viewers on a page do not interfere with one another.

3. **Data Type Components**:
   - Dedicated components inside `src/components/DataTypes/` represent each JSON data type:
     - Objects: `Object.tsx`, `ArrayGroup.tsx`
     - Numerics: `Integer.tsx`, `Float.tsx`, `Nan.tsx`
     - Text & Logicals: `String.tsx`, `Boolean.tsx`
     - Specials: `Date.tsx`, `Null.tsx`, `Undefined.tsx`, `Function.tsx`, `Regexp.tsx`
   - Each data type component handles its own value display, copy-to-clipboard trigger, and edit mode transition.

4. **Base16 Theming**:
   - Uses standard [Base16 styling](https://github.com/chriskempson/base16) rules to provide consistent syntax coloring across dark and light themes.
   - Built-in themes are pure objects defining 16 hexadecimal color keys (`base00` to `base0F`), easily customized by end users.

---

## 🚀 Getting Started for Contributors

### Prerequisites

- **Node.js**: v20 or higher recommended.
- **Package Manager**: `npm` (v10+) or `pnpm`.

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/jericbas/react-json-view-next.git
cd react-json-view-next

# Create a feature branch off develop
git checkout develop
git checkout -b feat/my-improvement

# Install dependencies
npm install
```

### 2. Local Development & Storybook

Start the Storybook interactive documentation and component playground:

```bash
# Start Storybook dev server (http://localhost:6006)
npm run storybook
# (or shorthand)
npm run dev
```

Visit `http://localhost:6006` in your browser to interactively explore Base16 themes, props controls, async Promises with React 19 Suspense, and large datasets.

To build the static Storybook documentation bundle:

```bash
npm run build:storybook
```

### 3. Running Tests

#### Unit & Component Tests (Vitest)

Run the test suite to ensure no regressions:

```bash
# Run unit and component tests once
npm test

# Run tests in watch mode during development
npm run test:watch

# Run test coverage report
npm run test:coverage
```

#### End-to-End (E2E) Tests (Playwright)

Browser E2E tests run against the Vite demo application using Playwright:

```bash
# Run Playwright E2E tests
npm run test:e2e
```

E2E tests and page object models are located in `e2e/`:
- `e2e/specs/`: Test specification files (`smoke.spec.ts`)
- `e2e/pages/`: Page Object Models (`JsonViewerPage.ts`)
- `e2e/fixtures/`: Shared test data and mocks (`test-data.ts`)

### 4. Code Formatting & Linting

We maintain strict formatting and code health standards using Biome:

```bash
# Check code for lint errors and formatting discrepancies
npm run check

# Automatically apply formatting and safe fixes
npm run check:write

# Run linter only
npm run lint

# Format code only
npm run format
```

#### Pre-Commit Hook (Zero-Dependency)

We use a zero-dependency Git hook located in `.githooks/pre-commit`. Running `npm install` runs the `prepare` script which automatically activates the hook via `git config core.hooksPath .githooks`.

The pre-commit hook automatically runs before every commit:
1. Verifies that all `.ts`/`.tsx` files have ≤ 200 non-blank lines (`npm run check:lines`).
2. Checks staged files against Biome formatting (`indentWidth: 2`) and linting rules.
3. Runs TypeScript type checking (`npm run typecheck`).

### 5. Building the Library

Verify that the production build compiles cleanly and generates both ESM and CJS bundles with full TypeScript definitions:

```bash
npm run build
```

---

## 🤝 Pull Request & Review Process

1. **Target Branch**: Ensure your pull request targets the **`develop`** branch (not `main`).
2. **Issue Linking**: Reference the corresponding GitHub issue in your PR title and description:
   - For example: `Closes #10, Part of #1`
3. **Tests & Coverage**: Add unit tests in `test/` for any new functionality, bug fixes, or edge cases.
4. **Self-Review**:
   - [ ] Code follows the 5 Core Principles (strict TypeScript, React 19 hooks, minimal deps, Vite/Biome tools, conventional commits).
   - [ ] `npm run check` passes with zero errors and zero warnings.
   - [ ] `npm test` passes completely.
   - [ ] `npm run build` succeeds without type errors.

Thank you for contributing to the modernization of `react-json-view-next`!
