import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { ContactUsView } from "src/sections/Policies/View";


export default function ContactUsPage(){
    return(
        <>
            <Helmet>
                <title>Contact us</title>
            </Helmet>
            <SubHeader subtitle="Contact us" />
            < ContactUsView/>
           
        </>
    )
}