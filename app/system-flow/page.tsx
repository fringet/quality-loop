'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';

interface Stage {
  id: string;
  label: string;
  description: string;
  details: string[];
  isQualityLoop?: boolean;
}

const stages: Stage[] = [
  {
    id: 'culture',
    label: 'Culture',
    description: 'Values & Constraints',
    details: [
      'Async-First Communication',
      'Manager of One autonomy',
      'Search-First Culture',
      'Transparent Workflows',
    ],
  },
  {
    id: 'spec',
    label: 'Spec',
    description: 'Write requirements',
    details: [
      'Intent & scope in language',
      'Step-by-step UX behavior',
      'Acceptance criteria',
      'Edge cases & constraints',
    ],
  },
  {
    id: 'build',
    label: 'Build',
    description: 'AI generates code',
    details: [
      'CloudFlow processes spec',
      'Generates UI & logic',
      'Creates working preview',
      'Asks clarifying questions',
    ],
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Verify output',
    details: [
      'Compare output to spec',
      'Check behavior matches intent',
      'Note discrepancies',
      'Approve or iterate',
    ],
  },
  {
    id: 'deploy',
    label: 'Deploy',
    description: 'Ship to production',
    details: [
      'PR created automatically',
      'Final approval',
      'Deploy to live',
      'Feature is shipped',
    ],
  },
];

const qualityLoopComponents = [
  {
    id: 'scorecard',
    label: 'Scorecard Engine',
    description: 'Scores each run against culture constraints and benchmark bars',
    metrics: ['Spec Executability', 'Constraint Precision', 'Culture Alignment'],
  },
  {
    id: 'harvester',
    label: 'Pattern Harvester',
    description: 'Extracts reusable patterns from high-scoring specs',
    metrics: ['Gold Standards Library', 'Anti-patterns Detection', 'Phrasing Snippets'],
  },
  {
    id: 'feedback',
    label: 'Feedback Loop',
    description: 'Surfaces insights and feeds them back to spec authors',
    metrics: ['Failure Tag Analysis', 'Trend Detection', 'Spec Deltas'],
  },
];

