import React from 'react';
import { Box } from '@mui/material';
import PageHero from '../components/PageHero';
import { FAQTabs } from '../components/FAQTabs';

const categories = {
  general: 'General',
  sessions: 'Sessions',
  equipment: 'Equipment',
  events: 'Events & Teams',
};

const faqData = {
  general: [
    {
      question: 'How do I join the UNSW Badminton Club?',
      answer:
        'You can join by signing up during our weekly sessions — please visit the Sessions page for more info. Come to our desk on the day to register and pay. There is no need to inform us in advance before joining.',
    },
    {
      question: 'What skill levels can I expect?',
      answer:
        'All skill levels are welcome! Whether you are a beginner or an advanced player, our sessions are tailored to everyone\'s needs.',
    },
    {
      question: 'Do I need to be a UNSW student to join?',
      answer:
        'No — visitors are welcome at any session. Membership pricing differs for students, staff, and general public. Check the Sessions page for the full pricing breakdown.',
    },
    {
      question: 'I see the club has shirts! How can I get one?',
      answer:
        'We release club shirts each year. Orders usually open mid year and we post the order form on Instagram and Facebook.',
    },
  ],
  sessions: [
    {
      question: 'Where are the sessions held?',
      answer:
        'Sessions are held at the UNSW Fitness and Aquatic Centre, level 2 (B5, Gate 2, High St, UNSW Sydney, Kensington NSW 2033). Head upstairs to the badminton desk — do not check in at the gym counter.',
    },
    {
      question: 'How do sessions run?',
      answer:
        'We operate on a queueing system. You can either be grouped with random players or request to queue with your friends. After finishing a match, come back to the desk to add your name back to the queue.',
    },
    {
      question: 'How long can I expect to wait?',
      answer:
        'Sessions can get busy, especially early in term. During peak periods you may wait 30 to 40 minutes between games. We usually have 6 courts running.',
    },
    {
      question: 'How do I pay?',
      answer:
        'We accept cash or bank transfer on the day. If paying by bank transfer, use your full name as the reference. Account details are available at the desk and on the Sessions page.',
    },
    {
      question: 'Do I need to register in advance?',
      answer:
        'No sign ups or prior registrations are needed. Just show up, come to the badminton desk on level 2, and register on the day.',
    },
  ],
  equipment: [
    {
      question: 'Do I need to bring my own racket?',
      answer:
        'Yes — the club does not provide rackets or personal gear. If you need a racket, UNSW FAC does offer racket hire on-site.',
    },
    {
      question: 'Do you provide shuttles during sessions?',
      answer:
        'Yes, we provide quality feathered shuttles. Please use the warm-up shuttles from the box for warm-ups and keep match shuttles for games.',
    },
    {
      question: 'What should I wear?',
      answer:
        'Standard non-marking sports shoes and comfortable athletic wear. Court shoes are strongly recommended — running shoes on a badminton court can affect your movement and grip.',
    },
  ],
  events: [
    {
      question: 'Are there events outside of regular sessions?',
      answer:
        'The club organises an annual dinner and other social events, including internal tournaments throughout the year. Follow our Instagram or Facebook to stay up to date.',
    },
    {
      question: 'How can I trial for the UNSW Badminton Team (Nationals)?',
      answer:
        'Every year, the club sends a men\'s and women\'s team to the Australian University Games (UniSport Nationals). Trials are held during Term 1. Talk to a committee member or watch our socials for announcements.',
    },
    {
      question: 'Does the club run any internal competitions?',
      answer:
        'Yes — we hold internal club tournaments across the year. These are open to all members regardless of skill level and are a great way to meet new people and test yourself in a competitive setting.',
    },
  ],
};

function FAQsPage() {
  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-8.jpg"
        imageAlt="UNSW Badminton Club"
        imagePosition="center 0%"
        title="FAQs"
        subtitle="Everything you need to know before your first session — what to bring, how the queue works, and what to expect."
      />

      <FAQTabs
        title="Frequently Asked Questions"
        subtitle="Let us answer some questions"
        categories={categories}
        faqData={faqData}
      />
    </Box>
  );
}

export default FAQsPage;
