
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wifi, Ticket, User, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleVoucherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode) {
      toast({
        title: "Error",
        description: "Silakan masukkan kode voucher",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate voucher authentication
    toast({
      title: "Autentikasi Voucher",
      description: `Memproses voucher: ${voucherCode}...`,
    });
    
    // Here you would integrate with your backend API
    console.log('Voucher login attempt:', voucherCode);
  };

  const handleMemberLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Silakan lengkapi username dan password",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate member authentication
    toast({
      title: "Autentikasi Member",
      description: `Login sebagai: ${username}...`,
    });
    
    // Here you would integrate with your backend API
    console.log('Member login attempt:', { username, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Wifi className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Portal Login</h1>
            <p className="text-gray-600">Masuk menggunakan voucher atau akun member</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Pilih Metode Login</CardTitle>
              <CardDescription className="text-center">
                Gunakan kode voucher atau login dengan akun member Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="voucher" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="voucher" className="flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    Voucher
                  </TabsTrigger>
                  <TabsTrigger value="member" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Member
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="voucher" className="space-y-4">
                  <form onSubmit={handleVoucherLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="voucher">Kode Voucher</Label>
                      <Input
                        id="voucher"
                        type="text"
                        placeholder="Masukkan kode voucher"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="text-center font-mono text-lg"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Login dengan Voucher
                    </Button>
                  </form>
                  
                  <div className="text-center text-sm text-gray-600">
                    <p>Voucher habis? <a href="/voucher" className="text-blue-600 hover:underline">Beli voucher baru</a></p>
                  </div>
                </TabsContent>
                
                <TabsContent value="member" className="space-y-4">
                  <form onSubmit={handleMemberLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Masukkan username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Login Member
                    </Button>
                  </form>
                  
                  <div className="text-center text-sm text-gray-600 space-y-1">
                    <p><a href="#" className="text-blue-600 hover:underline">Lupa password?</a></p>
                    <p>Belum punya akun? <a href="/services" className="text-blue-600 hover:underline">Daftar member</a></p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Butuh bantuan? <a href="/contact" className="text-blue-600 hover:underline">Hubungi support</a></p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
