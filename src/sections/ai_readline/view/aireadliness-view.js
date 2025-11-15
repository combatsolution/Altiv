
// // AireadlinessView.jsx (update)
// import { useRef, useState } from "react";
// import { Box } from "@mui/material";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import PropTypes from "prop-types";
// import { useAuthContext } from "src/auth/hooks";

// import AIReadinessDashboard from "../AIReadinessDashboard";
// import ResponsiveNavbar from "../ResponsiveNavbar";
// import ExecutiveSummary from "../executivesummary";
// import CurrentStateAnalysis from "../CurrentStateAnalysis";
// import StrategicObjectives from "../strategicobjectives";
// import QuickStartGuide from "../quickstartguide";
// import ToolStack from "../toolstack";
// import CapabilityBuilding from "../capabilitybuilding";
// import SkillErosionProjection from "../skillerosionprojection";
// import DetailNotes from "../detailnote";
// import TopTasksExposureAnalysis from "../taskautomation";
// import AiRoadmap from "../transformationroadmap";

// export default function AireadlinessView({ data }) {
//   const [showAllSections, setShowAllSections] = useState(false);
//   const [exportInProgress, setExportInProgress] = useState(false);
//   const pdfRef = useRef(null);
//   const { user } = useAuthContext();
//   const isProUser = user?.planType === "pro";
// const localData = JSON.parse(localStorage.getItem("profileAnalytics") || "{}");


//   // helper: check sessionStorage for paid services
//   const hasPaidFobo = () => {
//     try {
//       const paid = JSON.parse(sessionStorage.getItem("paidServices") || "[]");
//       return Array.isArray(paid) && paid.includes("fobo-pro");
//     } catch {
//       return false;
//     }
//   };

//   // The visible overlay should be shown only if user is NOT pro and hasn't purchased fobo-pro
//   const shouldShowOverlay = !(isProUser || hasPaidFobo());

//   const handleExportPDF = async () => {
//     try {
//       setExportInProgress(true);
//       setShowAllSections(true);

//       // give children a little time to mount and (if needed) read sessionStorage
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       const element = pdfRef.current;
//       if (!element) {
//         alert("PDF content not found!");
//         return;
//       }

//       // hide overlays inside the pdfRef
//       const overlays = element.querySelectorAll("[data-overlay]");
//       overlays.forEach((el) => {
//         el.style.display = "none";
//       });

//       // scroll to top of hidden container just in case
//       window.scrollTo(0, 0);

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         allowTaint: true,
//         scrollY: 0,
//         backgroundColor: "#ffffff",
//         windowWidth: element.scrollWidth,
//         windowHeight: element.scrollHeight,
//       });

//       // restore overlay display inside pdfRef
//       overlays.forEach((el) => {
//         el.style.display = "";
//       });

//       const imgData = canvas.toDataURL("image/png");
//       // eslint-disable-next-line new-cap
//       const pdf = new jsPDF("p", "mm", "a4");

//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = pageWidth;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save("AI_Readiness_Report.pdf");
//     } catch (error) {
//       console.error("❌ PDF Export Error:", error);
//       alert("Failed to export PDF. Check console for details.");
//     } finally {
//       setShowAllSections(false);
//       setExportInProgress(false);
//     }
//   };

//   return (
//     <>
//       {/* Dashboard header + Export button */}
//       <AIReadinessDashboard data={data} onExportPDF={handleExportPDF} />
//       {/* Visible UI */}
//       <Box id="report-content" sx={{ p: 0, mx: 6 }}>
//         <Box sx={{ position: "relative" }}>
//           <ResponsiveNavbar data={data} />

//           {/* <ExecutiveSummary data={data} /> */}

//           {shouldShowOverlay && (
//             <Box
//               data-overlay
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 height: "100%",
//                 backdropFilter: "blur(8px)",
//                 backgroundColor: "rgba(255,255,255,0.7)",
//                 zIndex: 20,
//               }}
//             />
//           )}
//         </Box>
//       </Box>

//       {/* Hidden export container (for PDF) */}
//       {showAllSections &&  (
//         <Box
//           ref={pdfRef}
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: "-9999px",
//             width: "1200px",
//             background: "white",
//             overflow: "visible",
//           }}
//         >
//             {/* Include navbar and executive summary during export.
//                 pass forceShow=true to ensure content renders for the PDF */}
//             <AIReadinessDashboard data={data} /> 
//             <ExecutiveSummary data={JSON.parse(localStorage.getItem("profileAnalytics") || "{}")} />
//             <CurrentStateAnalysis  data={JSON.parse(localStorage.getItem("profileAnalytics") || "{}")} />
// <StrategicObjectives data={JSON.parse(localStorage.getItem("profileAnalytics") || "{}")} />   
//             <CapabilityBuilding data={JSON.parse(localStorage.getItem("profileAnalytics") || "{}")} />
//             <ToolStack data={JSON.parse(localStorage.getItem("profileAnalytics") || "{}")} />
//             <QuickStartGuide data={JSON.parse(localStorage.getItem("profileAnalytics") || "{}")} />
//             <SkillErosionProjection data={JSON.parse(localStorage.getItem("profileAnalytics") || "{}")} />
//             <TopTasksExposureAnalysis data={JSON.parse(localStorage.getItem("profileAnalytics") || "{}")} />
//             <AiRoadmap data={JSON.parse(localStorage.getItem("profileAnalytics") || "{}")} />


              





