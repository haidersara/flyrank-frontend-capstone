import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

// Server Component — pure links, no client-side state needed.
export default function Nav() {
  return (
    <header className="border-b border-main/10 bg-white">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link href="/" className="font-mono text-lg font-bold text-main">
          sara<span className="text-accent">.</span>
        </Link>
        <nav className="flex gap-6 font-mono text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text transition-colors hover:text-main"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
