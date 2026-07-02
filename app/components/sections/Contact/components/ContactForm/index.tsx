"use client";
import { useState, useEffect } from "react";
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

  // Auto-clear status after 3 seconds
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="w-full border border-border bg-card">
      <p className="border-b border-border px-5 py-3 font-mono text-[13px] uppercase tracking-[0.25em] text-muted-foreground">
        Send a message
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-5 p-5 md:p-6"
        autoComplete="off"
      >
        {status === "success" && (
          <p
            role="status"
            className="border border-phosphor/40 p-3 text-center text-sm tracking-wide text-phosphor"
          >
            Message sent successfully.
          </p>
        )}
        {status === "error" && (
          <p
            role="status"
            className="border border-destructive/50 p-3 text-center text-sm tracking-wide text-destructive"
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
          placeholder="The role, the project, or the bug ..."
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className={`cursor-pointer border border-input p-3.5 font-mono text-sm font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${
            status == "loading"
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background"
          }`}
        >
          {status === "loading" ? "Sending..." : "Send message"}
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
