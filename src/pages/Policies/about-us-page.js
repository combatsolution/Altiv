import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { AboutUsView } from "src/sections/Policies/View";


export default function AboutUsPage(){
    return(
        <>
            <Helmet>
                <title>About us</title>
            </Helmet>
            <SubHeader subtitle="About us" />
            < AboutUsView/>
           
        </>
    )
}