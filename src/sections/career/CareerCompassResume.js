// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     Button,
//     Container,
//     Box,
//     Grid,
//     Card,
//     CardContent,
//     Chip,
//     Stack,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     useTheme,
//     useMediaQuery,
//     IconButton
// } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import SortIcon from '@mui/icons-material/Sort';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { wrap } from 'lodash';
// import { bgcolor } from '@mui/system';

// // Reusable JobCard
// const JobCard = ({ title, match, transition, salary, experience }) => {
//     JobCard.propTypes = {
//         title: PropTypes.string.isRequired,
//         match: PropTypes.number.isRequired,
//         transition: PropTypes.string.isRequired,
//         salary: PropTypes.string.isRequired,
//         experience: PropTypes.string.isRequired,
//     };

//     let chipColor = 'error';
//     if (match >= 80) chipColor = 'success';
//     else if (match >= 70) chipColor = 'warning';

//     return (
//         <Card variant="outlined" sx={{ position: 'relative', p: 2, }}>
//             <CardContent >
//                 <Stack direction="row" justifyContent="space-between">
//                     <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
//                     <Chip label={`${match}% Match`} color={chipColor} size="small" />
//                 </Stack>
//                 <Typography variant="body2" sx={{ color: "#0040D8" }}>{transition} Transition rate</Typography>
//                 <Typography variant="body2" mt={1}>Salary: {salary}</Typography>
//                 <Typography variant="body2">Experience: {experience}</Typography>
//             </CardContent>
//         </Card>
//     );
// };

// const CareerCompass = () => {
//     const theme = useTheme();
//     const isMd = useMediaQuery(theme.breakpoints.up('md'));
//     const [years, setYears] = React.useState(5);

//     const sections = {
//         current: [{ title: 'Lead Data Scientist', match: 95, transition: '18%', salary: '$50L - $55L', experience: '8-12 years' }],
//         next: ['Senior Data Scientist', 'Senior Data Scientist 1', 'Senior Data Scientist 2', 'Senior Data Scientist 3'],
//         executive: ['Director Data Science', 'Sr Director Data Science', 'VP Data Science'],
//         alternate: ['Venture Partner', 'Independent Board Advisor']
//     };

//     return (
//         <Box>


//             {/* Breadcrumb & Upload */}
//             <Box sx={{ bgcolor: 'grey.100', py: 2 }}>
//                 <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                         <IconButton><HomeIcon /></IconButton>
//                         <Typography fontWeight={600}>Career Compass</Typography>
//                     </Stack>
//                     <Button variant="outlined" startIcon={<CloudUploadIcon />}>Upload resume to unlock your potential</Button>
//                 </Container>
//             </Box>

//             {/* Controls */}
//             <Container sx={{ py: 5 }}>
//                 <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} md={4}>
//                         <Stack direction="row" spacing={1} alignItems="center">
//                             <AssignmentIcon />
//                             <Box>
//                                 <Typography fontWeight={600}>Lead Data Scientist</Typography>
//                                 <Typography variant="caption" color="text.secondary">Popular: Senior Data Scientist, Director Data Science</Typography>
//                             </Box>
//                         </Stack>
//                     </Grid>
//                     <Grid item xs={8} md={3}>
//                         <FormControl fullWidth>
//                             <InputLabel>Years</InputLabel>
//                             <Select value={years} label="Years" onChange={e => setYears(e.target.value)} startAdornment={<SortIcon sx={{ mr: 1 }} />}>
//                                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(y => <MenuItem key={y} value={y}>{y} Years</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={4} md={2} textAlign={isMd ? 'right' : 'left'}>
//                         <Button variant="outlined">Modify</Button>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Stack direction="row" spacing={1} alignItems="center">
//                             <Typography>Personalized career path projection for <strong>first name</strong> and <strong><u>Job designation</u></strong></Typography>
//                             <CheckCircleIcon color="primary" />
//                         </Stack>
//                     </Grid>
//                 </Grid>

//                 {/* Timeline & Cards */}
//                 <Stack spacing={5} mt={4}>
//                     {/* Current Role */}
//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                         alignItems: 'center',

//                     }}>
//                         <Box
//                             sx={{
//                                 width: 80,
//                                 height: 80,
//                                 borderRadius: '35%',
//                                 backgroundColor: '#0040D8',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 color: 'white',
//                                 fontWeight: 'bold',
//                                 fontSize: '1rem',
//                                 mb: 2,
//                                 mr: 3,
//                                 textAlign: 'center',
//                                 px: 1,
//                             }}
//                         >
//                             <Typography>Current</Typography>
//                             <Typography>Role</Typography>
//                         </Box>

//                         <Grid container spacing={2}>
//                             {sections.current.map((r, i) => (
//                                 <Grid item xs={12} md={5} key={i}>
//                                     <JobCard {...r} />
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     </Box>


//                     {/* Next Level */}
//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                         alignItems: 'center',

