import { useScroll } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';


// components
import ScrollProgress from 'src/components/scroll-progress';
import HomeHero from '../home-hero';
import FeatureSection from '../FeatureSection';
import CareerToolkitHero from '../CareerToolkitHero';
import TestimonialSection from '../TestimonialSection';
import CareerCompass from '../CareerCompass';
import SmartJobFeed from '../SmartJobFeed';
import JobMatchBooster from '../JobMatchBooster';
import JobBoard from '../JobBoard';
import WorkingProcessSection1 from '../WorkingProcessSection1';





// import HomeMinimal from '../home-minimal';
// import HomePricing from '../home-pricing';
// import HomeDarkMode from '../home-dark-mode';
// import HomeLookingFor from '../home-looking-for';
// import HomeForDesigner from '../home-for-designer';
// import HomeColorPresets from '../home-color-presets';
// import HomeAdvertisement from '../home-advertisement';
// import HomeCleanInterfaces from '../home-clean-interfaces';
// import HomeHugePackElements from '../home-hugepack-elements';



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

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />


      <HomeHero />
      <FeatureSection />
      <TestimonialSection />
      <CareerToolkitHero />
      <CareerCompass /> 
      <SmartJobFeed />
      <JobMatchBooster />
      <WorkingProcessSection1/>
      <JobBoard />
      
     



      {/* <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal />

        <HomeHugePackElements />

        <Box sx={{ position: 'relative' }}>
          <StyledPolygon />
          <HomeForDesigner />
          <StyledPolygon anchor="bottom" />
        </Box>

        <HomeDarkMode />

        <HomeColorPresets />

        <HomeCleanInterfaces />

        <HomePricing />

        <HomeLookingFor />

        <HomeAdvertisement />
      </Box> */}
    </>
  );
}
