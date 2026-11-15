import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
const badgeVariants = cva('tw-inline-flex tw-items-center tw-rounded-full tw-px-3 tw-py-1 tw-text-xs tw-font-semibold', { variants: { variant: { default: 'tw-bg-primary tw-text-primary-foreground', secondary: 'tw-bg-secondary tw-text-secondary-foreground', outline: 'tw-border tw-border-border tw-text-foreground', destructive: 'tw-bg-destructive tw-text-destructive-foreground' } }, defaultVariants: { variant: 'default' } });
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
export function Badge({ className, variant, ...props }: BadgeProps) { return <div className={cn(badgeVariants({ variant }), className)} {...props} />; }
export { badgeVariants };
