import React, { ReactNode, createContext, useContext } from "react";

// Create a simple context to check if Case/Default are within a SwitchCase
const SwitchCaseContext = createContext<boolean>(false);
interface DefaultProps {
  children: ReactNode;
}
interface CaseProps extends DefaultProps {
  value: any;
}
interface SwitchCaseProps extends CaseProps {
  default?: ReactNode;
}

export function SwitchCase({
  value,
  children,
  default: defaultContent,
}: SwitchCaseProps) {
  // Track if any Case has matched
  let hasMatch = false;
  let renderedContent: React.ReactNode = null;
  let hasDefaultComponent = false;

  // Process children to find matches and default components
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    // Handle Case components
    if (child.type === Case) {
      if (
        React.isValidElement<CaseProps>(child) &&
        child.props.value === value &&
        !hasMatch
      ) {
        hasMatch = true;
        renderedContent = (child.props as { children: ReactNode }).children;
      }
    }
    // Check for Default component
    else if (child.type === Default) {
      hasDefaultComponent = true;
    }
  });

  // If no match found, look for a Default component
  if (!hasMatch && hasDefaultComponent) {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Default) {
        renderedContent = (child.props as { children: ReactNode }).children;
      }
    });
  }

  // If no match and no Default component, use the defaultContent
  if (!hasMatch && !hasDefaultComponent && defaultContent) {
    renderedContent = defaultContent;
  }

  return (
    <SwitchCaseContext.Provider value={true}>
      {renderedContent}
    </SwitchCaseContext.Provider>
  );
}

export function Case() {
  const insideSwitchCase = useContext(SwitchCaseContext);

  if (!insideSwitchCase) {
    throw new Error("Case must be used within a SwitchCase component");
  }

  // This component doesn't render directly - it's processed by SwitchCase
  return null;
}

export function Default() {
  const insideSwitchCase = useContext(SwitchCaseContext);

  if (!insideSwitchCase) {
    throw new Error("Default must be used within a SwitchCase component");
  }

  // This component doesn't render directly - it's processed by SwitchCase
  return null;
}
