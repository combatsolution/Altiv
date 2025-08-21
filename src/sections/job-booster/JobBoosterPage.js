import React, { useState } from 'react';
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
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  Cell,
} from 'recharts';
import Slider from 'react-slick';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
                              

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Sunburst from "highcharts/modules/sunburst";



const dataa = [
  // Root
  {
    id: "0.0", parent: "", name: "Education", color: "transparent", // transparent root
    borderWidth: 0
  },

  // First Level
  { id: "1.2", parent: "0.0", name: "MBA", value: 12, color: '#FF8800' },
  { id: "1.3", parent: "0.0", name: "Others", value: 2, color: '#0BA02C' },
  { id: "1.1", parent: "0.0", name: "Engineering", value: 12, color: '#1976D2' },

  // Second Level under Engineering
  { id: "2.1", parent: "1.1", name: "IIT / NIT", value: 25, color: '#1BABFE' },
  { id: "2.2", parent: "1.1", name: "Tier 1", value: 20, color: '#1BABFE' },
  { id: "2.3", parent: "1.1", name: "Other Engineering", value: 15, color: '#1BABFE' },

  // Second Level under MBA
  { id: "2.4", parent: "1.2", name: "IIM", value: 10, color: '#FBBC05' },
  { id: "2.5", parent: "1.2", name: "ISB", value: 8, color: '#FBBC05' },
  { id: "2.6", parent: "1.2", name: "Other MBA", value: 12, color: '#FBBC05' },

];
const options = {
  chart: {
    height: "80%",
    events: {
      render() {
        const chart = this;

        if (chart.customLabel) {
          chart.customLabel.destroy();
        }

        let text = "Education";
        if (chart.drilldownNode && chart.drilldownNode.name) {
          text = chart.drilldownNode.name;
        }

        chart.customLabel = chart.renderer
          .text(
            text,
            chart.plotWidth / 2 + chart.plotLeft,
            chart.plotHeight / 2 + chart.plotTop
          )
          .css({
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
            textAnchor: "middle"
          })
          .attr({
            align: "center"
          })
          .add();

        chart.customLabel.attr({
          x: chart.plotWidth / 2 + chart.plotLeft,
          y: chart.plotHeight / 2 + chart.plotTop
        });
      }
    }
  },
  credits: {
    enabled: false
  },


  plotOptions: {
    sunburst: {
      allowDrillToNode: true,
      cursor: 'pointer',

      point: {
        events: {
          click() {
            const chart = this.series.chart;
            chart.drilldownNode = this; // store selected node
            chart.redraw(); // trigger render update
          }
        }
      }
    }
  },
  title: {
    text: "", // start empty
  },


  series: [
    {
      type: "sunburst",
      data: dataa,
      allowDrillToNode: true,
      cursor: "pointer",
      borderWidth: 2,
      slicedOffset: 10,

      dataLabels: {
        useHTML: true,
        formatter() {
          const name = (this.point && this.point.name) ? String(this.point.name) : '';
          // hide labels that match "education" (case-insensitive) or common typo "edcation"
          if (/education/i.test(name) || /edcation/i.test(name) || /\bedu\b/i.test(name)) {
            return null; // returning null hides the label
          }
          // otherwise show the name and value (keeps your original layout with a <br>)
          return `${name}<br>${this.point.value}%`;
        },
        style: {
          color: '#fff',         // white text
          fontWeight: 'bold',
          textOutline: 'none'    // removes black outline
        }
      },



      levels: [
        {
          level: 1,
          levelIsConstant: false,
          dataLabels: {
            rotationMode: "parallel"
          }
        },
        {
          level: 2,
          colorByPoint: true,
          dataLabels: {
            rotationMode: "parallel"
          }
        }
      ]
    }
  ],
  tooltip: {
    pointFormat: "<b>{point.name}</b> {point.value}%"
  }
};





const COLORS = ["#20C997", "#4285F4", "#F4A300", "#FFD43B"];

// Legend data
const LEGENDS = [
  { label: "8 – 10 years", color: "#20C997" },
  { label: "11 – 12 years", color: "#4285F4" },
  { label: "13 – 15 years", color: "#F4A300" },
  { label: "15+ years", color: "#FFD43B" }
];
const companyBackgroundData = [
  { name: 'Financial Tech', value: 35, fill: '#00C49F' },
  { name: 'Big Tech', value: 20, fill: '#0088FE' },
  { name: 'Enterprise SaaS', value: 20, fill: '#FFBB28' },
  { name: 'Internal Promotions', value: 25, fill: '#FF8042' },
];


const resumeHighlights = [
  'Strong experience in cross-functional product development teams.',
  'Demonstrated leadership in managing end-to-end product lifecycles.',
  'Proficient in Agile methodologies and sprint planning.',
  'Hands-on experience with stakeholder and customer research.',
  'Delivered measurable results through data-driven product strategies.',
  'Background in driving product innovation in tech-first environments.',
  'Led successful product launches with cross-departmental collaboration.',
];

