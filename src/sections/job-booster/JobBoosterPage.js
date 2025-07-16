import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Paper,
  Stack,
  Divider,
  Container,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const barData = [
  { name: '8 - 10 years', percentage: 40 },
  { name: '11 - 12 years', percentage: 50 },
  { name: '13 - 15 years', percentage: 38 },
  { name: '15+ years', percentage: 30 },
];

const ProductManagementPage = () => (
  <Container maxWidth="auto">
    <Box sx={{ pl: { xs: 2, md: 4 }, pr: { xs: 2, md: 4 }, py: 2 }}>
      {/* Title */}
      <Typography variant="h5" fontSize="20px" fontWeight="bold" gutterBottom>
        Product Management at Mastercard
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Match analysis and background
      </Typography>

      {/* Filters */}
      <Stack
        direction={{ xs: 'column', sm: 'row', md: 'column' }}
        spacing={1}
        mb={2}
        alignItems={{ xs: 'flex-start', sm: 'center', md: 'flex-start' }}
        flexWrap="wrap"
        width={{xs:'330px', md:'701px'}}
      >
        <Stack direction="row" spacing={2}>
          <Box
            display="flex"
            flexDirection="row"
            sx={{
              gap: 0,
              width: '250px',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                bgcolor: 'grey.100',
                flex: 1,
                p: 1,
                textAlign: 'center',
                borderRadius: '0px',
              }}
            >
              Match Score
            </Paper>
            <Paper
              elevation={0}
              sx={{
                bgcolor: 'grey.300',
                flex: 1,
                p: 1,
                textAlign: 'center',
                borderRadius: '0px',
              }}
            >
              Everything
            </Paper>
          </Box>

          <Button size="small" fontSize="15px" margintop="1px" sx={{ color: 'grey.600', mt: 1 }}>
            Select All
          </Button>
          <Button
            size="medium"
            variant="outlined"
            sx={{ color: 'grey.600', mt: 1, borderRadius: '100px' }}
          >
            Clear All
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            sx={{ borderRadius: '100px', mt: 1 }}
          >
            Update
          </Button>
        </Stack>

        {/* Chips BELOW the buttons */}
        <Stack direction="row" spacing={3} flexWrap="wrap" mt={1} pl={1}>
          <Chip label="Technical" color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
          <Chip label="Leadership" color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
          <Chip
            label="Project Management"
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
          <Chip label="Lorem Ipsum" color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={6} sx={{ pr: 2 }}>
          {/* Matching */}
          <Paper sx={{ p: 2, mb: 2, bgcolor: '#e8f5e9' }}>
            <Typography variant="h6" color="success.main">
              Matching 75%
            </Typography>
            <Divider sx={{ my: 1 }} />
            <ul>
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <li key={idx}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                ))}
            </ul>
          </Paper>

          {/* Close Matching */}
          <Paper sx={{ p: 2, mb: 2, bgcolor: '#fff3e0' }}>
            <Typography variant="h6" color="warning.main">
              Close Matching 65%
            </Typography>
            <Divider sx={{ my: 1 }} />
            <ul>
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <li key={idx}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                ))}
            </ul>
          </Paper>

          {/* Not Matching */}
          <Paper sx={{ p: 2, mb: 2, bgcolor: '#ffebee' }}>
            <Typography variant="h6" color="error.main">
              Not Matching 65%
            </Typography>
            <Divider sx={{ my: 1 }} />
            <ul>
              {Array(4)
                .fill(0)
                .map((_, idx) => (
                  <li key={idx}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                ))} 
            </ul>
          </Paper>

          {/* Things can be improved */}
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.200' }}>
            <Typography variant="h6">Things can be improved</Typography>
            <Divider sx={{ my: 1 }} />
            <ul>
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <li key={idx}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                ))}
            </ul>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6} sx={{ bgcolor: 'grey.200', width:'315px', height:'1000px', mt:-15 }}>
          <Typography variant="subtitle1" gutterBottom  > 
            Background of Product Management at Mastercard
          </Typography> 

          <Paper sx={{ p: 2, mb: 2, width:'550px', height:'300px'}}>    
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Education Background of Directors
            </Typography>
            <Divider />

            <Box sx={{ height: { xs: 100, md: 150 }, bgcolor: '#fff' }}>Chart Placeholder</Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 , width:'550px',height:'300px'}}>
            <Typography variant="body2" fontWeight="bold" mb={1} >
              Years of Experience vs Percentage of Directors
            </Typography>
            <Divider /> 

            {/* BarGraph */}
              <Box sx={{ height: 250, width:500, mt: 1  }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentage" fill="#3f51b5" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
           
          </Paper>

          <Paper sx={{ p: 2,width:'550px',  height:'300px' }}>
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Previous Company Background
            </Typography>
            <Divider />
            <Box sx={{ height: { xs: 100, md: 150 }, bgcolor: '#fff' }}>Chart Placeholder</Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default ProductManagementPage;
