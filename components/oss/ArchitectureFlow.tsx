'use client';

/**
 * Interactive architecture of Clawless Computer, built ONLY from the public
 * open-source tree (RBJGlobal/clawless-computer, reviewed at 4e02af4, re-checked
 * 2026-11-06 against branch engine-upgrade at 4151e86). Every node cites the files that back it.
 *
 * Descriptions paraphrase what each file's own header comment says the code
 * DOES. Internal narrative in those comments (ticket ids, design-review dates,
 * porting history) is deliberately left out.
 *
 * Two claims were checked against the implementation and narrowed:
 *  - The engine is described as a "managed child process", not "sandboxed".
 *    A comment in process-manager.ts says sandboxed; the code is a detached
 *    spawn with no sandbox mechanism, so the stronger word is not used.
 *  - SQLite is not "UI state only": the memory store and the cached skill
 *    catalog also live there (memory-types.ts, ClawHubCatalogService.ts).
 *
 * React Flow notes (family pattern): nodeTypes at module scope; Background
 * takes a colour LITERAL, not a CSS variable.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  MarkerType,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { blob, ENGINE_VERSION, PRELAUNCH, SEND_PATH } from './content';
import { RepoLink } from './RepoLink';
import { useOssTheme } from './Theme';

/* ── Detail content ──────────────────────────────────────────────── */

type Detail = {
  title: string;
  kicker: string;
  body: string;
  points?: string[];
  files?: string[];
  doc?: string;
};

const E = 'src/main/engine/';
const S = 'src/main/services/';

