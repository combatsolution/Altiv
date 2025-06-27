import {Helmet} from 'react-helmet-async';
import SubHeader from 'src/components/subheader/subheader';
import JobBoosterPage from 'src/sections/job-booster/JobBoosterPage'

export default function jobboost()
{
    return(
        <>
          <Helmet>
           <title> JobBoosterPage</title>
          </Helmet>
          <SubHeader subtitle='Jobbooster' />
          <JobBoosterPage/>
        </>
    ) 
}
