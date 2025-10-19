// src/components/PasswordInput.tsx
"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

type Props = {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({
  id = "password",
  name = "password",
  placeholder = "Senha",
  value,
  onChange,
  className,
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      <Input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="current-password"
        className={`w-full pr-12 rounded-md border px-3 py-2 focus:outline-none focus:ring ${className}`}
        aria-describedby={`${id}-toggle`}
        {...props}
      />

      <button
        type="button"
        id={`${id}-toggle`}
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        title={visible ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
        className="absolute inset-y-0 right-0 flex items-center px-3"
      >
        {visible ? (
          /* ícone olho aberto */
          <Eye size={20} />
        ) : (
          /* ícone olho riscado */
          <EyeOff size={20} />
        )}
      </button>
    </div>
  );
}
