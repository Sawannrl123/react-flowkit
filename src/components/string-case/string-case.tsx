import React from "react";

export type CaseType =
  | "uppercase"
  | "lowercase"
  | "sentencecase"
  | "titlecase"
  | "camelcase"
  | "pascalcase"
  | "kebabcase"
  | "snakecase";

export interface StringCaseProps {
  children: string;
  type: CaseType;
  /**
   * Optional delimiter to use for splitting the string.
   * If not provided, the component will try to detect the current case format.
   */
  delimiter?: string;
}

// Helper functions for case detection
const hasUpperCase = (str: string): boolean => /[A-Z]/.test(str);
const hasLowerCase = (str: string): boolean => /[a-z]/.test(str);
const hasDash = (str: string): boolean => str.includes("-");
const hasUnderscore = (str: string): boolean => str.includes("_");
const hasSpace = (str: string): boolean => str.includes(" ");

// Helper function to detect the current case of a string
export const detectCase = (str: string): CaseType | null => {
  if (!str) return null;

  // Check for common patterns
  if (hasUnderscore(str)) return "snakecase";
  if (hasDash(str)) return "kebabcase";

  if (hasSpace(str)) {
    // Check if all uppercase (with spaces)
    if (!hasLowerCase(str)) return "uppercase";

    // Check if title case
    const words = str.split(" ");
    const isTitleCase = words.every(
      (word) =>
        word.length > 0 &&
        word[0] === word[0].toUpperCase() &&
        (word.length === 1 || word.slice(1).toLowerCase() === word.slice(1))
    );
    if (isTitleCase) return "titlecase";

    // Check if sentence case
    const firstCharIsUpper = str.length > 0 && str[0] === str[0].toUpperCase();
    const restWords = str.split(" ").slice(1);
    const restLowercase = restWords.every(
      (word) => word === word.toLowerCase()
    );
    if (firstCharIsUpper && restLowercase) return "sentencecase";

    return "lowercase";
  }

  // No spaces, dashes or underscores
  if (!hasUpperCase(str)) return "lowercase";
  if (!hasLowerCase(str)) return "uppercase";

  // Check for camelCase or PascalCase
  if (str[0] === str[0].toUpperCase()) return "pascalcase";
  if (str[0] === str[0].toLowerCase() && hasUpperCase(str)) return "camelcase";

  return null;
};

// Helper functions for splitting strings based on their current case
export const splitByCase = (str: string, delimiter?: string): string[] => {
  if (!str) return [];
  if (delimiter) return str.split(delimiter).filter(Boolean);

  const caseType = detectCase(str);

  switch (caseType) {
    case "snakecase":
      return str.split("_").filter(Boolean);
    case "kebabcase":
      return str.split("-").filter(Boolean);
    case "camelcase":
    case "pascalcase":
      return str
        .replace(/([A-Z])/g, " $1")
        .trim()
        .split(" ")
        .filter(Boolean);
    case "titlecase":
    case "sentencecase":
    case "uppercase":
    case "lowercase":
      return str.split(" ").filter(Boolean);
    default:
      // If we can't detect the case, just return the string as a single word
      return [str];
  }
};

// Helper functions for converting string to different case types
export const toUpperCase = (str: string): string => str.toUpperCase();

export const toLowerCase = (str: string): string => str.toLowerCase();

export const toSentenceCase = (str: string, delimiter?: string): string => {
  if (!str) return str;

  const parts = splitByCase(str, delimiter);
  if (parts.length <= 1) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const joined = parts.map((part) => part.toLowerCase()).join(" ");
  return joined.charAt(0).toUpperCase() + joined.slice(1);
};

export const toTitleCase = (str: string, delimiter?: string): string => {
  if (!str) return str;

  const parts = splitByCase(str, delimiter);
  return parts
    .map((part) => {
      if (part.length === 0) return "";
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(" ");
};

export const toCamelCase = (str: string, delimiter?: string): string => {
  if (!str) return str;

  const parts = splitByCase(str, delimiter);
  if (parts.length <= 1) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  return parts
    .map((part, index) =>
      index === 0
        ? part.toLowerCase()
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join("");
};

export const toPascalCase = (str: string, delimiter?: string): string => {
  if (!str) return str;

  const parts = splitByCase(str, delimiter);
  return parts
    .map((part) => {
      if (part.length === 0) return "";
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("");
};

export const toKebabCase = (str: string, delimiter?: string): string => {
  if (!str) return str;

  const parts = splitByCase(str, delimiter);
  return parts.map((part) => part.toLowerCase()).join("-");
};

export const toSnakeCase = (str: string, delimiter?: string): string => {
  if (!str) return str;

  const parts = splitByCase(str, delimiter);
  return parts.map((part) => part.toLowerCase()).join("_");
};

// Function to check if string is already in the desired case format
export const isInCase = (str: string, targetCase: CaseType): boolean => {
  if (!str) return false;

  const currentCase = detectCase(str);
  return currentCase === targetCase;
};

/**
 * StringCase component converts a string into the specified case format.
 *
 * @example
 * ```jsx
 * <StringCase type="titlecase">hello world</StringCase> // Returns "Hello World"
 * <StringCase type="snakecase" delimiter="-">hello-world</StringCase> // Returns "hello_world"
 * ```
 */
export function StringCase({
  children,
  type,
  delimiter,
}: StringCaseProps): React.ReactNode {
  if (typeof children !== "string") {
    console.warn("StringCase: children must be a string");
    return children;
  }

  // Check if the string is already in the desired format
  if (isInCase(children, type) && !delimiter) {
    return children;
  }

  const transformedText = React.useMemo(() => {
    switch (type) {
      case "uppercase":
        return toUpperCase(children);
      case "lowercase":
        return toLowerCase(children);
      case "sentencecase":
        return toSentenceCase(children, delimiter);
      case "titlecase":
        return toTitleCase(children, delimiter);
      case "camelcase":
        return toCamelCase(children, delimiter);
      case "pascalcase":
        return toPascalCase(children, delimiter);
      case "kebabcase":
        return toKebabCase(children, delimiter);
      case "snakecase":
        return toSnakeCase(children, delimiter);
      default:
        console.warn(`StringCase: Unknown case type "${type}"`);
        return children;
    }
  }, [children, type, delimiter]);

  return transformedText;
}
