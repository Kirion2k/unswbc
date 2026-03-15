import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

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
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#f8f9fa',
        px: 2,
        py: { xs: 7, md: 10 },
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
  <Box
    sx={{
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mb: 5,
    }}
  >
    {/* Radial glow */}
    <Box
      sx={{
        position: 'absolute',
        top: -200,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 600,
        height: 500,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(28,60,111,0.08) 0%, rgba(28,60,111,0.03) 60%, transparent 100%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />

    <Typography
      sx={{
        mb: 2,
        fontWeight: 700,
        fontSize: '0.85rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        background: 'linear-gradient(90deg, #1c3c6f, rgba(28,60,111,0.55))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {subtitle}
    </Typography>

    <Typography
      variant="h3"
      sx={{
        fontWeight: 900,
        fontSize: { xs: '2rem', md: '3rem' },
        letterSpacing: '-0.02em',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {title}
    </Typography>
  </Box>
);

// ─── Category tabs ────────────────────────────────────────────────────────────
const FAQTabButtons = ({ categories, selected, setSelected }) => (
  <Box
    sx={{
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 1.5,
      mb: 6,
    }}
  >
    {Object.entries(categories).map(([key, label]) => {
      const isSelected = selected === key;
      return (
        <motion.button
          key={key}
          onClick={() => setSelected(key)}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderRadius: 8,
            border: `1.5px solid ${isSelected ? '#1c3c6f' : 'rgba(28,60,111,0.22)'}`,
            padding: '8px 14px',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: 'transparent',
            color: isSelected ? 'white' : '#475569',
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
                transition={{ duration: 0.45, ease: 'backIn' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  background: 'linear-gradient(135deg, #1c3c6f, #2d5a9e)',
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
const FAQList = ({ faqData, selected }) => (
  <Container maxWidth="md" disableGutters>
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected !== category) return null;
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: 'backIn' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {questions.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </Box>
          </motion.div>
        );
      })}
    </AnimatePresence>
  </Container>
);

// ─── Individual FAQ item ──────────────────────────────────────────────────────
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      style={{
        borderRadius: 16,
        border: '1px solid',
        borderColor: isOpen ? 'rgba(28,60,111,0.2)' : 'rgba(28,60,111,0.1)',
        backgroundColor: isOpen ? 'rgba(28,60,111,0.04)' : 'white',
        overflow: 'hidden',
        transition: 'border-color 0.25s, background-color 0.25s',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '16px 20px',
          textAlign: 'left',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.4,
            color: isOpen ? '#0f172a' : '#475569',
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
            size={20}
            color={isOpen ? '#1c3c6f' : '#94a3b8'}
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
        style={{ overflow: 'hidden', paddingLeft: 20, paddingRight: 20 }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
            lineHeight: 1.85,
            fontSize: '0.95rem',
          }}
        >
          {answer}
        </Typography>
      </motion.div>
    </motion.div>
  );
};

export default FAQTabs;
