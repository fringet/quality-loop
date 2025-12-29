'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent-primary hover:bg-accent-primary/90 text-white',
  secondary: 'bg-surface-2 hover:bg-surface-3 text-text-primary border border-surface-3',
  ghost: 'hover:bg-surface-2 text-text-secondary hover:text-text-primary',
  outline: 'border border-accent-primary text-accent-primary hover:bg-accent-primary/10',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick,
  className = '',
  disabled = false 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary/50';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={allClasses}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      onClick={onClick} 
      className={allClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
