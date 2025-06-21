import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { TermsAndConditionsView } from "src/sections/Policies/View";


export default function TermsAndConditionsPage(){
    return(
        <>
            <Helmet>
                <title>Terms & Conditions</title>
            </Helmet>
            <SubHeader subtitle="Terms & Conditions " />
            < TermsAndConditionsView/>
           
        </>
    )
}