

import AIReadinessDashboard from "../AIReadinessDashboard";
import TopTasksAutomationExposure from '../TopTasksAutomationExposure';
import SkillErosionProjection from '../SkillErosionProjection';
import AverageFOBOScores from '../AverageFOBOScores';
import DonutCardList from '../DonutCardList';
import ProductManagementChart from '../ProductManagementChart';
import StrategicInsights from '../StrategicInsights';
import FOBOByRoleLevel from '../FOBOByRoleLevel';
import CompanyComprehensivePlan from '../CompanyComprehensivePlan'

export default function AireadlinessView() {
  return (
    <>
      <AIReadinessDashboard />
      <DonutCardList />
      <StrategicInsights />
       <TopTasksAutomationExposure />
       <FOBOByRoleLevel />
       <AverageFOBOScores/>
       <SkillErosionProjection />   
      <CompanyComprehensivePlan />
      <ProductManagementChart />


    </>

  );
}
