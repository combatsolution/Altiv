import { useState, useEffect, useRef } from "react";
import {
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Container,
  Typography
} from "@mui/material";
import { useAuthContext } from "src/auth/hooks";
import PropTypes from "prop-types";
import axiosInstance from "src/utils/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AIReadinessDashboard from "./AIReadinessDashboard";
import StrategicObjectives from "./strategicobjectives";
import CapabilityBuilding from "./capabilitybuilding";
import ToolStack from "./toolstack";
import QuickStartGuide from "./quickstartguide";
import TopTasksExposureAnalysis from "./taskautomation";
import SkillErosionProjection from "./skillerosionprojection";
import DetailNotes from "./detailnote";
import CurrentStateAnalysis from "./CurrentStateAnalysis";
import TransformationRoadmap from "./transformationroadmap";
import ExecutiveSummary from "./executivesummary";


const sections = [
  { label: "Executive Summary", component: ExecutiveSummary },
  { label: "Current State", component: CurrentStateAnalysis },
  { label: "Strategic Objectives", component: StrategicObjectives },
  { label: "Transformation Roadmap", component: TransformationRoadmap },
  { label: "Capability Building", component: CapabilityBuilding },
  { label: "Tool Stack", component: ToolStack },
  { label: "Quick Start", component: QuickStartGuide },
  { label: "Skill Erosion", component: SkillErosionProjection },
  { label: "Task Automation", component: TopTasksExposureAnalysis },
  { label: "Detailed Notes", component: DetailNotes },
];

// ---------------------------------------------

