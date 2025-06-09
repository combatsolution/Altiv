import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { PolicyView } from "src/sections/Policies/View";


export default function PrivacyPolicyPage(){
    return(
        <>
            <Helmet>
                <title>privacy-policy</title>
            </Helmet>
            <SubHeader subtitle="Privacy-Policies" />
            < PolicyView/>
           
        </>
    )
}