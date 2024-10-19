import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconTableColumn,
} from "@tabler/icons-react";
import { BarChart } from "./Bar_Chart";
import { PieCharts } from "./PieChart";
import { Radar_Chart } from "./Radar_Chart";
import { RadialChart } from "./Radial_Chart";

const items = [
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: <div className="w-full h-full min-h-[350px]"><BarChart /></div>,
    icon: <IconTableColumn className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <div className="w-full h-full min-h-[350px]"><PieCharts /></div>,
    icon: <IconArrowWaveRightUp className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <div className="w-80 h-20 min-h-[150px]"><Radar_Chart /></div>,
    icon: <IconBoxAlignTopLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <div className="w-full h-20 min-h-[150px]"><RadialChart /></div>,
    icon: <IconBoxAlignRightFilled className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />,
  },
];

export function BentoGridAnalytics() {
  return (
    <div className="min-h-[100%] p-8 md:p-12 lg:p-16 bg-neutral-50 dark:bg-neutral-950">
      <BentoGrid className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            header={item.header}
            className={`
              ${i === 3 ? "md:col-span-2" : ""}
              ${i === 0 ? "md:row-span-2" : ""}
              transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
              bg-white dark:bg-neutral-900 rounded-2xl shadow-md
              border border-neutral-200 dark:border-neutral-800
              flex flex-col
              ${i === 3 ? "md:min-h-[350px]" : ""}
            `}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

export default BentoGridAnalytics;