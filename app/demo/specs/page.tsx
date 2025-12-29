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
    </div>
  );
}