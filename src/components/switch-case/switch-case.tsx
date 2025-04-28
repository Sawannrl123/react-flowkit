import React from "react";

type SwitchCaseValueType = string | number | symbol;

type SwitchCaseContextProps<T> = {
  value: T;
  hasMatchingCase: boolean;
  setHasMatchingCase: React.Dispatch<React.SetStateAction<boolean>>;
};

type SwitchCaseProps<T extends SwitchCaseValueType> = {
  value: T;
  children?: React.ReactNode;
  components?: Record<T, React.ReactNode>;
  default?: React.ReactNode;
};

// Define the Case props type to use for type checking
interface CaseProps {
  value: SwitchCaseValueType;
  children: React.ReactNode;
}

const SwitchCaseContext = React.createContext<
  SwitchCaseContextProps<SwitchCaseValueType> | undefined
>(undefined);

export function SwitchCase<T extends SwitchCaseValueType>({
  value,
  children,
  default: defaultCase = null,
}: SwitchCaseProps<T>) {
  // Track if any Case has matched
  const [hasMatchingCase, setHasMatchingCase] = React.useState(false);

  // Reset the matching case state when the value changes
  React.useEffect(() => {
    setHasMatchingCase(false);
  }, [value]);

  // Context value with the current switch value and match tracking
  const contextValue = React.useMemo(() => {
    return { value, hasMatchingCase, setHasMatchingCase };
  }, [value, hasMatchingCase]);

  return (
    <SwitchCaseContext.Provider value={contextValue}>
      {children}
      {!hasMatchingCase && defaultCase}
    </SwitchCaseContext.Provider>
  );
}

export function Case({
  children,
  value: caseValue,
}: {
  children: React.ReactNode;
  value: SwitchCaseValueType;
}) {
  const context = React.useContext(SwitchCaseContext);

  if (!context) {
    throw new Error("Case must be used within a SwitchCase component");
  }

  const { value, setHasMatchingCase } = context;
  const matches = value === caseValue;

  // If this case matches, update the parent SwitchCase
  React.useEffect(() => {
    if (matches) {
      setHasMatchingCase(true);
    }
  }, [matches, setHasMatchingCase]);

  return matches ? children : null;
}

export function Default({ children }: { children: React.ReactNode }) {
  const context = React.useContext(SwitchCaseContext);

  if (!context) {
    throw new Error("Default must be used within a SwitchCase component");
  }

  const { hasMatchingCase } = context;

  // Only render if no Case has matched
  return !hasMatchingCase ? children : null;
}
