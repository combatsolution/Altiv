import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import CareerCompassTitle from "src/sections/career/CareerCompassTitle";

export default function CareerPathResumePage()
{
    return(
        <>
            <Helmet>
                <title> Career Compass Title</title>
            </Helmet>
            <SubHeader subtitle="Career Compass" />
            <CareerCompassTitle />
        </>
    )
}