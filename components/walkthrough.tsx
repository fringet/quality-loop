'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WalkthroughStep {
  id: string;
  title: string;
  content: string;
  highlight?: string;
}

const walkthroughSteps: WalkthroughStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to the Quality Loop',
    content: 'This demo shows how Lovie can transform its spec-to-deploy pipeline into a self-improving system. Let me walk you through the key concepts.',
  },
  {
    id: 'problem',
    title: 'The Problem Today',
    content: 'Currently, learning stays in individual builders\' heads. When a spec works well, that knowledge isn\'t captured. When it fails, the same mistakes can happen again.',
  },
  {
    id: 'pipeline',
    title: 'The Existing Pipeline',
    content: 'Lovie already has an excellent pipeline: Culture → Spec → Build → Review → Deploy. But it\'s linear—learning doesn\'t flow back.',
  },
  {
    id: 'quality-loop',
    title: 'Introducing the Quality Loop',
    content: 'The Quality Loop connects Deploy back to Spec, creating a feedback cycle. Every build generates learnings that improve future specs.',
  },
  {
    id: 'scorecard',
    title: 'Scorecard Engine',
    content: 'Every spec run gets scored against culture constraints and benchmark bars. The rationale is traceable, so you know exactly why a spec scored well or poorly.',
  },
  {
    id: 'harvester',
    title: 'Pattern Harvester',
    content: 'High-scoring specs have their successful patterns extracted into a Gold Standards library. These become reusable templates for future specs.',
  },
  {
    id: 'feedback',
    title: 'Feedback Loop',
    content: 'Systemic issues are surfaced automatically. If multiple specs fail for the same reason, the insight bubbles up to fix the root cause.',
  },
  {
    id: 'explore',
    title: 'Ready to Explore?',
    content: 'Click "Explore Demo" to see sample specs with full scorecards, Gold Standards, and organizational insights. Everything is interactive!',
  },
];

interface WalkthroughProps {
  onComplete?: () => void;
}

