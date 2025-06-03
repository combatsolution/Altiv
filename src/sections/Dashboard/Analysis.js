import React, { useState } from 'react';
import { Box, Typography, Grid, Card, Button } from '@mui/material';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import GaugeChart from 'react-gauge-chart';
import { width } from '@mui/system';

const pieData = [
  {
    name: 'Augmentation',
    value: 30,
    color: '#FFB95A',
  },
  {
    name: 'Automation',
    value: 40,
    color: '#EF4444',
  },
  {
    name: 'Human',
    value: 30,
    color: '#84CC16',
  },
];

// Four “sub‐tasks” (or categories) for each section. Adjust these strings as needed.
const tasksMap = {
  Automation: ['Basic content creation', 'Data reporting', 'Market research', 'Simple assessments'],
  Augmentation: [
    'Assistive drafting',
    'Insight summarization',
    'Design suggestions',
    'Quality checks',
  ],
  Human: [
    'Creative brainstorming',
    'Complex negotiations',
    'Emotional support',
    'High-level strategy',
  ],
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
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

export default function FoboLevelTaskDistribution() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const handlePieClick = (_, index) => {
    setActiveIndex(index);
    setSelectedSection(pieData[index].name);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    setSelectedSection(null);
  };

  // --- FOBO Level Logic ---
  const foboValue = 24;
  const value = Math.max(0, Math.min(foboValue, 100));
  const percent = value / 100;
  const getLevelColor = () => {
    if (value <= 39) return '#00C853';
    if (value <= 69) return '#FFEB3B';
    return '#E53935';
  };
  // --- end FOBO Level Logic ---

  return (
    <Box px={{ xs: 2, md: 6 }} py={2} sx={{ position: 'relative' }}>
      <Grid container spacing={4}>
        {/* FOBO Level */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'left' }} gutterBottom>
            FOBO Level
          </Typography>

          <Box sx={{ width: '100%', maxWidth: 330, mx: 'auto', mt: 2 }}>
            <GaugeChart
              id="fobo-gauge"
              nrOfLevels={5}
              arcsLength={[0.39, 0.3, 0.31]}
              colors={['#00C853', '#FFEB3B', '#E53935']}
              percent={percent}
              innerRadius={90}
              arcPadding={0.02}
              textColor="#000"
              needleColor="#424242"
              formatTextValue={() => `${value}`}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              mt={1}
              color={getLevelColor()}
            >
              {value}
            </Typography>
          </Box>
        </Grid>

        {/* Task Distribution Pie */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            Task Distribution
          </Typography>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                cornerRadius={8}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onClick={handlePieClick}
                onMouseLeave={handleMouseLeave}
                labelLine={false}
                label={({ percent: slicePercent }) => `${(slicePercent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, id) => (
                  <Cell key={`cell-${id}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Box
          sx={{
            mt: { xs: 2, md: 3 },
            marginLeft: { xs: 'auto', md: 2, lg: '750px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 0,
          }}
        >
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
              <strong>Automation:</strong> AI can do these tasks itself, replacing human work
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
              <strong>Augmentation:</strong> AI works with you, like a smart assistant helping you
              do better work
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
              <strong>Human:</strong> Tasks that AI can’t likely replace
            </Typography>
          </Box>
        </Box>
        {/* “Tasks distribution for <Section>” + Horizontal Bar + Category Labels */}
        {selectedSection && (
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Tasks distribution for {selectedSection}
            </Typography>

            {/* Horizontal bar whose color matches the selected slice */}
            <Box
              sx={{
                width: '100%',
                height: 2,
                bgcolor: pieData.find((d) => d.name === selectedSection)?.color,
                borderRadius: 1,
              }}
            />

            {/* Four labels spaced evenly under the bar */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 1,
                px: { xs: 1, md: 2 },
              }}
            >
              {tasksMap[selectedSection].map((taskName, i) => (
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
              ))}
            </Box>
          </Grid>
        )}

        {/* Summary Text Placeholder */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Lorem Ipsum
          </Typography>
          <Typography variant="body2">• Lorem Ipsum</Typography>
          <Typography variant="body2">• Lorem Ipsum</Typography>
          <Typography variant="body2">• Lorem Ipsum</Typography>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recommended Growth Strategies For &lt;First Name&gt;
          </Typography>
          <Box mt={2} sx={{ backgroundColor: '#F5FAFF', borderRadius: 2, p: 2 }}>
            {[
              {
                title: 'Master AI-Powered Product Strategies',
                benefit:
                  'Lead AI integration in EdTech products, staying ahead of industry changes',
              },
              {
                title: 'Develop Advanced Learning Experience Design Skills',
                benefit: 'Create unique human-centered solutions that AI cannot easily replicate',
              },
              {
                title: 'Focus on Complex Partnership Development',
                benefit:
                  'Build relationships and strategies that require human judgement and leadership',
              },
              {
                title: 'Strengthen Data-Driven Decision Making',
                benefit: 'Use AI tools to enhance strategic planning and product innovation',
              },
            ].map((rec, i) => (
              <Box key={i} mb={2}>
                <Typography fontWeight="bold" gutterBottom>
                  {i + 1}. {rec.title}
                </Typography>
                <Typography variant="body2">Benefit: {rec.benefit}</Typography>
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
  );
}
