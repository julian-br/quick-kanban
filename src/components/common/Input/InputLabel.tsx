import { ReactNode } from "react";

export default function InputLabel({
  children,
  className: passedClassName,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`text-slate-500 font-medium block mb-1 ${
        passedClassName ?? ""
      }`}
    >
      {children}
    </label>
  );
}
