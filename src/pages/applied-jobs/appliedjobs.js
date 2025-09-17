import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import Appliedjobs from "src/sections/applied-jobs/appliedjobs";


export default function apply()
{ 
    // const userStartedWith = sessionStorage.getItem("userStartedWith");
    return(
        <>
            <Helmet>
                <title> Applied Jobs</title>
            </Helmet>
            <SubHeader subtitle="Applied Jobs"    />
            < Appliedjobs/>
        </> 
    )
}   

// showUploadResume={userStartedWith} 