const skills = [
  { label: "Technical", score: 85 },
  { label: "Leadership", score: 50 },
  { label: "Project Management", score: 45 },
  { label: "Lorem Ipsum", score: 20 },
];


const getBadgeColor = (score) => {
  if (score >= 70) return "green";
  if (score >= 50) return "orange";
  if (score >= 30) return "darkorange";
  return "red";
};

const ProductManagementPage = () => {

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const [hoveredInner, setHoveredInner] = useState(null);
  const [hoveredOuter, setHoveredOuter] = useState(null);
  const navigate = useNavigate();

  /* eslint-disable react/prop-types */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            {`${payload[0].name}: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };
  /* eslint-enable react/prop-types */

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
      })
    ),
  };

  CustomTooltip.defaultProps = {
    active: false,
    payload: [],
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}

      >
        {name} {/* or `${(percent * 100).toFixed(0)}%` */}
      </text>
    );
  };

  const barData = [
    { name: "8 – 10 years", percentage: 38 },
    { name: "11 – 12 years", percentage: 48 },
    { name: "13 – 15 years", percentage: 34 },
    { name: "15+ years", percentage: 26 }
  ];

  // Custom Legend Component
  const CustomLegend = () => (
    <Stack
      direction="row"
      spacing={3}
      justifyContent="center"
      flexWrap="wrap"
      mt={2}
    >
      {LEGENDS.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: { xs: 1, sm: 0 } }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: item.color,
              borderRadius: "2px"
            }}
          />
          <Typography variant="body2">{item.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value, index }) => {
    // Apply fade effect when other segments are hovered
    const isOtherHovered = hoveredInner !== null && hoveredInner !== index;
    const opacity = isOtherHovered ? 0.3 : 1;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="11"
        fontWeight="bold"
        opacity={opacity}
      >
        {name}
      </text>
    );
  };

  return (
    <Container maxWidth="auto">
      <Box sx={{ pl: { xs: 2, md: 8 }, pr: { xs: 2, md: 4 }, py: 2, order: { xs: 2, md: 1 } }}>

        <Grid container spacing={2}>
          {/* desktop Left Column */}
          <Grid item xs={12} lg={6} order={{ xs: 2, md: 1 }}>
            <Grid sx={{ display: { xs: 'none', lg: 'block' }, mb: 2 }} >
              <Typography variant="h5" fontSize="20px" fontWeight="bold"  >
                Product Management at Mastercard
              </Typography>
              <Typography variant="body2" color="text.secondary"  >
                Match analysis and background
              </Typography>
            </Grid>

            {/* Filters desktop */}
            <Stack
              sx={{ display: { xs: "none", lg: 'block' } }}
              direction={{ xs: 'column', sm: 'row', md: 'column' }}
              spacing={1}
              mb={2}
              alignItems={{ xs: 'flex-start', sm: 'center', md: 'flex-start' }}
              flexWrap="wrap"
              width={{ xs: '100%', md: '701px' }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width="100%">

                <Box
                  display="flex"
                  flexDirection="row"
                  sx={{
                    gap: 0,
                    width: { xs: '100%', sm: '250px', lg: '100%' }, // ⚠ probably meant 650px not 6550px
                    maxWidth: '300px',
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
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    Everything
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </Paper>
                </Box>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  sx={{ mt: { xs: 1, sm: 0 } }}

                >
                  <Button size="small" fontSize="15px" sx={{ color: 'grey.600', mt: 1 }}>
                    Select All
                  </Button>
                  <Button
                    size="medium"
                    variant="outlined"
                    sx={{ color: 'grey.600', borderRadius: '100px', width: '100px' }}
                  >
                    Clear All
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: '100px', width: '100px' }}
                  >
                    Update
                  </Button>
                </Stack>
              </Stack>

              {/* Chips BELOW the buttons */}
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={1} sx={{ width: "100%" }}>
                {skills.map((skill, index) => {
                  const badgeColor = getBadgeColor(skill.score);
                  return (
                    <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
                      {/* The Chip */}
                      <Chip
                        label={<Typography fontWeight={200} fontSize={11} >{skill.label}</Typography>}
                        variant="outlined"
                        sx={{
                          width: "127px",
                          borderRadius: "20px",
                          py: 0.2,

                        }}
                      />
                      {/* The floating badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          bgcolor: badgeColor,
                          color: "white",
                          borderRadius: "50%",
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          minWidth: 25,
                          height: 26,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: 1,
                        }}
                      >
                        {skill.score}%
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Stack>


            <Stack
              sx={{ display: { xs: "block", lg: 'none' } }}
              direction={{ xs: 'column', sm: 'row', md: 'column' }}
              spacing={1}
              mb={2}
              alignItems={{ xs: 'flex-start', sm: 'center', md: 'flex-start' }}
              flexWrap="wrap"
              width={{ xs: '100%', md: '100%' }}
            >

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width="100%">
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  gutterBottom
                  sx={{ display: { xs: "block", lg: "none" }, mt: 10, mb: -1, }}
                >
                  Background of Product Management at Mastercard
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  sx={{
                    gap: 0,
                    width: { xs: '100%', sm: '100%', lg: '100%' }, // ⚠ probably meant 650px not 6550px
                    maxWidth: '500px',
                    mb: 2,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: 'grey.100',
                      display: 'flex',
                      textAlign: 'center',
                      p: 0.5,
                    }}
                  >
                    Match Score
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: { xs: '#0BA02C', lg: 'grey.300' },
                      flex: 1,
                      p: 1,
                      textAlign: 'center',
                      borderRadius: '0px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                      color: '#fff',
                    }}
                  >
                    Everything
                    <KeyboardArrowDownIcon fontSize="medium" />
                  </Paper>
                </Box>


              </Stack>


              {/* Chips BELOW the buttons */}
              <Stack direction="row" spacing={2} flexWrap="wrap" mt={1} sx={{ width: "100%" }}>
                {skills.map((skill, index) => {
                  const badgeColor = getBadgeColor(skill.score);
                  return (
                    <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
                      {/* The Chip */}
                      <Chip
                        label={<Typography fontWeight={600}>{skill.label}</Typography>}
                        variant="outlined"
                        sx={{
                          borderRadius: "20px",
                          px: 1,
                          py: 0.5,
                        }}
                      />
                      {/* The floating badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          bgcolor: badgeColor,
                          color: "white",
                          borderRadius: "50%",
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          minWidth: 28,
                          height: 28,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: 1,
                        }}
                      >
                        {skill.score}%
                      </Box>
                    </Box>
                  );
                })}
              </Stack>

              <Stack
                direction={{ xs: 'row', sm: 'row' }}
                spacing={1}
                sx={{ mt: { xs: 1, sm: 1 } }}
                width='330px'
                height='60px'
                bgcolor='grey.200'
                borderRadius='10px'
                padding='10px'
              >

                <Button

                  variant="outlined"
                  sx={{ color: 'grey.600', bgcolor: '#fff', borderRadius: '100px', width: '100px' }}
                >
                  Select All
                </Button>
                <Button

                  variant="outlined"
                  sx={{ color: 'grey.600', bgcolor: '#fff', borderRadius: '100px', width: '100px' }}
                >
                  Clear All
                </Button>

                <Button

                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: '100px', width: '100px' }}
                >
                  Update
                </Button>
              </Stack>
            </Stack>

            {/* Matching */}
            <Paper sx={{ p: 2, mb: 2, bgcolor: '#e8f5e9', mt: { xs: 6, md: 0 } }}>
              <Typography variant="h6" color="success.main">
                Matching 75%
              </Typography>
              <Divider sx={{ my: 1 }} />
              <ul>
                {Array(6)
                  .fill(0)
                  .map((_, idx) => (
                    <li key={idx}>
                      Strong experience in cross-functional product development teams.
                    </li>
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
                {resumeHighlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
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
                    <li key={idx}>Hands-on experience with stakeholder and customer research.</li>
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
                    <li key={idx}>
                      Background in driving product innovation in tech-first environments.
                    </li>
                  ))}
              </ul>
            </Paper>
          </Grid>

          {/* Right Column */}

          <Grid item xs={12} lg={6} order={{ xs: 1, md: 2 }}>
            <Box
              sx={{
                bgcolor: { xs: "transparent", lg: "grey.200" },
                p: { xs: 0, lg: 2 },
                borderRadius: 1,


              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ display: { xs: "block", lg: "block" } }}
              >
                Background of Product Management at Mastercard
              </Typography>

              {isMobile ? (
                <Slider {...sliderSettings}>
                  {/* Slide 1 - Education Background Pie */}
                  <Box>
                    <Typography variant="body2" fontWeight="800" mb={1} >
                      Education Background of Directors
                    </Typography>

                    <Divider />

                    <Grid sx={{
                      position: 'relative',
                      width: '330px',

                    }}>
                      <HighchartsReact highcharts={Highcharts} options={options} />
                    </Grid>
                  </Box>


                  {/* Slide 2 - Bar Chart */}
                  <Paper sx={{ p: 2, mb: 2, width: "100%" }}>
                    <Typography variant="body2" fontWeight="600" mb={1} >
                      Years of Experience vs Percentage of Directors
                    </Typography>
                    <Divider />

                    {/* Bar Chart */}
                    <Box sx={{ height: { xs: 200, md: 250 }, width: "100%", mt: 1 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} barCategoryGap="10%">

                          <YAxis
                            fontSize={12}
                            domain={[0, 50]}
                            ticks={[0, 10, 20, 30, 40, 50]}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip cursor={{ fill: 'transparent' }} />
                          <Bar dataKey="percentage">
                            {barData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>

                    {/* Custom Legend */}
                    <CustomLegend />
                  </Paper>


                  {/* Slide 3 - Radial Chart */}
                  <Paper sx={{ p: 2, width: '100%', bgcolor: '#fff' }}>
                    <Typography variant="body2" fontWeight="800" mb={1} >
                      Previous Company Background
                    </Typography>
                    <Divider />

                    <Box
                      sx={{
                        position: 'relative',
                        height: { xs: 200, md: 250 },
                        width: '100%',
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {/* Labels */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '30%',
                          left: { xs: 10, md: 20 },
                          zIndex: 1,
                        }}
                      >
                        {companyBackgroundData.map((item, index) => (
                          <Typography key={index} sx={{ mb: 1, fontSize: { xs: 10, md: 12 } }}>
                            {item.name} <strong>{item.value}%</strong>
                          </Typography>
                        ))}
                      </Box>

                      {/* Chart */}
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          cx="70%"
                          cy="50%"
                          innerRadius="20%"
                          outerRadius="90%"
                          barCategoryGap="10%"
                          data={companyBackgroundData}
                          startAngle={90}
                          endAngle={-270}
                        >
                          <RadialBar
                            clockWise
                            dataKey="value"
                            cornerRadius={3}
                          // 👇 Removed the background prop to eliminate grey ring
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>
                </Slider>
              ) : (
                <>
                  {/* Desktop: All stacked */}
                  <Box>
                    <Typography variant="body2" fontWeight="800" mb={1} >
                      Education Background of Directors
                    </Typography>
                    <Divider sx={{ bgcolor: "grey.400", my: 1 }} />
                    <div style={{ width: "100%", marginBottom: '10px' }}>
                      <HighchartsReact highcharts={Highcharts} options={options} />
                    </div>
                  </Box>

                  <Paper sx={{ p: 2, mb: 2, width: "100%" }}>
                    <Typography variant="body2" fontWeight="800" mb={1} >
                      Years of Experience vs Percentage of Directors
                    </Typography>
                    <Divider />

                    {/* Bar Chart */}
                    <Box sx={{ height: { xs: 200, md: 250 }, width: "100%", mt: 1 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} barCategoryGap="10%">

                          <YAxis
                            fontSize={12}
                            domain={[0, 50]}
                            ticks={[0, 10, 20, 30, 40, 50]}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip cursor={{ fill: 'transparent' }} />
                          <Bar dataKey="percentage">
                            {barData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>

                    {/* Custom Legend */}
                    <CustomLegend />
                  </Paper>

                  <Paper sx={{ p: 2, width: '100%', bgcolor: '#fff' }}>
                    <Typography variant="body2" fontWeight="800" mb={1} >
                      Previous Company Background
                    </Typography>
                    <Divider />

                    <Box
                      sx={{
                        position: 'relative',
                        height: { xs: 200, md: 250 },
                        width: '100%',
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {/* Labels */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '30%',
                          left: { xs: 10, md: 20 },
                          zIndex: 1,
                        }}
                      >
                        {companyBackgroundData.map((item, index) => (
                          <Typography key={index} sx={{ mb: 1, fontSize: { xs: 10, md: 12 } }}>
                            {item.name} <strong>{item.value}%</strong>
                          </Typography>
                        ))}
                      </Box>

                      {/* Chart */}
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          cx="70%"
                          cy="50%"
                          innerRadius="20%"
                          outerRadius="90%"
                          barCategoryGap="10%"
                          data={companyBackgroundData}
                          startAngle={90}
                          endAngle={-270}
                        >
                          <RadialBar
                            clockWise
                            dataKey="value"
                            cornerRadius={3}
                          // 👇 Removed the background prop to eliminate grey ring
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        <CardActions
          sx={{
            display: { xs: 'block', md: 'none', lg: 'none' },
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 4,

          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              mb: 2,
              color: '#fff',
              backgroundColor: 'primary.main',
              borderRadius: '100px',
              width: { xs: '100%', sm: '200px' },
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
            onClick={() => navigate('/job-feed')}
          >
            Explore more jobs
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: '#0040D8',
              backgroundColor: '#fff',
              borderRadius: '100px',
              width: { xs: '100%', sm: '200px' },
            }}
            href={paths.auth.jwt.register}
          >
            Sign up
          </Button>
        </CardActions>
      </Box>
    </Container>
  );
};

export default ProductManagementPage;

