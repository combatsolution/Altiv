// import PropTypes from 'prop-types';
// import { m } from 'framer-motion';
// // @mui
// import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { alpha, useTheme } from '@mui/material/styles';
// // theme
// import { bgGradient } from 'src/theme/css';
// //
// import { MotionContainer, varFade } from 'src/components/animate';

// // ----------------------------------------------------------------------

// const CONTACTS = [

//   {
//     country: 'Bali',
//     address: '508 Bridle Avenue Newnan, GA 30263',
//     phoneNumber: '(239) 555-0108',
//   },
//   {
//     country: 'London',
//     address: '508 Bridle Avenue Newnan, GA 30263',
//     phoneNumber: '(319) 555-0115',
//   },
//   {
//     country: 'Prague',
//     address: '508 Bridle Avenue Newnan, GA 30263',
//     phoneNumber: '(252) 555-0126',
//   },
//   {
//     country: 'Moscow',
//     address: '508 Bridle',
//     phoneNumber: '(307) 555-0133',
//   },
// ];

// // ----------------------------------------------------------------------

// export default function ContactHero() {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         ...bgGradient({
//           color: alpha(theme.palette.grey[900], 0.8),
//           imgUrl: '/assets/images/contact/hero.jpg',
//         }),
//         height: { md: 560 },
//         py: { xs: 10, md: 0 },
//         overflow: 'hidden',
//         position: 'relative',
//       }}
//     >
//       <Container component={MotionContainer}>
//         <Box
//           sx={{
//             bottom: { md: 80 },
//             position: { md: 'absolute' },
//             textAlign: { xs: 'center', md: 'unset' },
//           }}
//         >
//           <TextAnimate text="Contact Us" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
//           <br />

//           <Stack  spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white', fontSize:'10px' }}>
//             {/* <TextAnimate text="Ready to future-proof your career?" />
//              <TextAnimate text="We're here to help." /> */}
//               <m.div variants={varFade().in}>
//          <Typography variant="h5" sx={{ mt: 3, color: 'common.white', opacity: 0.8 }}>
//              Ready to future-proof your career? We are here to help.
//             </Typography>
//                </m.div>
//           </Stack>

//           <Stack
//             spacing={5}
//             alignItems={{ xs: 'center', md: 'unset' }}
//             direction={{ xs: 'column', md: 'row' }}
//             sx={{ mt: 5, color: 'common.white' }}
//           >
//             {CONTACTS.map((contact) => (
//               <Stack key={contact.country} sx={{ maxWidth: 180 }}>
//                 <m.div variants={varFade().in}>
//                   <Typography variant="h6" gutterBottom>
//                     {contact.country}
//                   </Typography>
//                 </m.div>

//                 <m.div variants={varFade().inRight}>
//                   <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                     {contact.address}
//                   </Typography>
//                 </m.div>
//               </Stack>
//             ))}
//           </Stack>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// function TextAnimate({ text, variants, sx, ...other }) {
//   return (
//     <Box
//       component={m.div}
//       sx={{
//         typography: 'h1',
//         overflow: 'hidden',
//         display: 'inline-flex',
//         ...sx,
//       }}
//       {...other}
//     >
//       {text.split('').map((letter, index) => (
//         <m.span key={index} variants={variants || varFade().inUp}>
//           {letter}
//         </m.span>
//       ))}
//     </Box>
//   );
// }

// TextAnimate.propTypes = {
//   sx: PropTypes.object,
//   text: PropTypes.string,
//   variants: PropTypes.object,
// };

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

//
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Bali',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(239) 555-0108',
  },
  {
    country: 'London',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(319) 555-0115',
  },
  {
    country: 'Prague',
    address: '508 Bridle Avenue Newnan, GA 30263',
    phoneNumber: '(252) 555-0126',
  },
  {
    country: 'Moscow',
    address: '508 Bridle',
    phoneNumber: '(307) 555-0133',
  },
];

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
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <TextAnimate
            text="Contact Us"
            sx={{ color: '#fff', letterSpacing: '0.1em' }}
            variants={varFade().inRight}
          />
          <br />

          <Stack
            spacing={2}
            display="inline-flex"
            direction="row"
            sx={{ color: 'common.white', fontSize: '10px' }}
          >
            <m.div variants={varFade().in}>
              <Typography variant="h5" sx={{ mt: 3, color: 'common.white', opacity: 0.8 }}>
                Ready to future-proof your career? We are here to help.
              </Typography>
            </m.div>
          </Stack>

          {/* CONTACTS SECTION */}
          <Stack
            spacing={5}
            alignItems={{ xs: 'center', md: 'unset' }}
            direction={{ xs: 'column', md: 'row' }}
            sx={{ mt: 5, color: 'common.white' }}
          >
            {CONTACTS.map((contact) => (
              <Stack key={contact.country} sx={{ maxWidth: 180 }}>
                <m.div variants={varFade().in}>
                  <Typography variant="h6" gutterBottom>
                    {contact.country}
                  </Typography>
                </m.div>

                <m.div variants={varFade().inRight}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {contact.address}
                  </Typography>
                </m.div>
              </Stack>
            ))}
          </Stack>

          {/* SOCIAL ICONS ONLY IN ROW */}
          <Stack
            spacing={2}
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{ mt: 5 }}
          >
            <m.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Typography variant="h5" sx={{ color: 'common.white', opacity: 0.8 }}>
                Contact Us:
              </Typography>
            </m.div>

            {CONTACT_SECTIONS.map((section) => (
              <m.div key={section.title} variants={varFade().in}>
                <Stack direction="row" spacing={3}>
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
