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
  LabelList,
  Cell,
} from 'recharts';

import { paths } from 'src/routes/paths';

const educationData = [
  { name: 'Tier 1', value: 20, fill: '#42a5f5' },
  { name: 'IT / NT', value: 25, fill: '#2196f3' },
  { name: 'Other Engineering', value: 15, fill: '#1e88e5' },
  { name: 'IM', value: 10, fill: '#ffb300' },
  { name: 'MBA', value: 12, fill: '#ff9800' },
  { name: 'ISB', value: 8, fill: '#f57c00' },
  { name: 'Other MBA', value: 12, fill: '#ffa726' },
];

const innerEducationData = [
  { name: 'Engineering', value: 47, fill: '#42a5f5' }, // sum of Engg categories
  { name: 'MBA', value: 42, fill: '#ffa726' }, // sum of MBA categories
  { name: 'Others', value: 12, fill: '#43a047' }, // others
];

const barData = [
  { name: '8 - 10 years', percentage: 40 },
  { name: '11 - 12 years', percentage: 50 },
  { name: '13 - 15 years', percentage: 38 },
  { name: '15+ years', percentage: 30 },
];

const companyBackgroundData = [
  { name: 'Financial Tech', value: 35, fill: '#26a69a' },
  { name: 'Big Tech', value: 20, fill: '#42a5f5' },
  { name: 'Enterprise SaaS', value: 20, fill: '#fbc02d' },
  { name: 'Internal Promotions', value: 25, fill: '#ffa726' },
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

const ProductManagementPage = () => {
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

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
    if (value < 8) return null;
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
        fontSize="10"
        fontWeight="bold"
      >
        {name}
      </text>
    );
  };

  const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
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
      >
        {name}
      </text>
    );
  };

  return (
    <Container maxWidth="auto">
      <Box sx={{ pl: { xs: 2, md: 8 }, pr: { xs: 2, md: 4 }, py: 2 }}>
        {/* Title */}
        <Typography variant="h5" fontSize="20px" fontWeight="bold" gutterBottom>
          Product Management at Mastercard
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Match analysis and background
        </Typography>

        {/* Filters */}
        <Stack
          direction={{ xs: 'column', sm: 'row', md: 'column' }}
          spacing={1}
          mb={2}
          alignItems={{ xs: 'flex-start', sm: 'center', md: 'flex-start' }}
          flexWrap="wrap"
          width={{ xs: '330px', md: '701px' }}
        >
          <Stack direction="row" spacing={2}>
            <Box
              display="flex"
              flexDirection="row"
              sx={{
                gap: 0,
                width: '250px',
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
                }}
              >
                Everything
              </Paper>
            </Box>

            <Button size="small" fontSize="15px" margintop="1px" sx={{ color: 'grey.600', mt: 1 }}>
              Select All
            </Button>
            <Button
              size="medium"
              variant="outlined"
              sx={{ color: 'grey.600', mt: 1, borderRadius: '100px' }}
            >
              Clear All
            </Button>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              sx={{ borderRadius: '100px', mt: 1 }}
            >
              Update
            </Button>
          </Stack>

          {/* Chips BELOW the buttons */}
          <Stack direction="row" spacing={3} flexWrap="wrap" mt={1} pl={1}>
            <Chip label="Technical" color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
            <Chip label="Leadership" color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
            <Chip
              label="Project Management"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <Chip label="Lorem Ipsum" color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
          </Stack>
        </Stack>

        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} md={6} sx={{ pr: 2 }}>
            {/* Matching */}
            <Paper sx={{ p: 2, mb: 2, bgcolor: '#e8f5e9' }}>
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
          <Grid
            item
            xs={12}
            md={6}
            sx={{ bgcolor: 'grey.200', width: '300px', height: '1200px', mt: -15 }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Background of Product Management at Mastercard
            </Typography>

            <Paper sx={{ p: 2, mb: 2, width: '550px', height: '400px' }}>
              <Typography variant="body2" fontWeight="bold" mb={2}>
                Education Background of Directors
              </Typography>
              <Divider />
              <Box sx={{ height: 300, width: 500, mt: 2, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {/* Inner Pie */}
                    <Pie
                      data={innerEducationData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={hoveredInner !== null ? 75 : 70}
                      label={renderInnerLabel}
                      onMouseEnter={(data, index) => setHoveredInner(index)}
                      onMouseLeave={() => setHoveredInner(null)}
                    >
                      {innerEducationData.map((entry, index) => (
                        <Cell
                          key={`inner-cell-${index}`}
                          fill={entry.fill}
                          stroke={hoveredInner === index ? '#333' : 'none'}
                          strokeWidth={hoveredInner === index ? 2 : 0}
                        />
                      ))}
                    </Pie>

                    {/* Outer Pie */}
                    <Pie
                      data={educationData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={78}
                      outerRadius={hoveredOuter !== null ? 125 : 120}
                      label={renderCustomLabel}
                      onMouseEnter={(data, index) => setHoveredOuter(index)}
                      onMouseLeave={() => setHoveredOuter(null)}
                    >
                      {educationData.map((entry, index) => (
                        <Cell
                          key={`outer-cell-${index}`}
                          fill={entry.fill}
                          stroke={hoveredOuter === index ? '#333' : 'none'}
                          strokeWidth={hoveredOuter === index ? 2 : 0}
                        />
                      ))}
                    </Pie>

                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <Typography variant="body1" fontWeight="bold" color="text.primary">
                    Education
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper sx={{ p: 2, mb: 2, width: '550px', height: '300px' }}>
              <Typography variant="body2" fontWeight="bold" mb={1}>
                Years of Experience vs Percentage of Directors
              </Typography>
              <Divider />

              {/* BarGraph */}
              <Box sx={{ height: 250, width: 500, mt: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percentage" fill="#3f51b5" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            <Paper sx={{ p: 2, width: '550px', height: '350px' }}>
              <Typography variant="body2" fontWeight="bold" mb={1}>
                Previous Company Background
              </Typography>
              <Divider />

              <Box sx={{ position: 'relative', height: 250, width: 500, mt: 1 }}>
                {/* Labels */}
                <Box sx={{ position: 'absolute', top: '30%', left: 20 }}>
                  {companyBackgroundData.map((item, index) => (
                    <Typography key={index} sx={{ mb: 1, fontSize: 12 }}>
                      {item.name} <strong>{item.value}%</strong>
                    </Typography>
                  ))}
                </Box>

                {/* Chart */}
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="70%" // push chart to right
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
                      background={{ fill: '#fff' }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <CardActions
          sx={{
            display: 'flex',
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
