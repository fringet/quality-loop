'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, Badge } from '@/components/ui';
import cultureConstraintsData from '@/data/culture-constraints.json';

export default function CultureConstraintsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Culture Constraints</h1>
          <p className="text-text-secondary">
            These are the Lovie culture principles that the Quality Loop checks every spec against. 
            Violations are flagged with suggestions for async-friendly alternatives.
          </p>
        </motion.div>
        
        {/* Source Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-4 bg-accent-primary/10 border border-accent-primary/30 rounded-lg"
        >
          <p className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">Source: </span>
            These constraints are derived from Lovie&apos;s Culture Manifesto and encode the 
            &quot;Future of Work 2.0&quot; principles into machine-checkable rules.
          </p>
        </motion.div>
        
        {/* Constraints List */}
        <div className="space-y-6">
          {cultureConstraintsData.map((constraint, i) => (
            <motion.div
              key={constraint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              <Card>
                <CardContent>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-text-primary">{constraint.name}</h3>
                        <Badge variant={constraint.severity === 'high' ? 'danger' : 'warning'}>
                          {constraint.severity}
                        </Badge>
                      </div>
                      <span className="text-xs font-mono text-text-muted">{constraint.id}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-text-secondary mb-4">{constraint.description}</p>
                  
                  {/* Principle Quote */}
                  <div className="p-3 bg-surface-2 rounded-lg mb-6 border-l-4 border-accent-primary">
                    <p className="text-sm italic text-text-secondary">
                      &quot;{constraint.principle}&quot;
                    </p>
                    <p className="text-xs text-text-muted mt-1">— {constraint.source}</p>
                  </div>
                  
                  {/* Examples Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Violation Examples */}
                    <div>
                      <p className="text-sm font-medium text-accent-danger mb-3 flex items-center gap-2">
                        <span>✗</span> Violation Examples
                      </p>
                      <ul className="space-y-2">
                        {constraint.violationExamples.map((example, j) => (
                          <li 
                            key={j} 
                            className="text-sm text-text-secondary p-2 bg-accent-danger/10 rounded border-l-2 border-accent-danger"
                          >
                            &quot;{example}&quot;
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Compliant Examples */}
                    <div>
                      <p className="text-sm font-medium text-accent-success mb-3 flex items-center gap-2">
                        <span>✓</span> Compliant Examples
                      </p>
                      <ul className="space-y-2">
                        {constraint.compliantExamples.map((example, j) => (
                          <li 
                            key={j} 
                            className="text-sm text-text-secondary p-2 bg-accent-success/10 rounded border-l-2 border-accent-success"
                          >
                            &quot;{example}&quot;
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* How Checking Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-surface-1">
            <CardContent>
              <h3 className="text-lg font-semibold text-text-primary mb-4">How Culture Checking Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Spec Analysis',
                    description: 'Quality Loop scans spec content for keywords and patterns that indicate potential violations'
                  },
                  {
                    step: '2',
                    title: 'Violation Detection',
                    description: 'Matches are flagged with the specific rule violated and the problematic quote highlighted'
                  },
                  {
                    step: '3',
                    title: 'Suggestion Generation',
                    description: 'For each violation, an async-friendly alternative is suggested based on compliant patterns'
                  }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-10 h-10 bg-accent-primary/20 text-accent-primary rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                      {item.step}
                    </div>
                    <p className="font-medium text-text-primary mb-1">{item.title}</p>
                    <p className="text-sm text-text-secondary">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Why This Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-accent-secondary/5 to-accent-primary/5 border-accent-secondary/20">
            <CardContent>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Why Culture Constraints Matter
              </h3>
              <p className="text-text-secondary mb-4">
                Culture isn&apos;t just words on a wall—it&apos;s how work actually happens. When specs contain 
                phrases like &quot;schedule a meeting&quot; or &quot;check with manager,&quot; they subtly erode 
                the async-first, autonomous culture that Lovie is building.
              </p>
              <p className="text-text-secondary">
                By making culture constraints machine-checkable, the Quality Loop turns aspirational values 
                into enforceable standards. Every spec becomes an opportunity to reinforce the right behaviors.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="mt-20 py-8 px-4 sm:px-6 lg:px-8 border-t border-surface-3">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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