const DETAILS: Record<string, Detail> = {
  renderer: {
    title: 'Renderer',
    kicker: 'React UI',
    body: 'Everything you see: chat, agents, memory, skills and settings. The UI never talks to the engine directly. Every engine call goes through one bridge.',
    points: ['Typed wrappers around that single call live in one file'],
    files: ['src/renderer/services/gateway.ts'],
  },
  preload: {
    title: 'Preload bridge',
    kicker: 'window.clawless',
    body: 'The only surface the UI can reach. It exposes one core call, gateway.rpc(method, params), which forwards to the main process over Electron IPC.',
    points: ['One bridge call carries all engine traffic', 'Forwarded with ipcRenderer.invoke("gateway:rpc")'],
    files: ['src/preload/index.ts'],
  },
  engine: {
    title: 'Engine adapter',
    kicker: 'The boundary to OpenClaw',
    body: 'openclaw-engine.ts is the only file that imports OpenClaw-specific code. The rest of Clawless talks to a generic engine interface, so the engine stays swappable and the boundary stays auditable.',
    points: [
      'process-manager starts, health-checks and stops the engine as a managed child process',
      'gateway-client speaks the gateway WebSocket protocol: request, response and event frames',
      'event-translator turns raw engine events into typed Clawless events',
      'config-writer is the one place that knows the engine config schema',
      'bridge-server accepts engine events on a 127.0.0.1 port and rejects anything non-local',
    ],
    files: [`${E}openclaw-engine.ts`, `${E}process-manager.ts`, `${E}gateway-client.ts`, `${E}event-translator.ts`, `${E}config-writer.ts`, `${E}bridge-server.ts`],
  },
  security: {
    title: 'Security layer',
    kicker: 'Agent output is untrusted',
    body: 'The code treats what an agent produces as untrusted input. Approvals fail closed, media paths are validated before rendering, and agent-written content is scanned before it is saved or run.',
    points: [
      'A tool approval that times out is denied, not allowed',
      'File paths an agent emits are validated as hostile input',
      'Agent-authored content is threat-scanned before it is persisted or executed',
      'Signed builds check their own app archive for tampering',
      'Models known to break this engine are kept out of the picker',
    ],
    files: [`${S}ApprovalPolicyOverride.ts`, `${S}MediaResolver.ts`, `${S}AgentAuthoredContentScan.ts`, `${S}AsarIntegrity.ts`, `${E}model-denylist.ts`],
  },
  memory: {
    title: 'Memory',
    kicker: 'Local, hybrid search',
    body: 'Long-term memory lives in local SQLite, independent of engine sessions. Retrieval combines full-text ranking with vector similarity.',
    points: [
      'Hybrid search: BM25 full-text plus vector cosine similarity',
      'With automatic saving turned on (off by default), facts worth keeping are extracted from recent conversations',
      'Idle memories move to a Decayed tier; pinned memories never decay',
      'Embeddings from your provider or a local Ollama model',
    ],
    files: [`${S}MemoryEngine.ts`, `${S}MemoryClassifier.ts`, `${S}MemoryDecayScheduler.ts`, `${S}EmbeddingProvider.ts`],
    doc: 'docs/knowledge-base/memory-system.md',
  },
  skills: {
    title: 'Skills',
    kicker: 'Three layers of checks',
    body: 'A skill is checked before it is installed. The public catalog is cached locally so browsing does not hit the network on every view.',
    points: [
      'Layer 0: the engine validates the skill manifest',
      'Layer 1: a local pattern scanner, always on',
      'Layer 2: VirusTotal, optional, with your own key',
    ],
    files: [`${S}SkillScanner.ts`, `${S}VirusTotalService.ts`, `${S}ClawHubCatalogService.ts`, `${S}SkillsIndexService.ts`],
    doc: 'docs/knowledge-base/skills-marketplace.md',
  },
  channels: {
    title: 'Channels and plugins',
    kicker: 'Messaging platforms',
    body: 'Clawless keeps a map of the engine plugins it surfaces and installs them through the engine’s own plugin installer.',
    points: ['Every channel except Telegram installs its plugin from the public npm registry'],
    files: [`${S}PluginCatalog.ts`, `${S}PluginInstaller.ts`],
    doc: 'docs/knowledge-base/channels-and-integrations.md',
  },
  data: {
    title: 'Cost, lock and your data',
    kicker: 'Local services',
    body: 'Spend limits, the app lock, attachments, updates, and exporting what is yours.',
    points: [
      'CostGuard: a monthly cap over engine-reported spend',
      'App lock: a PIN with a recovery code',
      'Attachments: text extraction, or files handed to the engine’s own tools',
      'Updates: checks against GitHub Releases; automatic checks are opt-in',
      'Data export: a portable archive designed to be safe to store or share',
    ],
    files: [`${S}CostGuard.ts`, `${S}LockService.ts`, `${S}AttachmentParser.ts`, `${S}UpdateManager.ts`, `${S}UserDataExport.ts`],
    doc: 'docs/knowledge-base/costguard.md',
  },
  gateway: {
    title: 'OpenClaw gateway',
    kicker: `MIT · v${ENGINE_VERSION}`,
    body: 'The engine, a separate open source project. It talks to AI providers, runs tools and skills, and manages sessions. Clawless bundles a tested version and runs it on your Mac, reached over a WebSocket on 127.0.0.1.',
    points: ['Bundled and version-pinned so the pairing is tested', 'Advanced users can run their own gateway instead'],
    files: ['package.json', `${E}gateway-client.ts`],
    doc: 'docs/knowledge-base/whats-under-the-hood.md',
  },
  sqlite: {
    title: 'SQLite',
    kicker: 'In your data folder',
    body: 'UI settings, the memory store, and the cached skill catalog.',
    files: [`${S}memory-types.ts`, `${S}ClawHubCatalogService.ts`],
  },
  engineData: {
    title: 'Engine data',
    kicker: 'In your data folder',
    body: 'The engine keeps your sessions and agent definitions on your computer.',
    doc: 'docs/knowledge-base/whats-under-the-hood.md',
  },
  keys: {
    title: 'Provider keys',
    kicker: 'The engine’s local database',
    body: 'Stored by the bundled engine in its local database inside your data folder, unencrypted but readable only by your user account. Clawless never displays a saved key. Turn on FileVault for stronger protection at rest.',
    files: [`${E}auth-migration.ts`, 'PRIVACY.md'],
  },
  provider: {
    title: 'Your AI provider',
    kicker: 'Your own key',
    body: 'Anthropic, OpenAI, Google, Groq and more. Messages go only to the AI provider you choose, with your own key. What happens to them there is governed by their terms.',
    files: ['README.md', 'PRIVACY.md'],
  },
  connected: {
    title: 'Services you connect',
    kicker: 'On your behalf',
    body: 'Messaging channels such as Telegram, web search, and the browser are contacted when you set them up or an agent uses them.',
    files: ['PRIVACY.md'],
  },
  clawhub: {
    title: 'ClawHub catalog',
    kicker: 'clawhub.ai',
    body: 'The list of community skills, downloaded only when you ask: opening the catalog when your copy is more than four hours old, or pressing Sync. Your search words are sent if you search. Never contacted in the background.',
    files: [`${S}ClawHubCatalogService.ts`, 'docs/knowledge-base/whats-under-the-hood.md'],
  },
  npm: {
    title: 'npm registry',
    kicker: 'Channel and web search plugins',
    body: 'Connecting a channel other than Telegram, or turning on web search, installs the matching OpenClaw plugin from the public npm registry.',
    files: ['PRIVACY.md'],
  },
  github: {
    title: 'GitHub update checks',
    kicker: 'Opt-in',
    body: 'When you check for updates, or turn automatic checks on, Clawless asks GitHub Releases whether a newer version exists. The request includes your version and platform.',
    files: ['PRIVACY.md'],
  },
  virustotal: {
    title: 'VirusTotal',
    kicker: 'Optional, default off',
    body: 'Only with your own key. Skills you install from the catalog are checked there first.',
    files: ['PRIVACY.md'],
  },
};

