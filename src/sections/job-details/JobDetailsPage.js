import React from 'react';
import {
  Container,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Link
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// ✅ Job list JSON
const similarJobs = [
  {
    id: 1,
    title: 'Sr. Director AI | Data Science',
    company: 'Google',
    salary: '75L - 1Cr',
    experience: '12-14 years',
    logo: 'https://logo.clearbit.com/google.com'
  },
  {
    id: 2,
    title: 'Machine Learning Engineer',
    company: 'Amazon',
    salary: '50L - 80L',
    experience: '8-10 years',
    logo: 'https://logo.clearbit.com/amazon.com'
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Microsoft',
    salary: '30L - 50L',
    experience: '5-7 years',
    logo: 'https://logo.clearbit.com/microsoft.com'
  },
  {
    id: 4,
    title: 'Lead Data Scientist',
    company: 'Meta',
    salary: '80L - 1.2Cr',
    experience: '10-12 years',
    logo: 'https://logo.clearbit.com/meta.com'
  }
];

export default function JobDetailPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      {/* Search Bar */}
      <Container sx={{ py: 3 }}>
        <TextField
          fullWidth
          placeholder="Show me product manager jobs in Bengaluru with a CTC of 35L and above"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Container>

      {/* Main Content */}
      <Container>
        <Grid container spacing={3}>
          {/* Left Panel */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                {/* Header */}
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                  <Grid item xs={12} md={8}>
                    <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>PT</Avatar>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Polygon Technology
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                          Data Scientist
                        </Typography>
                        <Box display="flex" gap={1} flexWrap="wrap" mt={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            📍 Mumbai
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • 124 applicants
                          </Typography>
                          <Typography
                            variant="body2"
                            color="primary.main"
                            bgcolor="primary.light"
                            px={1}
                            py={0.5}
                            borderRadius={1}
                          >
                            12 hours ago
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Match Score */}
                  <Grid item xs={12} md="auto" textAlign={{ xs: 'left', md: 'center' }}>
                    <Box
                      sx={{
                        bgcolor: 'success.light',
                        borderRadius: '50%',
                        width: 80,
                        height: 80,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mx: { md: 'auto' },
                        mt: { xs: 2, md: 0 }
                      }}
                    >
                      <Typography variant="caption" color="success.dark" fontWeight={500}>
                        Match Score
                      </Typography>
                      <Typography variant="h6" color="success.dark">
                        75%
                      </Typography>
                    </Box>
                    <Tooltip title="How this score is calculated?" placement="right">
                      <Typography
                        variant="caption"
                        color="primary"
                        sx={{ mt: 1, display: 'inline-block', cursor: 'pointer' }}
                      >
                        Why this score?
                      </Typography>
                    </Tooltip>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Description */}
                {[...Array(3)].map((_, i) => (
                  <Typography key={i} paragraph>
                    Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint
                    culpa do incididunt eiusmod culpa. Mollit in laborum tempor Lorem incididunt irure.
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Panel */}
          <Grid item xs={12} md={4}>
            <Box bgcolor="grey.100" p={2} borderRadius={2}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Similar Jobs
              </Typography>
              <List disablePadding>
                {similarJobs.map((job) => (
                  <ListItem key={job.id} alignItems="flex-start" sx={{ mb: 1 }}>
                    <ListItemAvatar>
                      <Avatar src={job.logo} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={job.title}
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Salary: {job.salary} • {job.experience}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Box textAlign="right" mt={1}>
                <Link href="#" underline="hover" variant="body2">
                  View more similar jobs
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Call to Action Buttons */}
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 4
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              color: '#fff',
              backgroundColor: '#0040D8',
              borderRadius: '100px',
              width: { xs: '100%', sm: '200px' }
            }}
          >
            Apply now
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: '#0040D8',
              backgroundColor: '#fff',
              borderRadius: '100px',
              width: { xs: '100%', sm: '200px' }
            }}
          >
            Boost my application
          </Button>
        </CardActions>
      </Container>
    </Box>
  );
}
