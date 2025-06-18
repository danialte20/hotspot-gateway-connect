
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones, Bug, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });
  
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Telepon",
      details: ["+62 21-1234-5678", "+62 812-3456-7890"],
      description: "Hubungi kami langsung untuk bantuan cepat"
    },
    {
      icon: <Mail className="h-6 w-6 text-green-600" />,
      title: "Email",
      details: ["support@hotspotportal.com", "sales@hotspotportal.com"],
      description: "Kirim email untuk pertanyaan detail"
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-600" />,
      title: "Alamat",
      details: ["Jl. Teknologi No. 123", "Jakarta Selatan 12345"],
      description: "Kunjungi kantor kami untuk konsultasi langsung"
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: "Jam Kerja",
      details: ["Senin - Jumat: 08:00 - 17:00", "Sabtu: 08:00 - 13:00"],
      description: "Support 24/7 untuk emergency"
    }
  ];

  const supportTypes = [
    {
      icon: <HelpCircle className="h-5 w-5 text-blue-500" />,
      value: "general",
      label: "Pertanyaan Umum",
      description: "Informasi layanan dan produk"
    },
    {
      icon: <Headphones className="h-5 w-5 text-green-500" />,
      value: "support",
      label: "Technical Support",
      description: "Bantuan teknis dan troubleshooting"
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-orange-500" />,
      value: "sales",
      label: "Sales & Partnership",
      description: "Konsultasi penjualan dan kerjasama"
    },
    {
      icon: <Bug className="h-5 w-5 text-red-500" />,
      value: "bug",
      label: "Bug Report",
      description: "Laporkan masalah atau bug sistem"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Silakan lengkapi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pesan Terkirim",
      description: "Terima kasih! Kami akan segera merespon pesan Anda.",
    });

    // Here you would integrate with your backend API
    console.log('Contact form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      type: 'general'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tim support kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami 
            untuk pertanyaan, bantuan teknis, atau konsultasi layanan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Informasi Kontak</CardTitle>
                <CardDescription>
                  Berbagai cara untuk menghubungi tim kami
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibol text-gray-900">{info.title}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx}>{detail}</p>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Support Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp Support
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Headphones className="h-4 w-4 mr-2" />
                  Remote Assistance
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
                <CardDescription>
                  Isi form di bawah ini dan kami akan merespon dalam 1x24 jam
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Support Type Selection */}
                  <div className="space-y-3">
                    <Label>Jenis Pertanyaan *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {supportTypes.map((type) => (
                        <div 
                          key={type.value}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.type === type.value 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                        >
                          <div className="flex items-center space-x-2">
                            {type.icon}
                            <span className="font-medium text-sm">{type.label}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+62 812-3456-7890"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subjek</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Subjek pesan"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Jelaskan pertanyaan atau masalah Anda dengan detail..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-gray-600">Jawaban untuk pertanyaan umum tentang layanan kami</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Bagaimana cara menggunakan voucher?</h3>
                <p className="text-gray-600 text-sm">
                  Setelah membeli voucher, hubungkan ke WiFi hotspot, buka browser, 
                  masukkan kode voucher di halaman login portal.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Apakah bisa refund voucher?</h3>
                <p className="text-gray-600 text-sm">
                  Voucher yang belum digunakan dapat di-refund dalam 24 jam setelah pembelian 
                  dengan menghubungi customer service.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Berapa lama instalasi internet rumah?</h3>
                <p className="text-gray-600 text-sm">
                  Instalasi internet rumah biasanya memakan waktu 1-3 hari kerja 
                  setelah survei lokasi dan pembayaran.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Area mana saja yang dilayani?</h3>
                <p className="text-gray-600 text-sm">
                  Saat ini kami melayani area Jabodetabek, Bandung, Semarang, Solo, 
                  Surabaya, dan Malang dengan ekspansi yang terus berkembang.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Bagaimana sistem pembayaran?</h3>
                <p className="text-gray-600 text-sm">
                  Kami menerima pembayaran melalui transfer bank, e-wallet, 
                  kartu kredit, dan pembayaran tunai di kantor.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Apakah ada garansi layanan?</h3>
                <p className="text-gray-600 text-sm">
                  Ya, kami memberikan garansi uptime 99.9% dengan SLA yang jelas 
                  dan kompensasi jika tidak terpenuhi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
