"use client";

import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

const SERVICES = [
  "AI UGC ads",
  "VSL editing",
  "Motion graphics",
  "AI video generation",
  "Script and hook development",
  "White-label production support",
  "Other",
];

const MONTHLY_VOLUMES = [
  "One trial project",
  "1-5 videos",
  "6-15 videos",
  "16-30 videos",
  "30+ videos",
];

const PRICING_OPTIONS = [
  "Looking for introductory trial pricing",
  "Discussing ongoing production support",
];

const CONTACT_METHODS = ["Email", "LinkedIn", "Video call"];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      serviceNeeded: "",
      monthlyVolume: "",
      pricingInterest: "",
      preferredContact: "",
    },
  });

  useGSAP(() => {
    // .contact-fade animation is handled by the Reveal wrapper.
  }, []);

  useEffect(() => {
    if (!submitted || prefersReducedMotion() || !successRef.current) return;

    gsap.fromTo(
      successRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }
    );
  }, [submitted]);

  const submitContact = async (values: ContactFormValues) => {
    // Wire this up to your actual endpoint (Resend, Formspree, API route, etc.)
    await new Promise((r) => setTimeout(r, 900));
    console.log(values);
    setSubmitted(true);
    reset();
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
            Discuss a project
          </p>
          <h2
            id="contact-heading"
            className="contact-fade mb-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            Start with a focused paid trial.
          </h2>
          <p className="contact-fade text-body mx-auto mb-16 max-w-2xl">
            Tell us what your agency needs produced, how much creative volume you are planning for, and the best way to reach you.
          </p>

          {submitted ? (
            <div
              ref={successRef}
              className="contact-fade rounded-2xl border border-white/10 bg-white/5 p-12"
              role="status"
            >
              <p className="text-xl font-medium text-white">
                Message sent. We will reply with next steps for the trial discussion.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(submitContact)}
              className="contact-fade space-y-5 text-left"
              noValidate
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name?.message}>
                  <input
                    id="name"
                    {...register("name")}
                    className="form-field"
                    aria-invalid={!!errors.name}
                  />
                </Field>

                <Field label="Work email" error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="form-field"
                    aria-invalid={!!errors.email}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Agency name" error={errors.agencyName?.message}>
                  <input
                    id="agencyName"
                    {...register("agencyName")}
                    className="form-field"
                    aria-invalid={!!errors.agencyName}
                  />
                </Field>

                <Field label="Website" error={errors.website?.message}>
                  <input
                    id="website"
                    type="url"
                    placeholder="https://"
                    {...register("website")}
                    className="form-field"
                    aria-invalid={!!errors.website}
                  />
                </Field>
              </div>

              <Field label="Service needed" error={errors.serviceNeeded?.message}>
                <select
                  id="serviceNeeded"
                  {...register("serviceNeeded")}
                  className="form-field appearance-none"
                  aria-invalid={!!errors.serviceNeeded}
                >
                  <option value="" className="bg-black">Select a service</option>
                  {SERVICES.map((service) => (
                    <option key={service} value={service} className="bg-black">
                      {service}
                    </option>
                  ))}
                </select>
              </Field>

              <RadioGroup
                label="Approximate monthly creative volume"
                name="monthlyVolume"
                options={MONTHLY_VOLUMES}
                register={register}
                error={errors.monthlyVolume?.message}
              />

              <RadioGroup
                label="Pricing"
                name="pricingInterest"
                options={PRICING_OPTIONS}
                register={register}
                error={errors.pricingInterest?.message}
              />

              <RadioGroup
                label="Preferred contact method"
                name="preferredContact"
                options={CONTACT_METHODS}
                register={register}
                error={errors.preferredContact?.message}
              />

              <Field label="Project details" error={errors.message?.message}>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="form-field"
                  aria-invalid={!!errors.message}
                />
              </Field>

              <MagneticButton type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Sending..." : "Request Introductory Pricing"}
              </MagneticButton>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactElement<{ id?: string }>;
}) {
  const id = children.props.id;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-wide text-white/50">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function RadioGroup({
  label,
  name,
  options,
  register,
  error,
}: {
  label: string;
  name: "monthlyVolume" | "pricingInterest" | "preferredContact";
  options: string[];
  register: ReturnType<typeof useForm<ContactFormValues>>["register"];
  error?: string;
}) {
  return (
    <div>
      <p className="mb-2 block text-xs uppercase tracking-wide text-white/50">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "cursor-pointer rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors has-[:checked]:border-white has-[:checked]:bg-white has-[:checked]:text-black"
            )}
          >
            <input
              type="radio"
              value={option}
              {...register(name)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
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
          AGENz Productions
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--highlight)] align-middle opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
        <p className="text-xs text-white/40">
          Copyright {new Date().getFullYear()} AGENz Productions. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-white/40">
          <a href="#work" className="transition-colors hover:text-white">View Our Work</a>
          <a href="#services" className="transition-colors hover:text-white">Services</a>
          <a href="#contact" className="transition-colors hover:text-white">Discuss a Project</a>
          <a href="https://linkedin.com/in/agenz-productions-166733363/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
          <a href="mailto:agenz.socials@gmail.com" className="transition-colors hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
}
