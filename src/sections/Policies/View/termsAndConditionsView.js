import { useScroll } from 'framer-motion';
// components
import ScrollProgress from 'src/components/scroll-progress';
import TermsAndConditionsPage from '../TermsAndConditionsPage'


// ----------------------------------------------------------------------

export default function TermsAndConditionsView() {
  const { scrollYProgress } = useScroll();

  return (
    <> 
      <ScrollProgress scrollYProgress={scrollYProgress} />    
      <TermsAndConditionsPage/>
    </>
  );

 
}