export default function SystemFlowPage() {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [showQualityLoopDetail, setShowQualityLoopDetail] = useState(true);
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium text-accent-primary bg-accent-primary/10 rounded-full border border-accent-primary/20">
            System Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            How the Quality Loop Integrates
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Click on any stage to see details. The Quality Loop connects Deploy back to Spec, 
            creating a self-improving system.
          </p>
        </motion.div>
        
        {/* Main Flow Diagram - Redesigned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-16"
        >
          {/* Pipeline Container */}
          <div className="relative bg-surface-1 border border-surface-3 rounded-2xl p-8 overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }} />
            </div>
            
            {/* Pipeline Label */}
            <div className="text-center mb-8">
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Lovie&apos;s Spec → Deploy Pipeline</span>
            </div>
            
            {/* Horizontal Flow - Desktop */}
            <div className="hidden lg:flex items-center justify-center gap-0">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex items-center">
                  {/* Stage Card */}
                  <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedStage(stage);
                      setShowQualityLoopDetail(false);
                    }}
                    className={`relative flex flex-col items-center p-5 rounded-xl border-2 transition-all duration-200 min-w-[120px] ${
                      selectedStage?.id === stage.id
                        ? 'bg-accent-primary/10 border-accent-primary shadow-lg shadow-accent-primary/20'
                        : 'bg-surface-2 border-surface-3 hover:border-accent-primary/50 hover:bg-surface-3'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold mb-3 ${
                      selectedStage?.id === stage.id ? 'bg-accent-primary/20 text-accent-primary' : 'bg-surface-3 text-text-muted'
                    }`}>
                      {stage.label.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-text-primary">{stage.label}</span>
                    <span className="text-xs text-text-muted mt-1 text-center leading-tight">{stage.description}</span>
                    
                    {/* Step number */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-surface-3 border border-surface-3 flex items-center justify-center">
                      <span className="text-xs font-bold text-text-muted">{index + 1}</span>
                    </div>
                  </motion.button>
                  
                  {/* Connector Arrow */}
                  {index < stages.length - 1 && (
                    <div className="flex items-center px-2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-surface-3 to-accent-primary/30" />
                      <svg className="w-4 h-4 text-accent-primary/50 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile/Tablet Grid */}
            <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stages.map((stage, index) => (
                <motion.button
                  key={stage.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedStage(stage);
                    setShowQualityLoopDetail(false);
                  }}
                  className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedStage?.id === stage.id
                      ? 'bg-accent-primary/10 border-accent-primary'
                      : 'bg-surface-2 border-surface-3'
                  }`}
                >
                  <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-surface-3 flex items-center justify-center">
                    <span className="text-xs font-bold text-text-muted">{index + 1}</span>
                  </div>
                  <span className="text-xs font-semibold text-text-muted mb-2">
                    {stage.label.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold text-text-primary">{stage.label}</span>
                  <span className="text-xs text-text-muted mt-1 text-center">{stage.description}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Quality Loop - Below with curved connection */}
          <div className="relative mt-6">
            {/* Connection SVG */}
            <svg className="hidden lg:block absolute -top-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-16" viewBox="0 0 800 64" fill="none" preserveAspectRatio="xMidYMid meet">
              {/* Right side going down from Deploy */}
              <path d="M700 0 L700 32 L400 32" stroke="url(#loopGradient)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
              {/* Left side going back up to Culture */}
              <path d="M400 32 L100 32 L100 0" stroke="url(#loopGradient)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
              {/* Arrow at the end */}
              <polygon points="96,8 104,8 100,0" fill="#6366f1" />
              <defs>
                <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Quality Loop Card */}
            <motion.div
              className="relative w-full bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-primary/10 border-2 border-accent-primary shadow-xl shadow-accent-primary/20 rounded-2xl p-6"
            >
              {/* Animated glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                    <span className="text-sm font-bold text-white">QL</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                      The Quality Loop
                      <span className="text-xs font-normal px-2 py-0.5 bg-accent-primary/20 text-accent-primary rounded-full">NEW</span>
                    </h3>
                    <p className="text-sm text-text-secondary">Harvest learnings and feed them back to improve future specs</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                  {['Scorecard', 'Patterns', 'Feedback'].map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1 bg-surface-1/60 border border-surface-3 rounded-full text-xs font-medium text-text-secondary"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Loop indicator */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-surface-1 border border-accent-primary/30 rounded-full">
                <span className="text-xs font-medium text-accent-primary">Loops back to Culture & Spec</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Stage Detail Panel */}
        <AnimatePresence mode="wait">
          {selectedStage && !showQualityLoopDetail && (
            <motion.div
              key={selectedStage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-surface-1 border border-surface-3 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-surface-2 border border-surface-3 flex items-center justify-center">
                  <span className="text-sm font-semibold text-text-muted">{selectedStage.label.slice(0, 2).toUpperCase()}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">{selectedStage.label}</h3>
                  <p className="text-text-secondary">{selectedStage.description}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedStage.details.map((detail, i) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <span className="w-1.5 h-1.5 bg-accent-primary rounded-full" />
                    {detail}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Quality Loop Detail */}
        <AnimatePresence mode="wait">
          {showQualityLoopDetail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/30 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">Inside the Quality Loop</h3>
                    <p className="text-text-secondary">Three interconnected components that make learning compound</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {qualityLoopComponents.map((component, i) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="bg-surface-1 border border-surface-3 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-medium text-text-primary">{component.label}</h4>
                      </div>
                      <p className="text-sm text-text-secondary mb-3">{component.description}</p>
                      <div className="space-y-1">
                        {component.metrics.map((metric) => (
                          <div key={metric} className="flex items-center gap-2 text-xs text-text-muted">
                            <span className="w-1 h-1 bg-accent-primary rounded-full" />
                            {metric}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-surface-1 border border-surface-3 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            From Linear Pipeline to Learning System
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-6">
            The Quality Loop transforms a one-way pipeline into a self-improving cycle. 
            Every spec contributes to organizational knowledge. Every run generates 
            learnings that make the next spec better.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/demo" size="lg">
              Explore the Demo
            </Button>
            <Button href="/demo/specs" variant="secondary" size="lg">
              View Sample Specs
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="mt-20 py-8 px-4 sm:px-6 lg:px-8 border-t border-surface-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-accent-primary to-accent-secondary rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">QL</span>
            </div>
            <span className="text-sm text-text-muted">Quality Loop Demo</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fringet/quality-loop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View Source
            </a>
            <span className="text-sm text-text-muted">
              Built by <span className="text-text-secondary">Ozan Özgöçer</span> for Lovie
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}