import { useScroll } from 'framer-motion';
// components
import ScrollProgress from 'src/components/scroll-progress';

import AttributionsPage from '../AttributionsPage';


// ----------------------------------------------------------------------

export default function AttributionsView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />    
      <AttributionsPage/>
    </>
  );

 
}