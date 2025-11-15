/* eslint-disable no-else-return */
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';
import { useNavigate } from 'react-router';
import {
  Box,
  Avatar,
  Container,
  Typography,
  IconButton,
  Paper,
  Link,
  Grid,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
} from '@mui/material';
import { trackEvent } from 'src/utils/google-analytics';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BoltIcon from '@mui/icons-material/Bolt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { paths } from 'src/routes/paths';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuthContext } from 'src/auth/hooks';
import bgImage from 'src/images/image.png';
import Writelogo from 'src/images/write.svg';
import axiosInstance, { endpoints } from 'src/utils/axios';
import axios from 'axios';

import { green } from '@mui/material/colors';
import { useSnackbar } from 'notistack';
import { SplashScreen } from 'src/components/loading-screen';
import { format } from 'date-fns';
import MetricsCards from './MetricsCards';
import ProfileChangePassword from './profile-change-password-modal';
import ProfileUpdateModal from './profile-update-modal';
import AIReadinessDashboard from '../ai_readline/AIReadinessDashboard';


const jobMatches = []; // You can populate this later

// Add planTypeToLabel for mapping
const planTypeToLabel = {
  1: 'Marketing',
  2: 'Data Science',
  3: 'Product Management',
};



export default function MyProfile() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const [lastFOBOData, setLastFOBOData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const fileInputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [profileAnalytics, setProfileAnalytics] = useState(null);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [lmsId, setlmsId] = useState();

  const [existingResumes, setExistingResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);

  const [profileData, setProfileData] = useState(null);

  const [subscriptions, setSubscriptions] = useState([]); // New state for subscriptions
  const [isSubscriptionsLoading, setIsSubscriptionsLoading] = useState(false);

  const [reusmeId, setResumeId] = useState(sessionStorage.getItem("resumeId"));
  const hasResumes = existingResumes && existingResumes.length > 0;
  const hasCourses = subscriptions && subscriptions.length > 0;
  const [showResume, setShowResume] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const resumeId = user?.resumes?.at(-1)?.id;
  const [serviceUnlocked, setServiceUnlocked] = useState(false);
  const [metricsData, setMetricsData] = useState();
  const [myprofile, setmyprofile] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await axiosInstance.get(
          "/subscriptions/service-subscriptions-by-user/fobo-pro"
        );
        setServiceUnlocked(res.data?.success === true);  // ALWAYS boolean TRUE/FALSE
      } catch (err) {
        setServiceUnlocked(false);
      }
    };

    fetchSubscription();
  }, [user]);

  useEffect(() => {
    if (!profileAnalytics) return;

    setMetricsData([
      {
        title: "AI-Readiness Score",
        value: profileAnalytics?.AI_Readiness_Score ?? 0,
        suffix: "%",
        subtitle: "Above Average",
        color: "#3b82f6",
        icon: <TrackChangesIcon sx={{ fontSize: 28, color: "#3b82f6" }} />,
      },
      {
        title: "Transformation Timeline",
        value: profileAnalytics?.transformation_timeline ?? 0,
        suffix: "",
        subtitle: "Months",
        color: "#f59e0b",
        icon: <BoltIcon sx={{ fontSize: 28, color: "#f59e0b" }} />,
      },
      {
        title: "Automation Potential",
        value: profileAnalytics?.automation_potential ?? 0,
        suffix: "%",
        subtitle: "High Impact",
        color: "#ec4899",
        icon: <RocketLaunchIcon sx={{ fontSize: 28, color: "#ec4899" }} />,
      },
      {
        title: "Strategic Objectives",
        value: profileAnalytics?.strategic_objective_count ?? 0,
        suffix: "",
        subtitle: "Key Goals",
        color: "#facc15",
        icon: <EmojiObjectsIcon sx={{ fontSize: 28, color: "#facc15" }} />,
      },
    ]);
  }, [profileAnalytics]);

  // const lastFOBOData = JSON.parse(sessionStorage.getItem("lastFOBOData")) || {};

  useEffect(() => {
    setShowResume(hasResumes);
    setShowCourses(hasCourses);
  }, [hasResumes, hasCourses]);

  // Fetch subscription history
  const fetchSubscriptionHistory = useCallback(async () => {
    setIsSubscriptionsLoading(true);
    try {
      const response = await axiosInstance.get('/subscriptions/user');
      if (response && response.data) {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        console.log('Subscriptions ->', data);

        const formattedData = data.map((plan) => ({
          id: plan.id || `sub_${Date.now()}`,
          planType: plan.planData?.planType ?? 0,
          planname: plan.planData?.courses?.courseName || 'N/A',
          lmsId: plan.planData?.courses?.lmsId || 'N/A',
          planGroup: plan.planData?.planGroup,
        }));
        const filteredData = formattedData.filter((plan) => plan.planGroup === 0);

        setSubscriptions(filteredData);
      } else {
        setSubscriptions([]);
      }
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setSubscriptions([]);
      setError('Failed to load subscriptions. Please try again.');
    } finally {
      setIsSubscriptionsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setExistingResumes(user?.resumes || []);
      setSelectedResumeId(null);
      fetchSubscriptionHistory(); // Fetch subscriptions on mount
    }
    setIsLoading(false);
  }, [user, fetchSubscriptionHistory]);

  const fetchLastFoboScore = async () => {
    try {
      const resumeIds = existingResumes?.map((resume) => resume.id) || [];
      if (resumeIds.length > 0) {
        const response = await axiosInstance.post('/last-fobo-score', { resumeIds });
        if (response?.data?.success) {
          setLastFOBOData(response?.data?.analytics);
        }
      }
      // eslint-disable-next-line no-shadow
    } catch (error) {
      console.log('Error while fetching last fobo score', error);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setExistingResumes(user?.resumes || []);
      setSelectedResumeId(null);
      trackEvent({
        category: 'Profile',
        action: 'Viewed Profile Page',
        label: user?.email || 'Anonymous',
        value: 79,
      });

    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (existingResumes) {
      fetchLastFoboScore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingResumes]);
  const lmsredirect = async (id) => {
    console.log('id', id);

    const fetchToken = async () => {
      const LmsTokenResp = await axiosInstance.get(endpoints.auth.me);
      const storedToken = LmsTokenResp.data.lmsToken;
      if (storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
        return storedToken;
      }
      const formData = new URLSearchParams();
      formData.append('grant_type', 'client_credentials');
      formData.append('client_id', process.env.REACT_APP_LEARNWORLDS_CLIENT_ID);
      formData.append('client_secret', process.env.REACT_APP_LEARNWORLDS_TOKEN);

      const response = await axios.post(
        'https://altiv.learnworlds.com/admin/api/oauth2/access_token',
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const token = response.data?.tokenData?.access_token;
      return token;

    };

    const token = await fetchToken();
    const ssoRes = await axiosInstance.get(`/sso/sso-login/${id}/${token}`);
    window.open(ssoRes.data.url, '_blank');
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    trackEvent({
      category: 'Resume',
      action: 'Attempt Upload',
      label: 'profile',
      value: 80,
    });

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      setError(null);
      setSuccess(null);

      const res = await axiosInstance.post('/files', formData);
      const uploadedFileData = res.data.files?.[0];
      if (!uploadedFileData) throw new Error('Invalid file upload response');

      const resumeRes = await axiosInstance.post('/resumes', { fileDetails: uploadedFileData });
      setExistingResumes((prev) => [...prev, resumeRes.data]);
      setSelectedResumeId(null);
      setSuccess('Resume uploaded successfully');
      trackEvent({
        category: 'Resume',
        action: 'Upload Success',
        label: "Resume Uploaded",
        value: 81,
      });


    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload resume');
    } finally {
      setIsUploading(false);
      fileInputRef.current.value = '';
    }
  };

  const handleSelectResume = (id) => {
    setSelectedResumeId(id);
    const selected = existingResumes.find((r) => r.id === id);
    trackEvent({
      category: 'Resume',
      action: 'Selected Resume',
      label: selected?.fileDetails?.fileName || 'Unknown Resume',
      value: 82,
    });

    setError(null);
  };
  useEffect(() => {
    const payload = {
      resumeId,
      viewDetails: true,
      smartInsights: true,
      isFoboPro: true,
      isComprehensiveMode: true,
    };

    const fetchProfileAnalytics = async () => {
      try {
        const response = await axiosInstance.post("/profile-analytics", payload);
        setProfileAnalytics(response.data.data);
      } catch (err) {
        console.error("Error fetching profile analytics:", err);
      }
    };

    console.log("shdskjdsds", resumeId, serviceUnlocked);

    if (resumeId && serviceUnlocked === true) fetchProfileAnalytics();
  }, [resumeId, serviceUnlocked]);

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setExistingResumes(user?.resumes || []);
      setSelectedResumeId(null);
      trackEvent({
        category: 'Profile',
        action: 'Viewed Profile Page',
        label: user?.email || 'Anonymous',
        value: 79,
      });

      // fetch subscriptions and analytics (non-blocking)
      fetchSubscriptionHistory();
    }
    setIsLoading(false);
  }, [user, fetchSubscriptionHistory]);



  const handleDeleteResume = async (id) => {

    const deleted = existingResumes.find((r) => r.id === id);
    trackEvent({
      category: 'Resume',
      action: 'Delete Clicked',
      label: deleted?.fileDetails?.fileName || 'Unknown Resume',
      value: 81,
    });

    try {
      await axiosInstance.delete(`/resumes/${id}`);
      setExistingResumes((prev) => prev.filter((resume) => resume.id !== id));
      if (selectedResumeId === id) setSelectedResumeId(null);
      setSuccess('Resume deleted successfully');
      trackEvent({
        category: 'Resume',
        action: 'Deleted Successfully',
        label: deleted?.fileDetails?.fileName || 'Unknown Resume',
        value: 81,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to delete resume. Please try again.');
    } finally {
      setConfirmDeleteOpen(false);
      setResumeToDelete(null);
    }
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error, success]);

  if (loading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const renderRegisteredCourses = () => {
    if (isSubscriptionsLoading) {
      return (
        <Typography variant="body2" color="text.secondary">
          Loading courses...
        </Typography>
      );
    }

    if (subscriptions.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary" width="650px" display="flex-start">
          No registered courses found
        </Typography>
      );
    }

    const categoryColors = {
      Marketing: 'primary.main',
      'Data Science': 'success.main',
      'Product Management': 'warning.main',
    };

    const categoryBgColors = {
      Marketing: '#fff',
      'Data Science': '#fff',
      'Product Management': '#fff',
    };

    const categoryIcons = {
      Marketing: '📈',
      'Data Science': '🧪',
      'Product Management': '📊',
    };

    return (
      <Stack spacing={1.5}>
        {subscriptions.map((sub) => {
          const categoryLabel = planTypeToLabel[sub.planType];
          const icon = categoryIcons[categoryLabel] || '🎓';

          return (
            <Card
              key={sub.id}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1.5,
                bgcolor: categoryBgColors[categoryLabel] || 'grey.50',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                boxSizing: 'border-box',
                minHeight: 56,
              }}
              onClick={() => {
                trackEvent({
                  category: 'LMS',
                  action: 'Course Clicked',
                  label: sub.planname,
                  value: 85,
                });
                lmsredirect(sub.lmsId);
              }}
              elevation={0}
            >
              {/* Left: Icon + Category */}
              <Box display="flex" alignItems="center" gap={1.5} sx={{ flexShrink: 0, width: { xs: '40px', lg: '140px' }, }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: categoryColors[categoryLabel] || 'grey.300',
                    color: 'common.white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: categoryColors[categoryLabel] || 'text.primary',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={categoryLabel}
                >
                  {categoryLabel}
                </Typography>
              </Box>

              {/* Right: Plan Name */}
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  fontWeight: 500,
                  ml: 2,
                  flexGrow: 1,
                  maxWidth: 'calc(100% - 160px)', // remaining width
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'right',
                }}
                title={sub.planname}
              >
                {sub.planname}
              </Typography>
            </Card>
          );
        })}
      </Stack>

    );
  };

  const getLevelColor = () => {
    if (lastFOBOData?.FOBO_Score <= 39) return '#00C853';
    if (lastFOBOData?.FOBO_Score <= 69) return '#F57F17';
    return '#E53935';
  };

  const getLabelStyles = () => {
    if (isMobile) {
      return {
        good: { top: '20%', left: '10%', transform: 'rotate(-60deg)' },
        moderate: { top: '-17%', right: '5%', transform: 'rotate(11deg)' },
        bad: { top: '20%', right: '12%', transform: 'rotate(60deg)' },
      };
    } else if (isTablet) {
      return {
        good: { top: '29%', left: '15%', transform: 'rotate(-60deg)' },
        moderate: { top: '-10%', right: '23%', transform: 'rotate(10deg)' },
        bad: { top: '35%', right: '14%', transform: 'rotate(60deg)' },
      };
    } else {
      return {
        good: { top: '35%', left: '8%', transform: 'rotate(-56deg)' },
        moderate: { top: '-17%', right: '43%', transform: 'rotate(11deg)' },
        bad: { top: '35%', right: '43%', transform: 'rotate(60deg)' },
      };
    }
  };

  const getCountStyles = () => {
    if (isMobile) {
      return {
        good: { top: '27%', left: '18%', transform: 'rotate(-60deg)' },
        moderate: { top: '10%', right: '38%', transform: 'rotate(7deg)' },
        bad: { top: '28%', right: '17%', transform: 'rotate(60deg)' },
      };
    } else if (isTablet) {
      return {
        good: { top: '35%', left: '22%', transform: 'rotate(-60deg)' },
        moderate: { top: '12%', right: '42%', transform: 'rotate(10deg)' },
        bad: { top: '41%', right: '20%', transform: 'rotate(60deg)' },
      };
    } else {
      return {
        good: { top: '44%', left: '13%', transform: 'rotate(-58deg)' },
        moderate: { top: '15%', right: '60%', transform: 'rotate(10deg)' },
        bad: { top: '45%', right: '46%', transform: 'rotate(61deg)' },
      };
    }
  };

  const labelStyles = getLabelStyles();
  const countStyles = getCountStyles();

  const MemoizedGaugeChart = React.memo(
    ({ score }) => {
      const percent = score / 100;
      const levelColor = useMemo(() => getLevelColor(score), [score]);

      return (
        <div style={{ position: 'relative', width: '100%', margin: 'auto', marginTop: '20px' }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={8} mt={2}>
              {/* Gauge Chart */}
              <GaugeChart
                id="fobo-gauge"
                nrOfLevels={3}
                arcsLength={[0.39, 0.3, 0.31]}
                colors={['#00C853', '#FFB300', '#D32F2F']}
                percent={percent}
                arcPadding={0}
                arcWidth={0.3} // <- Increase this value for thicker arcs (default is ~0.2)
                needleColor="#424242"
                textColor="transparent"
                style={{ width: '100%' }}
                animate
              />

              <div
                style={{
                  position: 'absolute',
                  ...labelStyles.good,
                }}
              >
                <Typography variant="body1">Good</Typography>
              </div>

              <div
                style={{
                  position: 'absolute',
                  ...countStyles.good,
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant="body1">
                  0 - 39
                </Typography>
              </div>

              <div
                style={{
                  position: 'absolute',
                  ...labelStyles.moderate,
                }}
              >
                <svg width="300" height="150">
                  <defs>
                    <path
                      id="curve"
                      d="M 50,150
                        A 100,100 0 0,1 250,150"
                      fill="transparent"
                    />
                  </defs>

                  <text fill="#000" fontSize="16" fontFamily="Arial">
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">
                      Moderate
                    </textPath>
                  </text>
                </svg>
              </div>

              <div
                style={{
                  position: 'absolute',
                  ...countStyles.moderate,
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant="body1">
                  40 - 69
                </Typography>
              </div>

              <div
                style={{
                  position: 'absolute',
                  ...labelStyles.bad,
                }}
              >
                <Typography variant="body1">Bad</Typography>
              </div>

              <div
                style={{
                  position: 'absolute',
                  ...countStyles.bad,
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant="body1">
                  70 - 100
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              {/* FOBO Label and Score */}
              <div style={{ textAlign: 'center', marginTop: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 18 }}>FOBO SCORE</div>
                <div style={{ fontWeight: 'bold', fontSize: 24, color: levelColor }}>{score}</div>
              </div>
            </Grid>
          </Grid>
        </div>
      );
    },
    (prev, next) => prev.score === next.score
  );
  MemoizedGaugeChart.propTypes = {
    score: PropTypes.number,
  };

  return !isLoading ? (
    <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh' }}>
      {error && (
        <Alert severity="error" sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
          {success}
        </Alert>
      )}

      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, lg: 4 } }}>
        {/* Profile Banner */}
        <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid transparent' }}>
          <Box
            component="img"
            src={profileData?.backgroundImage?.fileUrl || bgImage}
            alt="Banner"
            sx={{ width: '100%', height: 300, objectFit: 'cover' }}
          />
          {profileData?.fullName && profileData?.fullName !== '' && (
            // (profileData?.designation && profileData?.designation !== '')
            <Paper
              elevation={3}
              sx={{
                position: 'relative',
                p: 2,
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between', // added
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(6px)',
                borderRadius: 2,
                mt: -6,
                mx: 2,
              }}
            >
              {/* Left: Avatar + name */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={profileData?.avatar?.fileUrl || ''} sx={{ width: 48, height: 48 }} />
                <Box>
                  {profileData?.fullName && (
                    <Typography fontWeight="600">{profileData.fullName}</Typography>
                  )}
                </Box>
              </Box>

              {/* Right: Button */}
              <Button

                onClick={() => {
                  trackEvent({
                    category: 'Profile',
                    action: 'Upgrade Plan Clicked',
                    label: 'Upgrade Plan',
                    value: 83,
                  });
                  navigate(paths.pricing)
                }}
                variant="outlined"
                sx={{
                  height: '40px',
                  borderRadius: '100px',
                  backgroundColor: 'common.white',
                  color: 'primary.main',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    color: 'primary.dark',
                  },
                }}
              >
                Upgrade Plan
              </Button>
            </Paper>
          )}
        </Box>

        {/* Profile Info and Resume Section */}
        <Grid container spacing={0.5} mt={3} mx={0.2}>
          <Grid item xs={12} lg={showResume || showCourses ? 8 : 12}>
            <Paper sx={{ p: { xs: '0', lg: '29px' } }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0}>
                <Typography fontWeight="600">Profile Information</Typography>
                <IconButton onClick={() => {

                  trackEvent({
                    category: 'Profile',
                    action: 'Edit Profile Clicked',
                    label: 'Edit Profile',
                    value: 86,
                  });
                  setOpenEditDialog(true)
                }}>
                  <Box component="img" src={Writelogo} alt="Edit" sx={{ height: 20 }} />
                </IconButton>
              </Box>

              <Typography sx={{ mb: 2 }}>{profileData?.profileDescription}</Typography>

              <Stack spacing={1}>
                {[
                  ['Full Name:', profileData?.fullName],
                  ['Mobile:', profileData?.phoneNumber || 'Not specified'],
                  ['Email:', profileData?.email],
                  [
                    'Resume:',
                    existingResumes.length > 0 ? (
                      <Typography>
                        {selectedResumeId
                          ? existingResumes.find((r) => r.id === selectedResumeId)?.fileDetails
                            ?.fileName || 'Selected resume'
                          : 'Select a resume below'}
                      </Typography>
                    ) : (
                      <Typography color="text.secondary">No resume uploaded</Typography>
                    ),
                  ],
                  [
                    'Password:',
                    <>
                      ***********{' '}
                      <Link href="#" underline="hover" onClick={() => {
                        trackEvent({
                          category: 'Profile',
                          action: 'Change Password Clicked',
                          label: 'Password is c anged',
                          value: 86,
                        });
                        setOpenPasswordModal(true)
                      }}>
                        Change password
                      </Link>
                    </>,
                  ],
                  // ['Address:', profileData?.address || 'Not specified'],
                ].map(([label, value]) => (
                  <Box key={label} display="flex" gap={1.5}>
                    <Typography sx={{ width: 90 }} color="text.secondary">
                      {label}
                    </Typography>
                    <Typography fontWeight="600">{value}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          {showResume && (
            <Grid item xs={12} lg={4}>
              {/* Resume Section */}
              <Paper sx={{
                p: { xs: 1, md: 3 },
                height: '260px'

              }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography fontWeight="600">Resume</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => fileInputRef.current.click()}
                    startIcon={isUploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
                    sx={{ textTransform: 'none' }}
                    disabled={isUploading}
                  >
                    Add New Resume
                  </Button>
                </Box>
                <List sx={{ maxHeight: 160, overflow: 'auto', mb: 2 }}>
                  {existingResumes.map((r) => (
                    <React.Fragment key={r.id}>
                      <ListItem
                        selected={selectedResumeId === r.id}
                        button
                        onClick={() => handleSelectResume(r.id)}
                        disabled={isUploading}
                        secondaryAction={
                          <Box display="flex" alignItems="center">
                            {selectedResumeId === r.id && (
                              <CheckCircleIcon sx={{ color: green[600], mr: 1 }} />
                            )}
                            <IconButton
                              edge="end"
                              onClick={() => {
                                setResumeToDelete(r.id);
                                setConfirmDeleteOpen(true);
                              }}
                              aria-label="delete"
                              disabled={isUploading}
                            >
                              <DeleteIcon sx={{ color: 'red', mt: 3, height: '18px' }} />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={
                            <a
                              href={r.fileDetails?.fileUrl || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {r.fileDetails?.fileName || 'Untitled Resume'}
                            </a>
                          }
                          secondary={r?.updatedAt ? format(new Date(r?.updatedAt), 'dd-MM-yyyy') : ''}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
              </Paper>
            </Grid>)}

          <Grid sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Profile analytics section */}
            {lastFOBOData && (
              <Grid item xs={12} lg={8}>
                {lastFOBOData ? (
                  <Paper
                    elevation={3}
                    sx={{
                      mt: 1,
                      position: 'relative',
                      p: 2,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(6px)',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <MemoizedGaugeChart score={lastFOBOData?.FOBO_Score} />
                    </Box>
                    <Box sx={{ width: '100%', position: 'relative', p: 2 }}>
                      <Typography
                        sx={{ textAlign: 'center' }}
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Strategies to Improve FOBO
                      </Typography>

                      <Typography sx={{ textAlign: 'center' }} variant="body2" gutterBottom>
                        Reduce your hesitation by practicing mindful decision-making, limiting
                        options, and focusing on long-term satisfaction instead of perfect outcomes.{' '}
                        <span style={{ filter: 'blur(2px)' }}>
                          Reduce your hesitation by practicing mindful decision-making, limiting
                          options, and focusing on long-term satisfaction instead of perfect
                          outcomes. Reduce your hesitation by practicing mindful decision-making,
                          limiting options, and focusing on long-term satisfaction instead of
                          perfect outcomes.
                        </span>
                      </Typography>

                      {/* Optional blue glow lines */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: isMobile ? '90px' : '80px',
                          left: '10%',
                          width: '80%',
                          height: 4,
                          bgcolor: 'primary.main',
                          borderRadius: 2,
                          boxShadow: '0 0 15px rgba(33,150,243,0.8)',
                          animation: 'pulse 2s infinite ease-in-out',
                        }}
                      />

                      {/* White faded overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          width: '100%',
                          height: isMobile ? '200px' : '110px',
                          bgcolor: 'white',
                          opacity: 0.85,
                          zIndex: 1,
                        }}
                      />

                      {/* Analyze Again Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          const key = process.env.REACT_APP_ENCRYPTION_KEY;
                          if (!key) {
                            console.error('Encryption key is missing');
                            return;
                          }

                          // Clear old values first
                          sessionStorage.removeItem('xbszya');
                          sessionStorage.removeItem('xbszyaef');

                          // Encrypt and store the appropriate value
                          if (lastFOBOData?.resumeId) {
                            const encryptedId = encodeURIComponent(
                              CryptoJS.AES.encrypt(String(lastFOBOData.resumeId), key).toString()
                            );
                            sessionStorage.setItem('xbszya', encryptedId);
                          } else if (lastFOBOData?.linkedInUrl) {
                            const encryptedUrl = encodeURIComponent(
                              CryptoJS.AES.encrypt(lastFOBOData.linkedInUrl.trim(), key).toString()
                            );
                            sessionStorage.setItem('xbszyaef', encryptedUrl);
                          }

                          navigate(paths.Analysis);
                        }}
                        sx={{
                          position: 'absolute',
                          bottom: isMobile ? '40px' : '30px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          zIndex: 2,
                        }}
                      >
                        Analyze Again
                      </Button>
                    </Box>
                  </Paper>
                ) : (
                  <Typography variant="body1"> No Data</Typography>
                )}
              </Grid>
            )}

            {/* Right Column: Resume and Registered Courses */}
            {showCourses && (
              <Grid item xs={12} lg={4}>
                {/* Registered Courses Section */}
                <Paper sx={{
                  p: 4, h: { xs: 0, lg: '250px' },
                  borderRadius: 2, ml: { xs: 0, lg: 1 },
                  mt: 2,
                  // Remove fixed height and handle it dynamically
                  maxHeight: '440px', // optional limit for scrollable area
                  height: '440px', // optional limit for scrollable area
                  overflowY: subscriptions?.length > 6 ? 'auto' : 'visible',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#bdbdbd',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#9e9e9e',
                  },


                }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" fontWeight="600">
                      Registered Courses
                    </Typography>
                  </Box>
                  {renderRegisteredCourses()}
                </Paper>
              </Grid>
            )}
          </Grid>
          {/*   <Grid sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            {lastFOBOData && (
              <Grid item xs={12} lg={8}>
                {lastFOBOData ? (
                  <Paper
                    elevation={3}
                    sx={{
                      mt: 1,
                      position: 'relative',
                      p: 2,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(6px)',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <MemoizedGaugeChart score={lastFOBOData?.FOBO_Score} />
                    </Box>
                    <Box sx={{ width: '100%', position: 'relative', p: 2 }}>
                      <Typography
                        sx={{ textAlign: 'center' }}
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Strategies to Improve FOBOPRO
                      </Typography>

                      <Typography sx={{ textAlign: 'center' }} variant="body2" gutterBottom>
                        Reduce your hesitation by practicing mindful decision-making, limiting
                        options, and focusing on long-term satisfaction instead of perfect outcomes.{' '}
                        <span style={{ filter: 'blur(2px)' }}>
                          Reduce your hesitation by practicing mindful decision-making, limiting
                          options, and focusing on long-term satisfaction instead of perfect
                          outcomes. Reduce your hesitation by practicing mindful decision-making,
                          limiting options, and focusing on long-term satisfaction instead of
                          perfect outcomes.
                        </span>
                      </Typography>

                     
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: isMobile ? '90px' : '80px',
                          left: '10%',
                          width: '80%',
                          height: 4,
                          bgcolor: 'primary.main',
                          borderRadius: 2,
                          boxShadow: '0 0 15px rgba(33,150,243,0.8)',
                          animation: 'pulse 2s infinite ease-in-out',
                        }}
                      />

                     
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          width: '100%',
                          height: isMobile ? '200px' : '110px',
                          bgcolor: 'white',
                          opacity: 0.85,
                          zIndex: 1,
                        }}
                      />

                     
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          const key = process.env.REACT_APP_ENCRYPTION_KEY;
                          if (!key) {
                            console.error('Encryption key is missing');
                            return;
                          }

                          // Clear old values first
                          sessionStorage.removeItem('xbszya');
                          sessionStorage.removeItem('xbszyaef');

                          // Encrypt and store the appropriate value
                          if (lastFOBOData?.resumeId) {
                            const encryptedId = encodeURIComponent(
                              CryptoJS.AES.encrypt(String(lastFOBOData.resumeId), key).toString()
                            );
                            sessionStorage.setItem('xbszya', encryptedId);
                          } else if (lastFOBOData?.linkedInUrl) {
                            const encryptedUrl = encodeURIComponent(
                              CryptoJS.AES.encrypt(lastFOBOData.linkedInUrl.trim(), key).toString()
                            );
                            sessionStorage.setItem('xbszyaef', encryptedUrl);
                          }

                          navigate(paths.Analysis);
                        }}
                        sx={{
                          position: 'absolute',
                          bottom: isMobile ? '40px' : '30px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          zIndex: 2,
                        }}
                      >
                        Analyze Again
                      </Button>
                    </Box>
                  </Paper>
                ) : (
                  <Typography variant="body1"> No Data</Typography>
                )}
              </Grid>
            )}
            {/* 
            

          
            {(showCourses && profileAnalytics && Array.isArray(metricsData) && metricsData.length > 0) && (
              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  p: { xs: 0, md: 2 },
                  bgcolor: '#fff',
                  height: '100%',
                  ml: 1,
                  mt: 0.5,
                  borderRadius: '20px',
                }}
              >
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                  {console.log("OOOOOOOOOOOOOOO", metricsData)}
                  <MetricsCards metrics={metricsData} />
                </Box>
              </Grid>
            )}

          </Grid> */}
          <AIReadinessDashboard data={profileAnalytics} myProfile={myprofile} />
        </Grid>

      </Container>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete Resume</DialogTitle>
        <DialogContent>Are you sure you want to delete this resume?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteResume(resumeToDelete)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Modal */}
      <ProfileUpdateModal
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        profileData={profileData}
        setProfileData={setProfileData}
      />

      {/* Password Change Modal */}
      <ProfileChangePassword open={openPasswordModal} onClose={() => setOpenPasswordModal(false)} />
    </Box>
  ) : (
    <SplashScreen />
  );
}