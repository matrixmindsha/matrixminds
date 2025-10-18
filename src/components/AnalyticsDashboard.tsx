import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Eye, FileText, TrendingUp } from 'lucide-react';

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  pagesVisited: number;
  topPages: { page: string; visits: number }[];
  deviceStats: { device: string; count: number }[];
}

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    pagesVisited: 0,
    topPages: [],
    deviceStats: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Get total stats
        const { data: allVisits, error: visitsError } = await supabase
          .from('visitor_analytics')
          .select('*');

        if (visitsError) throw visitsError;

        const totalVisits = allVisits?.length || 0;
        const uniqueVisitors = new Set(allVisits?.map(v => v.session_id)).size;
        const pagesVisited = new Set(allVisits?.map(v => v.page_path)).size;

        // Get top pages
        const pageCounts: Record<string, number> = {};
        allVisits?.forEach(visit => {
          pageCounts[visit.page_path] = (pageCounts[visit.page_path] || 0) + 1;
        });
        const topPages = Object.entries(pageCounts)
          .map(([page, visits]) => ({ page, visits }))
          .sort((a, b) => b.visits - a.visits)
          .slice(0, 5);

        // Get device stats
        const deviceCounts: Record<string, number> = {};
        allVisits?.forEach(visit => {
          if (visit.device_type) {
            deviceCounts[visit.device_type] = (deviceCounts[visit.device_type] || 0) + 1;
          }
        });
        const deviceStats = Object.entries(deviceCounts)
          .map(([device, count]) => ({ device, count }))
          .sort((a, b) => b.count - a.count);

        setAnalytics({
          totalVisits,
          uniqueVisitors,
          pagesVisited,
          topPages,
          deviceStats,
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Visitor Analytics</h1>
        <p className="text-muted-foreground">Track and analyze your website traffic</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalVisits}</div>
            <p className="text-xs text-muted-foreground">All time visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueVisitors}</div>
            <p className="text-xs text-muted-foreground">Unique sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pages Visited</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.pagesVisited}</div>
            <p className="text-xs text-muted-foreground">Different pages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.uniqueVisitors > 0
                ? (analytics.totalVisits / analytics.uniqueVisitors).toFixed(1)
                : '0'}
            </div>
            <p className="text-xs text-muted-foreground">Avg. pages per visitor</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most visited pages on your site</CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.topPages.length > 0 ? (
            <div className="space-y-4">
              {analytics.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      #{index + 1}
                    </span>
                    <span className="text-sm font-medium">{page.page}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{page.visits} visits</span>
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(page.visits / analytics.totalVisits) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No page data yet</p>
          )}
        </CardContent>
      </Card>

      {/* Device Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Device Types</CardTitle>
          <CardDescription>Breakdown of visitor devices</CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.deviceStats.length > 0 ? (
            <div className="space-y-4">
              {analytics.deviceStats.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{device.device}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{device.count} visits</span>
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(device.count / analytics.totalVisits) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No device data yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
