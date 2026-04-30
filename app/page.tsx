import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import ZeroData from '@/components/sections/ZeroData';
import DemoVideoSlot from '@/components/sections/DemoVideoSlot';
import FeatureCards from '@/components/sections/FeatureCards';
import WhoItsFor from '@/components/sections/WhoItsFor';
import Companion from '@/components/sections/Companion';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';
import { getContent } from '@/lib/cms';

export default function HomePage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main className="mx-auto max-w-[1200px] px-0">
        <Hero content={cms.content.hero} />
        <ZeroData content={cms.content.zeroData} />
        <DemoVideoSlot content={cms.content.demoVideo} />
        <FeatureCards content={cms.content.features} />
        <WhoItsFor content={cms.content.whoItsFor} />
        <Companion content={cms.content.companion} />
        <CtaSection content={cms.content.cta} />
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
