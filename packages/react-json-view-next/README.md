![react-json-view-next](https://raw.githubusercontent.com/jericbas/react-json-view-next/main/doc/rjv-icon-alt.png)

[![npm](https://img.shields.io/npm/v/react-json-view-next.svg)](https://www.npmjs.com/package/react-json-view-next) [![npm](https://img.shields.io/npm/l/react-json-view-next.svg)](./LICENSE) [![CI](https://github.com/jericbas/react-json-view-next/actions/workflows/ci.yml/badge.svg)](https://github.com/jericbas/react-json-view-next/actions/workflows/ci.yml)

# react-json-view-next

> 🚧 **Under Construction**: This package is newly modernized and upgraded (React 19 support, TypeScript rewrite, tree-shakeable plugin architecture, and automated CI/CD pipelines). There might still be some unexpected issues or edge cases—if you run into anything, please feel free to [open an issue](https://github.com/jericbas/react-json-view-next/issues) or submit a [pull request](https://github.com/jericbas/react-json-view-next/pulls)!
>
> 🚀 **Live Storybook Demo & Documentation:** [https://jericbas.github.io/react-json-view-next/](https://jericbas.github.io/react-json-view-next/)
>
> ℹ️ **Repository & Versioning Note**:
> - **Version 1 (`v1.x`)**: Represents the original repository ([mac-s-g/react-json-view](https://github.com/mac-s-g/react-json-view)) created by Mac Gainor. The original codebase and final release (`v1.21.3`) are preserved on the [`main`](https://github.com/jericbas/react-json-view-next/tree/main) branch and tagged as [`v1.21.3`](https://github.com/jericbas/react-json-view-next/releases/tag/v1.21.3).
> - **Version 2 (`v2.x`)**: Represents this modernized continuation (`react-json-view-next`), starting at `2.0.0` and rewritten from the ground up for React 19, strict TypeScript, modular tree-shakeable plugins, and high-performance rendering.

RJV is a React component for displaying and editing javascript **arrays** and **JSON objects**.

This component provides a responsive, customizable interface for displaying arrays or JSON in a web browser. Built with Vite into modern ES Modules (`.mjs`), CommonJS (`.cjs`), and TypeScript declarations (`.d.ts`), optimized for React 19 and modern bundlers.
- 📖 **Storybook Demo:** [https://jericbas.github.io/react-json-view-next/](https://jericbas.github.io/react-json-view-next/)
- 📘 **Props Reference:** [Storybook Props Documentation](https://jericbas.github.io/react-json-view-next/?path=/docs/documentation-props--docs)


### Implementation Example

Using `<JsonViewer />` with strict TypeScript:
```tsx
import { JsonViewer, type JsonViewerProps } from 'react-json-view-next';

const props: JsonViewerProps = {
  src: my_json_object,
  theme: 'monokai',
  collapsed: false,
  onSelect: select => console.log('Selected node:', select)
};

// Use the lightweight read-only core component
<JsonViewer {...props} />;
```

Default import compatibility:
```jsx
import ReactJson from 'react-json-view-next';

// use the component in your app!
<ReactJson src={my_json_object} />;
```

### Plugin Slot Architecture

`<JsonViewer />` features a decoupled plugin system providing structured slots:
- **`renderRowActions`**: Inject contextual buttons and action triggers into individual variable and object rows.
- **`renderValue`**: Intercept value rendering (e.g., custom URL linkifiers, color chips, badges).
- **`renderRootOverlay`**: Render toolbars, status indicators, and modal overlays at the root level.
- **`renderTree`**: Intercept or wrap the entire JSON tree renderer.

Example plugin:
```tsx
import { JsonViewer, type JsonViewPlugin } from 'react-json-view-next';

const linkifierPlugin: JsonViewPlugin = {
  name: 'url-linkifier',
  renderValue: ({ variable, defaultRender }) => {
    if (typeof variable.value === 'string' && variable.value.startsWith('http')) {
      return (
        <a href={variable.value} target="_blank" rel="noreferrer">
          {variable.value} ↗
        </a>
      );
    }
    return defaultRender();
  }
};

<JsonViewer src={my_json_object} plugins={[linkifierPlugin]} />;
```

#### Built-in Tree-Shakeable Plugins

##### Clipboard Plugin (`react-json-view-next/plugins/clipboard`)

Enable copy-to-clipboard functionality on primitive and container rows without bundling any editor/mutation code:
```tsx
import { JsonViewer } from 'react-json-view-next';
import { withClipboard } from 'react-json-view-next/plugins/clipboard';

// Default: copies JSON-stringified value
<JsonViewer src={my_json_object} plugins={[withClipboard()]} />;

// Copy property path (e.g., "user.profile.name" or "items[0]")
<JsonViewer src={my_json_object} plugins={[withClipboard({ copyPath: true })]} />;

// Custom format function or copy callback
<JsonViewer
  src={my_json_object}
  plugins={[
    withClipboard({
      format: ({ path, value }) => `${path}=${JSON.stringify(value)}`,
      callback: copy => console.log('Copied:', copy)
    })
  ]}
/>;
```

##### Editor Plugin (`react-json-view-next/plugins/editor`)

Enable interactive editing, key additions, and deletions without bundling unused modules:
```tsx
import { JsonViewer } from 'react-json-view-next';
import { withEditor, withEdit, withAdd, withDelete } from 'react-json-view-next/plugins/editor';

// Full editor suite (Edit, Add, Delete)
<JsonViewer
  src={my_json_object}
  plugins={[
    withEditor({
      onEdit: edit => console.log('Edited:', edit),
      onAdd: add => console.log('Added:', add),
      onDelete: del => console.log('Deleted:', del)
    })
  ]}
/>;

// Granular: enable only edit functionality
<JsonViewer src={my_json_object} plugins={[withEdit(edit => console.log(edit))]} />;

// Custom validation rule (returning false triggers validation failure banner)
<JsonViewer
  src={my_json_object}
  plugins={[
    withEditor({
      validationMessage: 'Value cannot be empty',
      onEdit: edit => (edit.new_value !== '' ? true : false)
    })
  ]}
/>;
```

##### Search Plugin (`react-json-view-next/plugins/search`)

Enable interactive key/value search, substring highlighting, and JSONPath querying:
```tsx
import { JsonViewer } from 'react-json-view-next';
import { withSearch } from 'react-json-view-next/plugins/search';

<JsonViewer
  src={my_json_object}
  plugins={[
    withSearch({
      placeholder: 'Search keys, values, or $.path...',
      caseSensitive: false,
      highlightColor: '#ffd700'
    })
  ]}
/>;
```

##### Virtualization Plugin (`react-json-view-next/plugins/virtual`)

Effortlessly render massive datasets (100k+ nodes) with virtual windowing:
```tsx
import { JsonViewer } from 'react-json-view-next';
import { withVirtualizer } from 'react-json-view-next/plugins/virtual';

<JsonViewer
  src={large_100k_dataset}
  plugins={[
    withVirtualizer({
      itemHeight: 24,
      maxHeight: 450,
      overscan: 5
    })
  ]}
/>;
```

### Async Data Fetching with React 19 `use()` & `<Suspense>`

With React 19, `react-json-view-next` natively unwraps asynchronous `Promise<object>` values passed directly to the `src` prop using React's `use()` hook! Wrap your `<ReactJson />` component in a React `<Suspense>` boundary to display a fallback while the data is loading:

```tsx
import React, { Suspense } from 'react';
import ReactJson from 'react-json-view-next';

// Fetch promise
const jsonPromise = fetch('https://api.example.com/data').then(res => res.json());

function AsyncJsonViewer() {
  return (
    <Suspense fallback={<div>Loading JSON data...</div>}>
      <ReactJson src={jsonPromise} theme="monokai" />
    </Suspense>
  );
}
```

### Output Examples

#### Default Theme

![Default Theme](https://raw.githubusercontent.com/jericbas/react-json-view-next/main/doc/output-example-15.png "Output Example 1")

#### Hopscotch Theme, with Triangle Icons:

![Hopscotch Theme](https://raw.githubusercontent.com/jericbas/react-json-view-next/main/doc/output-example-14.png "Output Example 2")

### Installation Instructions

Install this component with [NPM](https://www.npmjs.com/package/react-json-view-next). RJV requires React 19+ (`react` and `react-dom` `^19.0.0` as peer dependencies).
```shell
npm install --save react-json-view-next
```
Ensure you have React 19+ installed in your project:
```shell
npm install react@^19.0.0 react-dom@^19.0.0
```
Or add to your package.json config file:
```json
"dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-json-view-next": "latest"
}
```

### Props & Documentation

For the complete and interactive props reference, callbacks guide, and live component playground, please visit our **[Storybook Documentation](https://jericbas.github.io/react-json-view-next/?path=/docs/documentation-props--docs)**.

### Features

- `onEdit`, `onAdd` and `onDelete` callbacks allow users to edit the `src` variable (via `withEditor` plugin or compat mode)
- `displayDataTypes`: toggle display of data type labels (`string`, `int`, `float`, `bool`, etc.) on/off to display keys and values only
- Object, array, string and function values can be collapsed and expanded
- Object and array nodes display length and item counts
- Object and array nodes support a "Copy to Clipboard" feature (`withClipboard` plugin)
- String values can be truncated after a specified length (`collapseStringsAfterLength`)
- Arrays can be subgrouped after a specified length (`groupArraysAfterLength`)
- 40+ Base-16, popular community, and custom themes, plus support for custom `ThemeObject` palettes
- Native React 19 `<Suspense>` unwrapping for asynchronous data promises
- High performance virtualization (`withVirtualizer` plugin) for massive datasets
- When editing is enabled:
  - `Ctrl/Cmd+Click` Edit Mode
  - `Ctrl/Cmd+Enter` Submit

### Customizing Style

#### Stock Themes

`react-json-view-next` supports 40+ Base-16, popular community, and custom color themes!

You can specify a `theme` by name as a string:
```tsx
import { JsonViewer } from 'react-json-view-next';

<JsonViewer src={my_important_json} theme="monokai" />;
```

Or import individual themes for tree-shaking from `react-json-view-next/themes`:
```tsx
import { JsonViewer } from 'react-json-view-next';
import { monokai, dracula, nord, tokyonight } from 'react-json-view-next/themes';

<JsonViewer src={my_important_json} theme={dracula} />;
```

Check out the interactive theme showcase [in the Storybook demo](https://jericbas.github.io/react-json-view-next/?path=/docs/themes-base16themes--docs). The `"rjv-default"` theme applies by default.

#### Monokai Theme Example

![Monokai Theme Example](https://raw.githubusercontent.com/jericbas/react-json-view-next/main/doc/output-example-monokai-2.png "Base-16 Theme Example")

#### Solarized Theme Example

![Solarized Theme Example](https://raw.githubusercontent.com/jericbas/react-json-view-next/main/doc/output-example-solarized-2.png "Base-16 Theme Example")

#### Use Your Own Theme

You can supply your own custom Base-16 theme object matching the `ThemeObject` interface:

```tsx
import { JsonViewer, type ThemeObject } from 'react-json-view-next';

const myCustomTheme: ThemeObject = {
  scheme: 'cyberpunk',
  author: 'react-json-view-next',
  base00: '#000b1e', // Default Background
  base01: '#051937', // Lighter Background (used for status bars, line numbers)
  base02: '#0b2e59', // Selection Background
  base03: '#1a4980', // Comments, Invisibles, Line Highlighting
  base04: '#3273a8', // Dark Foreground (Used for status bars)
  base05: '#00e5ff', // Default Foreground, Caret, Delimiters, Operators
  base06: '#76ffff', // Light Foreground (Not often used)
  base07: '#ffffff', // Light Background (Not often used)
  base08: '#ff0055', // Variables, XML Tags, Markup Search, Diff Removed
  base09: '#ff7700', // Integers, Boolean, Constants, XML Attributes
  base0A: '#ffe600', // Classes, Markup Bold, Search Text Background
  base0B: '#00ff66', // Strings, Inherited Class, Markup Code, Diff Inserted
  base0C: '#00ffff', // Support, Regular Expressions, Escape Characters
  base0D: '#0088ff', // Functions, Methods, Attribute IDs, Headings
  base0E: '#cc00ff', // Keywords, Storage, Selector, Diff Changed
  base0F: '#ff00aa' // Deprecated, Opening/Closing Embedded Language Tags
};

<JsonViewer src={my_important_json} theme={myCustomTheme} />;
```

You can also pass inline styles to the outer container via the `style` prop:

```tsx
<JsonViewer
  src={my_important_json}
  theme={myCustomTheme}
  style={{
    padding: '1rem',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '13px'
  }}
/>;
```

For more details on the Base-16 color palette architecture, see the [Base-16 Theme Styling Guidelines](https://github.com/chriskempson/base16/blob/master/styling.md) and preview custom themes in our [Storybook CustomThemes Documentation](https://jericbas.github.io/react-json-view-next/?path=/docs/themes-customthemes--docs).

### onEdit, onAdd and onDelete Interaction

In `react-json-view-next`, interactive editing is decoupled into the tree-shakeable editor plugin:

```tsx
import { JsonViewer } from 'react-json-view-next';
import { withEditor, type InteractionProps } from 'react-json-view-next/plugins/editor';

<JsonViewer
  src={my_important_json}
  plugins={[
    withEditor({
      onEdit: (edit: InteractionProps) => {
        console.log('Node edited:', edit);
        // Return false to cancel the modification and keep existing value
        if (edit.new_value === '') return false;
      },
      onAdd: (add: InteractionProps) => {
        console.log('Key added:', add);
      },
      onDelete: (del: InteractionProps) => {
        console.log('Key deleted:', del);
      },
      validationMessage: 'Custom validation message when returning false'
    })
  ]}
/>;
```

If you are using the backward-compatible wrapper (`react-json-view-next/compat`), you can also pass them directly as props:

```tsx
import ReactJson, { type InteractionProps } from 'react-json-view-next/compat';

<ReactJson
  src={my_important_json}
  onEdit={(edit: InteractionProps) => console.log('Edited:', edit)}
  onAdd={(add: InteractionProps) => console.log('Added:', add)}
  onDelete={(del: InteractionProps) => console.log('Deleted:', del)}
/>;
```

#### Interaction Object Structure

The following typed `InteractionProps` object is passed to your callbacks:

```ts
interface InteractionProps {
  updated_src: object | unknown[]; // New JSON tree after the change
  existing_src: object | unknown[]; // Tree prior to the change
  name: string | number | null; // Key or index of the affected node
  namespace: Array<string | number | null>; // Path array indicating node depth & location
  new_value?: unknown; // New variable value (onEdit, onAdd)
  existing_value: unknown; // Existing variable value
}
```

Returning `false` from your `onEdit` callback will prevent the `src` from being updated and display the validation failure banner.

### Contributing to the source code

#### Run Storybook (Interactive Demo & Documentation)

```bash
# clone this repository
git clone git@github.com:jericbas/react-json-view-next.git && cd react-json-view-next
# install dependencies
npm install
# start the Storybook dev server with hot reloading
npm run storybook
```
Storybook will start the local development server at `http://localhost:6006` with interactive docs and stories.

#### Run the Production Library Build

```bash
# build the library (generates ESM, CJS, and .d.ts in packages/react-json-view-next/dist/)
npm run build
```

#### Run the Storybook Static Build

```bash
# build the static Storybook documentation site (into packages/storybook/storybook-static/)
npm run build:storybook
```
#### Testing

```bash
# Run unit and component test suite via Vitest
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run End-to-End tests via Playwright
npm run test:e2e
```

#### Linting & Formatting (Biome)

```bash
# Check formatting and lint rules with Biome
npm run check

# Automatically format and fix issues
npm run check:write
```

A zero-dependency Git pre-commit hook in `.githooks/pre-commit` runs `biome check` and `tsc --noEmit` automatically on staged files before each commit.

### Migration Guide (v1 -> v2)

> **Note on Versioning**: Version 1 (`v1.x`) refers to legacy `react-json-view` (final release `v1.21.3`). Version 2 (`v2.x`) begins with `react-json-view-next` starting at `v2.0.0`, delivering complete React 19 support, strict TypeScript definitions, and tree-shakeable plugins.

#### Zero-Code-Change Drop-in Bridge (`react-json-view-next/compat`)

If you are upgrading from legacy `react-json-view` v1 and want 100% backward compatibility without changing any props (`onEdit`, `onAdd`, `onDelete`, `enableClipboard`, Base16 string themes), simply change your import:

```tsx
// Before (v1)
import ReactJson from 'react-json-view';

// After (v2 zero-code-change drop-in)
import ReactJson from 'react-json-view-next/compat';

<ReactJson
  src={data}
  theme="monokai"
  enableClipboard={true}
  onEdit={edit => console.log(edit)}
  onAdd={add => console.log(add)}
  onDelete={del => console.log(del)}
/>;
```

#### Migration Table: Core vs Plugins vs Compat

| Feature / Prop                              | Legacy (v1)                         | Core (`react-json-view-next`)          | Recommended Modern Approach (v2)                                                                 | Compat (`react-json-view-next/compat`)                    |
| ------------------------------------------- | ----------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| **JSON Tree Viewing**                       | Built-in                            | Built-in (`<JsonViewer />`)            | `<JsonViewer src={data} />`                                                                      | `<ReactJsonCompat src={data} />`                          |
| **Clipboard (`enableClipboard`)**           | Prop `enableClipboard`              | Excluded for tree-shaking              | `plugins={[withClipboard()]}` from `react-json-view-next/plugins/clipboard`                      | Prop `enableClipboard` (auto-wired)                       |
| **Editing (`onEdit`, `onAdd`, `onDelete`)** | Props `onEdit`, `onAdd`, `onDelete` | Excluded for tree-shaking              | `plugins={[withEditor({ onEdit, onAdd, onDelete })]}` from `react-json-view-next/plugins/editor` | Props `onEdit`, `onAdd`, `onDelete` (auto-wired)          |
| **Themes (Base16 / Custom)**                | 40+ themes bundled                  | Zero-config `rjv-default` & `rjv-grey` | `import { monokai } from 'react-json-view-next/themes'` or custom `ThemeObject`                  | String theme names (e.g. `theme="monokai"`) auto-resolved |
| **Bundle Size**                             | ~150 kB+                            | ~15 kB (gzipped ~4 kB)                 | Pay only for plugins & themes you use                                                            | ~35 kB (bundles editor + clipboard + themes)              |
