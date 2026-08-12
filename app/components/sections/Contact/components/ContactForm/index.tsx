"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import ContactFormProvider from "./components/FormProvider";
import InputField from "./components/InputField";
import TextareaField from "./components/TextareaField";
import { sendContactEmail } from "@/services/email";
import { ContactFormData } from "@/lib/validation/contact-schema";

const ContactForm = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(
    null,
  );
  const { handleSubmit, reset } = useFormContext<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const success = await sendContactEmail(data);
      if (success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="w-full rounded-xl squircle border border-border bg-card">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-5 p-6 md:p-8"
        autoComplete="off"
      >
        {status === "success" && (
          <p
            role="status"
            className="rounded-lg squircle border border-border p-3 text-center text-base tracking-wide text-foreground"
          >
            Message sent successfully.
          </p>
        )}
        {status === "error" && (
          <p
            role="status"
            className="rounded-lg squircle border border-destructive/50 p-3 text-center text-base tracking-wide text-destructive"
          >
            Something went wrong. Please try again.
          </p>
        )}

        <InputField
          name="user_name"
          label="name"
          placeholder="Sharma ji ka beta"
        />
        <InputField
          name="user_phno"
          label="phone"
          placeholder="+91 ..."
          type="tel"
        />
        <InputField
          name="user_email"
          label="email"
          placeholder="you@domain.dev"
          type="email"
        />
        <TextareaField
          name="user_message"
          label="message"
          placeholder="What are you working on?"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className={`flex cursor-pointer items-center justify-center gap-3 rounded-lg squircle border border-input p-3.5 font-mono text-base font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
            status == "loading"
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background"
          }`}
        >
          {status === "loading" && (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          )}
          {status === "loading" ? "Sending" : "Send message"}
        </button>
      </form>
    </div>
  );
};

const WrappedContactForm = () => (
  <ContactFormProvider>
    <ContactForm />
  </ContactFormProvider>
);

export default WrappedContactForm;
