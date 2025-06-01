import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { departments } from '@/data/mockData';
import { Shield, Lock, Users, Computer, Eye, EyeOff, Info, Building, Zap, Award } from 'lucide-react';

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signIn, signUp, createDemoAccounts } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    department: '',
  });

  const validatePassword = (password: string): string[] => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters long');
    if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('At least one lowercase letter');
    if (!/\d/.test(password)) errors.push('At least one number');
    if (!/[!@#$%^&*]/.test(password)) errors.push('At least one special character (!@#$%^&*)');
    return errors;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signIn(signInData.email, signInData.password);
      toast({
        title: 'Welcome back!',
        description: 'You have been signed in successfully.',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpData.email || !signUpData.password || !signUpData.confirmPassword || !signUpData.name || !signUpData.department) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    const passwordErrors = validatePassword(signUpData.password);
    if (passwordErrors.length > 0) {
      toast({
        title: 'Password Requirements',
        description: `Password must meet the following requirements: ${passwordErrors.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(signUpData.email, signUpData.password, {
        name: signUpData.name,
        department: signUpData.department,
      });
      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account.',
      });
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDemoAccounts = async () => {
    setIsLoading(true);
    try {
      await createDemoAccounts();
      toast({
        title: 'Demo accounts created!',
        description: 'You can now use the demo credentials to test different user roles.',
      });
    } catch (error) {
      toast({
        title: 'Demo setup failed',
        description: 'Some demo accounts might already exist.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 left-20 h-64 w-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 h-48 w-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-between gap-16 p-4">
        {/* Left side - Enhanced Branding */}
        <div className="hidden lg:flex flex-col items-start text-left space-y-8 flex-1 max-w-2xl">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
              <img 
                src="/lovable-uploads/825a277b-660c-4190-99eb-c75e7362dbea.png" 
                alt="Wajir County Logo" 
                className="relative h-24 w-24 drop-shadow-2xl"
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-primary bg-clip-text text-transparent leading-tight">
                Wajir County
              </h1>
              <p className="text-2xl font-semibold text-primary mt-2">Professional ICT Help Desk</p>
              <p className="text-lg text-slate-300 mt-1">Government Excellence Through Technology</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              Enterprise-Grade IT Support Platform
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Advanced technical support ecosystem designed for government excellence. 
              Streamlined workflows, intelligent automation, and comprehensive 
              service management to ensure operational continuity across all county departments.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Secure Infrastructure</h3>
                <p className="text-sm text-slate-400">Military-grade encryption</p>
              </div>
            </div>
            
            <div className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                <Computer className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Expert Team</h3>
                <p className="text-sm text-slate-400">24/7 professional support</p>
              </div>
            </div>
            
            <div className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                <Users className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Smart Workflows</h3>
                <p className="text-sm text-slate-400">AI-powered automation</p>
              </div>
            </div>
            
            <div className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Quality Assurance</h3>
                <p className="text-sm text-slate-400">ISO certified processes</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-primary" />
              <span className="text-sm">Government Standards</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm">Real-time Processing</span>
            </div>
          </div>
        </div>

        {/* Right side - Enhanced Auth Form */}
        <div className="w-full max-w-md lg:max-w-lg">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl">
            <CardHeader className="text-center space-y-6 pb-8">
              <div className="flex justify-center lg:hidden mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                  <img 
                    src="/lovable-uploads/825a277b-660c-4190-99eb-c75e7362dbea.png" 
                    alt="Wajir County Logo" 
                    className="relative h-20 w-20 drop-shadow-lg"
                  />
                </div>
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Professional Access Portal
                </CardTitle>
                <CardDescription className="text-lg mt-3 text-slate-600">
                  Secure authentication for authorized government personnel
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-slate-100">
                  <TabsTrigger value="signin" className="font-semibold text-base h-10">Access System</TabsTrigger>
                  <TabsTrigger value="signup" className="font-semibold text-base h-10">Register Account</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-6">
                  <form onSubmit={handleSignIn} className="space-y-5">
                    <div className="space-y-3">
                      <Label htmlFor="signin-email" className="text-base font-semibold text-slate-700">Official Email Address</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your.email@wajir.go.ke"
                        value={signInData.email}
                        onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                        className="h-12 text-base border-2 focus:border-primary"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signin-password" className="text-base font-semibold text-slate-700">Password</Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your secure password"
                          value={signInData.password}
                          onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                          className="h-12 text-base border-2 focus:border-primary pr-12"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-12 w-12"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90" disabled={isLoading}>
                      {isLoading ? 'Authenticating...' : 'Access System'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-6">
                  <form onSubmit={handleSignUp} className="space-y-5">
                    <div className="space-y-3">
                      <Label htmlFor="signup-name" className="text-base font-semibold text-slate-700">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your complete official name"
                        value={signUpData.name}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, name: e.target.value }))}
                        className="h-12 text-base border-2 focus:border-primary"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-email" className="text-base font-semibold text-slate-700">Official Email Address</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@wajir.go.ke"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                        className="h-12 text-base border-2 focus:border-primary"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-department" className="text-base font-semibold text-slate-700">Department/Ministry</Label>
                      <Select value={signUpData.department} onValueChange={(value) => setSignUpData(prev => ({ ...prev, department: value }))}>
                        <SelectTrigger className="h-12 text-base border-2 focus:border-primary">
                          <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept} className="text-base">
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="signup-password" className="text-base font-semibold text-slate-700">Secure Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                          className="h-12 text-base border-2 focus:border-primary pr-12"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-12 w-12"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="confirm-password" className="text-base font-semibold text-slate-700">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="h-12 text-base border-2 focus:border-primary pr-12"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-12 w-12"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border">
                      <p className="font-semibold text-sm text-slate-700 mb-2">Security Requirements:</p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        <li>• Minimum 8 characters with complexity requirements</li>
                        <li>• Must include uppercase, lowercase, numbers & symbols</li>
                        <li>• Regular security updates required</li>
                      </ul>
                    </div>
                    <Button type="submit" className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90" disabled={isLoading}>
                      {isLoading ? 'Creating Account...' : 'Register Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="border-t pt-8">
                <Alert className="mb-6 border-primary/20 bg-primary/5">
                  <Info className="h-5 w-5 text-primary" />
                  <AlertDescription className="text-base">
                    <strong>System Testing:</strong> Demo accounts available for role-based testing and system evaluation.
                  </AlertDescription>
                </Alert>
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-base font-semibold border-2 hover:bg-slate-50" 
                  onClick={handleCreateDemoAccounts}
                  disabled={isLoading}
                >
                  Initialize Demo Environment
                </Button>
                <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-600 space-y-2">
                  <div className="font-semibold text-slate-700 mb-3">Available Test Accounts:</div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="bg-red-50 p-2 rounded border-l-4 border-red-500">
                      <strong>System Admin:</strong> ellisalat@gmail.com / SuperUser123!
                    </div>
                    <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-500">
                      <strong>ICT Director:</strong> director@wajir.go.ke / Demo123!
                    </div>
                    <div className="bg-green-50 p-2 rounded border-l-4 border-green-500">
                      <strong>Senior Officer:</strong> ali.salat@wajir.go.ke / Demo123!
                    </div>
                    <div className="bg-gray-50 p-2 rounded border-l-4 border-gray-500">
                      <strong>Standard User:</strong> user.demo@wajir.go.ke / Demo123!
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400">
              © 2024 Wajir County Government. Secure access for authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
