import type { Metadata } from 'next';
import { PageHead, P } from '@/components/oss/Shell';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Clawless Computer is a companion to OpenClaw, bringing the open-source AI agent gateway to everyday users through a calm desktop experience.',
  alternates: { canonical: 'https://clawless.ai/about/' },
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="About Clawless Computer"
        lede="An OpenClaw companion for everyday users. Part of a long bet that AI should make people more powerful, not obsolete."
      />
      <section className="oss-wrap py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          <div className="space-y-4">
            <h2 className="oss-h3">The vision</h2>
            <p className="oss-body">
              OpenClaw is a major open-source AI project with an active contributor community shipping new releases almost weekly. The engine is capable, the project is well-maintained, and the ecosystem around it is real. But for most non-technical people, OpenClaw is also <em>invisible</em>, locked behind a command line that requires you to know what YAML, environment variables, and JSON-RPC calls are.
            </p>
            <p className="oss-body">
              Clawless Computer exists to close that gap. Same engine, same community, same release cadence, all wrapped in a polished desktop experience that anyone can install and use without touching a terminal.
            </p>
            <p className="oss-body">
              That is the surface mission. The deeper one is broader. AI is going to be a defining technology of this generation, and the people most worried that AI will replace them are the people least likely to learn to use it well. The work is to flip that, to make AI literacy approachable so everyday users walk in confident instead of anxious.
            </p>
            <p className="oss-body">
              <strong>Clawless is the tool. Clawdemy is the mission.</strong> Both come from the same belief: that the right thing to build for AI is something that makes people more powerful, not obsolete.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="oss-h3">A companion, not a competitor</h2>
            <p className="oss-body">
              Let&apos;s be clear about something: <strong>Clawless Computer is not a competitor to OpenClaw. It is a companion to it.</strong> Clawless Computer is built on top of OpenClaw, ships every OpenClaw release as soon as it lands, and stays fully compatible with the upstream engine. We do not fork OpenClaw. We do not compete with OpenClaw. We exist to help OpenClaw reach more people.
            </p>
            <p className="oss-body">
              Clawless Computer takes a deliberate bet: we want OpenClaw to flourish. Every Clawless install puts another OpenClaw user out into the world. Every Clawless feature is a feature OpenClaw can be used for. Our success is OpenClaw&apos;s success.
            </p>
            <p className="oss-body">
              If you are part of the OpenClaw community: we are huge fans of what you have built. We are not here to compete with the project we love. We are here to be its desktop on-ramp.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="oss-h3">Who it is for</h2>
            <p className="oss-body">
              If you have heard about OpenClaw, want to use it, and bounced off the command line, Clawless is built for you. If you are already an OpenClaw power user and want a real GUI for the times you do not want to type, Clawless is built for you too. If you want to deploy your AI on a spare machine and access it from anywhere, also you.
            </p>
            <p className="oss-body">Same engine. Just less typing. Anywhere you want to run it.</p>
          </div>

          <div className="space-y-4">
            <h2 className="oss-h3">Clawdemy, a free AI literacy site</h2>
            <p className="oss-body">
              Clawdemy is a free, web-based AI literacy site. It is built for the AI-anxious adult who suspects AI is coming for their job and would rather understand the technology than fear it. The mission is simple: turn fear into fluency, and make people more powerful, not obsolete.
            </p>
            <p className="oss-body">
              Clawdemy teaches AI literacy to everyone, free. Lessons are vendor-neutral on the concept side and use Clawless as the worked environment for hands-on practice. Clawless users get the same content as everyone else. There is no gated content.
            </p>
            <p className="oss-body">
              Currently shipping: a transformer foundations track adapted from Stanford&apos;s CME 295, with AI-narrated audio so the lessons can be listened to in the car or at the gym.
            </p>
            <p className="oss-body">
              Live and in active expansion at{' '}
              <a href="https://clawdemy.org" target="_blank" rel="noopener" className="oss-link">
                clawdemy.org
              </a>
              . The lesson library grows continuously. See also <a href={`${P}/learn`} className="oss-link">Learn</a> and <a href={`${P}/what-it-does`} className="oss-link">What it does</a>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="oss-h3">From the founder</h2>
            <p className="oss-body">AI isn&apos;t replacing people. It&apos;s leaving people behind.</p>
            <p className="oss-body">
              I&apos;m Jay Siddiqi. I built Clawless because the people who need AI the most are the ones struggling to use it.
            </p>
            <p className="oss-body">
              Most AI tools assume you can open a terminal, manage API keys, and read a GitHub README. Most people can&apos;t, and shouldn&apos;t have to. The gap between &quot;AI exists&quot; and &quot;I can actually use it&quot; is widening every month. The whole point of Clawless is to close it.
            </p>
            <p className="oss-body">
              Clawdemy is a free AI literacy curriculum I edit personally, line by line, before anything ships. No gated content. It stays free because AI literacy shouldn&apos;t be something you have to buy your way into.
            </p>
            <p className="oss-body">If you leave a lesson more confident than when you started, I did my job.</p>
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
