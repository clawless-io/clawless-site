'use client';

interface FollowLinkedInProps {
  companyId: string;
  label?: string;
  variant?: 'primary' | 'subtle';
}

export default function FollowLinkedIn({
  companyId,
  label = 'Follow on LinkedIn',
  variant = 'primary',
}: FollowLinkedInProps) {
  const primaryClass =
    'inline-flex min-h-[56px] items-center justify-center gap-2 rounded-[14px] px-11 py-[18px] text-[17px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(0,212,255,0.45)]';
  const subtleClass =
    'inline-flex items-center gap-2 text-xs text-text-muted transition-colors duration-200 hover:text-text-primary';

  return (
    <a
      href={`https://www.linkedin.com/company/${companyId}/`}
      target="_blank"
      rel="noopener noreferrer"
      className={variant === 'primary' ? primaryClass : subtleClass}
      style={
        variant === 'primary'
          ? {
              background:
                'linear-gradient(135deg, var(--color-accent), var(--color-success))',
              color: 'var(--color-bg-primary)',
              boxShadow: '0 0 24px rgba(0, 212, 255, 0.25)',
            }
          : undefined
      }
      aria-label="Follow Clawless on LinkedIn. Opens LinkedIn in a new tab."
      data-component="follow-linkedin"
    >
      <svg
        width={variant === 'primary' ? 18 : 14}
        height={variant === 'primary' ? 18 : 14}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
