import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-60';
    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary: 'bg-brand-500 text-white shadow-soft hover:bg-brand-600',
      secondary: 'border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800',
      ghost: 'bg-transparent text-slate-200 hover:bg-slate-800',
      danger: 'bg-rose-600 text-white hover:bg-rose-500',
    };
    return <button ref={ref} className={clsx(base, variants[variant], className)} {...props} />;
  },
);

Button.displayName = 'Button';
