import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import {AitrainingpolicyView} from "src/sections/Policies/View"


export default function attributionsView (){
    return(
        <>
            <Helmet>
                <title>ai-training-policy</title>
            </Helmet>
            <SubHeader subtitle="Ai-training-policy" />
            < AitrainingpolicyView/>
           
        </>
    )
}