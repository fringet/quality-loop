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
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium rounded-full shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40 transition-shadow"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="hidden sm:inline">Take a Tour</span>
        {!hasSeenTour && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-gold rounded-full animate-pulse" />
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-4"
            >
              <div className="bg-surface-1 border border-surface-3 rounded-2xl shadow-2xl overflow-hidden">
                {/* Progress Bar */}
                <div className="h-1 bg-surface-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Step Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{currentStep + 1}</span>
                      </div>
                      <span className="text-sm text-text-muted">of {walkthroughSteps.length}</span>
                    </div>
                    <button
                      onClick={handleSkip}
                      className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors"
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
                      <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                        {step.title}
                      </h2>
                      <p className="text-text-secondary leading-relaxed">
                        {step.content}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Step Visualization */}
                  <div className="mt-6 p-4 bg-surface-2 rounded-xl">
                    <StepVisualization stepId={step.id} />
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-8 py-4 bg-surface-2 border-t border-surface-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentStep === 0
                          ? 'text-text-muted cursor-not-allowed'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-3'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <button
                      onClick={handleSkip}
                      className="px-3 py-2 text-sm text-text-muted hover:text-text-secondary hover:bg-surface-3 rounded-lg font-medium transition-colors"
                    >
                      Skip tour
                    </button>
                  </div>

                  {/* Step Dots */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    {walkthroughSteps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentStep(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentStep
                            ? 'bg-accent-primary w-4'
                            : i < currentStep
                            ? 'bg-accent-primary/50'
                            : 'bg-surface-3'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 px-4 py-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {currentStep === walkthroughSteps.length - 1 ? (
                      <>
                        Explore Demo
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Next
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
        <div className="flex items-center justify-center gap-2 text-sm">
          {['Spec', 'Build', 'Deploy'].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center"
            >
              <span className="px-3 py-1.5 bg-surface-3 rounded-lg text-text-secondary">{item}</span>
              {i < 2 && <span className="mx-1 text-text-muted">→</span>}
            </motion.div>
          ))}
          <span className="mx-1 text-text-muted">→</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="px-3 py-1.5 bg-accent-danger/20 text-accent-danger rounded-lg"
          >
            Lost
          </motion.span>
        </div>
      );

    case 'pipeline':
      return (
        <div className="flex items-center justify-center gap-1 text-xs">
          {['CU', 'SP', 'BU', 'RE', 'DE'].map((abbr, i) => (
            <motion.div
              key={abbr}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center"
            >
              <span className="w-8 h-8 bg-surface-3 rounded-lg flex items-center justify-center text-text-muted font-medium">
                {abbr}
              </span>
              {i < 4 && <span className="mx-0.5 text-text-muted">→</span>}
            </motion.div>
          ))}
        </div>
      );

    case 'quality-loop':
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1 text-xs">
            {['SP', 'BU', 'DE'].map((abbr, i) => (
              <motion.div
                key={abbr}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center"
              >
                <span className="w-7 h-7 bg-surface-3 rounded flex items-center justify-center text-text-muted font-medium text-xs">
                  {abbr}
                </span>
                {i < 2 && <span className="mx-0.5 text-text-muted">→</span>}
              </motion.div>
            ))}
            <span className="mx-1 text-text-muted">→</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="px-2 py-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded text-white font-medium text-xs"
            >
              QL
            </motion.span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-accent-primary text-lg"
          >
            ↩
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
