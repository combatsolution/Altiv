import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import CareerPathProjection from "src/sections/career/CareerCompassResume";

export default function CareerPathResumePage() {
  const userStartedWith = sessionStorage.getItem("userStartedWith");

  return (
    <>
      <Helmet>
        <title>Career Compass</title>
      </Helmet>

      <SubHeader
        subtitle="Career Compass"
        showUploadResume={userStartedWith} // true or false
      />

      <CareerPathProjection />
    </>
  );
}