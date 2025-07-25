import { useScroll } from 'framer-motion';
// components
import ScrollProgress from 'src/components/scroll-progress';
import PrivacyPolicy from '../PrivacyPolicy'


// ----------------------------------------------------------------------

export default function PolicyView() {
  const { scrollYProgress } = useScroll();

  return (
    <> 
      <ScrollProgress scrollYProgress={scrollYProgress} />    
      <PrivacyPolicy/>
    </>
  );

 
}