# React FlowKit

A lightweight React library that provides convenient components for declarative flow control in React applications.

## Features

- **IfElse** - Declarative conditional rendering
- **SwitchCase** - Component-based switch statements
- **ForEach** - Simplified iteration over arrays
- **GitBranchVersion** - Visual indicator for development branches

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
```

### Switch-Case Component

```jsx
import { SwitchCase, Case } from 'react-flowkit';

<SwitchCase value={status}>
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

### GitBranchVersion Component

```jsx
import { GitBranchVersion } from 'react-flowkit';

// Show current git branch and app version in non-production branches
<GitBranchVersion 
  position="bottomLeft"
  backgroundColor="rgba(0, 0, 0, 0.7)"
  textColor="white"
  showVersion={true}
/>

// Or with manual values (if not using current-git-branch)
<GitBranchVersion 
  gitBranch="feature/new-component"
  appVersion="1.2.0"
/>
```

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
