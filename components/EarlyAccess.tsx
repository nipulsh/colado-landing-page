"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { Marginalia } from "@/components/Marginalia";
import { RevealHeading } from "@/components/RevealHeading";
import { SectionMark } from "@/components/SectionMark";
import { SpecimenFrame } from "@/components/SpecimenFrame";

type Role = "founder" | "student" | "other";

export function EarlyAccess() {
  const reduce = useReducedMotion() ?? false;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("founder");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Name, email, and phone are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          number: phone.trim(),
          role,
          note: note.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
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

  const fadeIn = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <SpecimenFrame sectionId="fin">
      <div className="mx-auto w-full min-w-0 max-w-[1280px] px-c5 py-c8 sm:px-c6 sm:py-20 md:py-28 lg:px-c7 lg:py-c10">
        <div className="grid min-w-0 grid-cols-1 gap-10 md:grid-cols-[1.1fr_1fr] md:gap-c7 lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
            variants={fadeIn}
            className="relative flex flex-col gap-c4 sm:gap-c5"
          >
            <SectionMark>Fin.</SectionMark>
            <RevealHeading
              as="h2"
              className="display text-[48px] leading-[1.03] sm:text-[68px] md:text-[84px] lg:text-[112px]"
            >
              Get the <em>app.</em>
            </RevealHeading>
            <Marginalia
              note={<>no pitch theatre. you&apos;re in line.</>}
              side="right"
              top={30}
              rotate={2}
              decoration="underline"
            />
            <p className="max-w-[460px] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
              Private beta — we bring people on weekly, in order, with no
              performance.
            </p>
            <p className="inst-sm mt-4 normal-case tracking-[0.04em] text-[var(--muted)]">
              We&apos;ll write when a spot opens. No drip campaigns. No hustle
              emails.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn}
            className="flex items-start"
          >
            <div className="w-full border-t border-[var(--hairline)] pt-8 sm:pt-10">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="success"
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-start gap-c3 rounded-lg border border-[var(--hairline)] bg-[var(--bg-elevated)] px-c5 py-c5"
                  >
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Check size={14} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-[16px] text-[var(--ink)]">
                        You&apos;re on the list.
                      </p>
                      <p className="inst-sm normal-case tracking-[0.04em]">
                        We&apos;ll be in touch when a spot opens.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col gap-c5"
                    noValidate
                  >
                    <Field
                      label="Name"
                      id="ea-name"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={setName}
                      placeholder="Your name"
                    />
                    <Field
                      label="Email"
                      id="ea-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="you@somewhere.com"
                    />
                    <Field
                      label="Phone"
                      id="ea-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={setPhone}
                      placeholder="+91 98765 43210"
                    />

                    <fieldset className="flex flex-col gap-c3 border-t border-[var(--hairline-soft)] pt-5">
                      <legend className="inst-sm float-left mb-2 normal-case tracking-[0.22em] text-[var(--muted)]">
                        <span className="uppercase tracking-[0.22em]">
                          I am
                        </span>
                      </legend>
                      <div className="flex flex-wrap gap-c2">
                        {(["founder", "student", "other"] as Role[]).map(
                          (r) => (
                            <label
                              key={r}
                              className={[
                                "inline-flex cursor-pointer items-center gap-c2 rounded-full border px-3.5 py-2 text-[13.5px] transition-colors sm:px-4 sm:text-[14px]",
                                role === r
                                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                                  : "border-[var(--hairline)] bg-[var(--bg-elevated)] text-[var(--ink-soft)] hover:border-[var(--ink-soft)]",
                              ].join(" ")}
                            >
                              <input
                                type="radio"
                                name="role"
                                value={r}
                                checked={role === r}
                                onChange={() => setRole(r)}
                                className="sr-only"
                              />
                              <span className="capitalize">
                                {r === "other"
                                  ? "Other"
                                  : r === "founder"
                                    ? "A founder"
                                    : "A student"}
                              </span>
                            </label>
                          )
                        )}
                      </div>
                    </fieldset>

                    <div className="flex flex-col gap-c2 border-t border-[var(--hairline-soft)] pt-5">
                      <label
                        htmlFor="ea-note"
                        className="inst-sm tracking-[0.22em] text-[var(--muted)]"
                      >
                        What are you trying to get done?{" "}
                        <span className="normal-case text-[var(--mute-soft)]">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="ea-note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        placeholder="A sentence or two is plenty."
                        className="w-full resize-none border-0 border-b border-[var(--hairline)] bg-transparent px-0 py-2 text-[15px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--ink-soft)] focus:outline-none"
                      />
                    </div>

                    {error ? (
                      <p
                        role="alert"
                        className="text-[13.5px] text-[var(--signal-priority)]"
                      >
                        {error}
                      </p>
                    ) : null}

                    <div className="pt-2">
                      <MagneticButton
                        type="submit"
                        disabled={loading}
                        wrapperClassName="block sm:inline-block w-full sm:w-auto"
                        className="inline-flex h-12 w-full items-center justify-center gap-c2 rounded-full bg-[var(--ink)] px-c5 text-[14.5px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:text-[15px]"
                      >
                        {loading ? "Sending…" : "Request access"}
                        {!loading && <ArrowRight size={16} />}
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </SpecimenFrame>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
  autoComplete,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-c2">
      <label
        htmlFor={id}
        className="inst-sm tracking-[0.22em] text-[var(--muted)]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full border-0 border-b border-[var(--hairline)] bg-transparent px-0 text-[16px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--ink-soft)] focus:outline-none sm:h-12"
      />
    </div>
  );
}
