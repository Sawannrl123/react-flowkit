import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StringCase, detectCase } from ".";

const meta = {
  title: "StringCase",
  component: StringCase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StringCase>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example for each case type
export const UpperCase: Story = {
  args: {
    children: "hello world",
    type: "uppercase",
  },
};

export const LowerCase: Story = {
  args: {
    children: "HELLO WORLD",
    type: "lowercase",
  },
};

export const SentenceCase: Story = {
  args: {
    children: "hello world example",
    type: "sentencecase",
  },
};

export const TitleCase: Story = {
  args: {
    children: "hello world example",
    type: "titlecase",
  },
};

export const CamelCase: Story = {
  args: {
    children: "Hello World Example",
    type: "camelcase",
  },
};

export const PascalCase: Story = {
  args: {
    children: "hello world example",
    type: "pascalcase",
  },
};

export const KebabCase: Story = {
  args: {
    children: "Hello World Example",
    type: "kebabcase",
  },
};

export const SnakeCase: Story = {
  args: {
    children: "Hello World Example",
    type: "snakecase",
  },
};

// With custom delimiter examples
export const WithDelimiter: Story = {
  args: {
    children: "hello|world|example",
    type: "pascalcase",
    delimiter: "|",
  },
  name: "With Custom Delimiter",
};

export const AutoDetectAndConvert: Story = {
  args: {
    children: "PascalCaseString",
    type: "snakecase",
  },
  name: "Auto-detect PascalCase to snake_case",
};

// Interactive demo
export const InteractiveDemo: Story = {
  args: {
    children: "Hello World Example",
    type: "titlecase",
    delimiter: "",
  },
  render: () => {
    const [text, setText] = React.useState("Hello World Example");
    const [caseType, setCaseType] = React.useState<
      | "uppercase"
      | "lowercase"
      | "sentencecase"
      | "titlecase"
      | "camelcase"
      | "pascalcase"
      | "kebabcase"
      | "snakecase"
    >("titlecase");
    const [delimiter, setDelimiter] = React.useState<string>("");
    const detectedCase = React.useMemo(() => detectCase(text), [text]);

    return (
      <div
        style={{
          width: "400px",
          padding: "20px",
          border: "1px solid #eee",
          borderRadius: "8px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Input Text:
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          />
          {detectedCase && (
            <div style={{ marginTop: "4px", fontSize: "12px", color: "#666" }}>
              Detected format: {detectedCase}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Case Type:
          </label>
          <select
            value={caseType}
            onChange={(e) => setCaseType(e.target.value as any)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          >
            <option value="uppercase">UPPERCASE</option>
            <option value="lowercase">lowercase</option>
            <option value="sentencecase">Sentence case</option>
            <option value="titlecase">Title Case</option>
            <option value="camelcase">camelCase</option>
            <option value="pascalcase">PascalCase</option>
            <option value="kebabcase">kebab-case</option>
            <option value="snakecase">snake_case</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Custom Delimiter (optional):
          </label>
          <input
            type="text"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            placeholder="e.g. |, /, :"
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          />
          <div style={{ marginTop: "4px", fontSize: "12px", color: "#666" }}>
            Leave empty for automatic case detection
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Result:</div>
          <div
            style={{
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              fontFamily: "monospace",
              wordBreak: "break-all",
            }}
          >
            <StringCase type={caseType} delimiter={delimiter || undefined}>
              {text}
            </StringCase>
          </div>
        </div>

        <div style={{ fontSize: "14px", color: "#666" }}>
          <strong>Note:</strong> StringCase component automatically detects the
          current case format and transforms it to the selected case. You can
          also specify a custom delimiter.
        </div>
      </div>
    );
  },
};