//                     }}>
//                         <Box
//                             sx={{
//                                 width: 100,
//                                 height: 80,
//                                 borderRadius: '35%',
//                                 backgroundColor: '#F5F5F5',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 color: 'black',
//                                 fontWeight: 'bold',
//                                 fontSize: '1rem',
//                                 mb: 2,
//                                 mr: 3,
//                                 textAlign: 'center',
//                                 px: 1,
//                             }}
//                         >
//                             <Typography>Next Level</Typography>
//                             <Typography>2-4 yrs</Typography>
//                         </Box>

//                         <Grid container spacing={2}>
//                             {sections.next.map((t, i) => 
//                             <Grid item xs={12} sm={6} md={4} key={i}>
//                                 <JobCard title={t} match={80} transition="18%" salary="$50L - $55L" experience="8-12 years" /></Grid>)}
//                         </Grid>
//                     </Box>

//                     {/* Executive Level */}
//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                         alignItems: 'center',

//                     }}>
//                         <Box
//                             sx={{
//                                 width: 100,
//                                 height: 80,
//                                 borderRadius: '35%',
//                                 backgroundColor: '#F5F5F5',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 color: 'black',
//                                 fontWeight: 'bold',
//                                 fontSize: '1rem',
//                                 mb: 2,
//                                 mr: 3,
//                                 textAlign: 'center',
//                                 px: 1,
//                             }}
//                         >
//                             <Typography>Executive</Typography>
//                             <Typography>Level</Typography>
//                         </Box>

//                         <Grid container spacing={2}>
//                             {sections.executive.map((t, i) => <Grid item xs={12} sm={6} md={4} key={i}><JobCard title={t} match={74} transition="18%" salary="$50L - $55L" experience="8-12 years" /></Grid>)}
//                         </Grid>
//                     </Box>

//                     {/* Alternate Path */}
//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                         alignItems: 'center',

//                     }}>
//                         <Box
//                             sx={{
//                                 width: 100,
//                                 height: 80,
//                                 borderRadius: '35%',
//                                 backgroundColor: '#F5F5F5',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 color: 'black',
//                                 fontWeight: 'bold',
//                                 fontSize: '1rem',
//                                 mb: 2,
//                                 mr: 3,
//                                 textAlign: 'center',
//                                 px: 1,
//                             }}
//                         >
//                             <Typography>Alternate</Typography>
//                             <Typography>Path</Typography>
//                         </Box>

//                         <Grid container spacing={2}>
//                             {sections.alternate.map((t, i) => <Grid item xs={12} sm={6} md={4} key={i}><JobCard title={t} match={45} transition="18%" salary="$50L - $55L" experience="8-12 years" /></Grid>)}
//                         </Grid>
//                     </Box>
//                 </Stack>

//                 {/* CTA */}
//                 <Box textAlign="center" mt={5}>
//                     <Button
//                         variant="contained"
//                         size="large"
                       
//                         sx={{
//                             bgcolor: "#0040D8", 
//                             color: "#FFFFFF",
//                             '&:hover': {
//                                 bgcolor: "#0030A0"
//                             },
//                             borderRadius:40
//                         }}
//                     >
//                         Show job match
//                     </Button>
//                 </Box>
//             </Container>
//         </Box>
//     );
// };

// export default CareerCompass;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FaClipboardList, FaSortNumericUpAlt, FaInfoCircle } from 'react-icons/fa';

// Badge and label styles
const labelStyles = {
  primary: {
    bgcolor: 'primary.main',
    color: 'common.white',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: '50%',
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    bgcolor: 'common.white',
    border: 1,
    borderColor: 'grey.300',
    color: 'grey.700',
    fontSize: 11,
    fontWeight: 400,
    borderRadius: '50%',
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const badgeStyles = {
  display: 'inline-block',
  bgcolor: '#E8F0FF',
  color: '#1976d2',
  fontSize: 10,
  fontWeight: 600,
  borderRadius: 1,
  px: 0.5,
  py: 0.25,
  mb: 1,
};

const matchStyles = {
  base: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 10,
    fontWeight: 600,
    px: 1,
    py: 0.5,
    borderRadius: 1,
    textAlign: 'center',
  },
  success: { bgcolor: '#E6F4EA', color: '#2E7D32' },
  warning: { bgcolor: '#FFF8E1', color: '#F9A825' },
  error: { bgcolor: '#FDECEA', color: '#D32F2F' },
};

// CareerCard Component
const CareerCard = ({ title, match, rate, salary, experience }) => {
  let variant = matchStyles.success;
  if (match < 50) variant = matchStyles.error;
  else if (match < 80) variant = matchStyles.warning;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        position: 'relative',
        minWidth: 260,
        flex: 1,
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Box component="span" sx={badgeStyles}>
        {rate} Transition rate
      </Box>

      <Typography variant="caption" color="grey.600" sx={{ lineHeight: 1.4 }}>
        Salary: {salary}
        <br />
        Experience: {experience}
      </Typography>

      <Box component="span" sx={{ ...matchStyles.base, ...variant }}>
        {match}%
        <br />
        Match
      </Box>
    </Paper>
  );
};

