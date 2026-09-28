'use client';

import { useEffect } from 'react';

/**
 * MobileViewportLock
 * Disables pinch-to-zoom, gesture zoom, and double-tap zoom on mobile devices (iOS Safari & Android)
 * to keep the dashboard and modal views fixed at 100% scale without zooming out or in.
 */
export function MobileViewportLock() {
  useEffect(() => {
    // 1. Disable Safari gesture zoom (gesturestart, gesturechange, gestureend)
    const preventGesture = (e: Event) => {
      e.preventDefault();
    };

    // 2. Disable multi-touch pinch to zoom
    const preventMultiTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // 3. Disable double-tap zoom
    let lastTouchEnd = 0;
    const preventDoubleTap = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Attach listeners with passive: false to allow preventDefault()
    const options: AddEventListenerOptions = { passive: false };

    document.addEventListener('gesturestart', preventGesture, options);
    document.addEventListener('gesturechange', preventGesture, options);
    document.addEventListener('gestureend', preventGesture, options);
    document.addEventListener('touchmove', preventMultiTouch, options);
    document.addEventListener('touchend', preventDoubleTap, false);

    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
      document.removeEventListener('touchmove', preventMultiTouch);
      document.removeEventListener('touchend', preventDoubleTap);
    };
  }, []);

  return null;
}
