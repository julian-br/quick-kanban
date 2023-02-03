import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof variantClassMap;
  size?: keyof typeof sizeClassMap;
  children?: ReactNode;
}

const variantClassMap = {
  primary:
    "bg-primary text-white font-semibold hover:bg-primary-light active:bg-primary focus:ring-primary-light",
  secondary:
    "bg-secondary-light text-primary font-bold hover:bg-secondary active:bg-secondary-light",
  danger:
    "bg-danger text-white font-semibold hover:bg-danger-light active:bg-danger",
} as const;

const sizeClassMap = {
  medium: "px-7 py-2",
  large: "text-lg px-7 py-3",
} as const;

export default function Button({
  variant,
  size,
  children,
  ...reactButtonProps
}: Props) {
  return (
    <button
      {...reactButtonProps}
      className={`rounded-full focus-visible:outline-none focus-visible:ring-2 ${
        variantClassMap[variant]
      } ${sizeClassMap[size ?? "medium"]}`}
    >
      {children}
    </button>
  );
}
