import React from "react";

type SwitchCaseValueType = string | number | symbol;

type SwitchCaseContextProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: T;
};

type SwitchCaseProps<T extends SwitchCaseValueType> =
  SwitchCaseContextProps<T> & {
    children?: React.ReactNode;
    components?: Record<T, React.ReactNode>;
  };

const SwitchCaseContext = React.createContext<
  SwitchCaseContextProps<SwitchCaseValueType>
>({
  value: "" as SwitchCaseValueType,
});

export function SwitchCase<T extends SwitchCaseValueType>({
  value,
  children,
}: SwitchCaseProps<T>) {
  return (
    <SwitchCaseContext.Provider value={{ value }}>
      {children}
    </SwitchCaseContext.Provider>
  );
}

export function Case({
  children,
  value: caseValue,
}: {
  children: React.ReactNode;
  value?: SwitchCaseValueType;
}) {
  const context = React.useContext(SwitchCaseContext);

  if (!context) {
    throw new Error("Case must be used within a SwitchCase component");
  }

  const condition = context.value === caseValue;
  return condition ? children : null;
}
