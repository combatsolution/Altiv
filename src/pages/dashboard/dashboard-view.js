import { Helmet } from "react-helmet-async";
import { DashboardView } from "src/sections/Dashboard/View";

export default function DashboardViewPage()
{
    return(
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <DashboardView />
        </>
    )
}