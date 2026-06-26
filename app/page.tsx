import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import ZeroData from '@/components/sections/ZeroData';
import FeatureCards from '@/components/sections/FeatureCards';
import WhoItsFor from '@/components/sections/WhoItsFor';
import Companion from '@/components/sections/Companion';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';
import { getContent } from '@/lib/cms';
import { pageMetadata, softwareApplicationJsonLd, webSiteJsonLd } from '@/lib/metadata';

export const metadata = pageMetadata('/');

export default function HomePage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <Navbar content={cms.content.nav} />
      <main id="main-content" className="mx-auto max-w-[1200px] px-0">
        <Hero content={cms.content.hero} />
        <ZeroData content={cms.content.zeroData} />
        <FeatureCards content={cms.content.features} />
        <WhoItsFor content={cms.content.whoItsFor} />
        <Companion content={cms.content.companion} />
        <CtaSection content={cms.content.cta} />
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
