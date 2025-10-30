import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { m } from 'framer-motion'; // For MotionPaper if needed

const MetricsCards = ({ metrics }) => (
  <Box mt={2}>
    <Grid container spacing={2} justifyContent='flex-start'>
      {metrics.map((metric, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={2}
          sx={{ maxWidth: 270, display: 'flex', justifyContent: 'center' }}
        >
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0px 8px 25px rgba(0,0,0,0.15)',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                cursor: 'pointer',
                background: 'white',
                borderTop: `4px solid ${metric.color}`,
                minHeight: 160,
                width: '100%',
                maxWidth: 270,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 55,
                  height: 40,
                  borderRadius: '50%',  
                  bgcolor: `${metric.color}1A`,
                  mr: 1,
                }}
              >
                {metric.icon}
              </Box>

              {/* Text */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  sx={{ textAlign: 'left', wordBreak: 'break-word', color: 'text.secondary' }}
                >
                  {metric.title}
                </Typography>

                <Typography variant="h3" fontWeight="bold" sx={{ textAlign: 'left' }} color="primary.main">
                  {metric.value}{metric.suffix || ''}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                  {metric.subtitle}
                </Typography>
              </Box>
            </Paper>
          </m.div>
        </Grid>
      ))}
    </Grid>
  </Box>
);


MetricsCards.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      suffix: PropTypes.string,
      subtitle: PropTypes.string,
      color: PropTypes.string,
      icon: PropTypes.node,
    })
  ).isRequired,
};

export default MetricsCards;
