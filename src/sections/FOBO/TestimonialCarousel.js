// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Avatar,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';

// // --- avatar imports, adjust paths as needed ---
// import avt1 from 'src/Fogoimages/Avater01.png';
// import avt2 from 'src/Fogoimages/Avater02.jpg';
// import avt3 from 'src/Fogoimages/Avater03.png';

// const testimonials = [
//   {
//     name: 'James M',
//     content:
//       "Understanding my AI-vantage score helped me pivot my skills strategically. I got promoted last month.",
//     rating: 5,
//     icon: avt1,
//     company: "Business Analyst",
//   },
//   {
//     name: 'Aisha K',
//     content:
//       "Great for seeing beyond technical skills. Helped me understand how to position myself as an AI translator between tech and business teams. Game-changing for my career growth.",
//     rating: 5,
//     icon: avt2,
//     company: "Lead Data Scientist",
//   },
//   {
//     name: 'Jennifer L',
//     content:
//       "The AI-vantage Score was eye-opening. Instead of competing with AI, I'm now using it to enhance my creative process. Game changer.",
//     rating: 5,
//     icon: avt3,
//     company: "Product Designer",
//   }
// ];

// function StarRating({ count = 5 }) {
//   return (
//     <Typography variant="body2" sx={{ color: 'gold' }}>
//       {'★'.repeat(count)}{'☆'.repeat(5 - count)}
//     </Typography>
//   );
// }
// StarRating.propTypes = {
//   count: PropTypes.number,
// };

// function TestimonialCard({ testimonial, isHighlighted }) {
//   return (
//     <Card
//       sx={{
//         width: 437.67,
//         height: 510,
//         mt: 3,
//         bgcolor: isHighlighted ? '#fff' : '#4F9CF9',
//         color: isHighlighted ? '#000' : '#fff',
//         boxShadow: isHighlighted ? 6 : 3,
//         borderRadius: 1.25,
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <CardContent
//         sx={{
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           p: 5,
//           gap: 3,
//         }}
//       >
//         <Avatar src={testimonial.icon} sx={{ width: 70, height: 70 }} />

//         <Typography
//           variant="body2"
//           sx={{
//             textAlign: 'left',
//             fontFamily: 'Inter, sans-serif',
//             fontWeight: 400,
//             fontSize: 18,
//             lineHeight: '30px',
//             letterSpacing: '-0.02em',
//             color: 'text.primary',
//           }}
//         >
//           “{testimonial.content}”
//         </Typography>

//         {/* Spacer pushes footer down */}
//         <Box sx={{ flexGrow: 1 }} />

//         {/* Footer: name/company on left, rating on right */}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             width: '100%',
//             mt: 'auto',
//           }}
//         >
//           <Typography
//             variant="body1"
//             sx={{
//               fontFamily: 'Inter, sans-serif',
//               fontWeight: 400,
//               fontSize: 18,
//               lineHeight: '30px',
//               letterSpacing: '-0.02em',
//               textAlign: 'left',
//             }}
//           >
//             {testimonial.name}
//             <br />
//             {testimonial.company}
//           </Typography>

//           <StarRating count={testimonial.rating} />
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }
// TestimonialCard.propTypes = {
//   testimonial: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     rating: PropTypes.number.isRequired,
//     icon: PropTypes.string.isRequired,
//     company: PropTypes.string.isRequired,
//   }).isRequired,
//   isHighlighted: PropTypes.bool,
// };

// export default function TestimonialCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handlePrev = () =>
//     setCurrentIndex(i => (i === 0 ? testimonials.length - 1 : i - 1));
//   const handleNext = () =>
//     setCurrentIndex(i => (i === testimonials.length - 1 ? 0 : i + 1));
//   const handleDotClick = (idx) => setCurrentIndex(idx);

//   const itemsToShow = isMobile
//     ? [testimonials[currentIndex]]
//     : [
//       testimonials[(currentIndex + testimonials.length - 1) % testimonials.length],
//       testimonials[currentIndex],
//       testimonials[(currentIndex + 1) % testimonials.length],
//     ];

//   return (
//     <Box py={6} textAlign="center">
//       <Typography
//         component="h2"
//         sx={{
//           fontFamily: 'Inter, sans-serif',
//           fontWeight: 700,
//           fontSize: '36px',
//           lineHeight: 1,
//           letterSpacing: '-2%',
//           color: '#212529',
//         }}
//       >
//         Where Are They Now?
//       </Typography>
//       <Box component='div' sx={{ position: 'relative' }}>
//         <Typography
//           component="h1"
//           sx={{
//             fontFamily: 'Inter, sans-serif',
//             fontWeight: 700,
//             fontSize: '72px',
//             lineHeight: 1,
//             letterSpacing: '-2%',
//             color: '#212529',
//           }}
//         >
//           Real People, Real Progress
//         </Typography>
//         <img style={{
//           position: 'absolute',
//           width: '254.83px',
//           height:"44.53px",
//           top:'50px',
//           bottom: '10px',
//           right: '180px',
//           zIndex: -10
//         }}
//           src='/assets/images/impact.svg' alt='impact' />
//       </Box>
//       <Box
//         display="flex"
//         justifyContent="center"
//         gap={3}
//         mt={4}
//         flexWrap={isMobile ? 'wrap' : 'nowrap'}
//       >
//         {itemsToShow.map((t, idx) => (
//           <TestimonialCard
//             key={idx}
//             testimonial={t}
//             isHighlighted={!isMobile && idx === 1}
//           />
//         ))}
//       </Box>

