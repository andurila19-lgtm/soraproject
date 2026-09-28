'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface TableScrollWrapperProps {
  children: React.ReactNode;
  minWidth?: string; // e.g. "min-w-[800px]"
  className?: string;
  hint?: string;
}

export function TableScrollWrapper({
  children,
  minWidth = "min-w-[780px]",
  className = "",
  hint = "Geser tabel ke samping",
}: TableScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(true);
  const [scrollPosition, setScrollPosition] = useState<'start' | 'middle' | 'end'>('start');

  const checkScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;
    const canScroll = scrollWidth > clientWidth + 4;
    setHasOverflow(canScroll);
    if (scrollLeft <= 8) {
      setScrollPosition('start');
    } else if (scrollLeft + clientWidth >= scrollWidth - 8) {
      setScrollPosition('end');
    } else {
      setScrollPosition('middle');
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    // Double check after fonts/DOM layout settles
    const timer = setTimeout(checkScroll, 150);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [checkScroll]);

  const scrollByAmount = (amount: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 200);
  };

  // Mouse click-and-drag scrolling support (for desktop mobile simulation)
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag if not clicking directly on button, select, input, or link
    const target = e.target as HTMLElement;
    if (target.closest('button, select, input, a, textarea')) {
      return;
    }
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftState(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeftState - walk;
    checkScroll();
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Mobile Swipe Hint Badge + Quick Nudge Buttons */}
      {hasOverflow && (
        <div className="flex sm:hidden items-center justify-between px-3 py-1.5 bg-[#EFF2F7] border-b border-[#E2E8F0] text-[11px] text-[#3C50E0] font-medium select-none">
          <div className="flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5 animate-pulse text-[#3C50E0]" />
            <span className="font-semibold">{hint}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#64748B] font-mono mr-1">
              {scrollPosition === 'start' && '➡️ Geser'}
              {scrollPosition === 'middle' && '↔️ Geser'}
              {scrollPosition === 'end' && '⬅️ Geser'}
            </span>
            <button
              type="button"
              onClick={() => scrollByAmount(-220)}
              disabled={scrollPosition === 'start'}
              className="p-1 rounded bg-white border border-[#CBD5E1] text-[#1C2434] disabled:opacity-30 disabled:pointer-events-none active:bg-[#E2E8F0] shadow-xs"
              title="Geser tabel ke kiri"
              aria-label="Geser ke kiri"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(220)}
              disabled={scrollPosition === 'end'}
              className="p-1 rounded bg-white border border-[#CBD5E1] text-[#1C2434] disabled:opacity-30 disabled:pointer-events-none active:bg-[#E2E8F0] shadow-xs"
              title="Geser tabel ke kanan"
              aria-label="Geser ke kanan"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Edge gradient cues for horizontal scrolling */}
      {hasOverflow && scrollPosition !== 'start' && (
        <div className="sm:hidden absolute left-0 top-[29px] bottom-0 w-3 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />
      )}
      {hasOverflow && scrollPosition !== 'end' && (
        <div className="sm:hidden absolute right-0 top-[29px] bottom-0 w-3 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
      )}

      {/* Table Scroll Container */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto touch-pan-x overscroll-x-contain table-scroll-container ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab sm:cursor-auto'
        }`}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className={`inline-block min-w-full align-middle ${minWidth}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

