import React from 'react';
import { Box, Typography, Container, TextField, Button } from '@mui/material';

const ComingSoon = () => (
  <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 2 }}>
    <Container maxWidth="sm">
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Coming Soon
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        We are working hard to bring something amazing. Stay tuned!
      </Typography>

      <Box
        component="form"
        sx={{
          mt: 4,
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
        }}
      >
        <TextField
          type="email"
          placeholder="Enter your email"
          size="small"
          variant="outlined"
          sx={{ backgroundColor: '#fff', flex: 1 }}
        />
        <Button
          sx={{
            backgroundColor: '#2A4DD0',
            color: '#fff',
            borderRadius: '100px',
            width: '120px',
            '&:hover': {
              backgroundColor: '#1f3bb3',
            },

          }}
        >
          Notify Me
        </Button>
      </Box>
    </Container>
  </Box>
);


export default ComingSoon;
