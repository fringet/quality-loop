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
    </div>
  );
}