// Individual component exports for better tree shaking
export { ForEach } from "./components/for-each";
export { IfElse, If, Else } from "./components/if-else";
export { SwitchCase, Case, Default } from "./components/switch-case";
export {
  StringCase,
  type CaseType,
  // Individual utility functions
  toUpperCase,
  toLowerCase,
  toSentenceCase,
  toTitleCase,
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toSnakeCase,
  // Case detection utilities
  detectCase,
  isInCase,
  splitByCase,
} from "./components/string-case";
