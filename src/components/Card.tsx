import React from 'react';

export interface CardProps {
  overline?: string | React.ReactNode;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  cardClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  noHighlight?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  overline = '',
  title = '',
  subTitle = '',
  cardClassName = '',
  headerClassName = '',
  contentClassName = '',
  noHighlight = false,
  children,
}) => {
  return (
    <div className="w-full flex items-stretch relative group">
      {!noHighlight && (
        <div className="absolute -inset-0.5 rounded-lg bg-linear-to-br from-primary to-secondary blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-tilt"></div>
      )}
      <div
        className={`w-full relative p-8 rounded-lg bg-light dark:bg-dark flex flex-col ${cardClassName}`}
      >
        <div className={headerClassName}>
          {overline && (
            <p className="text-xs font-medium text-primary">{overline}</p>
          )}
          {title && (
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold mb-1">
              {title}
            </h2>
          )}
          {subTitle && (
            <p className="text-sm xl:text-base font-medium italic mb-4">
              {subTitle}
            </p>
          )}
        </div>
        <div
          className={`flex-1 text-base text-dark dark:text-light leading-6 ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
