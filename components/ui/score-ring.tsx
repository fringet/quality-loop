'use client';

import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { width: 48, strokeWidth: 4, fontSize: 'text-sm' },
  md: { width: 80, strokeWidth: 6, fontSize: 'text-xl' },
  lg: { width: 120, strokeWidth: 8, fontSize: 'text-3xl' },
};

function getScoreColor(score: number): string {
  if (score >= 90) return 'var(--accent-gold)';
  if (score >= 80) return 'var(--accent-success)';
  if (score >= 70) return 'var(--accent-warning)';
  return 'var(--accent-danger)';
}

export function ScoreRing({ 
  score, 
  maxScore = 100, 
  size = 'md', 
  showLabel = true,
  className = '' 
}: ScoreRingProps) {
  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (score / maxScore) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const color = getScoreColor(score);
  
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg 
        width={config.width} 
        height={config.width} 
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth={config.strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className={`font-bold ${config.fontSize}`}
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      )}
    </div>
  );
}

// Simple score bar for inline use
interface ScoreBarProps {
  score: number;
  maxScore?: number;
  label?: string;
  className?: string;
}

export function ScoreBar({ score, maxScore = 100, label, className = '' }: ScoreBarProps) {
  const percentage = (score / maxScore) * 100;
  const color = getScoreColor(score);
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-text-secondary">{label}</span>
          <span className="text-text-primary font-medium">{score}/{maxScore}</span>
        </div>
      )}
      <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
