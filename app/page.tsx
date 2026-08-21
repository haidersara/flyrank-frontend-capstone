import Link from "next/link";
import PhoneStack from "@/components/PhoneStack";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <div className="grid-fade flex min-h-[70vh] items-center">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-8 md:grid-cols-2 md:py-24">
        <Reveal>
          <div className="flex flex-col gap-8">
            <p className="font-mono text-sm uppercase tracking-wide text-accent">
              Flutter mobile developer
            </p>
            <h1 className="max-w-md text-2xl font-medium leading-snug text-main sm:text-3xl">
              I build functional, working Flutter mobile apps.
            </h1>
            <p className="max-w-xl text-lg text-text/80">
              Placeholder intro — proof is Melodies, a Flutter music app with
              real background audio playback. Full write-up lives in Work.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className="rounded-md bg-main px-5 py-3 font-mono text-sm font-bold text-bg shadow-[0_10px_30px_-12px_rgba(28,51,48,0.6)] transition-transform hover:-translate-y-0.5 hover:opacity-90"
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
        </Reveal>

        <Reveal delay={150}>
          <PhoneStack />
        </Reveal>
      </div>
    </div>
  );
}
