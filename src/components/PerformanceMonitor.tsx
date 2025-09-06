import React, { useState, useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  memoryUsage?: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const measurePerformance = () => {
      const newMetrics: Partial<PerformanceMetrics> = {};

      // Navigation timing
      if (performance.getEntriesByType) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          newMetrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
        }
      }

      // Memory usage (if available)
      if ('memory' in performance) {
        newMetrics.memoryUsage = (performance as any).memory.usedJSHeapSize / (1024 * 1024); // MB
      }

      // Core Web Vitals
      if ('PerformanceObserver' in window) {
        // FCP
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              newMetrics.firstContentfulPaint = entry.startTime;
            }
          }
        }).observe({ entryTypes: ['paint'] });

        // LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          newMetrics.largestContentfulPaint = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FID
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            newMetrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
          }
        }).observe({ entryTypes: ['first-input'] });

        // CLS
        new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          newMetrics.cumulativeLayoutShift = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
      }

      setMetrics(newMetrics as PerformanceMetrics);
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  // Toggle visibility with keyboard shortcut (Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return null;
  }

  const getScoreColor = (value: number, thresholds: { good: number; needsImprovement: number }) => {
    if (value <= thresholds.good) return 'text-green-500';
    if (value <= thresholds.needsImprovement) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-xs"
        >
          ✕
        </button>
      </div>
      
      {metrics ? (
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Load Time:</span>
            <span className={getScoreColor(metrics.loadTime, { good: 2000, needsImprovement: 4000 })}>
              {metrics.loadTime?.toFixed(0)}ms
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>FCP:</span>
            <span className={getScoreColor(metrics.firstContentfulPaint, { good: 1800, needsImprovement: 3000 })}>
              {metrics.firstContentfulPaint?.toFixed(0)}ms
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>LCP:</span>
            <span className={getScoreColor(metrics.largestContentfulPaint, { good: 2500, needsImprovement: 4000 })}>
              {metrics.largestContentfulPaint?.toFixed(0)}ms
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>FID:</span>
            <span className={getScoreColor(metrics.firstInputDelay, { good: 100, needsImprovement: 300 })}>
              {metrics.firstInputDelay?.toFixed(0)}ms
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>CLS:</span>
            <span className={getScoreColor(metrics.cumulativeLayoutShift, { good: 0.1, needsImprovement: 0.25 })}>
              {metrics.cumulativeLayoutShift?.toFixed(3)}
            </span>
          </div>
          
          {metrics.memoryUsage && (
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className={getScoreColor(metrics.memoryUsage, { good: 50, needsImprovement: 100 })}>
                {metrics.memoryUsage.toFixed(1)}MB
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-xs text-gray-400">Loading metrics...</div>
      )}
      
      <div className="mt-2 text-xs text-gray-400">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;
