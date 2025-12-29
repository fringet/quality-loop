'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/system-flow', label: 'System Flow' },
  { href: '/demo', label: 'Demo' },
];

const demoSubItems = [
  { href: '/demo/specs', label: 'Specs' },
  { href: '/demo/gold-standards', label: 'Gold Standards' },
  { href: '/demo/insights', label: 'Insights' },
  { href: '/demo/culture-constraints', label: 'Culture' },
];

export function Nav() {
  const pathname = usePathname();
  const isDemo = pathname.startsWith('/demo');
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface-3">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">QL</span>
            </div>
            <span className="font-semibold text-text-primary hidden sm:block">Quality Loop</span>
          </Link>
          
          {/* Main Nav */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = item.href === '/' 
                ? pathname === '/' 
                : pathname.startsWith(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'text-text-primary' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-surface-2 rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* CTA */}
          <Link
            href="/demo"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-accent-primary hover:bg-accent-primary/90 rounded-lg transition-colors"
          >
            Try Demo
          </Link>
          </div>
        
        {/* Demo Sub-nav */}
        {isDemo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-3 -mt-1"
          >
            <div className="flex items-center gap-2 bg-surface-1/70 backdrop-blur-md border border-surface-3 rounded-xl px-2 py-2 overflow-x-auto">
              <span className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-text-muted bg-surface-2 rounded-lg whitespace-nowrap">
                Demo sections
              </span>

              <div className="h-6 w-px bg-surface-3 hidden sm:block" />

              <div className="flex items-center gap-1">
                {demoSubItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                        isActive
                          ? 'text-text-primary'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeDemoTab"
                          className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/30 rounded-lg -z-10"
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.55 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
        </nav>
      </header>

      {/* Spacer so fixed header never overlaps content */}
      <div aria-hidden className={isDemo ? 'h-[116px]' : 'h-16'} />
    </>
  );
}
