import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import JobDetailPage from "src/sections/job-details/JobDetailsPage";


export default function JobDetailsPage()
{
const userStartedWith = sessionStorage.getItem("userStartedWith");
    return(
        <>
            <Helmet>
                <title> Job Details</title>
            </Helmet>
            <SubHeader subtitle="Job Details"   showUploadResume={userStartedWith}/>
            <JobDetailPage />
        </>
    )
}