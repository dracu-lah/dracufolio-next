import type { RegisterOptions } from "react-hook-form";

/**
 * Four fields and four rules, written out.
 *
 * This was a zod schema behind `@hookform/resolvers`. Those two plus the
 * EmailJS SDK were the largest JavaScript chunk on the home page, 77KB over
 * the wire and 82 percent of it never executed, for a form that sits below
 * every other section of the page. react-hook-form validates from its own
 * `register` options, so the schema library was buying nothing here that four
 * objects do not.
 *
 * The messages are the ones the schema produced, so nothing a visitor reads
 * changed.
 */
export interface ContactFormData {
  user_name: string;
  user_phno: string;
  user_email: string;
  user_message: string;
}

type Rules = Record<keyof ContactFormData, RegisterOptions<ContactFormData>>;

export const contactRules: Rules = {
  user_name: {
    required: "Name must be at least 2 characters",
    minLength: { value: 2, message: "Name must be at least 2 characters" },
  },
  user_phno: {
    required: "Invalid phone number",
    pattern: { value: /^[0-9+\-\s()]+$/, message: "Invalid phone number" },
  },
  user_email: {
    required: "Invalid email address",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  },
  user_message: {
    required: "Message must be at least 10 characters",
    minLength: {
      value: 10,
      message: "Message must be at least 10 characters",
    },
  },
};
