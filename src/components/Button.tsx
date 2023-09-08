import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof variantClassMap;
  size?: keyof typeof sizeClassMap;
  children?: ReactNode;
}

const variantClassMap = {
  primary:
    "bg-primary-500 text-white font-semibold hover:bg-primary-400 active:bg-primary-400 focus:ring-primary-200",
  secondary:
    "bg-primary-200 text-primary-600 font-semibold hover:bg-primary-200 active:bg-primary-100",
  danger:
    "bg-danger-500 text-white font-semibold hover:bg-danger-400 active:bg-danger-200",
  custom: "",
} as const;

const sizeClassMap = {
  medium: "px-7 py-2 rounded-xl",
  large: "text-lg px-7 py-3 h-13 rounded-xl",
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
