import PropTypes from 'prop-types';
import { Paper, Typography, Box } from '@mui/material';

const badgeStyles = {
  display: 'inline-block',
  bgcolor: '#E8F0FF',
  color: '#1976d2',
  fontSize: 12,
  fontWeight: 600,
  borderRadius: 1,
  px: 1,
  py: 0.75,
  mb: 1,
};

const matchStyles = {
  base: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 10,
    fontWeight: 600,
    px: 1,
    py: 0.5,
    borderRadius: 1,
    textAlign: 'center',
  },
  success: { bgcolor: '#E6F4EA', color: '#2E7D32' },
  warning: { bgcolor: '#FFF8E1', color: '#F9A825' },
  error: { bgcolor: '#FDECEA', color: '#D32F2F' },
};

export default function CareerCard({ title, match, rate, salary, experience, onClick }) {
  let variant = matchStyles.success;
  if (match < 50) variant = matchStyles.error;
  else if (match < 80) variant = matchStyles.warning;

  return (
    <Paper
      variant="outlined"
      onClick={onClick}
      sx={{
        p: 2,
        position: 'relative',
        width: { xs: '100%', sm: 260 },
        height: 140,
        borderRadius: 2,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: onClick ? 4 : 'none',
        },
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
        {title}
      </Typography>

      <Box component="span" sx={badgeStyles}>
        {rate} Transition rate
      </Box>
      <br />
      <Typography variant="caption" color="grey.600" sx={{ lineHeight: 1.4 }}>
        Salary: {salary}
        <br />
        Experience: {experience}
      </Typography>

      <Box component="span" sx={{ ...matchStyles.base, ...variant }}>
        {match}%<br />
        Match
      </Box>
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
