import { Helmet } from 'react-helmet-async';
import { FoboView } from 'src/sections/FOBO/View';
// sections
import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>  
        <title> Altiv AI </title>
      </Helmet>

      <HomeView />
      {/* <FoboView/> */}
    </>
  );
}
