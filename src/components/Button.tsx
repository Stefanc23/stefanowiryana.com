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
    'inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary';
  const variantClass =
    variant === 'solid'
      ? 'bg-light text-dark shadow-[0_12px_30px_rgba(245,247,250,0.12)] hover:bg-light/85'
      : 'border border-light/20 bg-light/5 text-light hover:border-light/45 hover:bg-light/10';

  return (
    <a className={`${baseClass} ${variantClass} ${className}`} {...rest}>
      {children}
    </a>
  );
};

export default Button;
