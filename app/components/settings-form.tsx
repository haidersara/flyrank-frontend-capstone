"use client";

import { useState } from "react";

type Settings = {
  displayName: string;
  email: string;
  timezone: string;
  language: string;
  emailAlerts: boolean;
  weeklyDigest: boolean;
  apiKey: string;
};

const defaultSettings: Settings = {
  displayName: "",
  email: "",
  timezone: "UTC",
  language: "en",
  emailAlerts: true,
  weeklyDigest: false,
  apiKey: "",
};

const timezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Karachi",
  "Australia/Sydney",
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

export function SettingsForm() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  function updateField<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saved");
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-10">
      <section className="flex flex-col gap-5">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Profile
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Basic account information used across FlyRank.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Display name
            <input
              type="text"
              value={settings.displayName}
              onChange={(e) => updateField("displayName", e.target.value)}
              placeholder="Jane Doe"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
            <input
              type="email"
              value={settings.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600"
            />
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-zinc-200 pt-10 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Preferences
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Customize how FlyRank displays data and reports.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Timezone
            <select
              value={settings.timezone}
              onChange={(e) => updateField("timezone", e.target.value)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal text-zinc-950 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Language
            <select
              value={settings.language}
              onChange={(e) => updateField("language", e.target.value)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal text-zinc-950 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            >
              {languages.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-zinc-200 pt-10 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Choose when FlyRank should reach out to you.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div>
              <span className="block text-sm font-medium text-zinc-950 dark:text-zinc-50">
                Email alerts
              </span>
              <span className="block text-sm text-zinc-600 dark:text-zinc-400">
                Get notified when ranking changes exceed your threshold.
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => updateField("emailAlerts", e.target.checked)}
              className="size-4 shrink-0 accent-zinc-950 dark:accent-zinc-50"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div>
              <span className="block text-sm font-medium text-zinc-950 dark:text-zinc-50">
                Weekly digest
              </span>
              <span className="block text-sm text-zinc-600 dark:text-zinc-400">
                Receive a summary of your site performance every Monday.
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.weeklyDigest}
              onChange={(e) => updateField("weeklyDigest", e.target.checked)}
              className="size-4 shrink-0 accent-zinc-950 dark:accent-zinc-50"
            />
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-zinc-200 pt-10 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            API access
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Connect FlyRank to external tools and automations.
          </p>
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          API key
          <input
            type="password"
            value={settings.apiKey}
            onChange={(e) => updateField("apiKey", e.target.value)}
            placeholder="sk-..."
            autoComplete="off"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm font-normal text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600"
          />
        </label>
      </section>

      <div className="flex flex-col gap-3 border-t border-zinc-200 pt-10 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        {status === "saved" && (
          <p
            role="status"
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400"
          >
            Settings saved successfully.
          </p>
        )}
        {status !== "saved" && <span />}

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:ml-auto"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}
