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
    </div>
  );
}