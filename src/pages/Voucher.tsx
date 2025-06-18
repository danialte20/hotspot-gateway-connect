
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Wifi, Zap, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Voucher = () => {
  const { toast } = useToast();

  const voucherPackages = [
    {
      id: 1,
      name: "Basic 1 Jam",
      duration: "1 Jam",
      speed: "2 Mbps",
      price: "Rp 3.000",
      description: "Cocok untuk browsing ringan dan social media",
      popular: false,
      features: ["Akses Internet", "1 Device", "Support 24/7"]
    },
    {
      id: 2,
      name: "Standard 3 Jam",
      duration: "3 Jam",
      speed: "5 Mbps",
      price: "Rp 8.000",
      description: "Ideal untuk streaming dan video call",
      popular: true,
      features: ["Akses Internet", "2 Device", "HD Streaming", "Support 24/7"]
    },
    {
      id: 3,
      name: "Premium 6 Jam",
      duration: "6 Jam",
      speed: "10 Mbps",
      price: "Rp 15.000",
      description: "Perfect untuk gaming dan download",
      popular: false,
      features: ["Akses Internet", "3 Device", "Gaming Mode", "Priority Support"]
    },
    {
      id: 4,
      name: "Daily 24 Jam",
      duration: "24 Jam",
      speed: "8 Mbps",
      price: "Rp 25.000",
      description: "Akses sepuasnya selama sehari penuh",
      popular: false,
      features: ["Akses Internet", "5 Device", "Unlimited Usage", "Priority Support"]
    },
    {
      id: 5,
      name: "Weekly 7 Hari",
      duration: "7 Hari",
      speed: "10 Mbps",
      price: "Rp 50.000",
      description: "Hemat untuk penggunaan seminggu",
      popular: true,
      features: ["Akses Internet", "10 Device", "Gaming Mode", "VIP Support"]
    },
    {
      id: 6,
      name: "Monthly 30 Hari",
      duration: "30 Hari",
      speed: "15 Mbps",
      price: "Rp 150.000",
      description: "Paket bulanan dengan speed maksimal",
      popular: false,
      features: ["Akses Internet", "Unlimited Device", "Max Speed", "VIP Support", "Bonus Quota"]
    }
  ];

  const handlePurchase = (packageName: string, price: string) => {
    toast({
      title: "Pembelian Voucher",
      description: `Memproses pembelian ${packageName} - ${price}`,
    });
    // Here you would integrate with payment gateway
    console.log(`Purchase attempt: ${packageName} - ${price}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Paket Voucher Hotspot</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih paket voucher yang sesuai dengan kebutuhan internet Anda. 
            Semua paket dilengkapi dengan kecepatan stabil dan support 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {voucherPackages.map((pkg) => (
            <Card key={pkg.id} className={`relative hover:shadow-xl transition-shadow duration-300 ${pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Terpopuler
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                <div className="text-3xl font-bold text-blue-600 mt-2">{pkg.price}</div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Durasi</span>
                  </div>
                  <span className="font-semibold">{pkg.duration}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Kecepatan</span>
                  </div>
                  <span className="font-semibold">{pkg.speed}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Fitur:</h4>
                  <ul className="space-y-1">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <Wifi className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                  onClick={() => handlePurchase(pkg.name, pkg.price)}
                >
                  Beli Voucher
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cara Menggunakan Voucher</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Beli Voucher</h3>
              <p className="text-gray-600 text-sm">Pilih paket dan lakukan pembayaran untuk mendapatkan kode voucher</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Connect WiFi</h3>
              <p className="text-gray-600 text-sm">Hubungkan perangkat ke jaringan WiFi hotspot</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Input Voucher</h3>
              <p className="text-gray-600 text-sm">Masukkan kode voucher di halaman login portal</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Voucher;
