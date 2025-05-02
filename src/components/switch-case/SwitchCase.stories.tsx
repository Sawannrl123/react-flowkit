import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SwitchCase, Case, Default } from ".";

const meta = {
  title: "SwitchCase",
  component: SwitchCase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SwitchCase>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example with a static case
export const BasicExample: Story = {
  args: {
    value: "success",
    children: [
      <Case key="loading" value="loading">
        Loading...
      </Case>,
      <Case key="error" value="error">
        An error occurred!
      </Case>,
      <Case key="success" value="success">
        Data loaded successfully!
      </Case>,
    ],
  },
};

// Example with default prop
export const WithDefaultProp: Story = {
  args: {
    value: "other",
    default: <div style={{ color: "gray" }}>Unknown value selected</div>,
    children: [
      <Case key="one" value="one">
        Option One
      </Case>,
      <Case key="two" value="two">
        Option Two
      </Case>,
      <Case key="three" value="three">
        Option Three
      </Case>,
    ],
  },
};

// Interactive examples using decorators for state
export const StatusExample: React.FC = () => {
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");

  return (
    <div style={{ width: "300px" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setStatus("loading")}
          style={{ padding: "5px 10px" }}
        >
          Loading
        </button>
        <button
          onClick={() => setStatus("success")}
          style={{ padding: "5px 10px" }}
        >
          Success
        </button>
        <button
          onClick={() => setStatus("error")}
          style={{ padding: "5px 10px" }}
        >
          Error
        </button>
        <button
          onClick={() => setStatus("idle")}
          style={{ padding: "5px 10px" }}
        >
          Idle
        </button>
      </div>
      <div
        style={{
          padding: "20px",
          border: "1px solid #eee",
          borderRadius: "8px",
        }}
      >
        <div>
          Current status: <strong>{status}</strong>
        </div>
        <div style={{ marginTop: "10px" }}>
          <SwitchCase value={status}>
            <Case value="loading">
              <div style={{ color: "blue" }}>
                Loading your data, please wait...
              </div>
            </Case>
            <Case value="success">
              <div style={{ color: "green" }}>
                Your data was loaded successfully!
              </div>
            </Case>
            <Case value="error">
              <div style={{ color: "red" }}>
                An error occurred while loading your data.
              </div>
            </Case>
            <Case value="idle">
              <div style={{ color: "gray" }}>
                Waiting for you to take an action.
              </div>
            </Case>
          </SwitchCase>
        </div>
      </div>
    </div>
  );
};

// Example with Default component
export const WithDefaultComponent: React.FC = () => {
  const [fruit, setFruit] = useState<"apple" | "banana" | "orange" | "other">(
    "other"
  );

  return (
    <div style={{ width: "300px" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setFruit("apple")}
          style={{ padding: "5px 10px" }}
        >
          Apple
        </button>
        <button
          onClick={() => setFruit("banana")}
          style={{ padding: "5px 10px" }}
        >
          Banana
        </button>
        <button
          onClick={() => setFruit("orange")}
          style={{ padding: "5px 10px" }}
        >
          Orange
        </button>
        <button
          onClick={() => setFruit("other")}
          style={{ padding: "5px 10px" }}
        >
          Other
        </button>
      </div>
      <div
        style={{
          padding: "20px",
          border: "1px solid #eee",
          borderRadius: "8px",
        }}
      >
        <div>
          Selected fruit: <strong>{fruit}</strong>
        </div>
        <div style={{ marginTop: "10px" }}>
          <SwitchCase value={fruit}>
            <Case value="apple">
              <div style={{ color: "red" }}>🍎 Apples are red and crunchy.</div>
            </Case>
            <Case value="banana">
              <div style={{ color: "#FFD700" }}>
                🍌 Bananas are yellow and soft.
              </div>
            </Case>
            <Case value="orange">
              <div style={{ color: "orange" }}>
                🍊 Oranges are orange and juicy.
              </div>
            </Case>
            <Default>
              <div style={{ color: "purple" }}>Unknown fruit selected.</div>
            </Default>
          </SwitchCase>
        </div>
      </div>
    </div>
  );
};
