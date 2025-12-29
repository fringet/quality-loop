'use client';

import { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'gold' | 'primary' | 'secondary';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-3 text-text-secondary',
  success: 'bg-accent-success/20 text-accent-success border border-accent-success/30',
  warning: 'bg-accent-warning/20 text-accent-warning border border-accent-warning/30',
  danger: 'bg-accent-danger/20 text-accent-danger border border-accent-danger/30',
  gold: 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30',
  primary: 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30',
  secondary: 'bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/30',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Specialized badge for failure tags
interface FailureTagProps {
  tag: string;
  className?: string;
}

export function FailureTag({ tag, className = '' }: FailureTagProps) {
  return (
    <Badge variant="danger" className={className}>
      {tag.replace(/_/g, ' ')}
    </Badge>
  );
}

// Specialized badge for Gold Standard status
interface GoldBadgeProps {
  className?: string;
}

export function GoldBadge({ className = '' }: GoldBadgeProps) {
  return (
    <Badge variant="gold" className={className}>
      ★ Gold Standard
    </Badge>
  );
}
