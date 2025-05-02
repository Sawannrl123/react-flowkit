import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { SwitchCase, Case, Default } from "./switch-case";

// Ensure tests are properly isolated
afterEach(() => {
  cleanup();
  document.body.innerHTML = ""; // Additional cleanup step
});

describe("SwitchCase", () => {
  test("renders matching Case component", () => {
    const { container } = render(
      <SwitchCase value="success">
        <Case value="loading">
          <div data-testid="loading">Loading...</div>
        </Case>
        <Case value="success">
          <div data-testid="success">Success!</div>
        </Case>
        <Case value="error">
          <div data-testid="error">Error!</div>
        </Case>
      </SwitchCase>
    );

    expect(screen.getByTestId("success")).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });

  test("doesn't render any Case when no match is found", () => {
    const { container } = render(
      <SwitchCase value="unknown">
        <Case value="loading">
          <div data-testid="loading">Loading...</div>
        </Case>
        <Case value="success">
          <div data-testid="success">Success!</div>
        </Case>
        <Case value="error">
          <div data-testid="error">Error!</div>
        </Case>
      </SwitchCase>
    );

    expect(screen.queryByTestId("success")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });

  test("renders Default component when no matching Case is found", () => {
    const { container } = render(
      <SwitchCase value="unknown">
        <Case value="loading">
          <div data-testid="loading">Loading...</div>
        </Case>
        <Case value="success">
          <div data-testid="success">Success!</div>
        </Case>
        <Default>
          <div data-testid="default">Unknown status</div>
        </Default>
      </SwitchCase>
    );

    expect(screen.getByTestId("default")).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("success")).not.toBeInTheDocument();
  });

  test("doesn't render Default component when a matching Case is found", () => {
    // Complete cleanup before this test
    cleanup();
    document.body.innerHTML = "";

    const { container } = render(
      <SwitchCase value="success">
        <Case value="loading">
          <div data-testid="loading">Loading...</div>
        </Case>
        <Case value="success">
          <div data-testid="success-match">Success!</div>
        </Case>
        <Default>
          <div data-testid="default-match">Unknown status</div>
        </Default>
      </SwitchCase>
    );

    expect(screen.getByTestId("success-match")).toBeInTheDocument();
    expect(screen.queryByTestId("default-match")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  test("renders default prop when no matching Case is found", () => {
    const { container } = render(
      <SwitchCase
        value="unknown"
        default={<div data-testid="default-prop">Default prop</div>}
      >
        <Case value="loading">
          <div data-testid="loading">Loading...</div>
        </Case>
        <Case value="success">
          <div data-testid="success">Success!</div>
        </Case>
      </SwitchCase>
    );

    expect(screen.getByTestId("default-prop")).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("success")).not.toBeInTheDocument();
  });

  test("works with numeric values", () => {
    // Complete cleanup before this test
    cleanup();
    document.body.innerHTML = "";

    const { container } = render(
      <SwitchCase value={2}>
        <Case value={1}>
          <div data-testid="one">One</div>
        </Case>
        <Case value={2}>
          <div data-testid="two">Two</div>
        </Case>
        <Case value={3}>
          <div data-testid="three">Three</div>
        </Case>
        <Default>
          <div data-testid="default-num">Default</div>
        </Default>
      </SwitchCase>
    );

    expect(screen.getByTestId("two")).toBeInTheDocument();
    expect(screen.queryByTestId("one")).not.toBeInTheDocument();
    expect(screen.queryByTestId("three")).not.toBeInTheDocument();
    expect(screen.queryByTestId("default-num")).not.toBeInTheDocument();
  });

  test("re-evaluates cases when value changes", () => {
    const TestComponent = ({ status }: { status: string }) => (
      <SwitchCase value={status}>
        <Case value="loading">
          <div data-testid="loading-status">Loading...</div>
        </Case>
        <Case value="success">
          <div data-testid="success-status">Success!</div>
        </Case>
        <Default>
          <div data-testid="default-status">Unknown status</div>
        </Default>
      </SwitchCase>
    );

    const { rerender } = render(<TestComponent status="loading" />);
    expect(screen.getByTestId("loading-status")).toBeInTheDocument();

    // Change the status to success
    rerender(<TestComponent status="success" />);
    expect(screen.getByTestId("success-status")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-status")).not.toBeInTheDocument();

    // Change to an unknown status
    rerender(<TestComponent status="unknown" />);
    expect(screen.getByTestId("default-status")).toBeInTheDocument();
    expect(screen.queryByTestId("success-status")).not.toBeInTheDocument();
  });

  test("throws error when Case is used outside of SwitchCase", () => {
    // Silence the error console during this test
    const consoleSpy = vi.spyOn(console, "error");
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      render(
        <Case value="test">
          <div>Test</div>
        </Case>
      );
    }).toThrow("Case must be used within a SwitchCase component");

    consoleSpy.mockRestore();
  });

  test("throws error when Default is used outside of SwitchCase", () => {
    // Silence the error console during this test
    const consoleSpy = vi.spyOn(console, "error");
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      render(
        <Default>
          <div>Default</div>
        </Default>
      );
    }).toThrow("Default must be used within a SwitchCase component");

    consoleSpy.mockRestore();
  });
});
