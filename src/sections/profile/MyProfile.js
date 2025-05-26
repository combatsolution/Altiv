import {
  Box,
  Avatar,
  Container,
  Typography,
  IconButton,
  Paper,
  Divider,
  Link,
  Grid,
  Stack,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';

const profileImage =
  'https://storage.googleapis.com/a1aa/image/d2e3e9db-977f-4f86-ac27-74ba99b659f5.jpg';
const bannerImage =
  'https://storage.googleapis.com/a1aa/image/3cd90142-808b-468d-8f84-8f8dae057d2d.jpg';

const jobMatches = [
  {
    company: 'Google',
    logo: 'https://storage.googleapis.com/a1aa/image/b34fb2e9-b9cb-4fc2-144f-63f7040062d2.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'HE I need more information...',
  },
  {
    company: 'Netflix',
    logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'Awesome work, can you...',
  },
  {
    company: 'Google',
    logo: 'https://storage.googleapis.com/a1aa/image/b34fb2e9-b9cb-4fc2-144f-63f7040062d2.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'About files I can...',
  },
  {
    company: 'Netflix',
    logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'Have a great afternoon...',
  },
  {
    company: 'Netflix',
    logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'HE I need more information...',
  },
];

export default function MyProfile() {
  return (
    <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh' }}>
      

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Banner Section */}
        <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', border: '1px solid #3B82F6' }}>
          <Box
            component="img"
            src={bannerImage}
            alt="Banner"
            sx={{ width: '100%', height: 300, objectFit: 'cover' }}
          />
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              p: 2,
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              bgcolor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(6px)',
              borderRadius: 2,
            }}
          >
            <Avatar src={profileImage} sx={{ width: 48, height: 48 }} />
            <Box>
              <Typography fontWeight="600" fontSize="0.9rem">
                Jamesbond007
              </Typography>
              <Typography fontSize="0.75rem" color="text.secondary">
                Sr. Data scientist
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Content Section */}
        <Grid container spacing={3} mt={3}>
          {/* Profile Info */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight="600" fontSize="0.9rem">
                  Profile Information
                </Typography>
                <IconButton size="small">
                  <EditIcon fontSize="small" sx={{ color: '#6B7280' }} />
                </IconButton>
              </Box>
              <Typography fontSize="0.75rem" color="text.secondary" mb={2}>
                Directors are responsible for overseeing the development of an organizations business goals and objectives...
              </Typography>
              <Stack spacing={1}>
                {[
                  ['Full Name:', 'Jamesbond007'],
                  ['Mobile:', '(+91) 866 069 9999'],
                  ['Email:', 'abcd@email.com'],
                  [
                    'Resume:',
                    <>
                      Myresume_Latest.Doc{' '}
                      <Link href="#" underline="hover">
                        View
                      </Link>
                    </>,
                  ],
                  [
                    'Password:',
                    <>
                      ***********{' '}
                      <Link href="#" underline="hover">
                        Change password
                      </Link>
                    </>,
                  ],
                  ['Address:', 'Postmaster, Post Office BANGALORE CITY (SUB OFFICE), BANG'],
                ].map(([label, value]) => (
                  <Box key={label} display="flex" gap={1.5}>
                    <Typography sx={{ width: 90 }} fontSize="0.75rem" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography fontSize="0.75rem" fontWeight="600">
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Job Matches */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3 }}>
              <Typography fontWeight="600" fontSize="0.9rem" mb={2}>
                Top Job Matches
              </Typography>
              <Stack spacing={2}>
                {jobMatches.map((job, idx) => (
                  <Box key={idx} display="flex" gap={1.5}>
                    <Avatar src={job.logo} sx={{ width: 24, height: 24 }} />
                    <Box flexGrow={1}>
                      <Typography fontSize="0.75rem" fontWeight="600" noWrap>
                        {job.title}
                      </Typography>
                      <Typography fontSize="0.75rem" color="text.secondary" noWrap>
                        {job.snippet}
                      </Typography>
                    </Box>
                    <Link href="#" fontSize="0.75rem" underline="hover" sx={{ color: '#2563EB' }}>
                      Status
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
