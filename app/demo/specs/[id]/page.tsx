'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, Badge, FailureTag, GoldBadge, ScoreRing, ScoreBar, Button } from '@/components/ui';
import specsData from '@/data/specs.json';
import goldStandardsData from '@/data/gold-standards.json';
import { formatDate } from '@/lib/utils';

type Tab = 'scorecard' | 'runs' | 'deltas' | 'gold';

export default function SpecDetailPage() {
  const params = useParams();
  const specId = params.id as string;
  const [activeTab, setActiveTab] = useState<Tab>('scorecard');
  
  const spec = specsData.find(s => s.id === specId);
  const goldStandard = spec?.goldStandard?.extracted 
    ? goldStandardsData.find(gs => gs.id === spec.goldStandard.patternId)
    : null;
  
  if (!spec) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Spec Not Found</h1>
          <p className="text-text-secondary mb-4">The spec &quot;{specId}&quot; doesn&apos;t exist.</p>
          <Button href="/demo/specs">Back to Specs</Button>
        </div>
      </div>
    );
  }
  
  const tabs: { id: Tab; label: string }[] = [
    { id: 'scorecard', label: 'Scorecard' },
    { id: 'runs', label: 'Runs' },
    { id: 'deltas', label: 'Deltas' },
    { id: 'gold', label: 'Gold Status' },
  ];
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <Link href="/demo/specs" className="text-text-muted hover:text-text-secondary transition-colors">
            ← Back to Specs
          </Link>
        </motion.div>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Score */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <ScoreRing score={spec.score} size="lg" />
                  <p className="text-sm text-text-muted mt-2">Quality Score</p>
                </div>
                
                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-text-muted font-mono">{spec.id}</span>
                    {spec.score >= 90 && <GoldBadge />}
                  </div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">{spec.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="secondary">{spec.domain}</Badge>
                    <span className="text-sm text-text-muted">
                      by {spec.author} • {formatDate(spec.createdAt)}
                    </span>
                  </div>
                  
                  {/* Spec Content Preview */}
                  <div className="p-3 bg-surface-2 rounded-lg">
                    <p className="text-sm text-text-secondary italic">&quot;{spec.specContent}&quot;</p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {spec.failureTags.length > 0 ? (
                      spec.failureTags.map(tag => <FailureTag key={tag} tag={tag} />)
                    ) : (
                      <Badge variant="success">No Issues</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-accent-primary text-white'
                  : 'bg-surface-2 text-text-secondary hover:bg-surface-3'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>
        
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Scorecard Tab */}
          {activeTab === 'scorecard' && (
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold text-text-primary mb-6">Score Breakdown</h2>
                <div className="space-y-6">
                  {Object.entries(spec.scorecard).map(([key, data]) => (
                    <div key={key} className="border-b border-surface-3 pb-4 last:border-0 last:pb-0">
                      <ScoreBar
                        score={data.score}
                        maxScore={data.max}
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      />
                      <p className="text-sm text-text-secondary mt-2">{data.rationale}</p>
                    </div>
                  ))}
                </div>
                
                {/* Culture Violations */}
                {spec.cultureViolations.length > 0 && (
                  <div className="mt-8 p-4 bg-accent-danger/10 border border-accent-danger/30 rounded-lg">
                    <h3 className="text-lg font-semibold text-accent-danger mb-4">Culture Violations</h3>
                    {spec.cultureViolations.map((violation, i) => (
                      <div key={i} className="mb-4 last:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="danger">{violation.rule}</Badge>
                          <Badge variant={violation.severity === 'high' ? 'danger' : 'warning'}>
                            {violation.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary mb-2">
                          <span className="text-text-muted">Quote:</span> &quot;{violation.quote}&quot;
                        </p>
                        <p className="text-sm text-accent-success">
                          <span className="text-text-muted">Suggestion:</span> {violation.suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Runs Tab */}
          {activeTab === 'runs' && (
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold text-text-primary mb-6">Run History</h2>
                <div className="space-y-4">
                  {spec.runs.map((run, i) => (
                    <div key={run.id} className="flex items-start gap-4 p-4 bg-surface-2 rounded-lg">
                      <div className="w-10 h-10 bg-surface-3 rounded-full flex items-center justify-center text-text-muted font-mono text-sm">
                        #{i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-mono text-text-muted">{run.id}</span>
                          <Badge variant={run.status === 'completed' ? 'success' : 'warning'}>
                            {run.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary mb-1">{run.notes}</p>
                        <p className="text-xs text-text-muted">
                          {new Date(run.createdAt).toLocaleString()} • {run.iterationCount} iteration{run.iterationCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Deltas Tab */}
          {activeTab === 'deltas' && (
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold text-text-primary mb-6">Suggested Improvements</h2>
                {spec.specDeltas.length > 0 ? (
                  <div className="space-y-4">
                    {spec.specDeltas.map((delta, i) => (
                      <div key={i} className="p-4 bg-surface-2 rounded-lg border-l-4 border-accent-primary">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={
                            delta.type === 'add' ? 'success' :
                            delta.type === 'remove' ? 'danger' :
                            'warning'
                          }>
                            {delta.type}
                          </Badge>
                          <span className="text-sm text-text-muted">at {delta.location}</span>
                        </div>
                        <p className="text-sm text-text-primary">{delta.suggestion}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-secondary">No improvements suggested.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Gold Status Tab */}
          {activeTab === 'gold' && (
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold text-text-primary mb-6">Gold Standard Status</h2>
                {spec.goldStandard.extracted && goldStandard ? (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div>
                        <p className="text-lg font-semibold text-accent-gold">Pattern Extracted!</p>
                        <p className="text-sm text-text-secondary">This spec&apos;s patterns are now in the Gold Standards library</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-accent-gold/10 border border-accent-gold/30 rounded-lg">
                      <h3 className="font-semibold text-text-primary mb-2">{goldStandard.patternName}</h3>
                      <p className="text-sm text-text-secondary mb-4">{goldStandard.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-accent-success mb-2">✓ Good Patterns</p>
                          <ul className="space-y-1">
                            {goldStandard.snippets.map((snippet, i) => (
                              <li key={i} className="text-sm text-text-secondary pl-3 border-l-2 border-accent-success">
                                {snippet}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-accent-danger mb-2">✗ Anti-Patterns</p>
                          <ul className="space-y-1">
                            {goldStandard.antiPatterns.map((pattern, i) => (
                              <li key={i} className="text-sm text-text-secondary pl-3 border-l-2 border-accent-danger">
                                {pattern}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-surface-3">
                        <Link href="/demo/gold-standards" className="text-sm text-accent-primary hover:underline">
                          View in Gold Standards Library →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg font-medium text-text-primary mb-2">Not Yet Eligible</p>
                    <p className="text-text-secondary mb-4">
                      {spec.goldStandard.reason || 'Score must be 90+ with no high-severity violations'}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-text-muted">
                      <span>Current Score:</span>
                      <ScoreRing score={spec.score} size="sm" />
                      <span>/ 90 needed</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}