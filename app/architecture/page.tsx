import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ArchitectureFlow from '@/components/oss/ArchitectureFlow';
import { PageHead, Source } from '@/components/oss/Shell';
import { CONNECTIONS, ENGINE_VERSION, PRELAUNCH, TRUST } from '@/components/oss/content';

export const metadata: Metadata = pageMetadata('/architecture/', {
  title: 'Architecture',
  description:
    'How Clawless Computer is put together: one bridge between the interface and the OpenClaw engine, with your data kept on your Mac. An interactive map of every part.',
});

export default function Architecture() {
  return (
    <>
      <PageHead
        eyebrow="Architecture"
        title="One bridge between the interface and the engine. Everything else stays on your Mac."
        lede={
          PRELAUNCH
            ? 'The map below is drawn from the open source tree, which is published at launch. Click any part to see what it does and the files that implement it, or trace a single message from the chat box to the model and back.'
            : 'The map below is drawn from the open source tree. Click any part to see what it does and open the files that implement it, or trace a single message from the chat box to the model and back.'
        }
      />

      {/* Wider than the reading column so the diagram renders near full size. */}
      <section className="mx-auto max-w-[1480px] px-6 py-16">
        <ArchitectureFlow />
      </section>

      <section className="oss-wrap grid gap-10 py-16 lg:grid-cols-3">
        {[
          {
            t: 'A single bridge',
            b: 'The UI reaches the engine through exactly one call, window.clawless.gateway.rpc(method, params). The renderer has no other way in.',
            s: 'src/preload/index.ts',
          },
          {
            t: 'One adapter boundary',
            b: 'Only openclaw-engine.ts imports engine-specific code. The rest of the app works against a generic engine interface.',
            s: 'src/main/engine/openclaw-engine.ts',
          },
          {
            t: 'Local only, by address',
            b: 'The engine gateway and the event bridge listen on 127.0.0.1. The bridge rejects any connection that is not local.',
            s: 'src/main/engine/bridge-server.ts',
          },
        ].map((x) => (
          <div key={x.t}>
            <h2 className="oss-h3">{x.t}</h2>
            <p className="oss-body mt-2">{x.b}</p>
            <div className="mt-3">
              <Source path={x.s} />
            </div>
          </div>
        ))}
      </section>

      <section className="border-y border-[var(--oss-line)] bg-[var(--oss-surface-2)]">
        <div className="oss-wrap py-20">
          <p className="oss-eyebrow">Every connection the app makes</p>
          <h2 className="oss-h2 mt-4 max-w-2xl">The complete list, as the repository documents it.</h2>
          <div className="oss-card mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--oss-line)] text-[var(--oss-muted)]">
                  <th className="px-5 py-3 font-medium">Destination</th>
                  <th className="px-5 py-3 font-medium">When</th>
                  <th className="px-5 py-3 font-medium">What it carries</th>
                </tr>
              </thead>
              <tbody>
                {CONNECTIONS.map((c) => (
                  <tr key={c.name} className="border-b border-[var(--oss-line)] last:border-0">
                    <td className="px-5 py-4 font-semibold text-[var(--oss-ink)]">{c.name}</td>
                    <td className="px-5 py-4 text-[var(--oss-ink-2)]">{c.when}</td>
                    <td className="px-5 py-4 text-[var(--oss-ink-2)]">{c.carries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="oss-body mt-6 max-w-2xl">
            Clawless adds no telemetry, analytics or crash reporting, and it turns off the bundled engine's optional usage telemetry and version check. Apart from the provider you
            send a message to, and any channel you choose to chat through, none of them carry your conversations, memories or keys.
          </p>
          <div className="mt-3">
            <Source path="PRIVACY.md" />
          </div>
        </div>
      </section>

      <section className="oss-wrap py-20">
        <p className="oss-eyebrow">What you are trusting to whom</p>
        <h2 className="oss-h2 mt-4 max-w-2xl">The same trust model as any software that uses an AI API, written down.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {TRUST.map((t) => (
            <div key={t.party} className="oss-card p-6">
              <p className="oss-h3">{t.party}</p>
              <p className="oss-body mt-2">You trust them {t.trust}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Source path="docs/knowledge-base/whats-under-the-hood.md" />
        </div>
        <p className="oss-small mt-10">OpenClaw is a separate open source project under the MIT license. Clawless bundles version {ENGINE_VERSION}.</p>
      </section>
    </>
  );
}
