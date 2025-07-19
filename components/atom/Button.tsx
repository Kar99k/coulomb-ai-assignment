import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
};

const sizeClasses = {
  sm: 'px-3 py-1.5 min-w-20 text-sm',
  md: 'px-3 py-2 min-w-40 text-base',
  lg: 'px-3 py-2 min-w-44 text-base',
};


const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  bgColor = 'bg-white',
  textColor = 'text-black',
  className,
  size = 'sm',
  type = 'button',
  icon,
  iconPosition = 'start',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'flex justify-between items-center font-medium transition duration-200 hover:opacity-90 cursor-pointer border border-[#E7E7E7] rounded-lg',
        icon? "justify-between":"justify-center",
        sizeClasses[size],
        bgColor,
        textColor,
        className
      )}
    >
      {icon && iconPosition === 'start' && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <span>{icon}</span>}
    </button>
  );
};

export default Button;
