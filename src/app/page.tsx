import React from "react";
import { MainSection } from "@/components/index/MainSection";
import { StatsSection } from "@/components/index/StatsSection";
import { FeaturesSection } from "@/components/index/FeaturesSection";
import { StepsSection } from "@/components/index/StepsSection";
import { TestimonialsSection } from "@/components/index/TestimonialsSection";
import { CallToAction } from "@/components/index/CallToAction";

export default async function Home() {
  return (
    <>
      <MainSection />
      <StatsSection />
      <FeaturesSection />
      <StepsSection />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
