import React from 'react';
import Typewriter from 'typewriter-effect';

function HomePage() {
  const imageSrc = "/unsw-5.jpg"; 
  const aboutImageSrc = "/unsw-1.jpg";

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'black' }}>
        <img
          src={imageSrc}
          alt="UNSW Badminton Club"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5
          }}
        />
        <div style={{
            position: 'absolute',
            top: '30%',  
            left: '50%',
            transform: 'translate(-50%, -50%)', 
            textAlign: 'center',
            color: 'white',
          }}>
          <div style={{ fontSize: '5em', fontWeight: 'bold' }}> 
            <span style={{ color: 'white' }}>UNSW</span> <span style={{ color: '#1c3c6f' }}>Badminton</span> <span style={{ color: 'white' }}>Club</span>
          </div>
          <div style={{ fontSize: '2em', fontWeight: 'bold' }}> 
            <Typewriter
              options={{
                strings: ["Precision in motion.", "2024 National Champions.", "Where dreams take flight."],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
                cursor: '|'
              }}
            />
          </div>
        </div>
      </div>
      <div style={{
          display: 'flex',
          padding: '50px 0',  // Top and bottom padding only
          backgroundColor: 'white',
          color: 'black'
        }}>
        <div style={{ flex: 1, padding: '0 20px' }}>
          <h2>About UNSW Badminton Club</h2>
          <p>Here at the UNSW Badminton Club, we pride ourselves on fostering a community of sportsmanship and competition. Founded in [Year], our club has grown to become one of the university's premier sports organizations, offering both competitive and recreational play opportunities for students of all skill levels.</p>
        </div>
        <div style={{ width: '55rem', height: '30rem' }}> 
          <img
            src={aboutImageSrc}
            alt="About UNSW Badminton Club"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}  // Cover to maintain aspect ratio
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
