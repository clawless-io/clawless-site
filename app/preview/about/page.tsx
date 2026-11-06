import type { Metadata } from 'next';
import { PageHead, P } from '@/components/oss/Shell';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Clawless Computer is a product of RBJ Global LLC, a Texas limited liability company that builds a growing family of AI software and learning.',
  alternates: { canonical: 'https://clawless.ai/about/' },
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="About Clawless Computer"
        lede="Clawless Computer is a product of RBJ Global LLC, the company behind a growing family of AI software and learning. The aim is the same across all of it: make people more powerful, not obsolete."
      />
      <section className="oss-wrap py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          <div className="space-y-4">
            <h2 className="oss-h3">RBJ Global LLC</h2>
            <p className="oss-body">
              RBJ Global LLC is a company working in AI, intelligence and education, organized as a Texas limited liability company. It builds and ships a family of independent products, each with its own name, its own domain and its own roadmap.
            </p>
            <p className="oss-body">
              The family includes Clawless Computer, Clawdemy, WhisprDesk, ClaudeLink, Clawddesk, Trading Agents Lab and iLoveMD. They cover agent software, AI education, dictation, developer tooling, research and document conversion.
            </p>
            <p className="oss-body">
              They share one approach: software that works for the person using it. Several run entirely on your own machine, and several are open source, so the code can be read before it is trusted.
            </p>
            <p className="oss-body">
              The work is for awareness and education. Much of it is free. Trading Agents Lab, several months in the making, is free in full, its Pro version included. ClaudeLink and Clawddesk are free and open source. Clawdemy is free to everyone. Clawless Computer will be free and open source at launch.
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
              Clawless Computer will be free and open source under AGPL-3.0 at launch. It runs on your computer, with keys you bring from the AI providers you choose.
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
            <p className="oss-body">
              The fear I hear most is &quot;AI will replace me.&quot; I see it the other way. Keep working with AI, keep building with it, and let your team and your leadership see what you produce. When you put AI tools and agents to work, your output multiplies. When someone&apos;s output is six times higher, they do not have to say a word. They get noticed. Why would anyone replace the person working at six times their old capacity?
            </p>
            <p className="oss-body">I want to see people grow. That is the vision behind every product we make.</p>
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
