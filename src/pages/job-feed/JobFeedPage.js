import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import JobFeedPage from "src/sections/job-feed/JobFeedPage";

export default function Jobfeedpage()
{
    return(
        <>
            <Helmet>
                <title> Job Feed Page</title>
            </Helmet>
            <SubHeader subtitle="Job Feed page" />
            <JobFeedPage />
        </>
    )
}