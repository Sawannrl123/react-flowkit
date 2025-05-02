import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import { ForEach } from "./for-each";

// Ensure tests are isolated
afterEach(() => {
  cleanup();
});

describe("ForEach", () => {
  test("renders each item in the array", () => {
    const data = ["Item 1", "Item 2", "Item 3"];

    render(
      <ForEach data={data}>
        {(item) => <div data-testid="item">{item}</div>}
      </ForEach>
    );

    const items = screen.getAllByTestId("item");
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe("Item 1");
    expect(items[1].textContent).toBe("Item 2");
    expect(items[2].textContent).toBe("Item 3");
  });

  test("handles empty arrays", () => {
    const data: string[] = [];

    const { container } = render(
      <ForEach data={data}>
        {(item) => <div data-testid="item">{item}</div>}
      </ForEach>
    );

    const items = screen.queryAllByTestId("item");
    expect(items.length).toBe(0);
    // The component should not render anything for an empty array
    expect(container.firstChild).toBeNull();
  });

  test("provides index to the render function", () => {
    const data = ["A", "B", "C"];

    render(
      <ForEach data={data}>
        {(item, index) => (
          <div data-testid={`item-${index}`}>{`${index}: ${item}`}</div>
        )}
      </ForEach>
    );

    expect(screen.getByTestId("item-0").textContent).toBe("0: A");
    expect(screen.getByTestId("item-1").textContent).toBe("1: B");
    expect(screen.getByTestId("item-2").textContent).toBe("2: C");
  });

  test("works with objects in the array", () => {
    const data = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    render(
      <ForEach data={data}>
        {(item) => <div data-testid={`user-${item.id}`}>{item.name}</div>}
      </ForEach>
    );

    expect(screen.getByTestId("user-1").textContent).toBe("Alice");
    expect(screen.getByTestId("user-2").textContent).toBe("Bob");
    expect(screen.getByTestId("user-3").textContent).toBe("Charlie");
  });
});
