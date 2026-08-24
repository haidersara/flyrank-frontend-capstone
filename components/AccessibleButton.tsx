"use client";

interface AccessibleButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
}

export default function AccessibleButton({
  onClick,
  children,
  className = "",
  disabled = false,
  ariaLabel,
  type = "button",
  variant = "primary",
}: AccessibleButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7FA39A] disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-[#7FA39A] text-white hover:bg-[#6B8B82] focus:ring-[#7FA39A]",
    secondary:
      "bg-[#24423F] text-white hover:bg-[#1A322F] focus:ring-[#24423F]",
    ghost:
      "bg-transparent text-white hover:bg-white/10 focus:ring-white/50 border border-white/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      tabIndex={0}
    >
      {children}
    </button>
  );
}