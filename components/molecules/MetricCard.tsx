"use client";

import { ReactNode } from "react";
import ChartWidget from "@/components/templates/ChartWidget";

type MetricCardProps = {
  title: string;
  icon: ReactNode;
  data:TempLineChart | WindLineChart | PreciBarChart | undefined;
  onClick: () => void;
};

const MetricCard = ({ title, icon, data, onClick }: MetricCardProps) => {
  return (
    <div
      className="bg-white p-4 md:p-6 cursor-pointer rounded-2xl border border-[#E9EFF5] backdrop-blur-2xl min-h-[486px]"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div className="font-semibold text-xl">{title}</div>
      </div>
      <div className="mt-6">{data && <ChartWidget data={data} />}</div>
    </div>
  );
};

export default MetricCard;