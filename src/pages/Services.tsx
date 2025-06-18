
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, Home, Building, Users, CheckCircle, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Services = () => {
  const { toast } = useToast();

  const membershipPlans = [
    {
      id: 1,
      name: "Basic Member",
      type: "membership",
      speed: "10 Mbps",
      price: "Rp 150.000/bulan",
      description: "Paket dasar untuk kebutuhan internet sehari-hari",
      features: ["10 Mbps Up/Down", "5 Device", "24/7 Support", "Fair Usage Policy 50GB"],
      popular: false
    },
    {
      id: 2,
      name: "Premium Member",
      type: "membership",
      speed: "25 Mbps",
      price: "Rp 300.000/bulan",
      description: "Paket premium untuk streaming dan gaming",
      features: ["25 Mbps Up/Down", "10 Device", "Priority Support", "Fair Usage Policy 100GB", "Gaming Mode"],
      popular: true
    },
    {
      id: 3,
      name: "Business Member",
      type: "membership",
      speed: "50 Mbps",
      price: "Rp 500.000/bulan",
      description: "Paket bisnis untuk kebutuhan komersial",
      features: ["50 Mbps Up/Down", "Unlimited Device", "VIP Support", "Unlimited Usage", "Static IP", "SLA 99.9%"],
      popular: false
    }
  ];

  const homeServices = [
    {
      id: 1,
      name: "Home Internet Basic",
      type: "home",
      speed: "20 Mbps",
      price: "Rp 200.000/bulan",
      description: "Internet rumah untuk keluarga kecil",
      features: ["20 Mbps Dedicated", "WiFi Router", "Instalasi Gratis", "Support 24/7"],
      icon: <Home className="h-6 w-6" />
    },
    {
      id: 2,
      name: "Home Internet Premium",
      type: "home",
      speed: "50 Mbps",
      price: "Rp 400.000/bulan",
      description: "Internet rumah untuk keluarga besar",
      features: ["50 Mbps Dedicated", "WiFi 6 Router", "TV Cable", "Instalasi & Setup Gratis"],
      icon: <Home className="h-6 w-6" />
    },
    {
      id: 3,
      name: "Corporate Internet",
      type: "corporate",
      speed: "100 Mbps",
      price: "Rp 1.500.000/bulan",
      description: "Internet dedicated untuk perkantoran",
      features: ["100 Mbps Dedicated", "Enterprise Router", "Static IP /29", "SLA 99.9%", "24/7 Monitoring"],
      icon: <Building className="h-6 w-6" />
    }
  ];

  const handleSubscribe = (planName: string, price: string) => {
    toast({
      title: "Berlangganan Layanan",
      description: `Memproses berlangganan ${planName} - ${price}`,
    });
    console.log(`Subscription attempt: ${planName} - ${price}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Layanan Internet</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berbagai pilihan layanan internet untuk kebutuhan personal, keluarga, dan bisnis Anda
          </p>
        </div>

        {/* Membership Plans */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              Paket Membership Hotspot
            </h2>
            <p className="text-gray-600">Berlangganan bulanan dengan akses hotspot di berbagai lokasi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans.map((plan) => (
              <Card key={plan.id} className={`relative hover:shadow-xl transition-shadow duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Terpopuler
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="text-3xl font-bold text-blue-600 mt-2">{plan.price}</div>
                  <div className="text-lg font-semibold text-gray-700">{plan.speed}</div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                    onClick={() => handleSubscribe(plan.name, plan.price)}
                  >
                    Berlangganan Sekarang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Home & Corporate Services */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Wifi className="h-8 w-8 text-green-600" />
              Layanan Internet Rumah & Kantor
            </h2>
            <p className="text-gray-600">Internet dedicated dengan kecepatan stabil untuk rumah dan perkantoran</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeServices.map((service) => (
              <Card key={service.id} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${service.type === 'home' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{service.name}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  <div className="text-3xl font-bold text-green-600 mt-2">{service.price}</div>
                  <div className="text-lg font-semibold text-gray-700">{service.speed}</div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleSubscribe(service.name, service.price)}
                  >
                    Hubungi Sales
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Keunggulan Layanan Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Jaringan fiber optic berkualitas tinggi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Customer support 24/7</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Instalasi dan setup gratis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Garansi uptime 99.9%</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Area Layanan</h3>
              <p className="text-gray-600 mb-4">
                Layanan kami tersedia di berbagai area strategis dengan jangkauan yang terus berkembang:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Jakarta dan sekitarnya</li>
                <li>• Bogor, Depok, Tangerang, Bekasi</li>
                <li>• Bandung dan Cimahi</li>
                <li>• Semarang dan Solo</li>
                <li>• Surabaya dan Malang</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
