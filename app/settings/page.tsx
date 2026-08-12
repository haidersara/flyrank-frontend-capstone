import Link from "next/link";
import { SettingsForm } from "../components/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-12 sm:px-8 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex w-fit items-center text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Back to home
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Settings
          </h1>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
            Update your profile information.
          </p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
          <SettingsForm />
        </div>
      </main>
    </div>
  );
}
