import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { ContainerScroll, CardSticky } from './ui/cards-stack';
import './session-registration.css';

export default function SessionRegistration({ sections }) {
  return <div className="session-registration-layout" data-registration-stack>
    <aside className="session-registration-guide">
      <h3>Before you step on court.</h3>
      <p>No advance sign-up needed. Come to the badminton desk on the day to register and pay.</p>
      <nav aria-label="Registration and payment details">{sections.map(section => <a key={section.title} href={`#session-info-${section.title.toLowerCase()}`}><span>{section.title}</span><ArrowDownRight size={18} aria-hidden="true" /></a>)}</nav>
    </aside>
    <ContainerScroll>
      {sections.map((section, index) => <React.Fragment key={section.title}><span className="session-registration-anchor" id={`session-info-${section.title.toLowerCase()}`} aria-hidden="true" /><CardSticky index={index} data-alternate={index % 2 === 1}>
        <section aria-labelledby={`session-info-heading-${section.title.toLowerCase()}`} className="session-registration-card">
          <header><span className="session-registration-icon" aria-hidden="true">{section.icon}</span><h3 id={`session-info-heading-${section.title.toLowerCase()}`}>{section.title}</h3><span className="session-registration-count" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></header>
          {section.title === 'Payment' ? <>
            <p>{section.lines[0]}</p>
            <dl className="session-bank-details">{section.lines.slice(1, 4).map(line => { const separator = line.indexOf(':'); return <React.Fragment key={line}><dt>{line.slice(0, separator)}</dt><dd>{line.slice(separator + 1).trim()}</dd></React.Fragment>; })}</dl>
            <p className="session-payment-reference">{section.lines[4]}</p>
          </> : <div className="session-registration-copy">{section.lines.map(line => <p key={line}>{line}</p>)}</div>}
        </section>
      </CardSticky></React.Fragment>)}
    </ContainerScroll>
  </div>;
}
