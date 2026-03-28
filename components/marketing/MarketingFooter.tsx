import { BrandLogo } from "@/components/marketing/BrandLogo";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Early access", href: "#early-access" },
];

const companyLinks = [
  { label: "About", href: "#hero" },
  { label: "Contact", href: "#early-access" },
];

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="label-caps text-[var(--on-surface-variant)]">{title}</p>
      <ul className="mt-6 space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-sm text-[var(--secondary-text)] transition-colors hover:text-[var(--on-surface)]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MarketingFooter() {
  return (
    <footer className="bg-[var(--surface-container-low)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-16 xl:px-20 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="text-[var(--on-surface)]">
              <BrandLogo className="h-11" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--on-surface-variant)]">
              One clear next action—so you can stop juggling lists and start
              finishing what matters.
            </p>
          </div>
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>
        <div className="mt-16 pt-8 text-center text-xs text-[var(--secondary-text)]">
          © {new Date().getFullYear()} Colado. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
