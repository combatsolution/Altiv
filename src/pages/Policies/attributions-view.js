import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { AttributionsView } from "src/sections/Policies/View";


export default function attributionsView (){
    return(
        <>
            <Helmet>
                <title>attributions</title>
            </Helmet>
            <SubHeader subtitle="Attributions" />
            < AttributionsView/>
           
        </>
    )
}