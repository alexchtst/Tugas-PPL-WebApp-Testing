import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import Link from "next/link";

interface CustomButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  disabled?: boolean;
}

export default function CustomButton({
  children,
  className,
  onClick,
  type = "button",
  href,
  disabled = false,
}: CustomButtonProps) {
  const baseClass =
    "flex items-center justify-center space-x-2 bg-indigo-700 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition duration-200 w-full";

  const disabledClass = disabled
    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
    : "cursor-pointer";

  const mergedClass = twMerge(baseClass, disabledClass, className);

  if (href && !disabled) {
    return (
      <Link href={href} className={mergedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={mergedClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
