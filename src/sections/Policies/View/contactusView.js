import { useScroll } from 'framer-motion';
// components
import ScrollProgress from 'src/components/scroll-progress';
import ContactUsPage from '../ContactUsPage';


// ----------------------------------------------------------------------

export default function ContactUsView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />    
      <ContactUsPage/>
    </>
  );

 
}