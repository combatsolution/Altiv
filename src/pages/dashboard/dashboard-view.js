import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { DashboardView } from "src/sections/Dashboard/View";

export default function DashboardViewPage()
{
    return(
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
             <SubHeader subtitle="FOBO" />
           
            <DashboardView />
        </>
    )
}