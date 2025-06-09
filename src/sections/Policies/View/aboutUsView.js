import { useScroll } from 'framer-motion';
// components
import ScrollProgress from 'src/components/scroll-progress';
import AboutUsPage from '../AboutUsPage';


// ----------------------------------------------------------------------

export default function AboutUsView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />    
      <AboutUsPage/>
    </>
  );

 
}