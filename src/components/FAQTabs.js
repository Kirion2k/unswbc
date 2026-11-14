import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';

// ─── Main FAQ component ───────────────────────────────────────────────────────
export const FAQTabs = ({
  title = 'FAQs',
  subtitle = 'Frequently Asked Questions',
  categories,
  faqData,
}) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <Box
      component="section"
      data-page-content
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'var(--club-canvas)',
        px: 2,
        py: 'var(--club-section-space)',
        color: 'text.primary',
      }}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabButtons
        categories={categories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <FAQList faqData={faqData} selected={selectedCategory} />
    </Box>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────
const FAQHeader = ({ title, subtitle }) => (
  <Container maxWidth="md" disableGutters sx={{ maxWidth: { md: 1040, lg: 1080 }, mb: 4 }}>
    <SectionHeading title={title} sx={{ mb: 0 }} />
    {subtitle && <Typography sx={{ mt: 2, color: 'text.secondary' }}>{subtitle}</Typography>}
  </Container>
);

// ─── Category tabs ────────────────────────────────────────────────────────────
const FAQTabButtons = ({ categories, selected, setSelected }) => (
  <Box
    role="tablist"
    aria-label="Question categories"
    sx={{
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      maxWidth: 1080, mx: 'auto',
      gap: 1.5,
      mb: 'var(--club-heading-gap)',
    }}
  >
    {Object.entries(categories).map(([key, label]) => {
      const isSelected = selected === key;
      return (
        <motion.button
          className="club-glass-button"
          key={key}
          role="tab"
          id={`faq-tab-${key}`}
          aria-controls={`faq-panel-${key}`}
          aria-selected={isSelected}
          onClick={() => setSelected(key)}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderRadius: 14,
            minHeight: 44,
            border: `1.5px solid ${isSelected ? '#1c3c6f' : 'var(--club-line)'}`,
            padding: '0.5rem 0.875rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: 'var(--club-tint)',
            color: isSelected ? 'white' : 'var(--club-muted)',
            transition: 'color 0.3s, border-color 0.3s',
            fontFamily: 'inherit',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
          <AnimatePresence>
            {isSelected && (
              <motion.span
                key="fill"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  backgroundColor: '#1c3c6f',
                  backgroundImage: 'var(--club-button-sheen)',
                }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      );
    })}
  </Box>
);

// ─── FAQ list ─────────────────────────────────────────────────────────────────
const FAQList = ({ faqData, selected }) => {
  const reducedMotion = useReducedMotion();
  return (
    <Container maxWidth="md" disableGutters data-faq-panels sx={{ maxWidth: { md: 1040, lg: 1080 }, display: 'grid' }}>
      {Object.entries(faqData).map(([category, questions]) => {
        const active = selected === category;
        return (
          <motion.div
            key={category}
            id={`faq-panel-${category}`}
            role="tabpanel"
            aria-labelledby={`faq-tab-${category}`}
            aria-hidden={!active}
            inert={active ? undefined : ''}
            initial={false}
            animate={{ opacity: active ? 1 : 0, y: reducedMotion || active ? 0 : 8 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
            style={{ gridArea: '1 / 1', alignSelf: 'start', minWidth: 0, visibility: active ? 'visible' : 'hidden', pointerEvents: active ? 'auto' : 'none' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {questions.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </Box>
          </motion.div>
        );
      })}
    </Container>
  );
};

// ─── Individual FAQ item ──────────────────────────────────────────────────────
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      style={{
        borderRadius: 'var(--club-radius)',
        border: '1px solid',
        borderColor: 'var(--club-line)',
        backgroundColor: isOpen ? 'var(--club-feature)' : 'var(--club-glass)',
        backgroundImage: 'var(--club-glass-sheen)',
        boxShadow: 'var(--club-glass-shadow)',
        overflow: 'hidden',
        transition: 'border-color 0.25s, background-color 0.25s',
      }}
    >
      <button
        aria-expanded={isOpen}
        className="club-glass-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '1rem 1.25rem',
          textAlign: 'left',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.4,
            color: isOpen ? 'var(--club-text)' : 'var(--club-muted)',
            transition: 'color 0.2s',
          }}
        >
          {question}
        </Typography>
        <motion.span
          variants={{
            open: { rotate: '45deg' },
            closed: { rotate: '0deg' },
          }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0 }}
        >
          <Plus
            size="1.25rem"
            color={isOpen ? 'var(--club-accent)' : 'var(--club-muted)'}
            style={{ transition: 'color 0.2s', display: 'block' }}
          />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          marginBottom: isOpen ? 20 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
            lineHeight: 1.85,
            fontSize: '1rem',
          }}
        >
          {answer}
        </Typography>
      </motion.div>
    </motion.div>
  );
};

export default FAQTabs;
