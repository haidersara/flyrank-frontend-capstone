"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const settingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  bio: z.string().max(200, "Bio must be 200 characters or fewer"),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

const inputClassName =
  "rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600 dark:focus:border-zinc-600";

const labelClassName =
  "text-sm font-medium text-zinc-700 dark:text-zinc-300";

const errorClassName =
  "text-sm text-red-600 dark:text-red-400";

export function SettingsForm() {
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  });

  async function onSubmit(data: SettingsFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    reset(data);
    setSaved(true);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={labelClassName}>
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClassName}
          {...register("name", {
            onChange: () => setSaved(false),
          })}
        />
        {errors.name && (
          <p id="name-error" className={errorClassName}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClassName}
          {...register("email", {
            onChange: () => setSaved(false),
          })}
        />
        {errors.email && (
          <p id="email-error" className={errorClassName}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bio" className={labelClassName}>
          Bio
        </label>
        <textarea
          id="bio"
          rows={4}
          aria-invalid={errors.bio ? true : undefined}
          aria-describedby={errors.bio ? "bio-error" : undefined}
          className={`${inputClassName} resize-y`}
          {...register("bio", {
            onChange: () => setSaved(false),
          })}
        />
        {errors.bio && (
          <p id="bio-error" className={errorClassName}>
            {errors.bio.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        {saved ? (
          <p
            role="status"
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400"
          >
            Settings saved
          </p>
        ) : (
          <span aria-hidden="true" />
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#ccc] sm:ml-auto"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
