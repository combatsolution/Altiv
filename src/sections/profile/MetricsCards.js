import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { m } from 'framer-motion';

const MetricsCards = ({ metrics }) => (
  <Box mt={2}>
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={6}
        >
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0px 6px 20px rgba(0,0,0,0.12)',
            }}
            style={{
              height: '100%',
              borderRadius: '15px', // 🔥 CRITICAL: Add borderRadius here
              overflow: 'hidden',   // 🔥 CRITICAL: Clip rounded corners
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                borderTop: `4px solid ${metric.color}`,
                p: 2,
                height: 170,
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >

              {/* Top Row: Icon & Title */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ fontSize: 28 }}>
                  {metric.icon}
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: '#555' }}
                >
                  {metric.title}
                </Typography>
              </Box>

              {/* VALUE */}
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mt: 1,
                  color: metric.color,
                }}
              >
                {metric.value}{metric.suffix}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="body2"
                sx={{ color: '#777', mt: 0.5 }}
              >
                {metric.subtitle}
              </Typography>

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