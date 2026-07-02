import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  name: keyof import("@/lib/validation/contact-schema").ContactFormData;
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
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="font-mono text-[13px] uppercase tracking-[0.25em] text-muted-foreground"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full border border-input bg-background p-3.5 text-base outline-none transition-colors duration-300 placeholder:text-muted-foreground/60 focus:border-phosphor"
      />
      {errors[name] && (
        <span className="text-sm text-destructive">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default InputField;
