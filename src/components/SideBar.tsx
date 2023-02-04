import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SideBar({ children }: Props) {
  return (
    <nav className="bg-white w-96 border-r border-slate-200">{children}</nav>
  );
}
