import { useScroll } from 'framer-motion';
// components
import ScrollProgress from 'src/components/scroll-progress';
import PaymentSuccessPage from '../PaymentSuccessPage';


// ----------------------------------------------------------------------

export default function PaymentSuccessView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />    
      <PaymentSuccessPage/>
    </>
  );

 
}