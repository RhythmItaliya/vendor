"use client";
import { ButtonHTMLAttributes } from "react";

const variants: Record<string, string> = {
  blue: "bg-blue-600 text-white",
  red: "bg-red-600 text-white",
  gray: "bg-gray-200 text-black",
};

export default function Button({ variant = "blue", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "blue" | "red" | "gray" }) {
  return (
    <button
      {...props}
      className={
        variants[variant] +
        " px-3 py-1 rounded " +
        className
      }
    >
      {props.children}
    </button>
  );
} 