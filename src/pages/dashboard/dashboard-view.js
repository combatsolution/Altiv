import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { DashboardView } from "src/sections/Dashboard/View";

export default function DashboardViewPage()
{ 
const userStartedWith = sessionStorage.setItem("subtitle","FOBO",

);

    return(
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
             {/* <SubHeader subtitle="FOBO" 
             showUploadResume={userStartedWith}
             />
            */}
            <DashboardView />
        </>
    )
}