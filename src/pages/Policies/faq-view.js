import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { FaqView } from "src/sections/Policies/View"


export default function FaqPage(){
    return(
        <>  
            <Helmet>
                <title>faq page</title>
            </Helmet>
            <SubHeader subtitle="FAQ View" />
            <FaqView/>
           
        </>
    )
}