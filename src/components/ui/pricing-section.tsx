'use client';
import * as React from 'react';
import { LayoutGroup } from 'framer-motion';
import { PricingCard, type PricingTier } from './pricing-card';
import { Tab } from './pricing-tab';
import './pricing-section.css';
interface PricingSectionProps { title: string; subtitle: string; tiers: PricingTier[]; frequencies: string[] }
export function PricingSection({ title, subtitle, tiers, frequencies }: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0]);
  const frequency = frequencies.includes(selectedFrequency) ? selectedFrequency : frequencies[0];
  const headingId = React.useId();
  return <section className="club-pricing" aria-labelledby={headingId}>
    <header className="club-pricing-intro"><h2 id={headingId}>{title}</h2><p>{subtitle}</p>
      <LayoutGroup id={headingId}><div className="club-pricing-tabs" role="group" aria-label="Session pricing for">{frequencies.map(text => <Tab key={text} text={text} selected={frequency === text} setSelected={setSelectedFrequency} />)}</div></LayoutGroup>
    </header>
    <div className="club-pricing-grid">{tiers.map(tier => <PricingCard key={tier.name + tier.time} tier={tier} paymentFrequency={frequency} />)}</div>
  </section>;
}
