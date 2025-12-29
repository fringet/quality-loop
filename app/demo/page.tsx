'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, ScoreRing, Badge } from '@/components/ui';
import insightsData from '@/data/insights.json';

export default function DemoPage() {
  const { summary, topInsights, scoreDistribution } = insightsData;
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Demo Dashboard</h1>
          <p className="text-text-secondary">
            Explore the Quality Loop in action with sample data
          </p>
          
          {/* Sample Data Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-lg">
            <span className="text-accent-primary/80 text-sm">
              <strong>Demo Mode:</strong> All data below is simulated to demonstrate the Quality Loop concept.
            </span>
          </div>
        </motion.div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Specs', value: summary.totalSpecs },
            { label: 'Avg Score', value: summary.averageScore },
            { label: 'Gold Standards', value: summary.goldStandardsCount },
            { label: 'Avg Iterations', value: summary.averageIterations },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center">
                <CardContent>
                  <p className="text-3xl font-bold text-text-primary">{metric.value}</p>
                  <p className="text-sm text-text-muted">{metric.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Score Distribution & Quick Links */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Score Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Score Distribution</h3>
                <div className="space-y-3">
                  {scoreDistribution.map((item) => (
                    <div key={item.range} className="flex items-center gap-3">
                      <div className="w-20 text-sm text-text-muted">{item.range}</div>
                      <div className="flex-1 h-6 bg-surface-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.count / summary.totalSpecs) * 100}%` }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className={`h-full rounded-full ${
                            item.label === 'Gold Standard' ? 'bg-accent-gold' :
                            item.label === 'Good' ? 'bg-accent-success' :
                            item.label === 'Needs Work' ? 'bg-accent-warning' :
                            'bg-accent-danger'
                          }`}
                        />
                      </div>
                      <div className="w-8 text-sm text-text-primary font-medium">{item.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Explore</h3>
                <div className="space-y-3">
                  {[
                    { href: '/demo/specs', label: 'Spec Ledger', desc: 'View all specs with scores' },
                    { href: '/demo/gold-standards', label: 'Gold Standards', desc: 'Reusable patterns library' },
                    { href: '/demo/insights', label: 'Insights', desc: 'Organizational patterns' },
                    { href: '/demo/culture-constraints', label: 'Culture Rules', desc: 'What we check against' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 p-3 bg-surface-2 rounded-lg hover:bg-surface-3 transition-colors"
                    >
                      <div>
                        <p className="text-text-primary font-medium">{link.label}</p>
                        <p className="text-xs text-text-muted">{link.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Top Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Top Insights</h3>
                <Link href="/demo/insights" className="text-sm text-accent-primary hover:underline">
                  View all →
                </Link>
              </div>
              <div className="space-y-4">
                {topInsights.map((insight, i) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex gap-4 p-4 bg-surface-2 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <Badge variant={
                        insight.type === 'pattern' ? 'danger' :
                        insight.type === 'opportunity' ? 'warning' :
                        'success'
                      }>
                        {insight.type}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{insight.title}</h4>
                      <p className="text-sm text-text-secondary mt-1">{insight.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Sample Spec Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 border-accent-primary/20">
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    See Quality Loop in Action
                  </h3>
                  <p className="text-text-secondary">
                    Explore a sample spec with full scorecard, culture violations, and Gold Standard extraction.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <ScoreRing score={94} size="md" />
                  <Link
                    href="/demo/specs/SPEC-2025-001"
                    className="px-4 py-2 bg-accent-primary hover:bg-accent-primary/90 text-white font-medium rounded-lg transition-colors"
                  >
                    View Spec
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
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