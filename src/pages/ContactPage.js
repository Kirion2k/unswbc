import React, { useState } from 'react';
import { Typography, Box, Container, Grid, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

function ContactPage() {
  const imageSrc = "/unsw-19.jpg"; // Background Image

  // State for form submission
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    access_key: 'd66a945f-4370-4c2f-9c68-11ee13236047',
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
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 0%',
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
              <span>Contact</span>{' '}
              <span style={{ color: '#1c3c6f' }}>Us</span>
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Contact Form */}
      <Container sx={{ py: 6 }}>
        <Box
          sx={{
            bgcolor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: 2,
            padding: 4,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#1c3c6f' }}>
            Get in Touch
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#1c3c6f',
                  color: 'white',
                  '&:hover': { bgcolor: '#123456' },
                  px: 4,
                  py: 1,
                }}
              >
                Submit
              </Button>
            </Box>
          </form>

          {responseMessage && (
            <Typography sx={{ textAlign: 'center', mt: 3, color: responseMessage.includes('successfully') ? 'green' : 'red' }}>
              {responseMessage}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default ContactPage;
