/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */


import { Box, Container, Typography, Button, Grid } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { trackEvent } from 'src/utils/google-analytics';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';

export default function SubHeader({ subtitle, showUploadResume }) {
  const navigate = useNavigate();
const {user} = useAuthContext();
  const hasUploadedResume = showUploadResume === 'resume'; // ✅ reactively tied to prop

  return (
    <Box sx={{ backgroundColor: '#E9F4FF', py: 1.5, width: '100%', position: 'relative' }}>
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

        {/* ✅ Show Upload Resume Button only if no resume uploaded */}
        {!hasUploadedResume && (
          <Button
            variant="outlined"
            size="medium"
            sx={{
              fontSize: { xs: '14px', sm: '16px' },
              border: '1px solid #4C95EB',
              textTransform: 'none',
              ml: 'auto',
            }}
            onClick={() => navigate(`${"/"}?retry=resume`)}
          >
            <img
              src="/assets/icons/careerCompass/upload_icon.svg"
              alt="upload_icon"
              height={24}
              width={24}
              style={{ marginRight: 8 }}
            />
            Upload resume to unlock your potential
          </Button>
        )}

        {/* ✅ Show Buttons only when resume is uploaded */}
        {(subtitle === "FOBO" && hasUploadedResume) && (
          <Grid
            item
            xs={12}
            textAlign="left"
            display="flex"
            flexDirection="row"
            justifyContent="center"
          >
            <Button
              variant="contained"
              sx={{
                width: { xs: '180px', md: '175px' },
                backgroundColor: '#2C47D3',
                borderRadius: 10,
                px: 4,
                mx: 1,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#2C47D3',
                  boxShadow: 'none',
                },
              }}
              onClick={() => {
                trackEvent({
                  category: 'CTA clicked',
                  action: 'button clicked',
                  label: 'Beat FOBO now',
                  value: 'Navigate to pricing',
                });
                navigate(paths.pricing);
              }}
              aria-label="Navigate to pricing page"
            >
              Beat FOBO Now
            </Button>

            <Button
              variant="contained"
              sx={{
                width: { xs: '180px', md: '175px' },
                backgroundColor: '#2C47D3',
                borderRadius: 10,
                px: 4,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#2C47D3',
                  boxShadow: 'none',
                },
              }}
              onClick={() => {
                trackEvent({
                  category: 'CTA clicked',
                  action: 'button clicked',
                  label: 'Beat FOBO now',
                  value: 'Navigate to pricing',
                });
                if (!user) {
                  navigate(paths.auth.jwt.register);
                } else {
                  navigate(paths.aireadliness);
                }
              }}
              aria-label="Navigate to pricing page"
            >

              FOBO Pro
            </Button>
          </Grid>
        )}
      </Container>
    </Box>
  );
}

SubHeader.propTypes = {
  subtitle: PropTypes.string,
  showUploadResume: PropTypes.string,
};
