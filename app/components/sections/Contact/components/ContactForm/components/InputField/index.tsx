import { useFormContext } from "react-hook-form";
import {
  contactRules,
  type ContactFormData,
} from "@/lib/validation/contact-schema";
import { Squircle, SQUIRCLE } from "@/components/ui/squircle";

interface InputFieldProps {
  name: keyof ContactFormData;
  label?: string;
  placeholder?: string;
  type?: string;
}

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactFormData>();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-base text-muted-foreground">
          {label}
        </label>
      )}
      {/* The frame is the clipped surface: the field inside it has no
          border of its own, because a clip-path cuts a CSS border off at
          the corner. Focus moves the frame colour instead. */}
      <Squircle
        cornerRadius={SQUIRCLE.control}
        borderWidth={1}
        fillClassName="bg-background"
        className="w-full bg-input transition-colors duration-200 focus-within:bg-accent-edge"
      >
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, contactRules[name])}
          className="w-full bg-transparent p-3.5 text-base outline-none placeholder:text-muted-foreground/60"
        />
      </Squircle>
      {errors[name] && (
        <span className="text-base text-destructive">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default InputField;
