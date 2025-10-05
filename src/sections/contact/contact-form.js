
import { useState } from 'react';
import { m } from 'framer-motion';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import contactImg from 'src/Fogoimages/contactimg.webp';
import { trackEvent } from 'src/utils/google-analytics'; // ✅ Added import

// @mui
import {
  Stack,
  Button,
  TextField,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar();
    const handlesubmitClick = () => {
    trackEvent({
      category: 'Submit  Click',
      action: 'button Clicked',
      label: 'Submitted Form',
      Value:'',
    });
  };

  

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const now = new Date().toISOString();
    const payload = {
      ...form,
      createdAt: now,
      updatedAt: now,
      deletedAt: now,
      isDeleted: false,
    };

    try {
      setLoading(true);
      await axiosInstance.post('/contact-uses', payload);
      enqueueSnackbar('Message submitted successfully!', { variant: 'success' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to submit. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      direction="row"
      justifyContent="space-between"
    >
      {/* Left Side: Form */}
      <Grid item xs={12} md={7}>
        <Stack component={MotionViewport} spacing={5}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h3">
              Feel free to contact us. <br />
              We&apos;ll be glad to hear from you.
            </Typography>
          </m.div>

          <Stack spacing={3}>
            <m.div variants={varFade().inUp}>
              <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} />
            </m.div>
            <m.div variants={varFade().inUp}>
              <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} />
            </m.div>
            <m.div variants={varFade().inUp}>
              <TextField fullWidth label="Subject" name="subject" value={form.subject} onChange={handleChange} />
            </m.div>
            <m.div variants={varFade().inUp}>
              <TextField
                fullWidth
                label="Enter your message here."
                multiline
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
              />
            </m.div>
          </Stack>

          <m.div variants={varFade().inUp}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ borderRadius: '100px' }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Now'}
            </Button>
          </m.div>
        </Stack>
      </Grid>

      {/* Right Side: Image */}
      <Grid item xs={12} md={5}>
        <m.div variants={varFade().inRight}>
          <Box
            component="img"
            src={contactImg}
            alt="Contact Illustration"
            onClick={handlesubmitClick}
            sx={{
              display:{xs:'none', lg:'block'},
              width: '750px',
              // heigth: '800px', 
              maxWidth: 1000,
              height: 'auto',
            
              mx: 'auto',
              borderRadius: 1,
            }}
          />
        </m.div>
      </Grid>
    </Grid>
  );
}

