import type { Meta, StoryObj } from "@storybook/react";
import { IfElse, If, Else } from "../src";
import React from "react";

const meta = {
  title: "IfElse",
  component: IfElse,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IfElse>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example with condition true
export const ConditionTrue: Story = {
  args: {
    condition: true,
    if: (
      <div style={{ padding: "10px", color: "green" }}>Condition is true</div>
    ),
    else: (
      <div style={{ padding: "10px", color: "red" }}>Condition is false</div>
    ),
  },
};

// Basic example with condition false
export const ConditionFalse: Story = {
  args: {
    condition: false,
    if: (
      <div style={{ padding: "10px", color: "green" }}>Condition is true</div>
    ),
    else: (
      <div style={{ padding: "10px", color: "red" }}>Condition is false</div>
    ),
  },
};

// Using child components approach
export const WithChildComponents: Story = {
  args: {
    condition: true,
  },
  render: () => (
    <IfElse condition={true}>
      <If>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#e6f7ff",
            borderRadius: "4px",
          }}
        >
          <h3>Welcome, User!</h3>
          <p>You are logged in.</p>
        </div>
      </If>
      <Else>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff1f0",
            borderRadius: "4px",
          }}
        >
          <h3>Hello, Guest!</h3>
          <p>Please log in to continue.</p>
        </div>
      </Else>
    </IfElse>
  ),
};

// Standalone If component
export const StandaloneIf: Story = {
  args: {
    condition: true,
  },
  render: () => (
    <div>
      <If condition={true}>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f6ffed",
            borderRadius: "4px",
          }}
        >
          This content is shown because the condition is true.
        </div>
      </If>
      <div style={{ marginTop: "10px" }}>This content is always shown.</div>
    </div>
  ),
};
