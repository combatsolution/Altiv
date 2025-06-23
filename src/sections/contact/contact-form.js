
import { useState } from 'react';
import { m } from 'framer-motion';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'notistack';

// @mui
import {
  Stack,
  Button,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar();

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
    <>
      {/* ✅ Paragraph fully outside the main stack, takes full page width */}
      <m.div variants={varFade().inUp}>
        <Box width="100%" py={4} px={2} bgcolor="background.paper">
          <Typography color="text.secondary" align="center">
            Your success is our priority. Whether you have questions about our programs, 
            want to discuss your AI-readiness assessment, or need guidance on getting started,
             we&apos;re here to help you navigate your career evolution in the AI era.
          </Typography>
        </Box>
      </m.div>

      <Stack component={MotionViewport} spacing={5} px={2}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h3" align="center">
            Feel free to contact us. <br />
            We&apos;ll be glad to hear from you.
          </Typography>
        </m.div>

        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </m.div>

          <m.div variants={varFade().inUp}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </m.div>

          <m.div variants={varFade().inUp}>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
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
    </>
  );
}
