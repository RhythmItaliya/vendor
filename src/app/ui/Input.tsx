'use client';
import { InputHTMLAttributes } from 'react';

const variants: Record<string, string> = {
     default: 'border border-gray-300',
     gray: 'border border-gray-200 bg-gray-100',
     red: 'border border-red-400 bg-red-50',
};

export default function Input({
     variant = 'default',
     className = '',
     ...props
}: InputHTMLAttributes<HTMLInputElement> & { variant?: 'default' | 'gray' | 'red' }) {
     return <input {...props} className={variants[variant] + ' px-2 py-1 rounded ' + className} />;
}
