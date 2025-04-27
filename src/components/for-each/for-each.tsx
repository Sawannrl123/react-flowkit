import React from "react";

export interface ForEachProps<T> {
  data: T[];
  children: (data: T, index: number) => React.ReactNode;
}
export function ForEach<T>({ data, children }: ForEachProps<T>) {
  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={index}>{children(item, index)}</React.Fragment>
      ))}
    </>
  );
}