//       {/* Dot Navigation */}
//       <Box mt={4} display="flex" justifyContent="center" gap={1}>
//         {testimonials.map((_, idx) => (
//           <Box
//             key={idx}
//             onClick={() => handleDotClick(idx)}
//             sx={{
//               width: 12,
//               height: 12,
//               borderRadius: '50%',
//               backgroundColor: idx === currentIndex ? '#4F9CF9' : '#1E3A8A',
//               cursor: 'pointer',
//               transition: 'background-color 0.3s',
//             }}
//           />
//         ))}
//       </Box>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


// Avatar imports
import avt1 from 'src/Fogoimages/Avater01.png';
import avt2 from 'src/Fogoimages/Avater02.jpg';
import avt3 from 'src/Fogoimages/Avater03.png';

const testimonials = [
  {
    name: 'James M',
    content:
      'Understanding my AI-vantage score helped me pivot my skills strategically. I got promoted last month.',
    rating: 5,
    icon: avt1,
    company: 'Business Analyst',
  },
  {
    name: 'Aisha K',
    content:
      'Great for seeing beyond technical skills. Helped me understand how to position myself as an AI translator between tech and business teams. Game-changing for my career growth.',
    rating: 5,
    icon: avt2,
    company: 'Lead Data Scientist',
  },
  {
    name: 'Jennifer L',
    content:
      "The AI-vantage Score was eye-opening. Instead of competing with AI, I'm now using it to enhance my creative process. Game changer.",
    rating: 5,
    icon: avt3,
    company: 'Product Designer',
  },
];

function StarRating({ count = 5 }) {
  return (
    <Typography variant="body2" sx={{ color: 'gold' }}>
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </Typography>
  );
}
StarRating.propTypes = {
  count: PropTypes.number,
};

function TestimonialCard({ testimonial, isHighlighted }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        width: { xs: '90%', sm: 300, md: 400 },
        height: { xs: 'auto', sm: 500 },
        bgcolor: isHighlighted ? '#fff' : '#4F9CF9',
        color: isHighlighted ? '#000' : '#fff',
        boxShadow: isHighlighted ? 6 : 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        transition: 'all 0.3s',
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 3, sm: 5 },
          gap: 3,
        }}
      >
        <Avatar src={testimonial.icon} sx={{ width: 70, height: 70 }} />

        <Typography
          variant="body2"
          sx={{
            textAlign: 'left',
            fontSize: { xs: 16, sm: 18 },
            lineHeight: '28px',
            color: 'text.primary',
          }}
        >
          “{testimonial.content}”
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              fontSize: { xs: 16, sm: 18 },
              lineHeight: '28px',
              textAlign: 'left',
            }}
          >
            {testimonial.name}
            <br />
            {testimonial.company}
          </Typography>
          <StarRating count={testimonial.rating} />
        </Box>
      </CardContent>
    </Card>
  );
}
TestimonialCard.propTypes = {
  testimonial: PropTypes.object.isRequired,
  isHighlighted: PropTypes.bool,
};

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePrev = () => setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const handleNext = () => setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const handleDotClick = (idx) => setCurrentIndex(idx);

  const itemsToShow = isMobile
    ? [testimonials[currentIndex]]
    : [
        testimonials[(currentIndex + testimonials.length - 1) % testimonials.length],
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
      ];

  return (
    <Box py={6} textAlign="center">
      <Typography
        component="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '24px', sm: '32px', md: '36px' },
          color: '#212529',
        }}
      >
        Where Are They Now?
      </Typography>

      <Box sx={{ position: 'relative', mt: 2 }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '40px', sm: '60px', md: '72px' },
            color: '#212529',
          }}
        >
          Real People, Real Progress
        </Typography>
        <Box
          component="img"
          src="/assets/images/impact.svg"
          alt="impact"
          sx={{
            position: 'absolute',
            width: { xs: 150, sm: 200, md: 250 },
            top:{xs: '108px', sm: '80px', lg: 65 }, 
            right: { xs: 70, sm: 60, md: 180 },
            zIndex: -1,
          }}
        />
      </Box>

      {/* Carousel with Nav Buttons (for mobile) */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={3}
        mt={4}
        flexWrap={isMobile ? 'wrap' : 'nowrap'}
      >
        {itemsToShow.map((t, idx) => (
          <TestimonialCard key={idx} testimonial={t} isHighlighted={!isMobile && idx === 1} />
        ))}
      </Box>

      {/* Dot Navigation */}
      <Box mt={4} display="flex" justifyContent="center" gap={1}>
        {testimonials.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => handleDotClick(idx)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: idx === currentIndex ? '#4F9CF9' : '#1E3A8A',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
