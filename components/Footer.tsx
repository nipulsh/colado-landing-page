import Link from "next/link";

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      width={16}
      height={16}
      aria-hidden
    >
      <path d="M17.5 3h2.9l-6.34 7.24L21.5 21h-5.85l-4.58-5.98L5.8 21H2.9l6.78-7.74L2.5 3h6l4.13 5.46L17.5 3zm-1.02 16h1.61L7.6 4.9H5.87L16.48 19z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      width={16}
      height={16}
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v15H.22V8zm7.5 0h4.37v2.05h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.31h-4.56v-7.37c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.83 1.91-2.83 3.89V23H7.72V8z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--bg)]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 sm:gap-12 sm:px-8 sm:py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-20 lg:px-12">
        <div className="sm:col-span-2 md:col-span-1">
          <Link
            href="/"
            className="display text-[32px] leading-none text-[var(--ink)] sm:text-[36px]"
          >
            Colado
          </Link>
          <p className="mt-3 inst-sm">An instrument for the next move.</p>
          <p className="mt-6 max-w-[360px] text-[14px] leading-relaxed text-[var(--ink-soft)] sm:text-[15px]">
            The quiet second brain for founders and students. Built with care,
            released to the quiet few.
          </p>
        </div>

        <div>
          <h4 className="inst">Contents</h4>
          <ul className="mt-5 flex flex-col gap-3 text-[14px] sm:text-[15px]">
            {[
              { href: "#live", label: "Try it" },
              { href: "#method", label: "Method" },
              { href: "#audience", label: "Audience" },
              { href: "#fin", label: "Request access" },
            ].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group flex items-baseline gap-3 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="inst">Correspondence</h4>
          <ul className="mt-5 flex flex-col gap-3 text-[14px] sm:text-[15px]">
            <li>
              <a
                href="mailto:hello@colado.in"
                className="text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
              >
                hello@colado.in
              </a>
            </li>
            <li className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com/coladoapp"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--muted)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://linkedin.com/company/colado"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--muted)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                <LinkedinIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--hairline)]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-3 px-5 py-5 sm:flex-row sm:items-center sm:px-8 sm:py-6 lg:px-12">
          <p className="folio tnum">
            MMXXVI · Made with care · colado.in
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="inst-sm hover:text-[var(--ink)]"
            >
              Privacy
            </Link>
            <Link href="/terms" className="inst-sm hover:text-[var(--ink)]">
              Terms
            </Link>
            <a
              href="#hero"
              className="inst-sm hover:text-[var(--ink)]"
              aria-label="Return to top"
            >
              Return to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
