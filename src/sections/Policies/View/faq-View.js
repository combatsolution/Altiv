import { useScroll } from 'framer-motion';// components
import ScrollProgress from 'src/components/scroll-progress';
import FAQPage from '../FAQPage';

// ----------------------------------------------------------------------

export default function FaqView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />    
      <FAQPage/>
    </>
  );

 
}