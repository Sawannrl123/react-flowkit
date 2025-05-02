import { render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { StringCase, detectCase, isInCase } from "./string-case";

describe("StringCase", () => {
  // Mock console.warn
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const testCases = [
    { type: "uppercase", input: "hello world", expected: "HELLO WORLD" },
    { type: "lowercase", input: "HELLO WORLD", expected: "hello world" },
    {
      type: "sentencecase",
      input: "hello world example",
      expected: "Hello world example",
    },
    {
      type: "titlecase",
      input: "hello world example",
      expected: "Hello World Example",
    },
    {
      type: "camelcase",
      input: "Hello World Example",
      expected: "helloWorldExample",
    },
    {
      type: "pascalcase",
      input: "hello world example",
      expected: "HelloWorldExample",
    },
    {
      type: "kebabcase",
      input: "Hello World Example",
      expected: "hello-world-example",
    },
    {
      type: "snakecase",
      input: "Hello World Example",
      expected: "hello_world_example",
    },
  ] as const;

  testCases.forEach(({ type, input, expected }) => {
    test(`transforms string to ${type}`, () => {
      const { container } = render(
        <StringCase type={type}>{input}</StringCase>
      );
      expect(container.textContent).toBe(expected);
    });
  });

  test("handles non-string children with warning", () => {
    const { container } = render(
      <StringCase type="uppercase">{123 as any}</StringCase>
    );

    expect(console.warn).toHaveBeenCalledWith(
      "StringCase: children must be a string"
    );
    expect(container.textContent).toBe("123");
  });

  test("handles unknown case type with warning", () => {
    const { container } = render(
      <StringCase type={"unknownCase" as any}>hello world</StringCase>
    );

    expect(console.warn).toHaveBeenCalledWith(
      'StringCase: Unknown case type "unknownCase"'
    );
    expect(container.textContent).toBe("hello world");
  });

  test("correctly uses custom delimiter", () => {
    const { container } = render(
      <StringCase type="pascalcase" delimiter="|">
        hello|world|example
      </StringCase>
    );
    expect(container.textContent).toBe("HelloWorldExample");
  });

  test("automatically detects case and converts correctly", () => {
    const { container } = render(
      <StringCase type="snakecase">HelloWorldExample</StringCase>
    );
    expect(container.textContent).toBe("hello_world_example");
  });

  test("does nothing if string is already in desired case", () => {
    const input = "hello_world_example";
    const { container } = render(
      <StringCase type="snakecase">{input}</StringCase>
    );
    expect(container.textContent).toBe(input);
  });
});

describe("detectCase", () => {
  test("detects uppercase", () => {
    expect(detectCase("HELLO WORLD")).toBe("uppercase");
  });

  test("detects lowercase", () => {
    expect(detectCase("hello world")).toBe("lowercase");
  });

  test("detects sentence case", () => {
    expect(detectCase("Hello world")).toBe("sentencecase");
  });

  test("detects title case", () => {
    expect(detectCase("Hello World")).toBe("titlecase");
  });

  test("detects camelCase", () => {
    expect(detectCase("helloWorld")).toBe("camelcase");
  });

  test("detects PascalCase", () => {
    expect(detectCase("HelloWorld")).toBe("pascalcase");
  });

  test("detects kebab-case", () => {
    expect(detectCase("hello-world")).toBe("kebabcase");
  });

  test("detects snake_case", () => {
    expect(detectCase("hello_world")).toBe("snakecase");
  });

  test("returns null for empty string", () => {
    expect(detectCase("")).toBe(null);
  });
});

describe("isInCase", () => {
  test("correctly identifies if string is already in target case", () => {
    expect(isInCase("hello_world", "snakecase")).toBe(true);
    expect(isInCase("HelloWorld", "pascalcase")).toBe(true);
    expect(isInCase("HelloWorld", "snakecase")).toBe(false);
  });
});
