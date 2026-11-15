import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Handshake, UsersRound, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './club-welcome.css';

const details = [
  { title: 'Fair play, every session', Icon: Handshake, text: 'We focus on the things that keep a club strong: fair play, good sportsmanship, and an inclusive culture where new players feel comfortable asking questions. Our sessions run smoothly with a queueing system, quality shuttles, and a committee that cares about everyone getting on court.' },
  { title: 'More than match day', Icon: UsersRound, text: 'Beyond weekly sessions, we bring the community together through socials, events, and competition, creating a place where you can improve your game and build friendships that last beyond uni.' },
  { title: 'A place to grow', Icon: TrendingUp, text: 'If you are new, we will help you settle in quickly. If you are experienced, you will find strong games, good training partners, and chances to represent the club in competitions.' },
];

export default function ClubWelcome() {
  const reduced = useReducedMotion();
  return <motion.section className="club-welcome" aria-labelledby="club-welcome-title" data-club-welcome
    initial={false} whileInView="visible" viewport={{ once: true, amount: .12 }}>
    <div className="club-welcome-intro">
      <motion.div variants={{ visible: { opacity: [reduced ? 1 : .7, 1], y: [reduced ? 0 : 12, 0], transition: { duration: reduced ? 0 : .5 } } }}>
        <h3 id="club-welcome-title">A badminton club built on <span>community.</span></h3>
        <p>UNSW Badminton Club is a welcoming space for anyone who loves badminton, whether you are picking up a racket for the first time, coming along with friends for social games, or training with competitive goals.</p>
      </motion.div>
      <Link to="/sessions" className="club-welcome-link">Find your next session<ArrowUpRight size={19} aria-hidden="true" /></Link>
    </div>
    <div className="club-welcome-details">
      {details.map(({ title, text, Icon }, index) => <motion.div key={title} className="club-welcome-detail"
        variants={{ visible: { opacity: [reduced ? 1 : .65, 1], x: [reduced ? 0 : 12, 0], transition: { duration: reduced ? 0 : .45, delay: reduced ? 0 : .1 + index * .08 } } }}>
        <span className="club-welcome-icon"><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>
        <div><h4>{title}</h4><p>{text}</p></div>
      </motion.div>)}
    </div>
  </motion.section>;
}
