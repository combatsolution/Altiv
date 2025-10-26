/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
import { useAuthContext } from 'src/auth/hooks';
import React, { useEffect, useMemo, useState,useRef } from 'react';
import CryptoJS from 'crypto-js';
import { m } from 'framer-motion';
import HandTapGif from 'src/assets/icons/Handtap.gif';
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import GaugeChart from 'react-gauge-chart';
import { useNavigate, useParams } from 'react-router';
import axiosInstance from 'src/utils/axios';
import { SplashScreen } from 'src/components/loading-screen';
import CustomDonutChart from 'src/components/custom-charts/donutChart';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import CompactLayout from 'src/layouts/compact';
import { MotionContainer, varBounce } from 'src/components/animate';
import SeverErrorIllustration from 'src/assets/illustrations/sever-error-illustration';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { trackEvent } from 'src/utils/google-analytics';
import { enqueueSnackbar } from 'notistack';

export default function FoboLevelTaskDistribution() {
  const [showHandTap, setShowHandTap] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { resumeId } = params;
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [data, setData] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [smartInsights, setSmartInsights] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(null);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);
  const baseColor = pieData?.find((d) => d.name === selectedSection?.name)?.color || '#ccc';
  const encryptedId = sessionStorage.getItem('xbszya');
  const encryptedLinkedInUrl = sessionStorage.getItem('xbszyaef');
  const [decryptedId, setDecryptedId] = useState('');
  const [decryptedLinkedinUrl, setDecryptedLinkedinUrl] = useState('');
  const { user } = useAuthContext();
  const [userStartedWith, setUserStartedWith] = useState(null);
  const isInitialLoad = useRef(true); // Flag to track first load


  // Generate 4 shades (lighter to darker)
  const shades = [0.4, 0.6, 0.8, 1].map((opacity) =>
    tinycolor(baseColor).setAlpha(opacity).toRgbString()
  );

  // Check subscription status
  useEffect(() => {

    const startedWith = sessionStorage.getItem("userStartedWith")
    setUserStartedWith(startedWith);
    const checkSubscription = async () => {
      if (!user) {
        setHasActiveSubscription(false);
        return;
      }
      setIsCheckingSubscription(true);
      try {
        const response = await axiosInstance.get('/subscriptions/user');
        const subscriptions = Array.isArray(response.data) ? response.data : [response.data];
        const isSubscribed = subscriptions.some(
          (sub) => sub.status && sub.status.toUpperCase() === 'SUCCESS'
        );
        setHasActiveSubscription(isSubscribed);
      } catch (err) {
        console.error('Error checking subscription:', err);
        setHasActiveSubscription(false); // Assume no subscription on error
      } finally {
        setIsCheckingSubscription(false);
      }
    };

    checkSubscription();
  }, [user]);

  // Decryption
  useEffect(() => {
    try {
      if (encryptedId) {
        const decodedId = decodeURIComponent(encryptedId);
        const bytes = CryptoJS.AES.decrypt(decodedId, process.env.REACT_APP_ENCRYPTION_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        console.log('Decrypted ID:', decrypted);
        if (decrypted) setDecryptedId(decrypted);
      }

      if (encryptedLinkedInUrl) {
        const decodedUrl = decodeURIComponent(encryptedLinkedInUrl);
        const bytes = CryptoJS.AES.decrypt(decodedUrl, process.env.REACT_APP_ENCRYPTION_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        console.log('Decrypted URL:', decrypted);
        if (decrypted) setDecryptedLinkedinUrl(decrypted);
      }

      if (!encryptedId && !encryptedLinkedInUrl) {
        navigate('/?retry=true', { replace: true });
      }
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  }, [encryptedId, encryptedLinkedInUrl, navigate]);

  // API Call
  useEffect(() => {
    if (decryptedId || decryptedLinkedinUrl) {
      fetchProfileAnalyticsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decryptedId, decryptedLinkedinUrl, viewDetails, smartInsights]);

  // API Function
  const fetchProfileAnalyticsData = async () => {
    if (!decryptedId && !decryptedLinkedinUrl) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setActiveIndex(null);
    setSelectedSection(null);

    const inputData = {
      viewDetails,
      smartInsights,
      ...(decryptedId && { resumeId: Number(decryptedId) }),
      ...(decryptedLinkedinUrl && { linkedInUrl: decryptedLinkedinUrl }),
    };

    // try {
    //   const response = await axiosInstance.post(`/profile-analytics`, inputData);
    //   if (response?.data.success) {
    //     console.log('data', response?.data?.data);
    //     setData(response?.data?.data);
    //     const newPieData = [
    //       {
    //         name: 'Augmentation',
    //         label: 'Augmentation',
    //         value: response?.data?.data?.Augmented_Score,
    //         color: '#FFB95A',
    //         fieldName: 'Task_Distribution_Augmentation',
    //       },
    //       {
    //         name: 'Automation',
    //         label: 'Automation',
    //         value: response?.data?.data?.Automated_Score,
    //         color: '#EF4444',
    //         fieldName: 'Task_Distribution_Automation',
    //       },
    //       {
    //         name: 'Human',
    //         label: 'Human',
    //         value: response?.data?.data?.Human_Score,
    //         color: '#84CC16',
    //         fieldName: 'Task_Distribution_Human',
    //       },
    //     ];

    //     setPieData(newPieData);

    //     if (response?.data?.data?.FOBO_Score === null) {
    //       setIsError(true);
    //       trackEvent({
    //         category: 'FOBO score error',
    //         action: 'FOBO score fetched failed',
    //         label: 'FOBO page',
    //         value: 'FOBO score is null',
    //       });
    //     }

    //     trackEvent({
    //       category: 'FOBO score fetched',
    //       action: 'FOBO score fetched successfully',
    //       label: 'FOBO page',
    //       value: 'FOBO fetched success',
    //     });
    //   } else {
    //     setIsError(true);
    //   }
    // } catch (error) {
    //   console.error('error', error);
    //   setIsError(true);
    // } finally {
    //   setIsLoading(false);
    // }

    try {
      const response = await axiosInstance.post(`/profile-analytics`, inputData);

      if (response?.data?.success) {
        console.log('data', response?.data?.data);
        setData(response?.data?.data);

        let newPieData = [];

        if (response?.data?.data?.FOBO_Score === 0) {
          newPieData = [
            {
              name: 'NO DATA',
              label: 'NO DATA',
              value: 100,
              color: '#D3D3D3', // Grey color
              fieldName: 'Task_Distribution_NoData',
            },
          ];
        } else {
          newPieData = [
            {
              name: 'Augmentation',
              label: 'Augmentation',
              value: response?.data?.data?.Augmented_Score,
              color: '#FFB95A',
              fieldName: 'Task_Distribution_Augmentation',
            },
            {
              name: 'Automation',
              label: 'Automation',
              value: response?.data?.data?.Automated_Score,
              color: '#EF4444',
              fieldName: 'Task_Distribution_Automation',
            },
            {
              name: 'Human',
              label: 'Human',
              value: response?.data?.data?.Human_Score,
              color: '#84CC16',
              fieldName: 'Task_Distribution_Human',
            },
          ];
        }

        setPieData(newPieData);

        if (response?.data?.data?.FOBO_Score === null) {
          setIsError(true);
          trackEvent({
            category: 'FOBO score error',
            action: 'FOBO score fetched failed',
            label: 'FOBO page',
            value: 'FOBO score is null',
          });
        }

        trackEvent({
          category: 'FOBO score fetched',
          action: 'FOBO score fetched successfully',
          label: 'FOBO page',
          value: 'FOBO fetched success',
        });
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('error', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePieClick = (index, item) => {
    console.log("DDDDDD->", item);
    setSelectedSection(item);
    // setShowHandTap(false);
  };



  const getLevelColor = () => {
    if (data?.FOBO_Score <= 39) return '#00C853';
    if (data?.FOBO_Score <= 69) return '#F57F17';
    return '#E53935';
  };

  const handleMouseEnter = (_, index) => {
    setSelectedIndex(index);
  };

  const onRetry = () => {
    navigate('/?retry=true', { replace: true });
  };

  // const handleSSOLogin = async () => {
  //   try {
  //     const response = await axiosInstance.get('/sso/sso-login');
  //     console.log('SSO Login Success:', response.data);

  //     if (response.data.success && response.data.url) {
  //       // Open in a new tab
  //       window.open(response.data.url, '_blank');
  //     } else {
  //       console.error('SSO Login failed: no URL returned');
  //     }
  //   } catch (error) {
  //     console.error('SSO Login Failed:', error);
  //   }
  // };



  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const angle = -midAngle * RADIAN;

    const midX = cx + (outerRadius + 15) * Math.cos(angle);
    const midY = cy + (outerRadius + 15) * Math.sin(angle);
    const isRight = Math.cos(angle) >= 0;

    const labelX = midX + (isRight ? 30 : -30);
    const labelY = midY;

    return (
      <text
        x={labelX}
        y={labelY}
        fill={pieData[index].color}
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {pieData[index].name}
      </text>
    );
  };

  const renderCustomLabelLine = ({ cx, cy, midAngle, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const angle = -midAngle * RADIAN;

    const startX = cx + outerRadius * Math.cos(angle);
    const startY = cy + outerRadius * Math.sin(angle);

    const midX = cx + (outerRadius + 15) * Math.cos(angle);
    const midY = cy + (outerRadius + 15) * Math.sin(angle);

    const isRight = Math.cos(angle) >= 0;
    const endX = midX + (isRight ? 25 : -25);
    const endY = midY;

    return (
      <polyline
        points={`${startX},${startY} ${midX},${midY} ${endX},${endY}`}
        stroke={pieData[index].color}
        strokeWidth={2}
        fill="none"
      />
    );
  };

  useEffect(() => {
    const needle = document.querySelector('#fobo-gauge .needle');
    if (needle) {
      needle.style.transition = 'transform 1.2s ease-out';
    }
  }, [data?.FOBO_Score]);

  const getLabelStyles = () => {
    if (isMobile) {
      return {
        good: { top: '20%', left: '11%', transform: 'rotate(-55deg)' },
        moderate: { top: '-22%', right: '6%', transform: 'rotate(2deg)' },
        bad: { top: '20%', right: '13%', transform: 'rotate(55deg)' },
      };
    } else if (isTablet) {
      const styles = {
        good: { top: '30%', left: '15%', transform: 'rotate(-55deg)' },
        moderate: { top: '-12%', right: '26%', transform: 'rotate(5deg)' },
        bad: { top: '30%', right: '15%', transform: 'rotate(60deg)' },
      };
      return styles;
    } else {
      return {
        good: { top: '20%', left: '15%', transform: 'rotate(-50deg)' },
        moderate: { top: '-17%', right: '16%', transform: 'rotate(4deg)' },
        bad: { top: '25%', right: '14%', transform: 'rotate(60deg)' },
      };
    }
  };

  const getCountStyles = () => {
    if (isMobile) {
      return {
        good: { top: '29%', left: '19%', transform: 'rotate(-61deg)' },
        moderate: { top: '8%', right: '41%', transform: 'rotate(3deg)' },
        bad: { top: '30%', right: '17%', transform: 'rotate(60deg)' },
      };
    } else if (isTablet) {
      return {
        good: { top: '35%', left: '21%', transform: 'rotate(-56deg)' },
        moderate: { top: '10%', right: '43%', transform: 'rotate(5deg)' },
        bad: { top: '37%', right: '19%', transform: 'rotate(60deg)' },
      };
    } else {
      return {
        good: { top: '28%', left: '22%', transform: 'rotate(-50deg)' },
        moderate: { top: '10%', right: '42%', transform: 'rotate(4deg)' },
        bad: { top: '32%', right: '19%', transform: 'rotate(57deg)' },
      };
    }
  };

  const labelStyles = getLabelStyles();
  const countStyles = getCountStyles();

  const MemoizedGaugeChart = React.memo(
    ({ score }) => {
      console.log("AAAAAA->", score);
      const percent = score / 100;
      const levelColor = useMemo(() => getLevelColor(score), [score]);

      return (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: '350px', md: '470px', sm: '300px' },
            margin: 'auto',
          }}
        >
          <GaugeChart
            id="fobo-gauge"
            nrOfLevels={3}
            arcsLength={[0.39, 0.3, 0.31]}
            colors={['#00C853', '#FFB300', '#D32F2F']}
            percent={percent}
            arcPadding={0}
            arcWidth={0.3}
            needleColor="#424242"
            textColor="transparent"
            style={{ width: '100%' }}
            animate
          />

          <div style={{ position: 'absolute', ...labelStyles.good }}>
            <Typography variant="body1">Good</Typography>
          </div>

          <div style={{ position: 'absolute', ...countStyles.good }}>
            <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant="body1">
              0 - 39
            </Typography>
          </div>

          <div style={{ position: 'absolute', ...labelStyles.moderate }}>
            <svg width="300" height="150">
              <defs>
                <path id="curve" d="M 50,150 A 100,100 0 0,1 250,150" fill="transparent" />
              </defs>
              <text fill="#000" fontSize="16" fontFamily="Arial">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  Moderate
                </textPath>
              </text>
            </svg>
          </div>

          <div style={{ position: 'absolute', ...countStyles.moderate }}>
            <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant="body1">
              40 - 69
            </Typography>
          </div>

          <div style={{ position: 'absolute', ...labelStyles.bad }}>
            <Typography variant="body1">Bad</Typography>
          </div>

          <div style={{ position: 'absolute', ...countStyles.bad }}>
            <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant="body1">
              70 - 100
            </Typography>
          </div>

          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>FOBO LEVEL</div>
            <div style={{ fontWeight: 'bold', fontSize: 24, color: levelColor }}>{score}</div>
          </div>
        </Box>
      );
    },
    (prev, next) => prev.score === next.score
  );

  MemoizedGaugeChart.propTypes = {
    score: PropTypes.number,
  };

  const showDetailedDescription = (arrayData) => {
    if (!arrayData?.length) return null;

    const groupedArrays = [[], [], [], []];

    arrayData.forEach((item, index) => {
      groupedArrays[index % 4].push(item);
    });

    return (
      <Box
        component="div"
        sx={{
          width: '100%',
          maxHeight: '350px',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        {groupedArrays.map((group, groupIndex) => {
          if (group.length === 0) return null;

          return (
            <React.Fragment key={groupIndex}>
              <Box sx={{ width: '100%', height: 4, display: 'flex', gap: '2px', mb: 1 }}>
                <Box
                  sx={{
                    flex: 1,
                    height: '100%',
                    bgcolor: shades[groupIndex],
                    borderRadius: '4px 0 0 4px',
                  }}
                />
              </Box>
              <Grid container spacing={1}>
                {group.map((taskName, i) => (
                  <Grid item xs={viewDetails ? 3 : 12} md={viewDetails ? 3 : 12} key={i}>
                    <Typography
                      variant="caption"
                      sx={{
                        width: '25%',
                        fontSize: { xs: '10px', md: '12px' },
                        color: '#090808',
                        textAlign: 'center',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {taskName}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          );
        })}
      </Box>
    );
  };

  const showShortDescription = (arrayData) => {
    if (!arrayData || arrayData.length === 0) return null;

    const groupWiseElements = [];

    for (let i = 0; i < arrayData.length; i += 4) {
      groupWiseElements.push(arrayData.slice(i, i + 4));
    }

    return (
      <>
        {groupWiseElements.map((group, rowIndex) => (
          <Box key={rowIndex} sx={{ mb: 2 }}>
            <Box sx={{ width: '100%', height: 4, display: 'flex', gap: '2px' }}>
              {shades.map((color, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    height: '100%',
                    bgcolor: color,
                    borderRadius:
                      index === 0 ? '4px 0 0 4px' : index === shades.length - 1 ? '0 4px 4px 0' : 0,
                  }}
                />
              ))}
            </Box>
            <Grid container spacing={1}>
              {group.map((taskName, i) => (
                <Grid item xs={viewDetails ? 3 : 12} md={viewDetails ? 3 : 12} key={i}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: { xs: '10px', md: '12px' },
                      color: '#090808',
                      textAlign: 'center',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {taskName}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </>
    );
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return !isLoading && !isError && data ? (
    <Box
      px={{ xs: 2, md: '12%' }}
      py={2}
      sx={{ position: 'relative', width: '100%', maxWidth: '100%' }}
    >
      <Grid container spacing={4}>
        {/* FOBO Level */}
        <Grid item xs={12} md={12} lg={6}>
          <Stack direction="column" spacing={1.5}>
            <Typography variant="h5" fontWeight="bold" sx={{ textAlign: 'left' }} gutterBottom>
              FOBO Level
            </Typography>
            <Box
              sx={{
                width: { md: '85%', xs: '100%', display: 'flex', justifyContent: 'center' },
                mx: 'auto',
                mt: 2,
              }}
            >
              <MemoizedGaugeChart score={data?.FOBO_Score} />
            </Box>
          </Stack>
        </Grid>

        {/* Task Distribution Pie */}
        <Grid item xs={12} md={12} lg={6}>
          <Stack direction="column" spacing={1.5}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'left' }}>
              Task Distribution
            </Typography>
            <Box
              sx={{ position: 'relative', width: '100%', paddingTop: isMobile ? '250px' : '280px' }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  top: isMobile ? '-25%' : '-30%',
                  left: 0,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {/* ✅ Pie chart that triggers hide on slice click */}
                {/* Donut Chart */}

                <CustomDonutChart
                  data={pieData}
                  size={isMobile ? 350 : 450}
                  innerRadius={isMobile ? 60 : 80}
                  outerRadius={isMobile ? 100 : 130}
                  onSliceClick={(index, item) => {
                    console.log("Clicked slice:", item.label);

                    if(item.label === "Augmentation") {
                      if (isInitialLoad.current) {
                        // Keep HandTap visible only for the first load
                        setShowHandTap(true);
                        isInitialLoad.current = false; // Disable for future clicks
                      } else {
                        setShowHandTap(false);
                      }
                    } else {
                      setShowHandTap(false);
                    }
                  }}
                />



                {/* ✅ HandTap GIF overlay */}
                {showHandTap && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '40%',
                      left: '40%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 20,
                      pointerEvents: 'none',
                      animation: 'pulse 1.5s infinite ease-in-out',
                      '@keyframes pulse': {
                        '0%': { transform: 'translate(-50%, -50%) scale(1)' },
                        '50%': { transform: 'translate(-50%, -50%) scale(1.1)' },
                        '100%': { transform: 'translate(-50%, -50%) scale(1)' },
                      },
                    }}
                  >
                    <img src={HandTapGif} alt="Tap to interact" width={70} height={70} />
                  </Box>
                )}
              </Box>
            </Box>

            {!selectedSection ? (
              <Stack spacing={1.5} direction="column">
                {[
                  {
                    color: '#EF4444',
                    title: 'Automation',
                    desc: 'AI can do these tasks by itself, replacing human work',
                  },
                  {
                    color: '#FFB95A',
                    title: 'Augmentation',
                    desc: 'AI works with you, like a smart assistant helping you do better work',
                  },
                  {
                    color: '#84CC16',
                    title: 'Human',
                    desc: "Tasks that AI can't likely replace",
                  },
                ].map((item, i) => (
                  <m.div
                    key={item.title}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 20, height: 20, bgcolor: item.color }} />
                      <Typography
                        sx={{
                          fontFamily: 'Roboto',
                          fontSize: { xs: '12px', md: '12px', lg: '12px' },
                          color: '#090808',
                        }}
                      >
                        <strong>{item.title}:</strong> {item.desc}
                      </Typography>
                    </Box>
                  </m.div>
                ))}
              </Stack>
            ) : (
              <Box sx={{ width: '100%' }}>
                {(() => {
                  const item = [
                    {
                      color: '#EF4444',
                      title: 'Automation',
                      desc: 'AI can do these tasks by itself, replacing human work',
                    },
                    {
                      color: '#FFB95A',
                      title: 'Augmentation',
                      desc: 'AI works with you, like a smart assistant helping you do better work',
                    },
                    {
                      color: '#84CC16',
                      title: 'Human',
                      desc: "Tasks that AI can't likely replace",
                    },
                  ].find((newItem) => newItem.title === selectedSection?.name);

                  return item ? (
                    <m.div
                      key={item.title}
                      custom={0}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                          justifyContent: 'start',
                        }}
                      >
                        <Box sx={{ width: 20, height: 20, bgcolor: item.color }} />
                        <Typography
                          sx={{
                            fontFamily: 'Roboto',
                            fontSize: { xs: '12px', md: '12px', lg: '12px' },
                            color: '#090808',
                          }}
                        >
                          <strong>{item.title}:</strong> {item.desc}
                        </Typography>
                      </Box>
                    </m.div>
                  ) : null;
                })()}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Tasks distribution for {selectedSection?.name}
                </Typography>
                {viewDetails
                  ? showShortDescription(data[selectedSection?.fieldName] || [])
                  : showDetailedDescription(data[selectedSection?.fieldName] || [])}
              </Box>
            )}
          </Stack>
        </Grid>

        {/* Summary Text Placeholder */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {data?.Comment.Heading}
          </Typography>
          <Typography variant="body2">{data?.Comment.Description}</Typography>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          {data?.user ? (
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recommended Growth Strategies for{' '}
              <span style={{ color: 'royalblue' }}>{data.user?.fullName}</span>
            </Typography>
          ) : (
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recommended Growth Strategies
            </Typography>
          )}
          <Box mt={2} sx={{ backgroundColor: '#F5FAFF', borderRadius: 2, p: 2 }}>
            {data?.Strategy.length > 0 &&
              data?.Strategy.map((rec, i) => (
                <Box key={i} mb={2}>
                  <Typography fontWeight="bold" gutterBottom>
                    {i + 1}. {rec.Heading}
                  </Typography>
                  <Typography variant="body2">Benefit: {rec.Description}</Typography>
                </Box>
              ))}
          </Box>
        </Grid>

        {/* CTA Button */}
        <Grid item xs={12} textAlign="left" display='flex' flexDirection='row' justifyContent='center'>
          <Button
            variant="contained"
            sx={{
              width: { xs: '180px', md: '20%' },
              backgroundColor: '#2C47D3',
              borderRadius: 10,
              px: 4,
              mx: 1,
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#2C47D3',
                boxShadow: 'none',
              },
            }}
            onClick={() => {
              trackEvent({
                category: 'CTA clicked',
                action: 'button clicked',
                label: 'Beat FOBO now',
                value: 'Navigate to pricing',
              });
              navigate(paths.pricing);
            }}
            aria-label="Navigate to pricing page"
          >
            Beat FOBO Now
          </Button>

          <Button
            variant="contained"
            sx={{
              width: { xs: '180px', md: '20%' },
              backgroundColor: '#2C47D3',
              borderRadius: 10,
              px: 4,
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#2C47D3',
                boxShadow: 'none',
              },
            }}
            onClick={() => {
              trackEvent({
                category: 'CTA clicked',
                action: 'button clicked',
                label: 'Beat FOBO now',
                value: 'Navigate to pricing',
              });
              if (!user) {
                navigate(paths.auth.jwt.register);
              } else {
                navigate(paths.aireadliness);
              }
            }}
            aria-label="Navigate to pricing page"
          >
            FOBO Pro
          </Button>
        </Grid>
      </Grid>
    </Box>
  ) : isLoading ? (
    <SplashScreen />
  ) : (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry for the inconvenience
          </Typography>
        </m.div>
        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Please try again after some time.
          </Typography>
        </m.div>
        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
        <Box
          component="div"
          sx={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}
        >
          <Button color="primary" onClick={onRetry} size="large" variant="contained">
            Retry
          </Button>
          <Button
            color="primary"
            onClick={() => navigate(-1, { replace: true })}
            size="large"
            variant="outlined"
          >
            Go to Home
          </Button>
        </Box>
      </MotionContainer>
    </CompactLayout>
  );
}
