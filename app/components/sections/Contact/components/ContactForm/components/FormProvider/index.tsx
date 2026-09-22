"use client";
import { FormProvider, useForm } from "react-hook-form";
import { ContactFormData } from "@/lib/validation/contact-schema";

const ContactFormProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<ContactFormData>();

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ContactFormProvider;
