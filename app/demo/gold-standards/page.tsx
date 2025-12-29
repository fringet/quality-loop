'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, Badge } from '@/components/ui';
import goldStandardsData from '@/data/gold-standards.json';

export default function GoldStandardsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredStandards = goldStandardsData.filter((gs) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      gs.patternName.toLowerCase().includes(query) ||
      gs.description.toLowerCase().includes(query) ||
      gs.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Gold Standards</h1>
          <p className="text-text-secondary">
            Proven spec patterns extracted from high-scoring specs. Reuse these to write better specs faster.
          </p>
        </motion.div>
        
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search patterns by name, description, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-surface-1 border border-surface-3 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
          />
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="p-4 bg-surface-1 border border-surface-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-accent-gold">{goldStandardsData.length}</p>
            <p className="text-sm text-text-muted">Patterns</p>
          </div>
          <div className="p-4 bg-surface-1 border border-surface-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-text-primary">
              {goldStandardsData.reduce((sum, gs) => sum + gs.usageCount, 0)}
            </p>
            <p className="text-sm text-text-muted">Times Used</p>
          </div>
          <div className="p-4 bg-surface-1 border border-surface-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-text-primary">
              {new Set(goldStandardsData.flatMap(gs => gs.tags)).size}
            </p>
            <p className="text-sm text-text-muted">Tags</p>
          </div>
        </motion.div>
        
        {/* Gold Standards List */}
        <div className="space-y-6">
          {filteredStandards.map((gs, i) => (
            <motion.div
              key={gs.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Card className="border-accent-gold/20 hover:border-accent-gold/40 transition-colors">
                <CardContent>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-text-primary">{gs.patternName}</h3>
                      </div>
                      <p className="text-sm text-text-secondary">{gs.description}</p>
                    </div>
                    <Badge variant="gold">{gs.usageCount} uses</Badge>
                  </div>
                  
                  {/* When to Use */}
                  <div className="mb-4 p-3 bg-surface-2 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium text-text-primary">When to use: </span>
                      <span className="text-text-secondary">{gs.whenToUse}</span>
                    </p>
                  </div>
                  
                  {/* Snippets & Anti-patterns */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-accent-success mb-2">✓ Use These Patterns</p>
                      <ul className="space-y-2">
                        {gs.snippets.map((snippet, j) => (
                          <li key={j} className="text-sm text-text-secondary p-2 bg-accent-success/10 rounded border-l-2 border-accent-success">
                            &quot;{snippet}&quot;
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-accent-danger mb-2">✗ Avoid These</p>
                      <ul className="space-y-2">
                        {gs.antiPatterns.map((pattern, j) => (
                          <li key={j} className="text-sm text-text-secondary p-2 bg-accent-danger/10 rounded border-l-2 border-accent-danger">
                            &quot;{pattern}&quot;
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Tags & Source */}
                  <div className="flex flex-wrap items-center justify-between pt-4 border-t border-surface-3">
                    <div className="flex flex-wrap gap-1">
                      {gs.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">#{tag}</Badge>
                      ))}
                    </div>
                    <Link 
                      href={`/demo/specs/${gs.sourceSpecId}`}
                      className="text-sm text-accent-primary hover:underline"
                    >
                      Source: {gs.sourceSpecTitle} →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredStandards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-text-muted">No patterns match your search.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-accent-primary hover:underline"
            >
              Clear search
            </button>
          </motion.div>
        )}
        
        {/* How Gold Standards Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-surface-1">
            <CardContent>
              <h3 className="text-lg font-semibold text-text-primary mb-4">How Gold Standards Are Created</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    step: '1',
                    title: 'High Score',
                    description: 'Spec achieves 90+ score with no high-severity culture violations'
                  },
                  {
                    step: '2',
                    title: 'Pattern Extraction',
                    description: 'Quality Loop analyzes the spec and extracts reusable phrasing patterns'
                  },
                  {
                    step: '3',
                    title: 'Library Addition',
                    description: 'Patterns are added here with usage guidance and anti-pattern warnings'
                  }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-10 h-10 bg-accent-gold/20 text-accent-gold rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                      {item.step}
                    </div>
                    <p className="font-medium text-text-primary">{item.title}</p>
                    <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
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