
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Wifi, Clock, User, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(5);
  
  // Get login data from navigation state
  const loginData = location.state || {};
  const { loginType, username, voucherCode } = loginData;

  useEffect(() => {
    // Simulate successful authentication and get session data
    const sessionData = {
      ip: '192.168.1.100',
      mac: '00:11:22:33:44:55',
      device: 'Android Device',
      startTime: new Date().toISOString(),
      duration: loginType === 'voucher' ? '3 hours' : '30 days'
    };

    // Store session data in localStorage for status monitoring
    localStorage.setItem('hotspotSession', JSON.stringify({
      ...sessionData,
      loginType,
      username: username || 'Guest',
      voucherCode: voucherCode || null,
      loginTime: new Date().toISOString()
    }));

    // Countdown timer for auto redirect
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/status');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, loginType, username, voucherCode]);

  const handleManualRedirect = () => {
    navigate('/status');
  };

  const getLoginIcon = () => {
    switch (loginType) {
      case 'voucher':
        return <Wifi className="h-12 w-12 text-blue-600" />;
      case 'member':
        return <User className="h-12 w-12 text-green-600" />;
      default:
        return <Globe className="h-12 w-12 text-purple-600" />;
    }
  };

  const getSuccessMessage = () => {
    switch (loginType) {
      case 'voucher':
        return `Voucher ${voucherCode} berhasil diaktifkan!`;
      case 'member':
        return `Selamat datang, ${username}!`;
      default:
        return 'Login berhasil!';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-green-200">
            <CardHeader className="text-center bg-green-50">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  {getLoginIcon()}
                  <CheckCircle className="h-6 w-6 text-green-500 absolute -top-1 -right-1 bg-white rounded-full" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-800">Login Berhasil!</CardTitle>
              <CardDescription className="text-green-700">
                {getSuccessMessage()}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-6">
              <div className="text-center">
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  Status: Terhubung ke Internet
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">IP Address</span>
                  </div>
                  <p className="text-blue-700">192.168.1.100</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-purple-800">Durasi</span>
                  </div>
                  <p className="text-purple-700">{loginType === 'voucher' ? '3 Jam' : '30 Hari'}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Anda akan diarahkan ke halaman status dalam {countdown} detik
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={handleManualRedirect}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Lihat Status Sekarang
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Kembali ke Beranda
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Penting:</strong> Jangan tutup browser ini selama sesi internet aktif. 
                  Anda dapat memantau status koneksi di halaman status.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginSuccess;
