import { useRef, useState } from "react";
import { Box } from "@mui/material";
import html2canvas from "html2canvas";
import { useAuthContext } from "src/auth/hooks";
import { jsPDF } from "jspdf";
import PropTypes from "prop-types";
import AIReadinessDashboard from "../AIReadinessDashboard";
import ResponsiveNavbar from "../ResponsiveNavbar";
import ExecutiveSummary from "../executivesummary";
import CurrentStateAnalysis from "../CurrentStateAnalysis";
import StrategicObjectives from "../strategicobjectives";
import QuickStartGuide from "../quickstartguide";
import ToolStack from "../toolstack";
import CapabilityBuilding from "../capabilitybuilding";
import SkillErosionProjection from "../skillerosionprojection";
import DetailNotes from "../detailnote";
import TopTasksExposureAnalysis from "../taskautomation";
import AiRoadmap from "../transformationroadmap";

export default function AireadlinessView({ data }) {
  const [showAllSections, setShowAllSections] = useState(false);
  const pdfRef = useRef(null);
  const { user } = useAuthContext();
const isProUser = user?.planType === "pro"; // adjust according to your auth logic

  // ✅ Centralized Export PDF function
  const handleExportPDF = async () => {
    try {
      setShowAllSections(true);
      await new Promise((resolve) => setTimeout(resolve, 800)); // allow hidden sections to render

      const element = pdfRef.current;
      if (!element) {
        alert("PDF content not found!");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollY: -window.scrollY,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save("AI_Readiness_Report.pdf");
    } catch (error) {
      console.error("❌ Error exporting PDF:", error);
      alert("Failed to export PDF. Check console for details.");
    } finally {
      setShowAllSections(false);
    }
  };

  return (
    <>
      {/* ✅ Pass handler to Dashboard */}
      <AIReadinessDashboard data={data} onExportPDF={handleExportPDF} />
{/* 
      Visible UI Section
      <Box id="report-content" sx={{ p: 3 }}>
        <ResponsiveNavbar data={data} />
      </Box> */}


      <Box id="report-content" sx={{ p: 3 }}>
  <Box sx={{ position: "relative" }}>
    <ResponsiveNavbar data={data} />

    {!isProUser && (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(21,101,192,0.2)", // soft blue overlay
          zIndex: 10,
        }}
      />
    )}
  </Box>
</Box>

      {/* Hidden PDF container with all sections */}
      {showAllSections && (
        <Box
          ref={pdfRef}
          sx={{
            position: "absolute",
            top: 0,
            left: "-9999px", // off-screen rendering
            width: "1200px",
            height: "800px",
            background: "white",
          }}
        >
          <ExecutiveSummary data={data} />
          <CurrentStateAnalysis data={data} />
          <StrategicObjectives data={data} />
          <CapabilityBuilding data={data} />
          <ToolStack data={data} />
          <QuickStartGuide data={data} />
          <SkillErosionProjection data={data} />
          <TopTasksExposureAnalysis data={data} />
          <AiRoadmap data={data} />
          <DetailNotes data={data} />
        </Box>
      )}
    </>
  );
}


AireadlinessView.propTypes={
data : PropTypes.object,
}