CareerCard.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.number.isRequired,
  rate: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
};

// Main Component
export default function CareerPathProjection() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [jobTitle, setJobTitle] = useState('Lead Data Scientist');
  const [expYears, setExpYears] = useState(5);

  const paths = {
    current: {
      title: 'Lead Data Scientist',
      match: 95,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
    },
    next: Array(4).fill({
      title: 'Senior Data Scientist',
      match: 80,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
    }),
    executive: [
      { title: 'Director Data Science', match: 74, rate: '18%', salary: '$50L - $55L', experience: '8-12 years' },
      { title: 'Sr Director Data Science', match: 74, rate: '18%', salary: '$50L - $55L', experience: '8-12 years' },
      { title: 'VP Data Science', match: 74, rate: '18%', salary: '$50L - $55L', experience: '8-12 years' },
    ],
    alternate: [
      { title: 'Venture Partner', match: 45, rate: '18%', salary: '$50L - $55L', experience: '8-12 years' },
      { title: 'Independent Board Advisor', match: 45, rate: '18%', salary: '$50L - $55L', experience: '8-12 years' },
    ],
  };

  return (
    <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 3, md: 5 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Input Controls */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ md: 'center' }}
          sx={{ borderBottom: 1, borderColor: 'grey.300', pb: 2, mb: 2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'left',
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 1,
              px: 2,
              py: 1,
              width: { xs: '100%', md: 320 },
            }}
          >
            <FaClipboardList style={{ marginRight: 8, color: theme.palette.grey[600] }} />
            <TextField
              variant="standard"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              InputProps={{ disableUnderline: true, sx: { fontSize: 14 } }}
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 1,
              px: 2,
              py: 1,
              width: { xs: '100%', md: 160 },
            }}
          >
            <FaSortNumericUpAlt style={{ marginRight: 2, color: theme.palette.grey[600] }} />
            <Select
              value={expYears}
              onChange={({ target }) => setExpYears(target.value)}
              disableUnderline
              variant="standard"
              sx={{ fontSize: 14 }}
              fullWidth
            >
              {[...Array(8)].map((_, idx) => (
                <MenuItem key={idx + 1} value={idx + 1}>
                  {idx + 1} Years
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ ml: 'auto' }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: 'none', borderRadius: 999, px: 4, py: 1 }}
            >
              Modify
            </Button>
          </Box>
        </Stack>

        {/* Info Text */}
        <Typography variant="caption" color="grey.500" sx={{ mt: 1, mb: 2 }}>
          Popular: Senior Data Scientist, Director Data Science
        </Typography>

        <Typography variant="body2" sx={{ mb: 4 }}>
          Personalized career path projection for{' '}
          <Box component="span" fontWeight={600} display="inline">
            first name
          </Box>{' '}
          and{' '}
          <Box component="span" fontWeight={600} display="inline">
            Job designation
          </Box>
          <FaInfoCircle style={{ marginLeft: 4, color: theme.palette.primary.main, fontSize: 14 }} />
        </Typography>

        {/* Career Path Layout */}
        <Box
          sx={{
            position: 'relative',
            border: 1,
            borderColor: 'grey.300',
            borderRadius: 2,
            p: 2,
            mb: 4,
          }}
        >
          {/* Vertical Line */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              top: 72,
              bottom: 80,
              left: { xs: 40, md: 64 },
              width: 2,
              bgcolor: 'primary.main',
              borderRadius: 1,
            }}
          />

          {/* Labels */}
          <Stack
            spacing={isMdUp ? 6 : 4}
            sx={{ position: 'absolute', left: 25, top: 70 }}
          >
            <Box sx={labelStyles.primary}>Current Role</Box>
            <Box sx={labelStyles.secondary}>Next Level<br />2-4 yrs</Box>
            <Box sx={labelStyles.secondary}>Executive<br />Level</Box>
            <Box sx={labelStyles.secondary}>Alternate<br />Path</Box>
          </Stack>

          {/* Cards */}
          <Stack spacing={6} sx={{ ml: { xs: 72, md: 120 } }}>
            <CareerCard {...paths.current} />

            <Grid container spacing={2}>
              {paths.next.map((p, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <CareerCard {...p} />
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={2}>
              {paths.executive.map((p, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <CareerCard {...p} />
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={2}>
              {paths.alternate.map((p, i) => (
                <Grid item xs={12} sm={6} md={6} key={i}>
                  <CareerCard {...p} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Box>

        {/* Bottom Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            
            sx={{ textTransform: 'none', borderRadius: 999, px: 1, py: 1.5, color:"#ffff", bgcolor:"#0040D8" }}
          >
            Show job match
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
