import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import SavedJobsPage from "src/sections/savejobs/savejobspage";

export default function jobs()
{ 
    // const userStartedWith = sessionStorage.getItem("userStartedWith");

    return(
        <>
            <Helmet>
                <title> Save Jobs</title>
            </Helmet>
            <SubHeader subtitle="Saved Jobs"    />
            < SavedJobsPage/>
        </>
    )
}   