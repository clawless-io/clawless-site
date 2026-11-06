import type { Metadata } from 'next';
import { PageHead, P } from '@/components/oss/Shell';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Clawless Computer is a product of RBJ Global LLC, a Texas limited liability company that builds a family of independent software that runs on your own machine, with your own keys.',
  alternates: { canonical: 'https://clawless.ai/about/' },
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="About Clawless Computer"
        lede="Clawless Computer is a product of RBJ Global LLC, which builds a family of software that runs on your own machine, with your own keys. The aim is the same across all of it: make people more powerful, not obsolete."
      />
      <section className="oss-wrap py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          <div className="space-y-4">
            <h2 className="oss-h3">RBJ Global LLC</h2>
            <p className="oss-body">
              RBJ Global LLC is a Texas limited liability company. It builds and ships a family of independent products, each with its own name, its own domain and its own roadmap.
            </p>
            <p className="oss-body">
              The family includes Clawless Computer, Clawdemy, WhisprDesk, ClaudeLink, Clawddesk, Trading Agents Lab and iLoveMD. They cover agent software, AI education, dictation, developer tooling, research and document conversion.
            </p>
            <p className="oss-body">
              They share one posture. The software runs on your own device. You bring your own keys. Your data stays with you, and several of the products are open source so the code can be read before it is trusted.
            </p>
            <p className="oss-body">
              See <a href={`${P}/family`} className="oss-link">the family</a> for each product and where to find it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="oss-h3">Where Clawless Computer fits</h2>
            <p className="oss-body">
              Clawless Computer is the family&apos;s desktop home for AI agents. It is built on OpenClaw, the open source AI agent engine, and bundles a tested OpenClaw version. It gives that engine a desktop app that anyone can install and use without a terminal.
            </p>
            <p className="oss-body">
              Clawless Computer will be free and open source under AGPL-3.0 at launch. It runs on your computer with your own keys, in line with the rest of the family.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="oss-h3">Who it is for</h2>
            <p className="oss-body">
              People who want to use AI agents and do not want to learn a command line first. People who already use agents and want a real interface for the times they do not want to type.
            </p>
            <p className="oss-body">Same engine. Less typing.</p>
          </div>

          <div className="space-y-4">
            <h2 className="oss-h3">Clawdemy, a free AI literacy site</h2>
            <p className="oss-body">
              Clawdemy is the family&apos;s free AI literacy site. It is built for adults who want to understand AI instead of fearing it. The goal is to turn worry into fluency.
            </p>
            <p className="oss-body">
              Lessons are free, and there is no gated content. Clawdemy offers a growing library of tracks, and Clawless users get the same lessons as everyone else.
            </p>
            <p className="oss-body">
              Find it at{' '}
              <a href="https://clawdemy.org" target="_blank" rel="noopener" className="oss-link">
                clawdemy.org
              </a>
              . See also <a href={`${P}/learn`} className="oss-link">Learn</a> and <a href={`${P}/what-it-does`} className="oss-link">What it does</a>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="oss-h3">From the founder</h2>
            <p className="oss-body">AI isn&apos;t replacing people. It&apos;s leaving people behind.</p>
            <p className="oss-body">
              Most AI tools assume you can open a terminal, manage API keys and read a GitHub README. Many people can&apos;t, and shouldn&apos;t have to. Each product in the family exists to narrow that gap.
            </p>
            <p className="oss-body">The measure is simple: people come away more capable than they started.</p>
            <p className="oss-small pt-2">
              Jay Siddiqi, Founder &middot;{' '}
              <a href="https://www.linkedin.com/in/junaidsiddiqi" target="_blank" rel="noopener" className="oss-link">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
