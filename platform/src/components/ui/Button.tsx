import { ButtonVariant, ButtonProps } from '@/types/button';
import React from 'react';

// Make sure the keys match the actual ButtonVariant values, e.g., 'outlined' and 'filled' or whatever is defined in your ButtonVariant type
const variantClasses: Record<ButtonVariant, string> = {
    // Replace 'unfilled' with the correct key from ButtonVariant, e.g., 'outlined' or 'default'
    outlined: 'bg-purple-900 text-white font-semibold px-6 py-2 rounded-xl shadow hover:bg-purple-800 transition mr-4 cursor-pointer',
    filled: 'bg-white text-purple-700 font-semibold px-6 py-2 rounded-xl shadow hover:bg-purple-100 transition mr-4 cursor-pointer',
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'outlined',
    children,
    className = '',
    ...props
}) => (
    <button
        className={`${variantClasses[variant]} ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default Button;