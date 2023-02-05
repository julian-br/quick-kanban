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
  custom: "",
} as const;

const sizeClassMap = {
  medium: "px-7 py-2 rounded-full",
  large: "text-lg px-7 py-3 rounded-full",
} as const;

export default function Button({
  variant,
  size,
  children,
  ...reactButtonProps
}: Props) {
  const variantClasses = variantClassMap[variant];

  // apply no sizing if the variant is custom
  const sizeClasses =
    variant === "custom" ? "" : sizeClassMap[size ?? "medium"];

  return (
    <button
      {...reactButtonProps}
      type={reactButtonProps.type ?? "button"}
      className={`focus-visible:outline-none focus-visible:ring-2 ${variantClasses} ${sizeClasses} ${reactButtonProps.className}`}
    >
      {children}
    </button>
  );
}
