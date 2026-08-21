export default function Footer() {
  return (
    <footer className="bg-main text-bg">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <h2 className="font-mono text-3xl font-bold leading-tight sm:text-4xl">
          Let&apos;s build something together.
        </h2>
        <p className="max-w-xs text-sm text-bg/70">
          Open to Flutter mobile roles, contracts, and technical projects.
        </p>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-3 border-t border-bg/15 px-6 py-6 font-mono text-xs uppercase tracking-wide text-bg/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-wrap gap-4">
          <span>hello@sarahaider.dev</span>
          <span className="text-bg/30">·</span>
          <span>Lahore, PK</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="transition-colors hover:text-bg">
            Github
          </a>
          <a href="#" className="transition-colors hover:text-bg">
            LinkedIn
          </a>
          <a href="#" className="transition-colors hover:text-bg">
            Email
          </a>
        </div>
        <span>© 2026 Sara Haider · Portfolio</span>
      </div>
    </footer>
  );
}
