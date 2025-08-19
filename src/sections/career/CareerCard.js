import PropTypes from 'prop-types';
import { Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const badgeStyles = {
  display: 'inline-block',
  bgcolor: '#DCECF6',
  color: '#1BABFE',
  fontSize: 12,
  fontWeight: 600,
  borderRadius: '3px',
  px: 1,
  // py: 0.75,
  mb: 1,
};

const matchStyles = {
  base: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 10,
    fontWeight: 600,
    padding: '4px 4px 14px 14px',
    borderTopLeftRadius: 0, // Top-left
    borderTopRightRadius: '8px', // Top-right
    borderBottomRightRadius: 0, // Bottom-right
    borderBottomLeftRadius: '100%', // Bottom-left
    textAlign: 'center',
  },
  success: { bgcolor: '#E6F4EA', color: '#2E7D32' },
  warning: { bgcolor: '#FFF8E1', color: '#F9A825' },
  error: { bgcolor: '#FDECEA', color: '#D32F2F' },
};

export default function CareerCard({ title, match, rate, salary, experience, onClick }) {
  const navigate = useNavigate();

  const handleDetailsClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    navigate('/job-details');
  };
  let variant = matchStyles.success;
  if (match < 50) variant = matchStyles.error;
  else if (match < 80) variant = matchStyles.warning;

  return (
    <Paper
      variant="outlined"
      onClick={onClick}
      sx={{
        px: 2,
        py: 1,
        position: 'relative',
        width: { xs: '100%', sm: 360 },
        height: 127,
        borderRadius: '8px',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: onClick ? 4 : 'none',
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '28px',
          letterSpacing: '0%',
          verticalAlign: 'middle',
          mb: 0.5,
        }}
      >
        {title}
      </Typography>

      <Box component="span" sx={badgeStyles}>
        {rate} Transition rate
      </Box>
      <br />
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '20px',
          letterSpacing: '0%',
          color: '#767F8C',
          display: 'block',
          mb: 0.5,
        }}
      >
        Salary: {salary}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '20px',
          letterSpacing: '0%',
          color: '#767F8C',
          display: 'block',
        }}
      >
        Experience: {experience}
      </Typography>

      <Box component="span" sx={{ ...matchStyles.base, ...variant }}>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '12px',
            letterSpacing: '0%',
            textTransform: 'uppercase',
            color: variant.color || '#0BA02C',
          }}
        >
          {match}%
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: '12px',
            letterSpacing: '0%',
            textTransform: 'uppercase',
            color: variant.color || '#0BA02C',
            mt: '2px',
          }}
        >
          Match
        </Typography>
      </Box>

      <Button
        variant="outlined"
        size="small"
        onClick={handleDetailsClick}
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          fontSize: '0.7rem',
          textTransform: 'none',
        }}
      >
        Details
      </Button>
    </Paper>
  );
}

CareerCard.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.number.isRequired,
  rate: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
