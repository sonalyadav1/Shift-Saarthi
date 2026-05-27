'use client';

import Link from 'next/link';
import { Search, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  onSearch: (query: string) => void;
}

export function DashboardHeader({ onSearch }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Shift Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Real-time patient overview and shift handoff management
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search patients, beds, IDs..."
            className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/handoff">
            <Mic className="w-4 h-4" />
            New Handoff
          </Link>
        </Button>
      </div>
    </div>
  );
}
