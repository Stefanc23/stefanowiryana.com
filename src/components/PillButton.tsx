import type { ComponentPropsWithoutRef } from 'react';

export interface PillButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'solid' | 'outline';
}

const PillButton = ({
  variant = 'solid',
  children,
  className = '',
  ...rest
}: PillButtonProps) => {
  return (
    <button
      className={`py-2 px-4 shadow-md rounded-full font-semibold text-sm border-2 border-primary ${
        variant === 'solid'
          ? 'bg-primary text-dark'
          : 'bg-transparent text-primary hover:text-dark hover:bg-primary'
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PillButton;
