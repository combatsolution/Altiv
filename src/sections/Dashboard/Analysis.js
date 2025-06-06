/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Grid, Card, Button, Stack } from '@mui/material';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import GaugeChart from 'react-gauge-chart';
import { width } from '@mui/system';
import { useParams } from 'react-router';
import axiosInstance from 'src/utils/axios';
import { SplashScreen } from 'src/components/loading-screen';

// const tasksMap = {
//   Automation: ['Basic content creation', 'Data reporting', 'Market research', 'Simple assessments'],
//   Augmentation: [
//     'Assistive drafting',
//     'Insight summarization',
//     'Design suggestions',
//     'Quality checks',
//   ],
//   Human: [
//     'Creative brainstorming',
//     'Complex negotiations',
//     'Emotional support',
//     'High-level strategy',
//   ],
// };

export default function FoboLevelTaskDistribution() {
  const params = useParams();
  const { resumeId } = params;
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [data, setData] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileAnalyticsData = async () => {
    try {
      const response = await axiosInstance.post(`/profile-analytics`, {
        resumeId: Number(resumeId),
      });
      if (response?.data.success) {
        console.log('data', response?.data?.data);
        setData(response?.data.data);
        const newPieData = [
          {
            name: 'Augmentation',
            value: response?.data?.data?.Augmented_Score,
            color: '#FFB95A',
            fieldName: 'Task_Distribution_Augmentation',
          },
          {
            name: 'Automation',
            value: response?.data?.data?.Automated_Score,
            color: '#EF4444',
            fieldName: 'Task_Distribution_Automation',
          },
          {
            name: 'Human',
            value: response?.data?.data?.Human_Score,
            color: '#84CC16',
            fieldName: 'Task_Distribution_Human',
          },
        ];

        setPieData(newPieData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    if (resumeId) {
      fetchProfileAnalyticsData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId]);

  const handlePieClick = (_, index) => {
    setActiveIndex(index);
    setSelectedSection({ name: pieData[index].name, fieldName: pieData[index].fieldName });
  };

  const handleMouseLeave = () => {
    // setSelectedSection(null);
  };

  const getLevelColor = () => {
    if (data.FOBO_Score <= 39) return '#00C853';
    if (data.FOBO_Score <= 69) return '#FFEB3B';
    return '#E53935';
  };

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

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

  const renderCenterLabel = () => {
    if (activeIndex == null || !pieData[activeIndex]) return null;

    const total = pieData.reduce((acc, cur) => acc + cur.value, 0);
    const selected = pieData[activeIndex];
    const percent = ((selected.value / total) * 100).toFixed(0);

    return (
      <>
        <text
          x="50%"
          y="50%"
          dy={-6}
          textAnchor="middle"
          fill={selected.color}
          fontSize={16}
          fontWeight="bold"
        >
          {selected.name}
        </text>
        <text
          x="50%"
          y="50%"
          dy={14}
          textAnchor="middle"
          fill="#555"
          fontWeight="bold"
          fontSize={14}
        >
          {percent}%
        </text>
      </>
    );
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

    return (
      <g style={{ transition: 'transform 0.3s ease' }}>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  useEffect(() => {
    const needle = document.querySelector('#fobo-gauge .needle');
    if (needle) {
      needle.style.transition = 'transform 1.2s ease-out'; // smooth movement
    }
  }, [data?.FOBO_Score]);

  const MemoizedGaugeChart = React.memo(({ score }) => (
    <div style={{ position: 'relative', width: '100%', height: 220 }}>
      <GaugeChart
        id="fobo-gauge"
        nrOfLevels={3}
        arcsLength={[0.39, 0.3, 0.31]}
        colors={['#00C853', '#FFEB3B', '#E53935']}
        percent={score / 100}
        arcPadding={0.02}
        textColor="#000"
        needleColor="#424242"
        formatTextValue={() => ''} // hide center label
        style={{ width: '100%', height: '100%' }}
        animate
      />
    </div>
  ));

  return !isLoading ? (
    <Box
      px={{ xs: 2, md: '12%' }}
      py={2}
      sx={{ position: 'relative', width: '100%', maxWidth: '100%' }}
    >
      <Grid container spacing={4}>
        {/* FOBO Level */}
        <Grid item xs={12} md={6}>
          <Stack direction="column" spacing={1.5}>
            <Typography variant="h5" fontWeight="bold" sx={{ textAlign: 'left' }} gutterBottom>
              FOBO Level
            </Typography>

            <Box sx={{ width: { md: '85%', xs: '100%' }, mx: 'auto', mt: 2 }}>
              <MemoizedGaugeChart score={data.FOBO_Score} />

              <Box textAlign="center" mt={3}>
                <Typography variant="h6" fontWeight="bold" color="#000">
                  FOBO Score
                </Typography>
                <Typography variant="h4" fontWeight="bold" color={getLevelColor()}>
                  {data.FOBO_Score}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>

        {/* Task Distribution Pie */}
        <Grid item xs={12} md={6}>
          <Stack direction="column" spacing={1.5}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: 'left' }}>
              Task Distribution
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  onClick={handlePieClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  labelLine={renderCustomLabelLine}
                  label={renderCustomizedLabel}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={activeIndex != null && activeIndex !== index ? 0.3 : 1}
                      cursor="pointer"
                      style={{
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                      }}
                    />
                  ))}
                </Pie>
                {renderCenterLabel()}
                {/* <Tooltip /> */}
              </PieChart>
            </ResponsiveContainer>

            {/* style to override default style */}
            <style>
              {`
                  .recharts-sector:focus,
                  .recharts-sector:hover,
                  .recharts-pie-sector:focus,
                  .recharts-pie-sector:hover {
                    outline: none !important;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                  }

                  .recharts-pie-sector {
                    transition: opacity 0.5s ease, transform 0.5s ease;
                  }
                `}
            </style>
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
                    <strong>Automation:</strong> {data.Automated_Comment}
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
                    <strong>Augmentation:</strong> {data.Augmentation_Comment}
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
                    <strong>Human:</strong> {data.Human_Comment}
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Tasks distribution for {selectedSection?.name}
                </Typography>

                {/* Horizontal bar whose color matches the selected slice */}
                <Box
                  sx={{
                    width: '100%',
                    height: 2,
                    bgcolor: pieData.find((d) => d.name === selectedSection?.name)?.color,
                    borderRadius: 1,
                  }}
                />

                {/* Four labels spaced evenly under the bar */}
                <Grid container spacing={1}>
                  {data[selectedSection?.fieldName]?.map((taskName, i) => (
                    <Grid item xs={3} mb={3}>
                      <Typography
                        key={i}
                        variant="caption"
                        sx={{
                          width: '25%',
                          fontSize: { xs: '10px', md: '12px' },
                          color: '#090808',
                          textAlign: 'center',
                          whiteSpace: 'pre-wrap',
                          // flexBasis: '10%',
                        }}
                      >
                        {taskName}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Stack>
        </Grid>

        {/* Summary Text Placeholder */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {data.Comment.Heading}
          </Typography>
          <Typography variant="body2">{data.Comment.Description}</Typography>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recommended Growth Strategies {`${data.user ? `For ${data.user.fullName}` : ''}`}
          </Typography>
          <Box mt={2} sx={{ backgroundColor: '#F5FAFF', borderRadius: 2, p: 2 }}>
            {data.Strategy.length > 0 &&
              data.Strategy.map((rec, i) => (
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
  ) : (
    <SplashScreen />
  );
}
