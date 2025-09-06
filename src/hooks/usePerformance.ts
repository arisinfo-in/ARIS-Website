import { useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

export const usePerformance = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    const measurePerformance = () => {
      const metrics: Partial<PerformanceMetrics> = {};

      // Get navigation timing
      if (performance.getEntriesByType) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
        }
      }

      // Get Core Web Vitals
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              metrics.firstContentfulPaint = entry.startTime;
            }
          }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.largestContentfulPaint = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
          }
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          metrics.cumulativeLayoutShift = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
      }

      // Log metrics after page load
      setTimeout(() => {
        console.log('Performance Metrics:', metrics);
        
        // Send to analytics (if implemented)
        if (window.gtag) {
          window.gtag('event', 'performance_metrics', {
            load_time: metrics.loadTime,
            first_contentful_paint: metrics.firstContentfulPaint,
            largest_contentful_paint: metrics.largestContentfulPaint,
            first_input_delay: metrics.firstInputDelay,
            cumulative_layout_shift: metrics.cumulativeLayoutShift,
          });
        }
      }, 2000);
    };

    // Measure performance after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  useEffect(() => {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);

    // Preload critical images
    const criticalImages = [
      '/og-image.jpg',
      '/logo.png',
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });

    // Preload critical API endpoints
    const apiLink = document.createElement('link');
    apiLink.rel = 'preconnect';
    apiLink.href = process.env.NODE_ENV === 'production' 
      ? 'https://your-backend-domain.com' 
      : 'http://localhost:5001';
    document.head.appendChild(apiLink);
  }, []);
};