export default function ResponsiveNavbar() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profileAnalytics, setProfileAnalytics] = useState(null);
  const [exportInProgress, setExportInProgress] = useState(false);
  const [serviceUnlocked, setServiceUnlocked] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuthContext();
  const resumeId = user?.resumes?.at(-1)?.id;
  const isProUser = user?.subscription?.isPro ?? false;
  const pdfRef = useRef(null);
  console.log("AutoTable Loaded:", typeof jsPDF.API.autoTable);
  // ---------------------------------------------
  // ✅ Fetch Subscription
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await axiosInstance.get(
          "/subscriptions/service-subscriptions-by-user/fobo-pro"
        );

        setServiceUnlocked(res.data?.success === true);  // ALWAYS boolean TRUE/FALSE
      } catch (err) {
        setServiceUnlocked(false);
      }
    };

    fetchSubscription();
  }, [user]);

 useEffect(() => {
      const updateServiceUnlocked = () => {
        const rawValue = sessionStorage.getItem("foboProUnlocked");
        const foboProUnlocked = rawValue === "true";

        console.log("🔵 Session Storage Value (raw):", rawValue);
        console.log("🟢 Converted Boolean:", foboProUnlocked);

        // Update UI state
        setServiceUnlocked(foboProUnlocked);

        // ❗ Remove sessionStorage AFTER using it
        if (rawValue !== null) {
          sessionStorage.removeItem("foboProUnlocked");
          console.log("🗑️ Removed foboProUnlocked from sessionStorage");
        }
      };

      updateServiceUnlocked();

      // Custom event listener for subscription updates
      window.addEventListener("subscription-updated", updateServiceUnlocked);

      return () => {
        window.removeEventListener("subscription-updated", updateServiceUnlocked);
      };
    }, [resumeId]);

  // ---------------------------------------------
  // ✅ Fetch Profile Analytics Data
  // useEffect(() => {
  //   const payload = {
  //     resumeId,
  //     viewDetails: true,
  //     smartInsights: true,
  //     isFoboPro: true,
  //     isComprehensiveMode: true,
  //   };

  //   const fetchProfileAnalytics = async () => {
  //     try {
  //       const response = await axiosInstance.post("/profile-analytics", payload);
  //       setProfileAnalytics(response.data);
  //       localStorage.setItem("profileAnalytics", JSON.stringify(response.data));
  //     } catch (error) {
  //       console.error("Error fetching profile analytics:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (resumeId) fetchProfileAnalytics();
  // }, [resumeId]);

  useEffect(() => {
      const payload = {
        resumeId,
        viewDetails: true,
        smartInsights: true,
        isFoboPro: true,
        isComprehensiveMode: true,
      };

      const fetchProfileAnalytics = async () => {
      try {
        setLoading(true); // start loading

        const response = await axiosInstance.post("/profile-analytics", payload);
        setProfileAnalytics(response.data);
        localStorage.setItem("profileAnalytics", JSON.stringify(response.data));

        // 🔥 keep loader ON for 1 minute
        setTimeout(() => {
          setLoading(false);  // STOP loading after 1 min
        }, 2000);

      } catch (error) {
        console.error("Error fetching profile analytics:", error);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }

      };

      console.log("shdskjdsds", resumeId, serviceUnlocked);

      if (resumeId && serviceUnlocked === true) fetchProfileAnalytics();
    }, [resumeId, serviceUnlocked]);

 

  const dataSchema = profileAnalytics?.data?.json_schema_data || {};


  const handleExportPDF = async () => {
    try {
      if (!dataSchema?.executive_summary) {
        alert("No data available for export!");
        return;
      }

      const autoTable = (await import("jspdf-autotable")).default;
      const html2canvas = (await import("html2canvas")).default;
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let y = margin;

      // 🧩 Helper: Section Title
      const addSection = (title, color = [42, 77, 208]) => {
        const barHeight = 8;
        pdf.setFillColor(...color);
        pdf.setDrawColor(...color);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.rect(margin, y, pageWidth - margin * 2, barHeight, "F");
        pdf.text(title, pageWidth / 2, y + 5, { align: "center" });
        y += barHeight + 6;
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
      };

      // 🧩 Helper: Text Wrapper
      const addText = (text, fontSize = 9, spacing = 6, indent = 0) => {
        if (!text) return;
        pdf.setFontSize(fontSize);
        const cleanText = text.replace(/[^\x20-\x7E]/g, "");
        const lines = pdf.splitTextToSize(cleanText, pageWidth - margin * 2 - indent);
        lines.forEach((line) => {
          if (y > pageHeight - 20) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, margin + indent, y);
          y += spacing;
        });
        y += 2;
      };

      const newPage = (title, color = [42, 77, 208]) => {
        pdf.addPage();
        y = margin;
        addSection(title, color);
      };

      const drawDivider = () => {
        pdf.setDrawColor(220, 220, 220);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 8;
      };

      // 🟦 HEADER
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(37, 99, 235);
      pdf.text("ALTIV.AI — Personalized AI Readiness Report", margin, y);
      y += 8;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(100);
      pdf.text(
        `Report ID: ${dataSchema?.reportId || "N/A"} | Generated: ${dataSchema?.generatedDate || new Date().toLocaleDateString()
        }`,
        margin,
        y
      );
      y += 10;
      drawDivider();

      // 🟩 DASHBOARD METRICS (UI-LIKE BOXES)
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0);
      pdf.setFontSize(12);
      pdf.text("AI Readiness Dashboard Summary", margin, y);
      y += 10;

      const metrics = [
        {
          title: "AI-Readiness Score",
          value: `${dataSchema?.AI_Readiness_Score || 32}%`,
          subtitle: dataSchema?.aiReadinessRating || "Above Average",
          color: [59, 130, 246], // blue
        },
        {
          title: "Transformation Timeline",
          value: `${dataSchema?.Augmented_Score || 3} Months`,
          subtitle: "Deployment Duration",
          color: [245, 158, 11], // orange
        },
        {
          title: "Automation Potential",
          value: `${dataSchema?.Automated_Score || 34}%`,
          subtitle: dataSchema?.automationImpact || "High Impact",
          color: [236, 72, 153], // pink
        },
        {
          title: "Strategic Objectives",
          value: `${dataSchema?.strategicObjectives || 4}`,
          subtitle: "Key Goals",
          color: [250, 204, 21], // yellow
        },
      ];

      const boxWidth = (pageWidth - margin * 2 - 10) / 2;
      const boxHeight = 24;
      let boxX = margin;
      let boxY = y;

      metrics.forEach((metric, i) => {
        pdf.setDrawColor(...metric.color);
        pdf.setFillColor(255, 255, 255);
        pdf.roundedRect(boxX, boxY, boxWidth, boxHeight, 3, 3, "S");

        // colored top line
        pdf.setFillColor(...metric.color);
        pdf.rect(boxX, boxY, boxWidth, 2.5, "F");

        // Title
        pdf.setTextColor(0);
        pdf.setFontSize(9);
        pdf.text(metric.title, boxX + 3, boxY + 8);

        // Value
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
        pdf.setTextColor(...metric.color);
        pdf.text(metric.value, boxX + 3, boxY + 16);

        // Subtitle
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(8);
        pdf.setTextColor(80);
        pdf.text(metric.subtitle, boxX + 3, boxY + 23);

        // Move grid
        if (i % 2 === 0) {
          boxX += boxWidth + 10;
        } else {
          boxX = margin;
          boxY += boxHeight + 8;
        }
      });

      y = boxY + boxHeight;
      drawDivider();

      // 🟩 1. EXECUTIVE SUMMARY
      addSection("1. Executive Summary");
      const exec = dataSchema.executive_summary?.profile || {};
      const achievements = dataSchema.executive_summary?.key_achievements || [];

      // Profile Summary Box
      pdf.setDrawColor(200);
      pdf.setFillColor(245, 247, 255);
      pdf.roundedRect(margin - 2, y - 2, pageWidth - 2 * margin + 4, 25, 3, 3, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("Profile Summary", margin + 2, y + 5);
      y += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(`Name: ${exec.name || "N/A"}`, margin + 4, y);
      y += 5;
      pdf.text(`Title: ${exec.title || "N/A"}`, margin + 4, y);
      y += 5;
      pdf.text(`Company: ${exec.company || "N/A"}`, margin + 4, y);
      y += 8;

      pdf.setFont("helvetica", "bold");
      pdf.text("Key Achievements:", margin, y);
      y += 6;
      pdf.setFont("helvetica", "italic");
      (achievements.length ? achievements : ["No achievements listed."]).forEach((a) => {
        const lines = pdf.splitTextToSize(`• ${a}`, pageWidth - 2 * margin);
        pdf.text(lines, margin + 4, y);
        y += lines.length * 5;
      });
      y += 6;

      pdf.setFont("helvetica", "bold");
      pdf.text("Summary:", margin, y);
      y += 6;
      pdf.setFont("helvetica", "italic");
      const summaryLines = pdf.splitTextToSize(
        dataSchema.executive_summary?.summary || "No summary available.",
        pageWidth - 2 * margin
      );
      pdf.text(summaryLines, margin, y);

      // 🟥 2. CURRENT STATE ANALYSIS
      newPage("2. Current State Analysis");
      autoTable(pdf, {
        startY: y,
        head: [["Capability", "Evidence", "Strength", "AI-Readiness Gap"]],
        body: (dataSchema.current_state_diagnostic || []).map((r) => [
          r.Capability,
          r.Evidence,
          r.Strength,
          r["AI-Readiness Gap"],
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [245, 247, 255], textColor: [0, 0, 0], fontStyle: "bold" },
        margin: { left: margin },
        theme: "grid",
      });

      // 🟦 3. STRATEGIC OBJECTIVES
      newPage("3. Strategic Objectives");
      if (dataSchema.strategic_objectives?.timeperiod) {
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(9);
        pdf.text(`Timeframe: ${dataSchema.strategic_objectives.timeperiod}`, margin, y);
        y += 8;
      }

      const objectives = dataSchema.strategic_objectives?.plan || [];
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("Strategic Objectives:", margin, y);
      y += 8;

      if (objectives.length === 0) {
        pdf.setFont("helvetica", "italic");
        pdf.text("No strategic objectives available.", margin, y);
        y += 10;
      }

      objectives.forEach((obj, i) => {
        const lines = pdf.splitTextToSize(`${i + 1}. ${obj}`, pageWidth - 2 * margin - 6);
        const boxHeight1 = Math.max(15, lines.length * 5 + 6);
        pdf.setDrawColor(200);
        pdf.setFillColor(245, 247, 255);
        pdf.roundedRect(margin - 1, y - 4, pageWidth - 2 * margin + 2, boxHeight1, 3, 3, "F");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(lines, margin + 4, y + 2);
        y += boxHeight1 + 5;
      });

      // 🟩 4. TRANSFORMATION ROADMAP
      newPage("4. Transformation Roadmap"); // normal section with a page break

      autoTable(pdf, {
        startY: y,
        head: [["Pillar", "Goal", "T1 Tactics", "T2 Scaling"]],
        body: (dataSchema.transformation_pillars_and_tactics?.pillars || []).map((p) => [
          p.Pillar,
          p.Goal,
          (p["T1 Tactics"] || []).join(", "),
          (p["T2 Scaling"] || []).join(", "),
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: "bold" },
        margin: { left: margin },
        theme: "grid",
      });

      // Add some spacing before the next section
      y = pdf.lastAutoTable.finalY + 10;
      y = boxY + boxHeight + 3;
      drawDivider();

      // 🟦 Capability Building Plan — blue heading (no new page)
      addSection("5. Capability Building Plan"); // ✅ same style heading, no page break

      autoTable(pdf, {
        startY: y,
        head: [["Skill Cluster", "Micro-Credential", "Mode", "Hrs/Week"]],
        body: (dataSchema.capability_building_plan?.learning_plan || []).map((r) => [
          r["Skill Cluster"],
          r["T Micro-Credential"],
          r["Learning Mode"],
          r["Estimated Hrs/Week"],
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: "bold" },
        margin: { left: margin },
        theme: "grid",
      });

      // 🟪 6. RECOMMENDED TOOL STACK
      newPage("6. Recommended Tool Stack"); // start a new page for section 6

      autoTable(pdf, {
        startY: y,
        head: [["Layer", "Recommended Tools", "Rationale"]],
        body: (dataSchema.tool_stack_overview || []).map((t) => [
          t.Layer,
          t["Recommended Tools"],
          t.Rationale,
        ]),
        styles: { fontSize: 9 },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontStyle: "bold",
        },
        margin: { left: margin },
        theme: "grid",
      });

      // Add space between sections
      y = pdf.lastAutoTable.finalY + 10;
      y = boxY + boxHeight + 3;
      drawDivider();
      // 🩷 7. FIRST 30 DAYS QUICK START — same page, with blue heading
      addSection("7. First 30 Days Quick Start"); // ✅ uses same blue bar heading style

      autoTable(pdf, {
        startY: y,
        head: [["Week", "Action", "Concrete Output"]],
        body: (dataSchema.first_30_days_quick_start_checklist?.checklist || []).map((c) => [
          c.Week,
          c.Action,
          c["Concrete Output"],
        ]),
        styles: { fontSize: 9 },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontStyle: "bold",
        },
        margin: { left: margin },
        theme: "grid",
      });

      // ❤️ 8. SKILL EROSION PROJECTION
      newPage("8. Skill Erosion Projection");
      try {
        const chartNode = document.getElementById("skill-erosion-capture");
        if (chartNode) {
          chartNode.style.position = "static";
          chartNode.style.visibility = "visible";
          chartNode.style.height = "1000px";
          await new Promise((resolve) => setTimeout(resolve, 800));

          const canvas = await html2canvas(chartNode, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
          });

          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pageWidth - 2 * margin;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const finalHeight = Math.min(imgHeight, pageHeight - y - 20);
          pdf.addImage(imgData, "PNG", margin, y, imgWidth, finalHeight);
          y += finalHeight + 10;

          chartNode.style.position = "absolute";
          chartNode.style.top = "-9999px";
          chartNode.style.visibility = "hidden";
        } else {
          pdf.setFont("helvetica", "italic");
          pdf.setTextColor(180, 0, 0);
          pdf.text("⚠️ Skill Erosion Projection reference not found.", margin, y + 6);
          y += 14;
        }
      } catch (err) {
        console.error("Skill Erosion Projection image capture failed:", err);
      }

      // 💜 9. TOP TASKS EXPOSURE ANALYSIS
      newPage("9. Top Tasks Exposure Analysis");
      autoTable(pdf, {
        startY: y,
        head: [["Task", "Automation Potential", "Time (hrs/wk)", "Savings %", "Tools"]],
        body: (dataSchema.top_tasks_exposure_analysis || []).map((t) => [
          t.task,
          t.automation_potential,
          t.current_time_hours_per_week,
          `${t.projected_savings_percentage}%`,
          (t.recommended_tools || []).join(", "),
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: "bold" },
        margin: { left: margin },
        theme: "grid",
      });
      console.log("Dddddddddddddd", dataSchema);
      // 💚 10. DETAILED ANALYSIS NOTES
      newPage("10. Detailed Analysis Notes");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.text("Industry Benchmarks:", margin, y);
      y += 8;
      addText(dataSchema.detailed_notes?.industry_benchmarks || "No data available.");

      pdf.setFont("helvetica", "bold");
      pdf.text("Risks & Mitigations:", margin, y);
      y += 8;
      (dataSchema.detailed_notes?.risk_factors_mitigation || []).forEach((r) =>
        addText(`• ${r.risk_factor}: ${r.mitigation}`)
      );

      pdf.setFont("helvetica", "bold");
      pdf.text("Success KPIs:", margin, y);
      y += 8;
      (dataSchema.detailed_notes?.success_metrics_kpis || []).forEach((k) =>
        addText(`• ${k.metric}: ${k.target}`)
      );

      // 📄 FOOTER
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i += 1) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.setTextColor(100);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: "right" });
        pdf.text("Confidential | Generated by ALTIV.AI Readiness Engine", margin, pageHeight - 10);
      }

      pdf.save(`AI-Readiness-Report-${dataSchema?.reportId || "demo"}.pdf`);
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Failed to export PDF. See console for details.");
    } finally {
      setExportInProgress(false);
    }
  };


  // ---------------------------------------------
  // if (loading)
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
  //       <CircularProgress size={40} />
  //     </Box>
  //   );

  const SelectedComponent = sections[value].component;
  const extraPrLabels = ["Strategic Objectives", "Transformation Roadmap", "Capability Building"];

  return (
    <>
  {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center", 
                zIndex: 9999,
                flexDirection: "column",
              }}
            >
              <CircularProgress size={70} thickness={5} color="primary" />
              <Typography sx={{ mt: 2, fontWeight: 500, color: "primary.main" }}>
                Loading, please wait...
              </Typography>
            </Box>
          )}
      {/* ✅ Dashboard Section */}
       <AIReadinessDashboard data={profileAnalytics} onExportPDF={handleExportPDF} />

      {/* ✅ Tab Navigation */}
      <Box sx={{ py: { xs: 2, md: 1 } }}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: "1150px",
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 1,
            py: { xs: 1, md: 1.5 },
            px: { xs: 1, md: 2 },
          }}
        >
          <Tabs
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false}
            centered={!isMobile}
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: isMobile ? "flex-start" : "space-between",
              },
              "& .MuiTab-root": {
                flex: 1,
                px: { xs: 0.5, md: 0 },
                fontSize: { xs: "11px", sm: "12px", md: "10px" },
                fontWeight: 500,
                textTransform: "none",
                borderRadius:'100px',
              },
              "& .Mui-selected": {
                background: "#2A4DD0",
                color: "#fff !important",
              },
              "& .MuiTabs-indicator": { display: "none" },
            }}
          >
            {sections.map((section, index) => (
              <Tab
                key={index}
                label={section.label}
                disableRipple
                sx={
                  extraPrLabels.includes(section.label)
                    ? { [theme.breakpoints.up("sm")]: { mr: "30px" } }
                    : {}
                }
              />
            ))}
          </Tabs>
        </Container>

        <Container
          maxWidth={false}
          sx={{
            maxWidth: "1150px",
            mt: { xs: 2, md: 2 },
            px: { xs: 2, sm: 3, md: 0 },
            position: "relative",
          }}
        >

          <div
            id="skill-erosion-capture"
            style={{
              position: "absolute",
              top: "-9999px",
              left: "-9999px",
              visibility: "hidden",
              background: "#fff",
              padding: "1rem",
              height: "400px",
              width: "800px",
            }}
          >
            <SkillErosionProjection
              data={profileAnalytics}
              serviceResp={!!serviceUnlocked}
              isExportMode
            />
          </div>

          {/* ✅ Visible tab content */}
          {sections[value].label === "Skill Erosion" ? (
            <div ref={pdfRef} style={{ background: "#fff", padding: "1rem" }}>
              <SkillErosionProjection
                data={profileAnalytics}
                serviceResp={!!serviceUnlocked}
              />
            </div>
          ) : (
            <SelectedComponent
              data={profileAnalytics}
              serviceResp={!!serviceUnlocked}
            />
          )}

        </Container>

      </Box>
    </>
  );
}

// ResponsiveNavbar.propTypes = {
//   data: PropTypes.object,
// };