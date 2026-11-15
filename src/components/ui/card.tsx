import * as React from 'react';
import { cn } from '../../lib/utils';
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('tw-rounded-lg tw-border tw-border-border tw-bg-card tw-text-card-foreground', className)} {...props} />);
Card.displayName = 'Card';
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} />; }
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} />; }
export function CardFooter(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} />; }
export function CardTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h3 {...props}>{children}</h3>; }
export function CardDescription(props: React.HTMLAttributes<HTMLParagraphElement>) { return <p {...props} />; }
