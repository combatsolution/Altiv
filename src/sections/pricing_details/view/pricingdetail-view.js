
import FAQSection from "../faqquestion";
import ListedInfo from "../listedinfo";
import ListedJourney from "../listedjourney";
import AIMarketingBuilder from "../AIMarketingBuilder";
import Program from "../programs";
import ToolsMastery from "../ToolsMastery";
import AIReadinessDashboard from "../AIReadinessDashboard";


export default function AboutView() {
  return (
    <>
    <AIReadinessDashboard/>
   <AIMarketingBuilder/>
   <Program/>
    <ListedInfo/>
     <FAQSection/>
    <ToolsMastery/>
     <ListedJourney/>


    </>
  );
}
