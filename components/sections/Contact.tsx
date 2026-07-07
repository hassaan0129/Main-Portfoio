"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

const BUDGETS = ["$2k–5k/mo", "$5k–10k/mo", "$10k+/mo"];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  useGSAP(() => {
    // .contact-fade animation is now handled by the Reveal wrapper
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    // Wire this up to your actual endpoint (Resend, Formspree, API route, etc.)
    await new Promise((r) => setTimeout(r, 900));
    console.log(values);
    setSubmitted(true);
    reset();

    if (!prefersReducedMotion() && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[var(--bg-secondary)] px-6 py-32"
      aria-labelledby="contact-heading"
    >
      <Reveal selector=".contact-fade">
        <div className="mx-auto max-w-3xl text-center">
          <p className="contact-fade mb-4 text-xs uppercase tracking-[0.35em] text-white/50">
            Start a project
          </p>
          <h2
            id="contact-heading"
            className="contact-fade mb-16 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            Ready to drop your CPA and scale your creatives?
          </h2>

          {submitted ? (
            <div
              ref={successRef}
              className="contact-fade rounded-2xl border border-white/10 bg-white/5 p-12"
              role="status"
            >
              <p className="text-xl font-medium text-white">
                Message sent — we&apos;ll reply within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="contact-fade space-y-5 text-left"
              noValidate
            >
              <div>
                <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-wide text-white/50">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-white/50"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-wide text-white/50">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-white/50"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wide text-white/50">
                  Monthly budget
                </label>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((budget) => (
                    <label
                      key={budget}
                      className={cn(
                        "cursor-pointer rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors has-[:checked]:border-white has-[:checked]:bg-white has-[:checked]:text-black"
                      )}
                    >
                      <input
                        type="radio"
                        value={budget}
                        {...register("budget")}
                        className="sr-only"
                      />
                      {budget}
                    </label>
                  ))}
                </div>
                {errors.budget && (
                  <p className="mt-1 text-xs text-red-400">{errors.budget.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-wide text-white/50">
                  Project details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-white/50"
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>

              <MagneticButton type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Sending…" : "Start Your Project Today"}
              </MagneticButton>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--bg-primary)] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <a
          href="#"
          className="group text-lg font-semibold tracking-tight text-white transition-colors"
        >
          AGENZ PRODUCTION
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--highlight)] align-middle opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} AGENZ PRODUCTION. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-white/40">
          <a href="#services" className="transition-colors hover:text-white">Services</a>
          <a href="#process" className="transition-colors hover:text-white">Process</a>
          <a href="#about" className="transition-colors hover:text-white">About</a>
          <a href="https://linkedin.com/in/agenz-productions-166733363/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
          <a href="mailto:agenz.socials@gmail.com" className="transition-colors hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
}