"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const INTEREST_OPTIONS = [
  "Investor",
  "Venue Operator",
  "Brand Partner",
  "Technology Partner",
  "Press",
  "Other",
] as const;

type InterestType = (typeof INTEREST_OPTIONS)[number] | "";

interface FormState {
  name: string;
  email: string;
  organisation: string;
  interest: InterestType;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  organisation: "",
  interest: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source_page: "contact_page" }),
      });
      if (!res.ok) { setError(true); setLoading(false); return; }
      setSubmitted(true);
    } catch (_err) {
      setError(true);
    }
    setLoading(false);
  };

  const labelClass = "block text-[10px] tracking-superwide uppercase font-medium text-graphite-light mb-2";
  const inputClass =
    "w-full bg-white/[0.05] border border-silver-mid/55 text-graphite placeholder:text-silver-dark/80 text-sm px-4 py-3.5 focus:outline-none focus:border-silver-mid transition-colors duration-200";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start gap-4 py-16"
      >
        <span className="inline-flex items-center gap-3 text-[10px] tracking-ultrawide uppercase font-medium text-violet-muted">
          <span className="w-6 h-px bg-violet-muted" />
          Received
        </span>
        <h3 className="font-display font-normal uppercase tracking-[0.11em] leading-[0.97] text-2xl text-graphite">
          Thank you. Your inquiry has been received for review.
        </h3>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
    >
      {/* Row: Name + Email */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </motion.div>

      {/* Row: Organisation + Interest */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="organisation" className={labelClass}>Organisation</label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            placeholder="Company or institution"
            value={form.organisation}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="interest" className={labelClass}>I am enquiring as</label>
          <select
            id="interest"
            name="interest"
            required
            value={form.interest}
            onChange={handleChange}
            className={`${inputClass} appearance-none cursor-pointer ${form.interest === "" ? "!text-silver-dark" : "text-graphite"}`}
          >
            <option value="" disabled>Select one</option>
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Message */}
      <motion.div variants={fadeUp}>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your interest in Elizium AI."
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </motion.div>

      {/* Disclaimer */}
      <motion.p variants={fadeUp} className="text-[11px] text-silver-dark leading-relaxed">
        This form is for pre-qualified enquiries only. All submissions are reviewed
        manually. We do not share your information with third parties.
      </motion.p>

      {/* Submit */}
      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        {error && (
          <p className="text-[11px] text-red-400/80 leading-relaxed">
            Something went wrong. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-4 bg-graphite text-porcelain text-[11px] tracking-superwide uppercase font-medium hover:bg-graphite-mid transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending…" : "Request Private Access"}
        </button>
      </motion.div>
    </motion.form>
  );
}
