import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import { IfElse, If, Else } from "./if-else";

// Ensure tests are isolated
afterEach(() => {
  cleanup();
});

describe("IfElse", () => {
  // Testing IfElse with children approach
  test("renders If block when condition is true with children approach", () => {
    render(
      <IfElse condition={true}>
        <If>
          <div data-testid="if-content">If Content</div>
        </If>
        <Else>
          <div data-testid="else-content">Else Content</div>
        </Else>
      </IfElse>
    );

    expect(screen.getByTestId("if-content")).toBeInTheDocument();
    expect(screen.queryByTestId("else-content")).not.toBeInTheDocument();
  });

  test("renders Else block when condition is false with children approach", () => {
    render(
      <IfElse condition={false}>
        <If>
          <div data-testid="if-content">If Content</div>
        </If>
        <Else>
          <div data-testid="else-content">Else Content</div>
        </Else>
      </IfElse>
    );

    expect(screen.queryByTestId("if-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("else-content")).toBeInTheDocument();
  });

  // Testing IfElse with props approach
  test("renders if prop when condition is true", () => {
    render(
      <IfElse
        condition={true}
        if={<div data-testid="if-prop-content">If Content</div>}
        else={<div data-testid="else-prop-content">Else Content</div>}
      />
    );

    expect(screen.getByTestId("if-prop-content")).toBeInTheDocument();
    expect(screen.queryByTestId("else-prop-content")).not.toBeInTheDocument();
  });

  test("renders else prop when condition is false", () => {
    render(
      <IfElse
        condition={false}
        if={<div data-testid="if-prop-content">If Content</div>}
        else={<div data-testid="else-prop-content">Else Content</div>}
      />
    );

    expect(screen.queryByTestId("if-prop-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("else-prop-content")).toBeInTheDocument();
  });

  // Testing standalone If component
  test("renders If component when condition is true", () => {
    render(
      <If condition={true}>
        <div data-testid="standalone-if-content">If Content</div>
      </If>
    );

    expect(screen.getByTestId("standalone-if-content")).toBeInTheDocument();
  });

  test("doesn't render If component when condition is false", () => {
    render(
      <If condition={false}>
        <div data-testid="standalone-if-content">If Content</div>
      </If>
    );

    expect(
      screen.queryByTestId("standalone-if-content")
    ).not.toBeInTheDocument();
  });

  // Test when only If or only Else is used
  test("renders only If without Else when condition is true", () => {
    render(
      <IfElse condition={true}>
        <If>
          <div data-testid="if-only-content">If Content</div>
        </If>
      </IfElse>
    );

    expect(screen.getByTestId("if-only-content")).toBeInTheDocument();
  });

  test("doesn't render anything when only If is present but condition is false", () => {
    const { container } = render(
      <IfElse condition={false}>
        <If>
          <div data-testid="if-only-content">If Content</div>
        </If>
      </IfElse>
    );

    expect(screen.queryByTestId("if-only-content")).not.toBeInTheDocument();
    // Check that the container is empty (different approach)
    expect(container.firstChild).toBeFalsy();
  });

  test("renders only Else without If when condition is false", () => {
    render(
      <IfElse condition={false}>
        <Else>
          <div data-testid="else-only-content">Else Content</div>
        </Else>
      </IfElse>
    );

    expect(screen.getByTestId("else-only-content")).toBeInTheDocument();
  });
});
