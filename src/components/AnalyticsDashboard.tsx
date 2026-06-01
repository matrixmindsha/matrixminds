import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Users, Eye, FileText, TrendingUp, LogOut } from 'lucide-react';

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  pagesVisited: number;
  topPages: { page: string; visits: number }[];
  deviceStats: { device: string; count: number }[];
}

export const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    pagesVisited: 0,
    topPages: [],
    deviceStats: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roles) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      setAuthorized(true);

      try {
        const { data: allVisits, error } = await supabase.from('visitor_analytics').select('*');
        if (error) throw error;

        const totalVisits = allVisits?.length || 0;
        const uniqueVisitors = new Set(allVisits?.map((v) => v.session_id)).size;
        const pagesVisited = new Set(allVisits?.map((v) => v.page_path)).size;

        const pageCounts: Record<string, number> = {};
        allVisits?.forEach((v) => {
          pageCounts[v.page_path] = (pageCounts[v.page_path] || 0) + 1;
        });
        const topPages = Object.entries(pageCounts)
          .map(([page, visits]) => ({ page, visits }))
          .sort((a, b) => b.visits - a.visits)
          .slice(0, 5);

        const deviceCounts: Record<string, number> = {};
        allVisits?.forEach((v) => {
          if (v.device_type) deviceCounts[v.device_type] = (deviceCounts[v.device_type] || 0) + 1;
        });
        const deviceStats = Object.entries(deviceCounts)
          .map(([device, count]) => ({ device, count }))
          .sort((a, b) => b.count - a.count);

        setAnalytics({ totalVisits, uniqueVisitors, pagesVisited, topPages, deviceStats });
      } catch (e) {
        console.error('Analytics error', e);
      } finally {
        setLoading(false);
      }
    };
    checkAccess();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-center text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Access denied</h1>
        <p className="text-muted-foreground">
          Your account does not have admin access to view analytics.
        </p>
        <Button onClick={handleSignOut} variant="outline">Sign out</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <Helmet>
        <title>Visitor Analytics — Matrix Minds Admin</title>
        <meta name="description" content="Internal visitor analytics dashboard for Matrix Minds admins." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://matrixminds.lovable.app/analytics" />
        <meta property="og:title" content="Visitor Analytics — Matrix Minds Admin" />
        <meta property="og:description" content="Internal analytics dashboard." />
        <meta property="og:url" content="https://matrixminds.lovable.app/analytics" />
      </Helmet>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Visitor Analytics</h1>
          <p className="text-muted-foreground">Track and analyze your website traffic</p>
        </div>
        <Button onClick={handleSignOut} variant="outline" size="sm">
          <LogOut className="h-4 w-4 mr-2" /> Sign out
        </Button>
      </div>

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
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <span className="text-sm font-medium">{page.page}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{page.visits} visits</span>
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(page.visits / analytics.totalVisits) * 100}%` }}
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
                        style={{ width: `${(device.count / analytics.totalVisits) * 100}%` }}
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
