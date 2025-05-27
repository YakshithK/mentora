export type ButtonVariant = 'outlined' | 'filled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    className?: string;
    children: React.ReactNode;
}

