'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center"
        >
          <span className="text-4xl font-bold text-white">404</span>
        </motion.div>
        
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-8">
          This page doesn&apos;t exist in the Quality Loop demo. Let&apos;s get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" size="lg">
            Go Home
          </Button>
          <Button href="/demo" variant="outline" size="lg">
            Explore Demo
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
