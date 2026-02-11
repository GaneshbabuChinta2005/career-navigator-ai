import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border-border/50 bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "text-foreground border-border hover:bg-secondary/50",
        success: "border-status-success/20 bg-status-success/10 text-status-success",
        warning: "border-status-warning/20 bg-status-warning/10 text-status-warning",
        info: "border-status-info/20 bg-status-info/10 text-status-info",
        glow: "border-primary/30 bg-primary/10 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]",
        skill: "border-transparent bg-gradient-primary text-primary-foreground",
        premium: "border-accent/30 bg-accent/10 text-accent shadow-[0_0_20px_hsl(var(--accent)/0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
