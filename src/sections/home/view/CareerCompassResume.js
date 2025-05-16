import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    Chip,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useTheme,
    useMediaQuery,
    IconButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SortIcon from '@mui/icons-material/Sort';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { wrap } from 'lodash';
import { bgcolor } from '@mui/system';

// Reusable JobCard
const JobCard = ({ title, match, transition, salary, experience }) => {
    JobCard.propTypes = {
        title: PropTypes.string.isRequired,
        match: PropTypes.number.isRequired,
        transition: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
        experience: PropTypes.string.isRequired,
    };

    let chipColor = 'error';
    if (match >= 80) chipColor = 'success';
    else if (match >= 70) chipColor = 'warning';

    return (
        <Card variant="outlined" sx={{ position: 'relative', p: 2, }}>
            <CardContent >
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
                    <Chip label={`${match}% Match`} color={chipColor} size="small" />
                </Stack>
                <Typography variant="body2" sx={{ color: "#0040D8" }}>{transition} Transition rate</Typography>
                <Typography variant="body2" mt={1}>Salary: {salary}</Typography>
                <Typography variant="body2">Experience: {experience}</Typography>
            </CardContent>
        </Card>
    );
};

const CareerCompass = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const [years, setYears] = React.useState(5);

    const sections = {
        current: [{ title: 'Lead Data Scientist', match: 95, transition: '18%', salary: '$50L - $55L', experience: '8-12 years' }],
        next: ['Senior Data Scientist', 'Senior Data Scientist 1', 'Senior Data Scientist 2', 'Senior Data Scientist 3'],
        executive: ['Director Data Science', 'Sr Director Data Science', 'VP Data Science'],
        alternate: ['Venture Partner', 'Independent Board Advisor']
    };

    return (
        <Box>


            {/* Breadcrumb & Upload */}
            <Box sx={{ bgcolor: 'grey.100', py: 2 }}>
                <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton><HomeIcon /></IconButton>
                        <Typography fontWeight={600}>Career Compass</Typography>
                    </Stack>
                    <Button variant="outlined" startIcon={<CloudUploadIcon />}>Upload resume to unlock your potential</Button>
                </Container>
            </Box>

            {/* Controls */}
            <Container sx={{ py: 5 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <AssignmentIcon />
                            <Box>
                                <Typography fontWeight={600}>Lead Data Scientist</Typography>
                                <Typography variant="caption" color="text.secondary">Popular: Senior Data Scientist, Director Data Science</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={8} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Years</InputLabel>
                            <Select value={years} label="Years" onChange={e => setYears(e.target.value)} startAdornment={<SortIcon sx={{ mr: 1 }} />}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(y => <MenuItem key={y} value={y}>{y} Years</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} md={2} textAlign={isMd ? 'right' : 'left'}>
                        <Button variant="outlined">Modify</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Personalized career path projection for <strong>first name</strong> and <strong><u>Job designation</u></strong></Typography>
                            <CheckCircleIcon color="primary" />
                        </Stack>
                    </Grid>
                </Grid>

                {/* Timeline & Cards */}
                <Stack spacing={5} mt={4}>
                    {/* Current Role */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '35%',
                                backgroundColor: '#0040D8',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                mb: 2,
                                mr: 3,
                                textAlign: 'center',
                                px: 1,
                            }}
                        >
                            <Typography>Current</Typography>
                            <Typography>Role</Typography>
                        </Box>

                        <Grid container spacing={2}>
                            {sections.current.map((r, i) => (
                                <Grid item xs={12} md={5} key={i}>
                                    <JobCard {...r} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>


                    {/* Next Level */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Box
                            sx={{
                                width: 100,
                                height: 80,
                                borderRadius: '35%',
                                backgroundColor: '#F5F5F5',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                mb: 2,
                                mr: 3,
                                textAlign: 'center',
                                px: 1,
                            }}
                        >
                            <Typography>Next Level</Typography>
                            <Typography>2-4 yrs</Typography>
                        </Box>

                        <Grid container spacing={2}>
                            {sections.next.map((t, i) => 
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <JobCard title={t} match={80} transition="18%" salary="$50L - $55L" experience="8-12 years" /></Grid>)}
                        </Grid>
                    </Box>

                    {/* Executive Level */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Box
                            sx={{
                                width: 100,
                                height: 80,
                                borderRadius: '35%',
                                backgroundColor: '#F5F5F5',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                mb: 2,
                                mr: 3,
                                textAlign: 'center',
                                px: 1,
                            }}
                        >
                            <Typography>Executive</Typography>
                            <Typography>Level</Typography>
                        </Box>

                        <Grid container spacing={2}>
                            {sections.executive.map((t, i) => <Grid item xs={12} sm={6} md={4} key={i}><JobCard title={t} match={74} transition="18%" salary="$50L - $55L" experience="8-12 years" /></Grid>)}
                        </Grid>
                    </Box>

                    {/* Alternate Path */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Box
                            sx={{
                                width: 100,
                                height: 80,
                                borderRadius: '35%',
                                backgroundColor: '#F5F5F5',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                mb: 2,
                                mr: 3,
                                textAlign: 'center',
                                px: 1,
                            }}
                        >
                            <Typography>Alternate</Typography>
                            <Typography>Path</Typography>
                        </Box>

                        <Grid container spacing={2}>
                            {sections.alternate.map((t, i) => <Grid item xs={12} sm={6} md={4} key={i}><JobCard title={t} match={45} transition="18%" salary="$50L - $55L" experience="8-12 years" /></Grid>)}
                        </Grid>
                    </Box>
                </Stack>

                {/* CTA */}
                <Box textAlign="center" mt={5}>
                    <Button
                        variant="contained"
                        size="large"
                       
                        sx={{
                            bgcolor: "#0040D8", 
                            color: "#FFFFFF",
                            '&:hover': {
                                bgcolor: "#0030A0"
                            },
                            borderRadius:40
                        }}
                    >
                        Show job match
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default CareerCompass;
