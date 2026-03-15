import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQsPage from './pages/FAQsPage';
import ValuesPage from './pages/ValuesPage';
import SessionsPage from './pages/SessionsPage';
import MembershipResourcesPage from './pages/MembershipResourcesPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import ViewQueue from './components/ViewQueue';
import ContactPage from './pages/ContactPage';
import TrainingsPage from './pages/TrainingsPage';
import TrainingToast from './components/TrainingToast';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/faqs" element={<PageTransition><FAQsPage /></PageTransition>} />
        <Route path="/values" element={<PageTransition><ValuesPage /></PageTransition>} />
        <Route path="/sessions" element={<PageTransition><SessionsPage /></PageTransition>} />
        <Route path="/trainings" element={<PageTransition><TrainingsPage /></PageTransition>} />
        <Route path="/membership-resources" element={<PageTransition><MembershipResourcesPage /></PageTransition>} />
        <Route path="/photo-gallery" element={<PageTransition><PhotoGalleryPage /></PageTransition>} />
        <Route path="/meet-the-team" element={<PageTransition><MeetTheTeamPage /></PageTransition>} />
        <Route path="/view-queue" element={<ViewQueue />} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <ScrollToTop />
          <AnimatedRoutes />
        </main>
        <Footer />
        <TrainingToast />
      </div>
    </Router>
  );
}

export default App;