//             {/* <ResponsiveNavbar data={data} /> */}
//             {/* <ExecutiveSummary data={data} forceShow={true} /> */}
//             {/* c
//             <StrategicObjectives data={data} />   
//             <CapabilityBuilding data={data} />
//             <ToolStack data={data} />
//             <QuickStartGuide data={data} />
//             <SkillErosionProjection data={data} />
//             <TopTasksExposureAnalysis data={data} />
//             <AiRoadmap data={data} />
//             <DetailNotes data={data} /> */}
//           </Box>
//       )}
//     </>
//   );
// }

// AireadlinessView.propTypes = {
//   data: PropTypes.object,
// };

// AireadlinessView.jsx (update)
import { useRef, useState } from "react";
import { Box } from "@mui/material";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PropTypes from "prop-types";
import { useAuthContext } from "src/auth/hooks";

import AIReadinessDashboard from "../AIReadinessDashboard";
import ResponsiveNavbar from "../ResponsiveNavbar";


export default function Aireadliness({ data }) {
  const [showAllSections, setShowAllSections] = useState(false);
  const [exportInProgress, setExportInProgress] = useState(false);
  const pdfRef = useRef(null);
  const { user } = useAuthContext();
  const isProUser = user?.planType === "pro";

  // helper: check sessionStorage for paid services
  const hasPaidFobo = () => {
    try {
      const paid = JSON.parse(sessionStorage.getItem("paidServices") || "[]");
      return Array.isArray(paid) && paid.includes("fobo-pro");
    } catch {
      return false;
    }
  };

  // The visible overlay should be shown only if user is NOT pro and hasn't purchased fobo-pro
  const shouldShowOverlay = !(isProUser || hasPaidFobo());

  const handleExportPDF = async () => {
    try {
      setExportInProgress(true);
      setShowAllSections(true);

      // give children a little time to mount and (if needed) read sessionStorage
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const element = pdfRef.current;
      if (!element) {
        alert("PDF content not found!");
        return;
      }

      // hide overlays inside the pdfRef
      const overlays = element.querySelectorAll("[data-overlay]");
      overlays.forEach((el) => {
        el.style.display = "none";
      });

      // scroll to top of hidden container just in case
      window.scrollTo(0, 0);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollY: 0,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      // restore overlay display inside pdfRef
      overlays.forEach((el) => {
        el.style.display = "";
      });

      const imgData = canvas.toDataURL("image/png");
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("AI_Readiness_Report.pdf");
    } catch (error) {
      console.error("❌ PDF Export Error:", error);
      alert("Failed to export PDF. Check console for details.");
    } finally {
      setShowAllSections(false);
      setExportInProgress(false);
    }
  };

  return (
    <>
      {/* Dashboard header + Export button */}
      {/* <AIReadinessDashboard data={data} onExportPDF={handleExportPDF} /> */}
      {/* Visible UI */}
      <Box id="report-content" sx={{ p: 0, mx: 0 }}>
        <Box sx={{ position: "relative" }}>
          <ResponsiveNavbar data={data} />

          {/* <ExecutiveSummary data={data} /> */}

          {shouldShowOverlay && (
            <Box
              data-overlay
              sx={{
                // position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "100%",
                backdropFilter: "blur(8px)",
                // backgroundColor: "rgba(255,255,255,0.7)",
                zIndex: 20,
              }}
            />
          )}
        </Box>
      </Box>

      {/* Hidden export container (for PDF) */}
      {showAllSections &&  (
        <Box
          ref={pdfRef}
          sx={{
            position: "absolute",
            top: 0,
            left: "-9999px",
            width: "1200px",
            background: "white",
            overflow: "visible",
          }}
        >
            {/* Include navbar and executive summary during export.
                pass forceShow=true to ensure content renders for the PDF */}
            <AIReadinessDashboard data={data} /> 
            <ResponsiveNavbar data={data} />
            {/* <ExecutiveSummary data={data} forceShow={true} /> */}
            {/* <CurrentStateAnalysis data={data} />
            <StrategicObjectives data={data} />   
            <CapabilityBuilding data={data} />
            <ToolStack data={data} />
            <QuickStartGuide data={data} />
            <SkillErosionProjection data={data} />
            <TopTasksExposureAnalysis data={data} />
            <AiRoadmap data={data} />
            <DetailNotes data={data} /> */}
          </Box>
      )}
    </>
  );
}

Aireadliness.propTypes = {
  data: PropTypes.object,
};


