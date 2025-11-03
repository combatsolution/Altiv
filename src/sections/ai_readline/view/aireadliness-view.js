


import { useRef, useState } from "react";
import { Box } from "@mui/material";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import AIReadinessDashboard from "../AIReadinessDashboard";
import ResponsiveNavbar from "../ResponsiveNavbar";
import ExecutiveSummary from "../executivesummary";
import CurrentStateAnalysis from "../CurrentStateAnalysis"
import StrategicObjectives from "../strategicobjectives";
import QuickStartGuide from "../quickstartguide";
import ToolStack from "../toolstack";
import CapabilityBuilding from "../capabilitybuilding";
import SkillErosionProjection from "../skillerosionprojection";
import DetailNotes from "../detailnote";
import TopTasksExposureAnalysis from "../taskautomation";
import AiRoadmap from "../transformationroadmap";

export default function AireadlinessView() {
  const [showAllSections, setShowAllSections] = useState(false);
  const pdfRef = useRef(null);

  const handleExportPDF = async () => {
    // Show all sections off-screen
    setShowAllSections(true);

    // Wait for DOM to render
    await new Promise((resolve) => setTimeout(resolve, 500));

    const input = pdfRef.current;
    if (!input) {
      alert("Report content not found!");
      setShowAllSections(false);
      return;
    }

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);

    let heightLeft = pdfHeight - pdf.internal.pageSize.getHeight();
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save("AI_Readiness_Report.pdf");

    // Hide off-screen sections
    setShowAllSections(false);
  };

  return (
    <>
      <AIReadinessDashboard onExportPDF={handleExportPDF} />

      {/* Visible UI Section */}
      <Box id="report-content" sx={{ p: 3 }}>
        <ResponsiveNavbar />
      </Box>

      {/* Hidden PDF container with all sections */}
      {showAllSections && (
        <Box
          ref={pdfRef}
          sx={{
            position: "absolute",
            top: 0,
            left: "-9999px", // render off-screen
            width: "1200px",
            background: "white",
          }}
        >
          <ExecutiveSummary />
          <CurrentStateAnalysis />
          <StrategicObjectives />
          <CapabilityBuilding />
          <ToolStack />
          <QuickStartGuide />
          <SkillErosionProjection />
          <TopTasksExposureAnalysis />
          <AiRoadmap />
          <DetailNotes />
        </Box>
      )}
    </>
  );
}

