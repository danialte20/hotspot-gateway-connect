
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Shield, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SecretAdmin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Secret admin password - in real app, this should be verified against backend
  const SECRET_PASSWORD = 'admin123!@#';

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === SECRET_PASSWORD) {
      // Store admin session
      localStorage.setItem('adminAuthenticated', 'true');
      toast({
        title: "Admin Access Granted",
        description: "Selamat datang, Administrator!",
      });
      navigate('/admin');
    } else {
      toast({
        title: "Access Denied",
        description: "Password admin salah!",
        variant: "destructive"
      });
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl border-gray-700">
        <CardHeader className="text-center bg-gray-50">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-2">
            <Lock className="h-5 w-5" />
            Admin Access
          </CardTitle>
          <CardDescription className="text-red-600 font-medium">
            Restricted Area - Authorized Personnel Only
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-gray-700">
                Administrator Password
              </Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
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
            
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Access Admin Panel
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Warning:</strong> This is a restricted area. All access attempts are logged. 
              Unauthorized access is prohibited.
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800"
            >
              Return to Portal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretAdmin;
