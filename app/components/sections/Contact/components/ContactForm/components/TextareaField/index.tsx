import { useFormContext } from "react-hook-form";
import { Squircle, SQUIRCLE } from "@/components/ui/squircle";

interface TextareaFieldProps {
  name: keyof import("@/lib/validation/contact-schema").ContactFormData;
  label?: string;
  placeholder?: string;
  rows?: number;
}

const TextareaField = ({
  name,
  label,
  placeholder,
  rows = 8,
}: TextareaFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="font-mono text-base uppercase tracking-[0.2em] text-muted-foreground"
        >
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
        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          {...register(name)}
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

export default TextareaField;
