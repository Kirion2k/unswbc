import React from 'react';
import { Typography, Box, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

function FAQsPage() {
  const imageSrc = "/unsw-8.jpg";

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
        "Our sessions can get crowded, especially early in term. This means you can sometimes wait between games for up to 30 to 40 minutes."
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
        "We release club shirts each year. Orders usually open mid year and we post the form on Instagram and Facebook."
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc={imageSrc}
        imageAlt="UNSW Badminton Club"
        imagePosition="center 0%"
        title="FAQs"
        subtitle="Everything you need to know before your first session, what to bring, how the queue works, and what to expect."
      />

      {/* FAQ Section */}
      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <SectionHeading overline="Support" title="Frequently asked questions" sx={{ mb: 5 }} />
        {faqs.map((faq, index) => (
          <ScrollReveal key={index} delay={Math.min(index * 0.05, 0.4)}>
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-${index}-content`} id={`faq-${index}-header`}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1c3c6f' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </ScrollReveal>
        ))}
      </Container>
    </Box>
  );
}

export default FAQsPage;
