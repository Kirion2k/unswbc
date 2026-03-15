import React, { useState } from 'react';
import { Box, Card, CardContent, Container, Grid, IconButton, Link, TextField, Typography } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { Link as RouterLink } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';

function ContactPage() {
  const imageSrc = "/unsw-59.JPG"; // Background Image
  const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || 'd66a945f-4370-4c2f-9c68-11ee13236047';

  // State for form submission
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    access_key: accessKey,
  });

  const [responseMessage, setResponseMessage] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(null);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setResponseMessage("Message sent successfully!");
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          access_key: accessKey,
        });
      } else {
        setResponseMessage("Error sending message. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Error sending message. Please check your connection.");
    }
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc={imageSrc}
        imageAlt="UNSW Badminton Club"
        imagePosition="center 0%"
        title="Contact"
        highlight="Us"
        subtitle="Questions about sessions, membership, or events? Send us a message and we’ll get back to you."
      />

      {/* Contact Form */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading overline="Contact" title="Get in touch" sx={{ mb: 5 }} />

        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <ScrollReveal>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Phone (optional)"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={6}
                        required
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
                    <MagneticButton type="submit" variant="contained" color="primary">
                      Send message
                    </MagneticButton>
                  </Box>
                </form>

                {responseMessage && (
                  <Typography
                    sx={{
                      mt: 2.5,
                      color: responseMessage.includes('successfully') ? 'success.main' : 'error.main',
                      fontWeight: 700,
                    }}
                  >
                    {responseMessage}
                  </Typography>
                )}
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>

          <Grid item xs={12} md={5}>
            <ScrollReveal delay={0.1}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: '#1c3c6f' }}>
                  Follow our updates
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                  For announcements, events, and club news, check our socials.
                </Typography>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton
                    href="https://www.facebook.com/UNSWBC"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ bgcolor: 'rgba(28,60,111,0.12)', color: '#1c3c6f', '&:hover': { bgcolor: 'rgba(28,60,111,0.18)' } }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    href="https://www.instagram.com/unswbadminton"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ bgcolor: 'rgba(28,60,111,0.12)', color: '#1c3c6f', '&:hover': { bgcolor: 'rgba(28,60,111,0.18)' } }}
                  >
                    <Instagram />
                  </IconButton>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: '#1c3c6f' }}>
                    Helpful links
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                    <Link component={RouterLink} to="/sessions" underline="hover">Session info</Link>
                    <br />
                    <Link component={RouterLink} to="/faqs" underline="hover">FAQs</Link>
                    <br />
                    <Link component={RouterLink} to="/view-queue" underline="hover">View Queue</Link>
                  </Typography>
                </Box>
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactPage;
