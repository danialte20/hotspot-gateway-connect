
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  Clock, 
  Globe, 
  Smartphone, 
  WifiOff, 
  RefreshCw, 
  LogOut,
  Activity,
  Calendar,
  MapPin
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface SessionData {
  ip: string;
  mac: string;
  device: string;
  loginType: string;
  username: string;
  voucherCode?: string;
  loginTime: string;
  duration: string;
  startTime: string;
}

const Status = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [usageProgress, setUsageProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Load session data from localStorage
    const storedSession = localStorage.getItem('hotspotSession');
    if (storedSession) {
      setSessionData(JSON.parse(storedSession));
    } else {
      // No session found, redirect to login
      navigate('/login');
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      updateSessionStatus();
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  const updateSessionStatus = () => {
    if (!sessionData) return;

    // Simulate calculating remaining time
    const loginTime = new Date(sessionData.loginTime);
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - loginTime.getTime()) / 1000 / 60); // minutes

    let totalMinutes = 0;
    if (sessionData.loginType === 'voucher') {
      totalMinutes = 180; // 3 hours
    } else {
      totalMinutes = 43200; // 30 days in minutes
    }

    const remaining = Math.max(0, totalMinutes - elapsed);
    const progress = Math.min(100, (elapsed / totalMinutes) * 100);

    setUsageProgress(progress);

    if (remaining === 0) {
      setIsOnline(false);
      setTimeRemaining('Expired');
    } else if (sessionData.loginType === 'voucher') {
      const hours = Math.floor(remaining / 60);
      const minutes = remaining % 60;
      setTimeRemaining(`${hours}h ${minutes}m`);
    } else {
      const days = Math.floor(remaining / 1440);
      const hours = Math.floor((remaining % 1440) / 60);
      setTimeRemaining(`${days}d ${hours}h`);
    }
  };

  const handleRefresh = () => {
    toast({
      title: "Status Diperbarui",
      description: "Informasi koneksi telah diperbarui",
    });
    updateSessionStatus();
  };

  const handleLogout = () => {
    localStorage.removeItem('hotspotSession');
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sesi hotspot",
    });
    navigate('/login');
  };

  const handleExtendSession = () => {
    navigate('/voucher');
  };

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Loading session data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Status Koneksi</h1>
            <p className="text-gray-600">Monitor status internet dan informasi sesi Anda</p>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status Koneksi</CardTitle>
                {isOnline ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
              </CardHeader>
              <CardContent>
                <Badge className={isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {isOnline ? 'Online' : 'Offline'}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sisa Waktu</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{timeRemaining}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tipe Login</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="capitalize">
                  {sessionData.loginType}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Usage Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Penggunaan Waktu</CardTitle>
              <CardDescription>Progress penggunaan dari total durasi yang tersedia</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={usageProgress} className="w-full mb-2" />
              <p className="text-sm text-gray-600">{usageProgress.toFixed(1)}% dari total waktu telah digunakan</p>
            </CardContent>
          </Card>

          {/* Session Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Informasi Jaringan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">IP Address:</span>
                  <span className="font-mono">{sessionData.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">MAC Address:</span>
                  <span className="font-mono">{sessionData.mac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gateway:</span>
                  <span className="font-mono">192.168.1.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DNS Server:</span>
                  <span className="font-mono">8.8.8.8</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  Informasi Sesi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Username:</span>
                  <span className="font-semibold">{sessionData.username}</span>
                </div>
                {sessionData.voucherCode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kode Voucher:</span>
                    <span className="font-mono">{sessionData.voucherCode}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Device:</span>
                  <span>{sessionData.device}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Login Time:</span>
                  <span>{new Date(sessionData.loginTime).toLocaleString('id-ID')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleRefresh}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Status
                </Button>
                
                {sessionData.loginType === 'voucher' && (
                  <Button 
                    onClick={handleExtendSession}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Perpanjang Sesi
                  </Button>
                )}
                
                <Button 
                  onClick={handleLogout}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Connection Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                Tips Koneksi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Jangan tutup halaman ini selama menggunakan internet</li>
                <li>• Refresh status secara berkala untuk update terbaru</li>
                <li>• Hubungi admin jika mengalami masalah koneksi</li>
                <li>• Logout ketika selesai menggunakan internet</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Status;
