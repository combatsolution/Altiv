
import { useState } from 'react';
import { m } from 'framer-motion';
import axiosInstance from 'src/utils/axios'; // ✅ Adjust path if needed
import { useSnackbar } from 'notistack'; // ✅ Import snackbar

// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MotionViewport, varFade } from 'src/components/animate';
import { Theme } from '@fullcalendar/core/internal';
import { Box } from 'lucide-react';

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar(); // ✅ Initialize snackbar

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
      setForm({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to submit. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
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
          borderradius="100px"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Now'}
        </Button>

{/*  
   
      <Box flexShrink={0}>
        <img
          src='/assets/images/contactimg.webp'
          alt="Contact Us"
          style={{
            maxWidth: 400,
            width: '100%',
            height: 'auto',
            borderRadius: 16,
          }}
        />
      </Box>
  */}
      </m.div>
    </Stack>
  );
}