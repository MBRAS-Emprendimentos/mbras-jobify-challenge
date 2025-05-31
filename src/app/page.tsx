import React from "react";
import { MainSection } from "@/components/index/MainSection";
import { StatsSection } from "@/components/index/StatsSection";
import { FeaturesSection } from "@/components/index/FeaturesSection";
import { StepsSection } from "@/components/index/StepsSection";
import { TestimonialsSection } from "@/components/index/TestimonialsSection";
import { CallToAction } from "@/components/index/CallToAction";
import JobSection from "@/components/job/JobSection";

interface HomeProps {
  searchParams?: Promise<Record<string, string | undefined>>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = (await searchParams) ?? {};
  return (
    <>
      <MainSection />
      <StatsSection />
      <FeaturesSection />
      <StepsSection />
      <section id="vagas">
        <JobSection searchParams={params} />
      </section>
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
