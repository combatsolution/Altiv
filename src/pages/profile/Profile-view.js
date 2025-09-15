import { Helmet } from "react-helmet-async";
import SubHeader from "src/components/subheader/subheader";
import { ProfileView } from "src/sections/profile/View";


export default function ProfileViewPage(){
      const userStartedWith = sessionStorage.getItem("userStartedWith");
    return(
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <SubHeader subtitle="My Profile"
               showUploadResume={userStartedWith} // true or false 
               />
            <ProfileView />
           
        </>
    )
}