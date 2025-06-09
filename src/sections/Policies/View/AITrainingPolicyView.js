import { useScroll } from 'framer-motion';
// components
import ScrollProgress from 'src/components/scroll-progress';

import AITrainingPolicyPage from '../AITrainingPolicyPage';


// ----------------------------------------------------------------------

export default function AitrainingpolicyView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />    
      <AITrainingPolicyPage/>
    </>
  );

 
}