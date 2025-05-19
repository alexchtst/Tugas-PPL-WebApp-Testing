import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import Link from "next/link";

interface CustomButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string; // Tambahkan prop href untuk navigasi
}

export default function CustomButton({
  children,
  className,
  onClick,
  type = "button",
  href,
}: CustomButtonProps) {
  const baseClass =
    "flex items-center justify-center space-x-2 bg-indigo-700 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition duration-200 w-full cursor-pointer";

  if (href) {
    return (
      <Link href={href} className={twMerge(baseClass, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={twMerge(baseClass, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
