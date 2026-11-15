'use client';
import * as React from 'react';
import { BadgeCheck, ArrowRight, Clock3 } from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './card';
export interface PricingTier {
  name: string; price: Record<string, number | string>; description: string; features: string[]; cta: string;
  href: string; time: string; popular?: boolean; highlighted?: boolean;
}
interface PricingCardProps { tier: PricingTier; paymentFrequency: string }
export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency];
  return <Card className={cn('club-pricing-card', tier.popular && 'is-popular', tier.highlighted && 'is-highlighted')}>
    <CardHeader className="club-pricing-header">
      <div className="club-pricing-name"><CardTitle>{tier.name}</CardTitle>{tier.popular && <Badge variant="secondary">Most popular</Badge>}</div>
      <p className="club-pricing-time"><Clock3 size={17} aria-hidden="true" />{tier.time}</p>
    </CardHeader>
    <CardContent className="club-pricing-content">
      <div className="club-pricing-price" aria-live="polite" aria-atomic="true">
        {typeof price === 'number' ? <NumberFlow value={price} format={{ style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }} /> : <span>{price}</span>}
        <p>AUD / {paymentFrequency === 'Members' ? 'member' : 'visitor'} / session</p>
      </div>
      <CardDescription>{tier.description}</CardDescription>
      <ul>{tier.features.map(feature => <li key={feature}><BadgeCheck size={18} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
    </CardContent>
    <CardFooter><Button asChild variant={tier.popular ? 'default' : 'outline'} className="tw-w-full"><a href={tier.href}>{tier.cta}<ArrowRight size={16} aria-hidden="true" /></a></Button></CardFooter>
  </Card>;
}
