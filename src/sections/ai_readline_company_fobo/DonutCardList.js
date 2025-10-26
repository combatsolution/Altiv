

import React from 'react';
import { Stack, Box } from '@mui/material';
import DonutCard from "./DonutCard";
import FoboHeatmapCard from "./FoboHeatmapCard";
import FoboHalfGaugeCard from "./FoboGaugeCard";

const cardsData = [
  {
    title: 'Company Task Portfolio',
    data: [
      { name: 'Automation', value: 12.7, desc: 'AI can do these tasks by itself, replacing human work.' },
      { name: 'Augmentation', value: 46.9, desc: 'AI works with you, like a smart assistant helping you do better work.' },
      { name: 'Human', value: 40.2, desc: 'Tasks that AI can’t likely replace.' },
    ],
  },
  { title: "FOBO Heat-Map vs. Industry", type: "heatmap" },
  { title: "Domain Task Portfolio & FOBO Scores", type: "halfGauge", foboScore: 60 },
  {
    title: 'Product Management',
    foboScore: 70.1,
    data: [
      { name: 'Automation', value: 15, desc: 'Automated PM tasks.' },
      { name: 'Augmentation', value: 50, desc: 'AI assists PM.' },
      { name: 'Human', value: 35, desc: 'PM tasks AI cannot replace.' },
    ],
  },
  {
    title: 'Marketing Tasks',
    foboScore: 55.4,
    data: [
      { name: 'Automation', value: 20, desc: 'Automated marketing.' },
      { name: 'Augmentation', value: 55, desc: 'AI helps marketers.' },
      { name: 'Human', value: 25, desc: 'Human-only marketing tasks.' },
    ],
  },
  {
    title: 'Engineering Tasks',
    foboScore: 68.7,
    data: [
      { name: 'Automation', value: 10, desc: 'Code generation by AI.' },
      { name: 'Augmentation', value: 60, desc: 'AI assists engineers.' },
      { name: 'Human', value: 30, desc: 'Critical human engineering tasks.' },
    ],
  },
  {
    title: 'Design Tasks',
    foboScore: 58.9,
    data: [
      { name: 'Automation', value: 18, desc: 'Design templates by AI.' },
      { name: 'Augmentation', value: 50, desc: 'AI-assisted design.' },
      { name: 'Human', value: 32, desc: 'Human creative work.' },
    ],
  },
];


export default function DonutCardList() {
  return (
    <Box sx={{ mt: 3, mx: "auto", width: "100%", maxWidth: 1100 }}>
      {/* First row with 3 special cards */}
      <Stack direction="row" spacing={3} alignItems="flex-start" justifyContent="center">
        {cardsData.slice(0, 3).map((card, index) => {
          const renderCard = () => {
            if (card.type === "heatmap") return <FoboHeatmapCard />;
            if (card.type === "halfGauge") return <FoboHalfGaugeCard score={card.foboScore} />;
            return <DonutCard title={card.title} data={card.data} foboScore={card.foboScore} />;
          };

          return <React.Fragment key={index}>{renderCard()}</React.Fragment>;
        })}
      </Stack>

      {/* Vertical cards below */}
      <Stack
        spacing={3}
        alignItems="flex-start"
        sx={{ mt: 2, mx: "auto", width: "100%", maxWidth: 1000 }}
      >
        {cardsData.slice(3).map((card, index) => (
          <DonutCard
            key={index + 3}
            title={card.title}
            data={card.data}
            foboScore={card.foboScore}
          />
        ))}
      </Stack>
    </Box>
  );
}