import Link from "next/link";
import LiveClock from "@/components/LiveClock";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

// Server Component — the name is the logo. Everything else stays quiet under it.
export default function Nav() {
  return (
    <header className="border-b border-line bg-bg">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 pb-6 pt-10 sm:px-8">
        <div className="flex items-start justify-between gap-6">
          <Link
            href="/"
            className="group inline-flex items-baseline font-mono text-[13vw] font-bold leading-[0.85] tracking-tight text-main sm:text-[7rem] md:text-[8rem]"
          >
            SARA
            <span className="ml-1 text-accent-warm">.</span>
          </Link>
          <div className="mt-2 flex shrink-0 flex-col items-end gap-1 pt-2 text-right">
            <LiveClock />
            <span className="font-mono text-xs uppercase tracking-wide text-text/60">
              Based in Lahore, PK
            </span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 font-mono text-sm uppercase tracking-wide">
          <div className="flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-text transition-colors hover:text-main after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-4 text-text/60">
            <a
              href="https://github.com/haidersara"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-main"
            >
              GH
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-main"
            >
              LI
            </a>
            <a
              href="mailto:haidersara456@gmail.com"
              className="transition-colors hover:text-main"
            >
              EM
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
