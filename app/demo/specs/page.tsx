'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, Badge, FailureTag, GoldBadge, ScoreRing } from '@/components/ui';
import specsData from '@/data/specs.json';
import { formatDate } from '@/lib/utils';

type FilterStatus = 'all' | 'gold' | 'good' | 'needs-work' | 'needs-attention';

export default function SpecsPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');
  
  const filteredSpecs = specsData.filter((spec) => {
    if (filter === 'all') return true;
    if (filter === 'gold') return spec.score >= 90;
    if (filter === 'good') return spec.score >= 80 && spec.score < 90;
    if (filter === 'needs-work') return spec.score >= 70 && spec.score < 80;
    if (filter === 'needs-attention') return spec.score < 70;
    return true;
  });
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Spec Ledger</h1>
          <p className="text-text-secondary">
            All specs tracked with quality scores and failure tags
          </p>
          
          {/* Sample Data Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <span className="text-amber-200 text-sm">
              <strong>Demo Mode:</strong> These are simplified sample specs for demonstration. In production, specs would come from your CloudFlow builds.
            </span>
          </div>
        </motion.div>
        
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {[
            { value: 'all', label: 'All', count: specsData.length },
            { value: 'gold', label: 'Gold Standard', count: specsData.filter(s => s.score >= 90).length },
            { value: 'good', label: 'Good', count: specsData.filter(s => s.score >= 80 && s.score < 90).length },
            { value: 'needs-work', label: 'Needs Work', count: specsData.filter(s => s.score >= 70 && s.score < 80).length },
            { value: 'needs-attention', label: 'Needs Attention', count: specsData.filter(s => s.score < 70).length },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as FilterStatus)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filter === f.value
                  ? 'bg-accent-primary text-white'
                  : 'bg-surface-2 text-text-secondary hover:bg-surface-3'
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </motion.div>
        
        {/* Specs List */}
        <div className="space-y-4">
          {filteredSpecs.map((spec, i) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link href={`/demo/specs/${spec.id}`}>
                <Card hover className="group">
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Score Ring */}
                      <div className="flex-shrink-0">
                        <ScoreRing score={spec.score} size="sm" />
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-text-muted font-mono">{spec.id}</span>
                          {spec.score >= 90 && <GoldBadge />}
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                          {spec.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Badge variant="secondary">{spec.domain}</Badge>
                          <span className="text-xs text-text-muted">
                            {spec.author} • {formatDate(spec.createdAt)}
                          </span>
                          <span className="text-xs text-text-muted">
                            • {spec.iterationCount} iteration{spec.iterationCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      
                      {/* Failure Tags */}
                      <div className="flex flex-wrap gap-1 md:justify-end">
                        {spec.failureTags.length > 0 ? (
                          spec.failureTags.map((tag) => (
                            <FailureTag key={tag} tag={tag} />
                          ))
                        ) : (
                          <Badge variant="success">No Issues</Badge>
                        )}
                      </div>
                      
                      {/* Arrow */}
                      <div className="hidden md:block text-text-muted group-hover:text-accent-primary transition-colors">
                        →
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredSpecs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-text-muted">No specs match the selected filter.</p>
            <button
              onClick={() => setFilter('all')}
              className="mt-2 text-accent-primary hover:underline"
            >
              Show all specs
            </button>
          </motion.div>
        )}
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