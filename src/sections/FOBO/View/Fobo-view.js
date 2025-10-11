import { useScroll } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';


// components
import ScrollProgress from 'src/components/scroll-progress';
//
import FoboHeroPage from '../FoboHeroPage';
import FoboDefinepage from '../FoboDefinepage';
import FoboImpactPage from '../FoboImpactPage';
import WorkingProcessSection from '../WorkingProcessSection';
import TestimonialCarousel from '../TestimonialCarousel'
import FoboHeroSection from '../FoboHeroSection'
import Datasecuritypage from '../Datasecuritypage'

// import Design from '../Design'
// import CareerCompass from '../CareerCompass'
// import ComingSoon from '../ComingSoon'; 
// import Dashboard from '../Dashboard'

// ----------------------------------------------------------------------

const StyledPolygon = styled('div')(({ anchor = 'top', theme }) => ({
  left: 0,
  zIndex: 9,
  height: 80,
  width: '100%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  backgroundColor: theme.palette.background.default,
  display: 'block',
  lineHeight: 0,
  ...(anchor === 'top' && {
    top: -1,
    transform: 'scale(-1, -1)',
  }),
  ...(anchor === 'bottom' && {
    bottom: -1,
    backgroundColor: theme.palette.grey[900],
  }),
}));

// ----------------------------------------------------------------------

export default function FoboView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      
      
      <FoboHeroPage />
      <FoboDefinepage/>
      <FoboImpactPage/>
      <WorkingProcessSection/>
      <TestimonialCarousel/>
      <FoboHeroSection/>
      <Datasecuritypage/>
      {/* <Design/> */}
      {/* <CareerCompass/> */}
      {/* <ComingSoon/> */}
    

    </>
  );
}
 