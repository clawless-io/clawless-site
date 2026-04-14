import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Clawless Computer is a companion to OpenClaw — built to bring the open-source AI agent gateway to everyday users through a polished desktop experience. Built by one person who wants AI to make people more powerful, not obsolete.',
};

export default function AboutPage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main className="mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pb-16 pt-[120px] text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-[-180px] h-[700px] w-[700px] rounded-full"
            style={{
              transform: 'translateX(-50%)',
              background:
                'radial-gradient(circle, rgba(0,212,255,0.14) 0%, rgba(0,212,255,0.06) 35%, rgba(34,255,170,0.04) 55%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'orbBreathe 8s ease-in-out infinite',
            }}
          />

          <ScrollReveal>
            <h1
              className="relative mb-6 text-[42px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[56px] md:text-[64px]"
              style={{
                background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00D4FF 0%, #22FFAA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Clawless Computer
              </span>
            </h1>
            <p className="mx-auto max-w-[640px] text-base leading-[1.7] text-text-secondary sm:text-lg">
              An OpenClaw companion built for everyday users. Made by someone
              who wants AI to make people more powerful, not obsolete.
            </p>
          </ScrollReveal>
        </section>

        {/* ── The story ── */}
        <section className="border-t border-border-default py-20">
          <div className="mx-auto max-w-[760px] space-y-10 text-base leading-[1.85] text-text-secondary sm:text-lg">

            {/* The vision */}
            <ScrollReveal>
              <h2 className="mb-4 text-2xl font-bold tracking-[-0.02em] text-text-primary sm:text-3xl">
                The vision
              </h2>
              <p>
                OpenClaw is one of the most impressive open-source AI projects
                in the world. The engine is powerful, the contributor
                community is enormous, and new releases ship almost every
                week. But for most non-technical people, OpenClaw is also{' '}
                <em>invisible</em> — locked behind a command line that
                requires you to know what YAML, environment variables, and
                JSON-RPC calls are.
              </p>
              <p>
                Clawless Computer exists to close that gap. Same engine, same
                community, same release cadence — wrapped in a polished
                desktop experience that anyone can install and use without
                touching a terminal. The mission is approachable AI literacy
                for everyday users: a platform where people can become
                genuinely powerful with AI, instead of being passive users of
                someone else&apos;s assistant.
              </p>
            </ScrollReveal>

            {/* Companion, not competitor */}
            <ScrollReveal delay={0.05}>
              <h2 className="mt-12 mb-4 text-2xl font-bold tracking-[-0.02em] text-text-primary sm:text-3xl">
                A companion, not a competitor
              </h2>
              <p>
                Let&apos;s be clear about something:{' '}
                <strong className="text-text-primary">
                  Clawless Computer is not a competitor to OpenClaw. It is a
                  companion to it.
                </strong>{' '}
                Clawless Computer is built on top of OpenClaw, ships every
                OpenClaw release as soon as it lands, and stays 100%
                compatible with the upstream engine. We do not fork OpenClaw.
                We do not compete with OpenClaw. We exist to help OpenClaw
                reach more people.
              </p>
              <p>
                The open-source AI agent space has powerful enemies right now.
                Big platforms are working hard to commoditize, absorb, or
                replace independent projects like OpenClaw with closed
                alternatives. Clawless Computer takes the opposite bet: we
                want OpenClaw to flourish. Every Clawless Computer install
                puts another OpenClaw user out into the world. Every Clawless
                Computer feature is a feature OpenClaw can be used for. Our
                success is OpenClaw&apos;s success.
              </p>
              <p>
                If you are part of the OpenClaw community: we are huge fans
                of what you have built. We are not here to compete with the
                project we love. We are here to be its desktop on-ramp.
              </p>
            </ScrollReveal>

            {/* Why someone built this */}
            <ScrollReveal delay={0.1}>
              <h2 className="mt-12 mb-4 text-2xl font-bold tracking-[-0.02em] text-text-primary sm:text-3xl">
                Why one person built it
              </h2>
              <p>
                Clawless Computer is a one-person project, built in spare
                hours by Jay — someone who fell in love with OpenClaw, saw
                the size and passion of its community, and noticed the same
                thing over and over: the people who would benefit most from
                OpenClaw are the people least likely to ever use it, because
                they cannot live in a terminal all day.
              </p>
              <p>
                That gap is the entire reason this project exists. Not to
                build a different agent engine — OpenClaw is already the best
                one. Not to compete for users — OpenClaw deserves more of
                them. Just to be the polished desktop layer that lets the
                next ten thousand people walk in.
              </p>
            </ScrollReveal>

            {/* Who it is for */}
            <ScrollReveal delay={0.15}>
              <h2 className="mt-12 mb-4 text-2xl font-bold tracking-[-0.02em] text-text-primary sm:text-3xl">
                Who it is for
              </h2>
              <p>
                If you have heard about OpenClaw, want to use it, and bounced
                off the command line — Clawless Computer is built for you.
                If you are already an OpenClaw power user and want a real GUI
                for the times you do not want to type — Clawless Computer is
                built for you too. If you want to deploy your AI on a spare
                machine and access it from anywhere — also you.
              </p>
              <p>
                Same engine. Just less typing. Anywhere you want to run it.
              </p>
            </ScrollReveal>

            {/* Sister project teaser */}
            <ScrollReveal delay={0.2}>
              <h2 className="mt-12 mb-4 text-2xl font-bold tracking-[-0.02em] text-text-primary sm:text-3xl">
                A sister project, coming soon
              </h2>
              <p>
                Clawless Computer is the tool. There is also going to be a
                sister project — a free educational site dedicated to AI
                literacy for everyday users. Articles, walkthroughs, and
                practical guides for the people who are most worried that AI
                will replace them. The goal is simple: turn fear into
                fluency. Make people more powerful, not obsolete.
              </p>
              <p>
                More on that when it ships. For now, focus is on getting the
                Computer ready.
              </p>
            </ScrollReveal>

            {/* Status */}
            <ScrollReveal delay={0.25}>
              <h2 className="mt-12 mb-4 text-2xl font-bold tracking-[-0.02em] text-text-primary sm:text-3xl">
                Status
              </h2>
              <p>
                Active development. First public release targeted for{' '}
                <strong className="text-text-primary">Q3 2026</strong>.
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
