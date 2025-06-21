import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import SubscriptionSuccessPage from "src/sections/subscription/SubscriptionSuccessPage";

export default function Subscriptionpage()
{
    return(
        <>
            <Helmet>
                <title> Subscription</title>
            </Helmet>
            <SubHeader subtitle="Subscription" />
            <SubscriptionSuccessPage />
        </>
    )
}