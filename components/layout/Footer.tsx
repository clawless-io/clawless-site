import FollowLinkedIn from '@/components/FollowLinkedIn';
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
              src="/logo-lockup-footer.svg"
              alt=""
              width={270}
              height={36}
              className="mx-auto h-9 w-auto sm:mx-0"
            />
          </a>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{tagline}</p>
        </div>

        {/* Family of products: sibling sites + parent org. Self-excluded. */}
        <div className="mb-10 border-t border-border-light pt-8 text-center sm:text-left">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            Family
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:justify-start">
            <a
              href="https://clawdemy.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              Clawdemy
            </a>
            <a
              href="https://whisprdesk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              WhisprDesk
            </a>
            <a
              href="https://tradingagentslab.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              Trading Agents Lab
            </a>
            <a
              href="https://iluvmd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              iLoveMD
            </a>
            <a
              href="https://rbjglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              RBJ Global
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border-light pt-6 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} RBJ Global LLC. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:justify-end">
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
              href="/subprocessors"
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              Subprocessors
            </a>
            <a
              href="/terms"
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              Terms
            </a>
            <a
              href="/refunds"
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              Refunds
            </a>
            <a
              href="/acceptable-use"
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              Acceptable Use
            </a>
            <a
              href="/trust"
              className="text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              Trust
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
            <FollowLinkedIn companyId="114564073" variant="subtle" />
          </div>
        </div>
      </div>
    </footer>
  );
}
