"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "icon";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          // ✅ Variant styles
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
            variant === "primary",
          "border border-gray-300 text-gray-700 hover:bg-gray-100":
            variant === "outline",
          "text-gray-600 hover:bg-gray-100": variant === "ghost",

          // ✅ Size styles
          "px-4 py-2 text-sm": size === "md",
          "px-3 py-1.5 text-xs": size === "sm",
          "h-8 w-8 p-0": size === "icon",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
