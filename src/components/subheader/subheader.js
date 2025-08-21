/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

export default function SubHeader({ subtitle, showUploadResume }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ backgroundColor: '#E9F4FF', py: 1.5, width: '100%', zIndex: 10, position: 'relative' }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src="/assets/home.svg"
            style={{ width: '25px', cursor: 'pointer' }}
            alt="homesvg"
            onClick={() => navigate('/')}
          />
          <ArrowForwardIosIcon fontSize="small" sx={{ fontSize: '12px' }} />
          <Typography variant="body2">{subtitle}</Typography>
        </Box>
        {showUploadResume && (
          <Button
            variant="outlined"
            size="medium"
            sx={{
              fontSize: { xs: '14px', sm: '16px', md: '16px' },
              fontFamily: 'Roboto',
              fontWeight: 400,
              lineHeight: '120%',
              letterSpacing: '0%',
              ml: 'auto',
              mb: { xs: 1, sm: 0 },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
              py: { xs: 0.75, sm: 1 },
              px: { xs: 1.5, sm: 2 },
              textTransform: 'none',
              whiteSpace: 'nowrap',
              minWidth: 'auto',
              border: '1px solid',
              borderColor: '#4C95EB',
            }}
          >
            <img
              src="/assets/icons/careerCompass/upload_icon.svg"
              alt="upload_icon"
              height={24}
              width={24}
              style={{
                display: 'block',
                width: { xs: '20px', sm: '24px' },
                height: 'auto',
              }}
            />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Upload resume to unlock your potential
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              Upload resume
            </Box>
          </Button>
        )}
      </Container>
    </Box>
  );
}

SubHeader.propTypes = {
  subtitle: PropTypes.string,
  showUploadResume: PropTypes.bool,
};
