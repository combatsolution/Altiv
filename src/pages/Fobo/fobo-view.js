import { Helmet } from "react-helmet-async";
import { FoboView } from "src/sections/FOBO/View";

export default function FoboViewPage()
{
    return(
        <>
            <Helmet>
                <title>Fobo</title>
            </Helmet  >
            <FoboView />
        </>
    )
}