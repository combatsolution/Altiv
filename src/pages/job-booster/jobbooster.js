import {Helmet} from 'react-helmet-async';
import SubHeader from 'src/components/subheader/subheader';
import JobBoosterPage from 'src/sections/job-booster/JobBoosterPage'

export default function jobboost()
{   const userStartedWith = sessionStorage.getItem("userStartedWith");
    return(
        <>
          <Helmet>
           <title> JobBoosterPage</title>
          </Helmet>
          <SubHeader subtitle='Job Booster'  showUploadResume={userStartedWith} />
          <JobBoosterPage/>
        </>
    ) 
}
