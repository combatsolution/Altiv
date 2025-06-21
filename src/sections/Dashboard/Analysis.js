/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
import React, { useEffect, useMemo, useState } from 'react';
import CryptoJS from 'crypto-js';
import { m } from 'framer-motion';
import { Box, Typography, Grid, Card, Button, Stack, useTheme, useMediaQuery, FormControlLabel, Switch } from '@mui/material';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import GaugeChart from 'react-gauge-chart';
import { width } from '@mui/system';
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

export default function FoboLevelTaskDistribution() {
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
  const baseColor = pieData?.find((d) => d.name === selectedSection?.name)?.color || '#ccc';

  // Generate 4 shades (lighter to darker)
  const shades = [0.4, 0.6, 0.8, 1].map(opacity =>
    tinycolor(baseColor).setAlpha(opacity).toRgbString()
  );

  const fetchProfileAnalyticsData = async (id) => {
    try {
      setIsLoading(true);
      setActiveIndex(null);
      setSelectedSection(null);
      const response = await axiosInstance.post(`/profile-analytics`, {
        resumeId: Number(id),
        viewDetails,
        smartInsights
      });
      if (response?.data.success) {
        console.log('data', response?.data?.data);
        setData(response?.data?.data);
        const newPieData = [
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

        setPieData(newPieData);
        if (response?.data?.data?.FOBO_Score === null) {
          setIsError(true);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error('error', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resumeId) {
      const decryptedId = CryptoJS.AES.decrypt(resumeId, process.env.REACT_APP_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8); 
      fetchProfileAnalyticsData(decryptedId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId, viewDetails, smartInsights]);

  const handlePieClick = (index, item) => {
    setSelectedSection(item);
  };

  const handleMouseLeave = () => {
    setSelectedIndex(null);
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
    navigate('/?retry=true', {replace: true})
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const angle = -midAngle * RADIAN;

    const midX = cx + (outerRadius + 15) * Math.cos(angle);
    const midY = cy + (outerRadius + 15) * Math.sin(angle);
    const isRight = Math.cos(angle) >= 0;

    // Final label position after horizontal shift
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

    // Start from edge of pie slice
    const startX = cx + outerRadius * Math.cos(angle);
    const startY = cy + outerRadius * Math.sin(angle);

    // Go outward for bend
    const midX = cx + (outerRadius + 15) * Math.cos(angle);
    const midY = cy + (outerRadius + 15) * Math.sin(angle);

    // Horizontal end line (bent clockwise always to right)
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
      needle.style.transition = 'transform 1.2s ease-out'; // smooth movement
    }
  }, [data?.FOBO_Score]);

  const getLabelStyles = () => {
    if (isMobile) {
      return {
        good: { top: '20%', left: '11%', transform: 'rotate(-55deg)' },
        moderate: { top: '-20%', right: '10%', transform: 'rotate(4deg)' },
        bad: { top: '20%', right: '13%', transform: 'rotate(55deg)' },
      };
    } else if (isTablet) {
      return {
        good: { top: '30%', left: '15%', transform: 'rotate(-55deg)' },
        moderate: { top: '-12%', right: '26%', transform: 'rotate(5deg)' },
        bad: { top: '30%', right: '15%', transform: 'rotate(60deg)' },
      };
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

  const MemoizedGaugeChart = React.memo(({ score }) => {
    const percent = score / 100;
    const levelColor = useMemo(() => getLevelColor(score), [score]);


    return (
      <div style={{ position: 'relative', width: '100%', margin: 'auto' }}>
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
          <Typography variant='body1'>Good</Typography>
        </div>

        <div
          style={{
            position: 'absolute',
            ...countStyles.good,
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant='body1'>0 - 39</Typography>
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
          <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant='body1'>40 - 69</Typography>
        </div>

        <div
          style={{
            position: 'absolute',
            ...labelStyles.bad,
          }}
        >
          <Typography variant='body1'>Bad</Typography>
        </div>

        <div
          style={{
            position: 'absolute',
            ...countStyles.bad,
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant='body1'>70 - 100</Typography>
        </div>


        {/* FOBO Label and Score */}
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 18 }}>FOBO LEVEL</div>
          <div style={{ fontWeight: 'bold', fontSize: 24, color: levelColor }}>
            {score}
          </div>
        </div>
      </div>
    );
  }, (prev, next) => prev.score === next.score);
  MemoizedGaugeChart.propTypes = {
    score: PropTypes.number,
  }

  const showDetailedDescription = (arrayData) => {
    if (!arrayData?.length) return null;

    const groupedArrays = [[], [], [], []];

    arrayData.forEach((item, index) => {
      groupedArrays[index % 4].push(item);
    });

    return (
      <Box component='div' sx={{ width: '100%', maxHeight: '350px', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none', }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none', }}>
        {groupedArrays.map((group, groupIndex) => {
          if (group.length === 0) return null;

          return (
            <React.Fragment sx key={groupIndex}>
              {/* Colored Bar */}
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

              {/* Labels */}
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

    // Chunk the array into groups of 4
    for (let i = 0; i < arrayData.length; i += 4) {
      groupWiseElements.push(arrayData.slice(i, i + 4));
    }

    return (
      <>
        {groupWiseElements.map((group, rowIndex) => (
          <Box key={rowIndex} sx={{ mb: 2 }}>
            {/* Colored bar */}
            <Box sx={{ width: '100%', height: 4, display: 'flex', gap: '2px' }}>
              {shades.map((color, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    height: '100%',
                    bgcolor: color,
                    borderRadius: index === 0 ? '4px 0 0 4px' : index === shades.length - 1 ? '0 4px 4px 0' : 0,
                  }}
                />
              ))}
            </Box>

            {/* Task labels */}
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


  return (!isLoading && !isError) ? (
    <Box
      px={{ xs: 2, md: '12%' }}
      py={2}
      sx={{ position: 'relative', width: '100%', maxWidth: '100%' }}
    >
      {/* <Box sx={{ width: '100%', textAlign: isMobile ? 'left' : 'right', position: 'relative', zIndex: 1000 }}>
        <FormControlLabel
          control={
            <Switch
              checked={viewDetails}
              onChange={() => setViewDetails((prev) => !prev)}
              color="primary"
            />
          }
          label={viewDetails ? 'Show Long Description' : 'Show Short Description'}
        />
        <FormControlLabel
          control={
            <Switch
              checked={smartInsights}
              onChange={() => setSmartInsights((prev) => !prev)}
              color="primary"
            />
          }
          label='Smart Insight Mode'
        />
      </Box> */}
      <Grid container spacing={4}>
        {/* FOBO Level */}
        <Grid item xs={12} md={12} lg={6}>
          <Stack direction="column" spacing={1.5}>
            <Typography variant="h5" fontWeight="bold" sx={{ textAlign: 'left' }} gutterBottom>
              FOBO Level
            </Typography>

            <Box sx={{ width: { md: '85%', xs: '100%', display: 'flex', justifyContent: 'center' }, mx: 'auto', mt: 2 }}>
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

            <Box sx={{ position: 'relative', width: '100%', paddingTop: isMobile ? '250px' : '280px' }}>
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
                <CustomDonutChart
                  data={pieData}
                  size={isMobile ? 350 : 450}
                  innerRadius={isMobile ? 60 : 80}
                  outerRadius={isMobile ? 100 : 130}
                  onSliceClick={handlePieClick}
                />
              </Box>
            </Box>
            {!selectedSection ? (
              <Stack spacing={1.5} direction="column">
                {/* Automation */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 20, height: 20, bgcolor: '#EF4444' }} />
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontSize: { xs: '12px', md: '12px', lg: '12px' },
                      color: '#090808',
                    }}
                  >
                    <strong>Automation:</strong> AI can do these tasks by itself, replacing human work
                  </Typography>
                </Box>

                {/* Augmentation */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Box sx={{ width: 20, height: 20, bgcolor: '#FFB95A' }} />
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontSize: { xs: '12px', md: '12px' },
                      color: '#090808',
                    }}
                  >
                    <strong>Augmentation:</strong> AI works with you, like a smart assistant helping you do better work
                  </Typography>
                </Box>

                {/* Human */}
                <Box sx={{ display: 'flex', alignItems: 'left', gap: 1, mt: 1 }}>
                  <Box sx={{ width: 20, height: 20, bgcolor: '#84CC16' }} />
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontSize: { xs: '12px', md: '12px' },
                      color: '#090808',
                    }}
                  >
                    <strong>Human:</strong> Tasks that AI can&apos;t likely replace
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Tasks distribution for {selectedSection?.name}
                </Typography>

                {viewDetails ? (
                  showShortDescription(data[selectedSection?.fieldName] || [])
                ) : (
                  showDetailedDescription(data[selectedSection?.fieldName] || [])
                )}
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
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recommended Growth Strategies {`${data?.user ? `For ${data?.user.fullName}` : ''}`}
          </Typography>
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
        <Grid item xs={12} textAlign="left">
          <Button
            onClick={() => navigate(paths.comingSoon)}
            variant="contained"
            sx={{
              backgroundColor: '#2C47D3',
              borderRadius: 10,
              px: 4,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            Beat FOBO Now
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

        <Box component='div' sx={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
          <Button color="primary" onClick={onRetry} size="large" variant="contained">
            Retry
          </Button>

          <Button color="primary" onClick={() => navigate(-1, { replace: true })} size="large" variant="outlined">
            Go to Home
          </Button>
        </Box>
      </MotionContainer>
    </CompactLayout>
  );
}