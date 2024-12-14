import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Card, CardActionArea, CardContent, CardMedia, Button, Box, Grid, Container } from '@mui/material';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { styled, keyframes } from '@mui/system';
import unsw15 from '../assets/images/unsw-16.jpg';



const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`;

const AnimatedTypography = styled(Typography)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out forwards`,
  textAlign: 'center'
}));

function HomePage() {
  const imageSrc = "/unsw-8.jpg";
  const uniformBoxHeight = 350; // Uniform height for images and text boxes
  const cards = [
    {
      img: "/unsw-13.jpg",
      title: "Club Info",
      description: "Learn more about our club's history, mission, and membership options.",
      link: "/club-info"
    },
    {
      img: "/unsw-9.jpg",
      title: "Events",
      description: "Check out upcoming tournaments and social gatherings.",
      link: "/events"
    },
    {
      img: unsw15, // Reference the file directly in the public folder
      title: "Social Media",
      description: "Follow us on social media for the latest updates and community posts.",
      link: "/contacts"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        sx={{ position: 'relative', width: '100%', height: '100vh', bgcolor: 'black' }}
      >
       <motion.img
          src={imageSrc}
          alt="UNSW Badminton Club"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%', opacity: 0.35 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 2 }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <AnimatedTypography variant="h2" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
            <motion.span
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              UNSW
            </motion.span>{' '}
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ color: '#1c3c6f' }}
            >
              Badminton
            </motion.span>{' '}
            <motion.span
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Club
            </motion.span>
          </AnimatedTypography>
          <Typography variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 'bold', mt: 2 }}>
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
          </Typography>
        </Box>
      </Box>

      {/* Sections */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Who Are We Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  bgcolor: '#1c3c6f',
                  color: 'white',
                  p: 5,
                  borderRadius: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: uniformBoxHeight
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Who Are We?
                </Typography>
                <Typography variant="body1">
                  The UNSW Badminton Club is a vibrant community of players and enthusiasts. Committed to promoting the
                  sport within the university and beyond, we offer training sessions, competitive opportunities, and
                  social play in a supportive environment.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.img
              src="/unsw-1.jpg"
              alt="About UNSW Badminton Club"
              style={{
                width: '100%',
                height: uniformBoxHeight,
                borderRadius: '10px',
                objectFit: 'cover',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </Grid>

          {/* Training Programs Section */}
          <Grid item xs={12} md={6}>
            <motion.img
              src="/unsw-2.jpg"
              alt="Training"
              style={{
                width: '100%',
                height: uniformBoxHeight,
                borderRadius: '10px',
                objectFit: 'cover',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  bgcolor: '#f8f9fa',
                  color: 'black',
                  p: 5,
                  borderRadius: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: uniformBoxHeight
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Training Programs
                </Typography>
                <Typography variant="body1">
                  Our training programs are tailored to players of all levels, from beginners to advanced athletes.
                  Join our sessions to refine your skills under expert guidance and improve your game.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Community Spirit Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  bgcolor: '#1c3c6f',
                  color: 'white',
                  p: 5,
                  borderRadius: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: uniformBoxHeight
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Community Spirit
                </Typography>
                <Typography variant="body1">
                  At UNSW Badminton Club, we foster a sense of belonging and camaraderie. Our events and socials are
                  designed to bring our community closer together while celebrating our shared passion for the sport.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.img
              src="/unsw-3.jpg"
              alt="Community"
              style={{
                width: '100%',
                height: uniformBoxHeight,
                borderRadius: '10px',
                objectFit: 'cover',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Cards Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
          Explore Our Club
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: uniformBoxHeight + 50, // Adjusted for button space
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    borderRadius: 2,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <CardActionArea component={RouterLink} to={card.link}>
                    <CardMedia
                      component="img"
                      image={card.img}
                      alt={card.title}
                      sx={{ height: uniformBoxHeight / 2, objectFit: 'cover', objectPosition: 'center 15%'}}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Button
                    component={RouterLink}
                    to={card.link}
                    sx={{
                      bgcolor: '#1c3c6f',
                      color: 'white',
                      '&:hover': { bgcolor: '#123456' },
                      m: 2
                    }}
                  >
                    Learn More
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
