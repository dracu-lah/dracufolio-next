"use client";
import { useState, useEffect } from "react";
import { CheckCircle, CircleNotch, SendIcon } from "@/components/common/icons";
import { useFormContext } from "react-hook-form";
import ContactFormProvider from "./components/FormProvider";
import InputField from "./components/InputField";
import TextareaField from "./components/TextareaField";
import { sendContactEmail } from "@/services/email";
import { ContactFormData } from "@/lib/validation/contact-schema";
import { AVAILABILITY, HOURS } from "@/data/contact";
import { Squircle, SquircleButton } from "@/components/ui/squircle";

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
    <Squircle
      borderWidth={1}
      fillClassName="bg-card"
      className="w-full bg-border"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-5 p-6 md:p-8"
        autoComplete="off"
      >
        {status === "success" && (
          <p
            role="status"
            className="flex items-center justify-center gap-2 rounded-lg border border-accent-edge bg-accent-tint p-3 text-center text-base tracking-wide text-accent"
          >
            <CheckCircle className="size-5" />
            Message sent. I will reply the same day.
          </p>
        )}
        {status === "error" && (
          <p
            role="status"
            className="rounded-lg border border-destructive/50 p-3 text-center text-base tracking-wide text-destructive"
          >
            Something went wrong. Please try again.
          </p>
        )}

        <InputField
          name="user_name"
          label="name"
          placeholder="Your name"
        />
        <InputField
          name="user_phno"
          label="phone"
          placeholder="Phone number"
          type="tel"
        />
        <InputField
          name="user_email"
          label="email"
          placeholder="you@example.com"
          type="email"
        />
        <TextareaField
          name="user_message"
          label="message"
          placeholder="What are you working on?"
        />

        <SquircleButton
          type="submit"
          disabled={status === "loading"}
          className={`flex h-12 cursor-pointer items-center justify-center gap-3 bg-accent font-mono text-base font-medium tracking-[0.14em] text-accent-foreground uppercase transition-[background-color,transform] duration-200 active:translate-y-px ${
            status == "loading"
              ? "cursor-not-allowed opacity-60"
              : "hover:bg-accent-muted"
          }`}
        >
          {status === "loading" ? (
            <CircleNotch className="size-4 animate-spin" />
          ) : (
            <SendIcon className="size-4" />
          )}
          {status === "loading" ? "Sending" : "Send message"}
        </SquircleButton>
        <p className="text-center text-sm text-muted-foreground">
          {AVAILABILITY.shortReply}, {HOURS.display}. WhatsApp is faster.
        </p>
      </form>
    </Squircle>
  );
};

const WrappedContactForm = () => (
  <ContactFormProvider>
    <ContactForm />
  </ContactFormProvider>
);

export default WrappedContactForm;
