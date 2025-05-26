import { Helmet } from "react-helmet-async";
    import SubHeader from "src/components/subheader/subheader";
import { ProfileView } from "src/sections/profile/View";

export default function ProileViewPage(){
    return(
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <SubHeader subtitle="My Profile" />
            <ProfileView />
        </>
    )
}