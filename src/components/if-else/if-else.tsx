import React from "react";

interface IfElseContextProps {
  condition: boolean;
}

interface IfElseProps extends IfElseContextProps {
  children?: React.ReactNode;
  else?: React.ReactNode;
  if?: React.ReactNode;
}

const IfElseContext = React.createContext<IfElseContextProps>({
  condition: false,
});
export default function IfElse({
  condition,
  children,
  else: ElseComponent = null,
  if: IfComponent = null,
}: IfElseProps) {
  if (!!ElseComponent || !!IfComponent) {
    if (condition) {
      return IfComponent;
    }
    return ElseComponent;
  }
  return (
    <IfElseContext.Provider value={{ condition }}>
      {children}
    </IfElseContext.Provider>
  );
}

export function If({
  children,
  condition: propCondition,
}: {
  children: React.ReactNode;
  condition?: boolean;
}) {
  const context = React.useContext(IfElseContext);

  if (!context) {
    return propCondition ? children : null;
  }

  const condition = propCondition ?? context.condition;
  return condition ? children : null;
}

export function Else({ children }: { children: React.ReactNode }) {
  const { condition } = React.useContext(IfElseContext);
  return condition ? null : children;
}
