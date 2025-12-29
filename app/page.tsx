'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-transparent" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-accent-primary bg-accent-primary/10 rounded-full border border-accent-primary/20">
              The Missing Connector in Lovie&apos;s Ecosystem
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="text-text-primary">THE</span>{' '}
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              QUALITY LOOP
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Making Spec Quality Compound.{' '}
            <span className="text-text-primary">
              Turn every build into organizational learning that feeds back into future specs.
            </span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/system-flow" size="lg">
              See How It Works
            </Button>
            <Button href="/demo" variant="outline" size="lg">
              Explore Demo
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-1">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              The Gap in Today&apos;s Workflow
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Lovie has an excellent pipeline. But learning stays in individual builders&apos; heads.
            </p>
          </motion.div>
          
          {/* Current Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4">
              {['Spec', 'Build', 'Review', 'Deploy'].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="px-4 py-2 bg-surface-2 border border-surface-3 rounded-lg text-text-primary font-medium">
                    {step}
                  </div>
                  {i < 3 && (
                    <span className="mx-2 text-text-muted">→</span>
                  )}
                </div>
              ))}
              <span className="mx-2 text-text-muted">→</span>
              <div className="px-4 py-2 bg-surface-2 border border-accent-danger/30 rounded-lg text-text-muted">
                Learning Lost
              </div>
            </div>
          </motion.div>
          
          {/* Problems Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'No Pattern Reuse',
                description: 'Successful spec phrasing is forgotten. Each builder starts from scratch.',
              },
              {
                title: 'Invisible Violations',
                description: 'Culture constraint violations (sync dependencies, siloed work) go undetected.',
              },
              {
                title: 'Subjective Quality',
                description: 'Spec quality is a feeling, not a metric. No way to track improvement.',
              },
            ].map((problem, i) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-surface-2 border border-surface-3 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">{problem.title}</h3>
                <p className="text-sm text-text-secondary">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              The Quality Loop Closes the Gap
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              An automatic feedback mechanism that makes learning compound organization-wide.
            </p>
          </motion.div>
          
          {/* New Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 relative"
          >
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4">
              {['Spec', 'Build', 'Review', 'Deploy'].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="px-4 py-2 bg-surface-2 border border-surface-3 rounded-lg text-text-primary font-medium">
                    {step}
                  </div>
                  {i < 3 && (
                    <span className="mx-2 text-text-muted">→</span>
                  )}
                </div>
              ))}
              <span className="mx-2 text-text-muted">→</span>
              <div className="px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg text-white font-medium">
                Quality Loop
              </div>
              <span className="mx-2 text-accent-primary">↩</span>
            </div>
            {/* Loop arrow indicator */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-4 flex items-center text-accent-primary">
              <span className="text-sm">Feeds back to improve future specs</span>
            </div>
          </motion.div>
          
          {/* Solution Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                title: 'Scorecard Engine',
                description: 'Every run gets scored against culture constraints and benchmark bars. Rationale is traceable.',
              },
              {
                title: 'Gold Standards Harvester',
                description: 'High-scoring specs have their phrasing extracted into reusable patterns.',
              },
              {
                title: 'Pattern Insights',
                description: 'Systemic issues surface automatically. Fix the language, not just the code.',
              },
            ].map((solution, i) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-surface-1 border border-accent-primary/20 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">{solution.title}</h3>
                <p className="text-sm text-text-secondary">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-1">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              See the System in Action
            </h2>
            <p className="text-text-secondary mb-8">
              Explore how the Quality Loop integrates with Lovie&apos;s existing pipeline and makes organizational learning automatic.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/system-flow" size="lg">
                View System Flow
              </Button>
              <Button href="/demo" variant="secondary" size="lg">
                Try the Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-surface-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
