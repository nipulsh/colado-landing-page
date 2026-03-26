"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type EmailFormProps = {
  className?: string;
  formClassName?: string;
};

export function EmailForm({ className, formClassName }: EmailFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setDone(true);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className={cn("mx-auto w-full max-w-lg", className)}>
        <p className="text-center font-display text-xl text-[var(--colado-ink)] md:text-2xl">
          You&apos;re in.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-lg", className)}>
      <form
        onSubmit={onSubmit}
        className={cn("flex w-full flex-col gap-4", formClassName)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="early-access-name"
              className="text-left text-xs font-medium text-[var(--colado-muted)]"
            >
              Name
            </label>
            <Input
              id="early-access-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="early-access-email"
              className="text-left text-xs font-medium text-[var(--colado-muted)]"
            >
              Email
            </label>
            <Input
              id="early-access-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="early-access-phone"
              className="text-left text-xs font-medium text-[var(--colado-muted)]"
            >
              Phone number
            </label>
            <Input
              id="early-access-phone"
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="+1 555 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {error ? (
          <p className="text-center text-sm text-red-700/90" role="alert">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto sm:self-center"
          disabled={loading}
        >
          {loading ? "Sending…" : "Get Early Access"}
        </Button>
      </form>
    </div>
  );
}
