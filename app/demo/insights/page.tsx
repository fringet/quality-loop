'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, Badge, FailureTag } from '@/components/ui';
import insightsData from '@/data/insights.json';

export default function InsightsPage() {
  const { summary, failureTagDistribution, scoreDistribution, topInsights, domainBreakdown } = insightsData;
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Organizational Insights</h1>
          <p className="text-text-secondary">
            Systemic patterns across all specs. Find what&apos;s working and what needs improvement.
          </p>
        </motion.div>
        
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          {[
            { label: 'Total Specs', value: summary.totalSpecs },
            { label: 'Avg Score', value: summary.averageScore },
            { label: 'Gold Standards', value: summary.goldStandardsCount },
            { label: 'Needs Attention', value: summary.specsNeedingAttention },
            { label: 'Avg Iterations', value: summary.averageIterations },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="p-4 bg-surface-1 border border-surface-3 rounded-lg text-center"
            >
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Failure Tag Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Failure Tags Distribution</h3>
                <div className="space-y-3">
                  {failureTagDistribution.map((item) => (
                    <div key={item.tag} className="flex items-center gap-3">
                      <div className="w-full max-w-[200px]">
                        <FailureTag tag={item.tag} />
                      </div>
                      <div className="flex-1 h-4 bg-surface-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="h-full bg-accent-danger/60 rounded-full"
                        />
                      </div>
                      <span className="text-sm text-text-muted w-8">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Score Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Score Distribution</h3>
                <div className="space-y-3">
                  {scoreDistribution.map((item) => {
                    const color = 
                      item.label === 'Gold Standard' ? 'bg-accent-gold' :
                      item.label === 'Good' ? 'bg-accent-success' :
                      item.label === 'Needs Work' ? 'bg-accent-warning' :
                      'bg-accent-danger';
                    
                    return (
                      <div key={item.range} className="flex items-center gap-3">
                        <div className="w-20 text-sm text-text-muted">{item.range}</div>
                        <div className="flex-1 h-6 bg-surface-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.count / summary.totalSpecs) * 100}%` }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className={`h-full ${color} rounded-full flex items-center justify-end pr-2`}
                          >
                            <span className="text-xs font-medium text-white">{item.count}</span>
                          </motion.div>
                        </div>
                        <div className="w-24 text-xs text-text-muted">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Domain Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Performance by Domain</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {domainBreakdown.map((domain) => {
                  const scoreColor = 
                    domain.avgScore >= 90 ? 'text-accent-gold' :
                    domain.avgScore >= 80 ? 'text-accent-success' :
                    domain.avgScore >= 70 ? 'text-accent-warning' :
                    'text-accent-danger';
                  
                  return (
                    <div key={domain.domain} className="p-4 bg-surface-2 rounded-lg text-center">
                      <p className="text-sm font-medium text-text-primary mb-1">{domain.domain}</p>
                      <p className={`text-2xl font-bold ${scoreColor}`}>{domain.avgScore}</p>
                      <p className="text-xs text-text-muted">{domain.count} spec{domain.count !== 1 ? 's' : ''}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Top Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-text-primary mb-6">Actionable Insights</h3>
              <div className="space-y-6">
                {topInsights.map((insight, i) => {
                  const typeConfig = {
                    pattern: { color: 'border-accent-danger', bg: 'bg-accent-danger/10' },
                    opportunity: { color: 'border-accent-warning', bg: 'bg-accent-warning/10' },
                    success: { color: 'border-accent-success', bg: 'bg-accent-success/10' },
                  };
                  const config = typeConfig[insight.type as keyof typeof typeConfig];
                  
                  return (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={`p-5 rounded-lg border-l-4 ${config.color} ${config.bg}`}
                    >
                      <div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-text-primary">{insight.title}</h4>
                            <Badge variant={
                              insight.severity === 'high' ? 'danger' :
                              insight.severity === 'medium' ? 'warning' :
                              'success'
                            }>
                              {insight.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-text-secondary mb-3">{insight.description}</p>
                          <div className="p-3 bg-surface-1 rounded-lg mb-3">
                            <p className="text-sm">
                              <span className="font-medium text-text-primary">Recommendation: </span>
                              <span className="text-text-secondary">{insight.recommendation}</span>
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs text-text-muted">Affected specs:</span>
                            {insight.affectedSpecs.map((specId) => (
                              <Link 
                                key={specId} 
                                href={`/demo/specs/${specId}`}
                                className="text-xs text-accent-primary hover:underline"
                              >
                                {specId}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* How Insights Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 border-accent-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                The Value of Organizational Insights
              </h3>
              <p className="text-text-secondary mb-4">
                Without the Quality Loop, these patterns would stay hidden. Individual builders might notice their own mistakes, 
                but systemic issues—like a tendency toward sync dependencies—would never surface until they cause major delays.
              </p>
              <p className="text-text-secondary">
                By tracking failure tags, culture violations, and iteration counts across all specs, the Quality Loop 
                makes organizational learning visible and actionable.
              </p>
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