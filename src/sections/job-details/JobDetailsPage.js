import React from 'react';
import {
  Container,
  Box,
  Grid,
  Breadcrumbs,
  Link,
  TextField,
  InputAdornment,
  Card,
  CardHeader,
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
  useMediaQuery
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SearchIcon from '@mui/icons-material/Search';

const similarJobs = Array.from({ length: 8 }).map((_, idx) => ({
  id: idx,
  title: 'Sr. Director AI | Data Science',
  company: 'Google',
  salary: '75L - 1Cr',
  experience: '12-14 year',
}));

export default function JobDetailPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      {/* Breadcrumbs & Search */}
      <Container sx={{ py: 2 }}>

        <Box my={2}>
          <TextField
            fullWidth
            placeholder="Show me product managers jobs in Bengaluru with a CTC of 35L and above"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Container>

      {/* Main Content */}
      <Container>
        <Grid container spacing={2} direction={isMobile ? 'column' : 'row'}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }}>PT</Avatar>

                }
                action={<BookmarkBorderIcon />}

                title={<Typography variant="h5">Data Scientist</Typography>}
                subheader="Polygon Technology 
                • Mumbai • 124 applicants"
              />
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>


                  <Box
                    width={80}
                    height={60}
                    borderRadius="50%"
                    bgcolor="success.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                     sx={{ ml:70, mb:10}}
                    >
                  
                    <Typography
                      variant="subtitle2"
                      color="success.main"
                      align="center"
                      sx={{ lineHeight: 1.2 }}
                    >
                      Match Score <br /> 75%
                    </Typography>
                  </Box>
                  <Tooltip title="How this matching score?\n\nLorem ipsum..." placement="right">
                    <Typography
                      variant="caption"
                      color="primary" 
                      sx={{ ml: 2, cursor: 'pointer' }}
                    >
                      {/* Why this score? */}
                    </Typography>
                  </Tooltip>
                </Box>
                <Divider />
                {/* Job Description Paragraphs */}
                {[...Array(5)].map((_, i) => (
                  <Typography key={i} paragraph>
                    Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad
                    sunt. Pariatur sint culpa do incididunt eiusmod culpa. Mollit
                    in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt.
                  </Typography>
                ))}
              </CardContent>

            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Box bgcolor="grey.100" p={1} borderRadius={1} height="100%">
              <List disablePadding>
                {similarJobs.map((job) => (
                  <ListItem key={job.id} alignItems="flex-start" sx={{ mb: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <ListItemAvatar>
                      <Avatar src="https://logo.clearbit.com/google.com" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={job.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Salary: {job.salary} • {job.experience}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Box textAlign="right" mt={1}>
                <Link href="#" underline="none">View more similar jobs</Link>
              </Box>
            </Box>
          </Grid>
          <CardActions sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', mb: 2, ml: 45 }}>
            <Button variant="contained" size="large" sx={{ mx: 1, color: "#ffff", backgroundColor: "#0040D8", borderRadius: "100px", width: "200px" }}>Apply now</Button>
            <Button variant="outlined" size="large" sx={{ mx: 1, color: "#0040D8", backgroundColor: "#fff", borderRadius: "100px" }}>Boost my application</Button>
          </CardActions>
        </Grid>
      </Container>
    </Box>
  );
}
