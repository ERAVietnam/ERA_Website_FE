"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className = "", ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={`${className} pr-10`.trim()}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  }
);
