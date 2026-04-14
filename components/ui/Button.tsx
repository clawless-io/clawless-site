'use client';

import { type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'disabled';
type ButtonSize = 'sm' | 'default' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pulse?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'border-none text-white cursor-pointer',
  secondary:
    'border border-border-light bg-bg-surface text-text-primary cursor-pointer hover:bg-bg-surface-hover hover:border-text-muted',
  disabled: 'border border-border-default bg-bg-surface text-text-muted cursor-not-allowed opacity-35',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[13px] rounded-lg',
  default: 'px-8 py-3.5 text-[15px] rounded-xl',
  lg: 'px-11 py-[18px] text-[17px] rounded-[14px] min-h-[56px]',
};

export default function Button({
  variant = 'primary',
  size = 'default',
  pulse = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-250 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={
        isPrimary
          ? {
              background: 'linear-gradient(135deg, #00D4FF, #22FFAA)',
              color: '#05070F',
              boxShadow: '0 0 24px rgba(0, 212, 255, 0.25)',
              ...(pulse ? { animation: 'subtlePulse 3s ease-in-out infinite' } : {}),
            }
          : undefined
      }
      onMouseEnter={(e) => {
        if (isPrimary) {
          const el = e.currentTarget;
          el.style.boxShadow = '0 0 48px rgba(0, 212, 255, 0.45)';
          el.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (isPrimary) {
          const el = e.currentTarget;
          el.style.boxShadow = '0 0 24px rgba(0, 212, 255, 0.25)';
          el.style.transform = 'translateY(0)';
        }
      }}
      disabled={variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
}