export function Walkthrough({ onComplete }: WalkthroughProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('quality-loop-tour-seen');
    const hasSeen = !!seen;
    setHasSeenTour(hasSeen);
    
    // Auto-open on first visit after a short delay
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleStart = () => {
    setIsOpen(true);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsOpen(false);
    localStorage.setItem('quality-loop-tour-seen', 'true');
    setHasSeenTour(true);
    onComplete?.();
  };

  const handleSkip = () => {
    handleComplete();
  };

  const step = walkthroughSteps[currentStep];
  const progress = ((currentStep + 1) / walkthroughSteps.length) * 100;

  return (
    <>
      {/* Floating Tour Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={handleStart}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium rounded-full shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40 transition-shadow"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm sm:text-base">Tour</span>
        {!hasSeenTour && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent-gold rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Walkthrough Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleSkip}
              className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-50 inset-4 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:mx-auto sm:inset-auto flex items-center justify-center"
            >
              <div className="bg-surface-1 border border-surface-3 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden w-full max-h-[90vh] flex flex-col">
                {/* Progress Bar */}
                <div className="h-1 bg-surface-3 flex-shrink-0">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content - Scrollable */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                  {/* Step Indicator */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{currentStep + 1}</span>
                      </div>
                      <span className="text-xs sm:text-sm text-text-muted">of {walkthroughSteps.length}</span>
                    </div>
                    <button
                      onClick={handleSkip}
                      className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors"
                      aria-label="Close tour"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Step Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-2 sm:mb-3">
                        {step.title}
                      </h2>
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                        {step.content}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Step Visualization */}
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-surface-2 rounded-lg sm:rounded-xl">
                    <StepVisualization stepId={step.id} />
                  </div>
                </div>

                {/* Footer - Fixed at bottom */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-surface-2 border-t border-surface-3 flex items-center justify-between gap-2 flex-shrink-0">
                  {/* Left: Back button */}
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentStep === 0
                        ? 'text-text-muted cursor-not-allowed'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-3'
                    }`}
                    aria-label="Previous"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                  </button>

                  {/* Right: Next/Complete button */}
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-4 py-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {currentStep === walkthroughSteps.length - 1 ? (
                      <>
                        <span>Explore</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>Next</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Visual component for each step
function StepVisualization({ stepId }: { stepId: string }) {
  switch (stepId) {
    case 'welcome':
      return (
        <div className="flex items-center justify-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center"
          >
            <span className="text-lg font-bold text-white">QL</span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-semibold text-text-primary"
          >
            Quality Loop
          </motion.span>
        </div>
      );

    case 'problem':
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
            {[
              { label: 'Spec' },
              { label: 'Build' },
              { label: 'Deploy' }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center"
              >
                <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-surface-3 rounded-lg text-text-primary font-medium">
                  {item.label}
                </div>
                {i < 2 && <span className="mx-1 sm:mx-2 text-text-muted">→</span>}
              </motion.div>
            ))}
            <span className="mx-1 sm:mx-2 text-text-muted">→</span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-accent-danger/20 text-accent-danger rounded-lg font-medium">
                Learning Lost
              </div>
            </motion.div>
          </div>
        </div>
      );

    case 'pipeline':
      return (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 text-xs">
            {[
              { abbr: 'Culture' },
              { abbr: 'Spec' },
              { abbr: 'Build' },
              { abbr: 'Review' },
              { abbr: 'Deploy' }
            ].map((item, i) => (
              <motion.div
                key={item.abbr}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center"
              >
                <div className="px-2 py-1 bg-surface-3 rounded text-text-primary font-medium text-xs sm:text-sm">
                  {item.abbr}
                </div>
                {i < 4 && <span className="mx-0.5 sm:mx-1 text-text-muted text-sm">→</span>}
              </motion.div>
            ))}
          </div>
          <div className="text-center text-[10px] text-accent-danger mt-2">
            ⚠️ Linear flow - no feedback
          </div>
        </div>
      );

    case 'quality-loop':
      return (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-1 text-xs">
            {[
              { abbr: 'Spec' },
              { abbr: 'Build' },
              { abbr: 'Deploy' }
            ].map((item, i) => (
              <motion.div
                key={item.abbr}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center"
              >
                <div className="px-2 py-1 bg-surface-3 rounded text-text-muted font-medium text-xs sm:text-sm">
                  {item.abbr}
                </div>
                {i < 2 && <span className="mx-0.5 sm:mx-1 text-text-muted">→</span>}
              </motion.div>
            ))}
            <span className="mx-0.5 sm:mx-1 text-text-muted">→</span>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="px-2 py-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded text-white font-medium text-xs sm:text-sm">
                Quality Loop
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="text-accent-primary text-xl sm:text-2xl">↩</div>
            <div className="text-[10px] text-accent-success mt-0.5">✓ Learning flows back</div>
          </motion.div>
        </div>
      );

    case 'scorecard':
      return (
        <div className="space-y-2">
          {[
            { label: 'Executability', score: 28, max: 30 },
            { label: 'Culture Alignment', score: 15, max: 15 },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="text-xs text-text-muted w-28 truncate">{item.label}</span>
              <div className="flex-1 h-2 bg-surface-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.score / item.max) * 100}%` }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }}
                  className="h-full bg-accent-success rounded-full"
                />
              </div>
              <span className="text-xs text-text-primary font-medium">{item.score}/{item.max}</span>
            </motion.div>
          ))}
        </div>
      );

    case 'harvester':
      return (
        <div className="flex items-center justify-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <div className="text-2xl mb-1">📝</div>
            <span className="text-xs text-text-muted">High Score Spec</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-accent-primary"
          >
            →
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="text-2xl mb-1">⭐</div>
            <span className="text-xs text-accent-gold">Gold Standard</span>
          </motion.div>
        </div>
      );

    case 'feedback':
      return (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['MISSING_EDGE_CASES', 'SYNC_DEPENDENCY'].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="px-2 py-1 bg-accent-danger/20 text-accent-danger rounded text-xs font-mono"
            >
              {tag}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-text-muted"
          >
            →
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="px-2 py-1 bg-accent-success/20 text-accent-success rounded text-xs"
          >
            Fix Template
          </motion.span>
        </div>
      );

    case 'explore':
      return (
        <div className="flex items-center justify-center gap-4">
          {[
            { icon: '📊', label: 'Specs' },
            { icon: '⭐', label: 'Gold Standards' },
            { icon: '💡', label: 'Insights' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <span className="text-xs text-text-muted">{item.label}</span>
            </motion.div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
