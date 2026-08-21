import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <Reveal>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16 sm:px-8">
        <h1 className="font-mono text-3xl font-bold text-main">Contact</h1>
        <div className="glass max-w-xl rounded-lg border border-line p-6 shadow-[0_20px_40px_-28px_rgba(28,51,48,0.5)]">
          <p className="text-lg text-text/80">
            Placeholder — email and LinkedIn links go here. No contact form,
            per sitemap.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
