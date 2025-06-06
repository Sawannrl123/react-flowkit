# React FlowKit

![npm version](https://img.shields.io/npm/v/react-flowkit.svg)
![npm downloads](https://img.shields.io/npm/dm/react-flowkit.svg)
![bundle size](https://img.shields.io/bundlephobia/minzip/react-flowkit)
![license](https://img.shields.io/npm/l/react-flowkit.svg)
![GitHub stars](https://img.shields.io/github/stars/Sawannrl123/react-flowkit.svg)
![GitHub forks](https://img.shields.io/github/forks/Sawannrl123/react-flowkit.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)

A lightweight React library that provides convenient components for declarative flow control in React applications. React FlowKit transforms how you handle conditional rendering, iterations, and flow control with a clean, component-based approach.

## Why Choose React FlowKit?

- 🌲 **Tree Shakable** - Only include what you actually use thanks to full tree-shaking support
- 🔍 **TypeScript Support** - Complete type definitions out of the box
- 📦 **Tiny Size** - Small bundle footprint for optimal performance
- 🚀 **Enhanced Developer Experience** - Cleaner, more readable flow control

## Features

- **IfElse** - Declarative conditional rendering
- **SwitchCase** - Component-based switch statements
- **ForEach** - Simplified iteration over arrays
- **StringCase** - Transform text to different case formats

## Installation

```bash
npm install react-flowkit
# or
yarn add react-flowkit
# or
pnpm install react-flowkit
```

## Usage

### If-Else Component

```jsx
import { IfElse, If, Else } from 'react-flowkit';

// Method 1: Using children
<IfElse condition={isLoggedIn}>
  <If>Welcome, User!</If>
  <Else>Please log in</Else>
</IfElse>

// Method 2: Using props
<IfElse 
  condition={isLoggedIn}
  if={<div>Welcome, User!</div>} 
  else={<div>Please log in</div>} 
/>

// Method 3: Only If
<If condition={isLoggedIn}>Welcome, User!</If>
```

### Switch-Case Component

```jsx
import { SwitchCase, Case, Default } from 'react-flowkit';

<SwitchCase value={status}>
  <Case value="loading">Loading...</Case>
  <Case value="error">An error occurred!</Case>
  <Case value="success">Data loaded successfully!</Case>
  <Default>Unknown status</Default>
</SwitchCase>

// Alternative approach using default prop
<SwitchCase 
  value={status}
  default={<div>Unknown status</div>}
>
  <Case value="loading">Loading...</Case>
  <Case value="error">An error occurred!</Case>
  <Case value="success">Data loaded successfully!</Case>
</SwitchCase>
```

### ForEach Component

```jsx
import { ForEach } from 'react-flowkit';

<ForEach data={users}>
  {(user, index) => (
    <div key={user.id}>
      {index + 1}. {user.name}
    </div>
  )}
</ForEach>
```

### StringCase Component

```jsx
import { StringCase } from 'react-flowkit';

// Transform to different cases
<StringCase type="uppercase">hello world</StringCase> // "HELLO WORLD"
<StringCase type="lowercase">HELLO WORLD</StringCase> // "hello world"
<StringCase type="sentencecase">hello world</StringCase> // "Hello world"
<StringCase type="titlecase">hello world</StringCase> // "Hello World"
<StringCase type="camelcase">Hello World</StringCase> // "helloWorld"
<StringCase type="pascalcase">hello world</StringCase> // "HelloWorld"
<StringCase type="kebabcase">Hello World</StringCase> // "hello-world"
<StringCase type="snakecase">Hello World</StringCase> // "hello_world"

// Using custom delimiter
<StringCase type="camelcase" delimiter="-">custom-delimiter-string</StringCase> // "customDelimiterString"
<StringCase type="pascalcase" delimiter="_">custom_delimiter_string</StringCase> // "CustomDelimiterString"
<StringCase type="titlecase" delimiter=".">custom.delimiter.string</StringCase> // "Custom Delimiter String"
<StringCase type="snakecase" delimiter=" ">custom delimiter string</StringCase> // "custom_delimiter_string"
```

## Comparison with Traditional Approaches

| Feature | Traditional React | React FlowKit |
|---------|------------------|--------------|
| Conditional Rendering | `{condition && <Component />}` or ternary operator | `<IfElse condition={...}>` components |
| Switch Statements | IIFE with switch-case | `<SwitchCase>` component |
| List Rendering | Array.map() | `<ForEach>` component |
| Text Case Transformation | Utility functions | `<StringCase>` component |
| Code Readability | Mixed JSX and JS logic | Clear, declarative components |

## Benefits Summary

- ✅ **Declarative** - Component-based flow control instead of JavaScript expressions
- ✅ **Maintainable** - Easier to read and maintain as applications grow
- ✅ **Lightweight** - Minimal bundle impact due to tree-shaking support
- ✅ **Type-Safe** - Full TypeScript support for improved developer experience
- ✅ **Minimal Dependencies** - Just one dependency (and only if you use GitBranchVersion)
- ✅ **Modern** - Built for current React paradigms
- ✅ **Versatile** - Works with all React projects

## Development

Clone the repository:

```bash
git clone https://github.com/Sawannrl123/react-flowkit.git
cd react-flowkit
```

Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Run development mode:

```bash
pnpm dev
```

Build the library:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

Run Storybook:

```bash
pnpm storybook
```

Build Storybook:

```bash
pnpm build:storybook
```

## License

MIT

## Contributors

- [Sawan Kumar](https://github.com/Sawannrl123) - Creator and maintainer
- [Varad Prabhu](https://github.com/vaxad) - Contributor
  - [LinkedIn](https://www.linkedin.com/in/varadprabhu/)
  - [Portfolio](https://www.vaxad.me/)

Special thanks to [Varad](https://www.vaxad.me/) for his valuable contributions to this project!
