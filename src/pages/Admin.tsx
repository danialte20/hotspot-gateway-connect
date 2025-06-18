
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Database, 
  Router, 
  Shield, 
  Monitor, 
  Users, 
  Activity,
  Server,
  Network,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [showPasswords, setShowPasswords] = useState({
    mysql: false,
    radius: false,
    mikrotik: false
  });
  
  const [connectionStatus, setConnectionStatus] = useState({
    mysql: 'connected',
    radius: 'disconnected',
    mikrotik: 'connecting'
  });

  const [config, setConfig] = useState({
    mysql: {
      host: 'localhost',
      port: '3306',
      database: 'radius_db',
      username: 'radius_user',
      password: ''
    },
    radius: {
      host: 'localhost',
      port: '1812',
      secret: '',
      nas_ip: '192.168.1.1'
    },
    mikrotik: {
      host: '192.168.88.1',
      username: 'admin',
      password: '',
      api_port: '8728'
    }
  });

  const { toast } = useToast();

  const handleConfigChange = (section: string, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const togglePasswordVisibility = (section: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const testConnection = (service: string) => {
    setConnectionStatus(prev => ({
      ...prev,
      [service]: 'connecting'
    }));

    // Simulate connection test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      setConnectionStatus(prev => ({
        ...prev,
        [service]: success ? 'connected' : 'disconnected'
      }));

      toast({
        title: `Test Koneksi ${service.toUpperCase()}`,
        description: success ? 'Koneksi berhasil!' : 'Koneksi gagal, periksa konfigurasi.',
        variant: success ? 'default' : 'destructive'
      });
    }, 2000);
  };

  const saveConfiguration = () => {
    toast({
      title: "Konfigurasi Disimpan",
      description: "Semua pengaturan telah disimpan dan diterapkan.",
    });
    console.log('Configuration saved:', config);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'connecting':
        return <AlertTriangle className="h-4 w-4 text-yellow-500 animate-pulse" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Terhubung</Badge>;
      case 'disconnected':
        return <Badge className="bg-red-100 text-red-800">Terputus</Badge>;
      case 'connecting':
        return <Badge className="bg-yellow-100 text-yellow-800">Menghubungkan...</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Settings className="h-10 w-10 text-blue-600" />
            Admin Panel
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Konfigurasi dan monitoring sistem hotspot portal dengan integrasi 
            FreeRADIUS, MySQL/MariaDB, dan MikroTik RouterOS
          </p>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MySQL Database</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(connectionStatus.mysql)}
                  <span className="text-sm">Status</span>
                </div>
                {getStatusBadge(connectionStatus.mysql)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">FreeRADIUS</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(connectionStatus.radius)}
                  <span className="text-sm">Status</span>
                </div>
                {getStatusBadge(connectionStatus.radius)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MikroTik Router</CardTitle>
              <Router className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(connectionStatus.mikrotik)}
                  <span className="text-sm">Status</span>
                </div>
                {getStatusBadge(connectionStatus.mikrotik)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Tabs */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Konfigurasi Sistem</CardTitle>
            <CardDescription>
              Pengaturan koneksi dan integrasi dengan sistem backend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="mysql" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="mysql" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  MySQL
                </TabsTrigger>
                <TabsTrigger value="radius" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  FreeRADIUS
                </TabsTrigger>
                <TabsTrigger value="mikrotik" className="flex items-center gap-2">
                  <Router className="h-4 w-4" />
                  MikroTik
                </TabsTrigger>
                <TabsTrigger value="monitoring" className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  Monitoring
                </TabsTrigger>
              </TabsList>

              {/* MySQL Configuration */}
              <TabsContent value="mysql" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    Konfigurasi Database MySQL/MariaDB
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mysql-host">Host Server</Label>
                      <Input
                        id="mysql-host"
                        value={config.mysql.host}
                        onChange={(e) => handleConfigChange('mysql', 'host', e.target.value)}
                        placeholder="localhost atau IP address"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mysql-port">Port</Label>
                      <Input
                        id="mysql-port"
                        value={config.mysql.port}
                        onChange={(e) => handleConfigChange('mysql', 'port', e.target.value)}
                        placeholder="3306"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mysql-database">Database Name</Label>
                      <Input
                        id="mysql-database"
                        value={config.mysql.database}
                        onChange={(e) => handleConfigChange('mysql', 'database', e.target.value)}
                        placeholder="radius_db"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mysql-username">Username</Label>
                      <Input
                        id="mysql-username"
                        value={config.mysql.username}
                        onChange={(e) => handleConfigChange('mysql', 'username', e.target.value)}
                        placeholder="radius_user"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="mysql-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="mysql-password"
                          type={showPasswords.mysql ? "text" : "password"}
                          value={config.mysql.password}
                          onChange={(e) => handleConfigChange('mysql', 'password', e.target.value)}
                          placeholder="Database password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility('mysql')}
                        >
                          {showPasswords.mysql ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => testConnection('mysql')}
                      variant="outline"
                      disabled={connectionStatus.mysql === 'connecting'}
                    >
                      Test Koneksi
                    </Button>
                    <Button 
                      onClick={saveConfiguration}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Simpan Konfigurasi
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* FreeRADIUS Configuration */}
              <TabsContent value="radius" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Konfigurasi FreeRADIUS Server
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="radius-host">RADIUS Server Host</Label>
                      <Input
                        id="radius-host"
                        value={config.radius.host}
                        onChange={(e) => handleConfigChange('radius', 'host', e.target.value)}
                        placeholder="localhost atau IP address"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="radius-port">Authentication Port</Label>
                      <Input
                        id="radius-port"
                        value={config.radius.port}
                        onChange={(e) => handleConfigChange('radius', 'port', e.target.value)}
                        placeholder="1812"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="radius-nas">NAS IP Address</Label>
                      <Input
                        id="radius-nas"
                        value={config.radius.nas_ip}
                        onChange={(e) => handleConfigChange('radius', 'nas_ip', e.target.value)}
                        placeholder="192.168.1.1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="radius-secret">Shared Secret</Label>
                      <div className="relative">
                        <Input
                          id="radius-secret"
                          type={showPasswords.radius ? "text" : "password"}
                          value={config.radius.secret}
                          onChange={(e) => handleConfigChange('radius', 'secret', e.target.value)}
                          placeholder="RADIUS shared secret"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility('radius')}
                        >
                          {showPasswords.radius ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Template Konfigurasi FreeRADIUS</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      Konfigurasi berikut perlu ditambahkan ke file clients.conf:
                    </p>
                    <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
{`client mikrotik {
    ipaddr = ${config.radius.nas_ip}
    secret = ${config.radius.secret || 'your_shared_secret'}
    require_message_authenticator = no
    nas_type = mikrotik
}`}
                    </pre>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => testConnection('radius')}
                      variant="outline"
                      disabled={connectionStatus.radius === 'connecting'}
                    >
                      Test Koneksi
                    </Button>
                    <Button 
                      onClick={saveConfiguration}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Simpan Konfigurasi
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* MikroTik Configuration */}
              <TabsContent value="mikrotik" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Router className="h-5 w-5 text-purple-600" />
                    Konfigurasi MikroTik RouterOS
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mikrotik-host">Router IP Address</Label>
                      <Input
                        id="mikrotik-host"
                        value={config.mikrotik.host}
                        onChange={(e) => handleConfigChange('mikrotik', 'host', e.target.value)}
                        placeholder="192.168.88.1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mikrotik-port">API Port</Label>
                      <Input
                        id="mikrotik-port"
                        value={config.mikrotik.api_port}
                        onChange={(e) => handleConfigChange('mikrotik', 'api_port', e.target.value)}
                        placeholder="8728"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mikrotik-username">Username</Label>
                      <Input
                        id="mikrotik-username"
                        value={config.mikrotik.username}
                        onChange={(e) => handleConfigChange('mikrotik', 'username', e.target.value)}
                        placeholder="admin"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mikrotik-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="mikrotik-password"
                          type={showPasswords.mikrotik ? "text" : "password"}
                          value={config.mikrotik.password}
                          onChange={(e) => handleConfigChange('mikrotik', 'password', e.target.value)}
                          placeholder="Router password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility('mikrotik')}
                        >
                          {showPasswords.mikrotik ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Template Konfigurasi MikroTik</h4>
                    <p className="text-sm text-purple-800 mb-3">
                      Script berikut perlu dijalankan di MikroTik Terminal:
                    </p>
                    <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
{`# Enable API
/ip service set api disabled=no port=8728

# Setup RADIUS
/radius add service=hotspot address=${config.radius.host} secret=${config.radius.secret || 'your_shared_secret'} timeout=00:00:03

# Configure Hotspot Profile
/ip hotspot profile add name=hsprof1 hotspot-address=192.168.1.1 dns-name=hotspot.local login-by=http-chap,trial,mac-cookie use-radius=yes

# Setup Hotspot Server
/ip hotspot add name=hotspot1 interface=bridge address-pool=dhcp_pool1 profile=hsprof1`}
                    </pre>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => testConnection('mikrotik')}
                      variant="outline"
                      disabled={connectionStatus.mikrotik === 'connecting'}
                    >
                      Test Koneksi
                    </Button>
                    <Button 
                      onClick={saveConfiguration}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Simpan Konfigurasi
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Monitoring Tab */}
              <TabsContent value="monitoring" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-orange-600" />
                    System Monitoring & Logs
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          Active Users
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">247</div>
                        <p className="text-sm text-gray-600">Online sekarang</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Network className="h-4 w-4" />
                          Bandwidth Usage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">1.2 Gbps</div>
                        <p className="text-sm text-gray-600">Total usage</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Total Registered
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-600">1,843</div>
                        <p className="text-sm text-gray-600">User accounts</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Server className="h-4 w-4" />
                          System Uptime
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-600">99.8%</div>
                        <p className="text-sm text-gray-600">Last 30 days</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* System Settings */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Pengaturan Sistem</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Auto Backup Database</Label>
                          <p className="text-xs text-gray-600">Backup otomatis setiap hari</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Email Notifications</Label>
                          <p className="text-xs text-gray-600">Notifikasi sistem via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Debug Mode</Label>
                          <p className="text-xs text-gray-600">Mode debug untuk troubleshooting</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Maintenance Mode</Label>
                          <p className="text-xs text-gray-600">Mode maintenance untuk update sistem</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
