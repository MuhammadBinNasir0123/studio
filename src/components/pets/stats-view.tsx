'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import type { Activity, HealthRecord } from '@/lib/types';
import { useMemo } from 'react';
import { format, subDays } from 'date-fns';

interface StatsViewProps {
  activities: Activity[];
  healthRecords: HealthRecord[];
}

const chartConfig: ChartConfig = {
  walk: { label: 'Walks', color: 'hsl(var(--chart-2))' },
  meal: { label: 'Meals', color: 'hsl(var(--chart-1))' },
  grooming: { label: 'Grooming', color: 'hsl(var(--chart-3))' },
  vaccination: { label: 'Vaccinations', color: 'hsl(var(--chart-4))' },
  vet_visit: { label: 'Vet Visits', color: 'hsl(var(--chart-5))' },
  medication: { label: 'Medications', color: 'hsl(var(--chart-1))' },
};

const PIE_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function StatsView({ activities, healthRecords }: StatsViewProps) {
  const weeklyActivityData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();
    return last7Days.map(day => {
      const dayActivities = activities.filter(a => format(new Date(a.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
      return {
        date: format(day, 'MMM d'),
        walk: dayActivities.filter(a => a.type === 'Walk').length,
        meal: dayActivities.filter(a => a type === 'Meal').length,
      };
    });
  }, [activities]);

  const activityDistribution = useMemo(() => {
    const counts = activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [activities]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Weekly Activity</CardTitle>
          <CardDescription>Walks and meals in the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <BarChart data={weeklyActivityData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="walk" fill="var(--color-walk)" radius={4} />
              <Bar dataKey="meal" fill="var(--color-meal)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Activity Distribution</CardTitle>
          <CardDescription>Breakdown of all logged activities.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ChartContainer config={chartConfig} className="h-48 w-full aspect-square">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={activityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {activityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
