  import React from 'react';
  import PropTypes from 'prop-types';
  import { Box, Grid, Typography, Paper } from '@mui/material';
  import { m } from 'framer-motion'; // For MotionPaper if needed

  const MetricsCards = ({ metrics }) => (

<Box mt={2}>
  <Grid
    container
    spacing={0}
    sx={{
      ml: 0,  
      mr: 3,
      width: '100%',
      '& .MuiGrid-item': {
        pl: 0,
        pr: '4px',
        ml: '-39px',
        mr: '-67px',
      },
   
    }}
  >
    {metrics.map((metric, index) => (
      <Grid
        item
        key={index}
        xs={12}
        sm={6}
        md={6}
        lg={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 0,
        }}
      >
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ scale: 1 }}
          style={{ width: '100%', maxWidth: 200 }}
        >
          <Paper
            sx={{
              borderRadius: 3,
              cursor: 'pointer',
              background: 'white',
              borderTop: `4px solid ${metric.color}`,
              minHeight: 50,
              width: '80%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              m: 0,
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 45,
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
                fontWeight={600}
                sx={{
                  fontSize: '12px',
                  textAlign: 'left',
                  color: 'text.secondary',
                  wordBreak: 'break-word',
                }}
              >
                {metric.title}
              </Typography>

              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ textAlign: 'left' }}
                color="primary.main"
              >
                {metric.value}
                {metric.suffix || ''}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ fontSize: '10px', textAlign: 'left' }}
              >
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

