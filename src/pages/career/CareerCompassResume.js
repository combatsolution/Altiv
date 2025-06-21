import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import CareerPathProjection from "src/sections/career/CareerCompassResume";

export default function CareerPathResumePage()
{
    return(
        <>
            <Helmet>
                <title> Career Compass</title>
            </Helmet>
            <SubHeader subtitle="Career Compass" />
            <CareerPathProjection />
        </>
    )
}