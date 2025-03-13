import React from "react";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  variant?: "primary" | "success" | "danger" | "info" | "muted";
  size?: "sm" | "md";
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  const baseStyles =
    "font-medium rounded-lg cursor-pointer focus:outline-none focus:ring transition-all duration-300";
  const variantStyles = {
    primary: "bg-black text-white hover:bg-black/80 focus:ring-black/50",
    success:
      "bg-green-600 text-white hover:bg-green-600/80 focus:ring-green-600/50",
    danger: "bg-red-600 text-white hover:bg-red-600/80 focus:ring-red-600/50",
    info: "bg-blue-600 text-white hover:bg-blue-600/80 focus:ring-blue-600/50",
    muted: "bg-gray-500 text-white hover:bg-gray-500/80 focus:ring-gray-500/50",
  };
  const sizeStyles = {
    sm: "px-2 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
  };
  return (
    <button
      className={clsx(
        className,
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-80 cursor-not-allowed"
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
