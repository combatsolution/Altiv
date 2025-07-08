import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
// icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
// theme
import { bgGradient } from 'src/theme/css';
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const CONTACT_SECTIONS = [
  {
    title: 'Connect With Us',
    icon: <LinkedInIcon sx={{ fontSize: 40, color: '#0a66c2' }} />,
    items: [
      {
        href: 'https://www.linkedin.com/company/altivai',
        icon: <LinkedInIcon sx={{ fontSize: 32, color: '#0a66c2' }} />,
      },
      {
        href: 'https://twitter.com/altivai',
        icon: <TwitterIcon sx={{ fontSize: 32, color: '#1da1f2' }} />,
      },
      {
        href: 'https://instagram.com/altiv.ai',
        icon: <InstagramIcon sx={{ fontSize: 32, color: '#e4405f' }} />,
      },
    ],
  },
];

// ----------------------------------------------------------------------

export default function ContactHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: '/assets/images/contact/hero.jpg',
        }),
        py: { xs: 10, md: 8 },
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            position: { md: 'relative' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* <TextAnimate
            text="Contact Us"
            sx={{ color: '#fff', letterSpacing: '0.1em' }}
            variants={varFade().inRight}
          /> */}

          <Box display="flex" gap={2} color="#fff">
            <TextAnimate text="Contact" />
            <TextAnimate text="Us" />
          </Box>

          <Stack
            spacing={2}
            direction="row"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            sx={{ color: 'common.white', mt: 3 }}
          >
            <m.div variants={varFade().in}>
              <Typography
                variant="h5"
                sx={{
                  color: 'common.white',
                  opacity: 0.8,
                  maxWidth: { xs: '100%', md: 600 },
                  mx: { xs: 'auto', md: 0 },
                  px: { xs: 2, md: 0 },
                }}
              >
                Ready to future-proof your career? We are here to help.
              </Typography>
            </m.div>
          </Stack>

          {/* Media Inquiries Section */}
          <m.div variants={varFade().inUp}>
            <Stack
              spacing={1}
              sx={{
                mt: 3,
                px: { xs: 2, md: 0 },
                textAlign: { xs: 'center', md: 'left' },
                maxWidth: { md: 700 },
                mx: { xs: 'auto', md: 0 },
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: 'common.white', fontWeight: 600, opacity: 0.85 }}
              >
                Media Inquiries
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'common.white',
                  opacity: 0.8,
                  fontSize: { xs: 14, md: 16 },
                  lineHeight: 1.7,
                }}
              >
                For press and media inquiries, please email us with <em>&quot;Media&quot;</em> in
                the subject line.
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'common.white',
                  opacity: 0.8,
                  fontSize: { xs: 14, md: 16 },
                  lineHeight: 1.7,
                }}
              >
                Your success is our priority. Whether you have questions about our programs, want to
                discuss your AI-readiness assessment, or need guidance on getting started, we&quot;
                re here to help you navigate your career evolution in the AI era.{' '}
              </Typography>
            </Stack>
          </m.div>

          {/* CONTACTS + SOCIAL SECTION */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 6 }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            sx={{ mt: 6 }}
          >
            <Stack direction="column" spacing={2} sx={{ color: 'common.white' }}>
              {/* Email */}
              <m.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Typography variant="h5" sx={{ opacity: 0.8 }}>
                  Get in Touch:
                </Typography>

                <Typography
                  variant="body2"
                  component="a"
                  href="mailto:hello@altiv.ai"
                  sx={{
                    mt: 1,
                    color: 'common.white',
                    opacity: 0.9,
                    textDecoration: 'underline',
                    '&:hover': {
                      opacity: 1,
                      color: theme.palette.primary.light,
                    },
                  }}
                >
                  📧 hello@altiv.ai
                </Typography>
              </m.div>

              {/* Contact Us Heading */}
              <m.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Typography variant="h5" sx={{ opacity: 0.8 }}>
                  Contact Us
                </Typography>
              </m.div>

              {/* Social Icons */}
              {CONTACT_SECTIONS.map((section) => (
                <m.div key={section.title} variants={varFade().in}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent={{ xs: 'center', md: 'flex-start' }}
                  >
                    {section.items.map((item, index) => (
                      <Box
                        key={index}
                        component="a"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': { opacity: 0.8 },
                        }}
                      >
                        {item.icon}
                      </Box>
                    ))}
                  </Stack>
                </m.div>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', md: 'flex-start' },
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
