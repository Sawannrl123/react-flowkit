import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ForEach } from "../src";

// Define a more specific meta type with generics
const meta = {
  title: "ForEach",
  component: ForEach,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ForEach>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for our story
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" },
];

// We need to create proper stories with args
export const UserList: Story = {
  args: {
    data: users,
    children: (user: any, index: number) => null, // This will be overridden in render
  },
  render: () => (
    <ForEach data={users}>
      {(user, index) => (
        <div
          style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}
        >
          <div style={{ fontWeight: "bold" }}>
            {index + 1}. {user.name}
          </div>
          <div>{user.email}</div>
        </div>
      )}
    </ForEach>
  ),
};

export const NumberList: Story = {
  args: {
    data: [1, 2, 3, 4, 5],
    children: (data: unknown, index: number) => null, // This will be overridden in render
  },
  render: () => (
    <ForEach data={[1, 2, 3, 4, 5]}>
      {(num) => (
        <div
          style={{
            margin: "5px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {num}
        </div>
      )}
    </ForEach>
  ),
};

export const EmptyList: Story = {
  args: {
    data: [],
    children: (_item: any, _index: number) => null, // This will be overridden in render
  },
  render: () => (
    <ForEach data={[]}>
      {(_item, _index) => (
        <div>This item won't be rendered as the list is empty</div>
      )}
    </ForEach>
  ),
};
