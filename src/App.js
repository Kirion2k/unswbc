import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQsPage from './pages/FAQsPage';
import ValuesPage from './pages/ValuesPage';
import EventsPage from './pages/EventsPage';
import MembershipResourcesPage from './pages/MembershipResourcesPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import TeamPage from './pages/TeamPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/values" element={<ValuesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/membership-resources" element={<MembershipResourcesPage />} />
            <Route path="/photo-gallery" element={<PhotoGalleryPage />} />
            <Route path="/team" element={<TeamPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
