import type { FooterContent } from '@/lib/cms-types';

interface Props {
  content: FooterContent;
}

export default function Footer({ content }: Props) {
  const { tagline, openClawUrl } = content;

  return (
    <footer className="border-t border-border-light px-8 pb-10 pt-[60px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Brand block */}
        <div className="mb-10 text-center sm:text-left">
          <a
            href="/"
            aria-label="Clawless Computer, home"
            className="inline-flex items-center"
          >
            <img
              src="/logo-lockup.svg"
              alt=""
              width={270}
              height={36}
              className="mx-auto h-9 w-auto sm:mx-0"
            />
          </a>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{tagline}</p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border-light pt-6 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} RBJ Global LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <a
              href="/about"
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              About
            </a>
            <a
              href="/privacy"
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              Terms
            </a>
            <span className="text-text-muted">
              Built on top of{' '}
              <a
                href={openClawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors duration-200 hover:text-text-primary"
              >
                OpenClaw
              </a>
            </span>
            <span className="text-text-muted">
              A product of{' '}
              <a
                href="https://rbjglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors duration-200 hover:text-text-primary"
              >
                RBJ Global
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
