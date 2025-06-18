
import React from 'react';
import { Wifi, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Wifi className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">HotSpot Portal</span>
            </div>
            <p className="text-gray-300 mb-4">
              Solusi lengkap untuk manajemen hotspot dengan sistem voucher dan member. 
              Terintegrasi dengan MikroTik, FreeRADIUS, dan database MySQL.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">+62 123-4567-8900</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-300 hover:text-blue-400 transition-colors">Login Portal</Link></li>
              <li><Link to="/voucher" className="text-gray-300 hover:text-blue-400 transition-colors">Voucher</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Layanan</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-blue-400 transition-colors">Fitur</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontak</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">info@hotspotportal.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 HotSpot Portal. All rights reserved. | Powered by MikroTik & FreeRADIUS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
