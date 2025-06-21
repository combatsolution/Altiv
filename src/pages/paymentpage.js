import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { PaymentSuccessView } from 'src/sections/payment/view';

export default function paymentpage()
{
    return(
        <>
            <Helmet>
                <title> Payment Success Page</title>
            </Helmet>
            <SubHeader subtitle="Payment Success" />
            <PaymentSuccessView />
        </>
    )
}