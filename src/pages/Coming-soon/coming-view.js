import { Helmet } from "react-helmet-async";
import { ComingView } from "src/sections/coming-soon/view";

export default function ComingViewPage(){
    return(
        <>
            <Helmet>
                <title>Comingsoon</title>
            </Helmet>
           
            <ComingView />
        </>
    )
}   