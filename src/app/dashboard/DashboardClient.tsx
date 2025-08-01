"use client";
import dynamic from "next/dynamic";

const AIContentWidget = dynamic(() => import("./AIContentWidget"), { ssr: false });

export default function DashboardClient() {
  return <AIContentWidget />;
}
