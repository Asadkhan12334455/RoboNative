import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import HeroSection from '@site/src/components/LandingPage/HeroSection';
import FeaturesSection from '@site/src/components/LandingPage/FeaturesSection';
import CurriculumSection from '@site/src/components/LandingPage/CurriculumSection';
import SimulationTeaser from '@site/src/components/LandingPage/SimulationTeaser';
import CommunitySection from '@site/src/components/LandingPage/CommunitySection';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="AI-Native Textbook for Physical AI & Humanoid Robotics">
      <main>
        <HeroSection />
        <FeaturesSection />
        <CurriculumSection />
        <SimulationTeaser />
        <CommunitySection />
      </main>
    </Layout>
  );
}
