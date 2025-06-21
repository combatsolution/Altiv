import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import SubscriptionHistory from "src/sections/subscription/SubscriptionHistory";

export default function Subscriptionpage()
{
    return(
        <>
            <Helmet>
                <title> Subscription</title>
            </Helmet>
            <SubHeader subtitle="Subscription" />
            <SubscriptionHistory />
        </>
    )
}