import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import ProductShowcase from '@/components/sections/ProductShowcase';
import FeatureCards from '@/components/sections/FeatureCards';
import WhoItsFor from '@/components/sections/WhoItsFor';
import ZeroData from '@/components/sections/ZeroData';
import Companion from '@/components/sections/Companion';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';
import { getContent } from '@/lib/cms';
import { pageMetadata, softwareApplicationJsonLd } from '@/lib/metadata';

export const metadata = pageMetadata('/');

export default function HomePage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <Navbar content={cms.content.nav} />
      <main id="main-content" className="mx-auto max-w-[1200px] px-0">
        {/* Section order locked 2026-05-26 (homepage redesign):
            Hero (value-led, no privacy lead) →
            ProductShowcase (marquee screenshot) →
            FeatureCards (4 capabilities: chat / agents / browser / channels) →
            WhoItsFor (self-identification) →
            ZeroData (demoted privacy, retitled "How we are different") →
            Companion (OpenClaw posture) →
            CtaSection (trial CTA + LinkedIn fold-in gated on PRE_LAUNCH). */}
        <Hero content={cms.content.hero} />
        <ProductShowcase content={cms.content.productShowcase} />
        <FeatureCards content={cms.content.features} />
        <WhoItsFor content={cms.content.whoItsFor} />
        <ZeroData content={cms.content.zeroData} />
        <Companion content={cms.content.companion} />
        <CtaSection content={cms.content.cta} />
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
