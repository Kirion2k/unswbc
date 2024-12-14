import React from 'react';
import { Typography, Box, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQsPage() {
  const imageSrc = "/unsw-10.jpg";

  const faqs = [
    {
      question: "How do I join the UNSW Badminton Club?",
      answer:
        "You can join by visiting our website and filling out the membership form. Alternatively, you can sign up during our weekly sessions or events.",
    },
    {
      question: "Do I need to bring my own equipment?",
      answer:
        "We recommend bringing your own racket and appropriate shoes. However, rackets and shuttlecocks are available for beginners at our sessions.",
    },
    {
      question: "What skill levels are welcomed?",
      answer:
        "All skill levels are welcome! Whether you're a beginner or an advanced player, we have sessions tailored to your needs.",
    },
    {
      question: "Where are the sessions held?",
      answer:
        "Our sessions are held at the UNSW Sports Hall and Gymnasium. The exact locations and timings can be found on our Sessions page.",
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        sx={{ position: 'relative', width: '100%', height: '100vh', bgcolor: 'black' }}
      >
        <motion.img
          src={imageSrc}
          alt="UNSW Badminton Club"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 25%',
            opacity: 0.35,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 2 }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
              <span>FAQs</span>
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* FAQ Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#1c3c6f' }}
        >
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-${index}-content`} id={`faq-${index}-header`}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1c3c6f' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: '#555' }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

export default FAQsPage;
