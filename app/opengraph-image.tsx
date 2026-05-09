import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

export const alt = 'Clawless Computer, an operating system for AI.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, #05070F 0%, #05070F 60%, #0A1530 100%)',
          padding: '80px',
          color: '#f1f5f9',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 14,
              height: 60,
              background: '#00D4FF',
              marginRight: 28,
              boxShadow: '0 0 24px rgba(0, 212, 255, 0.5)',
            }}
          />
          <div
            style={{
              fontSize: 26,
              color: '#94a3b8',
              letterSpacing: '0.16em',
              fontWeight: 500,
            }}
          >
            CLAWLESS.AI
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              color: '#00D4FF',
              marginBottom: 28,
              letterSpacing: '-0.02em',
              fontWeight: 700,
            }}
          >
            Clawless Computer
          </div>
          <div
            style={{
              fontSize: 42,
              lineHeight: 1.3,
              color: '#f1f5f9',
              fontWeight: 500,
            }}
          >
            An operating system for AI.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.5,
              color: '#94a3b8',
              marginTop: 28,
              maxWidth: 1000,
            }}
          >
            Run agents, models, and tools on your Mac or Ubuntu desktop. Built
            on top of OpenClaw.
          </div>
        </div>
      </div>
    ),
    size
  );
}
