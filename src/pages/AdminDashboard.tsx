import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import {
  LayoutDashboard, BookOpen, Code2, MessageSquare, BarChart3,
  Users, Eye, LogOut, ExternalLink, Settings, ShieldCheck, Upload,
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ visits: 0, unique: 0, storeAccess: 0 });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/auth'); return; }
      const { data: role } = await supabase
        .from('user_roles').select('role')
        .eq('user_id', user.id).eq('role', 'admin').maybeSingle();
      if (!role) { setAuthorized(false); setLoading(false); return; }
      setAuthorized(true);
      try {
        const [{ data: visits }, { data: access }] = await Promise.all([
          supabase.from('visitor_analytics').select('session_id'),
          supabase.from('store_access').select('id'),
        ]);
        setStats({
          visits: visits?.length ?? 0,
          unique: new Set(visits?.map(v => v.session_id)).size,
          storeAccess: access?.length ?? 0,
        });
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, [navigate]);

  const signOut = async () => { await supabase.auth.signOut(); navigate('/'); };

  if (loading) return <div className="container mx-auto py-16 text-center text-muted-foreground">Loading admin console…</div>;

  if (authorized === false) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-md text-center space-y-4">
        <ShieldCheck className="w-12 h-12 mx-auto text-muted-foreground" />
        <h1 className="text-2xl font-bold">Access denied</h1>
        <p className="text-muted-foreground">Your account does not have admin access.</p>
        <Button onClick={signOut} variant="outline">Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Console — Matrix Minds</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Top bar */}
      <div className="border-b border-border bg-card/40 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <div>
              <h1 className="font-orbitron text-lg font-bold">Matrix Minds Admin</h1>
              <p className="text-xs text-muted-foreground">Internal control panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/"><Button variant="ghost" size="sm"><ExternalLink className="w-4 h-4 mr-1" />View site</Button></Link>
            <Button onClick={signOut} variant="outline" size="sm"><LogOut className="w-4 h-4 mr-1" />Sign out</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="overview"><LayoutDashboard className="w-4 h-4 mr-1" />Overview</TabsTrigger>
            <TabsTrigger value="analytics"><BarChart3 className="w-4 h-4 mr-1" />Analytics</TabsTrigger>
            <TabsTrigger value="ebooks"><BookOpen className="w-4 h-4 mr-1" />eBooks</TabsTrigger>
            <TabsTrigger value="code"><Code2 className="w-4 h-4 mr-1" />Source code</TabsTrigger>
            <TabsTrigger value="feedback"><MessageSquare className="w-4 h-4 mr-1" />Feedback</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card><CardHeader className="flex flex-row justify-between pb-2"><CardTitle className="text-sm">Total Visits</CardTitle><Eye className="w-4 h-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.visits}</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row justify-between pb-2"><CardTitle className="text-sm">Unique Visitors</CardTitle><Users className="w-4 h-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.unique}</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row justify-between pb-2"><CardTitle className="text-sm">Store Access Granted</CardTitle><ShieldCheck className="w-4 h-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.storeAccess}</div></CardContent></Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
                <CardDescription>Common admin tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" className="justify-start" asChild><Link to="/"><ExternalLink className="w-4 h-4 mr-2" />Open public site</Link></Button>
                <Button variant="outline" className="justify-start" disabled><Upload className="w-4 h-4 mr-2" />Upload new product (soon)</Button>
                <Button variant="outline" className="justify-start" disabled><Settings className="w-4 h-4 mr-2" />Site settings (soon)</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics"><AnalyticsDashboard /></TabsContent>

          {/* eBooks */}
          <TabsContent value="ebooks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" />eBook management</CardTitle>
                <CardDescription>Edit, upload and price your digital books</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 border border-dashed rounded-lg text-center text-muted-foreground">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="mb-2">Drag &amp; drop PDFs here, or click to browse</p>
                  <Badge variant="secondary">Coming next: full eBook CRUD</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  This panel will let you add titles, set prices, replace cover images and PDFs, and grant free access to specific emails — all without code changes.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Source code */}
          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Code2 className="w-5 h-5" />Source-code packages</CardTitle>
                <CardDescription>Manage downloadable ZIP packages for sale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 border border-dashed rounded-lg text-center text-muted-foreground">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="mb-2">Upload .zip / .tar.gz source bundles</p>
                  <Badge variant="secondary">Coming next: versioning &amp; changelogs</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback */}
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" />Customer feedback</CardTitle>
                <CardDescription>Submissions are forwarded to matrixmindsha@gmail.com</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All feedback messages are delivered straight to your inbox. A searchable archive will be added here next.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
