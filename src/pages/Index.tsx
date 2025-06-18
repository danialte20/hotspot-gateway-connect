
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Shield, Zap, Users, CreditCard, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      icon: <Wifi className="h-8 w-8 text-blue-600" />,
      title: "Hotspot Management",
      description: "Kelola akses internet dengan sistem voucher dan member yang terintegrasi"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Keamanan Tinggi",
      description: "Sistem autentikasi berbasis RADIUS dengan enkripsi dan monitoring real-time"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Performa Optimal",
      description: "Integrasi dengan MikroTik RouterOS untuk performa jaringan yang maksimal"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Multi User",
      description: "Dukungan untuk voucher sementara dan membership dengan berbagai paket"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-indigo-600" />,
      title: "Billing System",
      description: "Sistem pembayaran otomatis dengan laporan keuangan yang detail"
    },
    {
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      title: "Easy Configuration",
      description: "Panel admin yang mudah digunakan untuk konfigurasi sistem"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">HotSpot Portal</span>
            <br />
            <span className="text-2xl md:text-4xl">Sistem Captive Portal</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Solusi lengkap untuk manajemen hotspot dengan sistem voucher dan member. 
            Terintegrasi dengan MikroTik RouterOS, FreeRADIUS, dan database MySQL/MariaDB.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Masuk ke Portal
              </Button>
            </Link>
            <Link to="/voucher">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Lihat Paket Voucher
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sistem yang dirancang khusus untuk kebutuhan provider internet dan cafe/warnet
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Memulai?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Akses portal login atau jelajahi paket layanan yang tersedia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Login Sekarang
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
                Lihat Layanan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
