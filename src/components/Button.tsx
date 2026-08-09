import type { ComponentPropsWithoutRef } from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'a'> {
  variant?: 'solid' | 'outline';
}

const Button = ({
  variant = 'solid',
  children,
  className = '',
  ...rest
}: ButtonProps) => {
  const baseClass =
    'inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary';
  const variantClass =
    variant === 'solid'
      ? 'bg-gradient-to-r from-primary-300 to-secondary text-dark shadow-[0_16px_44px_rgba(245,129,72,0.2)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_20px_52px_rgba(245,129,72,0.3)]'
      : 'border border-light/25 bg-light/[0.06] text-light shadow-[0_12px_36px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:border-light/50 hover:bg-light/10';

  return (
    <a className={`${baseClass} ${variantClass} ${className}`} {...rest}>
      {children}
    </a>
  );
};

export default Button;
