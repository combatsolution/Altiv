

import CompanySummary from "../CompanySummarySection";
import TopTasksTableView from "../TopTasksTable";
import StrategicInsights from "../StrategicInsights";
import FoboCharts from "../FoboCharts";
import SkillErosionProjection from "../SkillErosionProjection";
import ReadinessTable from '../ReadinessTable';

export default function CompanySummaryView() {
  return (
    <>
      <CompanySummary />
      <StrategicInsights />
      <TopTasksTableView />
      <FoboCharts />
      <SkillErosionProjection />
      <ReadinessTable />
    </>

  );
}
