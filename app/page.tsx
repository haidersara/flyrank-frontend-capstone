import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20 sm:px-8">
      <p className="font-mono text-sm uppercase tracking-wide text-accent">
        Flutter mobile developer
      </p>
      <h1 className="font-mono text-4xl font-bold leading-tight text-main sm:text-5xl">
        I build functional, working Flutter mobile apps.
      </h1>
      <p className="max-w-xl text-lg text-text/80">
        Placeholder intro — proof is Melodies, a Flutter music app with real
        background audio playback. Full write-up lives in Work.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/work"
          className="rounded-md bg-main px-5 py-3 font-mono text-sm font-bold text-bg transition-opacity hover:opacity-90"
        >
          See the work
        </Link>
        <a
          href="#"
          className="rounded-md border border-main px-5 py-3 font-mono text-sm font-bold text-main transition-colors hover:bg-main hover:text-bg"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}
