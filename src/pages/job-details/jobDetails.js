import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import JobDetailPage from "src/sections/job-details/JobDetailsPage";

export default function JobDetailsPage(){
    return(
        <>
            <Helmet>
                <title> Job Details</title>
            </Helmet>
            <SubHeader subtitle="Job Details" />
            <JobDetailPage />
        </>
    )
}