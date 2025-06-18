
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Users, BarChart3, Settings, Wifi, Database, Router, Lock, Monitor, CreditCard, Smartphone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Features = () => {
  const technicalFeatures = [
    {
      icon: <Router className="h-8 w-8 text-blue-600" />,
      title: "MikroTik Integration",
      description: "Terintegrasi penuh dengan MikroTik RouterOS untuk management hotspot yang optimal",
      details: ["Bandwidth Management", "User Profile Control", "Queue Management", "Traffic Monitoring"]
    },
    {
      icon: <Database className="h-8 w-8 text-green-600" />,
      title: "FreeRADIUS Backend",
      description: "Sistem autentikasi berbasis RADIUS server untuk keamanan maksimal",
      details: ["AAA (Authentication, Authorization, Accounting)", "MySQL Integration", "Session Management", "Real-time Monitoring"]
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Security Features",
      description: "Perlindungan berlapis untuk menjaga keamanan jaringan dan data pengguna",
      details: ["WPA2/WPA3 Encryption", "MAC Address Filtering", "Firewall Rules", "DDoS Protection"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Advanced Analytics",
      description: "Laporan dan analisis mendalam tentang penggunaan jaringan",
      details: ["Usage Statistics", "Revenue Reports", "User Behavior Analysis", "Network Performance"]
    }
  ];

  const userFeatures = [
    {
      icon: <Wifi className="h-8 w-8 text-blue-500" />,
      title: "Captive Portal",
      description: "Interface login yang user-friendly dengan berbagai metode autentikasi",
      details: ["Voucher Login", "Member Login", "Social Media Login", "Custom Branding"]
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Multi-User Support",
      description: "Dukungan untuk berbagai tipe pengguna dengan hak akses yang berbeda",
      details: ["Guest Users", "Premium Members", "Corporate Accounts", "Admin Management"]
    },
    {
      icon: <Smartphone className="h-8 w-8 text-orange-500" />,
      title: "Mobile Responsive",
      description: "Akses portal dari berbagai perangkat dengan tampilan yang optimal",
      details: ["Responsive Design", "Mobile App Ready", "Cross Platform", "Touch Friendly"]
    },
    {
      icon: <CreditCard className="h-8 w-8 text-indigo-500" />,
      title: "Payment Integration",
      description: "Sistem pembayaran terintegrasi untuk pembelian voucher dan subscription",
      details: ["Multiple Payment Methods", "Auto Billing", "Invoice Generation", "Payment History"]
    }
  ];

  const adminFeatures = [
    {
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      title: "Admin Dashboard",
      description: "Panel kontrol lengkap untuk administrator sistem",
      details: ["System Configuration", "User Management", "Network Monitoring", "Report Generation"]
    },
    {
      icon: <Monitor className="h-8 w-8 text-cyan-600" />,
      title: "Real-time Monitoring",
      description: "Monitoring jaringan dan pengguna secara real-time",
      details: ["Live User Sessions", "Bandwidth Usage", "System Health", "Alert Notifications"]
    },
    {
      icon: <Lock className="h-8 w-8 text-yellow-600" />,
      title: "Access Control",
      description: "Kontrol akses pengguna dengan berbagai level permission",
      details: ["Role-based Access", "Time-based Restrictions", "Bandwidth Limits", "Content Filtering"]
    },
    {
      icon: <Zap className="h-8 w-8 text-pink-600" />,
      title: "Performance Optimization",
      description: "Optimasi performa jaringan untuk pengalaman terbaik",
      details: ["Load Balancing", "Cache Management", "QoS Implementation", "Auto Scaling"]
    }
  ];

  const FeatureCard = ({ feature, index }: { feature: any, index: number }) => (
    <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          {feature.icon}
          <CardTitle className="text-xl">{feature.title}</CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          {feature.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {feature.details.map((detail: string, idx: number) => (
            <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fitur & Teknologi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sistem hotspot management yang komprehensif dengan teknologi terdepan 
            untuk memberikan pengalaman terbaik bagi pengguna dan administrator
          </p>
        </div>

        {/* Technical Features */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Teknis</h2>
            <p className="text-gray-600">Infrastruktur teknologi yang solid dan terintegrasi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </section>

        {/* User Features */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Pengguna</h2>
            <p className="text-gray-600">Interface dan pengalaman pengguna yang optimal</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </section>

        {/* Admin Features */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Administrator</h2>
            <p className="text-gray-600">Tool management yang powerful untuk administrator</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Arsitektur Sistem</h2>
            <p className="text-gray-600">Gambaran lengkap tentang komponen sistem dan integrasinya</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frontend Components</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• React.js dengan TypeScript</li>
                <li>• Responsive UI dengan Tailwind CSS</li>
                <li>• Component library Shadcn/UI</li>
                <li>• State management dengan React Query</li>
                <li>• Progressive Web App (PWA) ready</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Integration Layer</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• RESTful API endpoints</li>
                <li>• Real-time WebSocket connections</li>
                <li>• JWT-based authentication</li>
                <li>• API rate limiting & security</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backend Infrastructure</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• FreeRADIUS server untuk AAA</li>
                <li>• MySQL/MariaDB database</li>
                <li>• MikroTik RouterOS integration</li>
                <li>• Redis untuk session management</li>
                <li>• Nginx untuk load balancing</li>
              </ul>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">Security & Monitoring</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• SSL/TLS encryption</li>
                <li>• Firewall & intrusion detection</li>
                <li>• Log aggregation & analysis</li>
                <li>• Automated backup system</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Features;
