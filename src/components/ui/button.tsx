import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
const buttonVariants = cva('club-glass-button tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-border tw-border-border tw-font-semibold tw-transition-colors focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-4 disabled:tw-pointer-events-none disabled:tw-opacity-50', { variants: { variant: { default: 'tw-bg-primary tw-text-primary-foreground hover:tw-opacity-90', secondary: 'tw-bg-secondary tw-text-secondary-foreground', outline: 'tw-bg-transparent tw-text-primary hover:tw-bg-accent', ghost: 'tw-bg-transparent tw-text-foreground hover:tw-bg-muted', link: 'tw-bg-transparent tw-text-primary hover:tw-underline', destructive: 'tw-bg-destructive tw-text-destructive-foreground' }, size: { default: 'tw-min-h-11 tw-px-4 tw-py-3 tw-text-sm', sm: 'tw-min-h-10 tw-px-3 tw-text-sm', lg: 'tw-min-h-12 tw-px-6', icon: 'tw-size-11' } }, defaultVariants: { variant: 'default', size: 'default' } });
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => { const Comp = asChild ? Slot : 'button'; return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />; });
Button.displayName = 'Button';
export { buttonVariants };
