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
        "You can join by signing up during our weekly sessions, please visit the sessions page for more info. Come to our desk on the day to sign up to register and pay for the session. There is no need to inform us in advance before joining",
    },
    {
      question: "Do I need to bring my own equipment?",
      answer:
        "The club doesnt provide rackets or gear to players. Players will need to bring their own rackets. If you are in need of a racket, UNSW FAC provides rackets for people to hire.",
    },
    {
      question: "Do you guys provide shuttles during sessions?",
      answer:
        "We provide quality feathered shuttles, however please use the warmup shuttles from the box for warmup! :)"
    },
    {
      question: "What skill levels can I expect?",
      answer:
        "All skill levels are welcome! Whether you're a beginner or an advanced player, our sessions are tailored to everyone's need!",
    },
    {
      question: "Where are the sessions held?",
      answer:
        "Our sessions are held at the UNSW Sports Hall and Gymnasium. The exact locations and timings can be found on our Sessions page.",
    },
    {
      question: "How do our sessions run?",
      answer:
        "We operate on a queuing system, you can either be grouped with random players or requested to be queued with your friends. After finished a match, come back to the table to add your name back to the queue.",
    },
    {
      question: "How long can I expect to wait?",
      answer:
        "Our sessions can get very crowded as it is a highly popular sport at UNSW. This means you can expect wait times between games of upto 30-40 minutes."
    },
    {
      question: "Are there any events outside of regular sessions?",
      answer:
        "The club organises annual dinners and other social events such as tournaments throughout the year. To keep up to date follow our instagram or facebook."
    },
    {
      question: "How can I trial for the UNSW Badminton Team? (Nationals)",
      answer:
        "Every year, the club sends out a team (mens and womens) to the Australian University Games (Unisport Nationals). Trials are held sometime during Term 1 of each year. If interested, please talk to one of the committee members or stay up to date on our socials for more info."
    },
    {
      question: "I see the club has shirts! How can I get one?",
      answer:
        "The club announces club shirts each year for players to purchase. Orders for shirts generally get released mid-year and can be found on our Instagram or FaceBook."
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