/* ── Node components ─────────────────────────────────────────────── */

type BoxData = { id: string; title: string; kicker: string; list?: string[]; tone?: 'core' | 'store' | 'out' | 'engine'; active?: boolean; dim?: boolean };
type RegionData = { label: string; sub?: string };

function Handles() {
  const s = { width: 6, height: 6, opacity: 0, border: 0, minWidth: 0, minHeight: 0 } as const;
  return (
    <>
      <Handle id="tl" type="target" position={Position.Left} style={s} />
      <Handle id="sr" type="source" position={Position.Right} style={s} />
      <Handle id="sl" type="source" position={Position.Left} style={s} />
      <Handle id="tr" type="target" position={Position.Right} style={s} />
      <Handle id="tt" type="target" position={Position.Top} style={s} />
      <Handle id="sb" type="source" position={Position.Bottom} style={s} />
      <Handle id="st" type="source" position={Position.Top} style={s} />
      <Handle id="tb" type="target" position={Position.Bottom} style={s} />
    </>
  );
}

function BoxNode({ data, selected }: NodeProps<Node<BoxData>>) {
  const tone = data.tone ?? 'core';
  const ring = data.active || selected;
  return (
    <div
      className={
        'h-full w-full cursor-pointer rounded-xl border px-3.5 py-3 transition-all duration-300 ' +
        (ring ? 'border-[var(--oss-accent)] ' : 'border-[var(--oss-line-strong)] ') +
        (tone === 'out' ? 'bg-[var(--oss-surface-2)] ' : 'bg-[var(--oss-surface)] ') +
        (data.dim ? 'opacity-35 ' : 'opacity-100 ')
      }
      style={{
        boxShadow: ring ? '0 0 0 4px var(--oss-accent-soft), var(--oss-shadow)' : 'var(--oss-shadow)',
        borderStyle: tone === 'store' ? 'dashed' : 'solid',
      }}
    >
      <Handles />
      <div className="flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: ring || tone === 'engine' ? 'var(--oss-accent-bright)' : 'var(--oss-line-strong)' }}
        />
        <span className="oss-display text-[0.98rem] font-semibold leading-tight text-[var(--oss-ink)]">{data.title}</span>
      </div>
      <div className="oss-mono mt-1 truncate text-[0.72rem] leading-snug text-[var(--oss-muted)]">{data.kicker}</div>
      {data.list && (
        <ul className="mt-2 space-y-0.5 border-t border-[var(--oss-line)] pt-2">
          {data.list.map((f) => (
            <li key={f} className="oss-mono truncate text-[0.62rem] leading-[1.45] text-[var(--oss-ink-2)]">
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RegionNode({ data }: NodeProps<Node<RegionData>>) {
  return (
    <div className="pointer-events-none h-full w-full rounded-[22px] border border-dashed border-[var(--oss-line-strong)] bg-[color-mix(in_srgb,var(--oss-surface-2)_45%,transparent)]">
      <div className="px-4 pt-3">
        <span className="oss-eyebrow">{data.label}</span>
        {data.sub && <span className="oss-mono ml-2 text-[0.66rem] text-[var(--oss-muted)]">{data.sub}</span>}
      </div>
    </div>
  );
}

const nodeTypes = { box: BoxNode, region: RegionNode };

/* ── Graph ───────────────────────────────────────────────────────── */

const box = (id: string, x: number, y: number, w: number, h: number, extra: Partial<BoxData> = {}, parentId?: string): Node<BoxData> => ({
  id,
  type: 'box',
  position: { x, y },
  data: { id, title: DETAILS[id].title, kicker: DETAILS[id].kicker, ...extra },
  style: { width: w, height: h },
  ...(parentId ? { parentId, extent: 'parent' as const } : {}),
});

/*
 * Compact layout, revised after the founder's review: the first version was
 * ~1450px wide with file lists inside every cluster, so fitView shrank it to
 * illegible. Clusters now sit in ONE column so every outbound edge leaves to the
 * right without crossing another cluster; file lists live in the detail panel.
 */
const COL = (i: number) => 46 + i * 84; // cluster rows inside the main process

const BASE_NODES: Node[] = [
  { id: 'mac', type: 'region', position: { x: 0, y: 0 }, data: { label: 'Your Mac' }, style: { width: 770, height: 724 }, selectable: false, draggable: false },
  { id: 'main', type: 'region', position: { x: 226, y: 36 }, data: { label: 'Main process', sub: 'src/main/' }, parentId: 'mac', extent: 'parent', style: { width: 270, height: 560 }, selectable: false, draggable: false },

  box('renderer', 24, 78, 172, 62, {}, 'mac'),
  box('preload', 24, 268, 172, 62, {}, 'mac'),

  box('engine', 16, COL(0), 238, 62, { tone: 'engine' }, 'main'),
  box('skills', 16, COL(1), 238, 62, {}, 'main'),
  box('channels', 16, COL(2), 238, 62, {}, 'main'),
  box('data', 16, COL(3), 238, 62, {}, 'main'),
  box('security', 16, COL(4), 238, 62, {}, 'main'),
  box('memory', 16, COL(5), 238, 62, {}, 'main'),

  box('gateway', 544, 64, 200, 80, { tone: 'engine' }, 'mac'),
  box('engineData', 544, 478, 200, 58, { tone: 'store' }, 'mac'),
  box('keys', 544, 556, 200, 58, { tone: 'store' }, 'mac'),
  box('sqlite', 544, 634, 200, 58, { tone: 'store' }, 'mac'),

  box('provider', 810, 40, 210, 62, { tone: 'out' }),
  box('connected', 810, 118, 210, 62, { tone: 'out' }),
  box('clawhub', 810, 196, 210, 62, { tone: 'out' }),
  box('virustotal', 810, 274, 210, 62, { tone: 'out' }),
  box('npm', 810, 352, 210, 62, { tone: 'out' }),
  box('github', 810, 430, 210, 62, { tone: 'out' }),
];

type EdgeSpec = { id: string; s: string; t: string; sh: string; th: string; label?: string; dashed?: boolean; returnOnly?: boolean; spine?: boolean };

const EDGES: EdgeSpec[] = [
  { id: 'r-p', spine: true, s: 'renderer', t: 'preload', sh: 'sb', th: 'tt', label: 'gateway.rpc()' },
  { id: 'p-e', spine: true, s: 'preload', t: 'engine', sh: 'sr', th: 'tl', label: 'IPC' },
  { id: 'e-g', spine: true, s: 'engine', t: 'gateway', sh: 'sr', th: 'tl', label: 'WebSocket' },
  { id: 'g-prov', s: 'gateway', t: 'provider', sh: 'sr', th: 'tl', label: 'your key' },
  { id: 'g-conn', s: 'gateway', t: 'connected', sh: 'sr', th: 'tl' },
  { id: 'g-ed', s: 'gateway', t: 'engineData', sh: 'sb', th: 'tt' },
  { id: 'e-keys', s: 'engine', t: 'keys', sh: 'sr', th: 'tl', dashed: true },
  { id: 'mem-sql', s: 'memory', t: 'sqlite', sh: 'sr', th: 'tl', dashed: true },
  { id: 'sk-hub', s: 'skills', t: 'clawhub', sh: 'sr', th: 'tl' },
  { id: 'sk-vt', s: 'skills', t: 'virustotal', sh: 'sr', th: 'tl', dashed: true },
  { id: 'ch-npm', s: 'channels', t: 'npm', sh: 'sr', th: 'tl' },
  { id: 'd-gh', s: 'data', t: 'github', sh: 'sr', th: 'tl', dashed: true },
  // Return path, drawn only while the message trace is on it.
  { id: 'prov-g', s: 'provider', t: 'gateway', sh: 'sl', th: 'tr', label: 'streamed reply', returnOnly: true },
  { id: 'g-e', s: 'gateway', t: 'engine', sh: 'sl', th: 'tr', label: 'events \u00b7 bridge-server', returnOnly: true },
  { id: 'e-p', spine: true, s: 'engine', t: 'preload', sh: 'sl', th: 'tr', returnOnly: true },
  { id: 'p-r', spine: true, s: 'preload', t: 'renderer', sh: 'st', th: 'tb', returnOnly: true },
];

/** Message trace, one entry per step of SEND_PATH (whats-under-the-hood.md). */
const TRACE: { nodes: string[]; edges: string[] }[] = [
  { nodes: ['renderer', 'preload'], edges: ['r-p'] },
  { nodes: ['preload', 'engine', 'gateway'], edges: ['p-e', 'e-g'] },
  { nodes: ['gateway', 'provider'], edges: ['g-prov'] },
  { nodes: ['provider', 'gateway'], edges: ['prov-g'] },
  { nodes: ['gateway', 'engine'], edges: ['g-e'] },
  { nodes: ['engine', 'preload', 'renderer'], edges: ['e-p', 'p-r'] },
];

/** For a clicked node, which edges light up. */
const edgesOf = (id: string) => EDGES.filter((e) => !e.returnOnly && (e.s === id || e.t === id)).map((e) => e.id);

/* ── Component ───────────────────────────────────────────────────── */

export default function ArchitectureFlow() {
  const { theme } = useOssTheme();
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTrace = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const startTrace = () => {
    stopTrace();
    setSelected(null);
    setStep(0);
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s === null || s >= TRACE.length - 1) {
          stopTrace();
          return s;
        }
        return s + 1;
      });
    }, 1900);
  };

  useEffect(() => stopTrace, []);

  const activeNodes = useMemo(() => {
    if (step !== null) return new Set(TRACE[step].nodes);
    if (selected) return new Set([selected, ...EDGES.filter((e) => edgesOf(selected).includes(e.id)).flatMap((e) => [e.s, e.t])]);
    return null;
  }, [step, selected]);

  const activeEdges = useMemo(() => {
    if (step !== null) return new Set(TRACE[step].edges);
    if (selected) return new Set(edgesOf(selected));
    return null;
  }, [step, selected]);

  const nodes = useMemo(
    () =>
      BASE_NODES.map((n) =>
        n.type === 'box'
          ? { ...n, data: { ...n.data, active: activeNodes?.has(n.id) ?? false, dim: activeNodes ? !activeNodes.has(n.id) : false } }
          : n,
      ),
    [activeNodes],
  );

  const edges: Edge[] = useMemo(() => {
    const accent = theme === 'dark' ? '#22ffaa' : '#067a4c';
    const idle = theme === 'dark' ? 'rgba(255,255,255,0.22)' : 'rgba(11,13,18,0.24)';
    return EDGES.filter((e) => !e.returnOnly || activeEdges?.has(e.id)).map((e) => {
      const on = activeEdges?.has(e.id) ?? false;
      const dimmed = activeEdges ? !on : false;
      return {
        id: e.id,
        source: e.s,
        target: e.t,
        sourceHandle: e.sh,
        targetHandle: e.th,
        // Right-angle routing for the spine; curves elsewhere. Right angles made every
        // outbound edge bend on the same vertical, which read as one tangled bus.
        type: e.spine ? 'smoothstep' : 'default',
        animated: on,
        label: on || !activeEdges ? e.label : undefined,
        labelStyle: { fontSize: 10.5, fontFamily: 'ui-monospace, Menlo, monospace', fill: on ? accent : (theme === 'dark' ? '#c3cad3' : '#383d48') },
        labelBgStyle: { fill: theme === 'dark' ? '#0d1117' : '#ffffff' },
        labelBgPadding: [6, 3] as [number, number],
        labelBgBorderRadius: 4,
        style: {
          stroke: on ? accent : idle,
          strokeWidth: on ? 2.2 : 1.3,
          strokeDasharray: e.dashed && !on ? '5 5' : undefined,
          opacity: dimmed ? 0.18 : 1,
          transition: 'opacity 250ms ease',
        },
        markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: on ? accent : idle },
      };
    });
  }, [activeEdges, theme]);

  const detail = step !== null ? null : selected ? DETAILS[selected] : null;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="oss-card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--oss-line)] px-4 py-3">
          <div className="oss-small !text-[0.8rem]">Click any part to see what it does and the files behind it. Drag to pan.</div>
          <div className="flex gap-2">
            <button onClick={startTrace} className="oss-btn oss-btn-primary !py-1.5 !text-xs">
              {step === null ? 'Trace a message' : 'Replay'}
            </button>
            {(selected || step !== null) && (
              <button
                onClick={() => {
                  stopTrace();
                  setStep(null);
                  setSelected(null);
                }}
                className="oss-btn !py-1.5 !text-xs"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <div className="h-[600px] w-full md:h-[720px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.04 }}
            minZoom={0.3}
            maxZoom={1.8}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable
            zoomOnScroll={false}
            preventScrolling={false}
            onNodeClick={(_, n) => {
              if (n.type !== 'box') return;
              stopTrace();
              setStep(null);
              setSelected((cur) => (cur === n.id ? null : n.id));
            }}
            onPaneClick={() => {
              if (step === null) setSelected(null);
            }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={22} size={1.1} color={theme === 'dark' ? 'rgba(255,255,255,0.09)' : 'rgba(11,13,18,0.10)'} />
            <Controls showInteractive={false} position="bottom-right" />
          </ReactFlow>
        </div>
      </div>

      <aside className="oss-card h-fit p-5 lg:sticky lg:top-24" aria-live="polite">
        {step !== null ? (
          <>
            <p className="oss-eyebrow">
              Step {step + 1} of {SEND_PATH.length} · {SEND_PATH[step].who}
            </p>
            <p className="oss-h3 mt-3">{SEND_PATH[step].text}</p>
            <div className="mt-5 flex gap-1.5">
              {SEND_PATH.map((_, i) => (
                <span key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? 'var(--oss-accent-bright)' : 'var(--oss-line-strong)' }} />
              ))}
            </div>
            <p className="oss-small mt-5">
              The whole path runs between your computer and the provider you chose. There is no Clawless server in it.
            </p>
          </>
        ) : detail ? (
          <>
            <p className="oss-eyebrow">{detail.kicker}</p>
            <h3 className="oss-h3 mt-2">{detail.title}</h3>
            <p className="oss-body mt-3 !text-[0.92rem]">{detail.body}</p>
            {detail.points && (
              <ul className="mt-4 space-y-2">
                {detail.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[0.86rem] leading-relaxed text-[var(--oss-ink-2)]">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--oss-accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
            {(detail.files || detail.doc) && (
              <div className="mt-5 border-t border-[var(--oss-line)] pt-4">
                <p className="oss-small !text-[0.72rem] uppercase tracking-[0.12em]">{PRELAUNCH ? 'Source files, published at launch' : 'Read the source'}</p>
                <ul className="mt-2 space-y-1.5">
                  {[...(detail.files ?? []), ...(detail.doc ? [detail.doc] : [])].map((f) => (
                    <li key={f}>
                      <RepoLink href={blob(f)} mark={false} className="oss-mono text-[0.74rem] text-[var(--oss-accent)] hover:underline">
                        {f}
                      </RepoLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="oss-eyebrow">How it fits together</p>
            <h3 className="oss-h3 mt-2">Four layers, one bridge</h3>
            <p className="oss-body mt-3 !text-[0.92rem]">
              The React UI talks to the engine through a single call. The Electron main process runs the engine, local services and
              your data. The OpenClaw engine talks to the AI provider you choose.
            </p>
            <p className="oss-mono mt-4 rounded-lg border border-[var(--oss-line)] bg-[var(--oss-code-bg)] p-3 text-[0.7rem] leading-relaxed text-[var(--oss-ink-2)]">
              Renderer &rarr; preload bridge &rarr; main process &rarr; OpenClaw gateway
            </p>
            <p className="oss-small mt-4">Press Trace a message to follow one Send from the chat box to the model and back.</p>
          </>
        )}
      </aside>
    </div>
  );
}
