import { ReactNode, forwardRef } from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn } from "../lib/utils";

interface ContextMenuProps {
  children: ReactNode;
}
function ContextMenu({ children }: ContextMenuProps) {
  return <ContextMenuPrimitive.Root>{children}</ContextMenuPrimitive.Root>;
}
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuContent = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[15rem] overflow-hidden rounded-lg border border-slate-300/30 bg-slate-900 p-1 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));

const ContextMenuItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex text-slate-200 text-sm cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none focus:bg-slate-800 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));

ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;
export default ContextMenu;
