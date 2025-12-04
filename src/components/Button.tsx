import type { ComponentPropsWithoutRef } from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'solid' | 'outline';
  highlight?: boolean;
}

const Button = ({
  variant = 'solid',
  children,
  className,
  highlight = false,
  ...rest
}: ButtonProps) => {
  return (
    <div className="relative group">
      {highlight && (
        <div className="absolute -inset-1 rounded-lg bg-linear-to-br from-primary to-secondary blur opacity-75 md:opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-300 animate-tilt"></div>
      )}
      <button
        className={`relative text-sm md:text-lg rounded-sm cursor-pointer min-w-[120px] w-full px-4 py-1.5 h-8 md:h-12 flex justify-center items-center ${
          variant === 'solid'
            ? 'bg-primary text-dark hover:bg-linear-to-br hover:from-primary hover:to-secondary'
            : 'bg-transparent text-primary border-2 border-primary hover:bg-secondary-300/50 hover:dark:bg-secondary-800/50'
        } ${className}`}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
