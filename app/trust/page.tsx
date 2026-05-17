import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Trust',
  description:
    'How Clawless Computer treats your data. What stays on your Mac, what leaves it and where it goes, the subprocessors we engage, and how you verify the claims.',
  robots: { index: false, follow: true },
};

export default function TrustPage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main id="main-content" className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <section className="pb-12 pt-32 text-center">
          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
              Legal
            </p>
            <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary sm:text-[52px]">
              Trust
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-base leading-relaxed text-text-secondary">
              How Clawless Computer treats your data, and how you verify it.
            </p>
          </ScrollReveal>
        </section>

        <section className="mx-auto max-w-[760px] pb-24">
          <ScrollReveal>
            <div
              className="rounded-2xl border border-border-default p-8 text-text-secondary sm:p-10"
              style={{ background: 'rgba(10, 15, 28, 0.6)' }}
            >
              <p className="mb-2 leading-[1.8]">
                <strong className="text-text-primary">
                  What we believe about your data
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Your work belongs on your computer. Clawless Computer is a
                local-first desktop application: conversations, settings, and
                memory tiers live in a SQLite database in your app data folder,
                and the only data that ever leaves your Mac is the data you
                explicitly route through a third party you have configured.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  What stays on your Mac
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                The following live on your computer, in your app data folder,
                and never travel to any server we operate:
              </p>
              <ul className="ml-6 mb-4 list-disc space-y-2 leading-[1.8]">
                <li>Your conversations with the agent</li>
                <li>Your memory entries (facts the app remembers about you)</li>
                <li>Your agents and skills</li>
                <li>
                  Your settings, including API keys for every AI provider you
                  connect
                </li>
                <li>
                  Browser-automation session state (cookies, local storage,
                  history for the bundled Chromium)
                </li>
                <li>License state and the local consent ledger</li>
                <li>Anything else you create inside the app</li>
              </ul>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  What leaves your Mac, and where it goes
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Three categories of network traffic leave your Mac when you use
                Clawless Computer. Each is described below, and each is either
                fully under your control (BYOK) or scoped narrowly to a single
                purpose (license validation, Help mode).
              </p>

              <p className="mb-2 mt-6 leading-[1.8]">
                <strong className="text-text-primary">
                  1. BYOK queries to the AI provider you choose
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                When you send a chat message, Clawless Computer reads your
                prompt and sends it directly from your computer to whichever
                provider you have configured (Anthropic, OpenAI, Google, Groq,
                or any other provider you supply an API key for). The
                connection is between your computer and the provider; we do
                not proxy the call through any server we run, and we do not
                see, store, or relay your prompts or responses. You supply the
                API key, you choose the model, you control the relationship
                with the provider under their own privacy policy.
              </p>

              <p className="mb-2 mt-6 leading-[1.8]">
                <strong className="text-text-primary">
                  2. Help mode queries to kb.clawless.ai
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                When you turn on Help mode from the chat toolbar, your typed
                question and an opaque per-session identifier travel to
                kb.clawless.ai, which runs on Cloudflare Workers and uses
                Cloudflare AI Gateway in front of Anthropic Haiku and Claude
                Sonnet. The service returns answers and citations drawn from
                our public documentation. A record of your help conversation
                is retained for up to 10 minutes of inactivity to support
                multi-turn follow-up questions, then deleted automatically. We
                do not link this record to your Clawless account, your IP
                address beyond edge logging, or any other identifying
                information. If you do not turn on Help mode, no requests
                reach this service.
              </p>

              <p className="mb-2 mt-6 leading-[1.8]">
                <strong className="text-text-primary">
                  3. License validation to Lemon Squeezy
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Your license key and a short device fingerprint (your
                computer&apos;s hostname plus a hash of platform and
                architecture) travel to Lemon Squeezy when the app activates
                or validates your license. The fingerprint lets Lemon Squeezy
                show a human-readable name in your activation list so you can
                recognize and free a specific machine later. The app checks
                once per 24 hours while open and once on launch; if your
                computer is offline, the app keeps working using the last
                successful validation, with a 30-day offline grace window.
              </p>

              <p className="mb-2 mt-6 leading-[1.8]">
                <strong className="text-text-primary">
                  What is not there
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Clawless Computer does not run analytics, crash telemetry,
                session replay, fingerprinting, or any other passive data
                collection. There is no Clawless-controlled cloud storage; we
                do not hold a copy of your conversations, your prompts, your
                memory entries, or your work on any infrastructure we operate.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Subprocessors</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                For the full list of third parties that may receive data when
                you use Clawless Computer, including each one&apos;s role and
                when it is engaged, see our{' '}
                <a
                  href="/subprocessors"
                  className="text-accent underline hover:text-text-primary"
                >
                  subprocessors page
                </a>
                . The desktop application also enumerates its own subprocessor
                list under Settings, Legal, Subprocessors, because the in-app
                list depends on which AI providers you choose to connect.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Your rights</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Because the vast majority of your data sits on your computer,
                most rights are exercised by you, on your computer, without
                involving us:
              </p>
              <ul className="ml-6 mb-4 list-disc space-y-2 leading-[1.8]">
                <li>
                  <strong className="text-text-primary">Export.</strong>{' '}
                  Settings, Legal, Export My Data writes a single zip file
                  built from an explicit allow-list: the app database
                  (settings, conversations, memory entries, consent ledger,
                  license cache), the OpenClaw engine working tree, and your
                  installed skills. Every JSON file is scanned and any field
                  whose name suggests a credential (token, secret, key,
                  password, webhook) is replaced with the placeholder
                  &quot;redacted-on-export&quot; before the zip is written. A
                  manifest at the root of the archive lists what was excluded,
                  what was redacted, and what was retained.
                </li>
                <li>
                  <strong className="text-text-primary">Delete.</strong>{' '}
                  Settings, Legal, Delete All My Data wipes the local
                  database, removes your installed skills, and resets the
                  app. When your computer is online at the time of deletion,
                  the app also calls Lemon Squeezy to release your activation
                  slot so you can re-use the same license key on another
                  machine.
                </li>
                <li>
                  <strong className="text-text-primary">Rectify.</strong> You
                  can edit memory entries directly in the Memory panel and
                  delete individual conversations from the chat sidebar.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Disconnect at any time.
                  </strong>{' '}
                  Remove any AI provider, channel, or MCP server from
                  Settings; the connection ends immediately.
                </li>
              </ul>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Verification</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                You do not have to take our word for the claims on this page.
                The full in-app privacy policy lives at Settings, Legal,
                Privacy Policy and describes every category of data the app
                holds, where it lives, and where it travels. The marketing
                site&apos;s{' '}
                <a
                  href="/privacy"
                  className="text-accent underline hover:text-text-primary"
                >
                  privacy notice
                </a>{' '}
                covers what this website itself collects (nothing beyond
                standard host-level metadata at the Cloudflare edge). For the
                desktop application, our practice is that no content of your
                work or prompts leaves your device by default; the BYOK
                connections you configure are the only data flows that send
                prompts off your computer, and they go directly to the
                provider you chose.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Contact</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                For privacy and data-rights questions, contact{' '}
                <a
                  href="mailto:info@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@clawless.ai
                </a>
                . For suspected security vulnerabilities, contact{' '}
                <a
                  href="mailto:security@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  security@clawless.ai
                </a>
                ; we aim to acknowledge within five business days, per the
                published{' '}
                <a
                  href="https://rbjglobal.com/legal/security"
                  className="text-accent underline hover:text-text-primary"
                >
                  responsible-disclosure policy
                </a>
                .
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
